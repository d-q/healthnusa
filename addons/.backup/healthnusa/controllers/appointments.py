from odoo import http
from odoo.http import request


class AppointmentsController(http.Controller):

    @http.route(['/healthnusa/appointments'], type='http', auth='user', website=True)
    def show_appointments_page(self):
        """Route for appointments page"""
        values = {
            'id': 'appointments',
        }
        return request.render('healthnusa.page', {
            'session_info': request.env['ir.http'].session_info(),
            'debug': request.session.debug,
            'values': values,
        })