/** @odoo-module **/

import { Component, useState } from "@odoo/owl";
import { DoctorList } from "../doctor_list/doctor_list";
import { DoctorCreateEdit } from "../doctor_create_edit/doctor_create_edit";
import { DoctorDetail } from "../doctor_detail/doctor_detail";

export class DoctorRoot extends Component {
    static template = "healthnusa.DoctorRoot";
    static props = {};

    setup() {
        this.apps = [
            { id: "list", Component: DoctorList, title: "Daftar Dokter", path: ["Home", "Dokter"] },
            { id: "createEdit", Component: DoctorCreateEdit, title: "Tambah/Edit Dokter", path: ["Home", "Dokter", "Form"] },
            { id: "detail", Component: DoctorDetail, title: "Detail Dokter", path: ["Home", "Dokter", "Detail"] },
        ];
        this.state = useState({
            currentApp: this.apps[0],
            currentDoctorId: null, // Store the current doctor ID for edit/detail mode
        });
    }

    get breadcrumbItems() {
        return this.state.currentApp.path || [];
    }

    // Navigate to create/edit form
    showCreateEdit(doctorId = null) {
        const newApp = this.apps.find((app) => app.id === "createEdit");
        this.state.currentApp = newApp;
        this.state.currentDoctorId = doctorId; // Store doctor ID for edit mode
    }

    // Navigate to doctor list
    showDoctorList() {
        const newApp = this.apps.find((app) => app.id === "list");
        this.state.currentApp = newApp;
        this.state.currentDoctorId = null;
    }

    // Navigate to doctor detail
    showDoctorDetail(doctorId) {
        const newApp = this.apps.find((app) => app.id === "detail");
        this.state.currentApp = newApp;
        this.state.currentDoctorId = doctorId;
    }

    // Navigate to edit form (alias for showCreateEdit with doctor ID)
    showDoctorForm(doctorId) {
        this.showCreateEdit(doctorId);
    }

    // Method untuk navigasi breadcrumb
    navigateTo(index) {
        if (index === 0) {
            // Navigate to home or main page
            console.log("Navigate to home");
            window.location.pathname = "/healthnusa";
        } else if (index === 1) {
            // Navigate to doctor list
            this.showDoctorList();
        }
        // Bisa ditambahkan logic navigasi lainnya sesuai kebutuhan
    }

    // Getter to determine if current mode is edit mode
    get isEditMode() {
        return this.state.currentApp.id === "createEdit" && this.state.currentDoctorId !== null;
    }
}