// Sample doctors data
const doctorsData = [
    {
        id: 1,
        name: "Dr. John Smith",
        specialty: "Heart Specialist",
        phone: "+123 456 7890",
        gender: "Male",
        available: true,
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9VZ2QGo_li4LVhp8iYr9JrYqBgDi7QcGRtO7mGPKp67wrxh6TRm7oERXDQPHvz_aIBsizfvar_AtjDPhiAxQR-eAhFB99IFeem6OH5EC-lEdXUF-P10asmzb-Ai-PTHt3lTUapROxoBZq2bmjhBodQGLi3CAkRpa6yWr1M_RQafpT8cISUblFSu8aIDZG-X90IxWrDyK8pZcMbfDZWj4a2qiNnzHY9XZORaOAu4stjYDGRq6hGTeW-P5DnNTpHvLt8I4CVN1p1xU"
    },
    {
        id: 2,
        name: "Dr. Sarah Johnson",
        specialty: "Lungs Specialist",
        phone: "+123 456 7891",
        gender: "Female",
        available: false,
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDw2jnMhMsOW5Nk1gB37rDOIfRnnVKhMYyUdcJvuprs8qNwZCe60oxn0SYyq1PBtjXwMG3wZiV9i_6ptqZBWL8-1A-zVkBTsp6qv7X0ZOE9PGZjBbMSU20ClGeUG5a78E3Q61XtIn0rKfqHQIsSVzmEbUgQaSqrw2I5tfFx4pvB6pVizE-5cUK5ECVKdBJKRLmrvcvrrmHf51zKS_QyxZeYNeKglNTC_lP9AQKXJKrySihxezsrMKjEtm1ZvnqNTc-Ttwh4U8d-w7A"
    },
    {
        id: 3,
        name: "Dr. Michael Lee",
        specialty: "Dental Specialist",
        phone: "+123 456 7892",
        gender: "Male",
        available: true,
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDYt2Cj93QZ6c_CAYI8zNKJH4TDKbBcWwLUuSQjtJBSpKkEG0j6AsmZCsz36zIC-iB8N7q408L9LZaUSw0rZ-wd4xDgosZRjwbYnjaUo3sbE1RvCCZf4Lb-lInyxSb6-pHhe20_njLIdTJj0JkY8WlhE0AaFUwqdTUuJE-jfvCjVw67XSD1MIy36AJdt0KV7NcmLyXpB3_B-GIJ29rOGvZsFaaf7K3wuO5Zdd1n7dHVZdt18fwEp_e9gd_k23uHsE5HtZPGWtOASjc"
    },
    {
        id: 4,
        name: "Dr. Emily White",
        specialty: "Brain Specialist",
        phone: "+123 456 7893",
        gender: "Female",
        available: true,
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDCmPPiTpXSVd5189soDOe2MtpgNrqE2R0khIQCNur9TRt7lyBGUcebkSK5_45thKZTCtZLx60nb3GVrT7ZrXrdTmuKyvT4m3pFmd-tCkC6jcuC0r019LpboQK8mYJLSoRCG3zXMuXWsT4HmQk2fSETOu7cFl3p2nQJtB1OnYVI3vKDbt5z_MMOn5Z0q8hU9X6Ey6YbBAUw_apdDSjReQFh34785mGwoNGVmaOghS6hj9jg6MLsUtX2MT8j7z_BtOFTW0gJhX3jpao"
    },
    {
        id: 5,
        name: "Dr. James Brown",
        specialty: "Orthopedic Specialist",
        phone: "+123 456 7894",
        gender: "Male",
        available: true,
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD9VZ2QGo_li4LVhp8iYr9JrYqBgDi7QcGRtO7mGPKp67wrxh6TRm7oERXDQPHvz_aIBsizfvar_AtjDPhiAxQR-eAhFB99IFeem6OH5EC-lEdXUF-P10asmzb-Ai-PTHt3lTUapROxoBZq2bmjhBodQGLi3CAkRpa6yWr1M_RQafpT8cISUblFSu8aIDZG-X90IxWrDyK8pZcMbfDZWj4a2qiNnzHY9XZORaOAu4stjYDGRq6hGTeW-P5DnNTpHvLt8I4CVN1p1xU"
    },
    {
        id: 6,
        name: "Dr. Lisa Davis",
        specialty: "Pediatric Specialist",
        phone: "+123 456 7895",
        gender: "Female",
        available: false,
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDCmPPiTpXSVd5189soDOe2MtpgNrqE2R0khIQCNur9TRt7lyBGUcebkSK5_45thKZTCtZLx60nb3GVrT7ZrXrdTmuKyvT4m3pFmd-tCkC6jcuC0r019LpboQK8mYJLSoRCG3zXMuXWsT4HmQk2fSETOu7cFl3p2nQJtB1OnYVI3vKDbt5z_MMOn5Z0q8hU9X6Ey6YbBAUw_apdDSjReQFh34785mGwoNGVmaOghS6hj9jg6MLsUtX2MT8j7z_BtOFTW0gJhX3jpao"
    },
    {
        id: 7,
        name: "Dr. Robert Wilson",
        specialty: "Dermatologist",
        phone: "+123 456 7896",
        gender: "Male",
        available: true,
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDYt2Cj93QZ6c_CAYI8zNKJH4TDKbBcWwLUuSQjtJBSpKkEG0j6AsmZCsz36zIC-iB8N7q408L9LZaUSw0rZ-wd4xDgosZRjwbYnjaUo3sbE1RvCCZf4Lb-lInyxSb6-pHhe20_njLIdTJj0JkY8WlhE0AaFUwqdTUuJE-jfvCjVw67XSD1MIy36AJdt0KV7NcmLyXpB3_B-GIJ29rOGvZsFaaf7K3wuO5Zdd1n7dHVZdt18fwEp_e9gd_k23uHsE5HtZPGWtOASjc"
    },
    {
        id: 8,
        name: "Dr. Maria Garcia",
        specialty: "Gynecologist",
        phone: "+123 456 7897",
        gender: "Female",
        available: true,
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDw2jnMhMsOW5Nk1gB37rDOIfRnnVKhMYyUdcJvuprs8qNwZCe60oxn0SYyq1PBtjXwMG3wZiV9i_6ptqZBWL8-1A-zVkBTsp6qv7X0ZOE9PGZjBbMSU20ClGeUG5a78E3Q61XtIn0rKfqHQIsSVzmEbUgQaSqrw2I5tfFx4pvB6pVizE-5cUK5ECVKdBJKRLmrvcvrrmHf51zKS_QyxZeYNeKglNTC_lP9AQKXJKrySihxezsrMKjEtm1ZvnqNTc-Ttwh4U8d-w7A"
    }
];

