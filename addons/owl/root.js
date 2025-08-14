/** @odoo-module **/

import { Component, useState, onMounted, useRef } from "@odoo/owl";

export class Root extends Component {
    static template = "healthnusa.Root";

    setup() {
        // State untuk sidebar dan dark mode
        this.state = useState({
            isDarkMode: false,
            isSidebarCollapsed: false,
            // Data management state
            currentPage: 1,
            itemsPerPage: 10,
            currentSearchTerm: "",
            currentSearchField: "all",
            filteredItems: [],
            sortField: "",
            sortDirection: "asc",
            // UI state
            isLoading: false,
            toast: {
                show: false,
                type: 'info', // success, error, warning, info
                title: '',
                message: ''
            }
        });

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

        // Refs untuk DOM elements
        this.menuIconRef = useRef("menuIcon");
        this.darkModeIconRef = useRef("darkModeIcon");
        this.sidebarRef = useRef("sidebar");
        this.prevNavBtnRef = useRef("prevNavBtn");
        this.nextNavBtnRef = useRef("nextNavBtn");

        // Initialize dark mode on component mount
        onMounted(() => {
            this.initDarkMode();
            this.initializeData();
        });
    }

    initializeData() {
        // Initialize filtered items dengan semua data
        this.state.filteredItems = Array.from({ length: this.doctorsData.length }, (_, i) => i);
    }

    // Computed properties untuk pagination
    get totalPages() {
        return Math.ceil(this.state.filteredItems.length / this.state.itemsPerPage);
    }

    get currentPageData() {
        const startIndex = (this.state.currentPage - 1) * this.state.itemsPerPage;
        const endIndex = startIndex + this.state.itemsPerPage;

        return this.state.filteredItems.slice(startIndex, endIndex).map(index => this.doctorsData[index]);
    }

    get paginationInfo() {
        const totalItems = this.state.filteredItems.length;
        const startItem = totalItems === 0 ? 0 : (this.state.currentPage - 1) * this.state.itemsPerPage + 1;
        const endItem = Math.min(this.state.currentPage * this.state.itemsPerPage, totalItems);

        return `${startItem}-${endItem} / ${totalItems}`;
    }

    get paginationButtons() {
        const totalPages = this.totalPages;
        const currentPage = this.state.currentPage;
        const buttons = [];

        // Previous button
        buttons.push({
            type: 'prev',
            disabled: currentPage === 1,
            text: 'Previous'
        });

        // Page number buttons
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            buttons.push({
                type: 'page',
                page: i,
                active: i === currentPage,
                text: i.toString()
            });
        }

        // Next button
        buttons.push({
            type: 'next',
            disabled: currentPage === totalPages || totalPages === 0,
            text: 'Next'
        });

