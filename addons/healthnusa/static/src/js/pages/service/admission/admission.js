/** @odoo-module **/

import { Component, useState } from "@odoo/owl";

export class Admission extends Component {
    static template = "healthnusa.Admission";
    static props = {
        router: { type: Object, optional: false },
        selectApp: { type: Function, optional: false }
    };

    setup() {
        this.router = this.props.router;
        this.state = useState({
            searchTerm: "",
            showAdmissionModal: false,
            currentAdmissionIndex: 0,
            currentTab: 'assessment',
            isEditingNotes: false,
            editingNotesText: "",
            admissionForm: {
                patient_id: "",
                admission_id: this.generateAdmissionId(),
                admission_date: new Date().toISOString().split('T')[0],
                admission_time: new Date().toTimeString().split(' ')[0].slice(0, 5),
                department: "",
                doctor: "",
                room_number: "",
                bed_number: "",
                admission_type: "Outpatient",
                insurance: "",
                chief_complaint: "",
                diagnosis: "",
                notes: ""
            }
        });

        // Sample admission data - exactly like patient profile structure
        this.admissionsData = [
            {
                id: 1,
                admission_id: "ADM001",
                patient_name: "John Anderson",
                mrn: "MRN001",
                patient_image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
                admission_date: "Aug. 24, 2024",
                admission_time: "09:30 AM",
                department: "Cardiology",
                doctor: "Dr. Sarah Wilson",
                admission_type: "Inpatient",
                insurance: "BPJS Kesehatan",
                room_number: "201A",
                bed_number: "1",
                chief_complaint: "Chest pain and shortness of breath for the past 2 hours",
                diagnosis: "Suspected acute coronary syndrome, pending further cardiac evaluation",
                status: "Active",
                notes: "Patient admitted for cardiac monitoring and further evaluation. ECG shows ST elevation in leads II, III, aVF.",
                gender: "Male",
                title: "Mr",
                birthday: "Mar. 15, 1979",
                age: "45",
                phone: "(555)-123-4567",
                address: "1234 Oak Street Los Angeles CA 90210",
                city: "Los Angeles",
                zip_code: "90210",
                registration_date: "Jan. 10, 2020",
                member_status: "Active member"
            },
            {
                id: 2,
                admission_id: "ADM002",
                patient_name: "Sarah Johnson",
                mrn: "MRN002",
                patient_image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
                admission_date: "Aug. 24, 2024",
                admission_time: "02:15 PM",
                department: "Emergency",
                doctor: "Dr. Michael Chen",
                admission_type: "Emergency",
                insurance: "Private Insurance",
                room_number: "ER-3",
                bed_number: "5",
                chief_complaint: "Severe abdominal pain in right lower quadrant, nausea and vomiting",
                diagnosis: "Acute appendicitis, surgical consultation pending",
                status: "Active",
                notes: "Emergency admission, surgery scheduled for tonight. Patient stable, IV access established.",
                gender: "Female",
                title: "Mrs",
                birthday: "Jun. 28, 1985",
                age: "39",
                phone: "(555)-987-6543",
                address: "456 Elm Street New York NY 10001",
                city: "New York",
                zip_code: "10001",
                registration_date: "Mar. 15, 2021",
                member_status: "Active member"
            },
            {
                id: 3,
                admission_id: "ADM003",
                patient_name: "Michael Chen",
                mrn: "MRN003",
                patient_image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
                admission_date: "Aug. 23, 2024",
                admission_time: "10:00 AM",
                department: "Orthopedics",
                doctor: "Dr. Emily Davis",
                admission_type: "Outpatient",
                insurance: "Company Insurance",
                room_number: "",
                bed_number: "",
                chief_complaint: "Knee pain after sports injury during basketball game",
                diagnosis: "Medial collateral ligament strain, grade 2",
                status: "Discharged",
                notes: "Outpatient follow-up scheduled in 2 weeks. Physical therapy referral provided.",
                gender: "Male",
                title: "Mr",
                birthday: "Sep. 12, 1992",
                age: "32",
                phone: "(555)-456-7890",
                address: "789 Pine Avenue Chicago IL 60601",
                city: "Chicago",
                zip_code: "60601",
                registration_date: "Jul. 22, 2019",
                member_status: "Active member"
            },
            {
                id: 4,
                admission_id: "ADM004",
                patient_name: "Emily Davis",
                mrn: "MRN004",
                patient_image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
                admission_date: "Aug. 23, 2024",
                admission_time: "11:30 AM",
                department: "Pediatrics",
                doctor: "Dr. Robert Wilson",
                admission_type: "Inpatient",
                insurance: "BPJS Kesehatan",
                room_number: "301B",
                bed_number: "2",
                chief_complaint: "High fever 39.5°C, vomiting, and diarrhea for 2 days",
                diagnosis: "Acute gastroenteritis with dehydration",
                status: "Active",
                notes: "IV fluids started, monitoring electrolytes and hydration status. Pediatric diet as tolerated.",
                gender: "Female",
                title: "Miss",
                birthday: "Dec. 5, 2015",
                age: "8",
                phone: "(555)-321-6547",
                address: "321 Maple Drive Houston TX 77001",
                city: "Houston",
                zip_code: "77001",
                registration_date: "Sep. 08, 2022",
                member_status: "Active member"
            },
            {
                id: 5,
                admission_id: "ADM005",
                patient_name: "Robert Wilson",
                mrn: "MRN005",
                patient_image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
                admission_date: "Aug. 22, 2024",
                admission_time: "04:45 PM",
                department: "Internal Medicine",
                doctor: "Dr. Maria Rodriguez",
                admission_type: "Outpatient",
                insurance: "Cash",
                room_number: "",
                bed_number: "",
                chief_complaint: "Routine hypertension follow-up, medication review",
                diagnosis: "Essential hypertension, well controlled",
                status: "Discharged",
                notes: "Blood pressure well controlled on current regimen. Continue current medications, next visit in 1 month.",
                gender: "Male",
                title: "Mr",
                birthday: "Feb. 14, 1970",
                age: "54",
                phone: "(555)-654-3210",
                address: "654 Cedar Lane Phoenix AZ 85001",
                city: "Phoenix",
                zip_code: "85001",
                registration_date: "May 30, 2018",
                member_status: "Active member"
            },
            {
                id: 6,
                admission_id: "ADM006",
                patient_name: "Maria Rodriguez",
                mrn: "MRN006",
                patient_image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
                admission_date: "Aug. 22, 2024",
                admission_time: "01:20 PM",
                department: "Surgery",
                doctor: "Dr. James Brown",
                admission_type: "Inpatient",
                insurance: "Private Insurance",
                room_number: "401C",
                bed_number: "3",
                chief_complaint: "Scheduled laparoscopic cholecystectomy for symptomatic gallstones",
                diagnosis: "Cholelithiasis with chronic cholecystitis",
                status: "Active",
                notes: "Pre-operative preparation completed. Surgery scheduled for tomorrow morning. NPO after midnight.",
                gender: "Female",
                title: "Mrs",
                birthday: "Nov. 03, 1982",
                age: "41",
                phone: "(555)-789-0123",
                address: "987 Birch Street Miami FL 33101",
                city: "Miami",
                zip_code: "33101",
                registration_date: "Aug. 12, 2020",
                member_status: "Active member"
            },
            {
                id: 7,
                admission_id: "ADM007",
                patient_name: "James Brown",
                mrn: "MRN007",
                patient_image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100&h=100&fit=crop&crop=face",
                admission_date: "Aug. 21, 2024",
                admission_time: "08:00 AM",
                department: "Neurology",
                doctor: "Dr. Lisa Thompson",
                admission_type: "Outpatient",
                insurance: "BPJS Ketenagakerjaan",
                room_number: "",
                bed_number: "",
                chief_complaint: "Persistent headache with dizziness for 1 week",
                diagnosis: "Migraine without aura, episodic",
                status: "Discharged",
                notes: "Migraine prophylaxis initiated. Lifestyle modifications discussed. Return if symptoms worsen.",
                gender: "Male",
                title: "Mr",
                birthday: "Apr. 22, 1988",
                age: "36",
                phone: "(555)-147-2580",
                address: "147 Willow Road Seattle WA 98101",
                city: "Seattle",
                zip_code: "98101",
                registration_date: "Dec. 05, 2021",
                member_status: "Active member"
            },
            {
                id: 8,
                admission_id: "ADM008",
                patient_name: "Lisa Thompson",
                mrn: "MRN008",
                patient_image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face",
                admission_date: "Aug. 21, 2024",
                admission_time: "03:30 PM",
                department: "Emergency",
                doctor: "Dr. Ahmed Hassan",
                admission_type: "Emergency",
                insurance: "BPJS Kesehatan",
                room_number: "ER-1",
                bed_number: "2",
                chief_complaint: "Motor vehicle accident with multiple contusions and lacerations",
                diagnosis: "Multiple soft tissue injuries, rule out internal trauma",
                status: "Under Observation",
                notes: "CT scan negative for internal bleeding. Observation for 24 hours, pain management initiated.",
                gender: "Female",
                title: "Mrs",
                birthday: "Oct. 18, 1995",
                age: "28",
                phone: "(555)-852-9630",
                address: "852 Spruce Avenue Denver CO 80201",
                city: "Denver",
                zip_code: "80201",
                registration_date: "Feb. 28, 2023",
                member_status: "Active member"
            },
            {
                id: 9,
                admission_id: "ADM009",
                patient_name: "Baby Smith",
                mrn: "MRN009",
                patient_image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
                admission_date: "Aug. 25, 2024",
                admission_time: "06:00 AM",
                department: "Pediatrics",
                doctor: "Dr. Jennifer White",
                admission_type: "Inpatient",
                insurance: "BPJS Kesehatan",
                room_number: "301A",
                bed_number: "1",
                chief_complaint: "Newborn jaundice and feeding difficulties",
                diagnosis: "Neonatal hyperbilirubinemia, breastfeeding issues",
                status: "Active",
                notes: "Phototherapy initiated. Lactation consultant scheduled. Monitor bilirubin levels.",
                gender: "Female",
                title: "Infant",
                birthday: "Aug. 20, 2024",
                age: "5 days",
                phone: "(555)-111-2233",
                address: "111 Baby Lane Boston MA 02101",
                city: "Boston",
                zip_code: "02101",
                registration_date: "Aug. 20, 2024",
                member_status: "Active member"
            },
            {
                id: 10,
                admission_id: "ADM010",
                patient_name: "Tommy Johnson",
                mrn: "MRN010",
                patient_image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
                admission_date: "Aug. 24, 2024",
                admission_time: "03:45 PM",
                department: "Pediatrics",
                doctor: "Dr. Robert Wilson",
                admission_type: "Outpatient",
                insurance: "Private Insurance",
                room_number: "",
                bed_number: "",
                chief_complaint: "Regular growth and development check-up",
                diagnosis: "Normal growth and development for age",
                status: "Discharged",
                notes: "All developmental milestones met. Vaccination schedule up to date. Next visit in 6 months.",
                gender: "Male",
                title: "Child",
                birthday: "Mar. 10, 2018",
                age: "6",
                phone: "(555)-222-3344",
                address: "222 Child Street Portland OR 97201",
                city: "Portland",
                zip_code: "97201",
                registration_date: "Mar. 15, 2018",
                member_status: "Active member"
            },
            {
                id: 11,
                admission_id: "ADM011",
                patient_name: "Amanda Taylor",
                mrn: "MRN011",
                patient_image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
                admission_date: "Aug. 23, 2024",
                admission_time: "11:20 AM",
                department: "Internal Medicine",
                doctor: "Dr. Sarah Wilson",
                admission_type: "Outpatient",
                insurance: "Company Insurance",
                room_number: "",
                bed_number: "",
                chief_complaint: "Annual physical examination and preventive care",
                diagnosis: "Healthy young adult, no acute findings",
                status: "Discharged",
                notes: "All screening tests normal. Lifestyle counseling provided. Annual follow-up recommended.",
                gender: "Female",
                title: "Miss",
                birthday: "Sep. 15, 1998",
                age: "25",
                phone: "(555)-333-4455",
                address: "333 Young Avenue Atlanta GA 30301",
                city: "Atlanta",
                zip_code: "30301",
                registration_date: "Jan. 20, 2022",
                member_status: "Active member"
            },
            {
                id: 12,
                admission_id: "ADM012",
                patient_name: "Jennifer Wilson",
                mrn: "MRN012",
                patient_image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
                admission_date: "Aug. 22, 2024",
                admission_time: "09:15 AM",
                department: "Obstetrics",
                doctor: "Dr. Maria Rodriguez",
                admission_type: "Inpatient",
                insurance: "Private Insurance",
                room_number: "501B",
                bed_number: "2",
                chief_complaint: "Scheduled cesarean delivery at 39 weeks gestation",
                diagnosis: "Term pregnancy, planned cesarean section",
                status: "Active",
                notes: "Pre-operative assessment completed. Surgery scheduled for tomorrow morning. Doing well.",
                gender: "Female",
                title: "Mrs",
                birthday: "Apr. 08, 1987",
                age: "37",
                phone: "(555)-444-5566",
                address: "444 Family Road Nashville TN 37201",
                city: "Nashville",
                zip_code: "37201",
                registration_date: "Oct. 12, 2020",
                member_status: "Active member"
            },
            {
                id: 13,
                admission_id: "ADM013",
                patient_name: "William Anderson",
                mrn: "MRN013",
                patient_image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
                admission_date: "Aug. 21, 2024",
                admission_time: "02:30 PM",
                department: "Cardiology",
                doctor: "Dr. James Brown",
                admission_type: "Outpatient",
                insurance: "BPJS Kesehatan",
                room_number: "",
                bed_number: "",
                chief_complaint: "Routine cardiac follow-up and medication adjustment",
                diagnosis: "Stable coronary artery disease, well controlled",
                status: "Discharged",
                notes: "Cardiac function stable. Medications optimized. Exercise stress test scheduled for next month.",
                gender: "Male",
                title: "Mr",
                birthday: "Nov. 22, 1978",
                age: "45",
                phone: "(555)-555-6677",
                address: "555 Heart Lane Dallas TX 75201",
                city: "Dallas",
                zip_code: "75201",
                registration_date: "Jun. 05, 2019",
                member_status: "Active member"
            },
            {
                id: 14,
                admission_id: "ADM014",
                patient_name: "Charles Thompson",
                mrn: "MRN014",
                patient_image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
                admission_date: "Aug. 20, 2024",
                admission_time: "10:45 AM",
                department: "Orthopedics",
                doctor: "Dr. Emily Davis",
                admission_type: "Inpatient",
                insurance: "Private Insurance",
                room_number: "601A",
                bed_number: "1",
                chief_complaint: "Scheduled total knee replacement surgery",
                diagnosis: "Severe osteoarthritis of the right knee",
                status: "Active",
                notes: "Pre-operative clearance obtained. Surgery completed successfully. Physical therapy to begin tomorrow.",
                gender: "Male",
                title: "Sir",
                birthday: "Jan. 30, 1954",
                age: "70",
                phone: "(555)-666-7788",
                address: "666 Senior Street San Francisco CA 94101",
                city: "San Francisco",
                zip_code: "94101",
                registration_date: "Mar. 10, 2015",
                member_status: "Active member"
            }
        ];
        
        // Initialize with first admission selected
        this.state.currentAdmissionIndex = 0;
    }

