/** @odoo-module **/

import { Component, useState } from "@odoo/owl";

export class Assessment extends Component {
    static template = "healthnusa.Assessment";
    static props = {
        router: { type: Object, optional: false },
        selectApp: { type: Function, optional: false }
    };

    setup() {
        this.router = this.props.router;
        
        // Sample assessment data
        this.assessmentData = [
            {
                id: 1,
                patient_name: "John Anderson",
                patient_id: "MRN001",
                assessment_date: "2024-01-15",
                assessment_time: "10:30",
                doctor: "Dr. Sarah Johnson",
                chief_complaint: "Chest pain and shortness of breath",
                diagnosis: "Hypertension",
                status: "Completed",
                priority: "High"
            },
            {
                id: 2,
                patient_name: "Sarah Johnson",
                patient_id: "MRN002",
                assessment_date: "2024-01-15",
                assessment_time: "11:00",
                doctor: "Dr. Michael Chen",
                chief_complaint: "Headache and dizziness",
                diagnosis: "Migraine",
                status: "Completed",
                priority: "Medium"
            },
            {
                id: 3,
                patient_name: "Michael Chen",
                patient_id: "MRN003",
                assessment_date: "2024-01-15",
                assessment_time: "14:15",
                doctor: "Dr. Emily Davis",
                chief_complaint: "Abdominal pain",
                diagnosis: "Under Investigation",
                status: "In Progress",
                priority: "High"
            },
            {
                id: 4,
                patient_name: "Emily Davis",
                patient_id: "MRN004",
                assessment_date: "2024-01-14",
                assessment_time: "09:45",
                doctor: "Dr. Robert Wilson",
                chief_complaint: "Back pain",
                diagnosis: "Lumbar Strain",
                status: "Completed",
                priority: "Low"
            },
            {
                id: 5,
                patient_name: "Robert Wilson",
                patient_id: "MRN005",
                assessment_date: "2024-01-14",
                assessment_time: "15:30",
                doctor: "Dr. Maria Rodriguez",
                chief_complaint: "Fever and cough",
                diagnosis: "Upper Respiratory Infection",
                status: "Completed",
                priority: "Medium"
            },
            {
                id: 6,
                patient_name: "Maria Rodriguez",
                patient_id: "MRN006",
                assessment_date: "2024-01-14",
                assessment_time: "16:00",
                doctor: "Dr. James Brown",
                chief_complaint: "Skin rash",
                diagnosis: "Allergic Dermatitis",
                status: "Completed",
                priority: "Low"
            },
            {
                id: 7,
                patient_name: "James Brown",
                patient_id: "MRN007",
                assessment_date: "2024-01-13",
                assessment_time: "08:30",
                doctor: "Dr. Lisa Thompson",
                chief_complaint: "Joint pain",
                diagnosis: "Arthritis",
                status: "Completed",
                priority: "Medium"
            },
            {
                id: 8,
                patient_name: "Lisa Thompson",
                patient_id: "MRN008",
                assessment_date: "2024-01-13",
                assessment_time: "13:45",
                doctor: "Dr. Ahmed Hassan",
                chief_complaint: "Nausea and vomiting",
                diagnosis: "Gastroenteritis",
                status: "Completed",
                priority: "High"
            },
            {
                id: 9,
                patient_name: "Ahmed Hassan",
                patient_id: "MRN009",
                assessment_date: "2024-01-12",
                assessment_time: "10:00",
                doctor: "Dr. Anna Martinez",
                chief_complaint: "Fatigue and weakness",
                diagnosis: "Anemia",
                status: "Completed",
                priority: "Medium"
            },
            {
                id: 10,
                patient_name: "Anna Martinez",
                patient_id: "MRN010",
                assessment_date: "2024-01-12",
                assessment_time: "11:30",
                doctor: "Dr. David Kumar",
                chief_complaint: "Eye irritation",
                diagnosis: "Conjunctivitis",
                status: "Completed",
                priority: "Low"
            }
        ];

        // Initialize state after data is defined
        this.state = useState({
            currentSearchTerm: "",
            currentSearchField: "all",
            currentPage: 1,
            itemsPerPage: 10,
            sortField: "",
            sortDirection: "asc",
            filteredItems: this.assessmentData,
        });
    }

    addNewAssessment() {
        this.router.navigate('/assessment/new');
    }

    // Navigation button styling methods
    getPrevButtonClass() {
        if (this.state.currentPage === 1) {
            return 'bg-white dark:bg-gray-700 cursor-not-allowed opacity-50';
        } else {
            return 'bg-white dark:bg-gray-700 shadow hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer';
        }
    }

    getNextButtonClass() {
        if (this.state.currentPage === this.totalPages || this.totalPages === 0) {
            return 'bg-white dark:bg-gray-700 cursor-not-allowed opacity-50';
        } else {
            return 'bg-white dark:bg-gray-700 shadow hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer';
        }
    }

    getPrevIconClass() {
        if (this.state.currentPage === 1) {
            return 'material-icons text-gray-400 dark:text-gray-500';
        } else {
            return 'material-icons text-custom-blue';
        }
    }

    getNextIconClass() {
        if (this.state.currentPage === this.totalPages || this.totalPages === 0) {
            return 'material-icons text-gray-400 dark:text-gray-500';
        } else {
            return 'material-icons text-custom-blue';
        }
    }

    // Computed properties for template
    get currentPageData() {
        if (!this.state.filteredItems) {
            return [];
        }
        const startIndex = (this.state.currentPage - 1) * this.state.itemsPerPage;
        const endIndex = startIndex + this.state.itemsPerPage;
        return this.state.filteredItems.slice(startIndex, endIndex);
    }

