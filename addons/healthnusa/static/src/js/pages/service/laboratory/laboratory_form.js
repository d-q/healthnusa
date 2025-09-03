/** @odoo-module **/

import { Component, useState, onMounted } from "@odoo/owl";

export class LaboratoryForm extends Component {
    static template = "healthnusa.LaboratoryForm";
    static props = {
        router: { type: Object, optional: false },
        selectApp: { type: Function, optional: false },
        isEdit: { type: Boolean, optional: true },
        laboratoryData: { type: Object, optional: true }
    };

    setup() {
        this.router = this.props.router;
        this.selectApp = this.props.selectApp;

        // Simple condition: check URL or add a simple flag
        const isEditMode = window.location.hash.includes('edit') || false;

        // Sample data for EDIT MODE ONLY
        const editData = {
            labNumber: 'LAB-20241201-1430',
            testDate: '2024-12-01',
            collectionDate: '2024-12-01T08:30',
            patient: 'John Anderson',
            patientId: 'MRN001',
            technician: 'Lab Tech. Sarah Wilson',
            specimenType: 'Blood',
            priority: 'Routine',
            testType: 'Blood Test',
            status: 'Sample Collected',
            notes: 'Patient is fasting for 12 hours before test.',
            tests: [
                {
                    id: 1,
                    testCode: 'CBC-001', 
                    testName: 'Complete Blood Count',
                    normalRange: '4.5-11.0 x10^9/L',
                    result: '6.8 x10^9/L',
                    unitPrice: 45.00
                }
            ]
        };

        this.state = useState({
            // MODE FLAG
            isEdit: isEditMode,
            
            // FIELDS - empty for create, filled for edit
            labNumber: isEditMode ? editData.labNumber : this.generateLabNumber(),
            testDate: isEditMode ? editData.testDate : this.getCurrentDate(),
            collectionDate: isEditMode ? editData.collectionDate : this.getCurrentDateTime(),
            patient: isEditMode ? editData.patient : '',
            patientId: isEditMode ? editData.patientId : '',
            technician: isEditMode ? editData.technician : '',
            specimenType: isEditMode ? editData.specimenType : '',
            priority: isEditMode ? editData.priority : '',
            testType: isEditMode ? editData.testType : '',
            status: isEditMode ? editData.status : '',
            notes: isEditMode ? editData.notes : '',
            
            tests: isEditMode ? editData.tests : [],
            testCounter: 0
        });

        onMounted(() => {
            if (!this.props.isEdit) {
                // Only add initial tests in create mode - commented out for empty form
                // this.addInitialTests();
            }
            this.updateSummary();
        });
    }

    generateLabNumber() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const time = String(now.getHours()).padStart(2, '0') + String(now.getMinutes()).padStart(2, '0');
        return `LAB-${year}${month}${day}-${time}`;
    }

    getCurrentDate() {
        const now = new Date();
        return now.toISOString().split('T')[0];
    }

    getCurrentDateTime() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
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

    get technicians() {
        return [
            'Lab Tech. Sarah Wilson',
            'Lab Tech. Michael Chen',
            'Lab Tech. Emily Davis',
            'Lab Tech. Robert Wilson',
            'Lab Tech. Lisa Park',
            'Lab Tech. James Brown',
            'Lab Tech. Anna Martinez',
            'Lab Tech. David Kumar',
            'Lab Tech. Rachel Green',
            'Lab Tech. Thomas Anderson',
            'Lab Tech. Jennifer Wilson'
        ];
    }

    get specimenTypes() {
        return [
            'Blood',
            'Urine',
            'Stool',
            'Sputum',
            'CSF',
            'Throat Swab',
            'Wound Swab',
            'Tissue',
            'Saliva',
            'Other'
        ];
    }

    get priorities() {
        return [
            'Routine',
            'Urgent',
            'Stat',
            'ASAP'
        ];
    }

    get testTypes() {
        return [
            'Blood Test',
            'Urine Analysis',
            'Lipid Profile',
            'Glucose Test',
            'Liver Function',
            'Thyroid Panel',
            'Kidney Function',
            'Cardiac Markers',
            'Hormone Panel',
            'Culture Test',
            'Comprehensive Panel',
            'Coagulation Studies',
            'Tumor Markers',
            'Immunology',
            'Microbiology'
        ];
    }

    get labStatuses() {
        return [
            'Pending',
            'Sample Collected',
            'In Progress',
            'Completed',
            'Cancelled',
            'On Hold'
        ];
    }

    addTest(testCode = '', testName = '', normalRange = '', result = '', unitPrice = 0) {
        this.state.testCounter++;
        
        const test = {
            id: this.state.testCounter,
            testCode,
            testName,
            normalRange,
            result,
            unitPrice
        };
        
        this.state.tests.push(test);
        this.updateSummary();
    }

    removeTest(testId) {
        const index = this.state.tests.findIndex(test => test.id === testId);
        if (index > -1) {
            this.state.tests.splice(index, 1);
            this.updateSummary();
        }
    }

    updateTestField(testId, field, value) {
        const test = this.state.tests.find(t => t.id === testId);
        if (test) {
            test[field] = field === 'unitPrice' ? parseFloat(value) || 0 : value;
            this.updateSummary();
        }
    }

    get totalTests() {
        return this.state.tests.length;
    }

    get subtotal() {
        return this.state.tests.reduce((sum, test) => sum + test.unitPrice, 0);
    }

    get taxAmount() {
        return this.subtotal * 0.10; // 10% tax
    }

    get totalAmount() {
        return this.subtotal + this.taxAmount;
    }

    updateSummary() {
        // This will trigger re-render of computed properties
        this.state.tests = [...this.state.tests];
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

    submitTest() {
        if (this.validateForm()) {
            console.log('Submitting laboratory test...', this.collectFormData());
            this.showNotification('Laboratory test submitted successfully', 'success');
            this.goBack();
        }
    }

    validateForm() {
        if (!this.state.patient) {
            this.showNotification('Please select a patient', 'error');
            return false;
        }
        if (!this.state.technician) {
            this.showNotification('Please select a technician', 'error');
            return false;
        }
        if (!this.state.testType) {
            this.showNotification('Please select a test type', 'error');
            return false;
        }
        if (!this.state.specimenType) {
            this.showNotification('Please select a specimen type', 'error');
            return false;
        }
        if (this.state.tests.length === 0) {
            this.showNotification('Please add at least one test', 'error');
            return false;
        }
        return true;
    }

    collectFormData() {
        return {
            labNumber: this.state.labNumber,
            testDate: this.state.testDate,
            collectionDate: this.state.collectionDate,
            patient: this.state.patient,
            patientId: this.state.patientId,
            technician: this.state.technician,
            specimenType: this.state.specimenType,
            priority: this.state.priority,
            testType: this.state.testType,
            status: this.state.status,
            notes: this.state.notes,
            tests: this.state.tests,
            summary: {
                totalTests: this.totalTests,
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
        this.props.selectApp('laboratories');
    }

    onFieldChange(field, value) {
        this.state[field] = value;
    }
}