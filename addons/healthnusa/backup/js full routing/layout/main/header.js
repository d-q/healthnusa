/** @odoo-module **/

import { Component } from "@odoo/owl";

export class Header extends Component {
    static template = "healthnusa.Header";
    static props = {
        state: Object,
        toggleSidebar: Function,
        toggleDarkMode: Function,
    };

    get state() {
        return this.props.state;
    }

    toggleSidebar() {
        this.props.toggleSidebar();
    }

    toggleDarkMode() {
        this.props.toggleDarkMode();
    }
}