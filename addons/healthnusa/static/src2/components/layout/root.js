/** @odoo-module **/

import { Component, useState } from "@odoo/owl";

// Import dari struktur relatif
import { useTheme } from "../../mixins/theme_mixin";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { Breadcrumb } from "../navigation/breadcrumb";
import { DataControls } from "../tables/data_controls";
import { getEmployeeService } from "../../services/employee_service";

export class Root extends Component {
    static template = "healthnusa.Root";
    static components = {
        Sidebar,
        Header,
        Breadcrumb,
        DataControls,
    };

    setup() {
        // Use theme mixin for dark/light mode
        this.theme = useTheme();

        // State untuk sidebar
        this.state = useState({
            isSidebarCollapsed: false
        });

        // Add employee service
        this.employeeService = getEmployeeService();
        this.employeeState = useState({
            employees: [],
            filteredEmployees: [],
            currentPage: 1,
            searchTerm: "",
            sortField: "",
            loading: false
        });

        // Load initial data
        onMounted(() => {
            this.loadEmployees();
        });
    }

    loadEmployees() {
        this.employeeState.loading = true;
        // Simulate API call
        setTimeout(() => {
            this.employeeState.employees = this.employeeService.getEmployees();
            this.employeeState.filteredEmployees = this.employeeService.getFilteredEmployees();
            this.employeeState.loading = false;
        }, 500);
    }

    toggleSidebar() {
        console.log("toggleSidebar called");
        
        this.state.isSidebarCollapsed = !this.state.isSidebarCollapsed;
        
        // Apply DOM changes for sidebar text visibility
        setTimeout(() => {
            const sidebarTexts = document.querySelectorAll(".sidebar-text");
            const mainNav = document.querySelector(".main-nav");
            const appearanceNav = document.querySelector(".appearance-nav");

            if (this.state.isSidebarCollapsed) {
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
            } else {
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
            }
        }, 0);
    }

    toggleDarkMode() {
        this.theme.toggleDarkMode();
    }

    // Data controls handlers
    onAddEmployee() {
        console.log("Add employee clicked");
        // Implement add employee logic
    }

    onSearchEmployees(searchTerm, searchField) {
        console.log("Search employees:", searchTerm, searchField);
        // Implement search logic

        this.employeeService.searchEmployees(searchTerm, searchField);
        this.employeeState.filteredEmployees = this.employeeService.getFilteredEmployees();
        
        // Update pagination info
        const paginationInfo = this.employeeService.getPaginationInfo();
        this.updatePaginationInfo(paginationInfo);
    }

    onSortEmployees(field) {
        console.log("Sort employees by:", field);
        // Implement sort logic

        this.employeeService.sortEmployees(field);
        this.employeeState.filteredEmployees = this.employeeService.getFilteredEmployees();
    }
}