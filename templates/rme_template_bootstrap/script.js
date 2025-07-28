// Sample data
const patientsData = [
    {
        id: 1,
        name: "John Smith",
        age: 45,
        gender: "Male",
        status: "Active",
        lastVisit: "2023-06-15",
        condition: "Hypertension",
        doctor: "Dr. Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        selected: false
    },
    {
        id: 2,
        name: "Emily Davis",
        age: 32,
        gender: "Female",
        status: "Active",
        lastVisit: "2023-07-02",
        condition: "Diabetes Type 2",
        doctor: "Dr. Michael Chen",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b2dc69b1?w=100&h=100&fit=crop&crop=face",
        selected: false
    },
    {
        id: 3,
        name: "Robert Wilson",
        age: 58,
        gender: "Male",
        status: "Inactive",
        lastVisit: "2023-05-20",
        condition: "Arthritis",
        doctor: "Dr. Lisa Patel",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        selected: false
    },
    {
        id: 4,
        name: "Jessica Brown",
        age: 27,
        gender: "Female",
        status: "Active",
        lastVisit: "2023-07-10",
        condition: "Asthma",
        doctor: "Dr. James Wilson",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        selected: false
    },
    {
        id: 5,
        name: "Michael Johnson",
        age: 41,
        gender: "Male",
        status: "Active",
        lastVisit: "2023-06-28",
        condition: "Migraine",
        doctor: "Dr. Emily Rodriguez",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
        selected: false
    },
    {
        id: 6,
        name: "Sarah Thompson",
        age: 63,
        gender: "Female",
        status: "Active",
        lastVisit: "2023-07-05",
        condition: "Osteoporosis",
        doctor: "Dr. Robert Kim",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
        selected: false
    },
    {
        id: 7,
        name: "David Lee",
        age: 52,
        gender: "Male",
        status: "Inactive",
        lastVisit: "2023-04-18",
        condition: "COPD",
        doctor: "Dr. Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face",
        selected: false
    },
    {
        id: 8,
        name: "Amanda Clark",
        age: 36,
        gender: "Female",
        status: "Active",
        lastVisit: "2023-07-08",
        condition: "Anxiety",
        doctor: "Dr. Michael Chen",
        avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face",
        selected: false
    },
    {
        id: 9,
        name: "James Rodriguez",
        age: 70,
        gender: "Male",
        status: "Active",
        lastVisit: "2023-06-30",
        condition: "Coronary Artery Disease",
        doctor: "Dr. Lisa Patel",
        avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100&h=100&fit=crop&crop=face",
        selected: false
    },
    {
        id: 10,
        name: "Lisa Chen",
        age: 29,
        gender: "Female",
        status: "Active",
        lastVisit: "2023-07-12",
        condition: "Allergies",
        doctor: "Dr. James Wilson",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
        selected: false
    },
];

// Global variables
let currentPage = 1;
let pageSize = 10;
let filteredData = [...patientsData];
let minAge = 0;
let maxAge = 100;
let currentSort = { field: null, direction: null };
let deleteModalData = { type: null, patients: [] }; // Track deletion context

// DOM elements
const sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('mainContent');
const mobileOverlay = document.getElementById('mobileOverlay');
const sidebarToggle = document.getElementById('sidebarToggle');
const themeToggle = document.getElementById('themeToggle');
const userDropdownBtn = document.getElementById('userDropdownBtn');
const userDropdownMenu = document.getElementById('userDropdownMenu');
const searchInput = document.getElementById('searchInput');
const genderFilter = document.getElementById('genderFilter');
const statusFilter = document.getElementById('statusFilter');
const minAgeInput = document.getElementById('minAge');
const maxAgeInput = document.getElementById('maxAge');
const filterToggle = document.getElementById('filterToggle');
const columnFilters = document.getElementById('columnFilters');
const pageSizeInput = document.getElementById('pageSize');
const patientsTableBody = document.getElementById('patientsTableBody');
const pagination = document.getElementById('pagination');
const totalEntries = document.getElementById('totalEntries');
const selectAllCheckbox = document.getElementById('selectAllCheckbox');
const actionsDropdownContainer = document.getElementById('actionsDropdownContainer');
const selectionCounter = document.getElementById('selectionCounter');
const selectedCountElement = document.getElementById('selectedCount');

