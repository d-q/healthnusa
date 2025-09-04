from odoo import http, fields
from odoo.http import request
import json
import base64
import logging

_logger = logging.getLogger(__name__)


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

    @http.route('/healthnusa/profile/get', type='json', auth='user', methods=['POST'])
    def get_profile_data(self):
        """Get current user profile data"""
        try:
            user = request.env.user
            
            # Get additional user info from res.partner
            partner = user.partner_id
            
            profile_data = {
                'id': user.id,
                'name': user.name,
                'email': user.login,
                'role': 'Employee',
                'employeeId': f'EMP{str(user.id).zfill(3)}',
                'department': partner.category_id[0].name if partner.category_id else 'General',
                'status': 'Active' if user.active else 'Inactive',
                'gender': partner.title.name if partner.title else '',
                'dateOfBirth': partner.birthdate.strftime('%Y-%m-%d') if partner.birthdate else '',
                'phone': partner.phone or partner.mobile or '',
                'address': partner.street or '',
                'profileImage': f'/web/image/res.partner/{partner.id}/avatar_1024' if partner.avatar_1024 else '',
                'emergencyContactName': partner.x_emergency_contact_name or '',
                'emergencyContactPhone': partner.x_emergency_contact_phone or '',
                'emergencyContactRelation': partner.x_emergency_contact_relation or ''
            }
            
            return {
                'success': True,
                'data': profile_data
            }
            
        except Exception as e:
            _logger.error(f"Error getting profile data: {str(e)}")
            return {
                'success': False,
                'message': 'Failed to load profile data'
            }

    @http.route('/healthnusa/profile/update', type='json', auth='user', methods=['POST'])
    def update_profile(self, profile_data):
        """Update user profile data"""
        try:
            user = request.env.user
            partner = user.partner_id
            
            # Validate required fields
            if not profile_data.get('name'):
                return {
                    'success': False,
                    'message': 'Name is required'
                }
            
            if not profile_data.get('email'):
                return {
                    'success': False,
                    'message': 'Email is required'
                }
            
            # Update user data
            user.write({
                'name': profile_data['name'],
                'login': profile_data['email']
            })
            
            # Update partner data
            partner_values = {
                'name': profile_data['name'],
                'email': profile_data['email'],
                'phone': profile_data.get('phone', ''),
                'street': profile_data.get('address', ''),
            }
            
            # Handle date of birth
            if profile_data.get('dateOfBirth'):
                partner_values['birthdate'] = fields.Date.from_string(profile_data['dateOfBirth'])
            
            # Handle gender (title)
            if profile_data.get('gender'):
                title = request.env['res.partner.title'].search([('name', '=', profile_data['gender'])], limit=1)
                if title:
                    partner_values['title'] = title.id
            
            # Update emergency contact fields (custom fields)
            if hasattr(partner, 'x_emergency_contact_name'):
                partner_values['x_emergency_contact_name'] = profile_data.get('emergencyContactName', '')
            if hasattr(partner, 'x_emergency_contact_phone'):
                partner_values['x_emergency_contact_phone'] = profile_data.get('emergencyContactPhone', '')
            if hasattr(partner, 'x_emergency_contact_relation'):
                partner_values['x_emergency_contact_relation'] = profile_data.get('emergencyContactRelation', '')
            
            partner.write(partner_values)
            
            return {
                'success': True,
                'message': 'Profile updated successfully'
            }
            
        except Exception as e:
            _logger.error(f"Error updating profile: {str(e)}")
            return {
                'success': False,
                'message': f'Failed to update profile: {str(e)}'
            }

    @http.route('/healthnusa/profile/change_password', type='json', auth='user', methods=['POST'])
    def change_password(self, current_password, new_password):
        """Change user password"""
        try:
            user = request.env.user
            
            # Verify current password
            try:
                request.env['res.users'].sudo(user.id).check_credentials(current_password)
            except Exception:
                return {
                    'success': False,
                    'message': 'Current password is incorrect'
                }
            
            # Validate new password
            if len(new_password) < 8:
                return {
                    'success': False,
                    'message': 'New password must be at least 8 characters long'
                }
            
            # Update password
            user.sudo().write({
                'password': new_password
            })
            
            return {
                'success': True,
                'message': 'Password changed successfully'
            }
            
        except Exception as e:
            _logger.error(f"Error changing password: {str(e)}")
            return {
                'success': False,
                'message': 'Failed to change password'
            }

    @http.route('/healthnusa/profile/upload_image', type='http', auth='user', methods=['POST'])
    def upload_profile_image(self, **kwargs):
        """Upload profile image"""
        try:
            user = request.env.user
            partner = user.partner_id
            
            if 'image' not in request.httprequest.files:
                return json.dumps({
                    'success': False,
                    'message': 'No image file provided'
                })
            
            image_file = request.httprequest.files['image']
            
            if not image_file.filename:
                return json.dumps({
                    'success': False,
                    'message': 'No image file selected'
                })
            
            # Validate file type
            allowed_types = ['image/jpeg', 'image/png', 'image/gif']
            if image_file.content_type not in allowed_types:
                return json.dumps({
                    'success': False,
                    'message': 'Only JPEG, PNG, and GIF files are allowed'
                })
            
            # Validate file size (5MB max)
            if image_file.content_length > 5 * 1024 * 1024:
                return json.dumps({
                    'success': False,
                    'message': 'Image size must be less than 5MB'
                })
            
            # Read and encode image
            image_data = image_file.read()
            image_base64 = base64.b64encode(image_data)
            
            # Update partner avatar
            partner.write({
                'image_1920': image_base64
            })
            
            return json.dumps({
                'success': True,
                'message': 'Profile image updated successfully',
                'image_url': f'/web/image/res.partner/{partner.id}/avatar_1024'
            })
            
        except Exception as e:
            _logger.error(f"Error uploading profile image: {str(e)}")
            return json.dumps({
                'success': False,
                'message': 'Failed to upload profile image'
            })