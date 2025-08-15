/** @odoo-module **/

import { Component } from "@odoo/owl";

export class NotFound extends Component {
    static template = "healthnusa.NotFound";
    static props = {
        router: { type: Object, optional: false },
        selectApp: { type: Function, optional: false }
    };

    setup() {
        this.router = this.props.router;
        this.invalidPath = window.location.pathname;
    }

    goHome() {
        this.props.selectApp('dashboard');
    }

    goBack() {
        window.history.back();
    }

    // Suggest similar routes based on the invalid path
    get suggestedRoutes() {
        const path = this.invalidPath.toLowerCase();
        const suggestions = [];
        
        if (path.includes('doctor')) suggestions.push({ name: 'Doctors', id: 'doctor' });
        if (path.includes('patient')) suggestions.push({ name: 'Patients', id: 'patient' });
        if (path.includes('appointment')) suggestions.push({ name: 'Appointments', id: 'appointment' });
        if (path.includes('payment')) suggestions.push({ name: 'Payments', id: 'payment' });
        if (path.includes('room')) suggestions.push({ name: 'Rooms', id: 'room' });
        
        return suggestions;
    }

    navigateToSuggestion(routeId) {
        this.props.selectApp(routeId);
    }
}