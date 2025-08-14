/** @odoo-module **/

import { Component } from '@odoo/owl';

export class Sidebar extends Component {
    static template = 'healthnusa.Sidebar';
    static props = {
        currentApp: String,
        apps: Array,
        selectApp: Function,
        isCollapsed: { type: Boolean, optional: true },
        onToggle: { type: Function, optional: true }
    };

    get sidebarClass() {
        return this.props.isCollapsed ? 'w-20' : 'w-64';
    }

    get mainNavClass() {
        return this.props.isCollapsed ? 'grid-cols-1' : 'grid-cols-2';
    }

    get appearanceNavClass() {
        return this.props.isCollapsed ? 'grid-cols-1' : 'grid-cols-2';
    }

    get navLinkClass() {
        return this.props.isCollapsed ? 'p-2' : 'p-3';
    }

    get textDisplayStyle() {
        return this.props.isCollapsed ? 'display: none' : '';
    }
}