from odoo import models, fields, api, _
from odoo.exceptions import ValidationError
import re


class HrEmployee(models.Model):
    _inherit = 'hr.employee'

    # Doctor specific fields
    is_doctor = fields.Boolean(string='Is Doctor', default=False)
    doctor_code = fields.Char(string='Doctor Code', readonly=True, copy=False)
    specialty_id = fields.Many2one(
        'healthnusa.doctor.specialty',
        string='Specialty',
        help='Medical specialty of the doctor'
    )
    str_number = fields.Char(
        string='STR Number',
        help='Surat Tanda Registrasi (Medical Registration Number)'
    )
    sip_number = fields.Char(
        string='SIP Number',
        help='Surat Izin Praktik (Practice License Number)'
    )
    duty_status = fields.Selection([
        ('on_duty', 'On Duty'),
        ('on_call', 'On Call'),
        ('off_duty', 'Off Duty'),
        ('leave', 'On Leave')
    ], string='Duty Status', default='on_duty')
    
    # Birth date sudah ada di hr.employee sebagai 'birthday'
    # Gender sudah ada di hr.employee
    
    # Relationships
    education_ids = fields.One2many(
        'healthnusa.doctor.education',
        'doctor_id',
        string='Education History'
    )
    experience_ids = fields.One2many(
        'healthnusa.doctor.experience',
        'doctor_id',
        string='Work Experience'
    )
    schedule_ids = fields.One2many(
        'healthnusa.doctor.schedule',
        'doctor_id',
        string='Practice Schedule'
    )
    document_ids = fields.One2many(
        'healthnusa.doctor.document',
        'doctor_id',
        string='Documents'
    )
    document_count = fields.Integer(
        string='Document Count',
        compute='_compute_document_count',
        store=True
    )

    @api.depends('document_ids')
    def _compute_document_count(self):
        for record in self:
            record.document_count = len(record.document_ids)
    
    # Computed fields
    age = fields.Integer(string='Age', compute='_compute_age', store=False)
    total_experience_years = fields.Float(
        string='Total Experience (Years)',
        compute='_compute_total_experience',
        store=False
    )
    active_schedules = fields.Integer(
        string='Active Schedules',
        compute='_compute_active_schedules',
        store=True  # Make it stored so it can be used in domain searches
    )

    @api.depends('birthday')
    def _compute_age(self):
        """Compute age from birth date"""
        today = fields.Date.today()
        for record in self:
            if record.birthday:
                record.age = today.year - record.birthday.year - (
                    (today.month, today.day) < (record.birthday.month, record.birthday.day)
                )
            else:
                record.age = 0

    @api.depends('experience_ids.start_date', 'experience_ids.end_date')
    def _compute_total_experience(self):
        """Compute total work experience in years"""
        for record in self:
            total_days = 0
            for exp in record.experience_ids:
                if exp.start_date:
                    end_date = exp.end_date or fields.Date.today()
                    delta = end_date - exp.start_date
                    total_days += delta.days
            record.total_experience_years = total_days / 365.25 if total_days > 0 else 0

    @api.depends('schedule_ids', 'schedule_ids.active')
    def _compute_active_schedules(self):
        """Compute number of active schedules"""
        for record in self:
            record.active_schedules = len(record.schedule_ids.filtered('active'))

    @api.model_create_multi
    def create(self, vals_list):
        """Override create to generate doctor code"""
        for vals in vals_list:
            if vals.get('is_doctor', False) and not vals.get('doctor_code'):
                vals['doctor_code'] = self._generate_doctor_code()
        return super().create(vals_list)

    def _generate_doctor_code(self):
        """Generate unique doctor code"""
        sequence = self.env['ir.sequence'].next_by_code('healthnusa.doctor.code')
        if not sequence:
            # Create sequence if not exists
            self.env['ir.sequence'].create({
                'name': 'Doctor Code Sequence',
                'code': 'healthnusa.doctor.code',
                'prefix': 'DR',
                'padding': 4,
                'number_increment': 1,
            })
            sequence = self.env['ir.sequence'].next_by_code('healthnusa.doctor.code')
        return sequence

    @api.constrains('str_number')
    def _check_str_number(self):
        """Validate STR number format"""
        for record in self:
            if record.str_number and record.is_doctor:
                # Check for duplicates
                duplicate = self.search([
                    ('str_number', '=', record.str_number),
                    ('id', '!=', record.id),
                    ('is_doctor', '=', True)
                ])
                if duplicate:
                    raise ValidationError(_("STR Number must be unique. This number is already used by another doctor."))
                
                # Validate format (Indonesian STR format: 16 digits)
                if not re.match(r'^\d{16}$', record.str_number):
                    raise ValidationError(_("STR Number must be 16 digits long."))

    @api.constrains('sip_number')
    def _check_sip_number(self):
        """Validate SIP number format"""
        for record in self:
            if record.sip_number and record.is_doctor:
                # Check for duplicates
                duplicate = self.search([
                    ('sip_number', '=', record.sip_number),
                    ('id', '!=', record.id),
                    ('is_doctor', '=', True)
                ])
                if duplicate:
                    raise ValidationError(_("SIP Number must be unique. This number is already used by another doctor."))

    @api.constrains('work_email')
    def _check_work_email_format(self):
        """Validate work email format"""
        for record in self:
            if record.work_email:
                email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
                if not re.match(email_regex, record.work_email):
                    raise ValidationError(_("Please enter a valid work email address."))

    def name_get(self):
        """Override name_get to show doctor code for doctors"""
        result = []
        for record in self:
            if record.is_doctor and record.doctor_code:
                name = f"[{record.doctor_code}] {record.name}"
            else:
                name = record.name
            result.append((record.id, name))
        return result

    @api.model
    def search_doctors(self, domain=None, limit=None, offset=None):
        """Custom search method for doctors with additional filters"""
        if domain is None:
            domain = []
        
        # Always filter for doctors only
        domain = [('is_doctor', '=', True)] + domain
        
        return self.search(domain, limit=limit, offset=offset)

    def toggle_duty_status(self):
        """Toggle between on_duty and off_duty"""
        for record in self:
            if record.duty_status == 'on_duty':
                record.duty_status = 'off_duty'
            else:
                record.duty_status = 'on_duty'

    def action_view_schedules(self):
        """Action to view doctor schedules"""
        self.ensure_one()
        return {
            'type': 'ir.actions.act_window',
            'name': f'Schedules - {self.name}',
            'res_model': 'healthnusa.doctor.schedule',
            'view_mode': 'tree,form',
            'domain': [('doctor_id', '=', self.id)],
            'context': {'default_doctor_id': self.id},
        }

    def action_view_documents(self):
        """Action to view doctor documents"""
        self.ensure_one()
        return {
            'type': 'ir.actions.act_window',
            'name': f'Documents - {self.name}',
            'res_model': 'healthnusa.doctor.document',
            'view_mode': 'tree,form',
            'domain': [('doctor_id', '=', self.id)],
            'context': {'default_doctor_id': self.id},
        }

    @api.model
    def get_doctor_stats(self):
        """Get statistics for doctors"""
        total_doctors = self.search_count([('is_doctor', '=', True)])
        active_doctors = self.search_count([
            ('is_doctor', '=', True),
            ('duty_status', 'in', ['on_duty', 'on_call'])
        ])
        
        return {
            'total_doctors': total_doctors,
            'active_doctors': active_doctors,
            'inactive_doctors': total_doctors - active_doctors,
        }

    # Additional methods to leverage hr.employee features
    @api.model
    def get_doctor_by_department(self, department_id):
        """Get doctors by department"""
        return self.search([
            ('is_doctor', '=', True),
            ('department_id', '=', department_id)
        ])

    @api.model
    def get_doctor_by_job_position(self, job_id):
        """Get doctors by job position"""
        return self.search([
            ('is_doctor', '=', True),
            ('job_id', '=', job_id)
        ])

    def action_view_employee_profile(self):
        """Action to view full employee profile"""
        self.ensure_one()
        return {
            'type': 'ir.actions.act_window',
            'name': f'Employee Profile - {self.name}',
            'res_model': 'hr.employee',
            'view_mode': 'form',
            'res_id': self.id,
            'target': 'current',
        }