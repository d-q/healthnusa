/** @odoo-module **/

import { Component } from "@odoo/owl";

export class Breadcrumb extends Component {
    static template = "healthnusa.Breadcrumb";
    static props = ["items?"];

    get breadcrumbItems() {
        return this.props.items || [
            { icon: "home", label: "", href: "#" },
            { label: "Employee", href: "index.html" },
            { label: "Doctors", active: true }
        ];
    }
}