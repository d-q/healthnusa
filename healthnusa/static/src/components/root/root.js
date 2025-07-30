/** @odoo-module **/

import { Component, useState, onWillStart } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { user } from "@web/core/user";

import { HeaderComponent } from "../layout/header/header";
import { Sidebar } from "../layout/sidebar/sidebar";
import { MainLayout } from "../layout/main_layout/main_layout";

import { Dashboard } from "../pages/dashboard/dashboard";

import { DoctorRoot } from "../pages/doctor/doctor_root/doctor_root";

import { Appointments } from "../pages/appointment/appointment";
import { Prescriptions } from "../pages/prescriptions/prescriptions";
import { Payment } from "../pages/payment/payment";
import { Insurance } from "../pages/insurance/insurance";
import { Patient } from "../pages/patient/patient";
import { Staff } from "../pages/staff/staff";
import { Inventory } from "../pages/inventory/inventory";
import { Profile } from "../pages/profile/profile";
import { Settings } from "../pages/settings/settings";
import { Support } from "../pages/support/support";

export class Root extends Component {
    static template = "healthnusa.Root";
    static props = {};
    static components = {
        HeaderComponent,
        Sidebar,
        MainLayout
    };

    setup() {
        this.orm = useService("orm");
        this.apps = [
            { id: "patient", icon: "person_add", name: "Patient", href: "/healthnusa/patient", Component: Patient, category: "Service" },
            { id: "appointments", icon: "event_note", name: "Appointments", href: "/healthnusa/appointments", Component: Appointments, category: "Service" },
            { id: "prescriptions", icon: "medication", name: "Prescriptions", href: "/healthnusa/prescriptions", Component: Prescriptions, category: "Service" },
            { id: "lab", icon: "science", name: "Lab Results", href: "/healthnusa/patient", Component: Patient, category: "Service" },            
            { id: "radiology", icon: "camera_alt", name: "Radiology", href: "/healthnusa/patient", Component: Patient, category: "Service" },
            { id: "payment", icon: "payment", name: "Invoices", href: "/healthnusa/payment", Component: Payment, category: "Service" },
            
            { id: "dashboard", icon: "dashboard", name: "Dashboard", href: "/healthnusa", Component: Dashboard, category: "Menu" },
            { id: "doctors", icon: "people", name: "Doctors", href: "/healthnusa/doctors", Component: DoctorRoot, category: "Menu" },
            { id: "staff", icon: "badge", name: "Staff", href: "/healthnusa/staff", Component: Staff, category: "Menu" },
            { id: "inventory", icon: "inventory", name: "Inventory", href: "/healthnusa/inventory", Component: Inventory, category: "Menu" },
            { id: "accounting", icon: "payment", name: "Accounting", href: "/healthnusa/payment", Component: Payment, category: "Menu" },
            { id: "insurance", icon: "account_balance", name: "Insurance", href: "/healthnusa/insurance", Component: Insurance, category: "Menu" },
            { id: "settings", icon: "settings", name: "Settings", href: "/healthnusa/settings", Component: Settings, category: "Menu" },
            // { id: "support", icon: "help_outline", name: "Support", href: "/healthnusa/support", Component: Support, category: "Menu" },

            { id: "profile", icon: "person", name: "Profile", href: "/healthnusa/profile", Component: Profile, category: "Menu" },
        ];

        this.state = useState({
            currentApp: this.apps.filter(app => app.id === odoo.values.id)[0] || this.apps[0],
            isMobile: window.innerWidth < 768,
        });


        onWillStart(async () => {
            const resUsers = await this.orm.searchRead(
                "res.users",
                [['id', '=', user.userId]],
                [
                    "dark_mode",
                    "sidebar_expanded",
                ]
            );
            this.state.darkMode = resUsers[0].dark_mode;
            this.state.sidebarExpanded = resUsers[0].sidebar_expanded;

            if (this.state.darkMode) {
                document.documentElement.classList.add('dark');
                document.body.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
                document.body.classList.remove('dark');
            }
        })

        // Setup responsive handler
        this.setupResponsiveHandler();
    }

    setupResponsiveHandler() {
        const handleResize = () => {
            this.state.isMobile = window.innerWidth < 768;
        };

        window.addEventListener('resize', handleResize);

        // Cleanup on unmount
        this.env.bus.addEventListener('destroy', () => {
            window.removeEventListener('resize', handleResize);
        });
    }

    async toggleSidebar() {
        if (this.state.isMobile) {
            this.toggleMobileSidebar();
        } else {
            this.state.sidebarExpanded = !this.state.sidebarExpanded;
            await this.orm.write("res.users", [user.userId], {
                sidebar_expanded: this.state.sidebarExpanded,
            });
        }
    }

    toggleMobileSidebar() {
        // Mobile sidebar logic will be handled in CSS/DOM
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('mobile-overlay');

        if (sidebar && overlay) {
            sidebar.classList.toggle('show');
            overlay.classList.toggle('show');
        }
    }

    async toggleDarkMode() {
        this.state.darkMode = !this.state.darkMode;
        await this.orm.write("res.users", [user.userId], {
            dark_mode: this.state.darkMode,
        });

        // Apply dark mode to document body and html
        if (this.state.darkMode) {
            document.documentElement.classList.add('dark');
            document.body.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
            document.body.classList.remove('dark');
        }

        // Save theme preference
        localStorage.setItem('hospital-theme', this.state.darkMode ? 'dark' : 'light');
    }

    // Add navigation method to Profile
    navigateToProfile() {
        const profileApp = this.apps.find(app => app.id === "profile");
        if (profileApp) {
            this.state.currentApp = profileApp;
            // Update browser URL if using history API
            if (window.history && window.history.pushState) {
                window.history.pushState(null, '', profileApp.href);
            }
        }
    }
}