    // Generate unique admission ID
    generateAdmissionId() {
        const date = new Date();
        const year = date.getFullYear().toString().slice(-2);
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `ADM${year}${month}${day}${random}`;
    }

    // Computed properties
    get filteredAdmissions() {
        if (!this.state.searchTerm) return this.admissionsData;
        
        const searchTerm = this.state.searchTerm.toLowerCase();
        return this.admissionsData.filter(admission => 
            admission.patient_name.toLowerCase().includes(searchTerm) ||
            admission.admission_id.toLowerCase().includes(searchTerm) ||
            admission.department.toLowerCase().includes(searchTerm) ||
            admission.doctor.toLowerCase().includes(searchTerm) ||
            admission.admission_type.toLowerCase().includes(searchTerm)
        );
    }

    get selectedAdmission() {
        return this.admissionsData[this.state.currentAdmissionIndex] || this.admissionsData[0];
    }

    get currentTabTitle() {
        const titles = {
            assessment: 'Assessment List',
            treatment: 'Treatment History',
            laboratory: 'Laboratory Results',
            radiology: 'Radiology Results'
        };
        return titles[this.state.currentTab] || 'Assessment List';
    }


    // Search functionality - exactly like patient profile
    searchAdmissions(event) {
        this.state.searchTerm = event.target.value;
    }

