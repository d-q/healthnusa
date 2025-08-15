/** @odoo-module **/

import { Component, useState, onMounted } from "@odoo/owl";

export class PatientForm extends Component {
    static template = "healthnusa.PatientForm";
    static props = {
        router: { type: Object, optional: false },
        selectApp: { type: Function, optional: false },
        patientId: { type: [String, Number], optional: true },
        mode: { type: String, optional: true }  // 'create' or 'edit'
    };

    setup() {
        this.router = this.props.router;
        this.mode = this.props.mode || 'create';
        this.patientId = this.props.patientId;

        this.state = useState({
            patient: {
                name: '',
                mrn: this.generateMRN(),
                nik: '',
                title: '',
                otherIdentity: '',
                motherName: '',
                birthPlace: '',
                birthDate: '',
                gender: '',
                religion: '',
                otherReligion: '',
                ethnicity: '',
                languages: '',
                nationality: '',
                bloodType: '',
                maritalStatus: '',
                education: '',
                occupation: '',
                otherOccupation: '',
                phone: '',
                homePhone: '',
                email: '',
                emergencyContactName: '',
                emergencyContactPhone: '',
                emergencyContactRelationship: '',
                status: 'Active',
                profileImage: ''
            },
            address: {
                fullAddress: '',
                rt: '',
                rw: '',
                village: '',
                subDistrict: '',
                city: '',
                state: '',
                postalCode: '',
                country: 'Indonesia'
            },
            currentAddress: {
                fullAddress: '',
                rt: '',
                rw: '',
                village: '',
                subDistrict: '',
                city: '',
                state: '',
                postalCode: '',
                country: 'Indonesia'
            },
            allergies: [],
            medicalNotes: '',
            sameAsIdAddress: true,
            patientIdentityType: 'general',
            activeTab: 'detail-pasien',
            isLoading: false,
            errors: {},
            showInsuranceForm: false,
            newInsurance: {
                type: 'primary',
                provider: '',
                policyNumber: '',
                validFrom: '',
                validTo: '',
                coverage: '',
                guarantorName: '',
                guarantorId: '',
                guarantorPhone: '',
                guarantorRelationship: '',
                guarantorAddress: ''
            },
            unknownPatient: {
                estimatedAge: '',
                locationFound: '',
                dateFound: '',
                responsiblePersonName: '',
                responsiblePersonMobile: '',
                relationshipToPatient: '',
                otherRelationship: '',
                companionName: '',
                companionMobile: ''
            },
            newbornPatient: {
                babyName: '',
                motherNik: '',
                babyMedicalRecord: '',
                babyDateOfBirth: '',
                babyTimeOfBirth: '',
                babyGender: ''
            },
            insuranceRecords: []
        });

        onMounted(() => {
            if (this.mode === 'edit' && this.patientId) {
                this.loadPatientData();
            }
        });
    }

    get formTitle() {
        return this.mode === 'edit' ? 'Edit Patient Information' : 'Register New Patient';
    }

    generateMRN() {
        const prefix = 'MRN';
        const timestamp = Date.now().toString().slice(-6);
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `${prefix}${timestamp}${random}`;
    }

    async loadPatientData() {
        try {
            this.state.isLoading = true;
            // In a real application, this would be an API call
            // For now, we'll simulate loading patient data
            const patientData = this.getSimulatedPatientData();
            
            Object.assign(this.state.patient, patientData.patient);
            Object.assign(this.state.address, patientData.address);
            Object.assign(this.state.currentAddress, patientData.currentAddress || patientData.address);
            this.state.allergies = patientData.allergies || [];
            this.state.medicalNotes = patientData.medicalNotes || '';
            this.state.sameAsIdAddress = patientData.sameAsIdAddress || true;
        } catch (error) {
            console.error('Failed to load patient data:', error);
        } finally {
            this.state.isLoading = false;
        }
    }

