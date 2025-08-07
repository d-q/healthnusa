from odoo import models, fields, api, _
from odoo.exceptions import ValidationError
from datetime import datetime, time


class DoctorSchedule(models.Model):
    _name = 'healthnusa.doctor.schedule'
    _description = 'Doctor Practice Schedule'
    _order = 'doctor_id, day_of_week, start_time'
    _rec_name = 'display_name'

    doctor_id = fields.Many2one(
        'hr.employee',
        string='Doctor',
        required=True,
        domain=[('is_doctor', '=', True)],
        ondelete='cascade'
    )
    day_of_week = fields.Selection([
        ('monday', 'Monday'),
        ('tuesday', 'Tuesday'),
        ('wednesday', 'Wednesday'),
        ('thursday', 'Thursday'),
        ('friday', 'Friday'),
        ('saturday', 'Saturday'),
        ('sunday', 'Sunday')
    ], string='Day of Week', required=True)
    
    start_time = fields.Float(
        string='Start Time',
        required=True,
        help='Start time in 24-hour format (e.g., 9.5 for 09:30)'
    )
    end_time = fields.Float(
        string='End Time',
        required=True,
        help='End time in 24-hour format (e.g., 17.5 for 17:30)'
    )
    
    active = fields.Boolean(
        string='Active',
        default=True,
        help='If unchecked, this schedule will be inactive'
    )
    notes = fields.Text(
        string='Notes',
        help='Additional notes for this schedule'
    )
    
    # Computed fields
    display_name = fields.Char(
        string='Display Name',
        compute='_compute_display_name',
        store=True
    )
    start_time_formatted = fields.Char(
        string='Start Time',
        compute='_compute_time_formatted',
        store=True
    )
    end_time_formatted = fields.Char(
        string='End Time',
        compute='_compute_time_formatted',
        store=True
    )
    duration_hours = fields.Float(
        string='Duration (Hours)',
        compute='_compute_duration',
        store=True
    )

    @api.depends('doctor_id', 'day_of_week', 'start_time', 'end_time')
    def _compute_display_name(self):
        """Compute display name for schedule"""
        for record in self:
            if record.doctor_id and record.day_of_week:
                day_name = dict(record._fields['day_of_week'].selection)[record.day_of_week]
                start_time = record._float_to_time_string(record.start_time)
                end_time = record._float_to_time_string(record.end_time)
                record.display_name = f"{record.doctor_id.name} - {day_name} ({start_time} - {end_time})"
            else:
                record.display_name = "New Schedule"

    @api.depends('start_time', 'end_time')
    def _compute_time_formatted(self):
        """Compute formatted time strings"""
        for record in self:
            record.start_time_formatted = record._float_to_time_string(record.start_time)
            record.end_time_formatted = record._float_to_time_string(record.end_time)

    @api.depends('start_time', 'end_time')
    def _compute_duration(self):
        """Compute schedule duration in hours"""
        for record in self:
            if record.end_time > record.start_time:
                record.duration_hours = record.end_time - record.start_time
            else:
                record.duration_hours = 0

    def _float_to_time_string(self, float_time):
        """Convert float time to HH:MM string"""
        if not float_time:
            return "00:00"
        
        hours = int(float_time)
        minutes = int((float_time - hours) * 60)
        return f"{hours:02d}:{minutes:02d}"

    def _time_string_to_float(self, time_string):
        """Convert HH:MM string to float"""
        try:
            hours, minutes = map(int, time_string.split(':'))
            return hours + minutes / 60.0
        except (ValueError, AttributeError):
            return 0.0

    @api.constrains('start_time', 'end_time')
    def _check_time_validity(self):
        """Validate time constraints"""
        for record in self:
            # Check if start time is before end time
            if record.start_time >= record.end_time:
                raise ValidationError(_("Start time must be before end time."))
            
            # Check if times are within valid range (0-24)
            if not (0 <= record.start_time < 24):
                raise ValidationError(_("Start time must be between 00:00 and 23:59."))
            
            if not (0 <= record.end_time <= 24):
                raise ValidationError(_("End time must be between 00:00 and 24:00."))

    @api.constrains('doctor_id', 'day_of_week', 'start_time', 'end_time', 'active')
    def _check_schedule_overlap(self):
        """Check for overlapping schedules"""
        for record in self:
            if not record.active:
                continue
                
            # Find overlapping schedules
            overlapping = self.search([
                ('doctor_id', '=', record.doctor_id.id),
                ('day_of_week', '=', record.day_of_week),
                ('active', '=', True),
                ('id', '!=', record.id),
                '|',
                '&', ('start_time', '<=', record.start_time), ('end_time', '>', record.start_time),
                '&', ('start_time', '<', record.end_time), ('end_time', '>=', record.end_time),
            ])
            
            if overlapping:
                day_name = dict(record._fields['day_of_week'].selection)[record.day_of_week]
                raise ValidationError(
                    _("Schedule overlaps with existing schedule on %s. "
                      "Please check the time slots.") % day_name
                )

    @api.model
    def get_doctor_weekly_schedule(self, doctor_id):
        """Get formatted weekly schedule for a doctor"""
        schedules = self.search([
            ('doctor_id', '=', doctor_id),
            ('active', '=', True)
        ])
        
        weekly_schedule = {
            'monday': [],
            'tuesday': [],
            'wednesday': [],
            'thursday': [],
            'friday': [],
            'saturday': [],
            'sunday': []
        }
        
        for schedule in schedules:
            weekly_schedule[schedule.day_of_week].append({
                'id': schedule.id,
                'start_time': schedule.start_time_formatted,
                'end_time': schedule.end_time_formatted,
                'duration': schedule.duration_hours,
                'notes': schedule.notes,
            })
        
        return weekly_schedule

    @api.model
    def create_weekly_schedule(self, doctor_id, schedule_data):
        """Create multiple schedules for a week"""
        created_schedules = []
        
        for day, slots in schedule_data.items():
            if day not in ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']:
                continue
                
            for slot in slots:
                if slot.get('start_time') and slot.get('end_time'):
                    schedule_vals = {
                        'doctor_id': doctor_id,
                        'day_of_week': day,
                        'start_time': self._time_string_to_float(slot['start_time']),
                        'end_time': self._time_string_to_float(slot['end_time']),
                        'active': slot.get('active', True),
                        'notes': slot.get('notes', ''),
                    }
                    schedule = self.create(schedule_vals)
                    created_schedules.append(schedule)
        
        return created_schedules

    def action_toggle_active(self):
        """Toggle active status"""
        for record in self:
            record.active = not record.active

    @api.model
    def get_available_doctors(self, day_of_week, time_slot):
        """Get doctors available on specific day and time"""
        available_schedules = self.search([
            ('day_of_week', '=', day_of_week),
            ('start_time', '<=', time_slot),
            ('end_time', '>', time_slot),
            ('active', '=', True)
        ])
        
        return available_schedules.mapped('doctor_id')