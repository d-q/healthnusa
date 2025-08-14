/** @odoo-module **/

import { Component, useState } from "@odoo/owl";

export class Doctor extends Component {
    static template = "healthnusa.Doctor";
    static props = {
        router: { type: Object, optional: false }
    };

    setup() {
        this.router = this.props.router;
    }

    addNewDoctor() {
        this.router.navigate('/doctor/new');
    }
}
