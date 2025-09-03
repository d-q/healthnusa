/** @odoo-module **/

import { Component, useState } from "@odoo/owl";

export class Treatments extends Component {
    static template = "healthnusa.Treatments";
    static props = {
        router: { type: Object, optional: false },
        selectApp: { type: Function, optional: false }
    };

    setup() {
        this.router = this.props.router;
        this.state = useState({
            currentSearchTerm: "",
            currentSearchField: "all",
            currentPage: 1,
            itemsPerPage: 10,
            sortField: "",
            sortDirection: "asc",
            filteredItems: [],
        })

        // Sample treatment data
        this.treatmentsData = [
            {
                id: 1,
                treatment_number: "TRT-2024-001",
                patient_name: "John Anderson",
                patient_id: "MRN001",
                cost: 1250.00,
                status: "Completed",
                treatment_type: "Consultation",
                date: "2024-01-15",
                description: "General Medical Consultation",
                doctor: "Dr. John Smith",
                duration: "30 minutes"
            },
            {
                id: 2,
                treatment_number: "TRT-2024-002",
                patient_name: "Sarah Johnson",
                patient_id: "MRN002",
                cost: 875.50,
                status: "In Progress",
                treatment_type: "Diagnostic",
                date: "2024-01-16",
                description: "Blood Test and X-Ray",
                doctor: "Dr. Maria Rodriguez",
                duration: "45 minutes"
            },
            {
                id: 3,
                treatment_number: "TRT-2024-003",
                patient_name: "Michael Chen",
                patient_id: "MRN003",
                cost: 2100.75,
                status: "Scheduled",
                treatment_type: "Surgery",
                date: "2024-01-12",
                description: "Minor Surgical Procedure",
                doctor: "Dr. Michael Lee",
                duration: "2 hours"
            },
            {
                id: 4,
                treatment_number: "TRT-2024-004",
                patient_name: "Emily Davis",
                patient_id: "MRN004",
                cost: 650.00,
                status: "Completed",
                treatment_type: "Dental",
                date: "2024-01-18",
                description: "Dental Cleaning and Check-up",
                doctor: "Dr. Lisa Park",
                duration: "1 hour"
            },
            {
                id: 5,
                treatment_number: "TRT-2024-005",
                patient_name: "Robert Wilson",
                patient_id: "MRN005",
                cost: 1800.25,
                status: "In Progress",
                treatment_type: "Imaging",
                date: "2024-01-20",
                description: "CT Scan and MRI",
                doctor: "Dr. James Wilson",
                duration: "90 minutes"
            },
            {
                id: 6,
                treatment_number: "TRT-2024-006",
                patient_name: "Maria Rodriguez",
                patient_id: "MRN006",
                cost: 425.00,
                status: "Completed",
                treatment_type: "Prevention",
                date: "2024-01-14",
                description: "Annual Health Screening",
                doctor: "Dr. Emily White",
                duration: "45 minutes"
            },
            {
                id: 7,
                treatment_number: "TRT-2024-007",
                patient_name: "James Brown",
                patient_id: "MRN007",
                cost: 950.00,
                status: "Cancelled",
                treatment_type: "Diagnostic",
                date: "2024-01-13",
                description: "Diagnostic Testing",
                doctor: "Dr. Robert Chen",
                duration: "60 minutes"
            },
            {
                id: 8,
                treatment_number: "TRT-2024-008",
                patient_name: "Lisa Thompson",
                patient_id: "MRN008",
                cost: 1350.00,
                status: "Completed",
                treatment_type: "Laboratory",
                date: "2024-01-17",
                description: "Lab Work and Analysis",
                doctor: "Dr. Sarah Johnson",
                duration: "30 minutes"
            },
            {
                id: 9,
                treatment_number: "TRT-2024-009",
                patient_name: "Ahmed Hassan",
                patient_id: "MRN009",
                cost: 775.50,
                status: "Scheduled",
                treatment_type: "Cardiology",
                date: "2024-01-21",
                description: "Cardiac Examination",
                doctor: "Dr. John Smith",
                duration: "45 minutes"
            },
            {
                id: 10,
                treatment_number: "TRT-2024-010",
                patient_name: "Anna Martinez",
                patient_id: "MRN010",
                cost: 2250.00,
                status: "In Progress",
                treatment_type: "Emergency",
                date: "2024-01-19",
                description: "Emergency Treatment",
                doctor: "Dr. Maria Rodriguez",
                duration: "3 hours"
            },
            {
                id: 11,
                treatment_number: "TRT-2024-011",
                patient_name: "David Kumar",
                patient_id: "MRN011",
                cost: 325.00,
                status: "Completed",
                treatment_type: "Consultation",
                date: "2024-01-22",
                description: "Follow-up Consultation",
                doctor: "Dr. Emily White",
                duration: "20 minutes"
            },
            {
                id: 12,
                treatment_number: "TRT-2024-012",
                patient_name: "Rachel Green",
                patient_id: "MRN012",
                cost: 1650.00,
                status: "In Progress",
                treatment_type: "Dermatology",
                date: "2024-01-23",
                description: "Skin Treatment",
                doctor: "Dr. Lisa Park",
                duration: "75 minutes"
            },
            {
                id: 13,
                treatment_number: "TRT-2024-013",
                patient_name: "Thomas Anderson",
                patient_id: "MRN013",
                cost: 890.00,
                status: "Completed",
                treatment_type: "Orthopedic",
                date: "2024-01-24",
                description: "Orthopedic Assessment",
                doctor: "Dr. Robert Chen",
                duration: "50 minutes"
            },
            {
                id: 14,
                treatment_number: "TRT-2024-014",
                patient_name: "Jennifer Wilson",
                patient_id: "MRN014",
                cost: 1150.00,
                status: "Scheduled",
                treatment_type: "Gynecology",
                date: "2024-01-25",
                description: "Gynecological Exam",
                doctor: "Dr. Sarah Johnson",
                duration: "40 minutes"
            }
        ];

        // Initialize filtered items
        this.state.filteredItems = this.treatmentsData;
    }

