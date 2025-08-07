/** @odoo-module **/

import { Component, useState, onWillStart } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";

export class DoctorCreateEdit extends Component {
    static template = "healthnusa.DoctorCreateEdit";
    static props = {
        currentDoctor: [Number, { value: null }],
        isEditMode: Boolean,
        showDoctorDetail: Function,
        showDoctorList: Function,
    };

    setup() {
        this.orm = useService("orm");

        this.state = useState({
            currentTab: 'personal',
            formData: {
                fullName: '',
                specialization: '',
                phone: '',
                gender: '',
                address: '',
                email: '',
                birthDate: '',
                strNumber: '',
                sipNumber: '',
                dutyStatus: 'on_duty',
                avatar: this.getDefaultAvatar()
            },
            education: [],
            experience: [],
            schedule: this.getDefaultSchedule(),
            saving: false,
            validationErrors: {},
            // Add specialty options state
            specialtyOptions: [],
            loadingSpecialties: true
        });

        this.daysOfWeek = [
            { id: 'monday', name: 'Mon', color: 'blue' },
            { id: 'tuesday', name: 'Tue', color: 'green' },
            { id: 'wednesday', name: 'Wed', color: 'pink' },
            { id: 'thursday', name: 'Thu', color: 'purple' },
            { id: 'friday', name: 'Fri', color: 'yellow' },
            { id: 'saturday', name: 'Sat', color: 'gray' },
            { id: 'sunday', name: 'Sun', color: 'gray' }
        ];

        // Load specialties on component start
        onWillStart(async () => {
            await this.loadSpecialties();

            // Debug: Log schedule structure
            console.log('Initial schedule structure:', this.state.schedule);
            console.log('Schedule keys:', Object.keys(this.state.schedule));

            // Load employee data if in edit mode
            if (this.props.isEditMode && this.props.currentDoctor) {
                await this.loadEmployeeData();
            }
        });
    }

    // Add method to load specialties
    async loadSpecialties() {
        try {
            this.state.loadingSpecialties = true;
            const specialties = await this.orm.searchRead(
                "healthnusa.doctor.specialty",
                [["active", "=", true]], // Filter only active specialties
                ["id", "name"], // Fields to fetch
                { order: "name asc" } // Order by name
            );
            this.state.specialtyOptions = specialties;
        } catch (error) {
            console.error("Failed to load specialties:", error);
            this.showErrorPopup('Gagal memuat data spesialisasi', ['Terjadi kesalahan saat memuat data spesialisasi. Silakan refresh halaman.']);
        } finally {
            this.state.loadingSpecialties = false;
        }
    }

    // Add method to load employee data in edit mode
    async loadEmployeeData() {
        try {
            const employee = await this.orm.read(
                "hr.employee",
                [this.props.currentDoctor],
                [
                    "name", "work_email", "work_phone", "gender", "birthday",
                    "private_street", "image_1920", "specialty_id",
                    "str_number", "sip_number", "duty_status"
                ]
            );

            if (employee && employee.length > 0) {
                const emp = employee[0];

                // Update form data with employee data
                this.state.formData = {
                    fullName: emp.name || '',
                    specialization: emp.specialty_id ? emp.specialty_id[0] : '',
                    phone: emp.work_phone || '',
                    gender: emp.gender || '',
                    address: emp.private_street || '',
                    email: emp.work_email || '',
                    birthDate: emp.birthday || '',
                    strNumber: emp.str_number || '',
                    sipNumber: emp.sip_number || '',
                    dutyStatus: emp.duty_status || 'on_duty',
                    avatar: emp.image_1920 ? `data:image/jpeg;base64,${emp.image_1920}` : this.getDefaultAvatar()
                };

                // Load related data
                await this.loadEducationData(this.props.currentDoctor);
                await this.loadExperienceData(this.props.currentDoctor);
                await this.loadScheduleData(this.props.currentDoctor);
            }
        } catch (error) {
            console.error("Failed to load employee data:", error);
            this.showErrorPopup('Gagal memuat data dokter', ['Terjadi kesalahan saat memuat data dokter. Silakan refresh halaman.']);
        }
    }

