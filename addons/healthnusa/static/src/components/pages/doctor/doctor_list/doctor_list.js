/** @odoo-module **/

import { Component, useState, onWillStart } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";


export class DoctorList extends Component {
    static template = "healthnusa.DoctorList";
    static props = {
        showCreateEdit: Function,
        showDoctorDetail: Function, // Add this prop
        showDoctorForm: Function,   // Add this prop
    };

    setup() {
        this.orm = useService("orm");
        this.state = useState({
            currentView: 'list', // Always 'list' now
            searchTerm: '',
            currentPage: 1,
            itemsPerPage: 12,
            showDeleteModal: false,
            doctorToDelete: null,
            openDropdowns: {},
            doctors: [],
            filteredDoctors: [],
            paginatedDoctors: [],
            totalPages: 0,
            pageNumbers: []
        });

        // Close dropdowns when clicking outside
        this.onDocumentClick = this.onDocumentClick.bind(this);
        document.addEventListener('click', this.onDocumentClick);

        onWillStart(async () => {
            await this.loadDoctors();
        });
    }

    async loadDoctors() {
        try {
            const hrEmployee = await this.orm.searchRead(
                "hr.employee",
                [['is_doctor', '=', true]],
                [
                    "id",
                    "name",
                    "specialty_id",
                    "work_phone",
                    "gender",
                    "active",
                    "image_1920"
                ]
            );

            const doctorsData = hrEmployee.map(employee => ({
                id: employee.id,
                name: employee.name,
                specialty: employee.specialty_id ? employee.specialty_id[1] : "General Practitioner",
                phone: employee.work_phone || "N/A",
                gender: employee.gender || "Not Specified",
                available: employee.active,
                avatar: employee.image_1920 ? `/web/image/hr.employee/${employee.id}/image_1920` : ""
            }));

            this.state.doctors = doctorsData;
            this.state.filteredDoctors = doctorsData;
            this.state.totalPages = Math.ceil(doctorsData.length / this.state.itemsPerPage);
            this.state.paginatedDoctors = doctorsData.slice(0, this.state.itemsPerPage);
            this.state.pageNumbers = this.getPageNumbers(1, this.state.totalPages);
        } catch (error) {
            console.error("Failed to load doctors:", error);
            this.showErrorMessage("Failed to load doctors data");
        }
    }

    onWillUnmount() {
        document.removeEventListener('click', this.onDocumentClick);
    }

    onDocumentClick(event) {
        if (!event.target.closest('.dropdown')) {
            this.closeAllDropdowns();
        }
    }

    getPageNumbers(currentPage, totalPages) {
        const maxVisible = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let endPage = Math.min(totalPages, startPage + maxVisible - 1);

        if (endPage - startPage + 1 < maxVisible) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }

