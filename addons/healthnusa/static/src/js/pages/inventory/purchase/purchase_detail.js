/** @odoo-module **/

import { Component, useState, onMounted } from "@odoo/owl";

export class PurchaseDetail extends Component {
    static template = "healthnusa.PurchaseDetail";
    static props = {
        router: { type: Object, optional: false },
        selectApp: { type: Function, optional: false }
    };

    setup() {
        this.router = this.props.router;
        this.selectApp = this.props.selectApp;

        this.state = useState({
            purchase: null,
            loading: true
        });

        onMounted(() => {
            this.loadPurchaseDetails();
        });
    }

    loadPurchaseDetails() {
        // In a real application, you would load this data from an API
        // For now, we'll use mock data that matches the form structure
        setTimeout(() => {
            this.state.purchase = {
                purchaseId: "PO-20250816-1430",
                date: "2025-08-16",
                supplier: "MedSupply Corporation",
                deliveryLocation: "Main Pharmacy Storage",
                purchaseType: "Standard Order",
                approvedBy: "Dr. Sarah Johnson - Chief Pharmacist",
                referenceNumber: "REF-2025-001",
                costCenter: "CC-PHARM-001",
                terms: "Net 30 days",
                notes: "Monthly pharmaceutical supplies order. All items verified upon delivery and added to inventory system. Quality control checks passed for all medications.",
                showAdditionalFields: true,
                status: "Delivered",
                createdBy: "John Smith",
                createdDate: "2025-08-16 09:30:00",
                submittedDate: "2025-08-16 14:45:00",
                approvedBy: "Dr. Sarah Johnson",
                approvedDate: "2025-08-16 15:30:00",
                deliveredDate: "2025-08-18 10:15:00",
                items: [
                    {
                        id: 1,
                        itemCode: 'MED-001',
                        description: 'Acetaminophen 500mg Tablets',
                        orderedQty: 1000,
                        receivedQty: 1000,
                        unitPrice: 0.15,
                        totalPrice: 150.00
                    },
                    {
                        id: 2,
                        itemCode: 'SUP-045',
                        description: 'Surgical Gloves (Box)',
                        orderedQty: 50,
                        receivedQty: 50,
                        unitPrice: 12.50,
                        totalPrice: 625.00
                    },
                    {
                        id: 3,
                        itemCode: 'EQP-123',
                        description: 'Digital Thermometer',
                        orderedQty: 25,
                        receivedQty: 25,
                        unitPrice: 45.00,
                        totalPrice: 1125.00
                    }
                ]
            };
            this.state.loading = false;
        }, 500);
    }

    get totalItems() {
        return this.state.purchase?.items?.length || 0;
    }

    get totalOrdered() {
        return this.state.purchase?.items?.reduce((sum, item) => sum + item.orderedQty, 0) || 0;
    }

    get totalReceived() {
        return this.state.purchase?.items?.reduce((sum, item) => sum + item.receivedQty, 0) || 0;
    }

    get subtotal() {
        return this.state.purchase?.items?.reduce((sum, item) => sum + item.totalPrice, 0) || 0;
    }

    get taxAmount() {
        return this.subtotal * 0.10; // 10% tax
    }

    get totalAmount() {
        return this.subtotal + this.taxAmount;
    }

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

    getQuantityMatchClass(ordered, received) {
        if (received === ordered) return 'text-green-600 dark:text-green-400';
        if (received < ordered) return 'text-yellow-600 dark:text-yellow-400';
        if (received > ordered) return 'text-blue-600 dark:text-blue-400';
        return 'text-gray-600 dark:text-gray-400';
    }

    getTotalAmountClass() {
        return 'text-lg font-bold text-blue-600 dark:text-blue-400';
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
            month: 'long',
            day: 'numeric'
        });
    }

    formatDateTime(dateTimeStr) {
        const date = new Date(dateTimeStr);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    goBack() {
        this.selectApp('purchase');
    }

    editPurchase() {
        this.selectApp('purchase-edit');
    }

    printPurchase() {
        console.log('Printing purchase order...');
        // Implement print functionality
    }

    exportPurchase() {
        console.log('Exporting purchase order...');
        // Implement export functionality
    }
}