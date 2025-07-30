from odoo import http
from odoo.http import request


class InsuranceController(http.Controller):

    @http.route(['/healthnusa/insurance'], type='http', auth='user', website=True)
    def show_insurance_page(self):
        """Route for Insurance page"""
        values = {
            'id': 'insurance',
        }
        return request.render('healthnusa.page', {
            'session_info': request.env['ir.http'].session_info(),
            'debug': request.session.debug,
            'values': values,
        })