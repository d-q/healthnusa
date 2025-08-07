/** @odoo-module **/

// Sample data - in real app this would come from API
const SAMPLE_EMPLOYEES = [
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
    // ... more data
];

export class EmployeeService {
    constructor() {
        this.employees = [...SAMPLE_EMPLOYEES];
        this.filteredEmployees = [...SAMPLE_EMPLOYEES];
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.sortField = "";
        this.sortDirection = "asc";
    }

    /**
     * Get all employees
     */
    getEmployees() {
        return this.employees;
    }

    /**
     * Get filtered and paginated employees
     */
    getFilteredEmployees() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return this.filteredEmployees.slice(startIndex, endIndex);
    }

    /**
     * Search employees
     */
    searchEmployees(searchTerm, searchField = "all") {
        if (!searchTerm.trim()) {
            this.filteredEmployees = [...this.employees];
            return;
        }

        const searchLower = searchTerm.toLowerCase();
        
        this.filteredEmployees = this.employees.filter(employee => {
            switch(searchField) {
                case 'name':
                    return employee.name.toLowerCase().includes(searchLower);
                case 'specialty':
                    return employee.specialty.toLowerCase().includes(searchLower);
                case 'phone':
                    return employee.phone.toLowerCase().includes(searchLower);
                case 'status':
                    return employee.status.toLowerCase().includes(searchLower);
                default:
                    return employee.name.toLowerCase().includes(searchLower) ||
                           employee.specialty.toLowerCase().includes(searchLower) ||
                           employee.phone.toLowerCase().includes(searchLower) ||
                           employee.status.toLowerCase().includes(searchLower);
            }
        });

        this.currentPage = 1; // Reset to first page after search
    }

    /**
     * Sort employees
     */
    sortEmployees(field) {
        if (this.sortField === field) {
            this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
        } else {
            this.sortField = field;
            this.sortDirection = "asc";
        }

        this.filteredEmployees.sort((a, b) => {
            let valueA, valueB;
            
            switch(field) {
                case 'name':
                    valueA = a.name.toLowerCase();
                    valueB = b.name.toLowerCase();
                    break;
                case 'phone':
                    valueA = a.phone.toLowerCase();
                    valueB = b.phone.toLowerCase();
                    break;
                case 'gender':
                    valueA = a.gender.toLowerCase();
                    valueB = b.gender.toLowerCase();
                    break;
                case 'status':
                    const statusPriority = {
                        'available': 1,
                        'on break': 2,
                        'in surgery': 3,
                        'not available': 4
                    };
                    valueA = statusPriority[a.status.toLowerCase()] || 5;
                    valueB = statusPriority[b.status.toLowerCase()] || 5;
                    break;
                case 'specialty':
                    valueA = a.specialty.toLowerCase();
                    valueB = b.specialty.toLowerCase();
                    break;
                default:
                    return 0;
            }
            
            if (valueA < valueB) {
                return this.sortDirection === "asc" ? -1 : 1;
            }
            if (valueA > valueB) {
                return this.sortDirection === "asc" ? 1 : -1;
            }
            return 0;
        });
    }

    /**
     * Add new employee
     */
    addEmployee(employeeData) {
        const newEmployee = {
            id: Math.max(...this.employees.map(e => e.id)) + 1,
            ...employeeData
        };
        this.employees.push(newEmployee);
        this.filteredEmployees = [...this.employees];
        return newEmployee;
    }

    /**
     * Update employee
     */
    updateEmployee(id, employeeData) {
        const index = this.employees.findIndex(e => e.id === id);
        if (index !== -1) {
            this.employees[index] = { ...this.employees[index], ...employeeData };
            this.filteredEmployees = [...this.employees];
            return this.employees[index];
        }
        return null;
    }

    /**
     * Delete employee
     */
    deleteEmployee(id) {
        this.employees = this.employees.filter(e => e.id !== id);
        this.filteredEmployees = [...this.employees];
    }

    /**
     * Get pagination info
     */
    getPaginationInfo() {
        const totalItems = this.filteredEmployees.length;
        const totalPages = Math.ceil(totalItems / this.itemsPerPage);
        const startItem = totalItems === 0 ? 0 : (this.currentPage - 1) * this.itemsPerPage + 1;
        const endItem = Math.min(this.currentPage * this.itemsPerPage, totalItems);

        return {
            currentPage: this.currentPage,
            totalPages,
            totalItems,
            startItem,
            endItem,
            hasNext: this.currentPage < totalPages,
            hasPrev: this.currentPage > 1
        };
    }

    /**
     * Go to specific page
     */
    goToPage(page) {
        const paginationInfo = this.getPaginationInfo();
        if (page >= 1 && page <= paginationInfo.totalPages) {
            this.currentPage = page;
        }
    }

    /**
     * Go to next page
     */
    nextPage() {
        const paginationInfo = this.getPaginationInfo();
        if (paginationInfo.hasNext) {
            this.currentPage++;
        }
    }

    /**
     * Go to previous page
     */
    prevPage() {
        const paginationInfo = this.getPaginationInfo();
        if (paginationInfo.hasPrev) {
            this.currentPage--;
        }
    }
}

// Singleton instance
let employeeServiceInstance = null;

export function getEmployeeService() {
    if (!employeeServiceInstance) {
        employeeServiceInstance = new EmployeeService();
    }
    return employeeServiceInstance;
}