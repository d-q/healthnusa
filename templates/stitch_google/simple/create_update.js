// App state
let isDarkMode = false;
let currentTab = 'personal';
let educationCount = 0;
let experienceCount = 0;
let isEditMode = false;
let currentDoctorId = null;
let isMobile = window.innerWidth < 768;

// Days of the week
const daysOfWeek = [
    { id: 'monday', name: 'Mon', color: 'blue' },
    { id: 'tuesday', name: 'Tue', color: 'green' },
    { id: 'wednesday', name: 'Wed', color: 'pink' },
    { id: 'thursday', name: 'Thu', color: 'purple' },
    { id: 'friday', name: 'Fri', color: 'yellow' },
    { id: 'saturday', name: 'Sat', color: 'gray' },
    { id: 'sunday', name: 'Sun', color: 'gray' }
];

// Initialize app
document.addEventListener('DOMContentLoaded', function () {
    initializeApp();
    setupResponsiveHandlers();
});

function initializeApp() {
    loadThemeState();
    loadSidebarState();
    setupEventListeners();
    setupSchedule();
    checkIfEditMode();
    updatePageTitle();
    setupDefaultAvatar();
    checkMobileView();
}

function setupResponsiveHandlers() {
    // Handle window resize
    window.addEventListener('resize', () => {
        const wasMobile = isMobile;
        isMobile = window.innerWidth < 768;
        
        if (wasMobile !== isMobile) {
            checkMobileView();
            closeMobileSidebar();
        }
    });
    
    // Handle mobile overlay clicks
    const mobileOverlay = document.getElementById('mobile-overlay');
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', closeMobileSidebar);
    }
}

function checkMobileView() {
    const sidebar = document.getElementById('sidebar');
    const mobileOverlay = document.getElementById('mobile-overlay');
    
    if (isMobile) {
        // Mobile: sidebar should be hidden by default
        if (sidebar) {
            sidebar.classList.remove('show');
        }
        if (mobileOverlay) {
            mobileOverlay.classList.remove('show');
        }
    } else {
        // Desktop: sidebar should be visible
        if (sidebar) {
            sidebar.classList.remove('show');
        }
        if (mobileOverlay) {
            mobileOverlay.classList.remove('show');
        }
    }
}

function loadThemeState() {
    const savedTheme = localStorage.getItem('hospital-theme');
    if (savedTheme === 'dark') {
        isDarkMode = true;
        document.body.classList.add('dark');
        const themeIcon = document.querySelector('#theme-toggle .material-icons');
        if (themeIcon) {
            themeIcon.textContent = 'light_mode';
        }
    }
}

function saveThemeState() {
    localStorage.setItem('hospital-theme', isDarkMode ? 'dark' : 'light');
}

function loadSidebarState() {
    const savedSidebarState = localStorage.getItem('hospital-sidebar');
    const sidebar = document.getElementById('sidebar');
    if (savedSidebarState === 'collapsed' && sidebar && !isMobile) {
        sidebar.classList.add('collapsed');
    }
}

function saveSidebarState() {
    const sidebar = document.getElementById('sidebar');
    const isCollapsed = sidebar && sidebar.classList.contains('collapsed');
    localStorage.setItem('hospital-sidebar', isCollapsed ? 'collapsed' : 'expanded');
}

function setupDefaultAvatar() {
    const avatar = document.getElementById('doctor-avatar');
    
    // Set default avatar if no src or if image fails to load
    avatar.addEventListener('error', function() {
        this.src = getDefaultAvatar();
    });
    
    // If no src is set, use default
    if (!avatar.src || avatar.src.includes('placeholder')) {
        avatar.src = getDefaultAvatar();
    }
}