// App state
let currentPage = 1;
let itemsPerPage = 4;
let filteredDoctors = [...doctorsData];
let searchTerm = '';
let isDarkMode = false;
let doctorToDelete = null;
let currentView = 'list'; // 'list' or 'grid'
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
    renderDoctors();
    renderPagination();
    updateViewButtons();
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

// Theme and Sidebar State Management
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

// Event Listeners Setup
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

    // Search - handle both mobile and desktop search inputs
    const searchInput = document.getElementById('search-input');
    const searchInputDesktop = document.getElementById('search-input-desktop');
    
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    if (searchInputDesktop) {
        searchInputDesktop.addEventListener('input', handleSearch);
    }

    // View toggle - desktop
    const listViewBtn = document.getElementById('list-view-btn');
    const gridViewBtn = document.getElementById('grid-view-btn');
    if (listViewBtn) {
        listViewBtn.addEventListener('click', () => switchView('list'));
    }
    if (gridViewBtn) {
        gridViewBtn.addEventListener('click', () => switchView('grid'));
    }

    // View toggle - mobile
    const mobileListViewBtn = document.getElementById('mobile-list-view-btn');
    const mobileGridViewBtn = document.getElementById('mobile-grid-view-btn');
    if (mobileListViewBtn) {
        mobileListViewBtn.addEventListener('click', () => switchView('list'));
    }
    if (mobileGridViewBtn) {
        mobileGridViewBtn.addEventListener('click', () => switchView('grid'));
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

    // Handle clicks outside dropdowns and modal
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.dropdown')) {
            closeAllDropdowns();
        }

        // Close modal if clicking outside
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

// Sidebar and Theme Functions
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

// Search and Filter Functions
function handleSearch(e) {
    searchTerm = e.target.value.toLowerCase();
    
    // Sync search inputs
    const searchInput = document.getElementById('search-input');
    const searchInputDesktop = document.getElementById('search-input-desktop');
    
    if (searchInput && e.target !== searchInput) {
        searchInput.value = e.target.value;
    }
    if (searchInputDesktop && e.target !== searchInputDesktop) {
        searchInputDesktop.value = e.target.value;
    }
    
    filteredDoctors = doctorsData.filter(doctor =>
        doctor.name.toLowerCase().includes(searchTerm) ||
        doctor.specialty.toLowerCase().includes(searchTerm) ||
        doctor.phone.includes(searchTerm)
    );
    currentPage = 1;
    renderDoctors();
    renderPagination();
}

