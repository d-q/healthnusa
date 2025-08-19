/** @odoo-module **/

import { Component, useState, onMounted } from "@odoo/owl";

export class PatientDetail extends Component {
    static template = "healthnusa.PatientDetail";

    setup() {
        this.state = useState({
            activeTab: 'detail',
            showDeleteModal: false,
            expandedPrescriptions: new Set(['prescription1']),
            patient: {
                id: 1,
                name: "Sarah Indah Johnson",
                mrn: "MR-2024-001",
                nik: "1234567890123456",
                phone: "+1-555-123-4567",
                homePhone: "+1-555-765-4321",
                gender: "Female",
                birthPlace: "New York",
                birthDate: "May 8, 1990",
                age: "33 years",
                address: "123 Maple Street, Apt 4B, New York, NY 10001",
                profileImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBH9sG1RR-ygL90n66JGGvRFdJP_a5D8HK6CmWoRHRG2xoG6j_pFt-s1yTi5SMnYp3W77_-K60Gk7dkeY6xbds1VQdn9cPPbyqsedOMmnllkjKYYOfBqgU1zv16_3UVLQ4gB3j8Qm6Qj3ftxfC5q3FGZkXtHkUk0KyQvNfglpbX-wSNdJi5SSaz4zA9Eass_N-K8ho8bE2onR0B59ZnDGnV3eH5S84VhOLZyZYEfp5E0uuRHYnQluGehOGSrfBDAPsA4xEho7zvcMY",
                status: "Active",
                motherName: "Mary Johnson",
                religion: "Christianity",
                ethnicity: "Caucasian",
                languages: "English, Spanish",
                education: "Bachelor's Degree",
                occupation: "Software Engineer",
                maritalStatus: "Married"
            },
            address: {
                fullAddress: "123 Maple Street, Manhattan",
                rtRw: "003/005",
                village: "Manhattan",
                subDistrict: "Manhattan",
                city: "New York",
                postalCode: "10021",
                state: "New York",
                country: "United States"
            },
            allergies: [
                {
                    id: 1,
                    name: "Dust",
                    severity: "mild",
                    reaction: "Mild reaction (sneezing, watery eyes)",
                    icon: "warning",
                    iconColor: "red"
                },
                {
                    id: 2,
                    name: "Shellfish",
                    severity: "moderate",
                    reaction: "Moderate reaction (itching, skin rash)",
                    icon: "warning",
                    iconColor: "orange"
                },
                {
                    id: 3,
                    name: "Penicillin",
                    severity: "severe",
                    reaction: "Severe reaction (shortness of breath, swelling)",
                    icon: "dangerous",
                    iconColor: "red"
                }
            ],
            appointments: [
                {
                    id: 1,
                    date: "July 25, 2024 - 10:00 AM",
                    doctor: "Dr. Michael Thompson, MD",
                    specialty: "Pulmonology",
                    room: "Consultation Room 3",
                    notes: "Routine asthma control visit",
                    status: "Confirmed",
                    statusColor: "green"
                }
            ],
            insurance: {
                primary: {
                    provider: "Aetna Insurance",
                    policyNumber: "AETNA-2023-987654321",
                    validPeriod: "Jan 01, 2024 - Dec 31, 2024",
                    coverage: "Outpatient & Inpatient",
                    status: "Active"
                },
                guarantor: {
                    name: "John Smith (Husband)",
                    nationalId: "123-45-6789",
                    phone: "(917) 555-0234",
                    relationship: "Husband",
                    address: "123 Main Street, Apt 4B, Manhattan, New York 10021"
                }
            },
            medicalNotes: "Patient has a history of asthma since childhood. Please be careful when prescribing medications that may trigger asthma attacks. Last attack occurred on January 15, 2024 due to fatigue and cold weather.",
            prescriptions: [
                {
                    id: 'prescription1',
                    number: 'RX-2024-001',
                    date: 'Jan 15, 2024',
                    doctor: 'Dr. Michael Thompson, MD',
                    category: 'Asthma',
                    categoryColor: 'red',
                    medications: [
                        {
                            name: 'Ambroxol 30mg',
                            type: 'Tablet',
                            quantity: '15 Tablets',
                            dosage: '3x daily'
                        }
                    ]
                },
                {
                    id: 'prescription2',
                    number: 'RX-2023-078',
                    date: 'Nov 28, 2023',
                    doctor: 'Dr. Sarah Wilson, MD',
                    category: 'Follow-up',
                    categoryColor: 'blue',
                    medications: [
                        {
                            name: 'Seretide Inhaler',
                            type: 'Inhaler',
                            quantity: '1 Inhaler',
                            dosage: '2x daily'
                        },
                        {
                            name: 'Vitamin C 500mg',
                            type: 'Tablet',
                            quantity: '30 Tablets',
                            dosage: 'Once daily'
                        }
                    ]
                }
            ],
            billingHistory: [
                {
                    id: 1,
                    invoiceNumber: 'INV-2024-001',
                    date: 'January 15, 2024',
                    service: 'Specialist Consultation + Medicine',
                    total: '$450.00',
                    paymentMethod: 'Credit Card',
                    status: 'Paid',
                    statusColor: 'green'
                },
                {
                    id: 2,
                    invoiceNumber: 'INV-2023-078',
                    date: 'November 28, 2023',
                    service: 'General Consultation + Prescription',
                    total: '$275.00',
                    paymentMethod: 'Cash',
                    status: 'Paid',
                    statusColor: 'green'
                }
            ]
        });

        // Initialize with detail tab active
        onMounted(() => {
            // No manual DOM manipulation needed - OWL handles this reactively
        });
    }

    onTabClick(event, tabName) {
        if (event) {
            event.preventDefault();
        }
        console.log('Tab clicked:', tabName, 'Current active tab:', this.state.activeTab);
        this.state.activeTab = tabName;
        console.log('New active tab:', this.state.activeTab);
    }

    openDeleteModal() {
        this.state.showDeleteModal = true;
    }

    closeDeleteModal() {
        this.state.showDeleteModal = false;
    }

    confirmDelete() {
        // Add delete logic here
        console.log('Patient deleted');
        this.closeDeleteModal();
    }

    togglePrescription(prescriptionId) {
        const expandedPrescriptions = new Set(this.state.expandedPrescriptions);
        
        if (expandedPrescriptions.has(prescriptionId)) {
            expandedPrescriptions.delete(prescriptionId);
        } else {
            expandedPrescriptions.add(prescriptionId);
        }
        
        this.state.expandedPrescriptions = expandedPrescriptions;
    }

    isTabActive(tabName) {
        return this.state.activeTab === tabName;
    }

    isPrescriptionExpanded(prescriptionId) {
        return this.state.expandedPrescriptions.has(prescriptionId);
    }

    onModalBackdropClick(event) {
        if (event.target === event.currentTarget) {
            this.closeDeleteModal();
        }
    }

    onEditPatient() {
        // Navigate to edit patient page or show edit modal
        console.log('Edit patient clicked');
        // You can add navigation logic here
        // Example: this.env.services.router.navigate('/patient/edit/' + this.state.patient.id);
    }

    onBackToList() {
        // Navigate back to patient list
        console.log('Back to list clicked');
        // Example: this.env.services.router.navigate('/patients');
    }

    onCreateAppointment() {
        console.log('Create appointment clicked');
        // Add logic to open appointment creation modal or navigate
    }

    onCreatePrescription() {
        console.log('Create prescription clicked');
        // Add logic to open prescription creation modal or navigate
    }

    onAddInsurance() {
        console.log('Add insurance clicked');
        // Add logic to open insurance creation modal or navigate
    }
}