    clearSearch() {
        this.state.searchTerm = "";
    }

    // Admission selection - exactly like patient profile
    selectAdmission(admission) {
        const index = this.admissionsData.findIndex(a => a.id === admission.id);
        this.state.currentAdmissionIndex = index;
    }

    // Styling methods - exactly like patient profile
    getAdmissionItemClass(admission) {
        const isActive = this.selectedAdmission.id === admission.id;
        return isActive 
            ? "bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg shadow-lg border-2 border-custom-blue dark:border-blue-500 hover:shadow-xl transition-all cursor-pointer"
            : "bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 hover:shadow-md hover:border-gray-300 dark:hover:border-gray-500 transition-all cursor-pointer";
    }

    getPatientImageClass(admission) {
        const isActive = this.selectedAdmission.id === admission.id;
        return isActive 
            ? "w-10 h-10 rounded-full object-cover border-2 border-custom-blue dark:border-blue-400"
            : "w-10 h-10 rounded-full object-cover border border-gray-200 dark:border-gray-600";
    }

    getPatientNameClass(admission) {
        const isActive = this.selectedAdmission.id === admission.id;
        return isActive 
            ? "font-semibold text-custom-blue dark:text-blue-400"
            : "font-semibold text-gray-900 dark:text-gray-100";
    }