function getDefaultAvatar() {
    // Check if dark mode is active
    const isDark = document.body.classList.contains('dark');
    
    if (isDark) {
        // Dark mode avatar with lighter colors
        return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='144' height='144' viewBox='0 0 144 144'%3E%3Crect width='144' height='144' fill='%23374151'/%3E%3Cg fill='%236b7280'%3E%3Ccircle cx='72' cy='50' r='18'/%3E%3Cpath d='M72 80c-20 0-36 12-36 26v18h72V106c0-14-16-26-36-26z'/%3E%3C/g%3E%3C/svg%3E";
    } else {
        // Light mode avatar
        return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='144' height='144' viewBox='0 0 144 144'%3E%3Crect width='144' height='144' fill='%23f3f4f6'/%3E%3Cg fill='%239ca3af'%3E%3Ccircle cx='72' cy='50' r='18'/%3E%3Cpath d='M72 80c-20 0-36 12-36 26v18h72V106c0-14-16-26-36-26z'/%3E%3C/g%3E%3C/svg%3E";
    }
}

function setupEventListeners() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMobileSidebar);
    }

    // Desktop menu toggle
    const desktopMenuToggle = document.getElementById('desktop-menu-toggle');
    if (desktopMenuToggle) {
        desktopMenuToggle.addEventListener('click', toggleSidebar);
    }

    // Theme toggle
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

    // Tab navigation
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior
            const tabId = e.target.closest('.tab-btn').id.replace('tab-', '');
            console.log('Tab clicked:', tabId); // Debug log
            switchTab(tabId);
        });
    });

    // Photo upload
    document.getElementById('upload-photo').addEventListener('click', () => {
        document.getElementById('photo-input').click();
    });

    document.getElementById('photo-input').addEventListener('change', handlePhotoUpload);

    // Action buttons
    document.getElementById('save-btn').addEventListener('click', saveDoctor);
    document.getElementById('cancel-btn').addEventListener('click', cancelEdit);

    // Add buttons
    document.getElementById('add-education').addEventListener('click', addEducationRow);
    document.getElementById('add-experience').addEventListener('click', addExperienceRow);
    document.getElementById('add-education-personal').addEventListener('click', addEducationRowPersonal);
    document.getElementById('add-experience-personal').addEventListener('click', addExperienceRowPersonal);

    // Handle ESC key to close mobile sidebar
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeMobileSidebar();
        }
    });
}

// Mobile Sidebar Functions
function toggleMobileSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mobileOverlay = document.getElementById('mobile-overlay');
    
    if (sidebar && mobileOverlay) {
        if (sidebar.classList.contains('show')) {
            closeMobileSidebar();
        } else {
            openMobileSidebar();
        }
    }
}

function openMobileSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mobileOverlay = document.getElementById('mobile-overlay');
    
    if (sidebar) {
        sidebar.classList.add('show');
    }
    if (mobileOverlay) {
        mobileOverlay.classList.add('show');
    }
    
    // Prevent body scroll when sidebar is open
    document.body.style.overflow = 'hidden';
}

function closeMobileSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mobileOverlay = document.getElementById('mobile-overlay');
    
    if (sidebar) {
        sidebar.classList.remove('show');
    }
    if (mobileOverlay) {
        mobileOverlay.classList.remove('show');
    }
    
    // Restore body scroll
    document.body.style.overflow = '';
}

function toggleSidebar() {
    if (isMobile) {
        toggleMobileSidebar();
    } else {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            sidebar.classList.toggle('collapsed');
            saveSidebarState();
        }
    }
}

function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark', isDarkMode);

    const themeIcon = document.querySelector('#theme-toggle .material-icons');
    themeIcon.textContent = isDarkMode ? 'light_mode' : 'dark_mode';
    
    // Update default avatar for new theme if it's currently showing default
    const avatar = document.getElementById('doctor-avatar');
    if (avatar && avatar.src.includes('data:image/svg+xml')) {
        avatar.src = getDefaultAvatar();
    }
    
    saveThemeState();
}

