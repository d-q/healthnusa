from odoo import models, fields, api, _
from odoo.exceptions import ValidationError


class DoctorSpecialty(models.Model):
    _name = 'healthnusa.doctor.specialty'
    _description = 'Doctor Medical Specialty'
    _order = 'name asc'
    _rec_name = 'name'

    name = fields.Char(
        string='Specialty Name',
        required=True,
        translate=True,
        help='Name of the medical specialty'
    )
    code = fields.Char(
        string='Specialty Code',
        required=True,
        help='Short code for the specialty'
    )
    description = fields.Text(
        string='Description',
        translate=True,
        help='Description of the medical specialty'
    )
    active = fields.Boolean(
        string='Active',
        default=True,
        help='If unchecked, this specialty will be hidden from selection'
    )
    color = fields.Integer(
        string='Color',
        help='Color for UI display'
    )
    icon = fields.Char(
        string='Icon',
        default='medical_services',
        help='Material icon name for UI display'
    )
    
    # Relationships
    doctor_ids = fields.One2many(
        'hr.employee',
        'specialty_id',
        string='Doctors',
        domain=[('is_doctor', '=', True)]
    )
    
    # Computed fields
    doctor_count = fields.Integer(
        string='Number of Doctors',
        compute='_compute_doctor_count',
        store=True
    )

    @api.depends('doctor_ids')
    def _compute_doctor_count(self):
        """Compute number of doctors in this specialty"""
        for record in self:
            record.doctor_count = len(record.doctor_ids)

    @api.constrains('code')
    def _check_code_uniqueness(self):
        """Ensure specialty code is unique"""
        for record in self:
            if record.code:
                duplicate = self.search([
                    ('code', '=', record.code),
                    ('id', '!=', record.id)
                ])
                if duplicate:
                    raise ValidationError(_("Specialty code must be unique. '%s' is already used.") % record.code)

    @api.constrains('name')
    def _check_name_uniqueness(self):
        """Ensure specialty name is unique"""
        for record in self:
            if record.name:
                duplicate = self.search([
                    ('name', '=', record.name),
                    ('id', '!=', record.id)
                ])
                if duplicate:
                    raise ValidationError(_("Specialty name must be unique. '%s' is already used.") % record.name)

    def name_get(self):
        """Override name_get to show code and name"""
        result = []
        for record in self:
            name = f"[{record.code}] {record.name}" if record.code else record.name
            result.append((record.id, name))
        return result

    @api.model
    def _name_search(self, name='', args=None, operator='ilike', limit=100, name_get_uid=None):
        """Override name search to search in both name and code"""
        if args is None:
            args = []
        
        if name:
            # Search in both name and code
            domain = ['|', ('name', operator, name), ('code', operator, name)]
            specialty_ids = self.search(domain + args, limit=limit)
            return specialty_ids.name_get()
        
        return super()._name_search(name, args, operator, limit, name_get_uid)

    def action_view_doctors(self):
        """Action to view doctors in this specialty"""
        self.ensure_one()
        return {
            'type': 'ir.actions.act_window',
            'name': f'Doctors - {self.name}',
            'res_model': 'hr.employee',
            'view_mode': 'tree,form',
            'domain': [('specialty_id', '=', self.id), ('is_doctor', '=', True)],
            'context': {'default_specialty_id': self.id, 'default_is_doctor': True},
        }

    @api.model
    def get_specialty_stats(self):
        """Get statistics for specialties"""
        specialties = self.search([])
        stats = []
        
        for specialty in specialties:
            active_doctors = len(specialty.doctor_ids.filtered(
                lambda d: d.duty_status in ['on_duty', 'on_call']
            ))
            stats.append({
                'id': specialty.id,
                'name': specialty.name,
                'code': specialty.code,
                'total_doctors': specialty.doctor_count,
                'active_doctors': active_doctors,
                'color': specialty.color,
                'icon': specialty.icon,
            })
        
        return stats