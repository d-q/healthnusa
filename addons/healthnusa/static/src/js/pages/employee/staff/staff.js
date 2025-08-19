/** @odoo-module **/

import { Component, useState } from "@odoo/owl";

export class Staff extends Component {
    static template = "healthnusa.Staff";
    static props = {
        router: { type: Object, optional: false },
        selectApp: { type: Function, optional: false }
    };

    setup() {
        this.router = this.props.router;
        this.selectApp = this.props.selectApp;
        this.state = useState({
            currentSearchTerm: "",
            currentSearchField: "all",
            currentPage: 1,
            itemsPerPage: 10,
            sortField: "",
            sortDirection: "asc",
            filteredItems: [],
        })

        // Sample staff data matching doctor structure
        this.staffData = [
            {
                id: 1,
                name: "Sarah Connor",
                specialty: "Head Nurse",
                phone: "+123 456 8000",
                gender: "Female",
                status: "Available",
                image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face"
            },
            {
                id: 2,
                name: "Michael Thompson",
                specialty: "Medical Assistant",
                phone: "+123 456 8001",
                gender: "Male",
                status: "On Break",
                image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=100&h=100&fit=crop&crop=face"
            },
            {
                id: 3,
                name: "Jennifer Martinez",
                specialty: "Lab Technician",
                phone: "+123 456 8002",
                gender: "Female",
                status: "Available",
                image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=100&h=100&fit=crop&crop=face"
            },
            {
                id: 4,
                name: "Robert Davis",
                specialty: "Pharmacy Technician",
                phone: "+123 456 8003",
                gender: "Male",
                status: "Available",
                image: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=100&h=100&fit=crop&crop=face"
            },
            {
                id: 5,
                name: "Lisa Wang",
                specialty: "Receptionist",
                phone: "+123 456 8004",
                gender: "Female",
                status: "Available",
                image: "https://images.unsplash.com/photo-1594824717593-c4fe35e55a4c?w=100&h=100&fit=crop&crop=face"
            },
            {
                id: 6,
                name: "James Wilson",
                specialty: "Administrative Assistant",
                phone: "+123 456 8005",
                gender: "Male",
                status: "Not Available",
                image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=100&h=100&fit=crop&crop=face"
            },
            {
                id: 7,
                name: "Maria Rodriguez",
                specialty: "Nurse Practitioner",
                phone: "+123 456 8006",
                gender: "Female",
                status: "Available",
                image: "https://images.unsplash.com/photo-1588667055777-8ee4d0fa8e30?w=100&h=100&fit=crop&crop=face"
            },
            {
                id: 8,
                name: "David Kumar",
                specialty: "IT Support",
                phone: "+123 456 8007",
                gender: "Male",
                status: "Available",
                image: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=100&h=100&fit=crop&crop=face"
            },
            {
                id: 9,
                name: "Anna Thompson",
                specialty: "Physical Therapist",
                phone: "+123 456 8008",
                gender: "Female",
                status: "In Session",
                image: "https://images.unsplash.com/photo-1582046916606-44e3d4e83e6b?w=100&h=100&fit=crop&crop=face"
            },
            {
                id: 10,
                name: "Marcus Johnson",
                specialty: "Security Officer",
                phone: "+123 456 8009",
                gender: "Male",
                status: "Available",
                image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=face"
            },
            {
                id: 11,
                name: "Rachel Green",
                specialty: "Billing Specialist",
                phone: "+123 456 8010",
                gender: "Female",
                status: "Available",
                image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop&crop=face"
            },
            {
                id: 12,
                name: "Alex Chen",
                specialty: "Maintenance Technician",
                phone: "+123 456 8011",
                gender: "Male",
                status: "On Break",
                image: "https://images.unsplash.com/photo-1584467735871-8e679ba3922b?w=100&h=100&fit=crop&crop=face"
            },
            {
                id: 13,
                name: "Sophie Martinez",
                specialty: "Social Worker",
                phone: "+123 456 8012",
                gender: "Female",
                status: "Available",
                image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face"
            },
            {
                id: 14,
                name: "Kevin Brown",
                specialty: "Medical Records Clerk",
                phone: "+123 456 8013",
                gender: "Male",
                status: "Available",
                image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face"
            },
            {
                id: 15,
                name: "Emma Davis",
                specialty: "Dietitian",
                phone: "+123 456 8014",
                gender: "Female",
                status: "Not Available",
                image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=100&h=100&fit=crop&crop=face"
            }
        ];

        this.updateFilteredItems();
    }