    addNewTreatment() {
        this.props.selectApp('treatment-new');
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
        const startIndex = (this.state.currentPage - 1) * this.state.itemsPerPage;
        const endIndex = startIndex + this.state.itemsPerPage;
        return this.state.filteredItems.slice(startIndex, endIndex);
    }

    get totalPages() {
        return Math.ceil(this.state.filteredItems.length / this.state.itemsPerPage);
    }

    get paginationInfo() {
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
        let filtered = this.treatmentsData;

        if (this.state.currentSearchTerm) {
            const searchTerm = this.state.currentSearchTerm.toLowerCase();
            filtered = filtered.filter(treatment => {
                if (this.state.currentSearchField === 'all') {
                    return (
                        treatment.treatment_number.toLowerCase().includes(searchTerm) ||
                        treatment.patient_name.toLowerCase().includes(searchTerm) ||
                        treatment.patient_id.toLowerCase().includes(searchTerm) ||
                        treatment.status.toLowerCase().includes(searchTerm) ||
                        treatment.treatment_type.toLowerCase().includes(searchTerm) ||
                        treatment.cost.toString().includes(searchTerm) ||
                        treatment.doctor.toLowerCase().includes(searchTerm)
                    );
                } else {
                    return treatment[this.state.currentSearchField].toString().toLowerCase().includes(searchTerm);
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

            // Handle numeric sorting for cost
            if (field === 'cost') {
                aVal = parseFloat(aVal);
                bVal = parseFloat(bVal);
                return this.state.sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
            }

            // String sorting for other fields
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
                return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300`;
            case 'Scheduled':
                return `${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300`;
            case 'Cancelled':
                return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300`;
            case 'On Hold':
                return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300`;
            default:
                return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300`;
        }
    }

    getStatusColor(status) {
        switch (status) {
            case 'Completed':
                return 'bg-green-500';
            case 'In Progress':
                return 'bg-yellow-500';
            case 'Scheduled':
                return 'bg-blue-500';
            case 'Cancelled':
                return 'bg-red-500';
            case 'On Hold':
                return 'bg-gray-500';
            default:
                return 'bg-gray-500';
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

    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
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

    viewTreatment(treatmentId) {
        this.props.selectApp('treatment-detail');
    }
    
    editTreatment(treatmentId) {
        this.props.selectApp('treatment-edit');
    }

    printTreatment(treatmentId) {
        console.log('Printing treatment:', treatmentId);
    }

    downloadTreatment(treatmentId) {
        console.log('Downloading treatment:', treatmentId);
    }
}
