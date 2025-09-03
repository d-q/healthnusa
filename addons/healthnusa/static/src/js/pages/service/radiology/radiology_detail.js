/** @odoo-module **/

import { Component, useState, onMounted } from "@odoo/owl";

export class RadiologyDetail extends Component {
    static template = "healthnusa.RadiologyDetail";
    static props = {
        router: { type: Object, optional: false },
        selectApp: { type: Function, optional: false },
        radiologyId: { type: [Number, String], optional: true }
    };

    setup() {
        this.router = this.props.router;

        this.state = useState({
            loading: true,
            radiology: null
        });

        onMounted(async () => {
            await this.loadRadiologyData();
        });
    }

    async loadRadiologyData() {
        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Sample radiology data - in real app, this would come from API
        const radiologyData = {
            id: 1,
            studyNumber: 'RAD-20241201-1430',
            studyDate: '2024-12-01',
            studyTime: '14:30',
            patient: 'John Anderson',
            patientId: 'MRN001',
            radiologist: 'Dr. James Wilson',
            technician: 'Rad Tech. Maria Santos',
            bodyPart: 'Chest',
            imagingType: 'X-Ray',
            status: 'Report Ready',
            contrastUsed: false,
            indication: 'Patient presents with chest pain and persistent dry cough for 2 weeks. No fever. Physical examination reveals clear lung sounds bilaterally.',
            description: 'Chest X-Ray PA and Lateral views to evaluate for pneumonia, pleural effusion, or other chest pathology.',
            notes: 'Patient has no known allergies to contrast media. Previous chest imaging from 6 months ago was within normal limits. Patient is cooperative and able to follow breathing instructions.',
            procedures: [
                {
                    id: 1,
                    procedureCode: 'XR-CHEST-001',
                    procedureName: 'Chest X-Ray PA View',
                    views: 'PA (Posterior-Anterior)',
                    unitPrice: 125.00
                },
                {
                    id: 2,
                    procedureCode: 'XR-CHEST-002',
                    procedureName: 'Chest X-Ray Lateral View',
                    views: 'Lateral',
                    unitPrice: 95.00
                },
                {
                    id: 3,
                    procedureCode: 'XR-CHEST-003',
                    procedureName: 'Additional Oblique View',
                    views: 'Right Oblique',
                    unitPrice: 75.00
                }
            ]
        };

        this.state.radiology = radiologyData;
        this.state.loading = false;
    }

    get totalProcedures() {
        return this.state.radiology?.procedures?.length || 0;
    }

    get subtotal() {
        return this.state.radiology?.procedures?.reduce((sum, procedure) => sum + procedure.unitPrice, 0) || 0;
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
            case 'Report Ready':
                return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300`;
            case 'In Progress':
                return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300`;
            case 'Scheduled':
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
            case 'Report Ready':
                return 'bg-green-500';
            case 'In Progress':
                return 'bg-yellow-500';
            case 'Scheduled':
                return 'bg-blue-500';
            case 'Cancelled':
                return 'bg-red-500';
            case 'Pending':
                return 'bg-gray-500';
            default:
                return 'bg-gray-500';
        }
    }

    editRadiology() {
        this.props.selectApp('radiology-edit');
    }

    printRadiology() {
        console.log('Printing imaging study:', this.state.radiology.id);
    }

    downloadRadiology() {
        console.log('Downloading imaging study:', this.state.radiology.id);
    }

    goBack() {
        this.props.selectApp('radiologies');
    }
}