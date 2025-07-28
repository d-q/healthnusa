// App state
let isDarkMode = false;
let currentTab = 'personal';
let currentDoctorId = null;
let isMobile = window.innerWidth < 768;

// Initialize app
document.addEventListener('DOMContentLoaded', function () {
    initializeApp();
    setupResponsiveHandlers();
});

function initializeApp() {
    loadThemeState();
    loadSidebarState();
    setupEventListeners();
    loadDoctorData();
    switchTab('personal');
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
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Tab navigation
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const tabId = e.target.id.replace('tab-', '');
            switchTab(tabId);
        });
    });

    // Action buttons
    const editBtn = document.getElementById('edit-btn');
    const deleteBtn = document.getElementById('delete-btn');
    
    if (editBtn) {
        editBtn.addEventListener('click', editDoctor);
    }
    
    if (deleteBtn) {
        deleteBtn.addEventListener('click', showDeleteModal);
    }

    // Delete modal
    const cancelDelete = document.getElementById('cancelDelete');
    const confirmDelete = document.getElementById('confirmDelete');
    
    if (cancelDelete) {
        cancelDelete.addEventListener('click', closeDeleteModal);
    }
    
    if (confirmDelete) {
        confirmDelete.addEventListener('click', confirmDeleteDoctor);
    }

    // Handle clicks outside modal
    document.addEventListener('click', function (e) {
        if (e.target.id === 'deleteModal') {
            closeDeleteModal();
        }
    });

    // Handle ESC key to close modal and mobile sidebar
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeDeleteModal();
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
    if (themeIcon) {
        themeIcon.textContent = isDarkMode ? 'light_mode' : 'dark_mode';
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
            'documents': 'documents-tab', 
            'appointments': 'appointments-tab',
            'patients': 'patients-tab'
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

function loadDoctorData() {
    // Get doctor ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    currentDoctorId = urlParams.get('id');
    const successType = urlParams.get('success');
    
    // Show success message if redirected from save/update
    if (successType) {
        setTimeout(() => {
            const message = successType === 'updated' ? 
                'Doctor updated successfully!' : 
                'Doctor added successfully!';
            showSuccessMessageWithAnimation(message);
            
            // Clean up URL by removing success parameter
            const newUrl = new URL(window.location);
            newUrl.searchParams.delete('success');
            window.history.replaceState({}, '', newUrl);
        }, 500); // Small delay to ensure page is fully loaded
    }
    
    // In a real application, this would fetch data from an API
    // For now, we'll use mock data
    const mockData = {
        id: currentDoctorId || 1,
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
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVI0osb-RABdJxYmVG6OTZhB0dYx69fid3eIWD4-iFUuy9vJ08BaB9ufoK5lCYYtqZUMZ3BWXGEEtBYexpLsWbTIkDrncZuqsnz7_1EeAMX6Wppa7la5Nq3MN3nceoYetzzTRAn1mm6aDtEut4fTgou7cbT0yp7Uws4dGCUOB6DeZ_GGOeGAbXpxl0y06BoTxqEef_YHBS_YZbKuQg366bA0nX69IHkxxFkyKFNgrZc19Q0YX_SoVmDstN8uuFPqiUvw59WY58Ics'
    };
    
    // Populate the page with doctor data
    populateDoctorInfo(mockData);
}

function populateDoctorInfo(doctor) {
    // Update profile section
    const avatar = document.getElementById('doctor-avatar');
    const name = document.getElementById('doctor-name');
    const specialty = document.getElementById('doctor-specialty');
    const phone = document.getElementById('doctor-phone');
    const gender = document.getElementById('doctor-gender');
    const address = document.getElementById('doctor-address');
    
    if (avatar) avatar.src = doctor.avatar;
    if (name) name.textContent = doctor.name;
    if (specialty) specialty.textContent = doctor.specialty;
    if (phone) phone.textContent = doctor.phone;
    if (gender) gender.textContent = doctor.gender;
    if (address) address.textContent = doctor.address;
    
    // Update duty status
    const dutyStatusElement = document.getElementById('duty-status');
    if (dutyStatusElement) {
        const isOnDuty = doctor.dutyStatus === 'on-duty';
        const statusClass = isOnDuty ? 'green' : 'red';
        const statusText = isOnDuty ? 'On-Duty' : 'Off-Duty';
        
        dutyStatusElement.className = `bg-${statusClass}-100 text-${statusClass}-800 text-xs font-semibold px-3 py-1.5 rounded-full inline-flex items-center`;
        dutyStatusElement.innerHTML = `
            <span class="w-2 h-2 bg-${statusClass}-500 rounded-full mr-2"></span> ${statusText}
        `;
    }
    
    // Update biodata in the detailed section
    updateBiodataSection(doctor);
}

function updateBiodataSection(doctor) {
    // Update the biodata grid in the personal tab
    const personalTab = document.getElementById('personal-tab');
    if (personalTab) {
        const biodataGrid = personalTab.querySelector('.grid.grid-cols-1.md\\:grid-cols-2');
        if (biodataGrid) {
            biodataGrid.innerHTML = `
                <div>
                    <label class="block text-sm text-gray-500 mb-1">Nama Lengkap</label>
                    <p class="text-gray-800 font-medium">${doctor.name}</p>
                </div>
                <div>
                    <label class="block text-sm text-gray-500 mb-1">Spesialisasi</label>
                    <p class="text-gray-800 font-medium">${doctor.specialty}</p>
                </div>
                <div>
                    <label class="block text-sm text-gray-500 mb-1">Nomor STR</label>
                    <p class="text-gray-800 font-medium">${doctor.strNumber}</p>
                </div>
                <div>
                    <label class="block text-sm text-gray-500 mb-1">Nomor SIP</label>
                    <p class="text-gray-800 font-medium">${doctor.sipNumber}</p>
                </div>
                <div>
                    <label class="block text-sm text-gray-500 mb-1">Email</label>
                    <p class="text-gray-800 font-medium">${doctor.email}</p>
                </div>
                <div>
                    <label class="block text-sm text-gray-500 mb-1">Tanggal Lahir</label>
                    <p class="text-gray-800 font-medium">${doctor.birthDate}</p>
                </div>
            `;
        }
    }
}

function editDoctor() {
    // Navigate to edit page with current doctor ID
    const editUrl = currentDoctorId ? 
        `create_update.html?id=${currentDoctorId}` : 
        'create_update.html';
    window.location.href = editUrl;
}

function showDeleteModal() {
    const modal = document.getElementById('deleteModal');
    if (!modal) return;
    
    // Populate modal with current doctor info
    const modalAvatar = document.getElementById('modalDoctorAvatar');
    const modalName = document.getElementById('modalDoctorName');
    const modalSpecialty = document.getElementById('modalDoctorSpecialty');
    
    const currentAvatar = document.getElementById('doctor-avatar');
    const currentName = document.getElementById('doctor-name');
    const currentSpecialty = document.getElementById('doctor-specialty');
    
    if (modalAvatar && currentAvatar) modalAvatar.src = currentAvatar.src;
    if (modalName && currentName) modalName.textContent = currentName.textContent;
    if (modalSpecialty && currentSpecialty) modalSpecialty.textContent = currentSpecialty.textContent;
    
    // Show modal with animation
    modal.classList.remove('hidden');
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        const modalContent = modal.querySelector('.bg-white');
        if (modalContent) {
            modalContent.classList.remove('scale-95');
            modalContent.classList.add('scale-100');
        }
    }, 10);
}

