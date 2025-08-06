/** @odoo-module **/

import { Component, useState, onMounted } from "@odoo/owl";
// import { appRouter } from "../router/router.js";

import { HeaderComponent } from "../layout/header/header";
import { Sidebar } from "../layout/sidebar/sidebar";
import { MainLayout } from "../layout/main_layout/main_layout";

export class Root extends Component {
    static template = "healthnusa.Root";
    static props = {};
    static components = {
        HeaderComponent,
        Sidebar,
        MainLayout,
    };

    // setup() {
    //     this.router = appRouter;
    //     this.state = useState({
    //         currentComponent: null
    //     });

    //     // Setup router
    //     this.router.start();

    //     // Listen untuk perubahan route
    //     this.router.onRouteChange((route) => {
    //         this.state.currentComponent = route.component;
    //     });

    //     // Set komponen awal
    //     const currentRoute = this.router.getCurrentRoute();
    //     if (currentRoute) {
    //         this.state.currentComponent = currentRoute.component;
    //     }
    // }

    // navigate(path) {
    //     this.router.navigate(path);
    // }
}