function switchTab(tabId) {
    console.log('Switching to tab:', tabId); // Debug log
    
    // Update tab buttons - remove active states from all
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('text-blue-600', 'border-blue-600', 'border-b-2', 'font-semibold');
        btn.classList.add('text-gray-500');
    });

    // Add active state to clicked tab
    const activeTab = document.getElementById(`tab-${tabId}`);
    if (activeTab) {
        activeTab.classList.remove('text-gray-500');
        activeTab.classList.add('text-blue-600', 'border-b-2', 'border-blue-600', 'font-semibold');
    }

    // Hide all tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.add('hidden');
        content.setAttribute('aria-hidden', 'true');
    });

    // Show the selected tab content
    let tabContent = document.getElementById(`${tabId}-tab`);
    
    // Handle special case mapping if needed
    if (!tabContent) {
        // Map alternative IDs
        const tabMapping = {
            'personal': 'personal-tab',
            'education': 'education-tab', 
            'experience': 'experience-tab'
        };
        
        const mappedId = tabMapping[tabId];
        if (mappedId) {
            tabContent = document.getElementById(mappedId);
        }
    }
    
    if (tabContent) {
        tabContent.classList.remove('hidden');
        tabContent.setAttribute('aria-hidden', 'false');
        console.log('Showing tab content:', tabContent.id); // Debug log
    } else {
        console.warn('Tab content not found for:', tabId); // Debug warning
        // Fallback to personal tab if content not found
        const fallbackContent = document.getElementById('personal-tab');
        if (fallbackContent) {
            fallbackContent.classList.remove('hidden');
            fallbackContent.setAttribute('aria-hidden', 'false');
        }
    }
    
    currentTab = tabId;
}

function handlePhotoUpload(e) {
    const file = e.target.files[0];
    if (file) {
        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            alert('Please select a valid image file (JPEG, PNG, GIF, or WebP)');
            return;
        }
        
        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        if (file.size > maxSize) {
            alert('File size must be less than 5MB');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const avatar = document.getElementById('doctor-avatar');
            avatar.src = e.target.result;
        };
        reader.onerror = function() {
            alert('Error reading file. Please try again.');
            document.getElementById('doctor-avatar').src = getDefaultAvatar();
        };
        reader.readAsDataURL(file);
    }
}

function setupSchedule() {
    const scheduleContainer = document.getElementById('schedule-container');
    
    scheduleContainer.innerHTML = daysOfWeek.map(day => `
        <div class="flex items-start space-x-2">
            <label class="flex items-center space-x-2 p-2 border rounded-md cursor-pointer w-20 justify-center ${day.color === 'gray' ? 'bg-gray-100 text-gray-500' : ''}" 
                   data-day="${day.id}">
                <input class="form-checkbox h-4 w-4 text-${day.color}-600" type="checkbox" ${day.color === 'gray' ? '' : 'checked'} />
                <span>${day.name}</span>
            </label>
            <div class="flex-1 space-y-2">
                <div class="flex items-center space-x-2 schedule-time" ${day.color === 'gray' ? 'style="opacity: 0.5"' : ''}>
                    <input class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-blue" type="time" value="09:00" ${day.color === 'gray' ? 'disabled' : ''} />
                    <span>-</span>
                    <input class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-blue" type="time" value="${day.id === 'friday' ? '12:00' : '17:00'}" ${day.color === 'gray' ? 'disabled' : ''} />
                    <button class="text-gray-400 hover:text-red-500" ${day.color === 'gray' ? 'disabled' : ''} onclick="removeTimeSlot(this)">
                        <span class="material-icons text-base">delete</span>
                    </button>
                </div>
                <button class="text-blue-500 text-xs font-semibold add-time-btn" ${day.color === 'gray' ? 'disabled' : ''}>
                    + Add time
                </button>
            </div>
        </div>
    `).join('');

    // Add event listeners for schedule checkboxes
    scheduleContainer.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', toggleScheduleDay);
    });

    // Add event listeners for "Add time" buttons
    scheduleContainer.querySelectorAll('.add-time-btn').forEach(btn => {
        btn.addEventListener('click', addTimeSlot);
    });
}

function toggleScheduleDay(e) {
    const dayContainer = e.target.closest('.flex.items-start.space-x-2');
    const timeInputs = dayContainer.querySelectorAll('.schedule-time input, .add-time-btn');
    const isChecked = e.target.checked;

    timeInputs.forEach(input => {
        input.disabled = !isChecked;
    });

    dayContainer.querySelector('.schedule-time').style.opacity = isChecked ? '1' : '0.5';
    
    const label = e.target.closest('label');
    if (isChecked) {
        label.classList.remove('bg-gray-100', 'text-gray-500');
        label.classList.add(`bg-${getDayColor(label.dataset.day)}-100`, `text-${getDayColor(label.dataset.day)}-600`);
    } else {
        label.classList.add('bg-gray-100', 'text-gray-500');
        label.classList.remove(`bg-${getDayColor(label.dataset.day)}-100`, `text-${getDayColor(label.dataset.day)}-600`);
    }
}

