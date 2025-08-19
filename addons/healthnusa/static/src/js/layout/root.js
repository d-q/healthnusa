/** @odoo-module **/

import { Component, useState, onMounted } from "@odoo/owl";
import { Sidebar } from "./sidebar/sidebar";
import { Header } from "./main/header";
import { Breadcrumb } from "./main/breadcrumb";
import { Router } from "../services/router";

import { Appointment } from "../pages/service/appointment/appointment";
import { Dashboard } from "../pages/dashboard/dashboard";

import { Doctor } from "../pages/employee/doctor/doctor";
import { DoctorForm } from "../pages/employee/doctor/doctor_form";
import { DoctorDetail } from "../pages/employee/doctor/doctor_detail";

import { Nurse } from "../pages/employee/nurse/nurse";

import { Patient } from "../pages/service/patient/patient";
import { PatientDetail } from "../pages/service/patient/patient_detail";
import { PatientForm } from "../pages/service/patient/patient_form";

import { Payment } from "../pages/service/payment/payment"
import { NotFound } from "../pages/error/not_found";
import { Profile } from "../pages/profile/profile";
import { Medicines } from "../pages/inventory/medicines/medicines";
import { Services } from "../pages/inventory/services/services";
import { Supplies } from "../pages/inventory/supplies/supplies";
import { Adjustment } from "../pages/inventory/adjustment/adjustment";
import { AdjustmentForm } from "../pages/inventory/adjustment/adjustment_form";
import { AdjustmentDetail } from "../pages/inventory/adjustment/adjustment_detail";
import { Staff } from "../pages/employee/staff/staff";
import { StaffDetail } from "../pages/employee/staff/staff_detail";
import { StaffForm } from "../pages/employee/staff/staff_form";
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
        DoctorForm,
        DoctorDetail,

        Nurse,
        Patient,
        PatientDetail,
        PatientForm,

        Payment,
        Profile,
        Medicines,
        Services,
        Supplies,
        Adjustment,
        AdjustmentForm,
        AdjustmentDetail,
        Staff,
        StaffDetail,
        StaffForm,
        Settings,
        NotFound,
    }

    setup() {
        this.router = new Router();

        this.apps = [
            { id: "dashboard", icon: "dashboard", name: "Dashboard", Component: Dashboard, category: "Service" },
            { id: "appointment", icon: "event_note", name: "Appointment", Component: Appointment, category: "Service" },
            { id: "patient", icon: "personal_injury", name: "Patient", Component: Patient, category: "Service" },
            { id: "payment", icon: "payments", name: "Payment", Component: Payment, category: "Service" },
            
            { id: "doctor", icon: "assignment_ind", name: "Doctor", Component: Doctor, category: "Employee" },
            { id: "staff", icon: "badge", name: "Staff", Component: Staff, category: "Employee" },

            { id: "medicines", icon: "vaccines", name: "Medicines", Component: Medicines, category: "Inventory" },
            { id: "services", icon: "medical_services", name: "Services", Component: Services, category: "Inventory" },
            { id: "supplies", icon: "inventory_2", name: "Supplies", Component: Supplies, category: "Inventory" },
            { id: "adjustment", icon: "tune", name: "Adjustment", Component: Adjustment, category: "Inventory" },
            
            { id: "profile", icon: "person", name: "Profile", Component: Profile, category: "Account" },
            { id: "settings", icon: "settings", name: "Settings", Component: Settings, category: "Account" },
        ];

        this.subRoutes = [
            {
                path: '/doctor/new',
                id: "doctor-new",
                Component: DoctorForm,
                parent: 'doctor',
                showBackButton: true
            },
            {
                path: '/doctor/edit',
                id: "doctor-edit",
                Component: DoctorForm,
                parent: 'doctor',
                showBackButton: true
            },
            {
                path: '/doctor/detail',
                id: "doctor-detail",
                Component: DoctorDetail,
                parent: 'doctor',
                showBackButton: true
            },
            {
                path: '/patient/detail',
                id: "patient-detail",
                Component: PatientDetail,
                parent: 'patient',
                showBackButton: true
            },
            {
                path: '/patient/new',
                id: "patient-new",
                Component: PatientForm,
                parent: 'patient',
                showBackButton: true
            },
            {
                path: '/patient/edit',
                id: "patient-edit",
                Component: PatientForm,
                parent: 'patient',
                showBackButton: true
            },
            {
                path: '/staff/detail',
                id: "staff-detail",
                Component: StaffDetail,
                parent: 'staff',
                showBackButton: true
            },
            {
                path: '/staff/new',
                id: "staff-new",
                Component: StaffForm,
                parent: 'staff',
                showBackButton: true
            },
            {
                path: '/staff/edit',
                id: "staff-edit",
                Component: StaffForm,
                parent: 'staff',
                showBackButton: true
            },
            {
                path: '/adjustment/new',
                id: "adjustment-new",
                Component: AdjustmentForm,
                parent: 'adjustment',
                showBackButton: true
            },
            {
                path: '/adjustment/edit',
                id: "adjustment-edit",
                Component: AdjustmentForm,
                parent: 'adjustment',
                showBackButton: true
            },
            {
                path: '/adjustment/detail',
                id: "adjustment-detail",
                Component: AdjustmentDetail,
                parent: 'adjustment',
                showBackButton: true
            },
        ];

        this.registerRoutes();
        this.initializeRouteMappings();
        
        // Register 404 route
        this.router.registerNotFound({
            id: "not-found",
            name: "Page Not Found",
            Component: NotFound
        });

        this.state = useState({
            currentApp: null,
            currentRoute: null,
            isDarkMode: false,
            isSidebarCollapsed: false,
            showBackButton: false,
            previousApp: null,
        });

        // Listen to route changes
        this.router.addListener((route) => {
            if (this.state.currentRoute && this.state.currentRoute.id !== route.id) {
                this.state.previousApp = this.state.currentApp?.id;
            }

            this.state.currentRoute = route;

            const subRoute = this.subRoutes.find(sr => sr.id === route.id);
            if (subRoute) {
                this.state.currentApp = this.apps.find(app => app.id === subRoute.parent);
                this.state.showBackButton = subRoute.showBackButton;
            } else {
                this.state.currentApp = route;
                this.state.showBackButton = false;
            }
        });

        // Bind methods to preserve context
        this.selectApp = this.selectApp.bind(this);

        onMounted(() => {
            this.router.handleRoute();
            this.initDarkMode();
        });
    }

    registerRoutes() {
        this.apps.forEach(app => {
            this.router.register(`/${app.id}`, app);
        });

        this.subRoutes.forEach(route => {
            this.router.register(route.path, { id: route.id, Component: route.Component });
        });
    }

    initializeRouteMappings() {
        this.routeMappings = {};
        this.subRoutes.forEach(route => {
            this.routeMappings[route.id] = route.path;
        });
    }

    selectApp(appId) {
        if (!appId) {
            console.error('selectApp: appId is required');
            return;
        }

        const routePath = this.routeMappings[appId] || `/${appId}`;

        const isValidRoute = this.apps.some(app => app.id === appId) ||
            this.subRoutes.some(route => route.id === appId);

        if (!isValidRoute) {
            console.warn(`selectApp: Route '${appId}' not found in registered apps or sub-routes`);
        }

        this.router.navigate(routePath);
    }

    initDarkMode() {
        try {
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
        } catch (error) {
            console.warn('initDarkMode: Failed to access localStorage', error);
            this.state.isDarkMode = false;
        }
    }

    toggleDarkMode() {
        try {
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
        } catch (error) {
            console.warn('toggleDarkMode: Failed to access localStorage', error);
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