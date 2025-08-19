/** @odoo-module **/

import { Component, useState, onMounted } from "@odoo/owl";

export class Supplies extends Component {
    static template = "healthnusa.Supplies";
    static props = {
        router: { type: Object, optional: false },
        selectApp: { type: Function, optional: false },
    };

    setup() {
        this.router = this.props.router;
        this.selectApp = this.props.selectApp;

        this.state = useState({
            supplies: [
                {
                    id: 1,
                    sku: 'SUP001',
                    name: 'Surgical Gloves',
                    fullName: 'Disposable Surgical Gloves (Box of 100)',
                    category: 'Disposables',
                    price: 45.99,
                    cost: 28.00,
                    stock: 150,
                    status: 'In-Stock',
                    vendor: 'MedSupply Corp',
                    expiryDate: '2025-12-31',
                    barcode: '1234567890123',
                    description: 'High-quality disposable surgical gloves for medical procedures',
                    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=100&h=100&fit=crop'
                },
                {
                    id: 2,
                    sku: 'SUP002',
                    name: 'Face Masks',
                    fullName: 'Disposable Face Masks (Box of 50)',
                    category: 'Disposables',
                    price: 29.99,
                    cost: 18.50,
                    stock: 200,
                    status: 'In-Stock',
                    vendor: 'HealthCare Solutions',
                    expiryDate: '2025-06-30',
                    barcode: '2345678901234',
                    description: '3-layer disposable face masks for infection control',
                    image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=100&h=100&fit=crop'
                },
                {
                    id: 3,
                    sku: 'SUP003',
                    name: 'Syringes',
                    fullName: 'Disposable Syringes 5ml (Pack of 20)',
                    category: 'Medical Equipment',
                    price: 15.99,
                    cost: 9.50,
                    stock: 75,
                    status: 'Low-Stock',
                    vendor: 'MediTech Supply',
                    expiryDate: '2026-03-15',
                    barcode: '3456789012345',
                    description: 'Sterile disposable syringes for medical injections',
                    image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=100&h=100&fit=crop'
                },
                {
                    id: 4,
                    sku: 'SUP004',
                    name: 'Bandages',
                    fullName: 'Elastic Bandages Assorted Sizes (10 pack)',
                    category: 'Consumables',
                    price: 24.99,
                    cost: 15.00,
                    stock: 120,
                    status: 'In-Stock',
                    vendor: 'WoundCare Plus',
                    expiryDate: '2027-01-20',
                    barcode: '4567890123456',
                    description: 'Elastic bandages for wound care and support',
                    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=100&h=100&fit=crop'
                },
                {
                    id: 5,
                    sku: 'SUP005',
                    name: 'Thermometers',
                    fullName: 'Digital Thermometers (Pack of 5)',
                    category: 'Medical Equipment',
                    price: 89.99,
                    cost: 55.00,
                    stock: 25,
                    status: 'Low-Stock',
                    vendor: 'TempCheck Ltd',
                    expiryDate: '2028-05-10',
                    barcode: '5678901234567',
                    description: 'Digital thermometers for accurate temperature measurement',
                    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=100&h=100&fit=crop'
                },
                {
                    id: 6,
                    sku: 'SUP006',
                    name: 'Alcohol Swabs',
                    fullName: 'Alcohol Prep Swabs (Box of 200)',
                    category: 'Consumables',
                    price: 12.99,
                    cost: 7.50,
                    stock: 0,
                    status: 'Out-of-Stock',
                    vendor: 'CleanMed Supply',
                    expiryDate: '2025-09-30',
                    barcode: '6789012345678',
                    description: 'Alcohol prep swabs for skin disinfection',
                    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop'
                }
            ],
            searchQuery: '',
            searchField: 'all',
            showSearchOptions: false,
            expandedSupplies: new Set(),
            editingSupplies: new Set(),
            currentPage: 1,
            itemsPerPage: 10,
            sortField: '',
            sortDirection: 'asc'
        });

        onMounted(() => {
            console.log('Supplies component mounted');
        });
    }