// Delete Modal elements
const deleteModal = document.getElementById('deleteModal');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const patientList = document.getElementById('patientList');
const confirmationInput = document.getElementById('confirmationInput');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
const deleteButtonText = document.getElementById('deleteButtonText');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    renderTable();
    setupEventListeners();
    loadSavedSettings();
    updateTotalEntries();
});

// Initialize application
function initializeApp() {
    loadTheme();
    handleMobileView();
    
    // Set all column filters to true by default on every page load
    document.querySelectorAll('.column-filter').forEach(checkbox => {
        checkbox.checked = true;
    });
    
    window.addEventListener('resize', handleMobileView);
}

// Handle mobile view
function handleMobileView() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        sidebar.classList.add('mobile-hidden');
        mainContent.classList.add('mobile-full');
    } else {
        sidebar.classList.remove('mobile-hidden', 'show');
        mainContent.classList.remove('mobile-full');
        mobileOverlay.classList.remove('show');
    }
}

// Setup event listeners
function setupEventListeners() {
    // Sidebar toggle
    sidebarToggle.addEventListener('click', toggleSidebar);
    
    // Mobile overlay
    mobileOverlay.addEventListener('click', closeMobileSidebar);

    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);

    // User dropdown
    userDropdownBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleUserDropdown();
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!userDropdownMenu.contains(e.target) && !userDropdownBtn.contains(e.target)) {
            closeUserDropdown();
        }
    });

    // Filter toggle
    filterToggle.addEventListener('click', toggleColumnFilters);

    // Search and filters
    searchInput.addEventListener('input', debounce(filterData, 300));
    genderFilter.addEventListener('change', filterData);
    statusFilter.addEventListener('change', filterData);
    minAgeInput.addEventListener('input', handleAgeChange);
    maxAgeInput.addEventListener('input', handleAgeChange);

    // Select all checkbox
    selectAllCheckbox.addEventListener('change', handleSelectAll);

    // Page size input
    pageSizeInput.addEventListener('input', function() {
        let value = parseInt(this.value);
        
        if (isNaN(value) || value < 1) {
            value = 1;
            this.value = 1;
        } else if (value > patientsData.length) {
            value = patientsData.length;
            this.value = patientsData.length;
        }
        
        pageSize = value;
        currentPage = 1;
        renderTable();
        saveSettings();
    });

    // Setup event listeners for new buttons
    document.getElementById('addPatientBtn').addEventListener('click', function() {
        alert('Add Patient functionality');
    });

    // Column filters
    document.querySelectorAll('.column-filter').forEach(checkbox => {
        checkbox.addEventListener('change', toggleColumn);
    });

    // Sortable columns
    document.querySelectorAll('.sortable').forEach(header => {
        header.addEventListener('click', function() {
            const sortField = this.getAttribute('data-sort');
            handleSort(sortField);
        });
    });

    // Navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            if (window.innerWidth <= 768) {
                closeMobileSidebar();
            }
        });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);

    // Delete modal event listeners
    confirmationInput.addEventListener('input', validateConfirmationInput);
    
    // Close modal when clicking outside
    deleteModal.addEventListener('click', function(e) {
        if (e.target === deleteModal) {
            closeDeleteModal();
        }
    });

    // Patient detail modal event listeners
    const patientDetailModal = document.getElementById('patientDetailModal');
    
    // Prevent closing when clicking inside the modal
    patientDetailModal.addEventListener('click', function(e) {
        if (e.target === patientDetailModal) {
            // Don't close the modal when clicking the backdrop
            // User must use close button or cancel button
        }
    });

    // Modal tab event listeners
    document.querySelectorAll('.modal-nav-link').forEach(link => {
        link.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            showModalTab(tabName);
        });
    });

    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (deleteModal.classList.contains('show')) {
                closeDeleteModal();
            }
            // Note: Patient detail modal cannot be closed with Escape
            // User must use close button or cancel button
        }
    });
}