function getDayColor(dayId) {
    const day = daysOfWeek.find(d => d.id === dayId);
    return day ? day.color : 'gray';
}

function addTimeSlot(e) {
    const container = e.target.parentElement;
    const newTimeSlot = document.createElement('div');
    newTimeSlot.className = 'flex items-center space-x-2 schedule-time mt-2';
    newTimeSlot.innerHTML = `
        <input class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-blue" type="time" value="09:00" />
        <span>-</span>
        <input class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-blue" type="time" value="17:00" />
        <button class="text-gray-400 hover:text-red-500" onclick="removeTimeSlot(this)">
            <span class="material-icons text-base">delete</span>
        </button>
    `;
    
    // Insert before the "Add time" button
    container.insertBefore(newTimeSlot, e.target);
}

function removeTimeSlot(button) {
    button.closest('.schedule-time').remove();
}

// Add/Remove functions for tables
function addEducationRow() {
    // Implementation for education table
}

function addExperienceRow() {
    // Implementation for experience table  
}

function addEducationRowPersonal() {
    const tableBody = document.getElementById('education-table-personal');
    const newRow = document.createElement('tr');
    newRow.className = 'bg-white border-b';
    newRow.innerHTML = `
        <td class="px-4 md:px-6 py-4">
            <input class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-blue" type="text" placeholder="Gelar" />
        </td>
        <td class="px-4 md:px-6 py-4">
            <input class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-blue" type="text" placeholder="Institusi" />
        </td>
        <td class="px-4 md:px-6 py-4">
            <input class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-blue" type="text" placeholder="Tahun" />
        </td>
        <td class="px-4 md:px-6 py-4 text-right">
            <div class="flex justify-end space-x-2">
                <button class="text-blue-600 hover:text-blue-800" onclick="saveEducationRowPersonal(this)">
                    <span class="material-icons">save</span>
                </button>
                <button class="text-red-600 hover:text-red-800" onclick="removeEducationRowPersonal(this)">
                    <span class="material-icons">delete</span>
                </button>
            </div>
        </td>
    `;
    tableBody.appendChild(newRow);
}

function addExperienceRowPersonal() {
    const tableBody = document.getElementById('experience-table-personal');
    const newRow = document.createElement('tr');
    newRow.className = 'bg-white border-b';
    newRow.innerHTML = `
        <td class="px-4 md:px-6 py-4">
            <input class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-blue" type="text" placeholder="Posisi" />
        </td>
        <td class="px-4 md:px-6 py-4">
            <input class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-blue" type="text" placeholder="Institusi" />
        </td>
        <td class="px-4 md:px-6 py-4">
            <input class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-blue" type="text" placeholder="Periode" />
        </td>
        <td class="px-4 md:px-6 py-4 text-right">
            <div class="flex justify-end space-x-2">
                <button class="text-blue-600 hover:text-blue-800" onclick="saveExperienceRowPersonal(this)">
                    <span class="material-icons">save</span>
                </button>
                <button class="text-red-600 hover:text-red-800" onclick="removeExperienceRowPersonal(this)">
                    <span class="material-icons">delete</span>
                </button>
            </div>
        </td>
    `;
    tableBody.appendChild(newRow);
}

// Table row functions
function saveEducationRowPersonal(button) {
    const row = button.closest('tr');
    const inputs = row.querySelectorAll('input');
    const values = Array.from(inputs).map(input => input.value);
    
    if (values.some(value => value.trim() === '')) {
        alert('Please fill in all fields');
        return;
    }
    
    // Convert inputs to text
    inputs.forEach((input, index) => {
        const td = input.parentElement;
        td.innerHTML = input.value;
        if (index === 0) {
            td.classList.add('font-medium', 'text-gray-900');
        }
    });
    
    // Update action buttons
    const actionCell = row.querySelector('td:last-child');
    actionCell.innerHTML = `
        <div class="flex justify-end space-x-2">
            <button class="text-gray-500 hover:text-gray-700" onclick="editEducationRowPersonal(this)">
                <span class="material-icons">edit</span>
            </button>
            <button class="text-red-500 hover:text-red-700" onclick="removeEducationRowPersonal(this)">
                <span class="material-icons">delete</span>
            </button>
        </div>
    `;
}