// View Switch Functions
function switchView(view) {
    currentView = view;
    currentPage = 1;
    updateViewButtons();
    renderDoctors();
    renderPagination();
}

function updateViewButtons() {
    // Desktop buttons
    const listBtn = document.getElementById('list-view-btn');
    const gridBtn = document.getElementById('grid-view-btn');
    
    // Mobile buttons
    const mobileListBtn = document.getElementById('mobile-list-view-btn');
    const mobileGridBtn = document.getElementById('mobile-grid-view-btn');

    // Update desktop buttons
    if (listBtn && gridBtn) {
        if (currentView === 'list') {
            listBtn.classList.add('bg-white', 'shadow');
            listBtn.classList.remove('bg-transparent');
            listBtn.querySelector('.material-icons').classList.add('text-custom-blue');
            listBtn.querySelector('.material-icons').classList.remove('text-gray-500');

            gridBtn.classList.remove('bg-white', 'shadow');
            gridBtn.classList.add('bg-transparent');
            gridBtn.querySelector('.material-icons').classList.remove('text-custom-blue');
            gridBtn.querySelector('.material-icons').classList.add('text-gray-500');
        } else {
            gridBtn.classList.add('bg-white', 'shadow');
            gridBtn.classList.remove('bg-transparent');
            gridBtn.querySelector('.material-icons').classList.add('text-custom-blue');
            gridBtn.querySelector('.material-icons').classList.remove('text-gray-500');

            listBtn.classList.remove('bg-white', 'shadow');
            listBtn.classList.add('bg-transparent');
            listBtn.querySelector('.material-icons').classList.remove('text-custom-blue');
            listBtn.querySelector('.material-icons').classList.add('text-gray-500');
        }
    }

    // Update mobile buttons
    if (mobileListBtn && mobileGridBtn) {
        if (currentView === 'list') {
            mobileListBtn.classList.add('bg-white', 'shadow');
            mobileListBtn.classList.remove('bg-transparent');
            mobileListBtn.querySelector('.material-icons').classList.add('text-custom-blue');
            mobileListBtn.querySelector('.material-icons').classList.remove('text-gray-500');

            mobileGridBtn.classList.remove('bg-white', 'shadow');
            mobileGridBtn.classList.add('bg-transparent');
            mobileGridBtn.querySelector('.material-icons').classList.remove('text-custom-blue');
            mobileGridBtn.querySelector('.material-icons').classList.add('text-gray-500');
        } else {
            mobileGridBtn.classList.add('bg-white', 'shadow');
            mobileGridBtn.classList.remove('bg-transparent');
            mobileGridBtn.querySelector('.material-icons').classList.add('text-custom-blue');
            mobileGridBtn.querySelector('.material-icons').classList.remove('text-gray-500');

            mobileListBtn.classList.remove('bg-white', 'shadow');
            mobileListBtn.classList.add('bg-transparent');
            mobileListBtn.querySelector('.material-icons').classList.remove('text-custom-blue');
            mobileListBtn.querySelector('.material-icons').classList.add('text-gray-500');
        }
    }
}

// Render Functions
function renderDoctors() {
    const doctorsList = document.getElementById('doctors-list');
    const doctorsGrid = document.getElementById('doctors-grid');

    if (!doctorsList || !doctorsGrid) return;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const doctorsToShow = filteredDoctors.slice(startIndex, endIndex);

    if (currentView === 'list') {
        doctorsList.classList.remove('hidden');
        doctorsGrid.classList.add('hidden');
        renderListView(doctorsToShow);
    } else {
        doctorsList.classList.add('hidden');
        doctorsGrid.classList.remove('hidden');
        renderGridView(doctorsToShow);
    }
}

