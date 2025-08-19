/** @odoo-module **/

import { Component, useState, onMounted } from "@odoo/owl";

export class Services extends Component {
    static template = "healthnusa.Services";
    static props = {
        router: { type: Object, optional: false },
        selectApp: { type: Function, optional: false },
    };

    setup() {
        this.router = this.props.router;
        this.selectApp = this.props.selectApp;

        this.state = useState({
            services: [
                {
                    id: 1,
                    code: 'SRV001',
                    name: 'General Consultation',
                    fullName: 'General Medical Consultation',
                    category: 'Consultation',
                    price: 150.00,
                    cost: 90.00,
                    duration: 30,
                    status: 'Active',
                    department: 'General Medicine',
                    description: 'Comprehensive general medical consultation and examination',
                    requirements: 'Valid ID, Insurance Card',
                    provider: 'Dr. John Smith',
                    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop'
                },
                {
                    id: 2,
                    code: 'SRV002',
                    name: 'Blood Test - Complete',
                    fullName: 'Complete Blood Count (CBC)',
                    category: 'Laboratory',
                    price: 80.00,
                    cost: 45.00,
                    duration: 15,
                    status: 'Active',
                    department: 'Laboratory',
                    description: 'Complete blood count including hemoglobin, hematocrit, white blood cells',
                    requirements: 'Fasting 8-12 hours',
                    provider: 'Lab Technician',
                    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=100&h=100&fit=crop'
                },
                {
                    id: 3,
                    code: 'SRV003',
                    name: 'X-Ray Chest',
                    fullName: 'Chest X-Ray Examination',
                    category: 'Radiology',
                    price: 120.00,
                    cost: 70.00,
                    duration: 20,
                    status: 'Active',
                    department: 'Radiology',
                    description: 'Digital chest X-ray for lung and heart examination',
                    requirements: 'Remove metal objects, loose clothing',
                    provider: 'Radiology Technician',
                    image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=100&h=100&fit=crop'
                },
                {
                    id: 4,
                    code: 'SRV004',
                    name: 'ECG',
                    fullName: 'Electrocardiogram',
                    category: 'Cardiology',
                    price: 100.00,
                    cost: 60.00,
                    duration: 25,
                    status: 'Active',
                    department: 'Cardiology',
                    description: 'Heart rhythm and electrical activity monitoring',
                    requirements: 'Avoid caffeine 2 hours before test',
                    provider: 'Cardiac Technician',
                    image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=100&h=100&fit=crop'
                },
                {
                    id: 5,
                    code: 'SRV005',
                    name: 'Ultrasound Abdomen',
                    fullName: 'Abdominal Ultrasound Examination',
                    category: 'Radiology',
                    price: 200.00,
                    cost: 120.00,
                    duration: 45,
                    status: 'Active',
                    department: 'Radiology',
                    description: 'Ultrasound examination of abdominal organs',
                    requirements: 'Fasting 6 hours, full bladder',
                    provider: 'Sonographer',
                    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=100&h=100&fit=crop'
                },
                {
                    id: 6,
                    code: 'SRV006',
                    name: 'Physical Therapy',
                    fullName: 'Physical Therapy Session',
                    category: 'Therapy',
                    price: 180.00,
                    cost: 100.00,
                    duration: 60,
                    status: 'Inactive',
                    department: 'Physical Therapy',
                    description: 'Therapeutic exercises and rehabilitation treatment',
                    requirements: 'Comfortable clothing, doctor referral',
                    provider: 'Physical Therapist',
                    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop'
                }
            ],
            searchQuery: '',
            searchField: 'all',
            showSearchOptions: false,
            expandedServices: new Set(),
            editingServices: new Set(),
            currentPage: 1,
            itemsPerPage: 10,
            sortField: '',
            sortDirection: 'asc'
        });

        onMounted(() => {
            console.log('Services component mounted');
        });
    }

