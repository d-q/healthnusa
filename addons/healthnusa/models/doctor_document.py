from odoo import models, fields, api, _
from odoo.exceptions import ValidationError
import base64
import mimetypes


class DoctorDocument(models.Model):
    _name = 'healthnusa.doctor.document'
    _description = 'Doctor Documents'
    _order = 'doctor_id, document_type, create_date desc'
    _rec_name = 'display_name'

    doctor_id = fields.Many2one(
        'hr.employee',
        string='Doctor',
        required=True,
        domain=[('is_doctor', '=', True)],
        ondelete='cascade'
    )
    name = fields.Char(
        string='Document Name',
        required=True,
        help='Name or title of the document'
    )
    document_type = fields.Selection([
        ('str', 'STR (Medical Registration)'),
        ('sip', 'SIP (Practice License)'),
        ('diploma', 'Diploma/Certificate'),
        ('id_card', 'ID Card'),
        ('cv', 'Curriculum Vitae'),
        ('photo', 'Professional Photo'),
        ('contract', 'Employment Contract'),
        ('insurance', 'Insurance Document'),
        ('other', 'Other')
    ], string='Document Type', required=True, default='other')
    
    file_data = fields.Binary(
        string='File',
        required=True,
        help='Upload the document file'
    )
    filename = fields.Char(
        string='Filename',
        required=True
    )
    file_size = fields.Integer(
        string='File Size (bytes)',
        compute='_compute_file_info',
        store=True
    )
    file_type = fields.Char(
        string='File Type',
        compute='_compute_file_info',
        store=True
    )
    
    issue_date = fields.Date(
        string='Issue Date',
        help='Date when document was issued'
    )
    expiry_date = fields.Date(
        string='Expiry Date',
        help='Date when document expires'
    )
    issuing_authority = fields.Char(
        string='Issuing Authority',
        help='Authority that issued the document'
    )
    document_number = fields.Char(
        string='Document Number',
        help='Official document number'
    )
    description = fields.Text(
        string='Description',
        help='Additional notes about the document'
    )
    
    active = fields.Boolean(
        string='Active',
        default=True
    )
    is_verified = fields.Boolean(
        string='Verified',
        default=False,
        help='Whether the document has been verified'
    )
    verified_by = fields.Many2one(
        'res.users',
        string='Verified By',
        help='User who verified the document'
    )
    verified_date = fields.Datetime(
        string='Verified Date',
        help='Date when document was verified'
    )
    
    # Computed fields
    display_name = fields.Char(
        string='Display Name',
        compute='_compute_display_name',
        store=True
    )
    is_expired = fields.Boolean(
        string='Is Expired',
        compute='_compute_expiry_status',
        store=True
    )
    days_to_expiry = fields.Integer(
        string='Days to Expiry',
        compute='_compute_expiry_status',
        store=True
    )
    file_size_display = fields.Char(
        string='File Size',
        compute='_compute_file_size_display',
        store=True
    )

    @api.depends('name', 'document_type', 'filename')
    def _compute_display_name(self):
        """Compute display name for document"""
        for record in self:
            doc_type = dict(record._fields['document_type'].selection).get(record.document_type, '')
            if record.name:
                record.display_name = f"{record.name} ({doc_type})"
            elif record.filename:
                record.display_name = f"{record.filename} ({doc_type})"
            else:
                record.display_name = f"New Document ({doc_type})"

    @api.depends('file_data', 'filename')
    def _compute_file_info(self):
        """Compute file information"""
        for record in self:
            if record.file_data:
                # Decode base64 to get actual file size
                try:
                    file_content = base64.b64decode(record.file_data)
                    record.file_size = len(file_content)
                except:
                    record.file_size = 0
                
                # Get MIME type from filename
                if record.filename:
                    mime_type, _ = mimetypes.guess_type(record.filename)
                    record.file_type = mime_type or 'application/octet-stream'
                else:
                    record.file_type = 'application/octet-stream'
            else:
                record.file_size = 0
                record.file_type = ''

    @api.depends('expiry_date')
    def _compute_expiry_status(self):
        """Compute expiry status"""
        today = fields.Date.today()
        for record in self:
            if record.expiry_date:
                delta = record.expiry_date - today
                record.days_to_expiry = delta.days
                record.is_expired = delta.days < 0
            else:
                record.days_to_expiry = 0
                record.is_expired = False

    @api.depends('file_size')
    def _compute_file_size_display(self):
        """Compute human-readable file size"""
        for record in self:
            if record.file_size:
                size = record.file_size
                for unit in ['B', 'KB', 'MB', 'GB']:
                    if size < 1024:
                        record.file_size_display = f"{size:.1f} {unit}"
                        break
                    size /= 1024
                else:
                    record.file_size_display = f"{size:.1f} TB"
            else:
                record.file_size_display = "0 B"

    @api.constrains('file_data', 'file_size')
    def _check_file_size(self):
        """Validate file size (max 10MB)"""
        max_size = 10 * 1024 * 1024  # 10MB
        for record in self:
            if record.file_size > max_size:
                raise ValidationError(_("File size cannot exceed 10MB. Current size: %s") % record.file_size_display)

    @api.constrains('filename')
    def _check_file_type(self):
        """Validate file type"""
        allowed_extensions = ['.pdf', '.jpg', '.jpeg', '.png', '.doc', '.docx', '.txt']
        for record in self:
            if record.filename:
                file_ext = record.filename.lower().split('.')[-1] if '.' in record.filename else ''
                if f'.{file_ext}' not in allowed_extensions:
                    raise ValidationError(
                        _("File type '.%s' is not allowed. Allowed types: %s") % 
                        (file_ext, ', '.join(allowed_extensions))
                    )

    @api.constrains('issue_date', 'expiry_date')
    def _check_dates(self):
        """Validate document dates"""
        for record in self:
            if record.issue_date and record.issue_date > fields.Date.today():
                raise ValidationError(_("Issue date cannot be in the future."))
            
            if record.issue_date and record.expiry_date:
                if record.expiry_date <= record.issue_date:
                    raise ValidationError(_("Expiry date must be after issue date."))

    def action_verify_document(self):
        """Mark document as verified"""
        self.ensure_one()
        self.write({
            'is_verified': True,
            'verified_by': self.env.user.id,
            'verified_date': fields.Datetime.now(),
        })

    def action_unverify_document(self):
        """Remove verification"""
        self.ensure_one()
        self.write({
            'is_verified': False,
            'verified_by': False,
            'verified_date': False,
        })

    def action_download_document(self):
        """Download document action"""
        self.ensure_one()
        return {
            'type': 'ir.actions.act_url',
            'url': f'/web/content/healthnusa.doctor.document/{self.id}/file_data/{self.filename}?download=true',
            'target': 'self',
        }

    @api.model
    def get_expiring_documents(self, days=30):
        """Get documents expiring within specified days"""
        future_date = fields.Date.today() + fields.timedelta(days=days)
        return self.search([
            ('expiry_date', '!=', False),
            ('expiry_date', '<=', future_date),
            ('active', '=', True)
        ])

    @api.model
    def get_doctor_document_summary(self, doctor_id):
        """Get document summary for a doctor"""
        documents = self.search([
            ('doctor_id', '=', doctor_id),
            ('active', '=', True)
        ])
        
        verified_count = len(documents.filtered('is_verified'))
        expired_count = len(documents.filtered('is_expired'))
        expiring_soon = len(documents.filtered(lambda d: d.days_to_expiry <= 30 and d.days_to_expiry >= 0))
        
        return {
            'total_documents': len(documents),
            'verified_documents': verified_count,
            'expired_documents': expired_count,
            'expiring_soon': expiring_soon,
            'by_type': {
                doc_type: len(documents.filtered(lambda d: d.document_type == doc_type))
                for doc_type in dict(self._fields['document_type'].selection).keys()
            }
        }