    // Add method to load education data
    async loadEducationData(doctorId) {
        try {
            const educations = await this.orm.searchRead(
                "healthnusa.doctor.education",
                [["doctor_id", "=", doctorId]],
                ["degree", "institution", "year", "start_date", "end_date"],
                { order: "start_date desc" }
            );

            this.state.education = educations.map(edu => ({
                id: edu.id,
                degree: edu.degree || '',
                institution: edu.institution || '',
                year: edu.year || `${edu.start_date || ''} - ${edu.end_date || ''}`,
                editing: false
            }));
        } catch (error) {
            console.warn("Failed to load education data:", error);
            this.state.education = [];
        }
    }

    // Add method to load experience data
    async loadExperienceData(doctorId) {
        try {
            const experiences = await this.orm.searchRead(
                "healthnusa.doctor.experience",
                [["doctor_id", "=", doctorId]],
                ["position", "institution", "start_date", "end_date"],
                { order: "start_date desc" }
            );

            this.state.experience = experiences.map(exp => ({
                id: exp.id,
                position: exp.position || '',
                institution: exp.institution || '',
                period: `${exp.start_date || ''} - ${exp.end_date || 'Present'}`,
                editing: false
            }));
        } catch (error) {
            console.warn("Failed to load experience data:", error);
            this.state.experience = [];
        }
    }

    // Updated method to load schedule data
    async loadScheduleData(doctorId) {
        try {
            const schedules = await this.orm.searchRead(
                "healthnusa.doctor.schedule",
                [["doctor_id", "=", doctorId], ["active", "=", true]],
                ["day_of_week", "start_time", "end_time", "notes"],
                { order: "day_of_week" }
            );

            // Reset schedule to default
            this.state.schedule = this.getDefaultSchedule();

            // Map schedules to our format
            schedules.forEach(schedule => {
                const dayKey = schedule.day_of_week; // Use the string value directly

                if (dayKey && this.state.schedule[dayKey]) {
                    this.state.schedule[dayKey].enabled = true;
                    this.state.schedule[dayKey].slots = [{
                        start: this.convertFloatToTime(schedule.start_time),
                        end: this.convertFloatToTime(schedule.end_time),
                        notes: schedule.notes || ''
                    }];
                }
            });
        } catch (error) {
            console.warn("Failed to load schedule data:", error);
            this.state.schedule = this.getDefaultSchedule();
        }
    }

    // Add method to save education data
    async saveEducationData(doctorId) {
        try {
            // Delete existing education records
            const existingEducations = await this.orm.search("healthnusa.doctor.education", [["doctor_id", "=", doctorId]]);
            if (existingEducations.length > 0) {
                await this.orm.unlink("healthnusa.doctor.education", existingEducations);
            }

            // Create new education records
            const educationData = this.state.education
                .filter(edu => edu.degree && edu.institution)
                .map(edu => ({
                    doctor_id: doctorId,
                    degree: edu.degree,
                    institution: edu.institution,
                    year: edu.year
                }));

            if (educationData.length > 0) {
                await this.orm.create("healthnusa.doctor.education", educationData);
            }
        } catch (error) {
            console.warn("Failed to save education data:", error);
        }
    }

    // Add method to save experience data
    async saveExperienceData(doctorId) {
        try {
            // Delete existing experience records
            const existingExperiences = await this.orm.search("healthnusa.doctor.experience", [["doctor_id", "=", doctorId]]);
            if (existingExperiences.length > 0) {
                await this.orm.unlink("healthnusa.doctor.experience", existingExperiences);
            }

            // Create new experience records
            const experienceData = this.state.experience
                .filter(exp => exp.position && exp.institution)
                .map(exp => ({
                    doctor_id: doctorId,
                    position: exp.position,
                    institution: exp.institution,
                    // You might want to parse the period to extract start_date and end_date
                    period: exp.period
                }));

            if (experienceData.length > 0) {
                await this.orm.create("healthnusa.doctor.experience", experienceData);
            }
        } catch (error) {
            console.warn("Failed to save experience data:", error);
        }
    }


