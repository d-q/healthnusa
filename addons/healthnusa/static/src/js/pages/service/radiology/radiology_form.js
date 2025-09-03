/** @odoo-module **/

import { Component, useState, onMounted } from "@odoo/owl";

export class RadiologyForm extends Component {
    static template = "healthnusa.RadiologyForm";
    static props = {
        router: { type: Object, optional: false },
        selectApp: { type: Function, optional: false },
        isEdit: { type: Boolean, optional: true },
        radiologyData: { type: Object, optional: true }
    };

    setup() {
        this.router = this.props.router;
        this.selectApp = this.props.selectApp;

        // Simple condition: check URL or add a simple flag
        const isEditMode = window.location.hash.includes('edit') || false;

        // Sample data for EDIT MODE ONLY
        const editData = {
            studyNumber: 'RAD-20241201-1430',
            studyDate: '2024-12-01',
            studyTime: '14:30',
            patient: 'John Anderson',
            patientId: 'MRN001',
            radiologist: 'Dr. James Wilson',
            technician: 'Rad Tech. Maria Santos',
            bodyPart: 'Chest',
            imagingType: 'X-Ray',
            status: 'Scheduled',
            contrastUsed: false,
            indication: 'Chest pain and persistent cough for 2 weeks',
            description: 'Chest X-Ray PA and Lateral views',
            notes: 'Patient has no known allergies. Previous chest imaging from 6 months ago was normal.',
            procedures: [
                {
                    id: 1,
                    procedureCode: 'XR-CHEST-001', 
                    procedureName: 'Chest X-Ray PA View',
                    views: 'PA (Posterior-Anterior)',
                    unitPrice: 125.00
                },
                {
                    id: 2,
                    procedureCode: 'XR-CHEST-002', 
                    procedureName: 'Chest X-Ray Lateral View',
                    views: 'Lateral',
                    unitPrice: 95.00
                }
            ]
        };

        this.state = useState({
            // MODE FLAG
            isEdit: isEditMode,
            
            // FIELDS - empty for create, filled for edit
            studyNumber: isEditMode ? editData.studyNumber : this.generateStudyNumber(),
            studyDate: isEditMode ? editData.studyDate : this.getCurrentDate(),
            studyTime: isEditMode ? editData.studyTime : this.getCurrentTime(),
            patient: isEditMode ? editData.patient : '',
            patientId: isEditMode ? editData.patientId : '',
            radiologist: isEditMode ? editData.radiologist : '',
            technician: isEditMode ? editData.technician : '',
            bodyPart: isEditMode ? editData.bodyPart : '',
            imagingType: isEditMode ? editData.imagingType : '',
            status: isEditMode ? editData.status : '',
            contrastUsed: isEditMode ? editData.contrastUsed : false,
            indication: isEditMode ? editData.indication : '',
            description: isEditMode ? editData.description : '',
            notes: isEditMode ? editData.notes : '',
            
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

    generateStudyNumber() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const time = String(now.getHours()).padStart(2, '0') + String(now.getMinutes()).padStart(2, '0');
        return `RAD-${year}${month}${day}-${time}`;
    }

    getCurrentDate() {
        const now = new Date();
        return now.toISOString().split('T')[0];
    }

    getCurrentTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
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

    get radiologists() {
        return [
            'Dr. James Wilson',
            'Dr. Emily Chen',
            'Dr. Lisa Rodriguez',
            'Dr. Robert Thompson',
            'Dr. Michael Brown',
            'Dr. Susan Taylor',
            'Dr. Patricia Miller'
        ];
    }

    get technicians() {
        return [
            'Rad Tech. Maria Santos',
            'Rad Tech. David Park',
            'Rad Tech. John Kim',
            'Rad Tech. Sarah Lee',
            'Rad Tech. Jennifer White',
            'Rad Tech. Carlos Martinez',
            'Rad Tech. Lisa Wang',
            'Rad Tech. Alex Johnson',
            'Rad Tech. Kevin Davis',
            'Rad Tech. Thomas Wilson',
            'Rad Tech. Michelle Garcia',
            'Rad Tech. Brian Lopez',
            'Rad Tech. Amanda Clark',
            'Rad Tech. Daniel Rodriguez'
        ];
    }

    get imagingTypes() {
        return [
            'X-Ray',
            'CT Scan',
            'MRI',
            'Ultrasound',
            'Mammography',
            'Nuclear Medicine',
            'PET Scan',
            'Fluoroscopy',
            'Angiography',
            'Bone Scan'
        ];
    }

    get bodyParts() {
        return [
            'Head',
            'Brain',
            'Neck',
            'Chest',
            'Heart',
            'Abdomen',
            'Pelvis',
            'Abdomen/Pelvis',
            'Spine',
            'Lumbar Spine',
            'Cervical Spine',
            'Thoracic Spine',
            'Extremities',
            'Upper Extremity',
            'Lower Extremity',
            'Hand',
            'Foot',
            'Knee',
            'Shoulder',
            'Hip',
            'Elbow',
            'Ankle',
            'Wrist',
            'Breast',
            'Thyroid',
            'Sinus'
        ];
    }

    get studyStatuses() {
        return [
            'Scheduled',
            'In Progress',
            'Report Ready',
            'Cancelled',
            'Pending'
        ];
    }

    addProcedure(procedureCode = '', procedureName = '', views = '', unitPrice = 0) {
        this.state.procedureCounter++;
        
        const procedure = {
            id: this.state.procedureCounter,
            procedureCode,
            procedureName,
            views,
            unitPrice
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
            procedure[field] = field === 'unitPrice' ? parseFloat(value) || 0 : value;
            this.updateSummary();
        }
    }

    get totalProcedures() {
        return this.state.procedures.length;
    }

    get subtotal() {
        return this.state.procedures.reduce((sum, procedure) => sum + procedure.unitPrice, 0);
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

    submitStudy() {
        if (this.validateForm()) {
            console.log('Submitting imaging study...', this.collectFormData());
            this.showNotification('Imaging study submitted successfully', 'success');
            this.goBack();
        }
    }

    validateForm() {
        if (!this.state.patient) {
            this.showNotification('Please select a patient', 'error');
            return false;
        }
        if (!this.state.radiologist) {
            this.showNotification('Please select a radiologist', 'error');
            return false;
        }
        if (!this.state.technician) {
            this.showNotification('Please select a technician', 'error');
            return false;
        }
        if (!this.state.imagingType) {
            this.showNotification('Please select an imaging type', 'error');
            return false;
        }
        if (!this.state.bodyPart) {
            this.showNotification('Please select a body part', 'error');
            return false;
        }
        if (!this.state.indication) {
            this.showNotification('Please provide clinical indication', 'error');
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
            studyNumber: this.state.studyNumber,
            studyDate: this.state.studyDate,
            studyTime: this.state.studyTime,
            patient: this.state.patient,
            patientId: this.state.patientId,
            radiologist: this.state.radiologist,
            technician: this.state.technician,
            bodyPart: this.state.bodyPart,
            imagingType: this.state.imagingType,
            status: this.state.status,
            contrastUsed: this.state.contrastUsed,
            indication: this.state.indication,
            description: this.state.description,
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
        this.props.selectApp('radiologies');
    }

    onFieldChange(field, value) {
        this.state[field] = value;
    }
}