function saveExperienceRowPersonal(button) {
    const row = button.closest('tr');
    const inputs = row.querySelectorAll('input');
    const values = Array.from(inputs).map(input => input.value);
    
    if (values.some(value => value.trim() === '')) {
        alert('Please fill in all fields');
        return;
    }
    
    // Convert inputs to text
    inputs.forEach((input, index) => {
        const td = input.parentElement;
        td.innerHTML = input.value;
        if (index === 0) {
            td.classList.add('font-medium', 'text-gray-900');
        }
    });
    
    // Update action buttons
    const actionCell = row.querySelector('td:last-child');
    actionCell.innerHTML = `
        <div class="flex justify-end space-x-2">
            <button class="text-gray-500 hover:text-gray-700" onclick="editExperienceRowPersonal(this)">
                <span class="material-icons">edit</span>
            </button>
            <button class="text-red-500 hover:text-red-700" onclick="removeExperienceRowPersonal(this)">
                <span class="material-icons">delete</span>
            </button>
        </div>
    `;
}

function editEducationRowPersonal(button) {
    const row = button.closest('tr');
    const cells = row.querySelectorAll('td:not(:last-child)');
    
    cells.forEach((cell, index) => {
        const value = cell.textContent;
        cell.innerHTML = `<input class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-blue" type="text" value="${value}" />`;
    });
    
    // Update action buttons
    const actionCell = row.querySelector('td:last-child');
    actionCell.innerHTML = `
        <div class="flex justify-end space-x-2">
            <button class="text-blue-600 hover:text-blue-800" onclick="saveEducationRowPersonal(this)">
                <span class="material-icons">save</span>
            </button>
            <button class="text-red-600 hover:text-red-800" onclick="removeEducationRowPersonal(this)">
                <span class="material-icons">delete</span>
            </button>
        </div>
    `;
}

function editExperienceRowPersonal(button) {
    const row = button.closest('tr');
    const cells = row.querySelectorAll('td:not(:last-child)');
    
    cells.forEach((cell, index) => {
        const value = cell.textContent;
        cell.innerHTML = `<input class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-blue" type="text" value="${value}" />`;
    });
    
    // Update action buttons
    const actionCell = row.querySelector('td:last-child');
    actionCell.innerHTML = `
        <div class="flex justify-end space-x-2">
            <button class="text-blue-600 hover:text-blue-800" onclick="saveExperienceRowPersonal(this)">
                <span class="material-icons">save</span>
            </button>
            <button class="text-red-600 hover:text-red-800" onclick="removeExperienceRowPersonal(this)">
                <span class="material-icons">delete</span>
            </button>
        </div>
    `;
}

function removeEducationRowPersonal(button) {
    if (confirm('Are you sure you want to remove this education record?')) {
        button.closest('tr').remove();
    }
}

function removeExperienceRowPersonal(button) {
    if (confirm('Are you sure you want to remove this experience record?')) {
        button.closest('tr').remove();
    }
}

function checkIfEditMode() {
    // Check URL parameters or local storage to determine if this is edit mode
    const urlParams = new URLSearchParams(window.location.search);
    const doctorId = urlParams.get('id');
    
    if (doctorId) {
        isEditMode = true;
        currentDoctorId = doctorId;
        loadDoctorData(doctorId);
    }
}

function updatePageTitle() {
    const titleElement = document.getElementById('page-title');
    const saveBtn = document.getElementById('save-btn');
    
    if (isEditMode) {
        titleElement.textContent = 'Edit Doctor';
        titleElement.nextElementSibling.textContent = 'Update doctor information';
        saveBtn.textContent = 'Update Doctor';
    } else {
        titleElement.textContent = 'Add New Doctor';
        titleElement.nextElementSibling.textContent = 'Fill in the doctor\'s information';
        saveBtn.textContent = 'Save Doctor';
    }
}

