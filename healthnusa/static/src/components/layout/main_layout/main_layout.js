/** @odoo-module **/

import { Component } from "@odoo/owl";

export class MainLayout extends Component {
    static template = "healthnusa.MainLayout";
    static props = {
        currentApp: Object,
    };

    get CurrentComponent() {
        return this.props.currentApp.Component;
    }
}