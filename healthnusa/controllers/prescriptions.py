from odoo import http
from odoo.http import request


class PrescriptionsController(http.Controller):

    @http.route(['/healthnusa/prescriptions'], type='http', auth='user', website=True)
    def show_prescriptions_page(self):
        """Route for prescriptions page"""
        values = {
            'id': 'prescriptions',
        }
        return request.render('healthnusa.page', {
            'session_info': request.env['ir.http'].session_info(),
            'debug': request.session.debug,
            'values': values,
        })