/** @odoo-module **/

import { Component, useState, onMounted } from "@odoo/owl";

export class StaffForm extends Component {
    static template = "healthnusa.StaffForm";
    static props = {
        router: { type: Object, optional: false },
        selectApp: { type: Function, optional: false }
    };

    detectMode() {
        // Check URL, element ID, or props to determine mode
        const currentPath = window.location.pathname;
        const currentHash = window.location.hash;
        
        // Check for edit mode indicators
        if (currentPath.includes('edit') || currentHash.includes('staff-edit') || document.getElementById('staff-edit')) {
            return 'edit';
        }
        return 'new';
    }

    initializeStaffData() {

        if (this.mode === 'edit') {
            // Return populated data for edit mode
            return {
                id: 1,
                name: "Sarah Connor",
                gender: "Female",
                dateOfBirth: "March 12, 1985",
                phone: "+123 456 8000",
                email: "sarah.connor@hospital.com",
                role: "head-nurse", 
                department: "nursing",
                address: "Jl. Gatot Subroto No. 45, Jakarta Selatan, DKI Jakarta",
                image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=144&h=144&fit=crop&crop=face",
                employeeId: "EMP-2024-001",
                hireDate: "2020-01-15",
                supervisor: "Dr. Maria Rodriguez",
                dutyStatus: "available",
                emergencyContactName: "John Connor",
                emergencyContactPhone: "+123 456 8001",
                emergencyContactRelation: "Spouse",
                education: [
                    { id: 1, degree: "Bachelor of Science in Nursing", institution: "University of Health Sciences", period: "2016-2020" },
                    { id: 2, degree: "Certified Nursing Assistant", institution: "Health Care Institute", period: "2015-2016" }
                ],
                experience: [
                    { id: 1, position: "Staff Nurse", institution: "General Hospital", period: "2020-2023" },
                    { id: 2, position: "Nursing Assistant", institution: "Community Clinic", period: "2018-2020" }
                ]
            };
        } else {
            // Return empty data for new mode
            return {
                name: "",
                gender: "",
                dateOfBirth: "",
                phone: "",
                email: "",
                role: "",
                department: "",
                address: "",
                image: "",
                employeeId: "",
                hireDate: "",
                supervisor: "",
                dutyStatus: "available",
                emergencyContactName: "",
                emergencyContactPhone: "",
                emergencyContactRelation: "",
                education: [],
                experience: []
            };
        }
    }

    setup() {
        this.router = this.props.router;
        this.selectApp = this.props.selectApp;
        this.mode = this.detectMode();

        this.state = useState({
            staff: this.initializeStaffData(),
            dutyStatusOptions: [
                { value: 'available', label: 'Available' },
                { value: 'on-break', label: 'On Break' },
                { value: 'not-available', label: 'Not Available' },
                { value: 'in-session', label: 'In Session' }
            ],
            departmentOptions: [
                { value: 'nursing', label: 'Nursing Department' },
                { value: 'administration', label: 'Administration' },
                { value: 'laboratory', label: 'Laboratory' },
                { value: 'pharmacy', label: 'Pharmacy' },
                { value: 'maintenance', label: 'Maintenance' },
                { value: 'security', label: 'Security' },
                { value: 'it', label: 'IT Support' },
                { value: 'therapy', label: 'Physical Therapy' }
            ],
            roleOptions: [
                { value: 'head-nurse', label: 'Head Nurse' },
                { value: 'registered-nurse', label: 'Registered Nurse' },
                { value: 'medical-assistant', label: 'Medical Assistant' },
                { value: 'lab-technician', label: 'Lab Technician' },
                { value: 'pharmacy-technician', label: 'Pharmacy Technician' },
                { value: 'receptionist', label: 'Receptionist' },
                { value: 'administrative-assistant', label: 'Administrative Assistant' },
                { value: 'maintenance-technician', label: 'Maintenance Technician' },
                { value: 'security-officer', label: 'Security Officer' },
                { value: 'it-support', label: 'IT Support' },
                { value: 'physical-therapist', label: 'Physical Therapist' },
                { value: 'social-worker', label: 'Social Worker' },
                { value: 'billing-specialist', label: 'Billing Specialist' },
                { value: 'medical-records-clerk', label: 'Medical Records Clerk' },
                { value: 'dietitian', label: 'Dietitian' }
            ],
            errors: {},
            isSubmitting: false,
            editingEducationIds: new Set(),
            editingExperienceIds: new Set()
        });

        onMounted(() => {
            console.log('Staff form component mounted in', this.mode, 'mode');
        });
    }