    // Add method to save schedule data
    async saveScheduleData(doctorId) {
        try {
            // Delete existing schedule records
            const existingSchedules = await this.orm.search("healthnusa.doctor.schedule", [["doctor_id", "=", doctorId]]);
            if (existingSchedules.length > 0) {
                await this.orm.unlink("healthnusa.doctor.schedule", existingSchedules);
            }

            // Create new schedule records
            const scheduleData = [];

            Object.keys(this.state.schedule).forEach(dayKey => {
                const daySchedule = this.state.schedule[dayKey];
                if (daySchedule.enabled && daySchedule.slots.length > 0) {
                    daySchedule.slots.forEach(slot => {
                        // Validate time format before saving
                        if (slot.start && slot.end) {
                            // Convert time string (HH:MM) to float
                            const startFloat = this.convertTimeToFloat(slot.start);
                            const endFloat = this.convertTimeToFloat(slot.end);

                            scheduleData.push({
                                doctor_id: doctorId,
                                day_of_week: dayKey, // Use the string key directly (monday, tuesday, etc.)
                                start_time: startFloat,
                                end_time: endFloat,
                                active: true,
                                notes: slot.notes || ''
                            });
                        }
                    });
                }
            });

            console.log('Schedule data to save:', scheduleData);

            if (scheduleData.length > 0) {
                await this.orm.create("healthnusa.doctor.schedule", scheduleData);
                console.log('Schedule data saved successfully');
            }
        } catch (error) {
            console.error("Failed to save schedule data:", error);
            // Don't throw error to prevent main save from failing
            // Just log the warning for now
        }
    }

    // Add helper method to convert time string to float
    convertTimeToFloat(timeString) {
        if (!timeString) return 0.0;

        const [hours, minutes] = timeString.split(':').map(Number);
        return hours + (minutes / 60);
    }

    // Add helper method to convert float to time string
    convertFloatToTime(floatTime) {
        if (!floatTime) return "00:00";

        const hours = Math.floor(floatTime);
        const minutes = Math.round((floatTime - hours) * 60);
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }

    // Add method to get specialty name by ID
    getSpecialtyName(specialtyId) {
        const specialty = this.state.specialtyOptions.find(s => s.id === specialtyId);
        return specialty ? specialty.name : '';
    }

    getDefaultAvatar() {
        return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='144' height='144' viewBox='0 0 144 144'%3E%3Crect width='144' height='144' fill='%23f3f4f6'/%3E%3Cg fill='%239ca3af'%3E%3Ccircle cx='72' cy='50' r='18'/%3E%3Cpath d='M72 80c-20 0-36 12-36 26v18h72V106c0-14-16-26-36-26z'/%3E%3C/g%3E%3C/svg%3E";
    }

    getDefaultSchedule() {
        return {
            monday: { enabled: true, slots: [{ start: '09:00', end: '17:00', notes: '' }] },
            tuesday: { enabled: true, slots: [{ start: '09:00', end: '17:00', notes: '' }] },
            wednesday: { enabled: true, slots: [{ start: '09:00', end: '17:00', notes: '' }] },
            thursday: { enabled: true, slots: [{ start: '09:00', end: '17:00', notes: '' }] },
            friday: { enabled: true, slots: [{ start: '09:00', end: '12:00', notes: '' }] },
            saturday: { enabled: false, slots: [] },
            sunday: { enabled: false, slots: [] }
        };
    }

    switchTab(tabId) {
        this.state.currentTab = tabId;
    }

    updateFormData(field, value) {
        // Handle specialization field conversion to integer
        if (field === 'specialization') {
            this.state.formData[field] = value ? parseInt(value) : '';
        } else {
            this.state.formData[field] = value;
        }

        // Clear validation error when user starts typing/selecting
        if (this.state.validationErrors[field]) {
            delete this.state.validationErrors[field];
        }
    }

    toggleScheduleDay(day) {
        this.state.schedule[day].enabled = !this.state.schedule[day].enabled;
        if (!this.state.schedule[day].enabled) {
            this.state.schedule[day].slots = [];
        } else if (this.state.schedule[day].slots.length === 0) {
            this.state.schedule[day].slots = [{ start: '09:00', end: '17:00', notes: '' }];
        }
    }

    addTimeSlot(day) {
        this.state.schedule[day].slots.push({
            start: '09:00',
            end: '17:00',
            notes: ''
        });
    }

    removeTimeSlot(day, slotIndex) {
        this.state.schedule[day].slots.splice(slotIndex, 1);
    }

