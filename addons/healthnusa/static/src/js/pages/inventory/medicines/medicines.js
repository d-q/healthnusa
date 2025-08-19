/** @odoo-module **/

import { Component, useState, onMounted } from "@odoo/owl";

export class Medicines extends Component {
    static template = "healthnusa.Medicines";
    static props = {
        router: { type: Object, optional: false },
        selectApp: { type: Function, optional: false },
    };

    setup() {
        this.router = this.props.router;
        this.selectApp = this.props.selectApp;

        this.state = useState({
            products: [
                {
                    id: 1,
                    sku: 'MED001',
                    name: 'Digital Blood Pressure Monitor',
                    fullName: 'Digital Blood Pressure Monitor Pro',
                    category: 'Monitoring',
                    price: 299.99,
                    cost: 180.00,
                    stock: 25,
                    site: 20,
                    reserved: 3,
                    status: 'In-Stock',
                    barcode: '8809418750001',
                    country: 'United States',
                    vendor: '+123 456 7890',
                    expDate: '03/2024',
                    tags: ['monitor', 'blood', 'pressure'],
                    image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=100&h=100&fit=crop'
                },
                {
                    id: 2,
                    sku: 'SUR002',
                    name: 'Surgical Scissors Set',
                    fullName: 'Professional Surgical Scissors Set',
                    category: 'Surgical',
                    price: 89.50,
                    cost: 54.00,
                    stock: 50,
                    site: 45,
                    reserved: 5,
                    status: 'In-Stock',
                    barcode: '8809418750002',
                    country: 'Germany',
                    vendor: '+123 456 7891',
                    expDate: '05/2024',
                    tags: ['surgical', 'scissors', 'tools'],
                    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=100&h=100&fit=crop'
                },
                {
                    id: 3,
                    sku: 'ECG003',
                    name: 'ECG Machine',
                    fullName: 'ECG Machine Professional Grade',
                    category: 'Diagnostics',
                    price: 4999.99,
                    cost: 3000.00,
                    stock: 3,
                    site: 2,
                    reserved: 1,
                    status: 'Low-Stock',
                    barcode: '8809418750003',
                    country: 'Japan',
                    vendor: '+123 456 7892',
                    expDate: '12/2025',
                    tags: ['ecg', 'diagnostics', 'heart'],
                    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop'
                },
                {
                    id: 4,
                    sku: 'DIS004',
                    name: 'Disposable Syringes (50pk)',
                    fullName: 'Disposable Syringes 50 Pack Sterile',
                    category: 'Disposables',
                    price: 24.99,
                    cost: 15.00,
                    stock: 120,
                    site: 100,
                    reserved: 20,
                    status: 'In-Stock',
                    barcode: '8809418750004',
                    country: 'China',
                    vendor: '+123 456 7893',
                    expDate: '06/2025',
                    tags: ['disposable', 'syringes', 'sterile'],
                    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=100&h=100&fit=crop'
                },
                {
                    id: 5,
                    sku: 'USG005',
                    name: 'Ultrasound Scanner',
                    fullName: 'Portable Ultrasound Scanner HD',
                    category: 'Imaging',
                    price: 15999.99,
                    cost: 9600.00,
                    stock: 2,
                    site: 2,
                    reserved: 0,
                    status: 'Emergency',
                    barcode: '8809418750005',
                    country: 'South Korea',
                    vendor: '+123 456 7894',
                    expDate: '08/2026',
                    tags: ['ultrasound', 'imaging', 'portable'],
                    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop'
                },
                {
                    id: 6,
                    sku: 'STE006',
                    name: 'Stethoscope Professional',
                    fullName: 'Professional Medical Stethoscope',
                    category: 'Examination',
                    price: 149.99,
                    cost: 90.00,
                    stock: 0,
                    site: 0,
                    reserved: 0,
                    status: 'Out-of-Stock',
                    barcode: '8809418750006',
                    country: 'USA',
                    vendor: '+123 456 7895',
                    expDate: '12/2024',
                    tags: ['stethoscope', 'examination', 'cardiology'],
                    image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=100&h=100&fit=crop'
                }
            ],
            searchQuery: '',
            searchField: 'all',
            showSearchOptions: false,
            expandedProducts: new Set(),
            editingProducts: new Set(),
            currentPage: 1,
            itemsPerPage: 10,
            sortField: '',
            sortDirection: 'asc'
        });

        onMounted(() => {
            console.log('Medicines component mounted');
        });
    }


