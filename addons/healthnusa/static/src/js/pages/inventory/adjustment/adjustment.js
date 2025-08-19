/** @odoo-module **/

import { Component, useState } from "@odoo/owl";

export class Adjustment extends Component {
    static template = "healthnusa.Adjustment";
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
        });

        // Sample data for inventory adjustments
        this.adjustmentsData = [
            {
                id: 1,
                adjustmentNumber: "ADJ-001",
                date: "2024-08-15",
                type: "Stock Count",
                reason: "Monthly stock verification",
                status: "Completed",
                totalItems: 25,
                adjustedBy: "John Smith",
                location: "Main Warehouse",
                totalValue: 1250.00
            },
            {
                id: 2,
                adjustmentNumber: "ADJ-002",
                date: "2024-08-14",
                type: "Damage",
                reason: "Expired medications disposal",
                status: "Pending",
                totalItems: 8,
                adjustedBy: "Sarah Johnson",
                location: "Pharmacy",
                totalValue: -450.00
            },
            {
                id: 3,
                adjustmentNumber: "ADJ-003",
                date: "2024-08-13",
                type: "Theft",
                reason: "Missing inventory items",
                status: "Under Review",
                totalItems: 3,
                adjustedBy: "Michael Lee",
                location: "Storage Room B",
                totalValue: -180.00
            },
            {
                id: 4,
                adjustmentNumber: "ADJ-004",
                date: "2024-08-12",
                type: "Correction",
                reason: "System error correction",
                status: "Completed",
                totalItems: 12,
                adjustedBy: "Emily White",
                location: "Emergency Supplies",
                totalValue: 320.00
            },
            {
                id: 5,
                adjustmentNumber: "ADJ-005",
                date: "2024-08-11",
                type: "Donation",
                reason: "Charitable donation to clinic",
                status: "Completed",
                totalItems: 15,
                adjustedBy: "Robert Chen",
                location: "Main Warehouse",
                totalValue: -750.00
            },
            {
                id: 6,
                adjustmentNumber: "ADJ-006",
                date: "2024-08-10",
                type: "Stock Count",
                reason: "Weekly inventory check",
                status: "In Progress",
                totalItems: 45,
                adjustedBy: "Maria Rodriguez",
                location: "ICU Supplies",
                totalValue: 0.00
            },
            {
                id: 7,
                adjustmentNumber: "ADJ-007",
                date: "2024-08-09",
                type: "Transfer",
                reason: "Inter-department transfer",
                status: "Completed",
                totalItems: 20,
                adjustedBy: "James Wilson",
                location: "Surgery Department",
                totalValue: 850.00
            },
            {
                id: 8,
                adjustmentNumber: "ADJ-008",
                date: "2024-08-08",
                type: "Damage",
                reason: "Equipment malfunction damage",
                status: "Completed",
                totalItems: 5,
                adjustedBy: "Lisa Park",
                location: "Lab Equipment",
                totalValue: -1200.00
            },
            {
                id: 9,
                adjustmentNumber: "ADJ-009",
                date: "2024-08-07",
                type: "Found",
                reason: "Previously misplaced items found",
                status: "Completed",
                totalItems: 7,
                adjustedBy: "Ahmed Hassan",
                location: "Storage Room A",
                totalValue: 280.00
            },
            {
                id: 10,
                adjustmentNumber: "ADJ-010",
                date: "2024-08-06",
                type: "Correction",
                reason: "Data entry error fix",
                status: "Pending",
                totalItems: 18,
                adjustedBy: "Anna Thompson",
                location: "Pediatrics Ward",
                totalValue: -95.00
            },
            {
                id: 11,
                adjustmentNumber: "ADJ-011",
                date: "2024-08-05",
                type: "Expired",
                reason: "Expired supplies removal",
                status: "Under Review",
                totalItems: 32,
                adjustedBy: "David Kumar",
                location: "Main Warehouse",
                totalValue: -1680.00
            },
            {
                id: 12,
                adjustmentNumber: "ADJ-012",
                date: "2024-08-04",
                type: "Stock Count",
                reason: "Annual inventory audit",
                status: "Completed",
                totalItems: 156,
                adjustedBy: "Rachel Green",
                location: "All Locations",
                totalValue: 2340.00
            }
        ];

        // Initialize filtered items
        this.state.filteredItems = this.adjustmentsData;
    }

    addNewAdjustment() {
        this.props.selectApp('adjustment-new');
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
        let filtered = this.adjustmentsData;

        if (this.state.currentSearchTerm) {
            const searchTerm = this.state.currentSearchTerm.toLowerCase();
            filtered = filtered.filter(adjustment => {
                if (this.state.currentSearchField === 'all') {
                    return (
                        adjustment.adjustmentNumber.toLowerCase().includes(searchTerm) ||
                        adjustment.type.toLowerCase().includes(searchTerm) ||
                        adjustment.reason.toLowerCase().includes(searchTerm) ||
                        adjustment.status.toLowerCase().includes(searchTerm) ||
                        adjustment.adjustedBy.toLowerCase().includes(searchTerm) ||
                        adjustment.location.toLowerCase().includes(searchTerm)
                    );
                } else {
                    return adjustment[this.state.currentSearchField].toLowerCase().includes(searchTerm);
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

            // Handle numeric fields
            if (field === 'totalItems' || field === 'totalValue') {
                aVal = parseFloat(aVal);
                bVal = parseFloat(bVal);
                if (this.state.sortDirection === 'asc') {
                    return aVal - bVal;
                } else {
                    return bVal - aVal;
                }
            }

            // Handle date fields
            if (field === 'date') {
                aVal = new Date(aVal);
                bVal = new Date(bVal);
                if (this.state.sortDirection === 'asc') {
                    return aVal - bVal;
                } else {
                    return bVal - aVal;
                }
            }

            // Handle string fields
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
            case 'Pending':
                return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300`;
            case 'In Progress':
                return `${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300`;
            case 'Under Review':
                return `${baseClasses} bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300`;
            case 'Cancelled':
                return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300`;
            default:
                return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300`;
        }
    }

    getStatusColor(status) {
        switch (status) {
            case 'Completed':
                return 'bg-green-500';
            case 'Pending':
                return 'bg-yellow-500';
            case 'In Progress':
                return 'bg-blue-500';
            case 'Under Review':
                return 'bg-orange-500';
            case 'Cancelled':
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    }

    getTypeClass(type) {
        const baseClasses = "text-xs font-medium px-2 py-1 rounded";
        switch (type) {
            case 'Stock Count':
                return `${baseClasses} bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300`;
            case 'Damage':
                return `${baseClasses} bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300`;
            case 'Theft':
                return `${baseClasses} bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300`;
            case 'Correction':
                return `${baseClasses} bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300`;
            case 'Donation':
                return `${baseClasses} bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300`;
            case 'Transfer':
                return `${baseClasses} bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300`;
            case 'Found':
                return `${baseClasses} bg-teal-50 text-teal-700 dark:bg-teal-900/20 dark:text-teal-300`;
            case 'Expired':
                return `${baseClasses} bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-300`;
            default:
                return `${baseClasses} bg-gray-50 text-gray-700 dark:bg-gray-900/20 dark:text-gray-300`;
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

    formatCurrency(value) {
        const absValue = Math.abs(value);
        const sign = value < 0 ? '-' : '+';
        return `${sign}$${absValue.toFixed(2)}`;
    }

    formatDate(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    viewAdjustment(adjustmentId) {
        // Store the adjustment ID for viewing
        console.log('Viewing adjustment:', adjustmentId);
        this.props.selectApp('adjustment-detail');
    }
    
    editAdjustment(adjustmentId) {
        // Store the adjustment ID for editing
        console.log('Editing adjustment:', adjustmentId);
        this.props.selectApp('adjustment-edit');
    }
}