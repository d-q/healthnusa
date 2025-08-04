/** @odoo-module **/

import { Component } from "@odoo/owl";

export class HeaderComponent extends Component {
    static template = "healthnusa.HeaderComponent";
    static props = {
        pageSubtitle: String,
    };
}