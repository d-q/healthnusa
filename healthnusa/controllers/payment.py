from odoo import http
from odoo.http import request


class PaymentController(http.Controller):

    @http.route(['/healthnusa/payment'], type='http', auth='user', website=True)
    def show_payment_page(self):
        """Route for payment page"""
        values = {
            'id': 'payment',
        }
        return request.render('healthnusa.page', {
            'session_info': request.env['ir.http'].session_info(),
            'debug': request.session.debug,
            'values': values,
        })