    getSimulatedPatientData() {
        // Simulated patient data for editing mode
        return {
            patient: {
                name: 'John Anderson',
                mrn: 'MRN001234567',
                nik: '3201234567890123',
                otherIdentity: '',
                motherName: 'Mary Anderson',
                birthPlace: 'Jakarta',
                birthDate: '1985-05-15',
                gender: 'Male',
                religion: 'Christianity',
                otherReligion: '',
                ethnicity: 'Javanese',
                languages: 'Indonesian, English',
                maritalStatus: 'Married',
                education: 'Bachelor Degree',
                occupation: 'Software Engineer',
                otherOccupation: '',
                phone: '+62812345678',
                homePhone: '+622123456789',
                status: 'Active',
                profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
            },
            address: {
                fullAddress: 'Jl. Sudirman No. 123',
                rt: '01',
                rw: '02',
                village: 'Senayan',
                subDistrict: 'Kebayoran Baru',
                city: 'Jakarta Selatan',
                state: 'DKI Jakarta',
                postalCode: '12190',
                country: 'Indonesia'
            },
            currentAddress: {
                fullAddress: 'Jl. Sudirman No. 123',
                rt: '01',
                rw: '02',
                village: 'Senayan',
                subDistrict: 'Kebayoran Baru',
                city: 'Jakarta Selatan',
                state: 'DKI Jakarta',
                postalCode: '12190',
                country: 'Indonesia'
            },
            allergies: [
                { type: 'food', name: 'Shellfish', reaction: 'Skin rash and difficulty breathing' },
                { type: 'drug', name: 'Penicillin', reaction: 'Severe allergic reaction' }
            ],
            medicalNotes: 'Patient has hypertension and requires regular monitoring.',
            sameAsIdAddress: true
        };
    }

    addAllergy() {
        this.state.allergies.push({
            type: '',
            name: '',
            reaction: ''
        });
    }

    removeAllergy(index) {
        this.state.allergies.splice(index, 1);
    }

    validateForm() {
        const errors = {};
        const required = ['name', 'nik', 'birthPlace', 'birthDate', 'gender', 'phone'];
        
        required.forEach(field => {
            if (!this.state.patient[field]?.trim()) {
                errors[field] = `${field.replace(/([A-Z])/g, ' $1').toLowerCase()} is required`;
            }
        });

        // Validate NIK length
        if (this.state.patient.nik && this.state.patient.nik.length !== 16) {
            errors.nik = 'NIK must be exactly 16 digits';
        }

        // Validate phone number format
        if (this.state.patient.phone && !/^\+?\d{10,15}$/.test(this.state.patient.phone.replace(/\s/g, ''))) {
            errors.phone = 'Please enter a valid phone number';
        }

        // Address validation
        if (!this.state.address.fullAddress?.trim()) {
            errors.fullAddress = 'Full address is required';
        }
        if (!this.state.address.city?.trim()) {
            errors.city = 'City is required';
        }
        if (!this.state.address.state?.trim()) {
            errors.state = 'State/Province is required';
        }

        this.state.errors = errors;
        return Object.keys(errors).length === 0;
    }

    async onSubmit(event) {
        event.preventDefault();
        
        if (!this.validateForm()) {
            this.showErrors();
            return;
        }

        await this.onSave();
    }

    async onSave() {
        try {
            this.state.isLoading = true;

            const patientData = {
                patient: { ...this.state.patient },
                address: { ...this.state.address },
                currentAddress: { ...this.state.currentAddress },
                allergies: [...this.state.allergies],
                medicalNotes: this.state.medicalNotes,
                sameAsIdAddress: this.state.sameAsIdAddress
            };

            // In a real application, this would be an API call
            console.log('Saving patient data:', patientData);
            
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            this.showSuccessMessage();
            this.navigateToPatientList();

        } catch (error) {
            console.error('Failed to save patient:', error);
            this.showErrorMessage('Failed to save patient data. Please try again.');
        } finally {
            this.state.isLoading = false;
        }
    }

    async onSaveAsDraft() {
        try {
            this.state.isLoading = true;

            const draftData = {
                patient: { ...this.state.patient },
                address: { ...this.state.address },
                currentAddress: { ...this.state.currentAddress },
                allergies: [...this.state.allergies],
                medicalNotes: this.state.medicalNotes,
                sameAsIdAddress: this.state.sameAsIdAddress,
                isDraft: true
            };

            // Save as draft logic
            console.log('Saving patient draft:', draftData);
            
            await new Promise(resolve => setTimeout(resolve, 500));
            
            this.showSuccessMessage('Patient data saved as draft');

        } catch (error) {
            console.error('Failed to save draft:', error);
            this.showErrorMessage('Failed to save draft. Please try again.');
        } finally {
            this.state.isLoading = false;
        }
    }

    onCancel() {
        if (this.hasUnsavedChanges()) {
            if (confirm('You have unsaved changes. Are you sure you want to cancel?')) {
                this.navigateToPatientList();
            }
        } else {
            this.navigateToPatientList();
        }
    }

