/** @odoo-module **/

import { Component } from "@odoo/owl";

export class Header extends Component {
    static template = "healthnusa.Header";
    static props = {
        state: Object,
        toggleSidebar: Function,
        toggleDarkMode: Function,
        selectApp: Function,
    };

    get state() {
        return this.props.state;
    }

    toggleSidebar() {
        this.props.toggleSidebar();
    }

    toggleDarkMode() {
        this.props.toggleDarkMode();
    }
    
    openProfile() {
        // Navigate to profile page using the router
        this.props.selectApp('profile');
    }

    goBack() {
        // Handle back navigation
        if (this.props.state.previousApp) {
            // Navigate to the previous app
            this.props.selectApp(this.props.state.previousApp);
        } else {
            // Default fallback - go to dashboard or first available app
            this.props.selectApp('dashboard');
        }
    }
}