    get allFilteredServices() {
        let filtered = this.state.services;
        
        // Filter by search query
        if (this.state.searchQuery.trim()) {
            const query = this.state.searchQuery.toLowerCase();
            
            if (this.state.searchField === 'all') {
                filtered = filtered.filter(service => 
                    service.name.toLowerCase().includes(query) ||
                    service.code.toLowerCase().includes(query) ||
                    service.category.toLowerCase().includes(query) ||
                    service.status.toLowerCase().includes(query) ||
                    service.department.toLowerCase().includes(query)
                );
            } else if (this.state.searchField === 'name') {
                filtered = filtered.filter(service => 
                    service.name.toLowerCase().includes(query)
                );
            } else if (this.state.searchField === 'code') {
                filtered = filtered.filter(service => 
                    service.code.toLowerCase().includes(query)
                );
            } else if (this.state.searchField === 'category') {
                filtered = filtered.filter(service => 
                    service.category.toLowerCase().includes(query)
                );
            } else if (this.state.searchField === 'status') {
                filtered = filtered.filter(service => 
                    service.status.toLowerCase().includes(query)
                );
            }
        }

        // Apply sorting
        if (this.state.sortField) {
            filtered.sort((a, b) => {
                let aValue, bValue;
                
                switch(this.state.sortField) {
                    case 'name':
                        aValue = a.name.toLowerCase();
                        bValue = b.name.toLowerCase();
                        break;
                    case 'department':
                        aValue = a.department.toLowerCase();
                        bValue = b.department.toLowerCase();
                        break;
                    case 'price':
                        aValue = a.price;
                        bValue = b.price;
                        break;
                    case 'status':
                        aValue = a.status.toLowerCase();
                        bValue = b.status.toLowerCase();
                        break;
                    default:
                        return 0;
                }
                
                if (aValue < bValue) {
                    return this.state.sortDirection === 'asc' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return this.state.sortDirection === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }

        return filtered;
    }

    get filteredServices() {
        const allFiltered = this.allFilteredServices;
        const start = (this.state.currentPage - 1) * this.state.itemsPerPage;
        const end = start + this.state.itemsPerPage;
        return allFiltered.slice(start, end);
    }

    get totalCount() {
        return this.allFilteredServices.length;
    }

    get totalPages() {
        return Math.ceil(this.totalCount / this.state.itemsPerPage);
    }

    get paginationInfo() {
        const start = (this.state.currentPage - 1) * this.state.itemsPerPage + 1;
        const end = Math.min(this.state.currentPage * this.state.itemsPerPage, this.totalCount);
        return `${start}-${end} of ${this.totalCount}`;
    }

    getPrevButtonClass() {
        return this.state.currentPage === 1 
            ? 'text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 cursor-not-allowed'
            : 'text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-500 hover:bg-gray-50 dark:hover:bg-gray-400';
    }

    getNextButtonClass() {
        return (this.state.currentPage === this.totalPages || this.totalPages === 0)
            ? 'text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 cursor-not-allowed'
            : 'text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-500 hover:bg-gray-50 dark:hover:bg-gray-400';
    }

    getPrevIconClass() {
        return this.state.currentPage === 1 
            ? 'text-gray-400 dark:text-gray-500'
            : 'text-gray-700 dark:text-gray-200';
    }

    getNextIconClass() {
        return (this.state.currentPage === this.totalPages || this.totalPages === 0)
            ? 'text-gray-400 dark:text-gray-500'
            : 'text-gray-700 dark:text-gray-200';
    }

    prevPage() {
        if (this.state.currentPage > 1) {
            this.state.currentPage--;
        }
    }

    nextPage() {
        if (this.state.currentPage < this.totalPages && this.totalPages > 0) {
            this.state.currentPage++;
        }
    }

    // Service management methods
    addNewService() {
        const newService = {
            id: Date.now(),
            code: 'SRV' + String(Date.now()).slice(-3),
            name: 'New Service',
            fullName: 'New Service Name',
            category: 'General',
            price: 0.00,
            cost: 0.00,
            duration: 30,
            status: 'Inactive',
            department: 'General',
            description: 'New service description',
            requirements: '',
            provider: '',
            image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=100&h=100&fit=crop'
        };

        this.state.services.unshift(newService);
        
        // Auto-expand and edit the new service
        this.state.expandedServices.add(newService.id);
        this.state.editingServices.add(newService.id);
    }

    toggleServiceDetails(serviceId) {
        if (this.state.expandedServices.has(serviceId)) {
            this.state.expandedServices.delete(serviceId);
            this.state.editingServices.delete(serviceId); // Also stop editing when collapsing
        } else {
            this.state.expandedServices.add(serviceId);
        }
    }

    isServiceExpanded(serviceId) {
        return this.state.expandedServices.has(serviceId);
    }

    isServiceEditing(serviceId) {
        return this.state.editingServices.has(serviceId);
    }

    saveService(serviceId) {
        if (this.state.editingServices.has(serviceId)) {
            // Save mode - stop editing
            this.state.editingServices.delete(serviceId);
            console.log('Service saved:', serviceId);
        } else {
            // Edit mode - start editing
            this.state.editingServices.add(serviceId);
        }
    }

    cancelEdit(serviceId) {
        this.state.editingServices.delete(serviceId);
        this.state.expandedServices.delete(serviceId);
        
        // If this is a new service (starts with 'SRV' and recent timestamp), remove it
        const service = this.state.services.find(s => s.id === serviceId);
        if (service && service.code.startsWith('SRV') && service.id > Date.now() - 60000) {
            const index = this.state.services.findIndex(s => s.id === serviceId);
            if (index > -1) {
                this.state.services.splice(index, 1);
            }
        }
    }

    getStatusClass(status) {
        switch(status) {
            case 'Active': return 'bg-green-900 text-green-400';
            case 'Inactive': return 'bg-gray-700 text-gray-400';
            case 'Suspended': return 'bg-red-900 text-red-400';
            default: return 'bg-gray-700 text-gray-400';
        }
    }

    getStatusColor(status) {
        switch(status) {
            case 'Active': return 'bg-green-400';
            case 'Inactive': return 'bg-gray-400';
            case 'Suspended': return 'bg-red-400';
            default: return 'bg-gray-400';
        }
    }

    calculateProfitMargin(service) {
        if (service.cost === 0) return 0;
        return Math.round(((service.price - service.cost) / service.cost) * 100);
    }

    onSearchChange(ev) {
        this.state.searchQuery = ev.target.value;
    }

    toggleSearchOptions() {
        this.state.showSearchOptions = !this.state.showSearchOptions;
    }

    sortData(field) {
        if (this.state.sortField === field) {
            // Toggle direction if same field
            this.state.sortDirection = this.state.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            // New field, start with ascending
            this.state.sortField = field;
            this.state.sortDirection = 'asc';
        }
        
        // Reset to first page when sorting
        this.state.currentPage = 1;
    }

    getSortIcon(field) {
        if (this.state.sortField !== field) {
            return 'unfold_more';
        }
        return this.state.sortDirection === 'asc' ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
    }

    onServiceFieldChange(serviceId, field, value) {
        const service = this.state.services.find(s => s.id === serviceId);
        if (service) {
            service[field] = value;
        }
    }

    deleteService(serviceId) {
        if (confirm('Are you sure you want to delete this service?')) {
            const index = this.state.services.findIndex(s => s.id === serviceId);
            if (index > -1) {
                this.state.services.splice(index, 1);
                this.state.expandedServices.delete(serviceId);
                this.state.editingServices.delete(serviceId);
            }
        }
    }

    editService(serviceId) {
        this.state.editingServices.add(serviceId);
        this.state.expandedServices.add(serviceId);
    }

    toggleActionMenu() {
        // Toggle dropdown menu visibility
        const dropdownMenus = document.querySelectorAll('.dropdown-menu');
        dropdownMenus.forEach(menu => {
            if (menu.classList.contains('hidden')) {
                menu.classList.remove('hidden');
            } else {
                menu.classList.add('hidden');
            }
        });
    }

    clearSearch() {
        this.state.searchQuery = '';
        this.state.searchField = 'all';
        this.state.showSearchOptions = false;
    }
}