function closeDeleteModal() {
    const modal = document.getElementById('deleteModal');
    if (!modal) return;
    
    const modalContent = modal.querySelector('.bg-white');
    
    // Add closing animation
    if (modalContent) {
        modalContent.classList.remove('scale-100');
        modalContent.classList.add('scale-95');
    }
    
    setTimeout(() => {
        modal.classList.add('hidden');
        // Restore body scroll
        document.body.style.overflow = '';
    }, 200);
}

function confirmDeleteDoctor() {
    // In a real application, this would make an API call to delete the doctor
    console.log('Deleting doctor with ID:', currentDoctorId);
    
    // Show success message
    showSuccessMessage('Doctor deleted successfully!');
    
    // Close modal
    closeDeleteModal();
    
    // Redirect to doctors list after a short delay
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
}

function showSuccessMessage(message) {
    // Create temporary success notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 md:px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300 max-w-sm';
    notification.innerHTML = `
        <div class="flex items-center space-x-2">
            <span class="material-icons text-sm md:text-base">check_circle</span>
            <span class="text-sm md:text-base">${message}</span>
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

// Add entrance animation for success message
function showSuccessMessageWithAnimation(message) {
    // Create enhanced success notification with entrance animation
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 z-50 transform translate-x-full transition-all duration-500 ease-out';
    notification.innerHTML = `
        <div class="bg-green-500 text-white px-4 md:px-6 py-4 rounded-lg shadow-2xl flex items-center space-x-3 min-w-0 max-w-xs md:max-w-sm">
            <div class="flex-shrink-0">
                <div class="w-8 h-8 bg-green-400 rounded-full flex items-center justify-center">
                    <span class="material-icons text-sm">check</span>
                </div>
            </div>
            <div class="flex-1 min-w-0">
                <p class="font-semibold text-sm truncate">${message}</p>
                <p class="text-green-100 text-xs mt-1">Operation completed successfully</p>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" class="flex-shrink-0 text-green-200 hover:text-white transition-colors p-1">
                <span class="material-icons text-sm">close</span>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification with bounce effect
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
        notification.classList.add('translate-x-0');
    }, 100);
    
    // Auto hide after 4 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 500);
        }
    }, 4000);
}