// Patient Detail Modal Functions
function viewPatient(id) {
    const patient = patientsData.find(p => p.id === id);
    if (!patient) return;

    // Populate modal with patient data
    document.getElementById('patientModalTitle').textContent = `${patient.name} - Patient Details`;
    document.getElementById('patientModalAvatar').src = patient.avatar;
    document.getElementById('patientModalAvatar').alt = patient.name;
    document.getElementById('patientModalName').textContent = patient.name;
    document.getElementById('patientModalEmail').textContent = `${patient.name.toLowerCase().replace(' ', '.')}@example.com`;
    document.getElementById('patientModalGender').textContent = patient.gender;
    document.getElementById('patientModalAge').textContent = `${patient.age} years old`;
    document.getElementById('patientModalLastVisit').textContent = formatDate(patient.lastVisit);
    document.getElementById('patientModalCondition').textContent = patient.condition;
    document.getElementById('patientModalDoctor').textContent = patient.doctor;
    
    // Set status badge
    const statusBadge = document.getElementById('patientModalStatus');
    statusBadge.textContent = patient.status;
    statusBadge.className = `modal-status-badge ${patient.status === 'Active' ? 'active' : 'inactive'}`;
    
    // Show modal
    const modal = document.getElementById('patientDetailModal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Set default active tab
    showModalTab('recent');
}

// Close patient detail modal
function closePatientDetailModal() {
    const modal = document.getElementById('patientDetailModal');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

// Handle modal tab switching
function showModalTab(tabName) {
    // Remove active class from all tabs and panes
    document.querySelectorAll('.modal-nav-link').forEach(link => {
        link.classList.remove('active');
    });
    document.querySelectorAll('.modal-tab-pane').forEach(pane => {
        pane.classList.remove('active');
    });
    
    // Add active class to selected tab and pane
    document.getElementById(`modal-${tabName}-tab`).classList.add('active');
    document.getElementById(`modal-${tabName}`).classList.add('active');
}

// Edit patient from modal
function editPatientFromModal() {
    alert('Opening Edit Patient form...');
    closePatientDetailModal();
}

// Download file function for modal
function downloadFile(fileName) {
    alert(`Downloading ${fileName}...`);
}

// Notes editing functions
function toggleEditNotes() {
    const notesDisplay = document.getElementById('notesDisplay');
    const notesEditForm = document.getElementById('notesEditForm');
    const editBtn = document.getElementById('editNotesBtn');
    
    // Hide display, show edit form
    notesDisplay.style.display = 'none';
    notesEditForm.style.display = 'block';
    
    // Update button state
    editBtn.style.display = 'none';
    
    // Focus on textarea
    document.getElementById('notesTextarea').focus();
}

function cancelEditNotes() {
    const notesDisplay = document.getElementById('notesDisplay');
    const notesEditForm = document.getElementById('notesEditForm');
    const editBtn = document.getElementById('editNotesBtn');
    const notesTextarea = document.getElementById('notesTextarea');
    const notesText = document.getElementById('notesText');
    
    // Reset textarea to original content
    notesTextarea.value = notesText.textContent.trim();
    
    // Show display, hide edit form
    notesDisplay.style.display = 'block';
    notesEditForm.style.display = 'none';
    
    // Show edit button
    editBtn.style.display = 'flex';
}

function saveNotes() {
    const notesTextarea = document.getElementById('notesTextarea');
    const notesText = document.getElementById('notesText');
    const notesTimestamp = document.getElementById('notesTimestamp');
    const notesDisplay = document.getElementById('notesDisplay');
    const notesEditForm = document.getElementById('notesEditForm');
    const editBtn = document.getElementById('editNotesBtn');
    
    // Get new content
    const newContent = notesTextarea.value.trim();
    
    if (newContent === '') {
        alert('Please enter some notes before saving.');
        return;
    }
    
    // Update the display content
    notesText.textContent = newContent;
    
    // Update timestamp with current date/time
    const now = new Date();
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    };
    notesTimestamp.textContent = now.toLocaleDateString('en-US', options);
    
    // Show display, hide edit form
    notesDisplay.style.display = 'block';
    notesEditForm.style.display = 'none';
    
    // Show edit button
    editBtn.style.display = 'flex';
    
    // Show success message
    alert('Notes saved successfully!');
}

// Handle select all checkbox
function handleSelectAll() {
    const isChecked = selectAllCheckbox.checked;
    
    filteredData.forEach(patient => {
        patient.selected = isChecked;
    });
    
    renderTable();
    updateSelectAllState();
}

// Handle individual patient checkbox
function handlePatientSelect(patientId) {
    const patient = patientsData.find(p => p.id === patientId);
    if (patient) {
        patient.selected = !patient.selected;
        updateSelectAllState();
        updateActionsVisibility();
    }
}

// Update select all checkbox state
function updateSelectAllState() {
    const visiblePatients = getVisiblePatients();
    const selectedCount = visiblePatients.filter(p => p.selected).length;
    const totalCount = visiblePatients.length;
    
    if (selectedCount === 0) {
        selectAllCheckbox.checked = false;
        selectAllCheckbox.indeterminate = false;
    } else if (selectedCount === totalCount) {
        selectAllCheckbox.checked = true;
        selectAllCheckbox.indeterminate = false;
    } else {
        selectAllCheckbox.checked = false;
        selectAllCheckbox.indeterminate = true;
    }

    updateActionsVisibility();
}

// Update actions dropdown visibility
function updateActionsVisibility() {
    const selectedPatients = getSelectedPatients();
    const selectedCount = selectedPatients.length;

    if (selectedCount > 0) {
        actionsDropdownContainer.style.display = 'block';
        selectionCounter.style.display = 'block';
        
        selectedCountElement.textContent = selectedCount;
        actionsDropdownContainer.classList.add('show');
        
        const badge = selectionCounter.querySelector('.badge');
        if (badge) {
            badge.setAttribute('data-count', selectedCount);
        }
    } else {
        actionsDropdownContainer.style.display = 'none';
        selectionCounter.style.display = 'none';
        actionsDropdownContainer.classList.remove('show');
    }
}

// Get visible patients (current page)
function getVisiblePatients() {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredData.slice(startIndex, endIndex);
}

// Handle sorting
function handleSort(field) {
    if (currentSort.field === field) {
        if (currentSort.direction === 'asc') {
            currentSort.direction = 'desc';
        } else if (currentSort.direction === 'desc') {
            currentSort.field = null;
            currentSort.direction = null;
        } else {
            currentSort.direction = 'asc';
        }
    } else {
        currentSort.field = field;
        currentSort.direction = 'asc';
    }

    updateSortIndicators();
    applySorting();
    currentPage = 1;
    renderTable();
    saveSettings();
}

// Update sort visual indicators
function updateSortIndicators() {
    document.querySelectorAll('.sortable').forEach(header => {
        header.classList.remove('sort-asc', 'sort-desc');
    });

    if (currentSort.field && currentSort.direction) {
        const currentHeader = document.querySelector(`[data-sort="${currentSort.field}"]`);
        if (currentHeader) {
            currentHeader.classList.add(`sort-${currentSort.direction}`);
        }
    }
}

// Apply sorting to filtered data
function applySorting() {
    if (!currentSort.field || !currentSort.direction) {
        return;
    }

    filteredData.sort((a, b) => {
        let aValue = a[currentSort.field];
        let bValue = b[currentSort.field];

        if (currentSort.field === 'lastVisit') {
            aValue = new Date(aValue);
            bValue = new Date(bValue);
        } else if (currentSort.field === 'age') {
            aValue = parseInt(aValue);
            bValue = parseInt(bValue);
        } else if (typeof aValue === 'string') {
            aValue = aValue.toLowerCase();
            bValue = bValue.toLowerCase();
        }

        let result = 0;
        if (aValue < bValue) {
            result = -1;
        } else if (aValue > bValue) {
            result = 1;
        }

        return currentSort.direction === 'desc' ? -result : result;
    });
}

// Toggle sidebar
function toggleSidebar() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        sidebar.classList.toggle('show');
        mobileOverlay.classList.toggle('show');
    } else {
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('expanded');
    }
}

