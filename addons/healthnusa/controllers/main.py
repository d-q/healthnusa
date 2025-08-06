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
    

    @http.route('/api/healthnusa/employees', type='json', auth='user')
    def get_employees(self):
        """Endpoint to get list of employees as JSON"""
        employees = request.env['hr.employee'].sudo().search([])
        employee_list = [
            {
                'id': emp.id,
                'name': emp.name,
                'work_email': emp.work_email,
                'job_title': emp.job_title,
            }
            for emp in employees
        ]
        return {'employees': employee_list}