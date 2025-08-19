/** @odoo-module **/

import { Component, useState, onMounted } from "@odoo/owl";

export class StaffDetail extends Component {
    static template = "healthnusa.StaffDetail";
    static props = {
        router: { type: Object, optional: false },
        selectApp: { type: Function, optional: false }
    };

    setup() {
        this.router = this.props.router;
        this.selectApp = this.props.selectApp;
        
        this.state = useState({
            staff: {
                id: 1,
                name: "Sarah Connor",
                role: "Head Nurse",
                fullRole: "Head Nurse (Nursing Department)",
                phone: "+123 456 8000",
                gender: "Female",
                email: "sarah.connor@hospital.com",
                dateOfBirth: "12 March 1985",
                address: "Jl. Gatot Subroto No. 45, Jakarta Selatan, DKI Jakarta",
                profileImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=144&h=144&fit=crop&crop=face",
                dutyStatus: "Available",
                employeeId: "EMP-2024-001",
                department: "Nursing Department",
                hireDate: "15 January 2020",
                supervisor: "Dr. Maria Rodriguez",
                shiftPattern: "Day Shift",
                emergencyContactName: "John Connor",
                emergencyContactPhone: "+123 456 8001",
                emergencyContactRelation: "Spouse",
                education: [
                    { id: 1, degree: "Bachelor of Science in Nursing", institution: "University of Health Sciences", period: "2016-2020" },
                    { id: 2, degree: "Certified Nursing Assistant", institution: "Health Care Institute", period: "2015-2016" }
                ],
                experience: [
                    { id: 1, position: "Staff Nurse", institution: "General Hospital", period: "2020-2023" },
                    { id: 2, position: "Nursing Assistant", institution: "Community Clinic", period: "2018-2020" }
                ]
            },
            recentActivities: [
                {
                    id: 1,
                    action: "Completed patient rounds",
                    time: "2 hours ago",
                    department: "ICU",
                    status: "completed"
                },
                {
                    id: 2,
                    action: "Attended team meeting",
                    time: "4 hours ago",
                    department: "Nursing",
                    status: "completed"
                },
                {
                    id: 3,
                    action: "Updated patient records",
                    time: "6 hours ago",
                    department: "ICU",
                    status: "completed"
                },
                {
                    id: 4,
                    action: "Medication administration",
                    time: "1 day ago",
                    department: "ICU",
                    status: "completed"
                }
            ],
            performance: {
                rating: 4.8,
                tasksCompleted: 45,
                patientsAssisted: 120,
                attendanceRate: 98.5
            }
        });

        onMounted(() => {
            console.log('Staff detail component mounted');
        });
    }

    getColorClass(color) {
        const colorMap = {
            blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
            green: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
            yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
            indigo: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
            purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
            pink: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
            gray: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
        };
        return colorMap[color] || colorMap.blue;
    }

    getDutyStatusClass(status) {
        switch(status) {
            case 'Available': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
            case 'Not Available': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
            case 'On Break': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
            case 'In Session': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
        }
    }

    getDutyStatusColor(status) {
        switch(status) {
            case 'Available': return 'bg-green-500';
            case 'Not Available': return 'bg-red-500';
            case 'On Break': return 'bg-yellow-500';
            case 'In Session': return 'bg-blue-500';
            default: return 'bg-gray-500';
        }
    }

    editStaff() {
        console.log('Navigate to edit staff');
        // Navigate to staff edit form
        this.selectApp('staff-edit');
    }

    goBack() {
        console.log('Navigate back to staff list');
        this.selectApp('staff');
    }

    generateReport() {
        console.log('Generate staff report');
        // Handle report generation
    }

    sendMessage() {
        console.log('Send message to staff');
        // Handle messaging
    }

    updateStatus() {
        console.log('Update staff status');
        // Handle status update
    }

    deleteStaff() {
        console.log('Delete staff member');
        // Handle staff deletion with confirmation
        if (confirm('Are you sure you want to delete this staff member?')) {
            // Handle delete logic here
            console.log('Staff member deleted');
            this.selectApp('staff');
        }
    }

    getEditButtonClass() {
        const baseClass = 'w-full py-3 rounded-lg font-semibold transition duration-300 flex items-center justify-center space-x-2';
        const activeClass = 'bg-custom-blue hover:bg-blue-600 text-white';
        const disabledClass = 'bg-gray-400 text-gray-200 cursor-not-allowed';
        
        // You can add conditions here to determine when the button should be disabled
        const isDisabled = false; // Add your logic here
        
        return `${baseClass} ${isDisabled ? disabledClass : activeClass}`;
    }

    getDeleteButtonClass() {
        const baseClass = 'w-full py-3 rounded-lg font-semibold transition duration-300 flex items-center justify-center space-x-2';
        const activeClass = 'bg-red-500 hover:bg-red-600 text-white';
        const disabledClass = 'bg-gray-400 text-gray-200 cursor-not-allowed';
        
        // You can add conditions here to determine when the button should be disabled
        const isDisabled = false; // Add your logic here
        
        return `${baseClass} ${isDisabled ? disabledClass : activeClass}`;
    }
}