        const pages = [];
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    }

    updatePagination() {
        const filtered = this.state.filteredDoctors;
        const totalPages = Math.ceil(filtered.length / this.state.itemsPerPage);
        const startIndex = (this.state.currentPage - 1) * this.state.itemsPerPage;
        const endIndex = startIndex + this.state.itemsPerPage;

        this.state.totalPages = totalPages;
        this.state.paginatedDoctors = filtered.slice(startIndex, endIndex);
        this.state.pageNumbers = this.getPageNumbers(this.state.currentPage, totalPages);
    }

    // Remove switchView method since we only have list view now

    onSearch(event) {
        const searchTerm = event.target.value.toLowerCase();
        this.state.searchTerm = searchTerm;

        if (searchTerm === '') {
            this.state.filteredDoctors = this.state.doctors;
        } else {
            this.state.filteredDoctors = this.state.doctors.filter(doctor =>
                doctor.name.toLowerCase().includes(searchTerm) ||
                doctor.specialty.toLowerCase().includes(searchTerm) ||
                doctor.phone.includes(searchTerm) ||
                doctor.gender.toLowerCase().includes(searchTerm)
            );
        }

        this.state.currentPage = 1;
        this.updatePagination();
    }

    changePage(page) {
        if (page < 1 || page > this.state.totalPages) return;

        this.state.currentPage = page;
        this.updatePagination();
    }

    // Navigation methods for Previous/Next
    goToPreviousPage() {
        if (this.state.currentPage > 1) {
            this.changePage(this.state.currentPage - 1);
        }
    }

    goToNextPage() {
        if (this.state.currentPage < this.state.totalPages) {
            this.changePage(this.state.currentPage + 1);
        }
    }

    toggleDropdown(dropdownId) {
        this.closeAllDropdowns();
        this.state.openDropdowns[dropdownId] = true;
    }

    closeAllDropdowns() {
        this.state.openDropdowns = {};
    }

    isDropdownOpen(dropdownId) {
        return this.state.openDropdowns[dropdownId] || false;
    }

    // FUNCTIONAL BUTTONS IMPLEMENTATION

    /**
     * View Doctor Details - Navigate to doctor detail page
     */
    viewDoctor(doctorId) {
        this.closeAllDropdowns();
        console.log('Viewing doctor with ID:', doctorId);

        // If showDoctorDetail prop is available, use it
        if (this.props.showDoctorDetail) {
            this.props.showDoctorDetail(doctorId);
        } else {
            // Fallback: navigate to detail URL
            window.location.pathname = `/healthnusa/doctors/${doctorId}`;
        }
    }

    /**
     * Edit Doctor - Navigate to edit form
     */
    editDoctor(doctorId) {
        this.closeAllDropdowns();
        console.log('Editing doctor with ID:', doctorId);
        
        // If showDoctorForm prop is available, use it for edit mode
        if (this.props.showDoctorForm) {
            this.props.showDoctorForm(doctorId);
        } else {
            // Fallback: navigate to edit URL
            window.location.pathname = `/healthnusa/doctors/${doctorId}/edit`;
        }
    }

    /**
     * Show Delete Modal - Display confirmation dialog
     */
    showDeleteModal(doctor) {
        this.state.doctorToDelete = doctor;
        this.state.showDeleteModal = true;
        this.closeAllDropdowns();
        console.log('Showing delete modal for doctor:', doctor.name);
    }

    /**
     * Close Delete Modal
     */
    closeDeleteModal() {
        this.state.showDeleteModal = false;
        this.state.doctorToDelete = null;
    }

    /**
     * Confirm Delete Doctor - Actually delete the doctor
     */
    async confirmDeleteDoctor() {
        if (!this.state.doctorToDelete) return;

        const doctorId = this.state.doctorToDelete.id;
        const doctorName = this.state.doctorToDelete.name;

        try {
            console.log('Deleting doctor from database:', doctorId);
            
            // Delete from database
            await this.orm.unlink("hr.employee", [doctorId]);
            
            // Remove from local state
            this.state.doctors = this.state.doctors.filter(doctor => doctor.id !== doctorId);
            this.state.filteredDoctors = this.state.filteredDoctors.filter(doctor => doctor.id !== doctorId);

            // Update pagination
            const totalPages = Math.ceil(this.state.filteredDoctors.length / this.state.itemsPerPage);
            if (this.state.currentPage > totalPages && totalPages > 0) {
                this.state.currentPage = totalPages;
            }

            this.updatePagination();
            this.closeDeleteModal();

            // Show success message
            this.showSuccessMessage(`Doctor ${doctorName} has been deleted successfully`);

        } catch (error) {
            console.error('Failed to delete doctor:', error);
            this.showErrorMessage(`Failed to delete doctor ${doctorName}. Please try again.`);
        }
    }

    /**
     * Additional Action Handlers
     */
    printDoctor(doctor) {
        this.closeAllDropdowns();
        console.log('Printing doctor details:', doctor.name);
        // Implement print functionality
        window.print();
    }

    exportDoctor(doctor) {
        this.closeAllDropdowns();
        console.log('Exporting doctor data:', doctor.name);
        // Implement export functionality
        const csvContent = `Name,Specialty,Phone,Gender\n${doctor.name},${doctor.specialty},${doctor.phone},${doctor.gender}`;
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `doctor_${doctor.name.replace(/\s+/g, '_')}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    }

    archiveDoctor(doctor) {
        this.closeAllDropdowns();
        console.log('Archiving doctor:', doctor.name);
        // Implement archive functionality
        this.showInfoMessage(`Archive functionality for ${doctor.name} will be implemented soon`);
    }

    /**
     * Add Doctor - Navigate to create form
     */
    addDoctor() {
        console.log('Adding new doctor');
        
        // If showCreateEdit prop is available, use it
        if (this.props.showCreateEdit) {
            this.props.showCreateEdit();
        } else {
            // Fallback: navigate to create URL
            window.location.pathname = "/healthnusa/doctors/new";
        }
    }

    /**
     * Utility Methods for User Feedback
     */
    showSuccessMessage(message) {
        this.showNotification(message, 'success');
    }

    showErrorMessage(message) {
        this.showNotification(message, 'error');
    }

    showInfoMessage(message) {
        this.showNotification(message, 'info');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        const colors = {
            success: 'bg-green-500',
            error: 'bg-red-500',
            info: 'bg-blue-500'
        };
        
        const icons = {
            success: 'check_circle',
            error: 'error',
            info: 'info'
        };

        notification.className = `fixed top-4 right-4 ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300`;
        notification.innerHTML = `
            <div class="flex items-center space-x-2">
                <span class="material-icons">${icons[type]}</span>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 10);

        // Animate out and remove
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    getAvatarColor(name) {
        const colors = [
            'linear-gradient(135deg, #667eea, #764ba2)',
            'linear-gradient(135deg, #f093fb, #f5576c)',
            'linear-gradient(135deg, #4facfe, #00f2fe)',
            'linear-gradient(135deg, #43e97b, #38f9d7)',
            'linear-gradient(135deg, #fa709a, #fee140)',
            'linear-gradient(135deg, #a8edea, #fed6e3)',
            'linear-gradient(135deg, #ff9a9e, #fecfef)',
            'linear-gradient(135deg, #96deda, #50c9c3)'
        ];

        if (!name) return colors[0];

        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length];
    }
}