    get allFilteredProducts() {
        let filtered = this.state.products;
        

        // Filter by search query
        if (this.state.searchQuery.trim()) {
            const query = this.state.searchQuery.toLowerCase();
            
            if (this.state.searchField === 'all') {
                filtered = filtered.filter(product => 
                    product.name.toLowerCase().includes(query) ||
                    product.sku.toLowerCase().includes(query) ||
                    product.category.toLowerCase().includes(query) ||
                    product.status.toLowerCase().includes(query) ||
                    product.vendor.toLowerCase().includes(query)
                );
            } else if (this.state.searchField === 'name') {
                filtered = filtered.filter(product => 
                    product.name.toLowerCase().includes(query)
                );
            } else if (this.state.searchField === 'sku') {
                filtered = filtered.filter(product => 
                    product.sku.toLowerCase().includes(query)
                );
            } else if (this.state.searchField === 'category') {
                filtered = filtered.filter(product => 
                    product.category.toLowerCase().includes(query)
                );
            } else if (this.state.searchField === 'status') {
                filtered = filtered.filter(product => 
                    product.status.toLowerCase().includes(query)
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

    get filteredProducts() {
        const allFiltered = this.allFilteredProducts;
        const start = (this.state.currentPage - 1) * this.state.itemsPerPage;
        const end = start + this.state.itemsPerPage;
        return allFiltered.slice(start, end);
    }

    get totalCount() {
        return this.allFilteredProducts.length;
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

    // Product management methods
    addNewProduct() {
        const newProduct = {
            id: Date.now(),
            sku: 'NEW' + String(Date.now()).slice(-3),
            name: 'New Product',
            fullName: 'New Product Name',
            category: 'General',
            price: 0.00,
            cost: 0.00,
            stock: 0,
            site: 0,
            reserved: 0,
            status: 'Out-of-Stock',
            barcode: '',
            country: '',
            vendor: '',
            expDate: '',
            tags: [],
            image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=100&h=100&fit=crop'
        };

        this.state.products.unshift(newProduct);
        
        // Auto-expand and edit the new product
        this.state.expandedProducts.add(newProduct.id);
        this.state.editingProducts.add(newProduct.id);
    }

    toggleProductDetails(productId) {
        if (this.state.expandedProducts.has(productId)) {
            this.state.expandedProducts.delete(productId);
            this.state.editingProducts.delete(productId); // Also stop editing when collapsing
        } else {
            this.state.expandedProducts.add(productId);
        }
    }

    isProductExpanded(productId) {
        return this.state.expandedProducts.has(productId);
    }

    isProductEditing(productId) {
        return this.state.editingProducts.has(productId);
    }

    saveProduct(productId) {
        if (this.state.editingProducts.has(productId)) {
            // Save mode - stop editing
            this.state.editingProducts.delete(productId);
            console.log('Product saved:', productId);
        } else {
            // Edit mode - start editing
            this.state.editingProducts.add(productId);
        }
    }

    cancelEdit(productId) {
        this.state.editingProducts.delete(productId);
        this.state.expandedProducts.delete(productId);
        
        // If this is a new product (starts with 'NEW'), remove it
        const product = this.state.products.find(p => p.id === productId);
        if (product && product.sku.startsWith('NEW')) {
            const index = this.state.products.findIndex(p => p.id === productId);
            if (index > -1) {
                this.state.products.splice(index, 1);
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

    calculateProfitMargin(product) {
        if (product.cost === 0) return 0;
        return Math.round(((product.price - product.cost) / product.cost) * 100);
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

    onProductFieldChange(productId, field, value) {
        const product = this.state.products.find(p => p.id === productId);
        if (product) {
            product[field] = value;
        }
    }

    deleteProduct(productId) {
        if (confirm('Are you sure you want to delete this product?')) {
            const index = this.state.products.findIndex(p => p.id === productId);
            if (index > -1) {
                this.state.products.splice(index, 1);
                this.state.expandedProducts.delete(productId);
                this.state.editingProducts.delete(productId);
            }
        }
    }

    editProduct(productId) {
        this.state.editingProducts.add(productId);
        this.state.expandedProducts.add(productId);
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