    getAdmissionInfoClass(admission) {
        const isActive = this.selectedAdmission.id === admission.id;
        return isActive 
            ? "text-blue-600 dark:text-blue-400 text-xs"
            : "text-gray-600 dark:text-gray-400 text-xs";
    }

    getAdmissionDateClass(admission) {
        const isActive = this.selectedAdmission.id === admission.id;
        return isActive 
            ? "text-blue-500 dark:text-blue-300 text-xs mt-1"
            : "text-gray-600 dark:text-gray-400 text-xs mt-1";
    }

    getStatusBadgeClass(status) {
        const baseClasses = "text-xs font-semibold px-2 py-1 rounded-full";
        switch (status) {
            case 'Active':
                return `${baseClasses} bg-[var(--green-50)] text-[var(--green-800)]`;
            case 'Discharged':
                return `${baseClasses} bg-[var(--gray-50)] text-[var(--gray-800)]`;
            case 'Under Observation':
                return `${baseClasses} bg-[var(--yellow-50)] text-[var(--yellow-800)]`;
            default:
                return `${baseClasses} bg-[var(--gray-50)] text-[var(--gray-800)]`;
        }
    }

    getStatusText(status) {
        const statusMap = {
            'Active': 'Active',
            'Discharged': 'Discharged',
            'Under Observation': 'Observing'
        };
        return statusMap[status] || status;
    }

