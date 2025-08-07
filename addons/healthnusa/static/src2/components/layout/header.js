/** @odoo-module **/

import { Component, useRef } from "@odoo/owl";

export class Header extends Component {
    static template = "healthnusa.Header";
    static props = ["onToggleSidebar", "onToggleDarkMode", "isDarkMode", "isCollapsed"];

    setup() {
        this.menuIconRef = useRef("menuIcon");
        this.darkModeIconRef = useRef("darkModeIcon");
    }

    get menuIcon() {
        return this.props.isCollapsed ? "menu_open" : "menu";
    }

    get darkModeIcon() {
        return this.props.isDarkMode ? "light_mode" : "dark_mode";
    }

    onToggleSidebar() {
        this.props.onToggleSidebar();
    }

    onToggleDarkMode() {
        this.props.onToggleDarkMode();
    }
}