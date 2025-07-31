/** @odoo-module **/

import { Component, useState } from "@odoo/owl";

export class DoctorDetail extends Component {
    static template = "healthnusa.DoctorDetail";
    static props = {
        currentDoctor: Number,
        showDoctorForm: Function,
        showDoctorList: Function,
    };

    setup() {
        this.state = useState({
            currentTab: 'personal',
            showDeleteModal: false,
        });

        // Mock doctor data - in real app, this would come from API
        this.doctorData = {
            id: this.props.currentDoctor,
            name: 'Dr. John Doe',
            specialty: 'Dokter Anak (Pediatri)',
            phone: '+62 812 3456 7890',
            gender: 'Male',
            address: 'Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta',
            email: 'johndoe.md@hospital.com',
            birthDate: '15 Juni 1985',
            strNumber: '1234567890123456',
            sipNumber: 'SIP.123/DU/X/2023',
            dutyStatus: 'on-duty',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVI0osb-RABdJxYmVG6OTZhB0dYx69fid3eIWD4-iFUuy9vJ08BaB9ufoK5lCYYtqZUMZ3BWXGEEtBYexpLsWbTIkDrncZuqsnz7_1EeAMX6Wppa7la5Nq3MN3nceoYetzzTRAn1mm6aDtEut4fTgou7cbT0yp7Uws4dGCUOB6DeZ_GGOeGAbXpxl0y06BoTxqEef_YHBS_YZbKuQg366bA0nX69IHkxxFkyKFNgrZc19Q0YX_SoVmDstN8uuFPqiUvw59WY58Ics',
            schedule: {
                monday: [{ start: '09:00', end: '11:00' }, { start: '13:00', end: '15:00' }, { start: '16:00', end: '17:00' }],
                tuesday: [{ start: '09:00', end: '17:00' }],
                wednesday: [{ start: '09:00', end: '17:00' }],
                thursday: [{ start: '09:00', end: '12:00' }, { start: '14:00', end: '16:00' }, { start: '18:00', end: '20:00' }],
                friday: [{ start: '09:00', end: '12:00' }],
                saturday: [],
                sunday: []
            },
            education: [
                { degree: 'Dokter Spesialis Anak', institution: 'Universitas Indonesia', year: '2015 - 2019' },
                { degree: 'Pendidikan Profesi Dokter', institution: 'Universitas Gadjah Mada', year: '2009 - 2011' },
                { degree: 'Sarjana Kedokteran', institution: 'Universitas Gadjah Mada', year: '2005 - 2009' }
            ],
            experience: [
                { position: 'Dokter Anak', institution: 'HealthNusa', period: '2020 - Sekarang' },
                { position: 'Dokter Umum', institution: 'Klinik Sehat Sejahtera', period: '2012 - 2015' }
            ],
            documents: [
                { name: 'STR Certificate', type: 'PDF', size: '2.4 MB' },
                { name: 'SIP Certificate', type: 'PDF', size: '1.8 MB' },
                { name: 'Medical License', type: 'PDF', size: '3.1 MB' }
            ],
            appointments: [
                { patient: 'Sarah Wilson', type: 'Consultation', description: 'Regular checkup for pediatric care', time: 'Today, 10:00 AM - 10:30 AM', status: 'Completed' },
                { patient: 'Michael Chen', type: 'Follow-up', description: 'Post-treatment follow-up examination', time: 'Tomorrow, 2:00 PM - 2:30 PM', status: 'Scheduled' },
                { patient: 'Emma Davis', type: 'Emergency', description: 'Urgent pediatric consultation', time: 'Jul 15, 3:00 PM - 3:45 PM', status: 'Pending' }
            ],
            patients: [
                { name: 'Michael Chen', age: '5 years', lastVisit: '2 days ago', treatment: 'Treatment for common cold and fever', avatar: 'https://via.placeholder.com/48x48/f3f4f6/9ca3af?text=MC' },
                { name: 'Emma Davis', age: '12 years', lastVisit: '1 week ago', treatment: 'Growth monitoring and nutritional consultation', avatar: 'https://via.placeholder.com/48x48/f3f4f6/9ca3af?text=ED' },
                { name: 'Lucas Johnson', age: '6 years', lastVisit: '2 weeks ago', treatment: 'Allergy testing and treatment plan', avatar: 'https://via.placeholder.com/48x48/f3f4f6/9ca3af?text=LJ' },
                { name: 'Aria Brown', age: '9 years', lastVisit: '3 weeks ago', treatment: 'Respiratory infection follow-up', avatar: 'https://via.placeholder.com/48x48/f3f4f6/9ca3af?text=AB' },
                { name: 'Sarah Wilson', age: '8 years', lastVisit: 'Today', treatment: 'Regular pediatric checkup and vaccination', avatar: 'https://via.placeholder.com/48x48/f3f4f6/9ca3af?text=SW' }
            ]
        };
    }

    switchTab(tabId) {
        this.state.currentTab = tabId;
    }

    editDoctor() {
        this.props.showDoctorForm(this.props.currentDoctor);
    }

    showDeleteModal() {
        this.state.showDeleteModal = true;
    }

    closeDeleteModal() {
        this.state.showDeleteModal = false;
    }

    confirmDeleteDoctor() {
        // In real app, this would call API to delete doctor
        console.log('Deleting doctor:', this.props.currentDoctor);
        this.closeDeleteModal();
        this.props.showDoctorList();
    }

    getScheduleColor(day) {
        const colors = {
            monday: 'blue',
            tuesday: 'green', 
            wednesday: 'pink',
            thursday: 'purple',
            friday: 'yellow',
            saturday: 'gray',
            sunday: 'gray'
        };
        return colors[day] || 'gray';
    }

    getDayName(day) {
        const days = {
            monday: 'Mon',
            tuesday: 'Tue',
            wednesday: 'Wed', 
            thursday: 'Thu',
            friday: 'Fri',
            saturday: 'Sat',
            sunday: 'Sun'
        };
        return days[day] || day;
    }

    getStatusColor(status) {
        const colors = {
            'Completed': 'green',
            'Scheduled': 'blue',
            'Pending': 'orange'
        };
        return colors[status] || 'gray';
    }
}