    get isEditMode() {
        return this.mode === 'edit';
    }

    get pageTitle() {
        return this.isEditMode ? 'Edit Staff Member' : 'Add New Staff Member';
    }

    onInputChange(field, event) {
        this.state.staff[field] = event.target.value;
        // Clear error for this field if it exists
        if (this.state.errors[field]) {
            delete this.state.errors[field];
        }
    }

    onSelectChange(field, event) {
        this.state.staff[field] = event.target.value;
        if (this.state.errors[field]) {
            delete this.state.errors[field];
        }
        
        // Update department display name for header
        if (field === 'department') {
            const option = this.state.departmentOptions.find(opt => opt.value === event.target.value);
            this.state.staff.departmentDisplay = option ? option.label : '';
        }
    }

    get departmentDisplay() {
        if (!this.state.staff.department) return '';
        const option = this.state.departmentOptions.find(opt => opt.value === this.state.staff.department);
        return option ? option.label : this.state.staff.department;
    }


    validateForm() {
        const errors = {};
        const staff = this.state.staff;

        if (!staff.name.trim()) {
            errors.name = 'Name is required';
        }

        if (!staff.gender) {
            errors.gender = 'Gender is required';
        }

        if (!staff.dateOfBirth) {
            errors.dateOfBirth = 'Date of birth is required';
        }

        if (!staff.phone.trim()) {
            errors.phone = 'Phone number is required';
        }

        if (!staff.email.trim()) {
            errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(staff.email)) {
            errors.email = 'Please enter a valid email address';
        }

        if (!staff.role) {
            errors.role = 'Role is required';
        }

        if (!staff.department) {
            errors.department = 'Department is required';
        }

        if (!this.isEditMode && !staff.employeeId.trim()) {
            errors.employeeId = 'Employee ID is required';
        }

        this.state.errors = errors;
        return Object.keys(errors).length === 0;
    }

    async saveStaff() {
        if (!this.validateForm()) {
            return;
        }

        this.state.isSubmitting = true;

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            console.log('Staff saved:', this.state.staff);
            
            // Navigate back to staff list
            this.goBack();
        } catch (error) {
            console.error('Error saving staff:', error);
            // Handle error
        } finally {
            this.state.isSubmitting = false;
        }
    }

    goBack() {
        this.selectApp('staff');
    }

    onImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.state.staff.image = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }

    generateEmployeeId() {
        const year = new Date().getFullYear();
        const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        this.state.staff.employeeId = `EMP-${year}-${randomNum}`;
    }

    // Education table methods
    isEditingEducation(id) {
        return this.state.editingEducationIds.has(id);
    }

    editEducationRow(id) {
        this.state.editingEducationIds.add(id);
    }

    saveEducationRow(id) {
        this.state.editingEducationIds.delete(id);
    }

    deleteEducationRow(id) {
        this.state.staff.education = this.state.staff.education.filter(edu => edu.id !== id);
        this.state.editingEducationIds.delete(id);
    }

    updateEducationField(id, field, value) {
        const edu = this.state.staff.education.find(e => e.id === id);
        if (edu) {
            edu[field] = value;
        }
    }

    addEducationRow() {
        const newId = Math.max(...this.state.staff.education.map(e => e.id), 0) + 1;
        this.state.staff.education.push({
            id: newId,
            degree: '',
            institution: '',
            period: ''
        });
        this.state.editingEducationIds.add(newId);
    }

    // Experience table methods
    isEditingExperience(id) {
        return this.state.editingExperienceIds.has(id);
    }

    editExperienceRow(id) {
        this.state.editingExperienceIds.add(id);
    }

    saveExperienceRow(id) {
        this.state.editingExperienceIds.delete(id);
    }

    deleteExperienceRow(id) {
        this.state.staff.experience = this.state.staff.experience.filter(exp => exp.id !== id);
        this.state.editingExperienceIds.delete(id);
    }

    updateExperienceField(id, field, value) {
        const exp = this.state.staff.experience.find(e => e.id === id);
        if (exp) {
            exp[field] = value;
        }
    }

    addExperienceRow() {
        const newId = Math.max(...this.state.staff.experience.map(e => e.id), 0) + 1;
        this.state.staff.experience.push({
            id: newId,
            position: '',
            institution: '',
            period: ''
        });
        this.state.editingExperienceIds.add(newId);
    }
}