from odoo import models, fields, api, _
from odoo.exceptions import ValidationError


class DoctorEducation(models.Model):
    _name = 'healthnusa.doctor.education'
    _description = 'Doctor Education History'
    _order = 'doctor_id, graduation_year desc, sequence'
    _rec_name = 'display_name'

    doctor_id = fields.Many2one(
        'hr.employee',
        string='Doctor',
        required=True,
        domain=[('is_doctor', '=', True)],
        ondelete='cascade'
    )
    degree = fields.Char(
        string='Degree',
        required=True,
        help='Degree or qualification obtained'
    )
    institution = fields.Char(
        string='Institution',
        required=True,
        help='Name of the educational institution'
    )
    field_of_study = fields.Char(
        string='Field of Study',
        help='Major or field of study'
    )
    start_year = fields.Integer(
        string='Start Year',
        help='Year when education started'
    )
    graduation_year = fields.Integer(
        string='Graduation Year',
        help='Year of graduation'
    )
    gpa = fields.Float(
        string='GPA',
        help='Grade Point Average'
    )
    description = fields.Text(
        string='Description',
        help='Additional information about education'
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
    duration_years = fields.Integer(
        string='Duration (Years)',
        compute='_compute_duration',
        store=True
    )

    @api.depends('degree', 'institution', 'graduation_year')
    def _compute_display_name(self):
        """Compute display name for education record"""
        for record in self:
            parts = []
            if record.degree:
                parts.append(record.degree)
            if record.institution:
                parts.append(f"at {record.institution}")
            if record.graduation_year:
                parts.append(f"({record.graduation_year})")
            record.display_name = " ".join(parts) if parts else "New Education"

    @api.depends('start_year', 'graduation_year')
    def _compute_duration(self):
        """Compute education duration"""
        for record in self:
            if record.start_year and record.graduation_year:
                record.duration_years = record.graduation_year - record.start_year
            else:
                record.duration_years = 0

    @api.constrains('start_year', 'graduation_year')
    def _check_years(self):
        """Validate year constraints"""
        current_year = fields.Date.today().year
        
        for record in self:
            if record.start_year and record.start_year > current_year:
                raise ValidationError(_("Start year cannot be in the future."))
            
            if record.graduation_year and record.graduation_year > current_year + 10:
                raise ValidationError(_("Graduation year seems too far in the future."))
            
            if record.start_year and record.graduation_year:
                if record.start_year >= record.graduation_year:
                    raise ValidationError(_("Start year must be before graduation year."))
                
                if record.graduation_year - record.start_year > 15:
                    raise ValidationError(_("Education duration seems too long (max 15 years)."))

    @api.constrains('gpa')
    def _check_gpa(self):
        """Validate GPA range"""
        for record in self:
            if record.gpa and not (0 <= record.gpa <= 4.0):
                raise ValidationError(_("GPA must be between 0.0 and 4.0."))