    hasUnsavedChanges() {
        // Simple check to see if any required fields have been filled
        return this.state.patient.name.trim() !== '' || 
               this.state.patient.nik.trim() !== '' ||
               this.state.address.fullAddress.trim() !== '';
    }

    navigateToPatientList() {
        this.props.selectApp('patient');
    }

    showSuccessMessage(message = 'Patient data saved successfully') {
        // In a real application, you might use a toast notification system
        alert(message);
    }

    showErrorMessage(message) {
        alert(message);
    }

    showErrors() {
        const errorMessages = Object.values(this.state.errors).join('\n');
        alert('Please fix the following errors:\n\n' + errorMessages);
    }

    // Photo upload handler (placeholder)
    onPhotoUpload(event) {
        const file = event.target.files[0];
        if (file) {
            // In a real application, you would upload the file to a server
            const reader = new FileReader();
            reader.onload = (e) => {
                this.state.patient.profileImage = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }

    // Photo change handler for the new template
    onPhotoChange(event) {
        const file = event.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert('Please select a valid image file');
                return;
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('Image size must be less than 5MB');
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                this.state.patient.profileImage = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }

    // Tab navigation methods
    onTabClick(event, tabName) {
        if (event) {
            event.preventDefault();
        }
        console.log('Tab clicked:', tabName, 'Current active tab:', this.state.activeTab);
        this.state.activeTab = tabName;
        console.log('New active tab:', this.state.activeTab);
    }

    isTabActive(tabName) {
        return this.state.activeTab === tabName;
    }

    onToggleInsuranceForm() {
        this.state.showInsuranceForm = !this.state.showInsuranceForm;
        if (this.state.showInsuranceForm) {
            // Reset form when opening
            this.state.newInsurance = {
                type: 'primary',
                provider: '',
                policyNumber: '',
                validFrom: '',
                validTo: '',
                coverage: '',
                guarantorName: '',
                guarantorId: '',
                guarantorPhone: '',
                guarantorRelationship: '',
                guarantorAddress: ''
            };
        }
    }

    onCancelInsuranceForm() {
        this.state.showInsuranceForm = false;
    }


    onSaveInsurance() {
        // Validate form
        if (!this.state.newInsurance.provider || !this.state.newInsurance.policyNumber) {
            alert('Please fill in required fields');
            return;
        }

        // Create new insurance record
        const newRecord = {
            id: Date.now(), // Simple ID generation
            type: this.state.newInsurance.type,
            provider: this.state.newInsurance.provider,
            policyNumber: this.state.newInsurance.policyNumber,
            validPeriod: this.state.newInsurance.validFrom && this.state.newInsurance.validTo 
                ? `${this.state.newInsurance.validFrom} - ${this.state.newInsurance.validTo}` 
                : 'Not specified',
            coverage: this.state.newInsurance.coverage || 'Not specified'
        };

        // Add guarantor if provided
        if (this.state.newInsurance.guarantorName) {
            newRecord.guarantor = {
                name: this.state.newInsurance.guarantorName,
                nationalId: this.state.newInsurance.guarantorId,
                phone: this.state.newInsurance.guarantorPhone,
                relationship: this.state.newInsurance.guarantorRelationship,
                address: this.state.newInsurance.guarantorAddress
            };
        }

        // Add to the beginning of the array (top of the list)
        this.state.insuranceRecords.unshift(newRecord);

        this.state.showInsuranceForm = false;
    }

    onEditInsurance(record) {
        // Populate form with existing record data
        this.state.newInsurance = {
            type: record.type,
            provider: record.provider,
            policyNumber: record.policyNumber,
            validFrom: record.validPeriod.split(' - ')[0] || '',
            validTo: record.validPeriod.split(' - ')[1] || '',
            coverage: record.coverage,
            guarantorName: record.guarantor?.name || '',
            guarantorId: record.guarantor?.nationalId || '',
            guarantorPhone: record.guarantor?.phone || '',
            guarantorRelationship: record.guarantor?.relationship || '',
            guarantorAddress: record.guarantor?.address || ''
        };
        
        // Remove the old record and show form for editing
        this.onDeleteInsurance(record);
        this.state.showInsuranceForm = true;
    }

    onDeleteInsurance(record) {
        const index = this.state.insuranceRecords.findIndex(r => r.id === record.id);
        if (index > -1) {
            this.state.insuranceRecords.splice(index, 1);
        }
    }
}
