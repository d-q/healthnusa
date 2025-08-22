/** @odoo-module **/

import { Component, useState } from "@odoo/owl";

export class Bills extends Component {
    static template = "healthnusa.Bills";
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

        // Sample bill data
        this.billsData = [
            {
                id: 1,
                bill_number: "BILL-2024-001",
                patient_name: "John Anderson",
                patient_id: "MRN001",
                amount: 1250.00,
                status: "Paid",
                category: "Consultation",
                date: "2024-01-15",
                description: "General Medical Consultation"
            },
            {
                id: 2,
                bill_number: "BILL-2024-002",
                patient_name: "Sarah Johnson",
                patient_id: "MRN002",
                amount: 875.50,
                status: "Pending",
                category: "Diagnostic",
                date: "2024-01-16",
                description: "Blood Test and X-Ray"
            },
            {
                id: 3,
                bill_number: "BILL-2024-003",
                patient_name: "Michael Chen",
                patient_id: "MRN003",
                amount: 2100.75,
                status: "Overdue",
                category: "Surgery",
                date: "2024-01-12",
                description: "Minor Surgical Procedure"
            },
            {
                id: 4,
                bill_number: "BILL-2024-004",
                patient_name: "Emily Davis",
                patient_id: "MRN004",
                amount: 650.00,
                status: "Paid",
                category: "Dental",
                date: "2024-01-18",
                description: "Dental Cleaning and Check-up"
            },
            {
                id: 5,
                bill_number: "BILL-2024-005",
                patient_name: "Robert Wilson",
                patient_id: "MRN005",
                amount: 1800.25,
                status: "Pending",
                category: "Diagnostic",
                date: "2024-01-20",
                description: "CT Scan and MRI"
            },
            {
                id: 6,
                bill_number: "BILL-2024-006",
                patient_name: "Maria Rodriguez",
                patient_id: "MRN006",
                amount: 425.00,
                status: "Partially Paid",
                category: "Prevention",
                date: "2024-01-14",
                description: "Annual Health Screening"
            },
            {
                id: 7,
                bill_number: "BILL-2024-007",
                patient_name: "James Brown",
                patient_id: "MRN007",
                amount: 950.00,
                status: "Cancelled",
                category: "Diagnostic"
            },
            {
                id: 8,
                bill_number: "BILL-2024-008",
                patient_name: "Lisa Thompson",
                patient_id: "MRN008",
                amount: 1350.00,
                status: "Paid",
                category: "Laboratory"
            },
            {
                id: 9,
                bill_number: "BILL-2024-009",
                patient_name: "Ahmed Hassan",
                patient_id: "MRN009",
                amount: 775.50,
                status: "Overdue",
                category: "Cardiology"
            },
            {
                id: 10,
                bill_number: "BILL-2024-010",
                patient_name: "Anna Martinez",
                patient_id: "MRN010",
                amount: 2250.00,
                status: "Pending",
                category: "Emergency"
            },
            {
                id: 11,
                bill_number: "BILL-2024-011",
                patient_name: "David Kumar",
                patient_id: "MRN011",
                amount: 325.00,
                status: "Paid",
                category: "Consultation"
            },
            {
                id: 12,
                bill_number: "BILL-2024-012",
                patient_name: "Rachel Green",
                patient_id: "MRN012",
                amount: 1650.00,
                status: "Partially Paid",
                category: "Dermatology"
            },
            {
                id: 13,
                bill_number: "BILL-2024-013",
                patient_name: "Thomas Anderson",
                patient_id: "MRN013",
                amount: 890.00,
                status: "Paid",
                category: "Orthopedic"
            },
            {
                id: 14,
                bill_number: "BILL-2024-014",
                patient_name: "Jennifer Wilson",
                patient_id: "MRN014",
                amount: 1150.00,
                status: "Overdue",
                category: "Gynecology"
            }
        ];

        // Initialize filtered items
        this.state.filteredItems = this.billsData;
    }

    addNewBill() {
        this.props.selectApp('bill-new');
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
        let filtered = this.billsData;

        if (this.state.currentSearchTerm) {
            const searchTerm = this.state.currentSearchTerm.toLowerCase();
            filtered = filtered.filter(bill => {
                if (this.state.currentSearchField === 'all') {
                    return (
                        bill.bill_number.toLowerCase().includes(searchTerm) ||
                        bill.patient_name.toLowerCase().includes(searchTerm) ||
                        bill.patient_id.toLowerCase().includes(searchTerm) ||
                        bill.status.toLowerCase().includes(searchTerm) ||
                        bill.category.toLowerCase().includes(searchTerm) ||
                        bill.amount.toString().includes(searchTerm)
                    );
                } else {
                    return bill[this.state.currentSearchField].toString().toLowerCase().includes(searchTerm);
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

            // Handle numeric sorting for amount
            if (field === 'amount') {
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
            case 'Paid':
                return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300`;
            case 'Pending':
                return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300`;
            case 'Overdue':
                return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300`;
            case 'Partially Paid':
                return `${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300`;
            case 'Cancelled':
                return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300`;
            default:
                return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300`;
        }
    }

    getStatusColor(status) {
        switch (status) {
            case 'Paid':
                return 'bg-green-500';
            case 'Pending':
                return 'bg-yellow-500';
            case 'Overdue':
                return 'bg-red-500';
            case 'Partially Paid':
                return 'bg-blue-500';
            case 'Cancelled':
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

    viewBill(billId) {
        this.props.selectApp('bill-detail');
    }
    
    editBill(billId) {
        this.props.selectApp('bill-edit');
    }

    printBill(billId) {
        console.log('Printing bill:', billId);
    }

    downloadBill(billId) {
        console.log('Downloading bill:', billId);
    }
}
