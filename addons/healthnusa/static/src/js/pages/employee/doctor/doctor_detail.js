/** @odoo-module **/

import { Component, useState, onMounted } from "@odoo/owl";

export class DoctorDetail extends Component {
    static template = "healthnusa.DoctorDetail";

    setup() {
        this.state = useState({
            doctor: {
                id: 1,
                name: "Dr. John Smith",
                specialization: "Heart Specialist",
                fullSpecialization: "Heart Specialist (Cardiology)",
                phone: "+123 456 7890",
                gender: "Male",
                email: "johnsmith.md@hospital.com",
                dateOfBirth: "15 June 1980",
                address: "Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta",
                profileImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=144&h=144&fit=crop&crop=face",
                dutyStatus: "Available",
                medicalLicenseNumber: "1234567890123456",
                practiceLicenseNumber: "SIP.123/DU/X/2023"
            },
            schedule: [
                { 
                    day: "Monday", 
                    sessions: [
                        { time: "09:00-11:00", color: "blue" },
                        { time: "13:00-15:00", color: "blue" },
                        { time: "16:00-17:00", color: "blue" }
                    ] 
                },
                { 
                    day: "Tuesday", 
                    sessions: [{ time: "09:00 - 17:00", color: "green" }] 
                },
                { 
                    day: "Wednesday", 
                    sessions: [{ time: "09:00 - 17:00", color: "yellow" }] 
                },
                { 
                    day: "Thursday", 
                    sessions: [
                        { time: "09:00-12:00", color: "indigo" },
                        { time: "14:00-16:00", color: "indigo" },
                        { time: "18:00-20:00", color: "indigo" },
                        { time: "21:00-22:00", color: "indigo" }
                    ] 
                },
                { 
                    day: "Friday", 
                    sessions: [{ time: "09:00 - 12:00", color: "pink" }] 
                },
                { 
                    day: "Saturday", 
                    sessions: [] 
                },
                { 
                    day: "Sunday", 
                    sessions: [] 
                }
            ],
            education: [
                {
                    degree: "Cardiologist Specialist",
                    institution: "University of Indonesia",
                    year: "2010 - 2014"
                },
                {
                    degree: "Medical Doctor",
                    institution: "Gadjah Mada University",
                    year: "2004 - 2006"
                },
                {
                    degree: "Bachelor of Medicine",
                    institution: "Gadjah Mada University",
                    year: "2000 - 2004"
                }
            ],
            workExperience: [
                {
                    position: "Cardiologist",
                    institution: "Mario Hospital",
                    period: "2015 - Present"
                },
                {
                    position: "General Practitioner",
                    institution: "Sehat Sejahtera Clinic",
                    period: "2007 - 2010"
                }
            ],
            medicalLicenses: [
                {
                    type: "STR",
                    name: "Surat Tanda Registrasi (STR)",
                    description: "Medical Registration Certificate",
                    licenseNumber: "1234567890123456",
                    issueDate: "15 January 2020",
                    expiryDate: "15 January 2025",
                    issuingAuthority: "Indonesian Medical Council",
                    status: "Active",
                    icon: "verified",
                    iconColor: "green"
                },
                {
                    type: "SIP",
                    name: "Surat Izin Praktik (SIP)",
                    description: "Medical Practice License",
                    licenseNumber: "SIP.123/DU/X/2023",
                    issueDate: "10 March 2023",
                    expiryDate: "10 March 2028",
                    practiceLocation: "Mario Hospital, Jakarta",
                    status: "Active",
                    icon: "workspace_premium",
                    iconColor: "blue"
                },
                {
                    type: "SPECIALIST",
                    name: "Specialist Certification",
                    description: "Cardiology Specialist Certificate",
                    licenseNumber: "CARD-2014-001234",
                    completionDate: "20 December 2014",
                    institution: "University of Indonesia",
                    specialty: "Cardiology",
                    status: "Valid",
                    icon: "school",
                    iconColor: "purple"
                }
            ],
            appointments: [
                {
                    id: "PAT-001234",
                    patientName: "Sarah Johnson",
                    reason: "Chest pain consultation",
                    time: "09:00 - 09:30",
                    status: "Confirmed",
                    statusColor: "green"
                },
                {
                    id: "PAT-001235",
                    patientName: "Michael Chen",
                    reason: "Regular checkup",
                    time: "10:00 - 10:30",
                    status: "Waiting",
                    statusColor: "yellow"
                },
                {
                    id: "PAT-001236",
                    patientName: "Emma Williams",
                    reason: "Hypertension follow-up",
                    time: "11:00 - 11:30",
                    status: "In Progress",
                    statusColor: "blue"
                },
                {
                    id: "PAT-001237",
                    patientName: "Robert Davis",
                    reason: "Heart rhythm evaluation",
                    time: "13:00 - 13:30",
                    status: "Scheduled",
                    statusColor: "gray"
                },
                {
                    id: "PAT-001238",
                    patientName: "Lisa Anderson",
                    reason: "Post-surgery follow-up",
                    time: "14:00 - 14:30",
                    status: "Confirmed",
                    statusColor: "green"
                }
            ],
            currentDate: "January 15, 2025",
            totalAppointments: 8
        });

        onMounted(() => {
            this.setupTabFunctionality();
        });
    }

    setupTabFunctionality() {
        const tabNavs = document.querySelectorAll('.tab-nav');
        const tabContents = document.querySelectorAll('.tab-content');

        tabNavs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                const targetTab = tab.getAttribute('data-tab');

                // Remove active state from all tabs
                tabNavs.forEach(nav => {
                    nav.classList.remove('text-custom-blue', 'border-b-2', 'border-custom-blue');
                    nav.classList.add('text-gray-500', 'dark:text-gray-400');
                });

                // Add active state to clicked tab
                tab.classList.remove('text-gray-500', 'dark:text-gray-400');
                tab.classList.add('text-custom-blue', 'border-b-2', 'border-custom-blue');

                // Hide all tab contents
                tabContents.forEach(content => {
                    content.classList.add('hidden');
                });

                // Show target tab content
                const targetContent = document.getElementById(targetTab);
                if (targetContent) {
                    targetContent.classList.remove('hidden');
                }
            });
        });
    }
}