function renderListView(doctors) {
    const doctorsList = document.getElementById('doctors-list');
    if (!doctorsList) return;

    doctorsList.innerHTML = doctors.map(doctor => `
        <div class="p-4 border rounded-lg hover:shadow-md transition-shadow duration-200">
            <div class="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                <div class="flex items-center space-x-4 col-span-1 md:col-span-2">
                    <img alt="${doctor.name}" class="w-12 h-12 rounded-full flex-shrink-0" src="${doctor.avatar}" />
                    <div class="min-w-0">
                        <p class="font-bold text-gray-800 truncate">${doctor.name}</p>
                        <p class="text-sm text-gray-500 truncate">${doctor.specialty}</p>
                    </div>
                </div>
                <div class="col-span-1">
                    <p class="text-gray-500 text-sm">Phone</p>
                    <p class="font-semibold text-gray-800 text-sm">${doctor.phone}</p>
                </div>
                <div class="col-span-1">
                    <p class="text-gray-500 text-sm">Gender</p>
                    <p class="font-semibold text-gray-800">${doctor.gender}</p>
                </div>
                <div class="col-span-1">
                    <span class="bg-${doctor.available ? 'green' : 'red'}-100 text-${doctor.available ? 'green' : 'red'}-700 text-xs font-semibold px-3 py-1.5 rounded-full inline-flex items-center">
                        <span class="w-2 h-2 bg-${doctor.available ? 'green' : 'red'}-500 rounded-full mr-2"></span> ${doctor.available ? 'Available' : 'Not Available'}
                    </span>
                </div>
                <div class="flex items-center justify-end space-x-2 col-span-1">
                    <button class="p-2 rounded-full hover:bg-gray-200 text-gray-500 hover:text-custom-blue" title="View Doctor" onclick="viewDoctor(${doctor.id})">
                        <span class="material-icons">visibility</span>
                    </button>
                    <button class="p-2 rounded-full hover:bg-gray-200 text-gray-500 hover:text-custom-blue" title="Edit Doctor" onclick="editDoctor(${doctor.id})">
                        <span class="material-icons">edit</span>
                    </button>
                    <div class="relative dropdown">
                        <button type="button" class="p-2 rounded-full hover:bg-gray-200 text-gray-500 hover:text-custom-blue" onclick="toggleDropdown('list-${doctor.id}')" title="More Options">
                            <span class="material-icons">more_vert</span>
                        </button>
                        <div id="dropdown-list-${doctor.id}" class="dropdown-menu absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden">
                            <div class="py-1">
                                <a href="#" class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    <span class="material-icons text-sm mr-3">print</span>
                                    Print
                                </a>
                                <a href="#" class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    <span class="material-icons text-sm mr-3">file_download</span>
                                    Export
                                </a>
                                <a href="#" class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    <span class="material-icons text-sm mr-3">archive</span>
                                    Archive
                                </a>
                                <hr class="my-1 border-gray-200">
                                <button type="button" class="flex items-center w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50" onclick="deleteDoctor(${doctor.id})">
                                    <span class="material-icons text-sm mr-3">delete_outline</span>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function renderGridView(doctors) {
    const doctorsGrid = document.getElementById('doctors-grid');
    if (!doctorsGrid) return;

    doctorsGrid.innerHTML = doctors.map(doctor => `
        <div class="bg-white border rounded-lg p-4 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-200">
            <img alt="${doctor.name}" class="w-20 h-20 md:w-24 md:h-24 rounded-full mb-4 flex-shrink-0" src="${doctor.avatar}" />
            <p class="font-bold text-gray-800 mb-1 text-sm md:text-base">${doctor.name}</p>
            <p class="text-sm text-gray-500 mb-3">${doctor.specialty}</p>
            <span class="mt-auto bg-${doctor.available ? 'green' : 'red'}-100 text-${doctor.available ? 'green' : 'red'}-700 text-xs font-semibold px-3 py-1.5 rounded-full inline-flex items-center">
                <span class="w-2 h-2 bg-${doctor.available ? 'green' : 'red'}-500 rounded-full mr-2"></span>
                ${doctor.available ? 'Available' : 'Not Available'}
            </span>
            <div class="mt-4 flex space-x-2">
                <button class="p-2 rounded-full hover:bg-gray-200 text-gray-500 hover:text-custom-blue" title="View Doctor" onclick="viewDoctor(${doctor.id})">
                    <span class="material-icons">visibility</span>
                </button>
                <button class="p-2 rounded-full hover:bg-gray-200 text-gray-500 hover:text-custom-blue" title="Edit Doctor" onclick="editDoctor(${doctor.id})">
                    <span class="material-icons">edit</span>
                </button>
                <div class="relative dropdown">
                    <button type="button" class="p-2 rounded-full hover:bg-gray-200 text-gray-500 hover:text-custom-blue" onclick="toggleDropdown('grid-${doctor.id}')" title="More Options">
                        <span class="material-icons">more_vert</span>
                    </button>
                    <div id="dropdown-grid-${doctor.id}" class="dropdown-menu absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden">
                        <div class="py-1">
                            <a href="#" class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                <span class="material-icons text-sm mr-3">print</span>
                                Print
                            </a>
                            <a href="#" class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                <span class="material-icons text-sm mr-3">file_download</span>
                                Export
                            </a>
                            <a href="#" class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                <span class="material-icons text-sm mr-3">archive</span>
                                Archive
                            </a>
                            <hr class="my-1 border-gray-200">
                            <button type="button" class="flex items-center w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50" onclick="deleteDoctor(${doctor.id})">
                                <span class="material-icons text-sm mr-3">delete_outline</span>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Pagination Functions
function renderPagination() {
    const pagination = document.getElementById('pagination');
    if (!pagination) return;

    const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);

    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }

    let paginationHTML = '';

    // Previous button
    paginationHTML += `
        <button onclick="changePage(${currentPage - 1})" 
                class="px-2 md:px-3 py-1 border rounded-lg hover:bg-gray-100 text-gray-600 text-sm ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}"
                ${currentPage === 1 ? 'disabled' : ''}>
            <span class="hidden sm:inline">Previous</span>
            <span class="sm:hidden">‹</span>
        </button>
    `;

    // Page numbers - show fewer on mobile
    const maxVisible = isMobile ? 3 : 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    
    if (endPage - startPage + 1 < maxVisible) {
        startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        paginationHTML += `
            <button onclick="changePage(${i})" 
                    class="px-2 md:px-3 py-1 border rounded-lg text-sm ${currentPage === i ? 'bg-custom-blue text-white' : 'hover:bg-gray-100 text-gray-600'}">
                ${i}
            </button>
        `;
    }

    // Next button
    paginationHTML += `
        <button onclick="changePage(${currentPage + 1})" 
                class="px-2 md:px-3 py-1 border rounded-lg hover:bg-gray-100 text-gray-600 text-sm ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}"
                ${currentPage === totalPages ? 'disabled' : ''}>
            <span class="hidden sm:inline">Next</span>
            <span class="sm:hidden">›</span>
        </button>
    `;

    pagination.innerHTML = paginationHTML;
}

