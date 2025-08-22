/** @odoo-module **/

import { Component, useState } from "@odoo/owl";

export class Purchase extends Component {
    static template = "healthnusa.Purchase";
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

        // Sample data for purchase orders
        this.purchasesData = [
            {
                id: 1,
                purchaseNumber: "PO-001",
                date: "2024-08-15",
                supplier: "MedSupply Corp",
                description: "Monthly medical supplies order",
                status: "Delivered",
                totalItems: 25,
                orderedBy: "John Smith",
                deliveryLocation: "Main Warehouse",
                totalValue: 1250.00
            },
            {
                id: 2,
                purchaseNumber: "PO-002",
                date: "2024-08-14",
                supplier: "PharmaCorp Ltd",
                description: "Emergency pharmaceutical restock",
                status: "Pending",
                totalItems: 8,
                orderedBy: "Sarah Johnson",
                deliveryLocation: "Pharmacy",
                totalValue: 450.00
            },
            {
                id: 3,
                purchaseNumber: "PO-003",
                date: "2024-08-13",
                supplier: "TechMed Solutions",
                description: "Medical equipment purchase",
                status: "Approved",
                totalItems: 3,
                orderedBy: "Michael Lee",
                deliveryLocation: "Equipment Room",
                totalValue: 2180.00
            },
            {
                id: 4,
                purchaseNumber: "PO-004",
                date: "2024-08-12",
                supplier: "Emergency Supply Co",
                description: "Emergency supplies replenishment",
                status: "Delivered",
                totalItems: 12,
                orderedBy: "Emily White",
                deliveryLocation: "Emergency Department",
                totalValue: 820.00
            },
            {
                id: 5,
                purchaseNumber: "PO-005",
                date: "2024-08-11",
                supplier: "Global Medical Inc",
                description: "Bulk medical supplies order",
                status: "Delivered",
                totalItems: 15,
                orderedBy: "Robert Chen",
                deliveryLocation: "Main Warehouse",
                totalValue: 1750.00
            },
            {
                id: 6,
                purchaseNumber: "PO-006",
                date: "2024-08-10",
                supplier: "ICU Specialties",
                description: "ICU equipment and supplies",
                status: "Processing",
                totalItems: 45,
                orderedBy: "Maria Rodriguez",
                deliveryLocation: "ICU Department",
                totalValue: 3200.00
            },
            {
                id: 7,
                purchaseNumber: "PO-007",
                date: "2024-08-09",
                supplier: "SurgiTech Pro",
                description: "Surgical instruments and supplies",
                status: "Delivered",
                totalItems: 20,
                orderedBy: "James Wilson",
                deliveryLocation: "Surgery Department",
                totalValue: 4850.00
            },
            {
                id: 8,
                purchaseNumber: "PO-008",
                date: "2024-08-08",
                supplier: "LabTech Systems",
                description: "Laboratory equipment replacement",
                status: "Delivered",
                totalItems: 5,
                orderedBy: "Lisa Park",
                deliveryLocation: "Laboratory",
                totalValue: 5200.00
            },
            {
                id: 9,
                purchaseNumber: "PO-009",
                date: "2024-08-07",
                supplier: "QuickMed Supplies",
                description: "Quick delivery medical supplies",
                status: "Delivered",
                totalItems: 7,
                orderedBy: "Ahmed Hassan",
                deliveryLocation: "Storage Room A",
                totalValue: 680.00
            },
            {
                id: 10,
                purchaseNumber: "PO-010",
                date: "2024-08-06",
                supplier: "PediCare Solutions",
                description: "Pediatric medical supplies",
                status: "Pending",
                totalItems: 18,
                orderedBy: "Anna Thompson",
                deliveryLocation: "Pediatrics Ward",
                totalValue: 1095.00
            },
            {
                id: 11,
                purchaseNumber: "PO-011",
                date: "2024-08-05",
                supplier: "MegaMed Corporation",
                description: "Large scale supply procurement",
                status: "Approved",
                totalItems: 32,
                orderedBy: "David Kumar",
                deliveryLocation: "Main Warehouse",
                totalValue: 8680.00
            },
            {
                id: 12,
                purchaseNumber: "PO-012",
                date: "2024-08-04",
                supplier: "Universal Medical",
                description: "Annual bulk procurement order",
                status: "Delivered",
                totalItems: 156,
                orderedBy: "Rachel Green",
                deliveryLocation: "All Locations",
                totalValue: 12340.00
            }
        ];

        // Initialize filtered items
        this.state.filteredItems = this.purchasesData;
    }

    addNewPurchase() {
        this.props.selectApp('purchase-new');
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
        let filtered = this.purchasesData;

        if (this.state.currentSearchTerm) {
            const searchTerm = this.state.currentSearchTerm.toLowerCase();
            filtered = filtered.filter(purchase => {
                if (this.state.currentSearchField === 'all') {
                    return (
                        purchase.purchaseNumber.toLowerCase().includes(searchTerm) ||
                        purchase.supplier.toLowerCase().includes(searchTerm) ||
                        purchase.description.toLowerCase().includes(searchTerm) ||
                        purchase.status.toLowerCase().includes(searchTerm) ||
                        purchase.orderedBy.toLowerCase().includes(searchTerm) ||
                        purchase.deliveryLocation.toLowerCase().includes(searchTerm)
                    );
                } else {
                    return purchase[this.state.currentSearchField].toLowerCase().includes(searchTerm);
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
            case 'Delivered':
                return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300`;
            case 'Pending':
                return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300`;
            case 'Processing':
                return `${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300`;
            case 'Approved':
                return `${baseClasses} bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300`;
            case 'Cancelled':
                return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300`;
            default:
                return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300`;
        }
    }

    getStatusColor(status) {
        switch (status) {
            case 'Delivered':
                return 'bg-green-500';
            case 'Pending':
                return 'bg-yellow-500';
            case 'Processing':
                return 'bg-blue-500';
            case 'Approved':
                return 'bg-orange-500';
            case 'Cancelled':
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    }

    getSupplierClass(supplier) {
        const baseClasses = "text-xs font-medium px-2 py-1 rounded";
        // Generate different colors for different suppliers
        const hash = supplier.split('').reduce((a, b) => {
            a = ((a << 5) - a) + b.charCodeAt(0);
            return a & a;
        }, 0);
        const colors = [
            'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300',
            'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300',
            'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300',
            'bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300',
            'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300',
            'bg-teal-50 text-teal-700 dark:bg-teal-900/20 dark:text-teal-300'
        ];
        return `${baseClasses} ${colors[Math.abs(hash) % colors.length]}`;
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
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(value);
    }

    formatDate(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    viewPurchase(purchaseId) {
        // Store the purchase ID for viewing
        console.log('Viewing purchase:', purchaseId);
        this.props.selectApp('purchase-detail');
    }
    
    editPurchase(purchaseId) {
        // Store the purchase ID for editing
        console.log('Editing purchase:', purchaseId);
        this.props.selectApp('purchase-edit');
    }
}