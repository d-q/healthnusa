/** @odoo-module **/

import { Component, useState, onMounted } from "@odoo/owl";

export class AdjustmentDetail extends Component {
    static template = "healthnusa.AdjustmentDetail";
    static props = {
        router: { type: Object, optional: false },
        selectApp: { type: Function, optional: false }
    };

    setup() {
        this.router = this.props.router;
        this.selectApp = this.props.selectApp;

        this.state = useState({
            adjustment: null,
            loading: true
        });

        onMounted(() => {
            this.loadAdjustmentDetails();
        });
    }

    loadAdjustmentDetails() {
        // In a real application, you would load this data from an API
        // For now, we'll use mock data that matches the form structure
        setTimeout(() => {
            this.state.adjustment = {
                adjustmentId: "ADJ-20250816-1430",
                date: "2025-08-16",
                department: "Pharmacy",
                storageLocation: "Main Pharmacy Storage",
                adjustmentType: "Physical Count",
                authorizedBy: "Dr. Sarah Johnson - Chief Pharmacist",
                referenceNumber: "PC-2025-001",
                costCenter: "CC-PHARM-001",
                batchTracking: "Enable batch tracking",
                notes: "Monthly physical count adjustment for pharmacy inventory. Found discrepancies in medication counts due to unreported usage during emergency situations. All variances have been investigated and documented.",
                showAdditionalFields: true,
                status: "Completed",
                createdBy: "John Smith",
                createdDate: "2025-08-16 09:30:00",
                submittedDate: "2025-08-16 14:45:00",
                approvedBy: "Dr. Sarah Johnson",
                approvedDate: "2025-08-16 15:30:00",
                items: [
                    {
                        id: 1,
                        itemCode: 'MED-001',
                        description: 'Acetaminophen 500mg Tablets',
                        currentStock: 1000,
                        actualCount: 985,
                        variance: -15,
                        unitCost: 0.15,
                        totalImpact: -2.25
                    },
                    {
                        id: 2,
                        itemCode: 'SUP-045',
                        description: 'Surgical Gloves (Box)',
                        currentStock: 50,
                        actualCount: 47,
                        variance: -3,
                        unitCost: 12.50,
                        totalImpact: -37.50
                    },
                    {
                        id: 3,
                        itemCode: 'EQP-123',
                        description: 'Digital Thermometer',
                        currentStock: 25,
                        actualCount: 28,
                        variance: 3,
                        unitCost: 45.00,
                        totalImpact: 135.00
                    }
                ]
            };
            this.state.loading = false;
        }, 500);
    }

    get totalItems() {
        return this.state.adjustment?.items?.length || 0;
    }

    get positiveAdjustments() {
        return this.state.adjustment?.items?.filter(item => item.variance > 0).length || 0;
    }

    get negativeAdjustments() {
        return this.state.adjustment?.items?.filter(item => item.variance < 0).length || 0;
    }

    get totalValueImpact() {
        return Math.abs(this.state.adjustment?.items?.reduce((sum, item) => sum + Math.abs(item.totalImpact), 0) || 0);
    }

    get netImpact() {
        return this.state.adjustment?.items?.reduce((sum, item) => sum + item.totalImpact, 0) || 0;
    }

    getStatusClass(status) {
        const baseClasses = "text-xs font-semibold px-3 py-1.5 rounded-full inline-flex items-center";
        switch (status) {
            case 'Completed':
                return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300`;
            case 'Pending':
                return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300`;
            case 'In Progress':
                return `${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300`;
            case 'Under Review':
                return `${baseClasses} bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300`;
            case 'Cancelled':
                return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300`;
            default:
                return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300`;
        }
    }

    getStatusColor(status) {
        switch (status) {
            case 'Completed':
                return 'bg-green-500';
            case 'Pending':
                return 'bg-yellow-500';
            case 'In Progress':
                return 'bg-blue-500';
            case 'Under Review':
                return 'bg-orange-500';
            case 'Cancelled':
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    }

    getVarianceClass(variance) {
        if (variance > 0) return 'text-green-600 dark:text-green-400';
        if (variance < 0) return 'text-red-600 dark:text-red-400';
        return 'text-gray-600 dark:text-gray-400';
    }

    getImpactClass(impact) {
        if (impact > 0) return 'text-green-600 dark:text-green-400';
        if (impact < 0) return 'text-red-600 dark:text-red-400';
        return 'text-gray-600 dark:text-gray-400';
    }

    getNetImpactClass() {
        const net = this.netImpact;
        if (net > 0) return 'text-lg font-bold text-green-600 dark:text-green-400';
        if (net < 0) return 'text-lg font-bold text-red-600 dark:text-red-400';
        return 'text-lg font-bold text-gray-800 dark:text-gray-100';
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
        this.selectApp('adjustment');
    }

    editAdjustment() {
        this.selectApp('adjustment-edit');
    }

    printAdjustment() {
        console.log('Printing adjustment...');
        // Implement print functionality
    }

    exportAdjustment() {
        console.log('Exporting adjustment...');
        // Implement export functionality
    }
}