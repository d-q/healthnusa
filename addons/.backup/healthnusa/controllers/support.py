from odoo import http
from odoo.http import request


class SupportController(http.Controller):

    @http.route(['/healthnusa/support'], type='http', auth='user', website=True)
    def show_support_page(self):
        """Route for support page"""
        values = {
            'id': 'support',
        }
        return request.render('healthnusa.page', {
            'session_info': request.env['ir.http'].session_info(),
            'debug': request.session.debug,
            'values': values,
        })