from odoo import http
from odoo.http import request


class PatientController(http.Controller):

    @http.route(['/healthnusa/patient'], type='http', auth='user', website=True)
    def show_patient_page(self):
        """Route for patient page"""
        values = {
            'id': 'patient',
        }
        return request.render('healthnusa.page', {
            'session_info': request.env['ir.http'].session_info(),
            'debug': request.session.debug,
            'values': values,
        })