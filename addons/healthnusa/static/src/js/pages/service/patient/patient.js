/** @odoo-module **/

import { Component, useState } from "@odoo/owl";

export class Patient extends Component {
    static template = "healthnusa.Patient";
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
            showAdmissionModal: false,
            selectedPatientId: null,
            admissionForm: {
                admission_date: new Date().toISOString().split('T')[0],
                admission_time: new Date().toTimeString().split(' ')[0].slice(0, 5),
                department: "",
                doctor: "",
                room_number: "",
                bed_number: "",
                admission_type: "Outpatient",
                insurance: "",
                chief_complaint: "",
                diagnosis: "",
                notes: ""
            }
        })

        // Sample patient data
        this.patientsData = [
            {
                id: 1,
                name: "John Anderson",
                medical_record_number: "MRN001",
                phone: "+123 456 7890",
                age: 45,
                gender: "Male",
                status: "Active",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
            },
            {
                id: 2,
                name: "Sarah Johnson",
                medical_record_number: "MRN002",
                phone: "+123 456 7891",
                age: 32,
                gender: "Female",
                status: "Active",
                image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
            },
            {
                id: 3,
                name: "Michael Chen",
                medical_record_number: "MRN003",
                phone: "+123 456 7892",
                age: 28,
                gender: "Male",
                status: "Discharged",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
            },
            {
                id: 4,
                name: "Emily Davis",
                medical_record_number: "MRN004",
                phone: "+123 456 7893",
                age: 56,
                gender: "Female",
                status: "Active",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
            },
            {
                id: 5,
                name: "Robert Wilson",
                medical_record_number: "MRN005",
                phone: "+123 456 7894",
                age: 63,
                gender: "Male",
                status: "Under Treatment",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
            },
            {
                id: 6,
                name: "Maria Rodriguez",
                medical_record_number: "MRN006",
                phone: "+123 456 7895",
                age: 41,
                gender: "Female",
                status: "Active",
                image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face"
            },
            {
                id: 7,
                name: "James Brown",
                medical_record_number: "MRN007",
                phone: "+123 456 7896",
                age: 39,
                gender: "Male",
                status: "Discharged",
                image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100&h=100&fit=crop&crop=face"
            },
            {
                id: 8,
                name: "Lisa Thompson",
                medical_record_number: "MRN008",
                phone: "+123 456 7897",
                age: 29,
                gender: "Female",
                status: "Under Treatment",
                image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face"
            },
            {
                id: 9,
                name: "Ahmed Hassan",
                medical_record_number: "MRN009",
                phone: "+123 456 7898",
                age: 52,
                gender: "Male",
                status: "Active",
                image: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=100&h=100&fit=crop&crop=face"
            },
            {
                id: 10,
                name: "Anna Martinez",
                medical_record_number: "MRN010",
                phone: "+123 456 7899",
                age: 34,
                gender: "Female",
                status: "Inactive",
                image: "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?w=100&h=100&fit=crop&crop=face"
            },
            {
                id: 11,
                name: "David Kumar",
                medical_record_number: "MRN011",
                phone: "+123 456 7900",
                age: 48,
                gender: "Male",
                status: "Active",
                image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face"
            },
            {
                id: 12,
                name: "Rachel Green",
                medical_record_number: "MRN012",
                phone: "+123 456 7901",
                age: 26,
                gender: "Female",
                status: "Under Treatment",
                image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop&crop=face"
            }
        ];

        // Initialize filtered items
        this.state.filteredItems = this.patientsData;
    }

    addNewPatient() {
        this.router.navigate('/patient/new');
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
        let filtered = this.patientsData;

        if (this.state.currentSearchTerm) {
            const searchTerm = this.state.currentSearchTerm.toLowerCase();
            filtered = filtered.filter(patient => {
                if (this.state.currentSearchField === 'all') {
                    return (
                        patient.name.toLowerCase().includes(searchTerm) ||
                        patient.medical_record_number.toLowerCase().includes(searchTerm) ||
                        patient.phone.toLowerCase().includes(searchTerm) ||
                        patient.status.toLowerCase().includes(searchTerm) ||
                        patient.age.toString().includes(searchTerm) ||
                        patient.gender.toLowerCase().includes(searchTerm)
                    );
                } else {
                    const fieldValue = patient[this.state.currentSearchField];
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

            // Handle numeric sorting for age
            if (field === 'age') {
                aVal = parseInt(aVal);
                bVal = parseInt(bVal);
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
            case 'Active':
                return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300`;
            case 'Inactive':
                return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300`;
            case 'Under Treatment':
                return `${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300`;
            case 'Discharged':
                return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300`;
            default:
                return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300`;
        }
    }

    getStatusColor(status) {
        switch (status) {
            case 'Active':
                return 'bg-green-500';
            case 'Inactive':
                return 'bg-gray-500';
            case 'Under Treatment':
                return 'bg-blue-500';
            case 'Discharged':
                return 'bg-yellow-500';
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

    viewPatient(patientId) {
        this.props.selectApp('patient-detail');
    }
    
    editPatient(patientId) {
        // Add your edit logic here
        this.props.selectApp('patient-edit');
    }

    showAdmissionForm(patientId) {
        this.state.selectedPatientId = patientId;
        this.state.showAdmissionModal = true;
        // Reset form
        this.state.admissionForm = {
            admission_date: new Date().toISOString().split('T')[0],
            admission_time: new Date().toTimeString().split(' ')[0].slice(0, 5),
            department: "",
            doctor: "",
            room_number: "",
            bed_number: "",
            admission_type: "Outpatient",
            insurance: "",
            chief_complaint: "",
            diagnosis: "",
            notes: ""
        };
    }

    closeAdmissionModal() {
        this.state.showAdmissionModal = false;
        this.state.selectedPatientId = null;
    }

    onAdmissionFormChange(field, value) {
        this.state.admissionForm[field] = value;
    }

    submitAdmissionForm() {
        const patient = this.patientsData.find(p => p.id === this.state.selectedPatientId);
        console.log('Submitting admission for:', patient?.name, this.state.admissionForm);
        // TODO: Implement actual submission logic
        alert(`Admission created successfully for ${patient?.name}`);
        this.closeAdmissionModal();
    }

    get selectedPatient() {
        return this.patientsData.find(p => p.id === this.state.selectedPatientId);
    }
}