    getTypeBadgeClass(type) {
        const baseClasses = "text-xs font-semibold px-2 py-0.5 rounded-full";
        switch (type) {
            case 'Outpatient':
                return `${baseClasses} bg-[var(--blue-50)] text-[var(--blue-800)]`;
            case 'Inpatient':
                return `${baseClasses} bg-[var(--purple-50)] text-[var(--purple-800)]`;
            case 'Emergency':
                return `${baseClasses} bg-[var(--red-50)] text-[var(--red-800)]`;
            default:
                return `${baseClasses} bg-[var(--gray-50)] text-[var(--gray-800)]`;
        }
    }

    getDetailStatusClass(status) {
        const baseClasses = "text-xs font-semibold px-3 py-1 rounded-full";
        switch (status) {
            case 'Active':
                return `${baseClasses} bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400`;
            case 'Discharged':
                return `${baseClasses} bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300`;
            case 'Under Observation':
                return `${baseClasses} bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400`;
            case 'Active member':
                return `${baseClasses} bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400`;
            default:
                return `${baseClasses} bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300`;
        }
    }

    // Tab functionality - exactly like patient profile
    switchTab(tabName) {
        this.state.currentTab = tabName;
    }

    getTabClass(tabName) {
        return this.state.currentTab === tabName
            ? "px-3 py-1.5 text-sm font-medium text-white bg-custom-blue rounded-md"
            : "px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-md";
    }

    // Action methods
    addNewAdmission() {
        this.state.showAdmissionModal = true;
        this.state.admissionForm = {
            patient_id: "",
            admission_id: this.generateAdmissionId(),
            admission_date: new Date().toISOString().split('T')[0],
            admission_time: new Date().toTimeString().split(' ')[0].slice(0, 5),
            department: "",
            doctor: "",
            room_number: "",
            bed_number: "",
            admission_type: "Outpatient",
            insurance: "",
            chief_complaint: "",
            diagnosis: "",
            notes: ""
        };
    }

    closeAdmissionModal() {
        this.state.showAdmissionModal = false;
    }

    onAdmissionFormChange(field, value) {
        this.state.admissionForm[field] = value;
    }

