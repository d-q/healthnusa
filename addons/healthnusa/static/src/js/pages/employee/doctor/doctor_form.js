/** @odoo-module **/

import { Component, useState, onMounted } from "@odoo/owl";

export class DoctorForm extends Component {
    static template = "healthnusa.DoctorForm";

    detectMode() {
        // Check URL, element ID, or props to determine mode
        const currentPath = window.location.pathname;
        const currentHash = window.location.hash;
        
        // Check for edit mode indicators
        if (currentPath.includes('edit') || currentHash.includes('doctor-edit') || document.getElementById('doctor-edit')) {
            return 'edit';
        }
        return 'new';
    }

    initializeDoctorData() {
        const baseSchedule = [
            { day: 'Mon', label: 'Mon', active: true, bgClass: 'bg-blue-100', textClass: 'text-blue-600', checkboxClass: 'text-blue-600', times: [{ start: "09:00", end: "17:00" }] },
            { day: 'Tue', label: 'Tue', active: true, bgClass: 'bg-green-100', textClass: 'text-green-600', checkboxClass: 'text-green-600', times: [{ start: "09:00", end: "17:00" }] },
            { day: 'Wed', label: 'Wed', active: true, bgClass: 'bg-pink-100', textClass: 'text-pink-600', checkboxClass: 'text-pink-600', times: [{ start: "09:00", end: "17:00" }] },
            { day: 'Thu', label: 'Thu', active: true, bgClass: 'bg-purple-100', textClass: 'text-purple-600', checkboxClass: 'text-purple-600', times: [{ start: "09:00", end: "17:00" }] },
            { day: 'Fri', label: 'Fri', active: true, bgClass: 'bg-yellow-100', textClass: 'text-yellow-600', checkboxClass: 'text-yellow-600', times: [{ start: "09:00", end: "12:00" }] },
            { day: 'Sat', label: 'Sat', active: true, bgClass: 'bg-indigo-100', textClass: 'text-indigo-600', checkboxClass: 'text-indigo-600', times: [{ start: "09:00", end: "12:00" }] },
            { day: 'Sun', label: 'Sun', active: true, bgClass: 'bg-teal-100', textClass: 'text-teal-600', checkboxClass: 'text-teal-600', times: [{ start: "10:00", end: "14:00" }] }
        ];

        const dutyStatusOptions = [
            { value: 'available', label: 'Available' },
            { value: 'on-break', label: 'On Break' },
            { value: 'not-available', label: 'Not Available' }
        ];

        if (this.mode === 'edit') {
            // Return populated data for edit mode
            return {
                id: 1,
                name: "Dr. John Smith",
                gender: "Male",
                dateOfBirth: "June 15, 1980",
                phone: "+123 456 7890",
                email: "johnsmith.md@hospital.com",
                specialty: "Heart Specialist",
                fullSpecialization: "Heart Specialist (Cardiology)",
                address: "Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta",
                image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=144&h=144&fit=crop&crop=face",
                medicalLicense: "1234567890123456",
                practiceLicense: "SIP.123/DU/X/2023",
                birthDate: "1980-06-15",
                dutyStatus: "available",
                schedule: baseSchedule,
                dutyStatusOptions: dutyStatusOptions,
                education: [
                    {
                        id: 1,
                        degree: "Cardiologist Specialist",
                        institution: "University of Indonesia",
                        period: "2010 - 2014"
                    },
                    {
                        id: 2,
                        degree: "Medical Doctor",
                        institution: "Gadjah Mada University",
                        period: "2004 - 2006"
                    },
                    {
                        id: 3,
                        degree: "Bachelor of Medicine",
                        institution: "Gadjah Mada University",
                        period: "2000 - 2004"
                    }
                ],
                experience: [
                    {
                        id: 1,
                        position: "Cardiologist",
                        institution: "Mario Hospital",
                        period: "2015 - Present"
                    },
                    {
                        id: 2,
                        position: "General Practitioner",
                        institution: "Sehat Sejahtera Clinic",
                        period: "2007 - 2010"
                    }
                ],
                licenses: [
                    {
                        id: 1,
                        type: "STR",
                        title: "Surat Tanda Registrasi (STR)",
                        description: "Medical Registration Certificate",
                        number: "1234567890123456",
                        issueDate: "15 January 2020",
                        expiryDate: "15 January 2025",
                        authority: "Indonesian Medical Council",
                        status: "Active"
                    },
                    {
                        id: 2,
                        type: "SIP",
                        title: "Surat Izin Praktik (SIP)",
                        description: "Medical Practice License",
                        number: "SIP.123/DU/X/2023",
                        issueDate: "10 March 2023",
                        expiryDate: "10 March 2028",
                        authority: "Mario Hospital, Jakarta",
                        status: "Active"
                    },
                    {
                        id: 3,
                        type: "Specialist",
                        title: "Specialist Certification",
                        description: "Cardiology Specialist Certificate",
                        number: "CARD-2014-001234",
                        issueDate: "20 December 2014",
                        expiryDate: "",
                        authority: "University of Indonesia",
                        specialty: "Cardiology",
                        status: "Valid"
                    }
                ],
                appointments: [
                    {
                        id: 1,
                        patientName: "Sarah Johnson",
                        patientId: "PAT-001234",
                        reason: "Chest pain consultation",
                        time: "09:00 - 09:30",
                        status: "Confirmed"
                    },
                    {
                        id: 2,
                        patientName: "Michael Chen",
                        patientId: "PAT-001235",
                        reason: "Regular checkup",
                        time: "10:00 - 10:30",
                        status: "Waiting"
                    },
                    {
                        id: 3,
                        patientName: "Emma Williams",
                        patientId: "PAT-001236",
                        reason: "Hypertension follow-up",
                        time: "11:00 - 11:30",
                        status: "In Progress"
                    },
                    {
                        id: 4,
                        patientName: "Robert Davis",
                        patientId: "PAT-001237",
                        reason: "Heart rhythm evaluation",
                        time: "13:00 - 13:30",
                        status: "Scheduled"
                    },
                    {
                        id: 5,
                        patientName: "Lisa Anderson",
                        patientId: "PAT-001238",
                        reason: "Post-surgery follow-up",
                        time: "14:00 - 14:30",
                        status: "Confirmed"
                    },
                    {
                        id: 6,
                        patientName: "David Martinez",
                        patientId: "PAT-001239",
                        reason: "ECG examination",
                        time: "15:00 - 15:30",
                        status: "Scheduled"
                    },
                    {
                        id: 7,
                        patientName: "Jennifer Taylor",
                        patientId: "PAT-001240",
                        reason: "Cardiac stress test",
                        time: "15:30 - 16:00",
                        status: "Confirmed"
                    },
                    {
                        id: 8,
                        patientName: "Thomas Wilson",
                        patientId: "PAT-001241",
                        reason: "Medication review",
                        time: "16:00 - 16:30",
                        status: "Scheduled"
                    }
                ]
            };
        } else {
            // Return empty data for new doctor mode
            return {
                id: null,
                name: "",
                gender: "",
                dateOfBirth: "",
                phone: "",
                email: "",
                specialty: "",
                fullSpecialization: "",
                address: "",
                image: "",
                medicalLicense: "",
                practiceLicense: "",
                birthDate: "",
                dutyStatus: "available",
                schedule: baseSchedule,
                dutyStatusOptions: dutyStatusOptions,
                education: [],
                experience: [],
                licenses: [],
                appointments: []
            };
        }
    }

