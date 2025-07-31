# HealthNusa - Electronic Medical Record System

![HealthNusa Logo](static/description/icon.png)

Sistem Elektronik Kesehatan Nusantara - Comprehensive healthcare management system built on Odoo 18.

## Features

### 🏥 Doctor Management
- Complete doctor profiles with personal and professional information
- Medical specialties management
- Practice schedule management
- Education and experience tracking
- Document management (STR, SIP, certificates)
- Real-time validation for medical registration numbers

### 📊 Dashboard & Analytics
- Real-time dashboard with key metrics
- Doctor availability status
- Document expiry tracking
- Specialty distribution analytics

### 📱 Modern UI/UX
- Responsive design for mobile, tablet, and desktop
- Dark/Light theme support
- Loading states and error handling
- Empty states with helpful messages
- Real-time notifications
- Keyboard shortcuts support

### 🔐 Security & Access Control
- Role-based access control
- Data encryption and secure storage
- Audit trails for all operations
- Multi-level user permissions

## Installation

### Prerequisites
- Odoo 18.0+
- Python 3.8+
- PostgreSQL 12+

### Installation Steps

1. **Clone the module:**
```bash
git clone https://github.com/yourorg/healthnusa.git
cd healthnusa
```

2. **Copy to Odoo addons directory:**
```bash
cp -r healthnusa /path/to/odoo/addons/
```

3. **Update module list:**
```bash
./odoo-bin -u base -d your_database --addons-path=/path/to/addons
```

4. **Install the module:**
- Go to Apps menu in Odoo
- Search for "HealthNusa"
- Click Install

## Configuration

### Initial Setup

1. **Create User Groups:**
   - Navigate to Settings > Users & Companies > Groups
   - Assign users to appropriate HealthNusa groups:
     - HealthNusa User (basic access)
     - HealthNusa Doctor (doctor portal access)
     - HealthNusa Administrator (full CRUD access)
     - HealthNusa Manager (system configuration)

2. **Configure Medical Specialties:**
   - Go to HealthNusa > Configuration > Medical Specialties
   - Add or modify specialties as needed
   - Set colors and icons for better visualization

3. **Set up Document Types:**
   - Configure required document types for your region
   - Set validation rules for document numbers
   - Configure expiry notifications

## Usage

### Doctor Management

#### Adding a New Doctor
1. Navigate to HealthNusa > Doctors > All Doctors
2. Click "Add Doctor" button
3. Fill in the required information:
   - **Basic Info:** Name, email, phone, specialty
   - **Professional Info:** STR number, SIP number, duty status
   - **Address:** Complete address information
4. Add education history in the Education tab
5. Add work experience in the Experience tab
6. Set up practice schedule in the Schedule tab
7. Upload documents in the Documents tab

#### Managing Doctor Schedules
```javascript
// Example schedule data structure
{
  "monday": [
    {"start_time": "09:00", "end_time": "17:00", "active": true}
  ],
  "tuesday": [
    {"start_time": "08:00", "end_time": "12:00", "active": true},
    {"start_time": "14:00", "end_time": "18:00", "active": true}
  ]
  // ... other days
}
```

#### Document Management
- Upload required documents (STR, SIP, certificates)
- Set expiry dates for automatic notifications
- Mark documents as verified
- Download documents when needed

### API Usage

#### Doctor API Endpoints

**Get Doctors List:**
```javascript
// GET /healthnusa/api/doctors
const response = await fetch('/healthnusa/api/doctors', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    page: 1,
    limit: 10,
    search: 'John',
    specialty_id: 1,
    duty_status: 'on_duty'
  })
});
```

**Create Doctor:**
```javascript
// POST /healthnusa/api/doctors
const doctorData = {
  name: 'Dr. John Smith',
  email: 'john@hospital.com',
  specialty_id: 1,
  str_number: '1234567890123456',
  // ... other fields
};

const response = await fetch('/healthnusa/api/doctors', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(doctorData)
});
```

**Update Doctor:**
```javascript
// PUT /healthnusa/api/doctors/123
const updateData = {
  duty_status: 'off_duty',
  phone: '+62 812 3456 7890'
};

const response = await fetch('/healthnusa/api/doctors/123', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(updateData)
});
```