    get totalPages() {
        if (!this.state.filteredItems) {
            return 0;
        }
        return Math.ceil(this.state.filteredItems.length / this.state.itemsPerPage);
    }

    get paginationInfo() {
        if (!this.state.filteredItems) {
            return '0 of 0';
        }
        const total = this.state.filteredItems.length;
        const start = (this.state.currentPage - 1) * this.state.itemsPerPage + 1;
        const end = Math.min(start + this.state.itemsPerPage - 1, total);
        return total > 0 ? `${start}-${end} of ${total}` : '0 of 0';
    }

    get paginationButtons() {
        const buttons = [];
        const current = this.state.currentPage;
        const total = this.totalPages;

        // Previous button
        buttons.push({
            type: 'prev',
            text: 'Previous',
            disabled: current === 1
        });

        // Page number buttons
        for (let i = 1; i <= total; i++) {
            buttons.push({
                type: 'page',
                text: i.toString(),
                page: i,
                active: i === current
            });
        }

        // Next button
        buttons.push({
            type: 'next',
            text: 'Next',
            disabled: current === total || total === 0
        });

        return buttons;
    }

    // Navigation methods
    prevPage() {
        if (this.state.currentPage > 1) {
            this.state.currentPage--;
        }
    }

    nextPage() {
        if (this.state.currentPage < this.totalPages) {
            this.state.currentPage++;
        }
    }

    goToPage(page) {
        this.state.currentPage = page;
    }

    // Search and filter methods
    onSearchInput(event) {
        this.state.currentSearchTerm = event.target.value;
        this.applyFilters();
    }

    onSearchFieldChange(event) {
        this.state.currentSearchField = event.target.value;
        this.applyFilters();
    }

    clearSearch() {
        this.state.currentSearchTerm = "";
        this.applyFilters();
    }

    toggleSearchFilter() {
        const filterMenu = document.querySelector('.search-filter-menu');
        if (filterMenu) {
            filterMenu.classList.toggle('hidden');
        }
    }

    applyFilters() {
        let filtered = this.assessmentData;

        if (this.state.currentSearchTerm) {
            const searchTerm = this.state.currentSearchTerm.toLowerCase();
            filtered = filtered.filter(assessment => {
                if (this.state.currentSearchField === 'all') {
                    return (
                        assessment.patient_name.toLowerCase().includes(searchTerm) ||
                        assessment.patient_id.toLowerCase().includes(searchTerm) ||
                        assessment.doctor.toLowerCase().includes(searchTerm) ||
                        assessment.chief_complaint.toLowerCase().includes(searchTerm) ||
                        assessment.diagnosis.toLowerCase().includes(searchTerm) ||
                        assessment.status.toLowerCase().includes(searchTerm) ||
                        assessment.priority.toLowerCase().includes(searchTerm)
                    );
                } else {
                    const fieldValue = assessment[this.state.currentSearchField];
                    return fieldValue.toString().toLowerCase().includes(searchTerm);
                }
            });
        }

        this.state.filteredItems = filtered;
        this.state.currentPage = 1; // Reset to first page
    }

    // Sorting methods
    sortData(field) {
        if (this.state.sortField === field) {
            this.state.sortDirection = this.state.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.state.sortField = field;
            this.state.sortDirection = 'asc';
        }

        this.state.filteredItems.sort((a, b) => {
            let aVal = a[field];
            let bVal = b[field];

            // String sorting
            aVal = aVal.toString();
            bVal = bVal.toString();

            if (this.state.sortDirection === 'asc') {
                return aVal.localeCompare(bVal);
            } else {
                return bVal.localeCompare(aVal);
            }
        });
    }

    // Style helper methods
    getStatusClass(status) {
        const baseClasses = "text-xs font-semibold px-3 py-1.5 rounded-full inline-flex items-center";
        switch (status) {
            case 'Completed':
                return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300`;
            case 'In Progress':
                return `${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300`;
            case 'Pending':
                return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300`;
            case 'Cancelled':
                return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300`;
            default:
                return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300`;
        }
    }

    getPriorityClass(priority) {
        const baseClasses = "text-xs font-semibold px-3 py-1.5 rounded-full inline-flex items-center";
        switch (priority) {
            case 'High':
                return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300`;
            case 'Medium':
                return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300`;
            case 'Low':
                return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300`;
            default:
                return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300`;
        }
    }

    getPaginationButtonClass(button) {
        const baseClasses = "border-gray-300 dark:border-gray-600";
        if (button.type === 'page' && button.active) {
            return `${baseClasses} bg-custom-blue text-white border-custom-blue`;
        } else if (button.disabled) {
            return `${baseClasses} bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed`;
        } else {
            return `${baseClasses} bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600`;
        }
    }

    // Helper methods
    getSortIcon(field) {
        if (this.state.sortField !== field) {
            return 'unfold_more';
        }
        return this.state.sortDirection === 'asc' ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
    }

    toggleActionMenu(event) {
        // Close all other dropdowns first
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            menu.classList.add('hidden');
        });
        
        // Find the dropdown menu relative to the clicked button
        const button = event.currentTarget;
        const dropdown = button.nextElementSibling;
        if (dropdown && dropdown.classList.contains('dropdown-menu')) {
            dropdown.classList.toggle('hidden');
        }
    }

    viewAssessment() {
        this.props.selectApp('assessment-detail');
    }
    
    editAssessment() {
        this.props.selectApp('assessment-edit');
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    formatTime(timeString) {
        return timeString;
    }
}