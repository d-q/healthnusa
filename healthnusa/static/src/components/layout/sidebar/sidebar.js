/** @odoo-module **/

import { Component } from "@odoo/owl";

export class Sidebar extends Component {
    static template = "healthnusa.Sidebar";
    static props = {
        currentApp: String,
        apps: Array,
        expanded: Boolean,
        darkMode: Boolean,
        isMobile: Boolean,
    };

    setup() {
        // Close mobile sidebar when clicking outside
        this.onDocumentClick = this.onDocumentClick.bind(this);
        document.addEventListener('click', this.onDocumentClick);
    }

    onWillUnmount() {
        document.removeEventListener('click', this.onDocumentClick);
    }

    onDocumentClick(event) {
        if (this.props.isMobile && !event.target.closest('#sidebar') && !event.target.closest('#menu-toggle')) {
            this.closeMobileSidebar();
        }
    }

    closeMobileSidebar() {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('mobile-overlay');
        
        if (sidebar && overlay) {
            sidebar.classList.remove('show');
            overlay.classList.remove('show');
        }
    }

    handleLogout() {
        // Show confirmation dialog
        if (confirm('Are you sure you want to sign out?')) {
            // Clear any stored user data
            localStorage.removeItem('hospital-theme');
            localStorage.removeItem('hospital-sidebar');            
            // In a real Odoo environment, you would call the logout endpoint
            // For now, we'll redirect to the login page or reload
            window.location.href = '/web/login';
        }
    }
}