### Frontend Components

#### Using ORM Service
```javascript
import { useService } from "@odoo/owl";

export class MyComponent extends Component {
  setup() {
    this.orm = useService("healthnusa.orm");
  }

  async loadDoctors() {
    const result = await this.orm.searchRead(
      'hr.employee',
      [['is_doctor', '=', true]],
      ['name', 'specialty_id', 'duty_status']
    );
    
    if (result.success) {
      this.doctors = result.records;
    }
  }
}
```

#### Using Doctor Service
```javascript
import { useService } from "@odoo/owl";

export class DoctorComponent extends Component {
  setup() {
    this.doctorService = useService("healthnusa.doctor");
  }

  async createDoctor(doctorData) {
    const result = await this.doctorService.createDoctor(doctorData);
    if (result.success) {
      // Handle success
      this.notification.add('Doctor created successfully!', {type: 'success'});
    }
  }
}
```

## Development

### Project Structure
```
healthnusa/
├── __init__.py
├── __manifest__.py
├── README.md
├── controllers/
│   ├── __init__.py
│   ├── main.py          # Main HTTP routes
│   └── api.py           # API endpoints
├── models/
│   ├── __init__.py
│   ├── hr_employee.py   # Doctor model (extends hr.employee)
│   ├── doctor_specialty.py
│   ├── doctor_schedule.py
│   ├── doctor_education.py
│   ├── doctor_experience.py
│   └── doctor_document.py
├── security/
│   ├── security.xml     # User groups and record rules
│   └── ir.model.access.csv
├── views/
│   ├── templates.xml    # Web templates
│   ├── doctor_views.xml # Doctor views
│   └── menu_views.xml   # Menu structure
├── data/
│   └── specialty_data.xml
├── demo/
│   └── demo_data.xml
└── static/
    └── src/
        ├── css/
        │   └── main.css
        ├── js/
        │   └── main.js
        ├── services/
        │   ├── orm_service.js
        │   └── doctor_service.js
        └── components/
            ├── root/
            ├── layout/
            ├── doctor/
            ├── dashboard/
            └── common/
```

### Adding New Components

1. **Create component file:**
```javascript
// static/src/components/my_component/my_component.js
import { Component } from "@odoo/owl";

export class MyComponent extends Component {
    static template = "healthnusa.MyComponent";
    static props = {
        // Define props
    };
}
```

2. **Create template file:**
```xml
<!-- static/src/components/my_component/my_component.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<templates xml:space="preserve">
    <t t-name="healthnusa.MyComponent">
        <!-- Template content -->
    </t>
</templates>
```

3. **Register in manifest:**
```python
# Add to assets in __manifest__.py
'healthnusa/static/src/components/my_component/my_component.js',
'healthnusa/static/src/components/my_component/my_component.xml',
```

### Custom Validation

#### Server-side validation:
```python
# In model
@api.constrains('str_number')
def _check_str_number(self):
    for record in self:
        if not re.match(r'^\d{16}$', record.str_number):
            raise ValidationError("STR number must be 16 digits")
```

#### Client-side validation:
```javascript
// In service or component
async validateField(field, value, recordId = null) {
    const result = await this.doctorService.validateField(field, value, recordId);
    return result;
}
```

## Testing

### Running Tests
```bash
# Run all tests
./odoo-bin --test-enable --test-tags healthnusa -d test_db

# Run specific test
./odoo-bin --test-enable --test-tags healthnusa.test_doctor -d test_db
```

### Test Structure
```python
# tests/test_doctor.py
from odoo.tests import TransactionCase
from odoo.exceptions import ValidationError

class TestDoctor(TransactionCase):
    def setUp(self):
        super().setUp()
        self.specialty = self.env['healthnusa.doctor.specialty'].create({
            'name': 'Test Specialty',
            'code': 'TEST'
        })

    def test_create_doctor(self):
        doctor = self.env['hr.employee'].create({
            'name': 'Test Doctor',
            'is_doctor': True,
            'specialty_id': self.specialty.id,
            'str_number': '1234567890123456'
        })
        self.assertTrue(doctor.doctor_code)
        self.assertEqual(doctor.specialty_id, self.specialty)
```

