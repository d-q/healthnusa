from odoo import http
from odoo.http import request


class HealthnusaController(http.Controller):

    @http.route(['/emr', '/emr/<path:subpath>'], type='http', auth='user', website=True)
    def show_healthnusa_page(self, **kwargs):
        """Main route for HealthNusa application - handles all /emr/* routes for SPA"""
        return request.render('healthnusa.page', {
            'session_info': request.env['ir.http'].session_info(),
            'debug': request.session.debug
        })
    