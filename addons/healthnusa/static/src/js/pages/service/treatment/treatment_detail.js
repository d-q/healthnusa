/** @odoo-module **/

import { Component, useState, onMounted } from "@odoo/owl";

export class TreatmentDetail extends Component {
    static template = "healthnusa.TreatmentDetail";
    static props = {
        router: { type: Object, optional: false },
        selectApp: { type: Function, optional: false }
    };

    setup() {
        this.router = this.props.router;
        this.selectApp = this.props.selectApp;

        this.state = useState({
            treatment: null,
            loading: true
        });

        onMounted(() => {
            this.loadTreatmentDetails();
        });
    }

    loadTreatmentDetails() {
        // In a real application, you would load this data from an API
        // For now, we'll use mock data that matches the form structure
        setTimeout(() => {
            this.state.treatment = {
                treatmentId: "TRT-20250819-1430",
                date: "2025-08-19",
                followupDate: "2025-09-02",
                patient: "John Anderson",
                patientId: "MRN001",
                doctor: "Dr. Sarah Johnson - Internal Medicine",
                department: "Emergency Department",
                duration: "45 minutes",
                treatmentType: "Emergency",
                notes: "Patient presented with chest pain, underwent comprehensive examination and diagnostic tests. Treatment completed successfully.",
                status: "Completed",
                createdBy: "Jane Smith",
                createdDate: "2025-08-19 09:30:00",
                startedDate: "2025-08-19 10:00:00",
                completedDate: "2025-08-19 10:45:00",
                procedures: [
                    {
                        id: 1,
                        procedureCode: 'CONS-001',
                        description: 'General Consultation',
                        quantity: 1,
                        unitPrice: 150.00,
                        totalPrice: 150.00
                    },
                    {
                        id: 2,
                        procedureCode: 'LAB-045',
                        description: 'Complete Blood Count',
                        quantity: 1,
                        unitPrice: 75.00,
                        totalPrice: 75.00
                    },
                    {
                        id: 3,
                        procedureCode: 'RAD-123',
                        description: 'Chest X-Ray',
                        quantity: 1,
                        unitPrice: 200.00,
                        totalPrice: 200.00
                    },
                    {
                        id: 4,
                        procedureCode: 'LAB-089',
                        description: 'Cardiac Enzyme Panel',
                        quantity: 1,
                        unitPrice: 125.00,
                        totalPrice: 125.00
                    }
                ]
            };
            this.state.loading = false;
        }, 500);
    }

    get totalProcedures() {
        return this.state.treatment?.procedures?.length || 0;
    }

    get subtotal() {
        return this.state.treatment?.procedures?.reduce((sum, procedure) => sum + procedure.totalPrice, 0) || 0;
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
            case 'Completed':
                return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300`;
            case 'In Progress':
                return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300`;
            case 'Scheduled':
                return `${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300`;
            case 'Cancelled':
                return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300`;
            case 'On Hold':
                return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300`;
            case 'Draft':
                return `${baseClasses} bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300`;
            default:
                return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300`;
        }
    }

    getStatusColor(status) {
        switch (status) {
            case 'Completed':
                return 'bg-green-500';
            case 'In Progress':
                return 'bg-yellow-500';
            case 'Scheduled':
                return 'bg-blue-500';
            case 'Cancelled':
                return 'bg-red-500';
            case 'On Hold':
                return 'bg-gray-500';
            case 'Draft':
                return 'bg-orange-500';
            default:
                return 'bg-gray-500';
        }
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
        this.props.selectApp('treatments');
    }

    editTreatment() {
        this.props.selectApp('treatment-edit');
    }

    printTreatment() {
        console.log('Printing treatment...');
        // Implement print functionality
        window.print();
    }

    sendTreatment() {
        console.log('Sending treatment...');
        // Implement send functionality
    }

    downloadTreatment() {
        console.log('Downloading treatment...');
        // Implement download functionality
    }

    recordFollowup() {
        console.log('Recording followup...');
        // Implement followup recording functionality
    }

    cancelTreatment() {
        if (confirm('Are you sure you want to cancel this treatment? This action cannot be undone.')) {
            console.log('Cancelling treatment...');
            // Implement cancel functionality
        }
    }
}