## Customization

### Adding Custom Fields
```python
# In custom module inheriting healthnusa
class ResPartner(models.Model):
    _inherit = 'hr.employee'
    
    custom_field = fields.Char('Custom Field')
```

### Extending API
```python
# In controllers/api.py
@http.route(['/healthnusa/api/custom'], type='json', auth='user')
def custom_endpoint(self, **params):
    # Custom logic
    return {'success': True, 'data': 'custom_data'}
```

## Troubleshooting

### Common Issues

1. **Module not showing in Apps:**
   - Check __manifest__.py syntax
   - Verify module is in addons path
   - Update apps list: `./odoo-bin --update all`

2. **Permission Denied:**
   - Check user group assignments
   - Verify record rules in security.xml
   - Check ir.model.access.csv

3. **JavaScript errors:**
   - Check browser console for errors
   - Verify all JS files are included in manifest
   - Check component dependencies

4. **Database errors:**
   - Check model field definitions
   - Verify foreign key relationships
   - Run database upgrade: `./odoo-bin -u healthnusa -d your_db`

### Debug Mode

Enable debug mode for detailed error messages:
```bash
./odoo-bin --dev=all -d your_database
```

### Logging

Add logging to debug issues:
```python
import logging
_logger = logging.getLogger(__name__)

class MyModel(models.Model):
    def my_method(self):
        _logger.info("Debug message")
        _logger.error("Error message")
```

## Performance Optimization

### Database Optimization
- Use appropriate indexes on frequently queried fields
- Implement computed fields with `store=True` when needed
- Use `@api.depends` correctly for computed fields

### Frontend Optimization
- Implement lazy loading for large datasets
- Use pagination for list views
- Optimize image sizes and formats
- Minimize API calls with batch operations

### Caching
```python
# Use Odoo's caching decorators
from odoo.tools import ormcache

class MyModel(models.Model):
    @ormcache('specialty_id')
    def _get_cached_data(self, specialty_id):
        # Expensive computation
        return result
```

## Security Best Practices

### Input Validation
- Always validate user inputs
- Use parameterized queries
- Sanitize file uploads
- Implement rate limiting

### Access Control
```xml
<!-- security/security.xml -->
<record id="rule_doctor_own_records" model="ir.rule">
    <field name="name">Doctor: Own Records Only</field>
    <field name="model_id" ref="model_hr_employee"/>
    <field name="domain_force">[('id', '=', user.partner_id.id)]</field>
    <field name="groups" eval="[(4, ref('group_healthnusa_doctor'))]"/>
</record>
```

### Data Protection
- Encrypt sensitive data
- Implement audit trails
- Regular security updates
- Backup strategies

## Deployment

### Production Setup

1. **Environment Configuration:**
```bash
# Environment variables
export ODOO_DATABASE_NAME=healthnusa_prod
export ODOO_DATABASE_USER=odoo
export ODOO_DATABASE_PASSWORD=secure_password
export ODOO_ADMIN_PASSWORD=admin_password
```

2. **Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name healthnusa.yourdomain.com;
    
    location / {
        proxy_pass http://localhost:8069;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
    
    location /web/static/ {
        alias /path/to/odoo/addons/web/static/;
        expires 1y;
    }
}
```

3. **SSL Setup:**
```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d healthnusa.yourdomain.com
```

### Docker Deployment

**Dockerfile:**
```dockerfile
FROM odoo:18.0

