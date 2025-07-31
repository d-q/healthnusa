/** @odoo-module **/

import { Component } from "@odoo/owl";

export class Sidebar extends Component {
    static template = "healthnusa.Sidebar";
    static props = {
        currentApp: String,
        apps: Array,
        selectApp: Function,
    };
}