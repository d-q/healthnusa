from odoo import http
from odoo.http import request


class InventoryController(http.Controller):

    @http.route(['/healthnusa/inventory'], type='http', auth='user', website=True)
    def show_inventory_page(self):
        """Route for Inventory page"""
        values = {
            'id': 'inventory',
        }
        return request.render('healthnusa.page', {
            'session_info': request.env['ir.http'].session_info(),
            'debug': request.session.debug,
            'values': values,
        })