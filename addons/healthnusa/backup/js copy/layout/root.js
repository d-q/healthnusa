/** @odoo-module **/

import { Component, useState, onMounted } from "@odoo/owl";
import { Sidebar } from "./sidebar/sidebar";
import { Header } from "./main/header";
import { Breadcrumb } from "./main/breadcrumb";
import { Router } from "../services/router";

import { Appointment } from "../pages/appointment/appointment";
import { Dashboard } from "../pages/dashboard/dashboard";

import { Doctor } from "../pages/doctor/doctor";
import { DoctorNew } from "../pages/doctor/doctor_form";
import { DoctorDetail } from "../pages/doctor/doctor_detail";

import { Nurse } from "../pages/nurse/nurse";
import { Patient } from "../pages/patient/patient";
import { Payment } from "../pages/payment/payment"
import { Profile } from "../pages/profile/profile";
import { Room } from "../pages/room/room";
import { Staff } from "../pages/staff/staff";
import { Settings } from "../pages/settings/settings";

export class Root extends Component {
    static template = "healthnusa.Root";
    static components = {
        Sidebar,
        Breadcrumb,
        Header,

        Appointment,
        Dashboard,

        Doctor,
        DoctorNew,
        DoctorDetail,

        Nurse,
        Patient,
        Payment,
        Profile,
        Room,
        Staff,
        Settings,
    }

    setup() {
        this.router = new Router();

        this.apps = [
            { id: "dashboard", icon: "dashboard", name: "Dashboard", Component: Dashboard, category: "Service" },
            { id: "appointment", icon: "event_note", name: "Appointment", Component: Appointment, category: "Service" },
            { id: "doctor", icon: "badge", name: "Doctor", Component: Doctor, category: "Service" },
            { id: "patient", icon: "personal_injury", name: "Patient", Component: Patient, category: "Service" },
            { id: "payment", icon: "payments", name: "Payment", Component: Payment, category: "Service" },
            { id: "room", icon: "king_bed", name: "Room", Component: Room, category: "Service" },
            { id: "profile", icon: "person", name: "Profile", Component: Profile, category: "Menu" },
            { id: "settings", icon: "settings", name: "Settings", Component: Settings, category: "Menu" },
        ];

        // Register routes
        this.apps.forEach(app => {
            this.router.register(`/${app.id}`, app);
            this.router.register('/doctor/new', { id: "doctor-new", Component: DoctorNew });
            this.router.register('/doctor/edit', { id: "doctor-edit", Component: DoctorNew });
            this.router.register('/doctor/detail', { id: "doctor-detail", Component: DoctorDetail });
        });

        // Initialize with null, will be set by router
        this.state = useState({
            currentApp: null,
            currentRoute: null,
            isDarkMode: false,
            isSidebarCollapsed: false,
            showBackButton: false,
            previousApp: null
        });

        // Route mappings for sub-routes
        this.routeMappings = {
            'doctor-detail': '/doctor/detail',
            'doctor-edit': '/doctor/edit',
            'doctor-new': '/doctor/new'
        };

        // Sub-routes that should map to their parent app in sidebar
        this.subRouteParents = {
            'doctor-new': 'doctor',
            'doctor-edit': 'doctor',
            'doctor-detail': 'doctor'
        };

        // Routes that should show the back button
        this.detailRoutes = ['doctor-detail', 'doctor-new', 'doctor-edit'];

        // Listen to route changes
        this.router.addListener((route) => {
            // Store previous app for back navigation
            if (this.state.currentRoute && this.state.currentRoute.id !== route.id) {
                this.state.previousApp = this.state.currentApp?.id;
            }

            this.state.currentRoute = route;

            // Check if this is a sub-route that should show parent app as active
            const parentAppId = this.subRouteParents[route.id];
            if (parentAppId) {
                this.state.currentApp = this.apps.find(app => app.id === parentAppId);
            } else {
                this.state.currentApp = route;
            }

            // Show back button on detail/form routes
            this.state.showBackButton = this.detailRoutes.includes(route.id);
        });

        // Bind methods to preserve context
        this.selectApp = this.selectApp.bind(this);

        onMounted(() => {
            this.router.handleRoute(); // Handle initial route
            this.initDarkMode();
        });
    }

    selectApp(appId) {
        const routePath = this.routeMappings[appId] || `/${appId}`;
        this.router.navigate(routePath);
    }

    initDarkMode() {
        const savedMode = localStorage.getItem("darkMode");
        const html = document.documentElement;
        const body = document.body;

        if (savedMode === "true") {
            this.state.isDarkMode = true;
            html.classList.add("dark");
            body.classList.add("dark");
        } else {
            this.state.isDarkMode = false;
            html.classList.remove("dark");
            body.classList.remove("dark");
            if (savedMode === null) {
                localStorage.setItem("darkMode", "false");
            }
        }
    }

    toggleDarkMode() {
        const html = document.documentElement;
        const body = document.body;

        if (this.state.isDarkMode) {
            this.state.isDarkMode = false;
            html.classList.remove("dark");
            body.classList.remove("dark");
            localStorage.setItem("darkMode", "false");
        } else {
            this.state.isDarkMode = true;
            html.classList.add("dark");
            body.classList.add("dark");
            localStorage.setItem("darkMode", "true");
        }
    }

    toggleSidebar() {
        this.state.isSidebarCollapsed = !this.state.isSidebarCollapsed;
    }

    onDocumentClick(event) {
        // Don't close if clicking on a dropdown button
        if (event.target.closest('button[title="More Actions"]') || event.target.closest('.dropdown-menu')) {
            return;
        }

        document.querySelectorAll(".dropdown-menu").forEach((menu) => {
            menu.classList.add("hidden");
        });
    }
}