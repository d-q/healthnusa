/** @odoo-module **/

import { Component, useState, onMounted } from "@odoo/owl";

export class TreatmentForm extends Component {
    static template = "healthnusa.TreatmentForm";
    static props = {
        router: { type: Object, optional: false },
        selectApp: { type: Function, optional: false },
        isEdit: { type: Boolean, optional: true },
        treatmentData: { type: Object, optional: true }
    };

    setup() {
        this.router = this.props.router;
        this.selectApp = this.props.selectApp;

        // Simple condition: check URL or add a simple flag
        const isEditMode = window.location.hash.includes('edit') || false;

        // Sample data for EDIT MODE ONLY
        const editData = {
            treatmentId: 'TRT-20241201-1430',
            date: '2024-12-01',
            followupDate: '2024-12-31', 
            patient: 'John Anderson',
            patientId: 'MRN001',
            doctor: 'Dr. John Smith - Cardiology',
            department: 'Cardiology Department',
            duration: '45 minutes',
            treatmentType: 'Consultation',
            status: 'Scheduled',
            notes: 'Follow-up consultation after cardiac procedure.',
            procedures: [
                {
                    id: 1,
                    procedureCode: 'CONS-001', 
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
            treatmentId: isEditMode ? editData.treatmentId : this.generateTreatmentId(),
            date: isEditMode ? editData.date : this.getCurrentDate(),
            followupDate: isEditMode ? editData.followupDate : this.getFollowupDate(),
            patient: isEditMode ? editData.patient : '',
            patientId: isEditMode ? editData.patientId : '',
            doctor: isEditMode ? editData.doctor : '',
            department: isEditMode ? editData.department : '',
            duration: isEditMode ? editData.duration : '',
            treatmentType: isEditMode ? editData.treatmentType : '',
            status: isEditMode ? editData.status : '',
            notes: isEditMode ? editData.notes : '',
            
            showAdditionalFields: false,
            procedures: isEditMode ? editData.procedures : [],
            procedureCounter: 0
        });

        onMounted(() => {
            if (!this.props.isEdit) {
                // Only add initial procedures in create mode - commented out for empty form
                // this.addInitialProcedures();
            }
            this.updateSummary();
        });
    }

    generateTreatmentId() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const time = String(now.getHours()).padStart(2, '0') + String(now.getMinutes()).padStart(2, '0');
        return `TRT-${year}${month}${day}-${time}`;
    }

    getCurrentDate() {
        const now = new Date();
        return now.toISOString().split('T')[0];
    }

    getFollowupDate() {
        const now = new Date();
        now.setDate(now.getDate() + 14); // 14 days from today
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

    get treatmentStatuses() {
        return [
            'Scheduled',
            'In Progress',
            'Completed',
            'Cancelled',
            'On Hold'
        ];
    }

    get treatmentTypes() {
        return [
            'Consultation',
            'Diagnostic',
            'Surgery',
            'Emergency',
            'Dental',
            'Imaging',
            'Laboratory',
            'Therapy',
            'Prevention',
            'Follow-up'
        ];
    }

    toggleAdditionalFields() {
        this.state.showAdditionalFields = !this.state.showAdditionalFields;
    }

    addInitialProcedures() {
        if (this.state.procedures.length === 0) {
            this.addProcedure('CONS-001', 'General Consultation', 1, 150.00);
            this.addProcedure('LAB-045', 'Complete Blood Count', 1, 75.00);
            this.addProcedure('RAD-123', 'Chest X-Ray', 1, 200.00);
        }
    }

    addProcedure(procedureCode = '', description = '', quantity = 1, unitPrice = 0) {
        this.state.procedureCounter++;
        const totalPrice = quantity * unitPrice;
        
        const procedure = {
            id: this.state.procedureCounter,
            procedureCode,
            description,
            quantity,
            unitPrice,
            totalPrice
        };
        
        this.state.procedures.push(procedure);
        this.updateSummary();
    }

    removeProcedure(procedureId) {
        const index = this.state.procedures.findIndex(procedure => procedure.id === procedureId);
        if (index > -1) {
            this.state.procedures.splice(index, 1);
            this.updateSummary();
        }
    }

    updateProcedureField(procedureId, field, value) {
        const procedure = this.state.procedures.find(p => p.id === procedureId);
        if (procedure) {
            procedure[field] = field === 'quantity' || field === 'unitPrice' ? parseFloat(value) || 0 : value;
            
            // Recalculate total price
            procedure.totalPrice = procedure.quantity * procedure.unitPrice;
            
            this.updateSummary();
        }
    }

    get totalProcedures() {
        return this.state.procedures.length;
    }

    get subtotal() {
        return this.state.procedures.reduce((sum, procedure) => sum + procedure.totalPrice, 0);
    }

    get taxAmount() {
        return this.subtotal * 0.10; // 10% tax
    }

    get totalAmount() {
        return this.subtotal + this.taxAmount;
    }

    updateSummary() {
        // This will trigger re-render of computed properties
        this.state.procedures = [...this.state.procedures];
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

    submitTreatment() {
        if (this.validateForm()) {
            console.log('Submitting treatment...', this.collectFormData());
            this.showNotification('Treatment submitted successfully', 'success');
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
        if (this.state.procedures.length === 0) {
            this.showNotification('Please add at least one procedure', 'error');
            return false;
        }
        return true;
    }

    collectFormData() {
        return {
            treatmentId: this.state.treatmentId,
            date: this.state.date,
            followupDate: this.state.followupDate,
            patient: this.state.patient,
            patientId: this.state.patientId,
            doctor: this.state.doctor,
            department: this.state.department,
            duration: this.state.duration,
            treatmentType: this.state.treatmentType,
            status: this.state.status,
            notes: this.state.notes,
            procedures: this.state.procedures,
            summary: {
                totalProcedures: this.totalProcedures,
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
        this.props.selectApp('treatments');
    }

    onFieldChange(field, value) {
        this.state[field] = value;
    }
}