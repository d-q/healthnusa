/** @odoo-module **/

import { Component } from "@odoo/owl";

export class HeaderComponent extends Component {
    static template = "healthnusa.HeaderComponent";
    static props = {
        currentApp: Object,
        toggleSidebar: Function,
        toggleDarkMode: Function,
        darkMode: Boolean,
        pageSubtitle: String,
        pageTitle: String,
        navigateToProfile: Function, // Add new prop for navigation
    };

    onMenuToggle() {
        this.props.toggleSidebar();
    }

    onThemeToggle() {
        this.props.toggleDarkMode();
    }

    onProfileClick() {
        this.props.navigateToProfile();
    }
}