    submitAdmissionForm() {
        // Validate required fields
        if (!this.state.admissionForm.patient_id || !this.state.admissionForm.department || 
            !this.state.admissionForm.doctor || !this.state.admissionForm.insurance) {
            alert('Please fill in all required fields');
            return;
        }

        const newAdmission = {
            id: this.admissionsData.length + 1,
            admission_id: this.state.admissionForm.admission_id,
            patient_name: this.getPatientName(this.state.admissionForm.patient_id),
            mrn: this.getPatientMRN(this.state.admissionForm.patient_id),
            patient_image: this.getPatientImage(this.state.admissionForm.patient_id),
            admission_date: this.formatDate(this.state.admissionForm.admission_date),
            admission_time: this.formatTime(this.state.admissionForm.admission_time),
            department: this.state.admissionForm.department,
            doctor: this.state.admissionForm.doctor,
            admission_type: this.state.admissionForm.admission_type,
            insurance: this.state.admissionForm.insurance,
            room_number: this.state.admissionForm.room_number,
            bed_number: this.state.admissionForm.bed_number,
            chief_complaint: this.state.admissionForm.chief_complaint,
            diagnosis: this.state.admissionForm.diagnosis,
            status: "Active",
            notes: this.state.admissionForm.notes
        };

        this.admissionsData.unshift(newAdmission);
        this.state.currentAdmissionIndex = 0; // Select the new admission
        this.closeAdmissionModal();
        alert(`Admission ${newAdmission.admission_id} created successfully!`);
    }

    // Helper methods
    getPatientName(patientId) {
        const patients = {
            "P001": "John Anderson",
            "P002": "Sarah Johnson", 
            "P003": "Michael Chen",
            "P004": "Emily Davis"
        };
        return patients[patientId] || "Unknown Patient";
    }

    getPatientMRN(patientId) {
        const mrns = {
            "P001": "MRN001",
            "P002": "MRN002",
            "P003": "MRN003", 
            "P004": "MRN004"
        };
        return mrns[patientId] || "UNKNOWN";
    }

    getPatientImage(patientId) {
        const images = {
            "P001": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
            "P002": "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
            "P003": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
            "P004": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
        };
        return images[patientId] || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face";
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    }

    formatTime(timeString) {
        const [hours, minutes] = timeString.split(':');
        const date = new Date();
        date.setHours(parseInt(hours), parseInt(minutes));
        return date.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
        });
    }

    // Notes editing functionality - exactly like patient profile
    toggleEditNotes() {
        this.state.isEditingNotes = !this.state.isEditingNotes;
        if (this.state.isEditingNotes) {
            this.state.editingNotesText = this.selectedAdmission.notes || '';
        }
    }

    onNotesChange(value) {
        this.state.editingNotesText = value;
    }

    saveNotes() {
        const newNote = this.state.editingNotesText.trim();
        
        if (newNote) {
            // Update the admission data
            this.admissionsData[this.state.currentAdmissionIndex].notes = newNote;
            
            // Exit edit mode
            this.state.isEditingNotes = false;
            this.state.editingNotesText = "";
            
            // Show success message
            this.showNotification('Notes saved successfully!', 'success');
        } else {
            this.showNotification('Notes cannot be empty!', 'error');
        }
    }

    cancelEditNotes() {
        this.state.isEditingNotes = false;
        this.state.editingNotesText = "";
    }

    showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg text-white font-semibold z-50 transform transition-all duration-300 translate-x-full`;
        
        if (type === 'success') {
            notification.classList.add('bg-green-600');
        } else if (type === 'error') {
            notification.classList.add('bg-red-600');
        }
        
        notification.innerHTML = `
            <div class="flex items-center">
                <span class="material-icons text-sm mr-2">${type === 'success' ? 'check_circle' : 'error'}</span>
                ${message}
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Hide notification after 3 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Action button methods
    viewAdmissionDetails() {
        console.log('Viewing admission details for:', this.selectedAdmission.patient_name);
    }

    editAdmission() {
        console.log('Editing admission for:', this.selectedAdmission.patient_name);
    }

    printAdmission() {
        console.log('Printing admission form for:', this.selectedAdmission.patient_name);
    }

    editAdmissionNotes() {
        this.toggleEditNotes();
    }

    // Admission selection with notes cancel
    selectAdmission(admission) {
        // If currently editing notes, cancel edit mode
        if (this.state.isEditingNotes) {
            this.cancelEditNotes();
        }

        const index = this.admissionsData.findIndex(a => a.id === admission.id);
        this.state.currentAdmissionIndex = index;
    }
}