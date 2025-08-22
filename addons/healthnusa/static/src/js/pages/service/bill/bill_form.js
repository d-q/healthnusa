/** @odoo-module **/

import { Component, useState, onMounted } from "@odoo/owl";

export class BillForm extends Component {
    static template = "healthnusa.BillForm";
    static props = {
        router: { type: Object, optional: false },
        selectApp: { type: Function, optional: false },
        isEdit: { type: Boolean, optional: true },
        billData: { type: Object, optional: true }
    };

    setup() {
        this.router = this.props.router;
        this.selectApp = this.props.selectApp;

        // Simple condition: check URL or add a simple flag
        const isEditMode = window.location.hash.includes('edit') || false;

        // Sample data for EDIT MODE ONLY
        const editData = {
            billId: 'BILL-20241201-1430',
            date: '2024-12-01',
            dueDate: '2024-12-31', 
            patient: 'John Anderson',
            patientId: 'MRN001',
            doctor: 'Dr. John Smith - Cardiology',
            department: 'Cardiology Department',
            paymentMethod: 'Insurance',
            billType: 'Standard',
            notes: 'Follow-up consultation after cardiac procedure.',
            services: [
                {
                    id: 1,
                    serviceCode: 'CONS-001', 
                    description: 'Cardiology Consultation',
                    quantity: 1,
                    unitPrice: 200.00,
                    totalPrice: 200.00,
                    onHand: 10
                }
            ]
        };

        this.state = useState({
            // MODE FLAG
            isEdit: isEditMode,
            
            // FIELDS - empty for create, filled for edit
            billId: isEditMode ? editData.billId : '',
            date: isEditMode ? editData.date : '',
            dueDate: isEditMode ? editData.dueDate : '',
            patient: isEditMode ? editData.patient : '',
            patientId: isEditMode ? editData.patientId : '',
            doctor: isEditMode ? editData.doctor : '',
            department: isEditMode ? editData.department : '',
            paymentMethod: isEditMode ? editData.paymentMethod : '',
            billType: isEditMode ? editData.billType : '',
            notes: isEditMode ? editData.notes : '',
            
            showAdditionalFields: false,
            services: isEditMode ? editData.services : [],
            serviceCounter: 0
        });

        onMounted(() => {
            if (!this.props.isEdit) {
                // Only add initial services in create mode - commented out for empty form
                // this.addInitialServices();
            }
            this.updateSummary();
        });
    }

