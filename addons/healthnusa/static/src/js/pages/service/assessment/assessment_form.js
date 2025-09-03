/** @odoo-module **/

import { Component, useState, onMounted } from "@odoo/owl";

export class AssessmentForm extends Component {
    static template = "healthnusa.AssessmentForm";
    static props = {
        router: { type: Object, optional: false },
        selectApp: { type: Function, optional: false },
        assessmentId: { type: [String, Number], optional: true },
        mode: { type: String, optional: true }  // 'create' or 'edit'
    };

    setup() {
        this.router = this.props.router;
        this.mode = this.props.mode || 'create';
        this.assessmentId = this.props.assessmentId;

        // Determine mode based on current route
        const currentPath = window.location.pathname;
        const isNewAssessment = currentPath.includes('/assessment/new');
        const isEditAssessment = currentPath.includes('/assessment/edit');
        
        // Set mode based on route
        if (isNewAssessment) {
            this.mode = 'create';
        } else if (isEditAssessment) {
            this.mode = 'edit';
        }

        this.state = useState({
            activeTab: 'general-form',
            anatomyMarkers: [
                { id: 1, x: 35, y: 25, title: 'Head Area', note: 'Normal examination, no abnormalities', color: 'bg-blue-500' },
                { id: 2, x: 40, y: 45, title: 'Chest Area', note: 'Slight tenderness on palpation', color: 'bg-red-500' },
                { id: 3, x: 25, y: 55, title: 'Left Arm', note: 'Full range of motion', color: 'bg-green-500' },
                { id: 4, x: 38, y: 65, title: 'Abdomen', note: 'Soft, non-tender', color: 'bg-yellow-500' },
                { id: 5, x: 32, y: 80, title: 'Left Leg', note: 'Normal strength and reflexes', color: 'bg-purple-500' },
                { id: 6, x: 45, y: 80, title: 'Right Leg', note: 'Mild swelling noted', color: 'bg-pink-500' }
            ],
            nextMarkerId: 7,
            showMarkerModal: false,
            showDeleteConfirmModal: false,
            markerToDelete: null,
            editingMarkerId: null,
            newMarker: {
                title: '',
                note: '',
                x: 0,
                y: 0,
                color: 'bg-red-500'
            },
            showDeleteModal: false,
            assessment: {
                patient_id: "",
                assessment_date: new Date().toISOString().split('T')[0],
                assessment_time: new Date().toTimeString().split(' ')[0].slice(0, 5),
                doctor_id: "",
                priority: "Medium",
                status: "In Progress",
                chief_complaint: "",
                history_present_illness: "",
                past_medical_history: "",
                family_history: "",
                allergy_history: "",
                social_history: "",
                psychological_status: "",
                social_economic_status: "",
                spiritual_status: "",
                risk_factors: "",
                support_system: "",
                coping_mechanism: "",
                vital_signs: {
                    blood_pressure: "",
                    heart_rate: "",
                    temperature: "",
                    respiratory_rate: "",
                    oxygen_saturation: "",
                    pain_scale: "",
                    height: "",
                    weight: ""
                },
                consciousness: "",
                gcs_eye: "4",
                gcs_verbal: "5",
                gcs_motor: "6",
                physical_examination: "",
                care_level: "",
                estimated_los: "",
                estimated_los_unit: "Hari",
                treatment_goals: "",
                care_plan: "",
                monitoring_plan: "",
                discharge_criteria: "",
                differential_diagnosis: "",
                clinical_impression: "",
                prognosis: "",
                prognosis_time: "",
                prognosis_notes: "",
                medication_allergy: "",
                adverse_reactions: "",
                special_instructions: "",
                precautions: "",
                anatomy_markers: [],
                additional_notes: ""
            },
            patients: [
                { id: "1", name: "Abigail Peterson", mrn: "MRN123456" },
                { id: "2", name: "Sarah Johnson", mrn: "MRN002" },
                { id: "3", name: "Michael Chen", mrn: "MRN003" },
                { id: "4", name: "Emily Davis", mrn: "MRN004" }
            ],
            doctors: [
                { id: "1", name: "Dr. Sarah Johnson" },
                { id: "2", name: "Dr. Michael Chen" },
                { id: "3", name: "Dr. Emily Davis" },
                { id: "4", name: "Dr. Robert Wilson" }
            ],
            diagnosis_list: [
                {
                    id: 1,
                    type: "Primary",
                    icd_code: "J44.1",
                    description: "Chronic obstructive pulmonary disease with acute exacerbation",
                    date: "11/07/2025",
                    status: "Active"
                },
                {
                    id: 2,
                    type: "Secondary", 
                    icd_code: "E11.9",
                    description: "Type 2 diabetes mellitus without complications",
                    date: "11/07/2025",
                    status: "Monitoring"
                }
            ],
            medication_list: [
                {
                    id: 1,
                    name: "Paracetamol",
                    dosage: "500mg",
                    frequency: "3x daily",
                    route: "Oral",
                    start_date: "10/07/2025",
                    status: "Active"
                }
            ],
            instruction_list: [
                {
                    id: 1,
                    date: "11/07/2025",
                    type: "Medical",
                    instruction: "Administer oxygen 2L/min via nasal cannula",
                    staff: "Dr. Alexa",
                    status: "Active"
                },
                {
                    id: 2,
                    date: "11/07/2025",
                    type: "Nursing",
                    instruction: "Monitor vital signs every 4 hours",
                    staff: "Ns. Sarah",
                    status: "In Progress"
                }
            ],
            markerCount: 6,
            isLoading: false,
            errors: {}
        });

        onMounted(() => {
            if (this.mode === 'edit' && this.assessmentId) {
                this.loadAssessmentData();
            }
            this.initializeFormNavigation();
            this.initializeMarkers();
        });
    }

