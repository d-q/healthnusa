/** @odoo-module **/

import { whenReady } from "@odoo/owl";
import { mountComponent } from "@web/env";

// Import Root component dari struktur baru
import { Root } from "../components/layout/root";

// Mount component ketika DOM ready
whenReady(() => {
    console.log("Mounting Mario Hospital Dashboard...");
    mountComponent(Root, document.body);
});

// import { whenReady } from "@odoo/owl";
// import { mountComponent } from "@web/env";
// import { Root } from "./root";

// whenReady(() => mountComponent(Root, document.body));