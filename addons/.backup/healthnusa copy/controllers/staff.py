from odoo import http
from odoo.http import request


class StaffController(http.Controller):

    @http.route(['/healthnusa/staff'], type='http', auth='user', website=True)
    def show_staff_page(self):
        """Route for Staff page"""
        values = {
            'id': 'staff',
        }
        return request.render('healthnusa.page', {
            'session_info': request.env['ir.http'].session_info(),
            'debug': request.session.debug,
            'values': values,
        })