    initializeFormNavigation() {
        console.log('Initializing form navigation');
        
        const navItems = document.querySelectorAll('.form-navbar .nav-item');
        const formSections = {
            'general-form': document.getElementById('general-form-section'),
            'specialist-form': document.getElementById('specialist-form-section'),
            'medication-form': document.getElementById('medication-form-section'),
            'instruction-form': document.getElementById('instruction-form-section')
        };

        console.log('Found nav items:', navItems.length);
        console.log('Form sections:', formSections);

        const switchForm = (targetForm) => {
            console.log('Switching to form:', targetForm);
            
            // Remove active class from all nav items
            navItems.forEach(item => {
                item.classList.remove('active');
            });
            
            // Add active class to clicked nav item
            const activeNavItem = document.querySelector(`[data-form="${targetForm}"]`);
            if (activeNavItem) {
                activeNavItem.classList.add('active');
                console.log('Active nav item updated:', activeNavItem);
            }

            // Hide all form sections
            Object.values(formSections).forEach(section => {
                if (section) {
                    section.classList.remove('active');
                    section.style.display = 'none';
                }
            });

            // Show target form section
            if (formSections[targetForm]) {
                formSections[targetForm].classList.add('active');
                formSections[targetForm].style.display = 'block';
                console.log('Showing section:', targetForm);
            } else {
                console.error('Section not found:', targetForm);
            }
        };

        // Add click event listeners to nav items
        navItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const targetForm = this.getAttribute('data-form');
                if (targetForm) {
                    switchForm(targetForm);
                }
            });
        });

        // Add CSS to hide all sections initially and apply navbar styles
        const style = document.createElement('style');
        style.textContent = `
            :root {
                --primary-blue: #4A90E2;
                --blue-50: #F0F6FF;
                --blue-100: #E0E9FF;
                --blue-200: #BED0FF;
                --blue-300: #93B0FF;
                --gray-50: #F9FAFB;
                --gray-100: #F3F4F6;
                --gray-200: #E5E7EB;
                --gray-300: #D1D5DB;
                --gray-400: #9CA3AF;
                --gray-500: #6B7280;
                --gray-600: #4B5563;
                --gray-700: #374151;
                --gray-800: #1F2937;
                --gray-900: #111827;
                --green-50: #F0FDF4;
                --green-800: #166534;
                --yellow-50: #FEFCE8;
                --yellow-800: #854D0E;
                --purple-50: #FAF5FF;
                --purple-800: #6B21A8;
                --red-50: #FEF2F2;
                --red-800: #991B1B;
                --teal-50: #F0FDFA;
                --teal-700: #0F766E;
                --orange-50: #FFF7ED;
                --orange-700: #C2410C;
            }
            
            /* Dark mode variables */
            [data-theme="dark"] {
                --primary-blue: #5BA3F5;
                --blue-50: #1E3A5F;
                --blue-100: #2A4A6B;
                --blue-200: #3B5C7A;
                --blue-300: #4D6E89;
                --gray-50: #1F2937;
                --gray-100: #374151;
                --gray-200: #4B5563;
                --gray-300: #6B7280;
                --gray-400: #9CA3AF;
                --gray-500: #D1D5DB;
                --gray-600: #E5E7EB;
                --gray-700: #F3F4F6;
                --gray-800: #F9FAFB;
                --gray-900: #FFFFFF;
                --green-50: #1F3A2E;
                --green-800: #34D399;
                --yellow-50: #3A2F1F;
                --yellow-800: #FBBF24;
                --purple-50: #3A1F3A;
                --purple-800: #C084FC;
                --red-50: #3A1F1F;
                --red-800: #F87171;
                --teal-50: #1F3A37;
                --teal-700: #14B8A6;
                --orange-50: #3A2A1F;
                --orange-700: #FB923C;
            }
            
            /* Dark mode styles */
            [data-theme="dark"] {
                background-color: #1F2937 !important;
                color: #F3F4F6 !important;
            }
            
            [data-theme="dark"] body,
            [data-theme="dark"] .min-h-screen {
                background-color: #1F2937 !important;
                color: #F3F4F6 !important;
            }
            
            [data-theme="dark"] .bg-white {
                background-color: #374151 !important;
                color: #F3F4F6 !important;
            }
            
            [data-theme="dark"] .bg-gray-50,
            [data-theme="dark"] .bg-custom-gray {
                background-color: #1F2937 !important;
            }
            
            [data-theme="dark"] .bg-gray-100 {
                background-color: #4B5563 !important;
            }
            
            [data-theme="dark"] input,
            [data-theme="dark"] textarea,
            [data-theme="dark"] select {
                background-color: #4B5563 !important;
                border-color: #6B7280 !important;
                color: #F3F4F6 !important;
            }
            
            [data-theme="dark"] input::placeholder,
            [data-theme="dark"] textarea::placeholder {
                color: #9CA3AF !important;
            }
            
            [data-theme="dark"] input:focus,
            [data-theme="dark"] textarea:focus,
            [data-theme="dark"] select:focus {
                border-color: #5BA3F5 !important;
                background-color: #4B5563 !important;
                box-shadow: 0 0 0 3px rgba(91, 163, 245, 0.1) !important;
            }
            
            [data-theme="dark"] .border-gray-200 {
                border-color: #4B5563 !important;
            }
            
            [data-theme="dark"] .border-gray-300 {
                border-color: #6B7280 !important;
            }
            
            [data-theme="dark"] .text-gray-500 {
                color: #9CA3AF !important;
            }
            
            [data-theme="dark"] .text-gray-600 {
                color: #D1D5DB !important;
            }
            
            [data-theme="dark"] .text-gray-700 {
                color: #E5E7EB !important;
            }
            
            [data-theme="dark"] .text-gray-800 {
                color: #F3F4F6 !important;
            }
            
            [data-theme="dark"] .text-gray-900 {
                color: #FFFFFF !important;
            }
            
            [data-theme="dark"] .shadow-sm,
            [data-theme="dark"] .shadow-md {
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3) !important;
            }
            
            /* Visit History Dark Mode Colors */
            [data-theme="dark"] .bg-\\[var\\(--blue-50\\)\\] {
                background-color: #1E3A5F !important;
            }
            
            [data-theme="dark"] .bg-\\[var\\(--green-50\\)\\] {
                background-color: #1F3A2E !important;
            }
            
            [data-theme="dark"] .bg-\\[var\\(--yellow-50\\)\\] {
                background-color: #3A2F1F !important;
            }
            
            [data-theme="dark"] .bg-\\[var\\(--purple-50\\)\\] {
                background-color: #3A1F3A !important;
            }
            
            [data-theme="dark"] .bg-\\[var\\(--red-50\\)\\] {
                background-color: #3A1F1F !important;
            }
            
            [data-theme="dark"] .text-\\[var\\(--green-800\\)\\] {
                color: #34D399 !important;
            }
            
            [data-theme="dark"] .text-\\[var\\(--yellow-800\\)\\] {
                color: #FBBF24 !important;
            }
            
            [data-theme="dark"] .text-\\[var\\(--purple-800\\)\\] {
                color: #C084FC !important;
            }
            
            [data-theme="dark"] .text-\\[var\\(--red-800\\)\\] {
                color: #F87171 !important;
            }
            
            [data-theme="dark"] .text-\\[var\\(--gray-800\\)\\] {
                color: #F3F4F6 !important;
            }
            
            [data-theme="dark"] .text-\\[var\\(--gray-700\\)\\] {
                color: #E5E7EB !important;
            }
            
            [data-theme="dark"] .text-\\[var\\(--gray-600\\)\\] {
                color: #D1D5DB !important;
            }
            
            [data-theme="dark"] .bg-\\[var\\(--gray-50\\)\\] {
                background-color: #374151 !important;
            }
            
            .form-section {
                display: none;
            }
            .form-section.active {
                display: block !important;
            }
            .form-navbar .nav-item {
                cursor: pointer;
                transition: all 0.2s ease;
            }
            .form-navbar .nav-item:hover {
                background-color: var(--gray-100);
            }
            .form-navbar .nav-item.active {
                background-color: var(--primary-blue) !important;
                color: white !important;
            }
            .form-navbar .nav-item.active .material-icons {
                color: white !important;
            }
            
            /* Dark mode specific styles for navigation */
            [data-theme="dark"] .form-navbar .nav-item {
                color: #D1D5DB !important;
            }
            [data-theme="dark"] .form-navbar .nav-item .material-icons {
                color: #9CA3AF !important;
            }
            [data-theme="dark"] .form-navbar .nav-item:hover {
                background-color: #374151 !important;
                color: #60A5FA !important;
            }
            [data-theme="dark"] .form-navbar .nav-item:hover .material-icons {
                color: #60A5FA !important;
            }
            /* Ensure active state overrides dark mode */
            [data-theme="dark"] .form-navbar .nav-item.active {
                background-color: var(--primary-blue) !important;
                color: white !important;
            }
            [data-theme="dark"] .form-navbar .nav-item.active .material-icons {
                color: white !important;
            }
            
        `;
        document.head.appendChild(style);
        
        // Initialize with general form active
        switchForm('general-form');

        // Setup dark mode toggle with existing button
        this.setupDarkModeToggle();

        // Expose global functions for external access
        window.switchFormTab = (targetForm) => {
            switchForm(targetForm);
        };
    }

    setupDarkModeToggle() {
        // Find the existing dark mode toggle button in the top-right header
        // Let's try different selectors for the existing button
        const toggleButton = document.querySelector('[data-theme-toggle]') || 
                            document.querySelector('.theme-toggle') ||
                            document.querySelector('[onclick*="theme"]') ||
                            document.querySelector('button[class*="theme"]');
        
        // If we can't find the existing button, let's look for common dark mode button patterns
        if (!toggleButton) {
            console.warn('Existing dark mode toggle button not found, trying alternative selectors...');
            // Try to find any button that might be the theme toggle
            const buttons = document.querySelectorAll('button');
            const themeButton = Array.from(buttons).find(btn => 
                btn.innerHTML.includes('🌙') || 
                btn.innerHTML.includes('☀️') ||
                btn.classList.toString().includes('theme') ||
                btn.onclick?.toString().includes('theme')
            );
            if (themeButton) {
                this.attachToDarkModeButton(themeButton);
                return;
            }
            console.warn('Could not find existing dark mode toggle button');
            return;
        }
        
        this.attachToDarkModeButton(toggleButton);
    }

    attachToDarkModeButton(toggleButton) {
        console.log('Attaching dark mode functionality to existing button:', toggleButton);
        
        // Check for saved theme preference
        const currentTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        // Apply the saved theme immediately
        this.applyDarkModeStyles(currentTheme === 'dark');
        
        // Add click event listener to the existing button
        // Remove any existing click handlers first
        const newToggleButton = toggleButton.cloneNode(true);
        toggleButton.parentNode.replaceChild(newToggleButton, toggleButton);
        
        newToggleButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            console.log('Dark mode toggle clicked:', currentTheme, '->', newTheme);
            
            // Apply theme to all necessary elements
            document.documentElement.setAttribute('data-theme', newTheme);
            document.body.setAttribute('data-theme', newTheme);
            
            // Also add to the main container
            const mainContainer = document.querySelector('.min-h-screen');
            if (mainContainer) {
                mainContainer.setAttribute('data-theme', newTheme);
            }
            
            localStorage.setItem('theme', newTheme);
            
            // Force apply dark styles immediately
            this.applyDarkModeStyles(newTheme === 'dark');
        });
    }

    applyDarkModeStyles(isDark) {
        const elements = {
            backgrounds: document.querySelectorAll('.bg-white, .bg-gray-50, .bg-custom-gray'),
            texts: document.querySelectorAll('.text-gray-700, .text-gray-800, .text-gray-600, .text-gray-900'),
            inputs: document.querySelectorAll('input, textarea, select'),
            borders: document.querySelectorAll('.border-gray-200, .border-gray-300')
        };

        if (isDark) {
            // Apply dark backgrounds
            elements.backgrounds.forEach(el => {
                if (el.classList.contains('bg-white')) {
                    el.style.backgroundColor = '#374151';
                    el.style.color = '#F3F4F6';
                } else if (el.classList.contains('bg-gray-50') || el.classList.contains('bg-custom-gray')) {
                    el.style.backgroundColor = '#1F2937';
                    el.style.color = '#F3F4F6';
                }
            });

            // Apply dark text colors
            elements.texts.forEach(el => {
                el.style.color = '#F3F4F6';
            });

            // Apply dark input styles
            elements.inputs.forEach(el => {
                el.style.backgroundColor = '#4B5563';
                el.style.borderColor = '#6B7280';
                el.style.color = '#F3F4F6';
            });

            // Apply dark borders
            elements.borders.forEach(el => {
                el.style.borderColor = '#4B5563';
            });

            // Apply to main container
            const mainContainer = document.querySelector('.min-h-screen');
            if (mainContainer) {
                mainContainer.style.backgroundColor = '#1F2937';
                mainContainer.style.color = '#F3F4F6';
            }
        } else {
            // Remove dark styles
            [...elements.backgrounds, ...elements.texts, ...elements.inputs, ...elements.borders].forEach(el => {
                el.style.backgroundColor = '';
                el.style.color = '';
                el.style.borderColor = '';
            });

            const mainContainer = document.querySelector('.min-h-screen');
            if (mainContainer) {
                mainContainer.style.backgroundColor = '';
                mainContainer.style.color = '';
            }
        }
    }

    initializeMarkers() {
        // This will be called by the external JavaScript
        window.initializeMarkers = () => {
            // Marker functionality will be handled by the external JS
        };
    }

    loadAssessmentData() {
        // TODO: Load assessment data from backend API for editing
        this.state.isLoading = true;
        console.log('Loading assessment data for edit mode, ID:', this.assessmentId);
        
        // Simulate loading existing data
        setTimeout(() => {
            this.state.assessment = {
                ...this.state.assessment,
                patient_id: "1",
                assessment_date: "2024-01-15",
                assessment_time: "10:30",
                doctor_id: "1",
                priority: "High",
                status: "Completed",
                chief_complaint: "Chest pain and shortness of breath",
                history_present_illness: "Patient reports experiencing sharp chest pain for the past 2 hours",
                vital_signs: {
                    blood_pressure: "145/92",
                    heart_rate: "88",
                    temperature: "36.8",
                    respiratory_rate: "18",
                    oxygen_saturation: "98",
                    pain_scale: "5",
                    height: "170",
                    weight: "70"
                },
                physical_examination: "General appearance: Alert and oriented",
                differential_diagnosis: "Hypertension (Essential)",
                clinical_impression: "Patient shows signs of stage 1 hypertension",
                additional_notes: "Patient advised on lifestyle modifications"
            };
            this.state.isLoading = false;
        }, 1000);
    }

    validateForm() {
        const errors = {};
        const assessment = this.state.assessment;

        if (!assessment.patient_id) {
            errors.patient_id = "Please select a patient";
        }
        if (!assessment.chief_complaint.trim()) {
            errors.chief_complaint = "Chief complaint is required";
        }

        this.state.errors = errors;
        return Object.keys(errors).length === 0;
    }

    saveAssessment() {
        if (!this.validateForm()) {
            return;
        }

        this.state.isLoading = true;
        
        // TODO: Save assessment data to backend API
        console.log('Saving assessment:', this.state.assessment);
        
        setTimeout(() => {
            this.state.isLoading = false;
            alert(`Assessment ${this.mode === 'create' ? 'created' : 'updated'} successfully!`);
            this.props.selectApp('assessment');
        }, 1000);
    }

    saveDraft() {
        this.state.isLoading = true;
        
        // TODO: Save as draft to backend API
        console.log('Saving assessment as draft:', this.state.assessment);
        
        setTimeout(() => {
            this.state.isLoading = false;
            alert('Assessment saved as draft!');
        }, 1000);
    }

    cancelForm() {
        this.props.selectApp('assessment');
    }

    onFieldChange(field, value) {
        if (field.includes('.')) {
            const [parent, child] = field.split('.');
            this.state.assessment[parent][child] = value;
        } else {
            this.state.assessment[field] = value;
        }
        
        // Clear error when field is updated
        if (this.state.errors[field]) {
            delete this.state.errors[field];
        }
    }

    getFieldError(field) {
        return this.state.errors[field] || '';
    }

    get pageTitle() {
        return this.mode === 'create' ? 'New Assessment' : 'Edit Assessment';
    }

    get saveButtonText() {
        return this.state.isLoading 
            ? 'Saving...' 
            : (this.mode === 'create' ? 'Save Assessment' : 'Update Assessment');
    }

    addDiagnosis() {
        // This will be handled by external JavaScript
        console.log('Add diagnosis clicked');
    }

    addMedication() {
        // This will be handled by external JavaScript
        console.log('Add medication clicked');
    }

    addInstruction() {
        // This will be handled by external JavaScript
        console.log('Add instruction clicked');
    }

    // Anatomy marker methods
    onAnatomyClick(event) {
        const rect = event.target.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        
        this.state.newMarker = {
            title: '',
            note: '',
            x: x,
            y: y,
            color: 'bg-red-500'
        };
        this.state.editingMarkerId = null;
        this.state.showMarkerModal = true;
    }

    addMarker() {
        if (this.state.newMarker.title.trim() === '' || this.state.newMarker.note.trim() === '') {
            return;
        }

        const newMarker = {
            id: this.state.nextMarkerId,
            x: this.state.newMarker.x,
            y: this.state.newMarker.y,
            title: this.state.newMarker.title,
            note: this.state.newMarker.note,
            color: this.state.newMarker.color
        };

        this.state.anatomyMarkers.push(newMarker);
        this.state.nextMarkerId++;
        this.closeMarkerModal();
    }

    editMarker(markerId) {
        const marker = this.state.anatomyMarkers.find(m => m.id === markerId);
        if (marker) {
            this.state.newMarker = {
                title: marker.title,
                note: marker.note,
                x: marker.x,
                y: marker.y,
                color: marker.color
            };
            this.state.editingMarkerId = markerId;
            this.state.showMarkerModal = true;
        }
    }

    updateMarker() {
        if (this.state.newMarker.title.trim() === '' || this.state.newMarker.note.trim() === '') {
            return;
        }

        const markerIndex = this.state.anatomyMarkers.findIndex(m => m.id === this.state.editingMarkerId);
        if (markerIndex !== -1) {
            this.state.anatomyMarkers[markerIndex] = {
                ...this.state.anatomyMarkers[markerIndex],
                title: this.state.newMarker.title,
                note: this.state.newMarker.note,
                color: this.state.newMarker.color
            };
        }
        this.closeMarkerModal();
    }

    deleteMarker(markerId) {
        const marker = this.state.anatomyMarkers.find(m => m.id === markerId);
        if (marker) {
            this.state.markerToDelete = marker;
            this.state.showDeleteConfirmModal = true;
        }
    }

    confirmDeleteMarker() {
        if (this.state.markerToDelete) {
            this.state.anatomyMarkers = this.state.anatomyMarkers.filter(m => m.id !== this.state.markerToDelete.id);
            this.state.markerToDelete = null;
            this.state.showDeleteConfirmModal = false;
        }
    }

    cancelDeleteMarker() {
        this.state.markerToDelete = null;
        this.state.showDeleteConfirmModal = false;
    }

    closeMarkerModal() {
        this.state.showMarkerModal = false;
        this.state.editingMarkerId = null;
        this.state.newMarker = {
            title: '',
            note: '',
            x: 0,
            y: 0,
            color: 'bg-red-500'
        };
    }

    onMarkerInputChange(field, value) {
        this.state.newMarker[field] = value;
    }

    selectMarkerColor(color) {
        this.state.newMarker.color = color;
    }

    saveMarker() {
        if (this.state.editingMarkerId) {
            this.updateMarker();
        } else {
            this.addMarker();
        }
    }

    cancelMarker() {
        this.closeMarkerModal();
    }

    get editingMarker() {
        return !!this.state.editingMarkerId;
    }

    // Navigation methods for dynamic class binding
    getNavItemClass(formType) {
        const isActive = this.state.activeTab === formType;
        return isActive 
            ? 'bg-custom-blue dark:bg-custom-blue text-white hover:bg-blue-600 dark:hover:bg-blue-600'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-custom-blue dark:hover:text-blue-400';
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
        
        // Handle the form switching logic (this was already implemented in the mounted method)
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