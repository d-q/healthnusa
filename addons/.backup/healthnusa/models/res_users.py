from odoo import models, fields, api, _
from odoo.exceptions import UserError

class ResUsers(models.Model):
    _inherit = 'res.users'

    sidebar_expanded = fields.Boolean(string="Sidebar Expanded", default=True)
    dark_mode = fields.Boolean(string="Dark Mode", default=False)