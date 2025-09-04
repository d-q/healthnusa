/** @odoo-module **/

import { Component } from "@odoo/owl";
import { useState } from "@odoo/owl";

export class Profile extends Component {
    static template = "healthnusa.Profile";

    setup() {
        this.state = useState({
            user: {
                name: "John Doe",
                role: "Doctor",
                employeeId: "EMP001",
                department: "Cardiology",
                status: "Active",
                gender: "Male",
                dateOfBirth: "1985-06-15",
                phone: "+62 812 3456 7890",
                email: "john.doe@hospital.com",
                address: "Jl. Kesehatan No. 123, Jakarta Pusat, DKI Jakarta 10110",
                profileImage: "/web/static/img/user_menu_avatar.png",
                emergencyContactName: "Jane Doe",
                emergencyContactPhone: "+62 813 9876 5432",
                emergencyContactRelation: "Spouse"
            },
            isEditing: false,
            showPasswordModal: false,
            editForm: {},
            passwordForm: {
                currentPassword: "",
                newPassword: "",
                confirmPassword: ""
            },
            message: "",
            messageType: "success",
            loading: false
        });
    }

    enableEdit() {
        this.state.isEditing = true;
        this.state.editForm = { ...this.state.user };
    }

    cancelEdit() {
        this.state.isEditing = false;
        this.state.editForm = {};
    }

    async saveProfile() {
        try {
            if (!this.validateProfileForm()) {
                return;
            }

            // Simulate API call with static data
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Update with form data
            this.state.user = { ...this.state.editForm };
            this.state.isEditing = false;
            this.state.editForm = {};
            this.showMessage("Profile updated successfully!", "success");
        } catch (error) {
            console.error("Error saving profile:", error);
            this.showMessage("An error occurred while saving the profile", "error");
        }
    }

    validateProfileForm() {
        const form = this.state.editForm;
        
        if (!form.name || !form.name.trim()) {
            this.showMessage("Name is required", "error");
            return false;
        }

        if (!form.email || !form.email.trim()) {
            this.showMessage("Email is required", "error");
            return false;
        }

        if (!this.isValidEmail(form.email)) {
            this.showMessage("Please enter a valid email address", "error");
            return false;
        }

        if (!form.phone || !form.phone.trim()) {
            this.showMessage("Phone is required", "error");
            return false;
        }

        return true;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    openPasswordModal() {
        this.state.showPasswordModal = true;
        this.state.passwordForm = {
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        };
    }

    closePasswordModal() {
        this.state.showPasswordModal = false;
        this.state.passwordForm = {
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        };
    }

    async changePassword() {
        try {
            if (!this.validatePasswordForm()) {
                return;
            }

            // Simulate API call with static data
            await new Promise(resolve => setTimeout(resolve, 1000));

            this.closePasswordModal();
            this.showMessage("Password changed successfully!", "success");
        } catch (error) {
            console.error("Error changing password:", error);
            this.showMessage("An error occurred while changing the password", "error");
        }
    }

    validatePasswordForm() {
        const form = this.state.passwordForm;

        if (!form.currentPassword) {
            this.showMessage("Current password is required", "error");
            return false;
        }

        if (!form.newPassword) {
            this.showMessage("New password is required", "error");
            return false;
        }

        if (form.newPassword.length < 8) {
            this.showMessage("New password must be at least 8 characters long", "error");
            return false;
        }

        if (form.newPassword !== form.confirmPassword) {
            this.showMessage("New password and confirmation do not match", "error");
            return false;
        }

        if (form.currentPassword === form.newPassword) {
            this.showMessage("New password must be different from current password", "error");
            return false;
        }

        return true;
    }

    async changeProfileImage() {
        try {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            
            input.onchange = async (event) => {
                const file = event.target.files[0];
                if (!file) return;

                if (file.size > 5 * 1024 * 1024) {
                    this.showMessage("Image size must be less than 5MB", "error");
                    return;
                }

                const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
                if (!validTypes.includes(file.type)) {
                    this.showMessage("Only JPEG, PNG, and GIF files are allowed", "error");
                    return;
                }

                try {
                    // Simulate image upload with static data
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    
                    // Create a temporary URL for preview
                    const imageUrl = URL.createObjectURL(file);
                    this.state.user.profileImage = imageUrl;
                    this.showMessage("Profile image updated successfully!", "success");
                } catch (error) {
                    console.error("Error uploading image:", error);
                    this.showMessage("An error occurred while uploading the image", "error");
                }
            };

            input.click();
        } catch (error) {
            console.error("Error changing profile image:", error);
            this.showMessage("An error occurred while changing the profile image", "error");
        }
    }

    showMessage(message, type = "success") {
        this.state.message = message;
        this.state.messageType = type;
        
        setTimeout(() => {
            this.state.message = "";
        }, 5000);
    }
}
