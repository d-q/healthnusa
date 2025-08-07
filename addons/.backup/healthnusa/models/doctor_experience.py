from odoo import models, fields, api, _
from odoo.exceptions import ValidationError


class DoctorExperience(models.Model):
    _name = 'healthnusa.doctor.experience'
    _description = 'Doctor Work Experience'
    _order = 'doctor_id, start_date desc, sequence'
    _rec_name = 'display_name'

    doctor_id = fields.Many2one(
        'hr.employee',
        string='Doctor',
        required=True,
        domain=[('is_doctor', '=', True)],
        ondelete='cascade'
    )
    position = fields.Char(
        string='Position',
        required=True,
        help='Job title or position held'
    )
    institution = fields.Char(
        string='Institution/Hospital',
        required=True,
        help='Name of the workplace'
    )
    start_date = fields.Date(
        string='Start Date',
        required=True,
        help='Date when employment started'
    )
    end_date = fields.Date(
        string='End Date',
        help='Date when employment ended. Leave empty if current position'
    )
    is_current = fields.Boolean(
        string='Current Position',
        default=False,
        help='Check if this is the current position'
    )
    department = fields.Char(
        string='Department',
        help='Department or division'
    )
    responsibilities = fields.Text(
        string='Responsibilities',
        help='Key responsibilities and achievements'
    )
    sequence = fields.Integer(
        string='Sequence',
        default=10,
        help='Sequence for ordering'
    )
    active = fields.Boolean(
        string='Active',
        default=True
    )
    
    # Computed fields
    display_name = fields.Char(
        string='Display Name',
        compute='_compute_display_name',
        store=True
    )
    duration_display = fields.Char(
        string='Duration',
        compute='_compute_duration_display',
        store=True
    )
    duration_years = fields.Float(
        string='Duration (Years)',
        compute='_compute_duration_years',
        store=True
    )

    @api.depends('position', 'institution', 'start_date', 'end_date', 'is_current')
    def _compute_display_name(self):
        """Compute display name for experience record"""
        for record in self:
            parts = []
            if record.position:
                parts.append(record.position)
            if record.institution:
                parts.append(f"at {record.institution}")
            
            # Add duration info
            if record.start_date:
                start_year = record.start_date.year
                if record.is_current:
                    parts.append(f"({start_year} - Present)")
                elif record.end_date:
                    end_year = record.end_date.year
                    parts.append(f"({start_year} - {end_year})")
                else:
                    parts.append(f"({start_year})")
            
            record.display_name = " ".join(parts) if parts else "New Experience"

    @api.depends('start_date', 'end_date', 'is_current')
    def _compute_duration_display(self):
        """Compute human-readable duration"""
        for record in self:
            if not record.start_date:
                record.duration_display = ""
                continue
            
            end_date = fields.Date.today() if record.is_current else record.end_date
            if not end_date:
                record.duration_display = f"Since {record.start_date.strftime('%b %Y')}"
                continue
            
            # Calculate years and months
            years = end_date.year - record.start_date.year
            months = end_date.month - record.start_date.month
            
            if months < 0:
                years -= 1
                months += 12
            
            parts = []
            if years > 0:
                parts.append(f"{years} year{'s' if years != 1 else ''}")
            if months > 0:
                parts.append(f"{months} month{'s' if months != 1 else ''}")
            
            if not parts:
                record.duration_display = "Less than 1 month"
            else:
                record.duration_display = " ".join(parts)

    @api.depends('start_date', 'end_date', 'is_current')
    def _compute_duration_years(self):
        """Compute duration in years (float)"""
        for record in self:
            if not record.start_date:
                record.duration_years = 0
                continue
            
            end_date = fields.Date.today() if record.is_current else record.end_date
            if not end_date:
                record.duration_years = 0
                continue
            
            delta = end_date - record.start_date
            record.duration_years = delta.days / 365.25

    @api.constrains('start_date', 'end_date', 'is_current')
    def _check_dates(self):
        """Validate date constraints"""
        for record in self:
            if record.start_date and record.start_date > fields.Date.today():
                raise ValidationError(_("Start date cannot be in the future."))
            
            if not record.is_current and record.end_date:
                if record.end_date > fields.Date.today():
                    raise ValidationError(_("End date cannot be in the future."))
                
                if record.start_date and record.end_date <= record.start_date:
                    raise ValidationError(_("End date must be after start date."))

    @api.onchange('is_current')
    def _onchange_is_current(self):
        """Clear end_date when marked as current position"""
        if self.is_current:
            self.end_date = False

    @api.onchange('end_date')
    def _onchange_end_date(self):
        """Uncheck is_current when end_date is set"""
        if self.end_date:
            self.is_current = False

    @api.model
    def get_doctor_experience_summary(self, doctor_id):
        """Get experience summary for a doctor"""
        experiences = self.search([
            ('doctor_id', '=', doctor_id),
            ('active', '=', True)
        ])
        
        total_years = sum(exp.duration_years for exp in experiences)
        current_position = experiences.filtered('is_current')
        
        return {
            'total_experiences': len(experiences),
            'total_years': round(total_years, 1),
            'current_position': current_position[0].display_name if current_position else None,
            'experiences': [{
                'id': exp.id,
                'position': exp.position,
                'institution': exp.institution,
                'duration': exp.duration_display,
                'is_current': exp.is_current,
            } for exp in experiences]
        }