    get allFilteredSupplies() {
        let filtered = this.state.supplies;
        
        // Filter by search query
        if (this.state.searchQuery.trim()) {
            const query = this.state.searchQuery.toLowerCase();
            
            if (this.state.searchField === 'all') {
                filtered = filtered.filter(supply => 
                    supply.name.toLowerCase().includes(query) ||
                    supply.sku.toLowerCase().includes(query) ||
                    supply.category.toLowerCase().includes(query) ||
                    supply.status.toLowerCase().includes(query) ||
                    supply.vendor.toLowerCase().includes(query)
                );
            } else if (this.state.searchField === 'name') {
                filtered = filtered.filter(supply => 
                    supply.name.toLowerCase().includes(query)
                );
            } else if (this.state.searchField === 'code') {
                filtered = filtered.filter(supply => 
                    supply.sku.toLowerCase().includes(query)
                );
            } else if (this.state.searchField === 'category') {
                filtered = filtered.filter(supply => 
                    supply.category.toLowerCase().includes(query)
                );
            } else if (this.state.searchField === 'status') {
                filtered = filtered.filter(supply => 
                    supply.status.toLowerCase().includes(query)
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
                    case 'vendor':
                        aValue = a.vendor.toLowerCase();
                        bValue = b.vendor.toLowerCase();
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

    get filteredSupplies() {
        const allFiltered = this.allFilteredSupplies;
        const start = (this.state.currentPage - 1) * this.state.itemsPerPage;
        const end = start + this.state.itemsPerPage;
        return allFiltered.slice(start, end);
    }

    get totalCount() {
        return this.allFilteredSupplies.length;
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

    // Supply management methods
    addNewSupply() {
        const newSupply = {
            id: Date.now(),
            sku: 'SUP' + String(Date.now()).slice(-3),
            name: 'New Supply',
            fullName: 'New Supply Item',
            category: 'General',
            price: 0.00,
            cost: 0.00,
            stock: 0,
            status: 'Out-of-Stock',
            vendor: '',
            expiryDate: '',
            barcode: '',
            description: 'New supply item description',
            image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=100&h=100&fit=crop'
        };

        this.state.supplies.unshift(newSupply);
        
        // Auto-expand and edit the new supply
        this.state.expandedSupplies.add(newSupply.id);
        this.state.editingSupplies.add(newSupply.id);
    }

    toggleSupplyDetails(supplyId) {
        if (this.state.expandedSupplies.has(supplyId)) {
            this.state.expandedSupplies.delete(supplyId);
            this.state.editingSupplies.delete(supplyId); // Also stop editing when collapsing
        } else {
            this.state.expandedSupplies.add(supplyId);
        }
    }

    isSupplyExpanded(supplyId) {
        return this.state.expandedSupplies.has(supplyId);
    }

    isSupplyEditing(supplyId) {
        return this.state.editingSupplies.has(supplyId);
    }

    saveSupply(supplyId) {
        if (this.state.editingSupplies.has(supplyId)) {
            // Save mode - stop editing
            this.state.editingSupplies.delete(supplyId);
            console.log('Supply saved:', supplyId);
        } else {
            // Edit mode - start editing
            this.state.editingSupplies.add(supplyId);
        }
    }

    cancelEdit(supplyId) {
        this.state.editingSupplies.delete(supplyId);
        this.state.expandedSupplies.delete(supplyId);
        
        // If this is a new supply (starts with 'SUP' and recent timestamp), remove it
        const supply = this.state.supplies.find(s => s.id === supplyId);
        if (supply && supply.sku.startsWith('SUP') && supply.id > Date.now() - 60000) {
            const index = this.state.supplies.findIndex(s => s.id === supplyId);
            if (index > -1) {
                this.state.supplies.splice(index, 1);
            }
        }
    }

    getStatusClass(status) {
        switch(status) {
            case 'In-Stock': return 'bg-green-900 text-green-400';
            case 'Low-Stock': return 'bg-yellow-900 text-yellow-400';
            case 'Out-of-Stock': return 'bg-gray-700 text-gray-400';
            case 'Emergency': return 'bg-red-900 text-red-400';
            default: return 'bg-gray-700 text-gray-400';
        }
    }

    getStatusColor(status) {
        switch(status) {
            case 'In-Stock': return 'bg-green-400';
            case 'Low-Stock': return 'bg-yellow-400';
            case 'Out-of-Stock': return 'bg-gray-400';
            case 'Emergency': return 'bg-red-400';
            default: return 'bg-gray-400';
        }
    }

    calculateProfitMargin(supply) {
        if (supply.cost === 0) return 0;
        return Math.round(((supply.price - supply.cost) / supply.cost) * 100);
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

    onSupplyFieldChange(supplyId, field, value) {
        const supply = this.state.supplies.find(s => s.id === supplyId);
        if (supply) {
            supply[field] = value;
        }
    }

    deleteSupply(supplyId) {
        if (confirm('Are you sure you want to delete this supply?')) {
            const index = this.state.supplies.findIndex(s => s.id === supplyId);
            if (index > -1) {
                this.state.supplies.splice(index, 1);
                this.state.expandedSupplies.delete(supplyId);
                this.state.editingSupplies.delete(supplyId);
            }
        }
    }

    editSupply(supplyId) {
        this.state.editingSupplies.add(supplyId);
        this.state.expandedSupplies.add(supplyId);
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