function loadDoctorData(doctorId) {
    // Simulate loading doctor data
    // In a real application, this would fetch data from an API
    const mockData = {
        fullName: 'Dr. John Doe',
        specialization: 'Pediatrics',
        phone: '+62 812 3456 7890',
        gender: 'male',
        address: 'Jl. Sudirman No. 123, Jakarta Pusat, DKI Jakarta',
        email: 'johndoe.md@hospital.com',
        birthDate: '1985-06-15',
        strNumber: '1234567890123456',
        sipNumber: 'SIP.123/DU/X/2023',
        dutyStatus: 'on-duty',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVI0osb-RABdJxYmVG6OTZhB0dYx69fid3eIWD4-iFUuy9vJ08BaB9ufoK5lCYYtqZUMZ3BWXGEEtBYexpLsWbTIkDrncZuqsnz7_1EeAMX6Wppa7la5Nq3MN3nceoYetzzTRAn1mm6aDtEut4fTgou7cbT0yp7Uws4dGCUOB6DeZ_GGOeGAbXpxl0y06BoTxqEef_YHBS_YZbKuQg366bA0nX69IHkxxFkyKFNgrZc19Q0YX_SoVmDstN8uuFPqiUvw59WY58Ics'
    };
    
    // Populate form fields
    document.getElementById('full-name').value = mockData.fullName;
    document.getElementById('specialization').value = mockData.specialization;
    document.getElementById('phone').value = mockData.phone;
    document.getElementById('gender').value = mockData.gender;
    document.getElementById('address').value = mockData.address;
    document.getElementById('email').value = mockData.email;
    document.getElementById('birth-date').value = mockData.birthDate;
    document.getElementById('str-number').value = mockData.strNumber;
    document.getElementById('sip-number').value = mockData.sipNumber;
    document.getElementById('duty-status').value = mockData.dutyStatus;
    document.getElementById('doctor-avatar').src = mockData.avatar;
}

function saveDoctor() {
    // Validate required fields
    const requiredFields = ['full-name', 'specialization', 'email'];
    const emptyFields = requiredFields.filter(field => {
        return !document.getElementById(field).value.trim();
    });
    
    if (emptyFields.length > 0) {
        alert('Please fill in all required fields (marked with *)');
        return;
    }
    
    // Show loading UI
    showLoadingOverlay(isEditMode ? 'Updating doctor...' : 'Saving doctor...');
    
    // Collect form data
    const formData = {
        fullName: document.getElementById('full-name').value,
        specialization: document.getElementById('specialization').value,
        phone: document.getElementById('phone').value,
        gender: document.getElementById('gender').value,
        address: document.getElementById('address').value,
        email: document.getElementById('email').value,
        birthDate: document.getElementById('birth-date').value,
        strNumber: document.getElementById('str-number').value,
        sipNumber: document.getElementById('sip-number').value,
        dutyStatus: document.getElementById('duty-status').value,
        avatar: document.getElementById('doctor-avatar').src
    };
    
    // Collect schedule data
    const scheduleData = collectScheduleData();
    
    // Collect education data
    const educationData = collectEducationData();
    
    // Collect experience data
    const experienceData = collectExperienceData();
    
    // Combine all data
    const doctorData = {
        ...formData,
        schedule: scheduleData,
        education: educationData,
        experience: experienceData
    };
    
    // Simulate API call
    console.log('Saving doctor data:', doctorData);
    
    // Simulate API delay
    setTimeout(() => {
        // Hide loading
        hideLoadingOverlay();
        
        // Redirect to detail page with success parameter
        const doctorId = currentDoctorId || 1; // Use current ID or default to 1 for new doctors
        const successMessage = isEditMode ? 'updated' : 'added';
        window.location.href = `detail.html?id=${doctorId}&success=${successMessage}`;
    }, 2000);
}

