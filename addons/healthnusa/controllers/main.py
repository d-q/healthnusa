from odoo import http
from odoo.http import request


class HealthnusaController(http.Controller):

    @http.route(['/healthnusa'], type='http', auth='user', website=True)
    def show_healthnusa_page(self):
        """Main route for HealthNusa application"""
        return request.render('healthnusa.page', {
            'session_info': request.env['ir.http'].session_info(),
            'debug': request.session.debug,
        })
    