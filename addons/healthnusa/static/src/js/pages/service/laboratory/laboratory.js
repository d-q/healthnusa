/** @odoo-module **/

import { Component, useState } from "@odoo/owl";

export class Laboratories extends Component {
    static template = "healthnusa.Laboratories";
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

        // Sample laboratory data
        this.laboratoriesData = [
            {
                id: 1,
                lab_number: "LAB-2024-001",
                patient_name: "John Anderson",
                patient_id: "MRN001",
                cost: 180.00,
                status: "Completed",
                test_type: "Blood Test",
                test_date: "2024-01-15",
                description: "Complete Blood Count",
                technician: "Lab Tech. Sarah Wilson",
                collection_date: "2024-01-15",
                result_date: "2024-01-16",
                specimen_type: "Blood",
                priority: "Routine"
            },
            {
                id: 2,
                lab_number: "LAB-2024-002",
                patient_name: "Sarah Johnson",
                patient_id: "MRN002",
                cost: 245.50,
                status: "In Progress",
                test_type: "Urine Analysis",
                test_date: "2024-01-16",
                description: "Complete Urine Analysis with Microscopy",
                technician: "Lab Tech. Michael Chen",
                collection_date: "2024-01-16",
                result_date: null,
                specimen_type: "Urine",
                priority: "Routine"
            },
            {
                id: 3,
                lab_number: "LAB-2024-003",
                patient_name: "Michael Chen",
                patient_id: "MRN003",
                cost: 320.75,
                status: "Sample Collected",
                test_type: "Lipid Profile",
                test_date: "2024-01-12",
                description: "Cholesterol and Triglycerides Test",
                technician: "Lab Tech. Emily Davis",
                collection_date: "2024-01-12",
                result_date: null,
                specimen_type: "Blood",
                priority: "Routine"
            },
            {
                id: 4,
                lab_number: "LAB-2024-004",
                patient_name: "Emily Davis",
                patient_id: "MRN004",
                cost: 150.00,
                status: "Completed",
                test_type: "Glucose Test",
                test_date: "2024-01-18",
                description: "Fasting Blood Glucose",
                technician: "Lab Tech. Robert Wilson",
                collection_date: "2024-01-18",
                result_date: "2024-01-18",
                specimen_type: "Blood",
                priority: "Routine"
            },
            {
                id: 5,
                lab_number: "LAB-2024-005",
                patient_name: "Robert Wilson",
                patient_id: "MRN005",
                cost: 425.25,
                status: "In Progress",
                test_type: "Liver Function",
                test_date: "2024-01-20",
                description: "Comprehensive Liver Function Panel",
                technician: "Lab Tech. Lisa Park",
                collection_date: "2024-01-20",
                result_date: null,
                specimen_type: "Blood",
                priority: "Stat"
            },
            {
                id: 6,
                lab_number: "LAB-2024-006",
                patient_name: "Maria Rodriguez",
                patient_id: "MRN006",
                cost: 95.00,
                status: "Completed",
                test_type: "Thyroid Panel",
                test_date: "2024-01-14",
                description: "TSH, T3, T4 Levels",
                technician: "Lab Tech. James Brown",
                collection_date: "2024-01-14",
                result_date: "2024-01-15",
                specimen_type: "Blood",
                priority: "Routine"
            },
            {
                id: 7,
                lab_number: "LAB-2024-007",
                patient_name: "James Brown",
                patient_id: "MRN007",
                cost: 275.00,
                status: "Cancelled",
                test_type: "Culture Test",
                test_date: "2024-01-13",
                description: "Bacterial Culture and Sensitivity",
                technician: "Lab Tech. Anna Martinez",
                collection_date: null,
                result_date: null,
                specimen_type: "Throat Swab",
                priority: "Routine"
            },
            {
                id: 8,
                lab_number: "LAB-2024-008",
                patient_name: "Lisa Thompson",
                patient_id: "MRN008",
                cost: 380.00,
                status: "Completed",
                test_type: "Cardiac Markers",
                test_date: "2024-01-17",
                description: "Troponin, CK-MB, Myoglobin",
                technician: "Lab Tech. David Kumar",
                collection_date: "2024-01-17",
                result_date: "2024-01-17",
                specimen_type: "Blood",
                priority: "Stat"
            },
            {
                id: 9,
                lab_number: "LAB-2024-009",
                patient_name: "Ahmed Hassan",
                patient_id: "MRN009",
                cost: 220.50,
                status: "Sample Collected",
                test_type: "Kidney Function",
                test_date: "2024-01-21",
                description: "BUN, Creatinine, eGFR",
                technician: "Lab Tech. Rachel Green",
                collection_date: "2024-01-21",
                result_date: null,
                specimen_type: "Blood",
                priority: "Routine"
            },
            {
                id: 10,
                lab_number: "LAB-2024-010",
                patient_name: "Anna Martinez",
                patient_id: "MRN010",
                cost: 495.00,
                status: "In Progress",
                test_type: "Comprehensive Panel",
                test_date: "2024-01-19",
                description: "Complete Metabolic Panel",
                technician: "Lab Tech. Thomas Anderson",
                collection_date: "2024-01-19",
                result_date: null,
                specimen_type: "Blood",
                priority: "Routine"
            },
            {
                id: 11,
                lab_number: "LAB-2024-011",
                patient_name: "David Kumar",
                patient_id: "MRN011",
                cost: 135.00,
                status: "Completed",
                test_type: "Hemoglobin A1C",
                test_date: "2024-01-22",
                description: "Diabetes Monitoring Test",
                technician: "Lab Tech. Jennifer Wilson",
                collection_date: "2024-01-22",
                result_date: "2024-01-22",
                specimen_type: "Blood",
                priority: "Routine"
            },
            {
                id: 12,
                lab_number: "LAB-2024-012",
                patient_name: "Rachel Green",
                patient_id: "MRN012",
                cost: 290.00,
                status: "In Progress",
                test_type: "Hormone Panel",
                test_date: "2024-01-23",
                description: "Female Hormone Analysis",
                technician: "Lab Tech. Sarah Wilson",
                collection_date: "2024-01-23",
                result_date: null,
                specimen_type: "Blood",
                priority: "Routine"
            },
            {
                id: 13,
                lab_number: "LAB-2024-013",
                patient_name: "Thomas Anderson",
                patient_id: "MRN013",
                cost: 165.00,
                status: "Completed",
                test_type: "Coagulation Studies",
                test_date: "2024-01-24",
                description: "PT/INR, PTT, Fibrinogen",
                technician: "Lab Tech. Michael Chen",
                collection_date: "2024-01-24",
                result_date: "2024-01-24",
                specimen_type: "Blood",
                priority: "Routine"
            },
            {
                id: 14,
                lab_number: "LAB-2024-014",
                patient_name: "Jennifer Wilson",
                patient_id: "MRN014",
                cost: 340.00,
                status: "Sample Collected",
                test_type: "Tumor Markers",
                test_date: "2024-01-25",
                description: "PSA, CEA, CA-125 Levels",
                technician: "Lab Tech. Emily Davis",
                collection_date: "2024-01-25",
                result_date: null,
                specimen_type: "Blood",
                priority: "Stat"
            }
        ];

