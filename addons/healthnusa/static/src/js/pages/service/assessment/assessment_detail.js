/** @odoo-module **/

import { Component, useState, onMounted } from "@odoo/owl";

export class AssessmentDetail extends Component {
    static template = "healthnusa.AssessmentDetail";
    static props = {
        router: { type: Object, optional: false },
        selectApp: { type: Function, optional: false },
        assessmentId: { type: [String, Number], optional: true }
    };

    setup() {
        this.router = this.props.router;
        this.assessmentId = this.props.assessmentId;
        
        this.state = useState({
            activeTab: 'general-form',
            showDeleteModal: false,
            assessment: {
                id: 1,
                patient_name: "John Anderson",
                patient_id: "MRN001",
                assessment_date: "2024-01-15",
                assessment_time: "10:30",
                doctor: "Dr. Sarah Johnson",
                chief_complaint: "Chest pain and shortness of breath",
                diagnosis: "Hypertension",
                status: "Completed",
                priority: "High",
                notes: "Patient reports experiencing sharp chest pain for the past 2 hours, accompanied by difficulty breathing and mild dizziness.",
                vital_signs: {
                    blood_pressure: "145/92 mmHg",
                    heart_rate: "88 bpm",
                    temperature: "98.6°F",
                    respiratory_rate: "18/min",
                    oxygen_saturation: "98%"
                },
                treatment_plan: [
                    "Prescribed Lisinopril 10mg daily for blood pressure management",
                    "Dietary modifications: low sodium diet, increase potassium-rich foods",
                    "Regular exercise: 30 minutes of moderate activity, 5 days per week"
                ],
                follow_up_date: "2024-01-29",
                department: "Cardiology"
            }
        });

        onMounted(() => {
            if (this.assessmentId) {
                this.loadAssessmentData();
            }
            // Initialize the view with the first tab active
            this.switchForm('general-form');
        });
    }

    loadAssessmentData() {
        // TODO: Load assessment data from backend API
        console.log('Loading assessment data for ID:', this.assessmentId);
    }

    editAssessment() {
        this.props.selectApp('assessment-edit');
    }

    deleteAssessment() {
        this.state.showDeleteModal = true;
    }

    confirmDelete() {
        // TODO: Implement delete functionality
        console.log('Deleting assessment:', this.state.assessment.id);
        this.state.showDeleteModal = false;
        this.props.selectApp('assessment');
    }

    cancelDelete() {
        this.state.showDeleteModal = false;
    }

    printAssessment() {
        window.print();
    }

    goBack() {
        this.props.selectApp('assessment');
    }

    // Navigation methods for dynamic class binding
    getNavItemClass(formType) {
        const isActive = this.state.activeTab === formType;
        return isActive 
            ? 'bg-custom-blue dark:bg-custom-blue text-white hover:bg-blue-600 dark:hover:bg-blue-600 cursor-pointer'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-custom-blue dark:hover:text-blue-400 cursor-pointer';
    }

    getNavIconClass(formType) {
        const isActive = this.state.activeTab === formType;
        return isActive ? 'text-white' : '';
    }

    getNavTextClass(formType) {
        const isActive = this.state.activeTab === formType;
        return isActive ? 'text-white' : '';
    }

    switchTab(formType) {
        this.state.activeTab = formType;
        // Handle form section switching logic here
        this.switchForm(formType);
    }

    switchForm(targetForm) {
        // Update active tab state
        this.state.activeTab = targetForm;
        
        // Handle the form switching logic
        const formSections = document.querySelectorAll('.form-section');
        formSections.forEach(section => {
            section.style.display = 'none';
        });

        const targetSection = document.getElementById(targetForm + '-section');
        if (targetSection) {
            targetSection.style.display = 'block';
        }
    }
}