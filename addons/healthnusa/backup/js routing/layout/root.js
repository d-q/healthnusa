/** @odoo-module **/

import { Component, useState, onMounted } from "@odoo/owl";
import { Sidebar } from "./sidebar/sidebar";
import { Header } from "./main/header";
import { Breadcrumb } from "./main/breadcrumb";

import { Appointment } from "../pages/appointment/appointment";
import { Dashboard } from "../pages/dashboard/dashboard";
import { Doctor } from "../pages/doctor/doctor";
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
        Nurse,
        Patient,
        Payment,
        Profile,
        Room,
        Staff,
        Settings,
    }

    setup() {
        this.apps = [
            { id: "appointment", icon: "event_note", name: "Appointment", Component: Appointment, category: "Service" },
            { id: "dashboard", icon: "dashboard", name: "Dashboard", Component: Dashboard, category: "Service" },
            { id: "staff", icon: "badge", name: "Staff", Component: Doctor, category: "Service" },
            { id: "patient", icon: "personal_injury", name: "Patient", Component: Patient, category: "Service" },
            { id: "payment", icon: "payments", name: "Payment", Component: Payment, category: "Service" },
            { id: "room", icon: "king_bed", name: "Room", Component: Room, category: "Service" },
            { id: "profile", icon: "person", name: "Profile", Component: Profile, category: "Menu" },
            { id: "settings", icon: "settings", name: "Settings", Component: Settings, category: "Menu" },
        ];

        this.state = useState({
            currentApp: this.apps[0],
            isDarkMode: false,
            isSidebarCollapsed: false
        });

        onMounted(() => {
            this.initDarkMode();
        });
    }

    selectApp(appId) {
        const newApp = this.apps.find((app) => app.id === appId);
        this.state.currentApp = newApp;
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

    onDocumentClick() {
        document.querySelectorAll(".dropdown-menu").forEach((menu) => {
            menu.classList.remove("show");
        });
    }
}