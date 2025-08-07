/** @odoo-module **/

import { Component, useState, useRef } from "@odoo/owl";

export class Sidebar extends Component {
    static template = "healthnusa.Sidebar";
    static props = ["isCollapsed", "onToggle"];

    setup() {
        this.sidebarRef = useRef("sidebar");
    }

    get sidebarClass() {
        return this.props.isCollapsed ? "w-20" : "w-64";
    }

    get mainNavClass() {
        return this.props.isCollapsed ? "grid-cols-1" : "grid-cols-2";
    }

    get appearanceNavClass() {
        return this.props.isCollapsed ? "grid-cols-1" : "grid-cols-2";
    }

    onLogout() {
        console.log("Logout clicked");
        // Implement logout logic
    }
}