    updateFilteredItems() {
        let filtered = [...this.staffData];

        // Apply search filter
        if (this.state.currentSearchTerm.trim()) {
            const searchTerm = this.state.currentSearchTerm.toLowerCase();
            filtered = filtered.filter(staff => {
                if (this.state.currentSearchField === "all") {
                    return staff.name.toLowerCase().includes(searchTerm) ||
                           staff.specialty.toLowerCase().includes(searchTerm) ||
                           staff.phone.toLowerCase().includes(searchTerm) ||
                           staff.status.toLowerCase().includes(searchTerm);
                } else if (this.state.currentSearchField === "name") {
                    return staff.name.toLowerCase().includes(searchTerm);
                } else if (this.state.currentSearchField === "specialty") {
                    return staff.specialty.toLowerCase().includes(searchTerm);
                } else if (this.state.currentSearchField === "phone") {
                    return staff.phone.toLowerCase().includes(searchTerm);
                } else if (this.state.currentSearchField === "status") {
                    return staff.status.toLowerCase().includes(searchTerm);
                }
                return true;
            });
        }

        // Apply sorting
        if (this.state.sortField) {
            filtered.sort((a, b) => {
                let aVal = a[this.state.sortField];
                let bVal = b[this.state.sortField];
                
                if (typeof aVal === 'string') {
                    aVal = aVal.toLowerCase();
                    bVal = bVal.toLowerCase();
                }
                
                if (aVal < bVal) return this.state.sortDirection === 'asc' ? -1 : 1;
                if (aVal > bVal) return this.state.sortDirection === 'asc' ? 1 : -1;
                return 0;
            });
        }

        this.state.filteredItems = filtered;
    }

    get paginatedItems() {
        const startIndex = (this.state.currentPage - 1) * this.state.itemsPerPage;
        const endIndex = startIndex + this.state.itemsPerPage;
        return this.state.filteredItems.slice(startIndex, endIndex);
    }

    get totalPages() {
        return Math.ceil(this.state.filteredItems.length / this.state.itemsPerPage);
    }

    get paginationInfo() {
        const start = (this.state.currentPage - 1) * this.state.itemsPerPage + 1;
        const end = Math.min(this.state.currentPage * this.state.itemsPerPage, this.state.filteredItems.length);
        return `${start}-${end} of ${this.state.filteredItems.length}`;
    }

    onSearchChange(event) {
        this.state.currentSearchTerm = event.target.value;
        this.state.currentPage = 1;
        this.updateFilteredItems();
    }

    onSearchFieldChange(field) {
        this.state.currentSearchField = field;
        this.updateFilteredItems();
    }

    onSort(field) {
        if (this.state.sortField === field) {
            this.state.sortDirection = this.state.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            this.state.sortField = field;
            this.state.sortDirection = 'asc';
        }
        this.updateFilteredItems();
    }

    getSortIcon(field) {
        if (this.state.sortField !== field) {
            return 'unfold_more';
        }
        return this.state.sortDirection === 'asc' ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
    }

    nextPage() {
        if (this.state.currentPage < this.totalPages) {
            this.state.currentPage++;
        }
    }

    prevPage() {
        if (this.state.currentPage > 1) {
            this.state.currentPage--;
        }
    }

    getStatusClass(status) {
        switch(status) {
            case 'Available': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
            case 'Not Available': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
            case 'On Break': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
            case 'In Session': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
        }
    }

    getStatusColor(status) {
        switch(status) {
            case 'Available': return 'bg-green-500';
            case 'Not Available': return 'bg-red-500';
            case 'On Break': return 'bg-yellow-500';
            case 'In Session': return 'bg-blue-500';
            default: return 'bg-gray-500';
        }
    }

    addNewStaff() {
        console.log('Add new staff member');
        this.selectApp('staff-new');
    }

    editStaff(staffId) {
        console.log('Edit staff:', staffId);
        this.selectApp('staff-edit');
    }

    deleteStaff(staffId) {
        console.log('Delete staff:', staffId);
        // Handle delete
    }

    viewStaffDetails(staffId) {
        console.log('View staff details:', staffId);
        this.selectApp('staff-detail');
    }

    toggleSearchFilter() {
        const dropdown = document.querySelector('.search-filter-menu');
        if (dropdown) {
            dropdown.classList.toggle('hidden');
        }
    }

    onSearchFieldChange(event) {
        this.state.currentSearchField = event.target.value;
        this.updateFilteredItems();
    }

    clearSearch() {
        this.state.currentSearchTerm = '';
        this.state.currentPage = 1;
        this.updateFilteredItems();
    }

    goToPage(page) {
        this.state.currentPage = page;
    }

    toggleActionMenu(event) {
        // Toggle dropdown menu visibility for the clicked item
        const dropdown = event.target.closest('.relative').querySelector('.dropdown-menu');
        if (dropdown) {
            dropdown.classList.toggle('hidden');
        }
    }
}
