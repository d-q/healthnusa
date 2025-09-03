/** @odoo-module **/

import { Component, useState, onMounted } from "@odoo/owl";

export class LaboratoryDetail extends Component {
    static template = "healthnusa.LaboratoryDetail";
    static props = {
        router: { type: Object, optional: false },
        selectApp: { type: Function, optional: false },
        laboratoryId: { type: [Number, String], optional: true }
    };

    setup() {
        this.router = this.props.router;

        this.state = useState({
            loading: true,
            laboratory: null
        });

        onMounted(async () => {
            await this.loadLaboratoryData();
        });
    }

    async loadLaboratoryData() {
        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Sample laboratory data - in real app, this would come from API
        const laboratoryData = {
            id: 1,
            labNumber: 'LAB-20241201-1430',
            testDate: '2024-12-01',
            collectionDate: '2024-12-01T08:30:00',
            patient: 'John Anderson',
            patientId: 'MRN001',
            technician: 'Lab Tech. Sarah Wilson',
            specimenType: 'Blood',
            priority: 'Routine',
            testType: 'Blood Test',
            status: 'Completed',
            notes: 'Patient fasted for 12 hours before test. Results are within normal limits. Follow-up recommended in 6 months.',
            tests: [
                {
                    id: 1,
                    testCode: 'CBC-001',
                    testName: 'White Blood Cell Count',
                    normalRange: '4.5-11.0 x10^9/L',
                    result: '6.8 x10^9/L',
                    unitPrice: 25.00
                },
                {
                    id: 2,
                    testCode: 'CBC-002',
                    testName: 'Red Blood Cell Count',
                    normalRange: '4.5-5.5 x10^12/L',
                    result: '4.8 x10^12/L',
                    unitPrice: 25.00
                },
                {
                    id: 3,
                    testCode: 'CBC-003',
                    testName: 'Hemoglobin',
                    normalRange: '135-175 g/L',
                    result: '148 g/L',
                    unitPrice: 20.00
                },
                {
                    id: 4,
                    testCode: 'CBC-004',
                    testName: 'Hematocrit',
                    normalRange: '0.40-0.50',
                    result: '0.44',
                    unitPrice: 15.00
                }
            ]
        };

        this.state.laboratory = laboratoryData;
        this.state.loading = false;
    }

    get totalTests() {
        return this.state.laboratory?.tests?.length || 0;
    }

    get subtotal() {
        return this.state.laboratory?.tests?.reduce((sum, test) => sum + test.unitPrice, 0) || 0;
    }

    get taxAmount() {
        return this.subtotal * 0.10; // 10% tax
    }

    get totalAmount() {
        return this.subtotal + this.taxAmount;
    }

    formatCurrency(value) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        }).format(value);
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    formatDateTime(dateTimeString) {
        const date = new Date(dateTimeString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    getStatusClass(status) {
        const baseClasses = "text-xs font-semibold px-3 py-1.5 rounded-full inline-flex items-center";
        switch (status) {
            case 'Completed':
                return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300`;
            case 'In Progress':
                return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300`;
            case 'Sample Collected':
                return `${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300`;
            case 'Cancelled':
                return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300`;
            case 'Pending':
                return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300`;
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
            case 'Sample Collected':
                return 'bg-blue-500';
            case 'Cancelled':
                return 'bg-red-500';
            case 'Pending':
                return 'bg-gray-500';
            default:
                return 'bg-gray-500';
        }
    }

    editLaboratory() {
        this.props.selectApp('laboratory-edit');
    }

    printLaboratory() {
        console.log('Printing laboratory test:', this.state.laboratory.id);
    }

    downloadLaboratory() {
        console.log('Downloading laboratory test:', this.state.laboratory.id);
    }

    goBack() {
        this.props.selectApp('laboratories');
    }
}