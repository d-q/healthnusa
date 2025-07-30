from odoo import http
from odoo.http import request


class ProfileController(http.Controller):

    @http.route(['/healthnusa/profile'], type='http', auth='user', website=True)
    def show_profile_page(self):
        """Route for Profile page"""
        values = {
            'id': 'profile',
        }
        return request.render('healthnusa.page', {
            'session_info': request.env['ir.http'].session_info(),
            'debug': request.session.debug,
            'values': values,
        })