// Close mobile sidebar
function closeMobileSidebar() {
    sidebar.classList.remove('show');
    mobileOverlay.classList.remove('show');
}

// Toggle theme
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    
    const icon = themeToggle.querySelector('i');
    icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    
    localStorage.setItem('theme', newTheme);
}

// Load theme
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    const icon = themeToggle.querySelector('i');
    if (icon) {
        icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// User dropdown functions
function toggleUserDropdown() {
    userDropdownMenu.classList.toggle('show');
}

function closeUserDropdown() {
    userDropdownMenu.classList.remove('show');
}

// Toggle column filters
function toggleColumnFilters() {
    columnFilters.classList.toggle('show');
    const icon = filterToggle.querySelector('i');
    icon.className = columnFilters.classList.contains('show') ? 'fas fa-times' : 'fas fa-filter';
}

// Handle age range change
function handleAgeChange() {
    minAge = parseInt(minAgeInput.value) || 0;
    maxAge = parseInt(maxAgeInput.value) || 100;
    
    if (minAge > maxAge) {
        if (this === minAgeInput) {
            maxAge = minAge;
            maxAgeInput.value = maxAge;
        } else {
            minAge = maxAge;
            minAgeInput.value = minAge;
        }
    }
    
    filterData();
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Get selected patients
function getSelectedPatients() {
    return patientsData.filter(p => p.selected);
}

// Filter data
function filterData() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const genderValue = genderFilter.value;
    const statusValue = statusFilter.value;

    filteredData = patientsData.filter(patient => {
        const matchesSearch = !searchTerm || 
            patient.name.toLowerCase().includes(searchTerm) ||
            patient.condition.toLowerCase().includes(searchTerm) ||
            patient.doctor.toLowerCase().includes(searchTerm);
        
        const matchesGender = !genderValue || patient.gender === genderValue;
        const matchesStatus = !statusValue || patient.status === statusValue;
        const matchesAge = patient.age >= minAge && patient.age <= maxAge;

        return matchesSearch && matchesGender && matchesStatus && matchesAge;
    });

    applySorting();
    currentPage = 1;
    renderTable();
    saveSettings();
}

// Toggle column visibility
function toggleColumn(event) {
    const column = event.target.value;
    const isVisible = event.target.checked;
    const columnElements = document.querySelectorAll(`.col-${column}`);
    
    columnElements.forEach(element => {
        element.style.display = isVisible ? '' : 'none';
    });
    
    saveSettings();
}

// Delete patient functions
function deletePatient(id) {
    const patient = patientsData.find(p => p.id === id);
    if (!patient) return;

    // Set up modal for single patient deletion
    deleteModalData = {
        type: 'single',
        patients: [patient]
    };

    showDeleteModal();
}

function deletePatients() {
    const selectedPatients = getSelectedPatients();
    if (selectedPatients.length === 0) {
        alert('Please select patients to delete');
        return;
    }

    // Set up modal for bulk deletion
    deleteModalData = {
        type: 'bulk',
        patients: selectedPatients
    };

    showDeleteModal();
}

// Show delete confirmation modal
function showDeleteModal() {
    const patients = deleteModalData.patients;
    const isMultiple = patients.length > 1;

    // Update modal title and description
    if (isMultiple) {
        modalTitle.textContent = `Delete ${patients.length} Patients`;
        modalDescription.textContent = `Are you sure you want to delete ${patients.length} selected patients? This action cannot be undone and will permanently remove all patient data including medical history, appointments, and records.`;
        deleteButtonText.textContent = `Delete ${patients.length} Patients`;
        
        // Show patient list
        patientList.style.display = 'block';
        renderPatientList(patients);
    } else {
        const patient = patients[0];
        modalTitle.textContent = 'Delete Patient';
        modalDescription.textContent = `Are you sure you want to delete ${patient.name}? This action cannot be undone and will permanently remove all patient data including medical history, appointments, and records.`;
        deleteButtonText.textContent = 'Delete Patient';
        
        // Hide patient list
        patientList.style.display = 'none';
    }

    // Reset confirmation input
    confirmationInput.value = '';
    confirmationInput.classList.remove('valid', 'invalid');
    confirmDeleteBtn.classList.remove('enabled');

    // Show modal
    deleteModal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Focus on confirmation input
    setTimeout(() => {
        confirmationInput.focus();
    }, 300);
}

// Render patient list for bulk deletion
function renderPatientList(patients) {
    let html = '';
    patients.forEach(patient => {
        html += `
            <div class="patient-item">
                <img src="${patient.avatar}" alt="${patient.name}" class="patient-item-avatar">
                <div class="patient-item-info">
                    <div class="patient-item-name">${patient.name}</div>
                    <div class="patient-item-details">${patient.age} years • ${patient.gender} • ${patient.condition}</div>
                </div>
            </div>
        `;
    });
    patientList.innerHTML = html;
}

// Close delete modal
function closeDeleteModal() {
    deleteModal.classList.remove('show');
    document.body.style.overflow = '';
    
    // Reset modal data
    deleteModalData = { type: null, patients: [] };
    confirmationInput.value = '';
    confirmationInput.classList.remove('valid', 'invalid');
    confirmDeleteBtn.classList.remove('enabled');
}

// Validate confirmation input
function validateConfirmationInput() {
    const value = confirmationInput.value.trim();
    const isValid = value.toUpperCase() === 'DELETE';
    
    confirmationInput.classList.remove('valid', 'invalid');
    
    if (value.length > 0) {
        if (isValid) {
            confirmationInput.classList.add('valid');
            confirmDeleteBtn.classList.add('enabled');
        } else {
            confirmationInput.classList.add('invalid');
            confirmDeleteBtn.classList.remove('enabled');
        }
    } else {
        confirmDeleteBtn.classList.remove('enabled');
    }
}

// Confirm deletion
function confirmDelete() {
    const value = confirmationInput.value.trim();
    if (value.toUpperCase() !== 'DELETE') {
        return;
    }

    const patients = deleteModalData.patients;
    const isMultiple = patients.length > 1;

    // Perform deletion
    patients.forEach(patient => {
        const index = patientsData.findIndex(p => p.id === patient.id);
        if (index > -1) {
            patientsData.splice(index, 1);
        }
    });

    // Close modal
    closeDeleteModal();

    // Refresh table
    filterData();

    // Show success message
    const message = isMultiple 
        ? `Successfully deleted ${patients.length} patients.` 
        : `Successfully deleted patient: ${patients[0].name}.`;
    
    // You can replace this with a toast notification
    setTimeout(() => {
        alert(message);
    }, 300);

    // Clear selections after deletion
    if (deleteModalData.type === 'bulk') {
        updateActionsVisibility();
    }
}

// Render table
function renderTable() {
    if (filteredData.length === 0) {
        renderEmptyState();
        renderPagination();
        updateSelectAllState();
        return;
    }

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    let html = '';
    paginatedData.forEach(patient => {
        html += `
            <tr>
                <td class="col-checkbox checkbox-column">
                    <input type="checkbox" 
                           onchange="handlePatientSelect(${patient.id})" 
                           ${patient.selected ? 'checked' : ''}>
                </td>
                <td class="col-name">
                    <div class="patient-info">
                        <img src="${patient.avatar}" alt="${patient.name}" class="patient-avatar">
                        <div class="patient-name">${patient.name}</div>
                    </div>
                </td>
                <td class="col-age">${patient.age} • ${patient.gender}</td>
                <td class="col-status">
                    <span class="badge ${patient.status === 'Active' ? 'badge-success' : 'badge-warning'}">
                        ${patient.status}
                    </span>
                </td>
                <td class="col-lastVisit">${formatDate(patient.lastVisit)}</td>
                <td class="col-condition">${patient.condition}</td>
                <td class="col-doctor">${patient.doctor}</td>
                <td>
                    <div class="patient-actions-group">
                        <button class="patient-action-btn" title="View Details" onclick="viewPatient(${patient.id})">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="patient-action-btn" title="Edit Patient" onclick="editPatient(${patient.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <div class="dropdown">
                            <button class="patient-action-btn dropdown-toggle" type="button" id="patientActions${patient.id}" data-bs-toggle="dropdown" aria-expanded="false" title="More Options">
                                <i class="fas fa-ellipsis-h"></i>
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="patientActions${patient.id}">
                                <li>
                                    <button class="dropdown-item" onclick="assignDoctor(${patient.id})">
                                        <i class="fas fa-user-md"></i>
                                        Assign Doctor
                                    </button>
                                </li>
                                <li>
                                    <button class="dropdown-item" onclick="scheduleAppointment(${patient.id})">
                                        <i class="fas fa-calendar-plus"></i>
                                        Schedule Appointment
                                    </button>
                                </li>
                                <li>
                                    <button class="dropdown-item" onclick="viewMedicalHistory(${patient.id})">
                                        <i class="fas fa-history"></i>
                                        Medical History
                                    </button>
                                </li>
                                <li>
                                    <button class="dropdown-item" onclick="downloadRecords(${patient.id})">
                                        <i class="fas fa-download"></i>
                                        Download Records
                                    </button>
                                </li>
                                <li><hr class="dropdown-divider"></li>
                                <li>
                                    <button class="dropdown-item" onclick="sendReminder(${patient.id})">
                                        <i class="fas fa-bell"></i>
                                        Send Reminder
                                    </button>
                                </li>
                                <li>
                                    <button class="dropdown-item" onclick="duplicatePatient(${patient.id})">
                                        <i class="fas fa-copy"></i>
                                        Duplicate Patient
                                    </button>
                                </li>
                                <li>
                                    <button class="dropdown-item" onclick="archivePatient(${patient.id})">
                                        <i class="fas fa-archive"></i>
                                        Archive Patient
                                    </button>
                                </li>
                                <li><hr class="dropdown-divider"></li>
                                <li>
                                    <button class="dropdown-item text-danger" onclick="deletePatient(${patient.id})">
                                        <i class="fas fa-trash"></i>
                                        Delete Patient
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </td>
            </tr>
        `;
    });

    patientsTableBody.innerHTML = html;
    renderPagination();
    updateTotalEntries();
    updateSelectAllState();
    updateSortIndicators();
}

// Render empty state
function renderEmptyState() {
    patientsTableBody.innerHTML = `
        <tr>
            <td colspan="8" class="text-center py-5">
                <div class="empty-state">
                    <i class="fas fa-users"></i>
                    <h5>No patients found</h5>
                    <p>Try adjusting your search criteria or add a new patient.</p>
                    <button class="btn btn-primary mt-2">
                        <i class="fas fa-plus me-2"></i>Add New Patient
                    </button>
                </div>
            </td>
        </tr>
    `;
    updateTotalEntries();
    updateActionsVisibility();
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Update total entries display
function updateTotalEntries() {
    if (totalEntries) {
        totalEntries.textContent = `${patientsData.length}`;
    }
}

// Render pagination
function renderPagination() {
    const totalPages = Math.ceil(filteredData.length / pageSize);
    
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }
    
    let html = '';

    // Previous button
    html += `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changePage(${currentPage - 1})" aria-label="Previous">
                <i class="fas fa-chevron-left"></i>
            </a>
        </li>
    `;

    // Page numbers
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    if (startPage > 1) {
        html += `<li class="page-item"><a class="page-link" href="#" onclick="changePage(1)">1</a></li>`;
        if (startPage > 2) {
            html += `<li class="page-item disabled"><a class="page-link" href="#">...</a></li>`;
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        html += `
            <li class="page-item ${i === currentPage ? 'active' : ''}">
                <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
            </li>
        `;
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            html += `<li class="page-item disabled"><a class="page-link" href="#">...</a></li>`;
        }
        html += `<li class="page-item"><a class="page-link" href="#" onclick="changePage(${totalPages})">${totalPages}</a></li>`;
    }

    // Next button
    html += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changePage(${currentPage + 1})" aria-label="Next">
                <i class="fas fa-chevron-right"></i>
            </a>
        </li>
    `;

    pagination.innerHTML = html;
}

// Change page
function changePage(page) {
    const totalPages = Math.ceil(filteredData.length / pageSize);
    if (page >= 1 && page <= totalPages && page !== currentPage) {
        currentPage = page;
        renderTable();
        saveSettings();
    }
}

function editPatient(id) {
    const patient = patientsData.find(p => p.id === id);
    alert(`Editing patient: ${patient.name}`);
}

// New patient dropdown actions
function assignDoctor(id) {
    const patient = patientsData.find(p => p.id === id);
    alert(`Assign doctor to: ${patient.name}`);
}

function scheduleAppointment(id) {
    const patient = patientsData.find(p => p.id === id);
    alert(`Schedule appointment for: ${patient.name}`);
}

function viewMedicalHistory(id) {
    const patient = patientsData.find(p => p.id === id);
    alert(`View medical history for: ${patient.name}`);
}

function downloadRecords(id) {
    const patient = patientsData.find(p => p.id === id);
    alert(`Download records for: ${patient.name}`);
}

function sendReminder(id) {
    const patient = patientsData.find(p => p.id === id);
    alert(`Send reminder to: ${patient.name}`);
}

function duplicatePatient(id) {
    const patient = patientsData.find(p => p.id === id);
    if (confirm(`Duplicate patient record for: ${patient.name}?`)) {
        alert(`Duplicating patient: ${patient.name}`);
    }
}

function archivePatient(id) {
    const patient = patientsData.find(p => p.id === id);
    if (confirm(`Archive patient: ${patient.name}?`)) {
        alert(`Archiving patient: ${patient.name}`);
    }
}

// User dropdown actions
function logout() {
    if (confirm('Are you sure you want to log out?')) {
        alert('Logging out...');
    }
}

// Keyboard shortcuts
function handleKeyboardShortcuts(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
    }
    
    if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        toggleSidebar();
    }
    
    if (e.key === 'Escape') {
        if (window.innerWidth <= 768) {
            closeMobileSidebar();
        }
        closeUserDropdown();
    }
}

// Save settings to localStorage
function saveSettings() {
    const settings = {
        search: searchInput.value,
        gender: genderFilter.value,
        status: statusFilter.value,
        minAge: minAge,
        maxAge: maxAge,
        pageSize: pageSize,
        currentPage: currentPage,
        currentSort: currentSort,
        columnFilters: Array.from(document.querySelectorAll('.column-filter')).map(cb => ({
            column: cb.value,
            checked: cb.checked
        })),
        selectedPatients: patientsData.filter(p => p.selected).map(p => p.id)
    };
    localStorage.setItem('medipro-settings', JSON.stringify(settings));
}

// Load saved settings
function loadSavedSettings() {
    const saved = localStorage.getItem('medipro-settings');
    if (saved) {
        try {
            const settings = JSON.parse(saved);
            
            if (settings.search) searchInput.value = settings.search;
            if (settings.gender) genderFilter.value = settings.gender;
            if (settings.status) statusFilter.value = settings.status;
            if (settings.minAge !== undefined) {
                minAge = settings.minAge;
                minAgeInput.value = minAge;
            }
            if (settings.maxAge !== undefined) {
                maxAge = settings.maxAge;
                maxAgeInput.value = maxAge;
            }
            if (settings.pageSize) {
                pageSize = settings.pageSize;
                pageSizeInput.value = pageSize;
            }
            
            if (settings.currentSort) {
                currentSort = settings.currentSort;
            }
            
            if (settings.selectedPatients) {
                settings.selectedPatients.forEach(patientId => {
                    const patient = patientsData.find(p => p.id === patientId);
                    if (patient) {
                        patient.selected = true;
                    }
                });
            }
            
            setTimeout(() => {
                filterData();
                updateActionsVisibility();
            }, 100);
        } catch (e) {
            console.error('Error loading saved settings:', e);
        }
    }
}

// Export functionality
function exportToCSV() {
    const selectedPatients = getSelectedPatients();
    const dataToExport = selectedPatients.length > 0 ? selectedPatients : filteredData;
    
    if (dataToExport.length === 0) {
        alert('No data to export');
        return;
    }
    
    const headers = ['Name', 'Age', 'Gender', 'Status', 'Last Visit', 'Condition', 'Doctor'];
    const csvContent = [
        headers.join(','),
        ...dataToExport.map(patient => [
            `"${patient.name}"`,
            patient.age,
            patient.gender,
            patient.status,
            patient.lastVisit,
            `"${patient.condition}"`,
            `"${patient.doctor}"`
        ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `patients_selected_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    alert(`Exported ${dataToExport.length} selected patients successfully`);
}

// Actions dropdown functions
function archivePatients() {
    const selectedPatients = getSelectedPatients();
    if (selectedPatients.length === 0) {
        alert('Please select patients to archive');
        return;
    }
    alert(`Archive ${selectedPatients.length} selected patients functionality`);
}

function unarchivePatients() {
    const selectedPatients = getSelectedPatients();
    if (selectedPatients.length === 0) {
        alert('Please select patients to unarchive');
        return;
    }
    alert(`Unarchive ${selectedPatients.length} selected patients functionality`);
}

function duplicatePatients() {
    const selectedPatients = getSelectedPatients();
    if (selectedPatients.length === 0) {
        alert('Please select patients to duplicate');
        return;
    }
    alert(`Duplicate ${selectedPatients.length} selected patients functionality`);
}

console.log('MediPro Dashboard with Patient Detail Modal loaded successfully!');