        // Initialize filtered items
        this.state.filteredItems = this.laboratoriesData;
    }

    addNewLaboratory() {
        this.props.selectApp('laboratory-new');
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
        let filtered = this.laboratoriesData;

        if (this.state.currentSearchTerm) {
            const searchTerm = this.state.currentSearchTerm.toLowerCase();
            filtered = filtered.filter(laboratory => {
                if (this.state.currentSearchField === 'all') {
                    return (
                        laboratory.lab_number.toLowerCase().includes(searchTerm) ||
                        laboratory.patient_name.toLowerCase().includes(searchTerm) ||
                        laboratory.patient_id.toLowerCase().includes(searchTerm) ||
                        laboratory.status.toLowerCase().includes(searchTerm) ||
                        laboratory.test_type.toLowerCase().includes(searchTerm) ||
                        laboratory.cost.toString().includes(searchTerm) ||
                        laboratory.technician.toLowerCase().includes(searchTerm)
                    );
                } else {
                    return laboratory[this.state.currentSearchField].toString().toLowerCase().includes(searchTerm);
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
            case 'Sample Collected':
                return `${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300`;
            case 'Cancelled':
                return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300`;
            case 'Pending':
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
            case 'Sample Collected':
                return 'bg-blue-500';
            case 'Cancelled':
                return 'bg-red-500';
            case 'Pending':
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

    viewLaboratory(laboratoryId) {
        this.props.selectApp('laboratory-detail');
    }
    
    editLaboratory(laboratoryId) {
        this.props.selectApp('laboratory-edit');
    }

    printLaboratory(laboratoryId) {
        console.log('Printing laboratory test:', laboratoryId);
    }

    downloadLaboratory(laboratoryId) {
        console.log('Downloading laboratory test:', laboratoryId);
    }
}