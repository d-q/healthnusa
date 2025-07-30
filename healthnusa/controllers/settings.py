from odoo import http
from odoo.http import request


class SettingsController(http.Controller):

    @http.route(['/healthnusa/settings'], type='http', auth='user', website=True)
    def show_settings_page(self):
        """Route for settings page"""
        values = {
            'id': 'settings',
        }
        return request.render('healthnusa.page', {
            'session_info': request.env['ir.http'].session_info(),
            'debug': request.session.debug,
            'values': values,
        })