    setup() {
        // Detect mode based on URL or component props
        this.mode = this.detectMode();
        
        this.state = useState({
            currentPage: 1,
            itemsPerPage: 10,
            currentSearchTerm: "",
            currentSearchField: "all",
            filteredItems: [],
            sortField: "",
            sortDirection: "asc",
            darkMode: false,
            doctor: this.initializeDoctorData(),
            showAddLicenseForm: false,
            editingLicenseId: null,
            editingEducation: null, // ID of education item being edited
            editingExperience: null // ID of experience item being edited
        });

        onMounted(() => {
            this.initDarkMode();
            this.initEventListeners();
        });
    }

    // Image Selection Functions
    selectImage() {
        // Create a hidden file input
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.style.display = 'none';
        
        // Handle file selection
        fileInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                // Check if file is an image
                if (!file.type.startsWith('image/')) {
                    alert('Please select a valid image file.');
                    return;
                }
                
                // Check file size (limit to 5MB)
                if (file.size > 5 * 1024 * 1024) {
                    alert('Please select an image smaller than 5MB.');
                    return;
                }
                
                // Create file reader to convert to base64 or URL
                const reader = new FileReader();
                reader.onload = (e) => {
                    // Update the doctor image in state
                    this.state.doctor.image = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
        
        // Add to DOM temporarily and trigger click
        document.body.appendChild(fileInput);
        fileInput.click();
        
        // Clean up
        setTimeout(() => {
            document.body.removeChild(fileInput);
        }, 100);
    }

    // Dark Mode Functions
    toggleDarkMode() {
        const html = document.documentElement;
        const body = document.body;
        const icon = document.getElementById("darkModeIcon");

        if (html.classList.contains("dark")) {
            html.classList.remove("dark");
            body.classList.remove("dark");
            if (icon) icon.textContent = "dark_mode";
            localStorage.setItem("darkMode", "false");
            this.state.darkMode = false;
        } else {
            html.classList.add("dark");
            body.classList.add("dark");
            if (icon) icon.textContent = "light_mode";
            localStorage.setItem("darkMode", "true");
            this.state.darkMode = true;
        }
        
        this.forceScrollbarRefresh();
    }

    forceScrollbarRefresh() {
        const container = document.querySelector('.data-list-container');
        if (container) {
            const originalDisplay = container.style.display;
            container.style.display = 'none';
            container.offsetHeight;
            container.style.display = originalDisplay || 'block';
            
            const originalOverflow = container.style.overflowY;
            container.style.overflowY = 'hidden';
            setTimeout(() => {
                container.style.overflowY = originalOverflow || 'auto';
            }, 10);
        }
    }

    initDarkMode() {
        const savedMode = localStorage.getItem("darkMode");
        const icon = document.getElementById("darkModeIcon");
        const html = document.documentElement;
        const body = document.body;

        if (savedMode === "true") {
            html.classList.add("dark");
            body.classList.add("dark");
            if (icon) icon.textContent = "light_mode";
            this.state.darkMode = true;
        } else {
            html.classList.remove("dark");
            body.classList.remove("dark");
            if (icon) icon.textContent = "dark_mode";
            this.state.darkMode = false;
        }
        
        setTimeout(() => this.forceScrollbarRefresh(), 100);
    }

    // Dropdown Functions
    toggleDropdown(button) {
        const dropdown = button.nextElementSibling;
        const isVisible = dropdown.classList.contains("show");

        document.querySelectorAll(".dropdown-menu").forEach((menu) => {
            menu.classList.remove("show");
        });

        if (!isVisible) {
            dropdown.classList.add("show");
        }
    }

    toggleSearchFilter(button) {
        const dropdown = button.nextElementSibling;
        const isVisible = dropdown.classList.contains("show");

        document.querySelectorAll(".search-filter-menu").forEach((menu) => {
            menu.classList.remove("show");
        });

        if (!isVisible) {
            dropdown.classList.add("show");
        }
    }

    // Helper Functions
    getStatusClass(status) {
        switch(status) {
            case 'Available': return 'bg-green-100 text-green-700';
            case 'Not Available': return 'bg-red-100 text-red-700';
            case 'On Break': return 'bg-yellow-100 text-yellow-700';
            case 'In Surgery': return 'bg-blue-100 text-blue-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    }

    getStatusColor(status) {
        switch(status) {
            case 'Available': return 'bg-green-500';
            case 'Not Available': return 'bg-red-500';
            case 'On Break': return 'bg-yellow-500';
            case 'In Surgery': return 'bg-blue-500';
            default: return 'bg-gray-500';
        }
    }

    // Search Functions
    searchData(searchTerm, searchField) {
        // This would be implemented when integrating with actual data
        console.log('Search:', searchTerm, 'in field:', searchField);
    }

    clearSearch() {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.value = '';
            this.state.currentSearchTerm = '';
            this.searchData('', this.state.currentSearchField);
        }
    }

    // Event Listeners Setup
    initEventListeners() {
        // Click outside dropdown handler
        document.addEventListener("click", (event) => {
            const dropdowns = document.querySelectorAll(".dropdown-menu, .search-filter-menu");
            const isDropdownButton = event.target.closest('button[onclick*="toggleDropdown"]') ||
                                    event.target.closest('button[onclick*="toggleSearchFilter"]');
            const isInsideSearchFilter = event.target.closest(".search-filter-menu");

            if (!isDropdownButton && !isInsideSearchFilter) {
                dropdowns.forEach((dropdown) => {
                    dropdown.classList.remove("show");
                });
            }
        });

        // Escape key handler
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                document.querySelectorAll(".dropdown-menu, .search-filter-menu").forEach((menu) => {
                    menu.classList.remove("show");
                });
            }
        });