    updateTimeSlot(day, slotIndex, field, value) {
        this.state.schedule[day].slots[slotIndex][field] = value;
    }

    handlePhotoUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
            if (!allowedTypes.includes(file.type)) {
                this.showErrorPopup('Format file tidak valid', ['Harap pilih file gambar dengan format JPEG, PNG, GIF, atau WebP']);
                return;
            }

            const maxSize = 5 * 1024 * 1024; // 5MB
            if (file.size > maxSize) {
                this.showErrorPopup('Ukuran file terlalu besar', ['Ukuran file harus kurang dari 5MB']);
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                this.state.formData.avatar = e.target.result;
            };
            reader.onerror = () => {
                this.showErrorPopup('Gagal membaca file', ['Terjadi kesalahan saat membaca file. Silakan coba lagi.']);
                this.state.formData.avatar = this.getDefaultAvatar();
            };
            reader.readAsDataURL(file);
        }
    }

    addEducationRow() {
        this.state.education.push({
            degree: '',
            institution: '',
            year: '',
            editing: true
        });
    }

    editEducationRow(index) {
        this.state.education[index].editing = true;
    }

    saveEducationRow(index) {
        const edu = this.state.education[index];
        if (!edu.degree.trim() || !edu.institution.trim() || !edu.year.trim()) {
            this.showErrorPopup('Field tidak boleh kosong', ['Harap lengkapi semua field pendidikan']);
            return;
        }
        edu.editing = false;
    }

    removeEducationRow(index) {
        this.showConfirmationPopup(
            'Hapus Data Pendidikan',
            'Apakah Anda yakin ingin menghapus data pendidikan ini?',
            async () => {
                const education = this.state.education[index];

                // If in edit mode and education has ID, delete from database
                if (this.props.isEditMode && education.id) {
                    try {
                        await this.orm.unlink("healthnusa.doctor.education", [education.id]);
                        console.log('Education record deleted from database:', education.id);
                    } catch (error) {
                        console.error('Failed to delete education from database:', error);
                        this.showErrorPopup('Gagal menghapus data', ['Terjadi kesalahan saat menghapus data pendidikan dari database.']);
                        return; // Don't remove from UI if database delete failed
                    }
                }

                // Remove from local state
                this.state.education.splice(index, 1);
            }
        );
    }

    addExperienceRow() {
        this.state.experience.push({
            position: '',
            institution: '',
            period: '',
            editing: true
        });
    }

    editExperienceRow(index) {
        this.state.experience[index].editing = true;
    }

    saveExperienceRow(index) {
        const exp = this.state.experience[index];
        if (!exp.position.trim() || !exp.institution.trim() || !exp.period.trim()) {
            this.showErrorPopup('Field tidak boleh kosong', ['Harap lengkapi semua field pengalaman kerja']);
            return;
        }
        exp.editing = false;
    }

    removeExperienceRow(index) {
        this.showConfirmationPopup(
            'Hapus Data Pengalaman',
            'Apakah Anda yakin ingin menghapus data pengalaman kerja ini?',
            async () => {
                const experience = this.state.experience[index];

                // If in edit mode and experience has ID, delete from database
                if (this.props.isEditMode && experience.id) {
                    try {
                        await this.orm.unlink("healthnusa.doctor.experience", [experience.id]);
                        console.log('Experience record deleted from database:', experience.id);
                    } catch (error) {
                        console.error('Failed to delete experience from database:', error);
                        this.showErrorPopup('Gagal menghapus data', ['Terjadi kesalahan saat menghapus data pengalaman dari database.']);
                        return; // Don't remove from UI if database delete failed
                    }
                }

                // Remove from local state
                this.state.experience.splice(index, 1);
            }
        );
    }

    // Add validation method
    validateRequiredFields() {
        const requiredFields = {
            'fullName': 'Nama Lengkap',
            'specialization': 'Spesialisasi',
            'email': 'Email'
        };

        const errors = {};
        let hasErrors = false;

        Object.keys(requiredFields).forEach(field => {
            const value = this.state.formData[field];

            // Check if field is empty
            if (!value ||
                (typeof value === 'string' && !value.trim()) ||
                (field === 'specialization' && (value === '' || value === 0))) {
                errors[field] = requiredFields[field];
                hasErrors = true;
            }
        });

        this.state.validationErrors = errors;
        return !hasErrors;
    }

    // Helper method to get field error class
    getFieldErrorClass(fieldName) {
        return this.state.validationErrors[fieldName]
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:ring-custom-blue';
    }

    async saveDoctor() {

        console.log('Saving doctor data...');
        console.log("Full Name: ", this.state.formData.fullName);
        console.log("Specialization ID: ", this.state.formData.specialization);

        // Validate required fields and show errors
        if (!this.validateRequiredFields()) {
            // Switch to personal tab if there are validation errors
            this.state.currentTab = 'personal';

            // Show error popup with list of missing fields
            const missingFields = Object.values(this.state.validationErrors);
            this.showErrorPopup('Mohon lengkapi field yang diperlukan', missingFields);

            // Scroll to first error field
            setTimeout(() => {
                const firstErrorField = Object.keys(this.state.validationErrors)[0];
                const element = document.querySelector(`input[name="${firstErrorField}"], select[name="${firstErrorField}"], input[data-field="${firstErrorField}"], select[data-field="${firstErrorField}"]`);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    element.focus();
                }
            }, 100);

            return;
        }

        this.state.saving = true;

        try {
            // Prepare data for hr.employee model
            const employeeData = {
                name: this.state.formData.fullName,
                work_email: this.state.formData.email,
                work_phone: this.state.formData.phone || false,
                gender: this.state.formData.gender || false,
                birthday: this.state.formData.birthDate || false,
                private_street: this.state.formData.address || false,
                image_1920: this.state.formData.avatar && this.state.formData.avatar !== this.getDefaultAvatar()
                    ? this.state.formData.avatar.split(',')[1] : false, // Remove data:image/jpeg;base64, prefix

                // Doctor specific fields (based on the model you provided)
                is_doctor: true,
                specialty_id: this.state.formData.specialization || false,
                str_number: this.state.formData.strNumber || false,
                sip_number: this.state.formData.sipNumber || false,
                duty_status: this.state.formData.dutyStatus || 'on_duty',

                // Set employee category/job position as doctor
                job_title: 'Doctor',

                // Additional fields if needed
                active: true,
                employee_type: 'employee'
            };

            let result;
            let doctorId;

            if (this.props.isEditMode && this.props.currentDoctor) {
                // Update existing employee
                console.log('Updating employee with ID:', this.props.currentDoctor);
                result = await this.orm.write("hr.employee", [this.props.currentDoctor], employeeData);
                doctorId = this.props.currentDoctor;
                console.log('Employee updated successfully:', result);
            } else {
                // Create new employee
                console.log('Creating new employee with data:', employeeData);
                result = await this.orm.create("hr.employee", [employeeData]);
                doctorId = result[0]; // Create returns array of IDs
                console.log('Employee created successfully with ID:', doctorId);
            }

            // Handle education data - create/update education records
            try {
                if (this.state.education && this.state.education.length > 0) {
                    await this.saveEducationData(doctorId);
                }
            } catch (error) {
                console.warn('Failed to save education data:', error);
            }

            // Handle experience data - create/update experience records
            try {
                if (this.state.experience && this.state.experience.length > 0) {
                    await this.saveExperienceData(doctorId);
                }
            } catch (error) {
                console.warn('Failed to save experience data:', error);
            }

            // Handle schedule data - create/update schedule records
            try {
                if (this.state.schedule) {
                    await this.saveScheduleData(doctorId);
                }
            } catch (error) {
                console.warn('Failed to save schedule data:', error);
                // Show warning but don't fail the entire save
                this.showErrorPopup('Peringatan', ['Data dokter berhasil disimpan, tetapi jadwal gagal disimpan. Silakan edit jadwal secara terpisah.']);
            }

            const successMessage = this.props.isEditMode ? 'Doctor updated successfully!' : 'Doctor added successfully!';
            this.showSuccessMessage(successMessage);

            // Clear validation errors on successful save
            this.state.validationErrors = {};

            // Navigate back to detail view or list
            setTimeout(() => {
                if (this.props.isEditMode && this.props.currentDoctor) {
                    this.props.showDoctorDetail(this.props.currentDoctor);
                } else {
                    this.props.showDoctorList();
                }
            }, 1000);

        } catch (error) {
            console.error('Error saving doctor data:', error);
            let errorMessage = 'Gagal menyimpan data dokter. Silakan coba lagi.';

            // Handle specific error types
            if (error.data && error.data.message) {
                errorMessage = error.data.message;
            } else if (error.message) {
                errorMessage = error.message;
            }

            this.showErrorPopup('Terjadi kesalahan', [errorMessage]);
        } finally {
            this.state.saving = false;
        }
    }

    cancelEdit() {
        this.showConfirmationPopup(
            'Batalkan Perubahan',
            'Apakah Anda yakin ingin membatalkan? Semua perubahan yang belum disimpan akan hilang.',
            () => {
                // Clear validation errors
                this.state.validationErrors = {};

                if (this.props.isEditMode && this.props.currentDoctor) {
                    this.props.showDoctorDetail(this.props.currentDoctor);
                } else {
                    this.props.showDoctorList();
                }
            }
        );
    }

    showSuccessMessage(message) {
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
        notification.innerHTML = `
            <div class="flex items-center space-x-2">
                <span class="material-icons">check_circle</span>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 10);

        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    showErrorPopup(title, messages) {
        const popup = document.createElement('div');
        popup.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 popup-overlay';
        popup.innerHTML = `
            <div class="bg-white rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl transform transition-all duration-300 scale-100 popup-content">
                <div class="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full">
                    <span class="material-icons text-red-600 text-2xl">warning</span>
                </div>
                <h3 class="text-xl font-bold text-gray-800 text-center mb-2">${title}</h3>
                <div class="mb-6 space-y-2">
                    ${messages.map(msg => `
                        <div class="field-error p-3 bg-gray-50 rounded-lg">
                            <p class="font-semibold text-sm text-gray-600">${msg}</p>
                        </div>
                    `).join('')}
                </div>
                <div class="flex justify-center">
                    <button class="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium popup-close-btn">
                        Mengerti
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(popup);

        // Close popup handlers
        const closePopup = () => {
            popup.querySelector('.popup-content').style.transform = 'scale(0.95)';
            popup.style.opacity = '0';
            setTimeout(() => {
                if (document.body.contains(popup)) {
                    document.body.removeChild(popup);
                }
            }, 200);
        };

        popup.querySelector('.popup-close-btn').addEventListener('click', closePopup);
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                closePopup();
            }
        });

        // Close on Escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closePopup();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
    }

    showConfirmationPopup(title, message, onConfirm) {
        const popup = document.createElement('div');
        popup.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 popup-overlay';
        popup.innerHTML = `
            <div class="bg-white rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl transform transition-all duration-300 scale-100 popup-content">
                <div class="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full">
                    <span class="material-icons text-yellow-600 text-2xl">warning</span>
                </div>
                <h3 class="text-xl font-bold text-gray-800 text-center mb-2">${title}</h3>
                <p class="text-gray-600 text-center mb-6">${message}</p>
                <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                    <button class="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-medium popup-cancel-btn">
                        Batal
                    </button>
                    <button class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium popup-confirm-btn">
                        Ya, Lanjutkan
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(popup);

        // Close popup handlers
        const closePopup = () => {
            popup.querySelector('.popup-content').style.transform = 'scale(0.95)';
            popup.style.opacity = '0';
            setTimeout(() => {
                if (document.body.contains(popup)) {
                    document.body.removeChild(popup);
                }
            }, 200);
        };

        popup.querySelector('.popup-cancel-btn').addEventListener('click', closePopup);
        popup.querySelector('.popup-confirm-btn').addEventListener('click', () => {
            onConfirm();
            closePopup();
        });

        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                closePopup();
            }
        });

        // Close on Escape key
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closePopup();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
    }

    get pageTitle() {
        return this.props.isEditMode ? 'Edit Doctor' : 'Add New Doctor';
    }

    get pageSubtitle() {
        return this.props.isEditMode ? 'Update doctor information' : 'Fill in the doctor\'s information';
    }

    get saveButtonText() {
        return this.props.isEditMode ? 'Update Doctor' : 'Save Doctor';
    }
}