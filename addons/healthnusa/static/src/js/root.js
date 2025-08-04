/** @odoo-module **/

import { Component, useState, onMounted } from "@odoo/owl";

import { HeaderComponent } from "../layout/header/header";
import { Sidebar } from "../layout/sidebar/sidebar";
import { MainLayout } from "../layout/main_layout/main_layout";

import { Dashboard } from "../pages/dashboard/dashboard";
import { Doctor } from "../pages/doctor/doctor";

export class Root extends Component {
    static template = "healthnusa.Root";
    static props = {};
    static components = {
        HeaderComponent,
        Sidebar,
        MainLayout,
    };

    setup() {
        this.apps = [
            { id: "dashboard", name: "Dashboard", Component: Dashboard },
            { id: "people", name: "Employee", Component: Doctor },
        ];

        // Get current app from URL or default to first app
        const currentAppId = this.getCurrentAppFromUrl() || this.apps[0].id;
        const currentApp =
            this.apps.find((app) => app.id === currentAppId) || this.apps[0];

        this.state = useState({
            currentApp: currentApp,
        });

        // Listen to browser navigation events (back/forward buttons)
        onMounted(() => {
            window.addEventListener("popstate", this.onPopState.bind(this));
            // Set initial URL if not present
            if (!this.getCurrentAppFromUrl()) {
                this.updateUrl(this.state.currentApp.id, true);
            }
        });
    }




    getCurrentAppFromUrl() {
    const path = window.location.pathname;

    console.log(" path >>> ", path)
    console.log(" path >>> ", path)
    
    // Misalnya dari "/someAppId", ambil "someAppId"
    const segments = path.split('/').filter(Boolean); // buang elemen kosong
    return segments.length > 0 ? segments[0] : null;
}

updateUrl(appId, replace = false) {
    const newPath = `/${appId}${window.location.search}`;
    if (replace) {
        window.history.replaceState({}, "", newPath);
    } else {
        window.history.pushState({}, "", newPath);
    }
}

    // getCurrentAppFromUrl() {
    //     const hash = window.location.hash;
    //     if (hash.startsWith("#app=")) {
    //         const match = hash.match(/#app=([^&]*)/);
    //         return match ? match[1] : null;
    //     }
    //     return null;
    // }

    // updateUrl(appId, replace = false) {
    //     const newUrl = `${window.location.pathname}${window.location.search}#app=${appId}`;
    //     if (replace) {
    //         window.history.replaceState({}, "", newUrl);
    //     } else {
    //         window.history.pushState({}, "", newUrl);
    //     }
    // }

    onPopState() {
        const appId = this.getCurrentAppFromUrl();
        if (appId) {
            const app = this.apps.find((app) => app.id === appId);
            if (app && app.id !== this.state.currentApp.id) {
                this.state.currentApp = app;
            }
        }
    }

    selectApp(appId) {
        const newApp = this.apps.find((app) => app.id === appId);
        if (newApp && newApp.id !== this.state.currentApp.id) {
            this.state.currentApp = newApp;
            this.updateUrl(appId);
        }
    }
}