        // Checkbox handlers
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                this.handleScheduleCheckbox(e.target);
            });
        });

        // Cancel button handler
        const cancelButton = document.querySelector('.bg-gray-200');
        
        if (cancelButton) {
            cancelButton.addEventListener('click', () => this.handleCancel());
        }
    }

    handleScheduleCheckbox(checkbox) {
        const container = checkbox.closest('.flex.items-start.space-x-2');
        if (!container) return;
        
        const timeContainer = container.querySelector('.flex-1');
        const timeInputs = timeContainer.querySelectorAll('input[type="time"]');
        const buttons = timeContainer.querySelectorAll('button');
        const label = checkbox.closest('label');
        const day = checkbox.nextElementSibling.textContent;
        
        // Find the schedule day object in the state
        const scheduleDay = this.state.doctor.schedule.find(s => s.day === day);
        if (!scheduleDay) return;
        
        // Update the state
        scheduleDay.active = checkbox.checked;
        
        // Update UI based on state
        this.updateScheduleDayUI(scheduleDay, container, label, timeContainer, timeInputs, buttons);
    }
    
    updateScheduleDayUI(scheduleDay, container, label, timeContainer, timeInputs, buttons) {
        if (scheduleDay.active) {
            timeInputs.forEach(input => input.disabled = false);
            buttons.forEach(btn => btn.disabled = false);
            timeContainer.classList.remove('opacity-50');
            
            // Remove old classes and add new ones based on schedule data
            label.className = `flex items-center space-x-2 p-2 border border-gray-300 dark:border-gray-600 rounded-md cursor-pointer w-20 justify-center ${scheduleDay.bgClass} ${scheduleDay.textClass}`;
        } else {
            timeInputs.forEach(input => input.disabled = true);
            buttons.forEach(btn => btn.disabled = true);
            timeContainer.classList.add('opacity-50');
            
            label.className = 'flex items-center space-x-2 p-2 border border-gray-300 dark:border-gray-600 rounded-md cursor-pointer bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 w-20 justify-center';
        }
    }


    saveDoctorData() {
        // Get the save button for UI feedback
        const saveButton = document.querySelector('.w-full.bg-blue-500');
        
        if (saveButton) {
            const originalText = saveButton.innerHTML;
            saveButton.innerHTML = 'Saving...';
            saveButton.disabled = true;
            
            // Simulate API call or actual save logic
            setTimeout(() => {
                // Here you would normally send data to backend
                console.log('Saving doctor data:', this.state.doctor);
                
                // Show success feedback
                saveButton.innerHTML = originalText;
                saveButton.disabled = false;
                
                if (this.mode === 'new') {
                    alert('New doctor created successfully!');
                } else {
                    alert('Doctor data updated successfully!');
                }
                
                // Optionally redirect or refresh
                // window.location.href = '/doctors';
            }, 1500);
        }
    }

    handleCancel() {
        if (confirm('Are you sure you want to cancel? All changes will be lost.')) {
            // Navigate back or reload
            window.history.back();
        }
    }

    saveRow(target) {
        const button = target.closest('button');
        if (!button) return;
        
        const row = button.closest('tr');
        if (!row) return;
        
        // Get input values from the current row
        const inputs = row.querySelectorAll('input');
        const values = Array.from(inputs).map(input => input.value.trim());
        
        // Validate that we have some data
        if (values.every(value => !value)) {
            alert('Please fill in at least one field before saving.');
            return;
        }
        
        // Determine if this is education or experience table
        const isEducation = row.closest('table').querySelector('th').textContent.includes('Degree');
        
        if (isEducation && this.state.editingEducation) {
            const eduItem = this.state.doctor.education.find(item => item.id === this.state.editingEducation);
            if (eduItem && values.length >= 3) {
                eduItem.degree = values[0] || "";
                eduItem.institution = values[1] || "";
                eduItem.period = values[2] || "";
            }
            this.state.editingEducation = null; // Stop editing
        } else if (!isEducation && this.state.editingExperience) {
            const expItem = this.state.doctor.experience.find(item => item.id === this.state.editingExperience);
            if (expItem && values.length >= 3) {
                expItem.position = values[0] || "";
                expItem.institution = values[1] || "";
                expItem.period = values[2] || "";
            }
            this.state.editingExperience = null; // Stop editing
        }
    }

    deleteRow(target) {
        if (confirm('Are you sure you want to delete this row?')) {
            const button = target.closest('button');
            if (!button) return;
            
            const row = button.closest('tr');
            if (!row) return;
            
            // Find which item this row represents by getting the row index
            const tbody = row.parentNode;
            const rowIndex = Array.from(tbody.children).indexOf(row);
            
            // Determine if this is education or experience table
            const isEducation = row.closest('table').querySelector('th').textContent.includes('Degree');
            
            if (isEducation) {
                // Remove from state array
                const itemToDelete = this.state.doctor.education[rowIndex];
                if (itemToDelete) {
                    this.state.doctor.education.splice(rowIndex, 1);
                    // Clear editing state if we were editing this item
                    if (this.state.editingEducation === itemToDelete.id) {
                        this.state.editingEducation = null;
                    }
                }
            } else {
                // Remove from state array
                const itemToDelete = this.state.doctor.experience[rowIndex];
                if (itemToDelete) {
                    this.state.doctor.experience.splice(rowIndex, 1);
                    // Clear editing state if we were editing this item
                    if (this.state.editingExperience === itemToDelete.id) {
                        this.state.editingExperience = null;
                    }
                }
            }
        }
    }

    editRow(target) {
        const button = target.closest('button');
        if (!button) return;
        
        const row = button.closest('tr');
        if (!row) return;
        
        // Find which item this row represents by getting the row index
        const tbody = row.parentNode;
        const rowIndex = Array.from(tbody.children).indexOf(row);
        
        // Determine if this is education or experience table
        const isEducation = row.closest('table').querySelector('th').textContent.includes('Degree');
        
        if (isEducation) {
            if (this.state.doctor.education[rowIndex]) {
                this.state.editingEducation = this.state.doctor.education[rowIndex].id;
            }
        } else {
            if (this.state.doctor.experience[rowIndex]) {
                this.state.editingExperience = this.state.doctor.experience[rowIndex].id;
            }
        }
    }

    // Helper methods for template to check editing state
    isEditingEducation(eduId) {
        return this.state.editingEducation === eduId;
    }

    isEditingExperience(expId) {
        return this.state.editingExperience === expId;
    }

    addEducationRow() {
        // Generate a new unique ID
        const newId = Math.max(...this.state.doctor.education.map(edu => edu.id), 0) + 1;
        
        // Add new education item to state
        const newEducation = {
            id: newId,
            degree: "",
            institution: "",
            period: ""
        };
        
        this.state.doctor.education.push(newEducation);
        
        // Set it to editing mode immediately
        this.state.editingEducation = newId;
    }

    addExperienceRow() {
        // Generate a new unique ID
        const newId = Math.max(...this.state.doctor.experience.map(exp => exp.id), 0) + 1;
        
        // Add new experience item to state
        const newExperience = {
            id: newId,
            position: "",
            institution: "",
            period: ""
        };
        
        this.state.doctor.experience.push(newExperience);
        
        // Set it to editing mode immediately
        this.state.editingExperience = newId;
    }

    addTimeSlot(ev) {
        const addButton = ev.target.closest('button');
        
        const newTimeSlot = document.createElement('div');
        newTimeSlot.className = 'flex items-center space-x-2';
        newTimeSlot.innerHTML = `
            <input class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100" 
                   type="time" value="09:00" />
            <span class="text-gray-500">-</span>
            <input class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100" 
                   type="time" value="17:00" />
            <button class="text-gray-400 hover:text-red-500 p-1 rounded transition-colors duration-200">
                <span class="material-icons text-base">delete</span>
            </button>
        `;
        
        // Add event listener to the dynamically created delete button
        const deleteButton = newTimeSlot.querySelector('button');
        deleteButton.addEventListener('click', (e) => this.removeTimeSlot(e));
        
        addButton.parentNode.insertBefore(newTimeSlot, addButton);
        
        newTimeSlot.style.opacity = '0';
        newTimeSlot.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            newTimeSlot.style.transition = 'all 0.3s ease';
            newTimeSlot.style.opacity = '1';
            newTimeSlot.style.transform = 'translateY(0)';
        }, 10);
    }

    removeTimeSlot(ev) {
        const button = ev.target.closest('button');
        const timeSlot = button.closest('.flex.items-center.space-x-2');
        const timeContainer = timeSlot.closest('.flex-1');
        
        const timeSlots = timeContainer.querySelectorAll('.flex.items-center.space-x-2');
        if (timeSlots.length <= 1) {
            alert('At least one time slot is required');
            return;
        }
        
        timeSlot.style.transition = 'all 0.3s ease';
        timeSlot.style.opacity = '0';
        timeSlot.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            timeSlot.remove();
        }, 300);
    }

    showTab(event, tabId) {
        event.preventDefault();
        
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.classList.remove('text-blue-600', 'border-b-2', 'border-blue-600');
            link.classList.add('text-gray-500', 'dark:text-gray-400');
        });
        
        event.target.closest('a').classList.remove('text-gray-500', 'dark:text-gray-400');
        event.target.closest('a').classList.add('text-blue-600', 'border-b-2', 'border-blue-600');
        
        const tabs = document.querySelectorAll('.tab-content');
        tabs.forEach(tab => tab.classList.add('hidden'));
        
        const selectedTab = document.getElementById(tabId);
        if (selectedTab) {
            selectedTab.classList.remove('hidden');
        }
    }

    showAddLicenseForm() {
        this.state.showAddLicenseForm = true;
    }

    hideAddLicenseForm() {
        this.state.showAddLicenseForm = false;
        const form = document.getElementById('addLicenseForm').querySelector('form');
        if (form) form.reset();
    }

    saveNewLicense() {
        const form = document.getElementById('addLicenseForm').querySelector('form');
        if (form) {
            const mockEvent = { preventDefault: () => {}, target: form };
            this.addNewLicense(mockEvent);
        }
    }

    addNewLicense(event) {
        event.preventDefault();
        
        const form = event.target;
        
        // Get form values
        const licenseType = form.querySelector('select').value;
        const licenseNumber = form.querySelector('input[type="text"][placeholder="Enter license number"]').value;
        const issueDate = form.querySelector('input[type="date"]:first-of-type').value;
        const expiryDate = form.querySelector('input[type="date"]:last-of-type').value;
        const issuingAuthority = form.querySelector('input[placeholder="Enter issuing authority"]').value;
        const status = form.querySelector('select:last-of-type').value;
        const additionalInfo = form.querySelector('textarea').value;
        
        // Validate required fields
        if (!licenseType || !licenseNumber || !issueDate || !expiryDate || !issuingAuthority || !status) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Generate new license ID
        const newId = Math.max(...this.state.doctor.licenses.map(license => license.id), 0) + 1;
        
        // Format dates for display
        const formatDate = (dateStr) => {
            const date = new Date(dateStr);
            return date.toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
        };
        
        // Create new license object
        const newLicense = {
            id: newId,
            type: licenseType,
            title: this.getLicenseTitle(licenseType),
            description: this.getLicenseDescription(licenseType),
            number: licenseNumber,
            issueDate: formatDate(issueDate),
            expiryDate: formatDate(expiryDate),
            authority: issuingAuthority,
            status: status,
            additionalInfo: additionalInfo
        };
        
        // Add specialty field for specialist certifications
        if (licenseType === 'Specialist') {
            newLicense.specialty = additionalInfo || 'General';
        }
        
        // Add to licenses array
        this.state.doctor.licenses.push(newLicense);
        
        // Show success message and hide form
        alert('License added successfully!');
        this.hideAddLicenseForm();
    }
    
    getLicenseTitle(type) {
        switch(type) {
            case 'STR': return 'Surat Tanda Registrasi (STR)';
            case 'SIP': return 'Surat Izin Praktik (SIP)';
            case 'Specialist': return 'Specialist Certification';
            default: return 'Other License/Certificate';
        }
    }
    
    getLicenseDescription(type) {
        switch(type) {
            case 'STR': return 'Medical Registration Certificate';
            case 'SIP': return 'Medical Practice License';
            case 'Specialist': return 'Specialist Certificate';
            default: return 'Other Professional License';
        }
    }

    editLicense(licenseId) {
        // Set the license ID being edited
        this.state.editingLicenseId = licenseId;
        
        // Find the license data
        const license = this.state.doctor.licenses.find(l => l.id === licenseId);
        if (!license) return;
        
        // Parse dates from display format to input format
        const parseDate = (dateStr) => {
            if (!dateStr) return '';
            const date = new Date(dateStr);
            return date.toISOString().split('T')[0];
        };
        
        // Pre-fill the form with current license data
        setTimeout(() => {
            document.getElementById(`editLicenseType-${licenseId}`).value = license.type || '';
            document.getElementById(`editLicenseNumber-${licenseId}`).value = license.number || '';
            document.getElementById(`editIssueDate-${licenseId}`).value = parseDate(license.issueDate) || '';
            document.getElementById(`editExpiryDate-${licenseId}`).value = parseDate(license.expiryDate) || '';
            document.getElementById(`editIssuingAuthority-${licenseId}`).value = license.authority || '';
            document.getElementById(`editStatus-${licenseId}`).value = license.status || '';
            document.getElementById(`editAdditionalInfo-${licenseId}`).value = license.additionalInfo || license.specialty || '';
        }, 100);
    }

    cancelEditLicense() {
        this.state.editingLicenseId = null;
    }

    updateLicense(licenseId) {
        const licenseType = document.getElementById(`editLicenseType-${licenseId}`).value;
        const licenseNumber = document.getElementById(`editLicenseNumber-${licenseId}`).value;
        const issueDate = document.getElementById(`editIssueDate-${licenseId}`).value;
        const expiryDate = document.getElementById(`editExpiryDate-${licenseId}`).value;
        const issuingAuthority = document.getElementById(`editIssuingAuthority-${licenseId}`).value;
        const status = document.getElementById(`editStatus-${licenseId}`).value;
        const additionalInfo = document.getElementById(`editAdditionalInfo-${licenseId}`).value;
        
        // Validate required fields
        if (!licenseType || !licenseNumber || !issueDate || !expiryDate || !issuingAuthority || !status) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Find the license to update
        const licenseIndex = this.state.doctor.licenses.findIndex(l => l.id === licenseId);
        if (licenseIndex === -1) return;
        
        // Format dates for display
        const formatDate = (dateStr) => {
            const date = new Date(dateStr);
            return date.toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
        };
        
        // Update the license object
        const updatedLicense = {
            ...this.state.doctor.licenses[licenseIndex],
            type: licenseType,
            title: this.getLicenseTitle(licenseType),
            description: this.getLicenseDescription(licenseType),
            number: licenseNumber,
            issueDate: formatDate(issueDate),
            expiryDate: formatDate(expiryDate),
            authority: issuingAuthority,
            status: status,
            additionalInfo: additionalInfo
        };
        
        // Add specialty field for specialist certifications
        if (licenseType === 'Specialist') {
            updatedLicense.specialty = additionalInfo || 'General';
        }
        
        // Update the license in the array
        this.state.doctor.licenses[licenseIndex] = updatedLicense;
        
        // Show success message and hide form
        alert('License updated successfully!');
        this.cancelEditLicense();
    }

    saveLicense(button) {
        const licenseCard = button.closest('.bg-gray-50');
        const inputs = licenseCard.querySelectorAll('input');
        
        inputs.forEach(input => {
            const p = document.createElement('p');
            p.className = 'text-gray-800 dark:text-gray-100 font-medium';
            p.textContent = input.value;
            input.parentNode.replaceChild(p, input);
        });
        
        const actionContainer = button.closest('.flex.items-center.space-x-2');
        actionContainer.innerHTML = '<button class="text-gray-500 hover:text-blue-600 edit-license-btn"><span class="material-icons text-base">edit</span></button><button class="text-gray-500 hover:text-red-600 delete-license-btn"><span class="material-icons text-base">delete</span></button>';
        
        // Add event listeners to the new buttons
        const editBtn = actionContainer.querySelector('.edit-license-btn');
        const deleteBtn = actionContainer.querySelector('.delete-license-btn');
        
        editBtn.addEventListener('click', (ev) => this.editLicense(ev.target));
        deleteBtn.addEventListener('click', (ev) => this.deleteLicense(ev.target));
        
        alert('License updated successfully!');
    }

    cancelEditLicense() {
        location.reload();
    }

    deleteLicense(button) {
        if (confirm('Are you sure you want to delete this license?')) {
            button.closest('.bg-gray-50').remove();
        }
    }

    // Additional utility functions for data management
    generateDataCard(data) {
        const statusClass = this.getStatusClass(data.status);
        const statusColor = this.getStatusColor(data.status);

        return `
            <div class="p-4 border border-gray-200 dark:border-gray-400 rounded-lg shadow-lg dark:shadow-gray-600/50 hover:shadow-xl dark:hover:shadow-gray-500/50 transition-shadow duration-200 grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                <div class="flex items-center space-x-4 col-span-1 md:col-span-2">
                    <input type="checkbox" class="data-checkbox w-4 h-4 text-custom-blue bg-gray-100 border-gray-300 rounded focus:ring-custom-blue dark:focus:ring-custom-blue dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" data-id="${data.id}" />
                    <img alt="${data.name}" class="w-12 h-12 rounded-full" src="${data.image}" />
                    <div>
                        <p class="font-bold text-gray-800 dark:text-gray-100">${data.name}</p>
                        <p class="text-sm text-gray-500 dark:text-gray-400">${data.specialty}</p>
                    </div>
                </div>
                <div class="col-span-1">
                    <p class="text-gray-500 dark:text-gray-400 text-sm">Contact</p>
                    <p class="font-semibold text-gray-800 dark:text-gray-100">${data.phone}</p>
                </div>
                <div class="col-span-1">
                    <p class="text-gray-500 dark:text-gray-400 text-sm">Category</p>
                    <p class="font-semibold text-gray-800 dark:text-gray-100">${data.gender}</p>
                </div>
                <div class="col-span-1">
                    <span class="${statusClass} text-xs font-semibold px-3 py-1.5 rounded-full inline-flex items-center">
                        <span class="w-2 h-2 ${statusColor} rounded-full mr-2"></span> ${data.status}
                    </span>
                </div>
                <div class="flex items-center justify-end space-x-2 col-span-1">
                    <button class="btn-standard rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-200 hover:text-custom-blue w-10" onclick="this.viewDoctor('${data.id}')">
                        <span class="material-icons">visibility</span>
                    </button>
                    <button class="btn-standard rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-200 hover:text-custom-blue w-10" onclick="this.editDoctor('${data.id}')">
                        <span class="material-icons">edit</span>
                    </button>
                    <div class="relative">
                        <button onclick="this.toggleDropdown(this)" class="btn-standard rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-200 w-10 transition-colors duration-300">
                            <span class="material-icons">more_vert</span>
                        </button>
                        <div class="dropdown-menu absolute hidden right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-600 transition-colors duration-300">
                            <a class="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 h-10 transition-colors duration-200" href="#" onclick="this.printDoctor('${data.id}')">
                                <span class="material-icons text-gray-500 dark:text-gray-400 mr-3 text-base">print</span>Print
                            </a>
                            <a class="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 h-10 transition-colors duration-200" href="#" onclick="this.exportDoctor('${data.id}')">
                                <span class="material-icons text-gray-500 dark:text-gray-400 mr-3 text-base">file_download</span>Export
                            </a>
                            <a class="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 h-10 transition-colors duration-200" href="#" onclick="this.archiveDoctor('${data.id}')">
                                <span class="material-icons text-gray-500 dark:text-gray-400 mr-3 text-base">archive</span>Archive
                            </a>
                            <hr class="border-gray-200 dark:border-gray-600 my-1">
                            <a class="flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 h-10 transition-colors duration-200" href="#" onclick="this.deleteDoctor('${data.id}')">
                                <span class="material-icons text-red-500 dark:text-red-400 mr-3 text-base">delete_outline</span>Delete
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Data action functions
    viewDoctor(doctorId) {
        console.log('Viewing doctor:', doctorId);
        // Implement view logic
    }

    editDoctor(doctorId) {
        console.log('Editing doctor:', doctorId);
        // Implement edit logic
    }

    printDoctor(doctorId) {
        console.log('Printing doctor:', doctorId);
        // Implement print logic
    }

    exportDoctor(doctorId) {
        console.log('Exporting doctor:', doctorId);
        // Implement export logic
    }

    archiveDoctor(doctorId) {
        console.log('Archiving doctor:', doctorId);
        if (confirm('Are you sure you want to archive this doctor?')) {
            // Implement archive logic
        }
    }

    deleteDoctor(doctorId) {
        console.log('Deleting doctor:', doctorId);
        if (confirm('Are you sure you want to delete this doctor? This action cannot be undone.')) {
            // Implement delete logic
        }
    }

    // Checkbox selection functions
    toggleSelectAll() {
        const selectAllCheckbox = document.getElementById('selectAllCheckbox');
        const dataCheckboxes = document.querySelectorAll('.data-checkbox');
        
        if (selectAllCheckbox && selectAllCheckbox.checked) {
            dataCheckboxes.forEach(checkbox => {
                checkbox.checked = true;
            });
        } else {
            dataCheckboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
        }
        
        this.updateSelectAllState();
    }

    updateSelectAllState() {
        const selectAllCheckbox = document.getElementById('selectAllCheckbox');
        const dataCheckboxes = document.querySelectorAll('.data-checkbox');
        const checkedBoxes = document.querySelectorAll('.data-checkbox:checked');
        
        if (!selectAllCheckbox) return;

        if (checkedBoxes.length === 0) {
            selectAllCheckbox.checked = false;
            selectAllCheckbox.indeterminate = false;
        } else if (checkedBoxes.length === dataCheckboxes.length) {
            selectAllCheckbox.checked = true;
            selectAllCheckbox.indeterminate = false;
        } else {
            selectAllCheckbox.checked = false;
            selectAllCheckbox.indeterminate = true;
        }
    }

    getSelectedItems() {
        const checkedBoxes = document.querySelectorAll('.data-checkbox:checked');
        return Array.from(checkedBoxes).map(checkbox => {
            return parseInt(checkbox.getAttribute('data-id'));
        });
    }

    clearAllSelections() {
        const selectAllCheckbox = document.getElementById('selectAllCheckbox');
        const dataCheckboxes = document.querySelectorAll('.data-checkbox');
        
        if (selectAllCheckbox) {
            selectAllCheckbox.checked = false;
            selectAllCheckbox.indeterminate = false;
        }
        
        dataCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
    }

    // Navigation and utility functions
    scrollToTopOfCards() {
        const container = document.querySelector('.data-list-container');
        if (container) {
            container.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }

    isContainerScrollable() {
        const container = document.querySelector('.data-list-container');
        if (container) {
            return container.scrollHeight > container.clientHeight;
        }
        return false;
    }
}
