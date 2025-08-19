/** @odoo-module **/

import { Component, useState } from "@odoo/owl";

export class Doctor extends Component {
    static template = "healthnusa.Doctor";
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

        // Sample data
        this.doctorsData = [
            {
                id: 1,
                name: "Dr. John Smith",
                specialty: "Heart Specialist",
                phone: "+123 456 7890",
                gender: "Male",
                status: "Available",
                image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face"
            },
            {
                id: 2,
                name: "Dr. Sarah Johnson",
                specialty: "Lungs Specialist",
                phone: "+123 456 7891",
                gender: "Female",
                status: "Not Available",
                image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face"
            },
            {
                id: 3,
                name: "Dr. Michael Lee",
                specialty: "Dental Specialist",
                phone: "+123 456 7892",
                gender: "Male",
                status: "Available",
                image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=100&h=100&fit=crop&crop=face"
            },
            {
                id: 4,
                name: "Dr. Emily White",
                specialty: "Brain Specialist",
                phone: "+123 456 7893",
                gender: "Female",
                status: "Available",
                image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=100&h=100&fit=crop&crop=face"
            },
            {
                id: 5,
                name: "Dr. Robert Chen",
                specialty: "Orthopedic Surgeon",
                phone: "+123 456 7894",
                gender: "Male",
                status: "Available",
                image: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=100&h=100&fit=crop&crop=face"
            },
            {
                id: 6,
                name: "Dr. Maria Rodriguez",
                specialty: "Pediatrician",
                phone: "+123 456 7895",
                gender: "Female",
                status: "On Break",
                image: "https://images.unsplash.com/photo-1594824717593-c4fe35e55a4c?w=100&h=100&fit=crop&crop=face"
            },
            {
                id: 7,
                name: "Dr. James Wilson",
                specialty: "Dermatologist",
                phone: "+123 456 7896",
                gender: "Male",
                status: "Available",
                image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=100&h=100&fit=crop&crop=face"
            },
            {
                id: 8,
                name: "Dr. Lisa Park",
                specialty: "Gynecologist",
                phone: "+123 456 7897",
                gender: "Female",
                status: "Not Available",
                image: "https://images.unsplash.com/photo-1588667055777-8ee4d0fa8e30?w=100&h=100&fit=crop&crop=face"
            },
            {
                id: 9,
                name: "Dr. Ahmed Hassan",
                specialty: "Ophthalmologist",
                phone: "+123 456 7898",
                gender: "Male",
                status: "Available",
                image: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=100&h=100&fit=crop&crop=face"
            },
            {
                id: 10,
                name: "Dr. Anna Thompson",
                specialty: "Psychiatrist",
                phone: "+123 456 7899",
                gender: "Female",
                status: "On Break",
                image: "https://images.unsplash.com/photo-1582046916606-44e3d4e83e6b?w=100&h=100&fit=crop&crop=face"
            },
            {
                id: 11,
                name: "Dr. David Kumar",
                specialty: "Anesthesiologist",
                phone: "+123 456 7900",
                gender: "Male",
                status: "Available",
                image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=face"
            },
            {
                id: 12,
                name: "Dr. Rachel Green",
                specialty: "Radiologist",
                phone: "+123 456 7901",
                gender: "Female",
                status: "In Surgery",
                image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop&crop=face"
            },
            {
                id: 13,
                name: "Dr. Marcus Williams",
                specialty: "Urologist",
                phone: "+123 456 7902",
                gender: "Male",
                status: "Available",
                image: "https://images.unsplash.com/photo-1584467735871-8e679ba3922b?w=100&h=100&fit=crop&crop=face"
            },
            {
                id: 14,
                name: "Dr. Sophie Martinez",
                specialty: "Endocrinologist",
                phone: "+123 456 7903",
                gender: "Female",
                status: "Not Available",
                image: "https://images.unsplash.com/photo-1594824717593-c4fe35e55a4c?w=100&h=100&fit=crop&crop=face"
            }
        ];

        // Initialize filtered items
        this.state.filteredItems = this.doctorsData;
    }

    addNewDoctor() {
        this.router.navigate('/doctor/new');
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
        let filtered = this.doctorsData;

        if (this.state.currentSearchTerm) {
            const searchTerm = this.state.currentSearchTerm.toLowerCase();
            filtered = filtered.filter(doctor => {
                if (this.state.currentSearchField === 'all') {
                    return (
                        doctor.name.toLowerCase().includes(searchTerm) ||
                        doctor.specialty.toLowerCase().includes(searchTerm) ||
                        doctor.phone.toLowerCase().includes(searchTerm) ||
                        doctor.status.toLowerCase().includes(searchTerm)
                    );
                } else {
                    return doctor[this.state.currentSearchField].toLowerCase().includes(searchTerm);
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
            case 'Available':
                return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300`;
            case 'Not Available':
                return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300`;
            case 'On Break':
                return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300`;
            case 'In Surgery':
                return `${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300`;
            default:
                return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300`;
        }
    }

    getStatusColor(status) {
        switch (status) {
            case 'Available':
                return 'bg-green-500';
            case 'Not Available':
                return 'bg-red-500';
            case 'On Break':
                return 'bg-yellow-500';
            case 'In Surgery':
                return 'bg-blue-500';
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

    viewDoctor(doctorId) {
        this.props.selectApp('doctor-detail');
    }
    
    editDoctor(doctorId) {
        // Add your edit logic here
        this.props.selectApp('doctor-edit');
    }
}
