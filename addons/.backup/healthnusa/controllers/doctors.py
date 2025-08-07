from odoo import http
from odoo.http import request


class DoctorsController(http.Controller):

    @http.route(['/healthnusa/doctors'], type='http', auth='user', website=True)
    def show_doctors_page(self):
        """Route for doctors page"""
        values = {
            'id': 'doctors',
        }
        return request.render('healthnusa.page', {
            'session_info': request.env['ir.http'].session_info(),
            'debug': request.session.debug,
            'values': values,
        })

    @http.route(['/healthnusa/doctors/new'], type='http', auth='user', website=True)
    def new_doctor(self):
        """Route for new doctor page"""
        values = {
            'id': 'doctors_new',
        }
        return request.render('healthnusa.page', {
            'session_info': request.env['ir.http'].session_info(),
            'debug': request.session.debug,
            'values': values,
        })

    @http.route(['/healthnusa/doctors/<int:doctor_id>'], type='http', auth='user', website=True)
    def show_doctor_detail(self, doctor_id):
        """Route for doctor detail page"""
        return request.render('healthnusa.page', {
            'session_info': request.env['ir.http'].session_info(),
            'debug': request.session.debug,
        })

    @http.route(['/healthnusa/doctors/<int:doctor_id>/edit'], type='http', auth='user', website=True)
    def edit_doctor(self, doctor_id):
        """Route for edit doctor page"""
        return request.render('healthnusa.page', {
            'session_info': request.env['ir.http'].session_info(),
            'debug': request.session.debug,
        })