        return buttons;
    }

    // Search and filtering methods
    onSearchInput(ev) {
        this.state.currentSearchTerm = ev.target.value;
        this.searchData(this.state.currentSearchTerm, this.state.currentSearchField);
    }

    onSearchFieldChange(ev) {
        this.state.currentSearchField = ev.target.value;
        this.searchData(this.state.currentSearchTerm, this.state.currentSearchField);
    }

    searchData(searchTerm, searchField) {
        this.state.filteredItems = [];

        this.doctorsData.forEach((data, index) => {
            let shouldShow = false;

            if (!searchTerm.trim()) {
                shouldShow = true;
            } else {
                const searchLower = searchTerm.toLowerCase();

                switch (searchField) {
                    case 'name':
                        shouldShow = data.name.toLowerCase().includes(searchLower);
                        break;
                    case 'specialty':
                        shouldShow = data.specialty.toLowerCase().includes(searchLower);
                        break;
                    case 'phone':
                        shouldShow = data.phone.toLowerCase().includes(searchLower);
                        break;
                    case 'status':
                        shouldShow = data.status.toLowerCase().includes(searchLower);
                        break;
                    default:
                        shouldShow = data.name.toLowerCase().includes(searchLower) ||
                            data.specialty.toLowerCase().includes(searchLower) ||
                            data.phone.toLowerCase().includes(searchLower) ||
                            data.status.toLowerCase().includes(searchLower);
                }
            }

            if (shouldShow) {
                this.state.filteredItems.push(index);
            }
        });

        this.state.currentPage = 1; // Reset to first page after search
    }

    // Sorting methods
    sortData(field) {
        if (this.state.sortField === field) {
            this.state.sortDirection = this.state.sortDirection === "asc" ? "desc" : "asc";
        } else {
            this.state.sortField = field;
            this.state.sortDirection = "asc";
        }

        this.state.filteredItems.sort((a, b) => {
            const dataA = this.doctorsData[a];
            const dataB = this.doctorsData[b];
            let valueA, valueB;

            switch (field) {
                case 'name':
                    valueA = dataA.name.toLowerCase();
                    valueB = dataB.name.toLowerCase();
                    break;
                case 'phone':
                    valueA = dataA.phone.toLowerCase();
                    valueB = dataB.phone.toLowerCase();
                    break;
                case 'gender':
                    valueA = dataA.gender.toLowerCase();
                    valueB = dataB.gender.toLowerCase();
                    break;
                case 'status':
                    const statusPriority = {
                        'available': 1,
                        'on break': 2,
                        'in surgery': 3,
                        'not available': 4
                    };
                    valueA = statusPriority[dataA.status.toLowerCase()] || 5;
                    valueB = statusPriority[dataB.status.toLowerCase()] || 5;
                    break;
                case 'specialty':
                    valueA = dataA.specialty.toLowerCase();
                    valueB = dataB.specialty.toLowerCase();
                    break;
                default:
                    return 0;
            }

            if (valueA < valueB) {
                return this.state.sortDirection === "asc" ? -1 : 1;
            }
            if (valueA > valueB) {
                return this.state.sortDirection === "asc" ? 1 : -1;
            }
            return 0;
        });

        this.state.currentPage = 1;
    }

    // Pagination methods
    goToPage(page) {
        if (page < 1 || page > this.totalPages) return;
        this.state.currentPage = page;
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

    // Helper methods
    getStatusClass(status) {
        switch (status) {
            case 'Available': return 'bg-green-100 text-green-700';
            case 'Not Available': return 'bg-red-100 text-red-700';
            case 'On Break': return 'bg-yellow-100 text-yellow-700';
            case 'In Surgery': return 'bg-blue-100 text-blue-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    }

    getStatusColor(status) {
        switch (status) {
            case 'Available': return 'bg-green-500';
            case 'Not Available': return 'bg-red-500';
            case 'On Break': return 'bg-yellow-500';
            case 'In Surgery': return 'bg-blue-500';
            default: return 'bg-gray-500';
        }
    }

    getSortIcon(field) {
        if (this.state.sortField !== field) {
            return 'unfold_more';
        }
        return this.state.sortDirection === 'asc' ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
    }

    getSortClass(field) {
        if (this.state.sortField === field) {
            return 'text-custom-blue';
        }
        return 'text-gray-600 dark:text-gray-300';
    }

    getSortIconClass(field) {
        if (this.state.sortField === field) {
            return 'text-custom-blue';
        }
        return 'text-gray-400 group-hover:text-custom-blue';
    }

    // Navigation button styling methods (sesuai dengan contoh)
    getPrevButtonClass() {
        if (this.state.currentPage === 1) {
            // Inactive state
            return 'bg-white dark:bg-gray-700 cursor-not-allowed opacity-50';
        } else {
            // Active state  
            return 'bg-white dark:bg-gray-700 shadow hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer';
        }
    }

    getNextButtonClass() {
        if (this.state.currentPage === this.totalPages || this.totalPages === 0) {
            // Inactive state
            return 'bg-white dark:bg-gray-700 cursor-not-allowed opacity-50';
        } else {
            // Active state
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

    // Pagination button styling method
    getPaginationButtonClass(button) {
        if (button.disabled) {
            return 'opacity-50 cursor-not-allowed text-gray-400 dark:text-gray-500 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700';
        }

        if (button.active) {
            return 'bg-custom-blue text-white border-custom-blue shadow hover:bg-blue-600';
        }

        return 'hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 shadow hover:shadow-md';
    }

    // Update navigation buttons method (untuk manual styling jika diperlukan)
    updateNavigationButtons() {
        const totalPages = this.totalPages;
        const prevBtn = this.prevNavBtnRef?.el;
        const nextBtn = this.nextNavBtnRef?.el;

        if (prevBtn && nextBtn) {
            // Reset base classes
            prevBtn.className = "btn-standard rounded-lg w-10 transition-colors duration-300";
            nextBtn.className = "btn-standard rounded-lg w-10 transition-colors duration-300";

            const prevIcon = prevBtn.querySelector('.material-icons');
            const nextIcon = nextBtn.querySelector('.material-icons');

            // Previous button styling
            if (this.state.currentPage === 1) {
                // Inactive state
                prevBtn.classList.add('bg-white', 'dark:bg-gray-700', 'cursor-not-allowed', 'opacity-50');
                prevBtn.disabled = true;
                if (prevIcon) {
                    prevIcon.className = "material-icons text-gray-400 dark:text-gray-500";
                }
            } else {
                // Active state
                prevBtn.classList.add('bg-white', 'dark:bg-gray-700', 'shadow', 'hover:bg-gray-50', 'dark:hover:bg-gray-600', 'cursor-pointer');
                prevBtn.disabled = false;
                if (prevIcon) {
                    prevIcon.className = "material-icons text-custom-blue";
                }
            }

            // Next button styling
            if (this.state.currentPage === totalPages || totalPages === 0) {
                // Inactive state
                nextBtn.classList.add('bg-white', 'dark:bg-gray-700', 'cursor-not-allowed', 'opacity-50');
                nextBtn.disabled = true;
                if (nextIcon) {
                    nextIcon.className = "material-icons text-gray-400 dark:text-gray-500";
                }
            } else {
                // Active state
                nextBtn.classList.add('bg-white', 'dark:bg-gray-700', 'shadow', 'hover:bg-gray-50', 'dark:hover:bg-gray-600', 'cursor-pointer');
                nextBtn.disabled = false;
                if (nextIcon) {
                    nextIcon.className = "material-icons text-custom-blue";
                }
            }
        }
    }

    // Search filter dropdown
    toggleSearchFilter(ev) {
        ev.stopPropagation();
        const dropdown = ev.target.closest('button').nextElementSibling;
        const isVisible = !dropdown.classList.contains("hidden");

        // Close all dropdowns first
        document.querySelectorAll(".search-filter-menu").forEach((menu) => {
            menu.classList.add("hidden");
        });

        if (!isVisible) {
            dropdown.classList.remove("hidden");
        }
    }

    // Dark mode and sidebar methods (unchanged)
    initDarkMode() {
        const savedMode = localStorage.getItem("darkMode");
        const html = document.documentElement;
        const body = document.body;
        const icon = this.darkModeIconRef.el;

        if (savedMode === "true") {
            this.state.isDarkMode = true;
            html.classList.add("dark");
            body.classList.add("dark");
            if (icon) {
                icon.textContent = "light_mode";
            }
        } else {
            this.state.isDarkMode = false;
            html.classList.remove("dark");
            body.classList.remove("dark");
            if (icon) {
                icon.textContent = "dark_mode";
            }
            if (savedMode === null) {
                localStorage.setItem("darkMode", "false");
            }
        }

        setTimeout(() => this.forceScrollbarRefresh(), 100);
    }

    toggleDarkMode() {
        const html = document.documentElement;
        const body = document.body;
        const icon = this.darkModeIconRef.el;

        if (this.state.isDarkMode) {
            this.state.isDarkMode = false;
            html.classList.remove("dark");
            body.classList.remove("dark");
            if (icon) {
                icon.textContent = "dark_mode";
            }
            localStorage.setItem("darkMode", "false");
        } else {
            this.state.isDarkMode = true;
            html.classList.add("dark");
            body.classList.add("dark");
            if (icon) {
                icon.textContent = "light_mode";
            }
            localStorage.setItem("darkMode", "true");
        }

        this.forceScrollbarRefresh();
    }

    toggleSidebar() {
        const sidebar = this.sidebarRef.el;
        const menuIcon = this.menuIconRef.el;
        const sidebarTexts = document.querySelectorAll(".sidebar-text");
        const mainNav = document.querySelector(".main-nav");
        const appearanceNav = document.querySelector(".appearance-nav");

        if (!sidebar || !menuIcon) return;

        if (this.state.isSidebarCollapsed) {
            this.state.isSidebarCollapsed = false;
            sidebar.classList.remove("w-20");
            sidebar.classList.add("w-64");
            menuIcon.textContent = "menu";

            sidebarTexts.forEach((el) => {
                el.style.display = "";
            });

            if (mainNav) {
                mainNav.classList.remove("grid-cols-1");
                mainNav.classList.add("grid-cols-2");
            }

            if (appearanceNav) {
                appearanceNav.classList.remove("grid-cols-1");
                appearanceNav.classList.add("grid-cols-2");
            }

            const navLinks = sidebar.querySelectorAll("nav a");
            navLinks.forEach((link) => {
                link.classList.remove("p-2");
                link.classList.add("p-3");
            });
        } else {
            this.state.isSidebarCollapsed = true;
            sidebar.classList.remove("w-64");
            sidebar.classList.add("w-20");
            menuIcon.textContent = "menu_open";

            sidebarTexts.forEach((el) => {
                el.style.display = "none";
            });

            if (mainNav) {
                mainNav.classList.remove("grid-cols-2");
                mainNav.classList.add("grid-cols-1");
            }

            if (appearanceNav) {
                appearanceNav.classList.remove("grid-cols-2");
                appearanceNav.classList.add("grid-cols-1");
            }

            const navLinks = sidebar.querySelectorAll("nav a");
            navLinks.forEach((link) => {
                link.classList.remove("p-3");
                link.classList.add("p-2");
            });
        }
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

    // Event handlers untuk click outside dropdown
    onDocumentClick(ev) {
        // Check if click is inside search filter dropdown
        if (ev.target.closest('.search-filter-menu') || ev.target.closest('button[data-toggle="search-filter"]')) {
            return;
        }

        // Close all dropdowns
        document.querySelectorAll(".search-filter-menu").forEach((menu) => {
            menu.classList.add("hidden");
        });

        document.querySelectorAll(".dropdown-menu").forEach((menu) => {
            menu.classList.remove("show");
        });
    }

    // Toast notification methods
    showToast(type, title, message = '') {
        this.state.toast = {
            show: true,
            type,
            title,
            message
        };

        // Auto hide after 5 seconds
        setTimeout(() => {
            this.hideToast();
        }, 5000);
    }

    hideToast() {
        this.state.toast.show = false;
    }

    // Loading state methods
    setLoading(loading) {
        this.state.isLoading = loading;
    }

    // Clear search method
    clearSearch() {
        this.state.currentSearchTerm = '';
        this.searchData('', this.state.currentSearchField);

        // Clear input field
        const searchInput = document.querySelector('input[placeholder="Search..."]');
        if (searchInput) {
            searchInput.value = '';
        }
    }
}