function cancelEdit() {
    if (confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
        if (isEditMode && currentDoctorId) {
            // If editing, redirect to detail page
            window.location.href = `detail.html?id=${currentDoctorId}`;
        } else {
            // If creating new, go back to doctors list
            window.location.href = 'index.html';
        }
    }
}

function showLoadingOverlay(message = 'Loading...') {
    // Remove existing overlay if any
    hideLoadingOverlay();
    
    // Create loading overlay
    const overlay = document.createElement('div');
    overlay.id = 'loadingOverlay';
    overlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    overlay.innerHTML = `
        <div class="bg-white rounded-2xl p-8 max-w-sm mx-4 shadow-2xl transform transition-all duration-300 scale-95">
            <div class="flex flex-col items-center text-center">
                <!-- Spinning loader -->
                <div class="relative w-16 h-16 mb-4">
                    <div class="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
                    <div class="absolute inset-0 border-4 border-custom-blue border-t-transparent rounded-full animate-spin"></div>
                </div>
                
                <!-- Loading text -->
                <h3 class="text-lg font-semibold text-gray-800 mb-2">${message}</h3>
                <p class="text-sm text-gray-600">Please wait a moment...</p>
                
                <!-- Progress dots -->
                <div class="flex space-x-1 mt-4">
                    <div class="w-2 h-2 bg-custom-blue rounded-full animate-pulse"></div>
                    <div class="w-2 h-2 bg-custom-blue rounded-full animate-pulse" style="animation-delay: 0.2s;"></div>
                    <div class="w-2 h-2 bg-custom-blue rounded-full animate-pulse" style="animation-delay: 0.4s;"></div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Add animation
    setTimeout(() => {
        const content = overlay.querySelector('.bg-white');
        if (content) {
            content.classList.add('scale-100');
            content.classList.remove('scale-95');
        }
    }, 10);
}

function hideLoadingOverlay() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        const content = overlay.querySelector('.bg-white');
        if (content) {
            content.classList.add('scale-95');
            content.classList.remove('scale-100');
        }
        
        setTimeout(() => {
            if (document.body.contains(overlay)) {
                document.body.removeChild(overlay);
            }
        }, 200);
    }
}

function collectScheduleData() {
    const scheduleData = {};
    const scheduleContainer = document.getElementById('schedule-container');
    
    daysOfWeek.forEach(day => {
        const dayContainer = scheduleContainer.querySelector(`[data-day="${day.id}"]`).closest('.flex');
        const checkbox = dayContainer.querySelector('input[type="checkbox"]');
        const timeSlots = dayContainer.querySelectorAll('.schedule-time');
        
        if (checkbox.checked) {
            scheduleData[day.id] = Array.from(timeSlots).map(slot => {
                const inputs = slot.querySelectorAll('input[type="time"]');
                return {
                    start: inputs[0].value,
                    end: inputs[1].value
                };
            });
        }
    });
    
    return scheduleData;
}

function collectEducationData() {
    const rows = document.querySelectorAll('#education-table-personal tr');
    return Array.from(rows).map(row => {
        const cells = row.querySelectorAll('td:not(:last-child)');
        if (cells.length === 3) {
            return {
                degree: cells[0].textContent || cells[0].querySelector('input')?.value || '',
                institution: cells[1].textContent || cells[1].querySelector('input')?.value || '',
                year: cells[2].textContent || cells[2].querySelector('input')?.value || ''
            };
        }
    }).filter(item => item && item.degree && item.institution && item.year);
}

function collectExperienceData() {
    const rows = document.querySelectorAll('#experience-table-personal tr');
    return Array.from(rows).map(row => {
        const cells = row.querySelectorAll('td:not(:last-child)');
        if (cells.length === 3) {
            return {
                position: cells[0].textContent || cells[0].querySelector('input')?.value || '',
                institution: cells[1].textContent || cells[1].querySelector('input')?.value || '',
                period: cells[2].textContent || cells[2].querySelector('input')?.value || ''
            };
        }
    }).filter(item => item && item.position && item.institution && item.period);
}

function showSuccessMessage(message) {
    // Create temporary success notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
    notification.innerHTML = `
        <div class="flex items-center space-x-2">
            <span class="material-icons">check_circle</span>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 10);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}