USER root
RUN apt-get update && apt-get install -y \
    python3-pip \
    && rm -rf /var/lib/apt/lists/*

COPY ./healthnusa /mnt/extra-addons/healthnusa/
COPY ./requirements.txt /tmp/requirements.txt
RUN pip3 install -r /tmp/requirements.txt

USER odoo
```

**docker-compose.yml:**
```yaml
version: '3.8'
services:
  db:
    image: postgres:13
    environment:
      POSTGRES_DB: odoo
      POSTGRES_USER: odoo
      POSTGRES_PASSWORD: odoo
    volumes:
      - odoo-db-data:/var/lib/postgresql/data

  odoo:
    build: .
    depends_on:
      - db
    ports:
      - "8069:8069"
    environment:
      HOST: db
      USER: odoo
      PASSWORD: odoo
    volumes:
      - odoo-web-data:/var/lib/odoo
      - ./config:/etc/odoo
      - ./addons:/mnt/extra-addons

volumes:
  odoo-web-data:
  odoo-db-data:
```

## Monitoring & Maintenance

### Health Checks
```python
# Add health check endpoint
@http.route(['/healthnusa/health'], type='http', auth='none')
def health_check(self):
    try:
        # Check database connection
        self.env.cr.execute("SELECT 1")
        return "OK"
    except Exception as e:
        return f"ERROR: {str(e)}", 500
```

### Backup Strategy
```bash
#!/bin/bash
# Backup script
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump -h localhost -U odoo odoo > backup_$DATE.sql
```

### Log Monitoring
```python
# Add structured logging
import structlog

logger = structlog.get_logger(__name__)

def log_doctor_action(action, doctor_id, user_id):
    logger.info(
        "doctor_action",
        action=action,
        doctor_id=doctor_id,
        user_id=user_id,
        timestamp=fields.Datetime.now()
    )
```

## Contributing

### Development Workflow

1. **Fork the repository**
2. **Create feature branch:**
```bash
git checkout -b feature/new-feature
```

3. **Make changes and test:**
```bash
# Run tests
./odoo-bin --test-enable --test-tags healthnusa -d test_db

# Run linting
flake8 healthnusa/
pylint healthnusa/
```

4. **Commit changes:**
```bash
git commit -m "feat: add new feature description"
```

5. **Push and create PR:**
```bash
git push origin feature/new-feature
```

### Code Standards

#### Python (PEP 8)
- Use 4 spaces for indentation
- Maximum line length: 88 characters
- Use meaningful variable names
- Add docstrings to all functions

#### JavaScript (ESLint)
- Use ES6+ features
- Prefer const/let over var
- Use arrow functions when appropriate
- Add JSDoc comments

#### XML
- Use 4 spaces for indentation
- Keep attributes on same line if possible
- Use meaningful element names

### Commit Message Format
```
type(scope): description

[optional body]

[optional footer]
```

Types: feat, fix, docs, style, refactor, test, chore

## License

This project is licensed under the LGPL-3 License - see the [LICENSE](LICENSE) file for details.

## Support

### Documentation
- [Odoo Developer Documentation](https://www.odoo.com/documentation/18.0/developer.html)
- [OWL Framework Guide](https://github.com/odoo/owl)

### Community
- GitHub Issues: [Report bugs](https://github.com/yourorg/healthnusa/issues)
- Discussions: [Join discussions](https://github.com/yourorg/healthnusa/discussions)
- Email: support@healthnusa.com

### Professional Support
For enterprise support and customization services, contact our team at enterprise@healthnusa.com

## Changelog

### Version 1.0.0 (2024-01-15)
- Initial release
- Doctor management functionality
- Dashboard and analytics
- Modern UI with dark/light theme
- Mobile responsive design
- API endpoints for integration

### Version 1.1.0 (TBD)
- Patient management
- Appointment scheduling
- Medical records
- Prescription management
- Laboratory integration

## Roadmap

### Short Term (Q1 2024)
- [ ] Patient management module
- [ ] Appointment scheduling
- [ ] Basic reporting features
- [ ] Mobile app integration

### Medium Term (Q2-Q3 2024)
- [ ] Medical records management
- [ ] Prescription system
- [ ] Laboratory integration
- [ ] Billing and insurance
- [ ] Telemedicine features

### Long Term (Q4 2024 and beyond)
- [ ] AI-powered diagnostics
- [ ] IoT device integration
- [ ] Advanced analytics
- [ ] Multi-hospital support
- [ ] Government integration

## Acknowledgments

- Odoo SA for the excellent framework
- OWL team for the modern frontend framework
- Material Design for the icon system
- Tailwind CSS for utility-first styling
- The open-source community for inspiration and contributions

---

**HealthNusa Team**  
Building the future of healthcare technology in Indonesia

For more information, visit [https://healthnusa.com](https://healthnusa.com)