    generateBillId() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const time = String(now.getHours()).padStart(2, '0') + String(now.getMinutes()).padStart(2, '0');
        return `BILL-${year}${month}${day}-${time}`;
    }

    getCurrentDate() {
        const now = new Date();
        return now.toISOString().split('T')[0];
    }

    getDueDate() {
        const now = new Date();
        now.setDate(now.getDate() + 30); // 30 days from today
        return now.toISOString().split('T')[0];
    }

    get patients() {
        return [
            { id: 'MRN001', name: 'John Anderson' },
            { id: 'MRN002', name: 'Sarah Johnson' },
            { id: 'MRN003', name: 'Michael Chen' },
            { id: 'MRN004', name: 'Emily Davis' },
            { id: 'MRN005', name: 'Robert Wilson' },
            { id: 'MRN006', name: 'Maria Rodriguez' },
            { id: 'MRN007', name: 'James Brown' },
            { id: 'MRN008', name: 'Lisa Thompson' }
        ];
    }

    get doctors() {
        return [
            'Dr. John Smith - Cardiology',
            'Dr. Sarah Johnson - Internal Medicine',
            'Dr. Michael Lee - Surgery',
            'Dr. Emily White - Pediatrics',
            'Dr. Robert Chen - Orthopedics',
            'Dr. Maria Rodriguez - Emergency',
            'Dr. James Wilson - Radiology',
            'Dr. Lisa Park - Dermatology'
        ];
    }

    get departments() {
        return [
            'Emergency Department',
            'Surgery Department',
            'Cardiology Department',
            'Pediatrics Department',
            'Orthopedics Department',
            'Radiology Department',
            'Laboratory',
            'Pharmacy',
            'General Ward',
            'ICU'
        ];
    }

    get paymentMethods() {
        return [
            'Cash',
            'Credit Card',
            'Insurance',
            'Bank Transfer',
            'Check',
            'Mixed Payment'
        ];
    }

    get billTypes() {
        return [
            'Standard',
            'Emergency',
            'Insurance Claim',
            'Self-Pay',
            'Corporate',
            'Government'
        ];
    }

    toggleAdditionalFields() {
        this.state.showAdditionalFields = !this.state.showAdditionalFields;
    }

    addInitialServices() {
        if (this.state.services.length === 0) {
            this.addService('CONS-001', 'General Consultation', 1, 150.00);
            this.addService('LAB-045', 'Complete Blood Count', 1, 75.00);
            this.addService('RAD-123', 'Chest X-Ray', 1, 200.00);
        }
    }

    addService(serviceCode = '', description = '', quantity = 1, unitPrice = 0) {
        this.state.serviceCounter++;
        const totalPrice = quantity * unitPrice;
        
        const service = {
            id: this.state.serviceCounter,
            serviceCode,
            description,
            quantity,
            unitPrice,
            totalPrice
        };
        
        this.state.services.push(service);
        this.updateSummary();
    }

    removeService(serviceId) {
        const index = this.state.services.findIndex(service => service.id === serviceId);
        if (index > -1) {
            this.state.services.splice(index, 1);
            this.updateSummary();
        }
    }

    updateServiceField(serviceId, field, value) {
        const service = this.state.services.find(s => s.id === serviceId);
        if (service) {
            service[field] = field === 'quantity' || field === 'unitPrice' ? parseFloat(value) || 0 : value;
            
            // Recalculate total price
            service.totalPrice = service.quantity * service.unitPrice;
            
            this.updateSummary();
        }
    }

    get totalServices() {
        return this.state.services.length;
    }

    get subtotal() {
        return this.state.services.reduce((sum, service) => sum + service.totalPrice, 0);
    }

    get taxAmount() {
        return this.subtotal * 0.10; // 10% tax
    }

    get totalAmount() {
        return this.subtotal + this.taxAmount;
    }

    updateSummary() {
        // This will trigger re-render of computed properties
        this.state.services = [...this.state.services];
    }

    onPatientChange(patientName) {
        this.state.patient = patientName;
        const patient = this.patients.find(p => p.name === patientName);
        this.state.patientId = patient ? patient.id : '';
    }

    formatCurrency(value) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(value);
    }

    saveDraft() {
        console.log('Saving draft...', this.collectFormData());
        this.showNotification('Draft saved successfully', 'success');
    }

    submitBill() {
        if (this.validateForm()) {
            console.log('Submitting bill...', this.collectFormData());
            this.showNotification('Bill submitted successfully', 'success');
            this.goBack();
        }
    }

    validateForm() {
        if (!this.state.patient) {
            this.showNotification('Please select a patient', 'error');
            return false;
        }
        if (!this.state.doctor) {
            this.showNotification('Please select a doctor', 'error');
            return false;
        }
        if (!this.state.department) {
            this.showNotification('Please select a department', 'error');
            return false;
        }
        if (this.state.services.length === 0) {
            this.showNotification('Please add at least one service', 'error');
            return false;
        }
        return true;
    }

    collectFormData() {
        return {
            billId: this.state.billId,
            date: this.state.date,
            dueDate: this.state.dueDate,
            patient: this.state.patient,
            patientId: this.state.patientId,
            doctor: this.state.doctor,
            department: this.state.department,
            paymentMethod: this.state.paymentMethod,
            billType: this.state.billType,
            notes: this.state.notes,
            services: this.state.services,
            summary: {
                totalServices: this.totalServices,
                subtotal: this.subtotal,
                taxAmount: this.taxAmount,
                totalAmount: this.totalAmount
            }
        };
    }

    showNotification(message, type) {
        console.log(`${type.toUpperCase()}: ${message}`);
    }

    goBack() {
        this.props.selectApp('bills');
    }

    onFieldChange(field, value) {
        this.state[field] = value;
    }
}