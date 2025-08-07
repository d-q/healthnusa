/** @odoo-module **/

import { Component, useState, onMounted, useRef } from "@odoo/owl";

export class Root extends Component {
    static template = "healthnusa.Root";

    setup() {
        // State untuk sidebar dan dark mode
        this.state = useState({
            isDarkMode: false,
            isSidebarCollapsed: false
        });

        // Refs untuk DOM elements
        this.menuIconRef = useRef("menuIcon");
        this.darkModeIconRef = useRef("darkModeIcon");
        this.sidebarRef = useRef("sidebar");

        // Initialize dark mode on component mount
        onMounted(() => {
            this.initDarkMode();
        });
    }

    initDarkMode() {
        // Cek localStorage untuk preference yang tersimpan
        const savedMode = localStorage.getItem("darkMode");
        const html = document.documentElement;
        const body = document.body;
        const icon = this.darkModeIconRef.el;

        // Default mode adalah light, hanya dark jika explicitly disimpan sebagai "true"
        if (savedMode === "true") {
            this.state.isDarkMode = true;
            html.classList.add("dark");
            body.classList.add("dark");
            if (icon) {
                icon.textContent = "light_mode";
            }
        } else {
            // Default light mode
            this.state.isDarkMode = false;
            html.classList.remove("dark");
            body.classList.remove("dark");
            if (icon) {
                icon.textContent = "dark_mode";
            }
            // Set localStorage to explicitly save light mode preference
            if (savedMode === null) {
                localStorage.setItem("darkMode", "false");
            }
        }
        
        // Force scrollbar refresh setelah mode change
        setTimeout(() => this.forceScrollbarRefresh(), 100);
    }

    toggleDarkMode() {
        console.log("toggleDarkMode called");
        
        const html = document.documentElement;
        const body = document.body;
        const icon = this.darkModeIconRef.el;

        if (this.state.isDarkMode) {
            // Switch to light mode
            this.state.isDarkMode = false;
            html.classList.remove("dark");
            body.classList.remove("dark");
            if (icon) {
                icon.textContent = "dark_mode";
            }
            localStorage.setItem("darkMode", "false");
        } else {
            // Switch to dark mode
            this.state.isDarkMode = true;
            html.classList.add("dark");
            body.classList.add("dark");
            if (icon) {
                icon.textContent = "light_mode";
            }
            localStorage.setItem("darkMode", "true");
        }
        
        this.forceScrollbarRefresh();
    }

    toggleSidebar() {
        console.log("toggleSidebar called");
        
        const sidebar = this.sidebarRef.el;
        const menuIcon = this.menuIconRef.el;
        const sidebarTexts = document.querySelectorAll(".sidebar-text");
        const mainNav = document.querySelector(".main-nav");
        const appearanceNav = document.querySelector(".appearance-nav");

        if (!sidebar || !menuIcon) return;

        if (this.state.isSidebarCollapsed) {
            // Expand sidebar
            this.state.isSidebarCollapsed = false;
            sidebar.classList.remove("w-20");
            sidebar.classList.add("w-64");
            menuIcon.textContent = "menu";

            sidebarTexts.forEach((el) => {
                el.style.display = "";
            });

            if (mainNav) {
                mainNav.classList.remove("grid-cols-1");
                mainNav.classList.add("grid-cols-2");
            }
            
            if (appearanceNav) {
                appearanceNav.classList.remove("grid-cols-1");
                appearanceNav.classList.add("grid-cols-2");
            }

            const navLinks = sidebar.querySelectorAll("nav a");
            navLinks.forEach((link) => {
                link.classList.remove("p-2");
                link.classList.add("p-3");
            });
        } else {
            // Collapse sidebar
            this.state.isSidebarCollapsed = true;
            sidebar.classList.remove("w-64");
            sidebar.classList.add("w-20");
            menuIcon.textContent = "menu_open";

            sidebarTexts.forEach((el) => {
                el.style.display = "none";
            });

            if (mainNav) {
                mainNav.classList.remove("grid-cols-2");
                mainNav.classList.add("grid-cols-1");
            }
            
            if (appearanceNav) {
                appearanceNav.classList.remove("grid-cols-2");
                appearanceNav.classList.add("grid-cols-1");
            }

            const navLinks = sidebar.querySelectorAll("nav a");
            navLinks.forEach((link) => {
                link.classList.remove("p-3");
                link.classList.add("p-2");
            });
        }
    }

    forceScrollbarRefresh() {
        const container = document.querySelector('.data-list-container');
        if (container) {
            const originalDisplay = container.style.display;
            container.style.display = 'none';
            container.offsetHeight; // Force reflow
            container.style.display = originalDisplay || 'block';
            
            const originalOverflow = container.style.overflowY;
            container.style.overflowY = 'hidden';
            setTimeout(() => {
                container.style.overflowY = originalOverflow || 'auto';
            }, 10);
        }
    }
}