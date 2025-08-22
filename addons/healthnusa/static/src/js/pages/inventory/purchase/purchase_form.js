/** @odoo-module **/

import { Component, useState, onMounted } from "@odoo/owl";

export class PurchaseForm extends Component {
    static template = "healthnusa.PurchaseForm";
    static props = {
        router: { type: Object, optional: false },
        selectApp: { type: Function, optional: false }
    };

    setup() {
        this.router = this.props.router;
        this.selectApp = this.props.selectApp;

        this.state = useState({
            purchaseId: this.generatePurchaseId(),
            date: this.getCurrentDate(),
            supplier: '',
            deliveryLocation: '',
            purchaseType: 'Standard Order',
            approvedBy: '',
            referenceNumber: '',
            costCenter: '',
            terms: 'Net 30 days',
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

    generatePurchaseId() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const time = String(now.getHours()).padStart(2, '0') + String(now.getMinutes()).padStart(2, '0');
        return `PO-${year}${month}${day}-${time}`;
    }

    getCurrentDate() {
        const now = new Date();
        return now.toISOString().split('T')[0];
    }

    get suppliers() {
        return [
            'MedSupply Corporation',
            'PharmaCorp Ltd',
            'TechMed Solutions',
            'Emergency Supply Co',
            'Global Medical Inc',
            'ICU Specialties',
            'SurgiTech Pro',
            'LabTech Systems',
            'QuickMed Supplies',
            'Universal Medical'
        ];
    }

    get deliveryLocations() {
        return [
            'Main Warehouse',
            'Pharmacy Department',
            'Emergency Department',
            'Surgery Department',
            'Laboratory',
            'ICU Department',
            'General Storage',
            'Receiving Dock',
            'Equipment Room',
            'Pediatrics Ward'
        ];
    }

    get purchaseTypes() {
        return [
            'Standard Order',
            'Emergency Order',
            'Bulk Order',
            'Recurring Order',
            'Special Request',
            'Direct Delivery',
            'Consignment',
            'Lease/Rental'
        ];
    }

    get approvalPersons() {
        return [
            'Dr. Sarah Johnson - Chief Pharmacist',
            'Dr. Michael Chen - Procurement Manager',
            'Lisa Anderson - Supply Chain Director',
            'David Martinez - Department Head',
            'Dr. Emily White - Medical Director',
            'Robert Chen - Purchasing Supervisor'
        ];
    }

    toggleAdditionalFields() {
        this.state.showAdditionalFields = !this.state.showAdditionalFields;
    }

    addInitialItems() {
        if (this.state.items.length === 0) {
            this.addItem('MED-001', 'Acetaminophen 500mg Tablets', 1000, 0.15);
            this.addItem('SUP-045', 'Surgical Gloves (Box)', 50, 12.50);
            this.addItem('EQP-123', 'Digital Thermometer', 25, 45.00);
        }
    }

    addItem(itemCode = '', description = '', quantity = 0, unitPrice = 0) {
        this.state.itemCounter++;
        const totalPrice = quantity * unitPrice;
        
        const item = {
            id: this.state.itemCounter,
            itemCode,
            description,
            quantity,
            unitPrice,
            totalPrice
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
            
            // Recalculate total price
            item.totalPrice = item.quantity * item.unitPrice;
            
            this.updateSummary();
        }
    }

    get totalItems() {
        return this.state.items.length;
    }

    get totalQuantity() {
        return this.state.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    get subtotal() {
        return this.state.items.reduce((sum, item) => sum + item.totalPrice, 0);
    }

    get taxAmount() {
        return this.subtotal * 0.10; // 10% tax
    }

    get totalAmount() {
        return this.subtotal + this.taxAmount;
    }

    updateSummary() {
        // This will trigger re-render of computed properties
        this.state.items = [...this.state.items];
    }

    getTotalAmountClass() {
        return 'text-lg font-bold text-blue-600 dark:text-blue-400';
    }

    getSubtotalClass() {
        return 'font-medium text-gray-800 dark:text-gray-100';
    }

    getTaxClass() {
        return 'font-medium text-orange-600 dark:text-orange-400';
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

    submitPurchase() {
        if (this.validateForm()) {
            console.log('Submitting purchase order...', this.collectFormData());
            // Implement submit logic
            this.showNotification('Purchase order submitted successfully', 'success');
            this.goBack();
        }
    }

    validateForm() {
        if (!this.state.supplier) {
            this.showNotification('Please select a supplier', 'error');
            return false;
        }
        if (!this.state.deliveryLocation) {
            this.showNotification('Please select a delivery location', 'error');
            return false;
        }
        if (!this.state.approvedBy) {
            this.showNotification('Please select an approver', 'error');
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
            purchaseId: this.state.purchaseId,
            date: this.state.date,
            supplier: this.state.supplier,
            deliveryLocation: this.state.deliveryLocation,
            purchaseType: this.state.purchaseType,
            approvedBy: this.state.approvedBy,
            referenceNumber: this.state.referenceNumber,
            costCenter: this.state.costCenter,
            terms: this.state.terms,
            notes: this.state.notes,
            items: this.state.items,
            summary: {
                totalItems: this.totalItems,
                totalQuantity: this.totalQuantity,
                subtotal: this.subtotal,
                taxAmount: this.taxAmount,
                totalAmount: this.totalAmount
            }
        };
    }

    showNotification(message, type) {
        // Simple notification implementation
        console.log(`${type.toUpperCase()}: ${message}`);
        // You can implement a proper notification system here
    }

    goBack() {
        this.selectApp('purchase');
    }

    onFieldChange(field, value) {
        this.state[field] = value;
    }
}