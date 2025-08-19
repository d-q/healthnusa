/** @odoo-module **/

import { Component, useState, onMounted } from "@odoo/owl";

export class AdjustmentForm extends Component {
    static template = "healthnusa.AdjustmentForm";
    static props = {
        router: { type: Object, optional: false },
        selectApp: { type: Function, optional: false }
    };

    setup() {
        this.router = this.props.router;
        this.selectApp = this.props.selectApp;

        this.state = useState({
            adjustmentId: this.generateAdjustmentId(),
            date: this.getCurrentDate(),
            department: '',
            storageLocation: '',
            adjustmentType: 'Physical Count',
            authorizedBy: '',
            referenceNumber: '',
            costCenter: '',
            batchTracking: 'Enable batch tracking',
            notes: '',
            showAdditionalFields: false,
            items: [],
            itemCounter: 0
        });

        onMounted(() => {
            this.addInitialItems();
            this.updateSummary();
        });
    }

    generateAdjustmentId() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const time = String(now.getHours()).padStart(2, '0') + String(now.getMinutes()).padStart(2, '0');
        return `ADJ-${year}${month}${day}-${time}`;
    }

    getCurrentDate() {
        const now = new Date();
        return now.toISOString().split('T')[0];
    }

    get departments() {
        return [
            'Pharmacy',
            'Emergency Department',
            'Surgery Department',
            'Cardiology Department',
            'Laboratory',
            'Radiology',
            'ICU',
            'General Ward',
            'Pediatrics',
            'Orthopedics'
        ];
    }

    get storageLocations() {
        return [
            'Main Pharmacy Storage',
            'Emergency Supply Room',
            'OR Supply Room',
            'Lab Storage',
            'General Storage A',
            'General Storage B',
            'Refrigerated Storage',
            'Controlled Substances Safe',
            'ICU Supply Room',
            'Pediatric Supply Room'
        ];
    }

    get adjustmentTypes() {
        return [
            'Physical Count',
            'Damaged/Expired Items',
            'Lost/Stolen Items',
            'Found Items',
            'Department Transfer',
            'Supplier Return',
            'Usage Correction',
            'Other'
        ];
    }

    get authorizedPersons() {
        return [
            'Dr. Sarah Johnson - Chief Pharmacist',
            'Dr. Michael Chen - Inventory Manager',
            'Lisa Anderson - Supply Chain Director',
            'David Martinez - Department Head',
            'Dr. Emily White - Assistant Director',
            'Robert Chen - Pharmacy Supervisor'
        ];
    }

    toggleAdditionalFields() {
        this.state.showAdditionalFields = !this.state.showAdditionalFields;
    }

    addInitialItems() {
        if (this.state.items.length === 0) {
            this.addItem('MED-001', 'Acetaminophen 500mg Tablets', 1000, 985, 0.15);
            this.addItem('SUP-045', 'Surgical Gloves (Box)', 50, 47, 12.50);
            this.addItem('EQP-123', 'Digital Thermometer', 25, 28, 45.00);
        }
    }

    addItem(itemCode = '', description = '', currentStock = 0, actualCount = 0, unitCost = 0) {
        this.state.itemCounter++;
        const variance = actualCount - currentStock;
        const totalImpact = variance * unitCost;
        
        const item = {
            id: this.state.itemCounter,
            itemCode,
            description,
            currentStock,
            actualCount,
            variance,
            unitCost,
            totalImpact
        };
        
        this.state.items.push(item);
        this.updateSummary();
    }

    removeItem(itemId) {
        const index = this.state.items.findIndex(item => item.id === itemId);
        if (index > -1) {
            this.state.items.splice(index, 1);
            this.updateSummary();
        }
    }

    updateItemField(itemId, field, value) {
        const item = this.state.items.find(i => i.id === itemId);
        if (item) {
            item[field] = value;
            
            // Recalculate variance and impact
            item.variance = item.actualCount - item.currentStock;
            item.totalImpact = item.variance * item.unitCost;
            
            this.updateSummary();
        }
    }

    get totalItems() {
        return this.state.items.length;
    }

    get positiveAdjustments() {
        return this.state.items.filter(item => item.variance > 0).length;
    }

    get negativeAdjustments() {
        return this.state.items.filter(item => item.variance < 0).length;
    }

    get totalValueImpact() {
        return Math.abs(this.state.items.reduce((sum, item) => sum + Math.abs(item.totalImpact), 0));
    }

    get netImpact() {
        return this.state.items.reduce((sum, item) => sum + item.totalImpact, 0);
    }

    updateSummary() {
        // This will trigger re-render of computed properties
        this.state.items = [...this.state.items];
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

    saveDraft() {
        console.log('Saving draft...', this.collectFormData());
        // Implement save draft logic
        this.showNotification('Draft saved successfully', 'success');
    }

    submitAdjustment() {
        if (this.validateForm()) {
            console.log('Submitting adjustment...', this.collectFormData());
            // Implement submit logic
            this.showNotification('Adjustment submitted successfully', 'success');
            this.goBack();
        }
    }

    validateForm() {
        if (!this.state.department) {
            this.showNotification('Please select a department', 'error');
            return false;
        }
        if (!this.state.storageLocation) {
            this.showNotification('Please select a storage location', 'error');
            return false;
        }
        if (!this.state.authorizedBy) {
            this.showNotification('Please select an authorized person', 'error');
            return false;
        }
        if (this.state.items.length === 0) {
            this.showNotification('Please add at least one item', 'error');
            return false;
        }
        return true;
    }

    collectFormData() {
        return {
            adjustmentId: this.state.adjustmentId,
            date: this.state.date,
            department: this.state.department,
            storageLocation: this.state.storageLocation,
            adjustmentType: this.state.adjustmentType,
            authorizedBy: this.state.authorizedBy,
            referenceNumber: this.state.referenceNumber,
            costCenter: this.state.costCenter,
            batchTracking: this.state.batchTracking,
            notes: this.state.notes,
            items: this.state.items,
            summary: {
                totalItems: this.totalItems,
                positiveAdjustments: this.positiveAdjustments,
                negativeAdjustments: this.negativeAdjustments,
                totalValueImpact: this.totalValueImpact,
                netImpact: this.netImpact
            }
        };
    }

    showNotification(message, type) {
        // Simple notification implementation
        console.log(`${type.toUpperCase()}: ${message}`);
        // You can implement a proper notification system here
    }

    goBack() {
        this.selectApp('adjustment');
    }

    onFieldChange(field, value) {
        this.state[field] = value;
    }
}