function changePage(page) {
    const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);
    if (page < 1 || page > totalPages) return;

    currentPage = page;
    renderDoctors();
    renderPagination();
}

// Dropdown Functions
function toggleDropdown(dropdownId) {
    closeAllDropdowns();
    const dropdown = document.getElementById(`dropdown-${dropdownId}`);
    if (dropdown) {
        dropdown.classList.add('show');
    }
}

function closeAllDropdowns() {
    document.querySelectorAll('.dropdown-menu').forEach(dropdown => {
        dropdown.classList.remove('show');
    });
}

// Delete Functions
function deleteDoctor(doctorId) {
    const doctor = doctorsData.find(d => d.id === doctorId);
    if (!doctor) return;

    doctorToDelete = doctorId;

    // Populate modal with doctor info
    const modalAvatar = document.getElementById('modalDoctorAvatar');
    const modalName = document.getElementById('modalDoctorName');
    const modalSpecialty = document.getElementById('modalDoctorSpecialty');

    if (modalAvatar) modalAvatar.src = doctor.avatar;
    if (modalName) modalName.textContent = doctor.name;
    if (modalSpecialty) modalSpecialty.textContent = doctor.specialty;

    // Show modal
    const modal = document.getElementById('deleteModal');
    if (modal) {
        modal.classList.remove('hidden');

        // Add animation
        setTimeout(() => {
            const modalContent = modal.querySelector('.bg-white');
            if (modalContent) {
                modalContent.classList.remove('scale-95');
                modalContent.classList.add('scale-100');
            }
        }, 10);
    }

    closeAllDropdowns();
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
        doctorToDelete = null;
    }, 200);
}

function confirmDeleteDoctor() {
    if (doctorToDelete) {
        const index = doctorsData.findIndex(doctor => doctor.id === doctorToDelete);
        if (index > -1) {
            doctorsData.splice(index, 1);
            handleSearch({ target: { value: searchTerm } }); // Re-apply search

            // Show success message
            showSuccessMessage('Doctor deleted successfully!');
        }
    }
    closeDeleteModal();
}

// Navigation Functions
function viewDoctor(doctorId) {
    // Navigate to detail doctor page with ID parameter
    window.location.href = `detail.html?id=${doctorId}`;
}

function editDoctor(doctorId) {
    // Navigate to edit doctor page with ID parameter
    window.location.href = `create_update.html?id=${doctorId}`;
}

// Utility Functions
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