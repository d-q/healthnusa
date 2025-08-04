// Global variables for pagination and search
let currentPage = 1;
let itemsPerPage = 10;
let currentSearchTerm = "";
let currentSearchField = "all";
let filteredItems = [];

// Sample data - 14 dokter
const doctorsData = [
    {
        id: 1,
        name: "Dr. John Smith",
        specialty: "Heart Specialist",
        phone: "+123 456 7890",
        gender: "Male",
        status: "Available",
        image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face"
    },
    {
        id: 2,
        name: "Dr. Sarah Johnson",
        specialty: "Lungs Specialist",
        phone: "+123 456 7891",
        gender: "Female",
        status: "Not Available",
        image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face"
    },
    {
        id: 3,
        name: "Dr. Michael Lee",
        specialty: "Dental Specialist",
        phone: "+123 456 7892",
        gender: "Male",
        status: "Available",
        image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=100&h=100&fit=crop&crop=face"
    },
    {
        id: 4,
        name: "Dr. Emily White",
        specialty: "Brain Specialist",
        phone: "+123 456 7893",
        gender: "Female",
        status: "Available",
        image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=100&h=100&fit=crop&crop=face"
    },
    {
        id: 5,
        name: "Dr. Robert Chen",
        specialty: "Orthopedic Surgeon",
        phone: "+123 456 7894",
        gender: "Male",
        status: "Available",
        image: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=100&h=100&fit=crop&crop=face"
    },
    {
        id: 6,
        name: "Dr. Maria Rodriguez",
        specialty: "Pediatrician",
        phone: "+123 456 7895",
        gender: "Female",
        status: "On Break",
        image: "https://images.unsplash.com/photo-1594824717593-c4fe35e55a4c?w=100&h=100&fit=crop&crop=face"
    },
    {
        id: 7,
        name: "Dr. James Wilson",
        specialty: "Dermatologist",
        phone: "+123 456 7896",
        gender: "Male",
        status: "Available",
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=100&h=100&fit=crop&crop=face"
    },
    {
        id: 8,
        name: "Dr. Lisa Park",
        specialty: "Gynecologist",
        phone: "+123 456 7897",
        gender: "Female",
        status: "Not Available",
        image: "https://images.unsplash.com/photo-1588667055777-8ee4d0fa8e30?w=100&h=100&fit=crop&crop=face"
    },
    {
        id: 9,
        name: "Dr. Ahmed Hassan",
        specialty: "Ophthalmologist",
        phone: "+123 456 7898",
        gender: "Male",
        status: "Available",
        image: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=100&h=100&fit=crop&crop=face"
    },
    {
        id: 10,
        name: "Dr. Anna Thompson",
        specialty: "Psychiatrist",
        phone: "+123 456 7899",
        gender: "Female",
        status: "On Break",
        image: "https://images.unsplash.com/photo-1582046916606-44e3d4e83e6b?w=100&h=100&fit=crop&crop=face"
    },
    {
        id: 11,
        name: "Dr. David Kumar",
        specialty: "Anesthesiologist",
        phone: "+123 456 7900",
        gender: "Male",
        status: "Available",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=face"
    },
    {
        id: 12,
        name: "Dr. Rachel Green",
        specialty: "Radiologist",
        phone: "+123 456 7901",
        gender: "Female",
        status: "In Surgery",
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop&crop=face"
    },
    {
        id: 13,
        name: "Dr. Marcus Williams",
        specialty: "Urologist",
        phone: "+123 456 7902",
        gender: "Male",
        status: "Available",
        image: "https://images.unsplash.com/photo-1584467735871-8e679ba3922b?w=100&h=100&fit=crop&crop=face"
    },
    {
        id: 14,
        name: "Dr. Sophie Martinez",
        specialty: "Endocrinologist",
        phone: "+123 456 7903",
        gender: "Female",
        status: "Not Available",
        image: "https://images.unsplash.com/photo-1594824717593-c4fe35e55a4c?w=100&h=100&fit=crop&crop=face"
    }
];

function toggleDarkMode() {
    const html = document.documentElement;
    const icon = document.getElementById("darkModeIcon");

    if (html.classList.contains("dark")) {
        html.classList.remove("dark");
        icon.textContent = "dark_mode";
        localStorage.setItem("darkMode", "false");
    } else {
        html.classList.add("dark");
        icon.textContent = "light_mode";
        localStorage.setItem("darkMode", "true");
    }
}

// Initialize dark mode based on saved preference (default to light)
function initDarkMode() {
    const savedMode = localStorage.getItem("darkMode");
    const icon = document.getElementById("darkModeIcon");

    // Default to light mode
    if (savedMode === "true") {
        document.documentElement.classList.add("dark");
        icon.textContent = "light_mode";
    } else {
        document.documentElement.classList.remove("dark");
        icon.textContent = "dark_mode";
    }
}

// Initialize dark mode when page loads
initDarkMode();

function toggleSearchFilter(button) {
    const dropdown = button.nextElementSibling;
    const isVisible = dropdown.classList.contains("show");

    // Close all other dropdowns first
    document.querySelectorAll(".search-filter-menu").forEach((menu) => {
        menu.classList.remove("show");
    });

    // Toggle current dropdown
    if (!isVisible) {
        dropdown.classList.add("show");
    }
}

function toggleDropdown(button) {
    const dropdown = button.nextElementSibling;
    const isVisible = dropdown.classList.contains("show");

    // Close all other dropdowns first
    document.querySelectorAll(".dropdown-menu").forEach((menu) => {
        menu.classList.remove("show");
    });

    // Toggle current dropdown
    if (!isVisible) {
        dropdown.classList.add("show");
    }
}

// Close dropdown when clicking outside
document.addEventListener("click", function (event) {
    const dropdowns = document.querySelectorAll(
        ".dropdown-menu, .search-filter-menu"
    );
    const isDropdownButton =
        event.target.closest('button[onclick*="toggleDropdown"]') ||
        event.target.closest('button[onclick*="toggleSearchFilter"]');
    const isInsideSearchFilter = event.target.closest(".search-filter-menu");

    if (!isDropdownButton && !isInsideSearchFilter) {
        dropdowns.forEach((dropdown) => {
            dropdown.classList.remove("show");
        });
    }
});

// Close dropdown when pressing escape key
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        document
            .querySelectorAll(".dropdown-menu, .search-filter-menu")
            .forEach((menu) => {
                menu.classList.remove("show");
            });
    }
});

function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const menuIcon = document.getElementById("menuIcon");
    const sidebarTexts = document.querySelectorAll(".sidebar-text");
    const mainNav = document.getElementById("mainNav");
    const appearanceNav = document.getElementById("appearanceNav");
    const logoutBtn = document.getElementById("logoutBtn");

    if (sidebar.classList.contains("w-64")) {
        // Minimize sidebar
        sidebar.classList.remove("w-64");
        sidebar.classList.add("w-20");
        menuIcon.textContent = "menu_open";

        // Hide text elements
        sidebarTexts.forEach((el) => {
            el.style.display = "none";
        });

        // Change grid layout
        mainNav.classList.remove("grid-cols-2");
        mainNav.classList.add("grid-cols-1");
        appearanceNav.classList.remove("grid-cols-2");
        appearanceNav.classList.add("grid-cols-1");

        // Adjust logout button
        logoutBtn.classList.remove("justify-center");
        logoutBtn.classList.add("justify-center");

        // Adjust nav links padding
        const navLinks = sidebar.querySelectorAll("nav a");
        navLinks.forEach((link) => {
            link.classList.remove("p-3");
            link.classList.add("p-2");
        });
    } else {
        // Maximize sidebar
        sidebar.classList.remove("w-20");
        sidebar.classList.add("w-64");
        menuIcon.textContent = "menu";

        // Show text elements
        sidebarTexts.forEach((el) => {
            el.style.display = "";
        });

        // Restore grid layout
        mainNav.classList.remove("grid-cols-1");
        mainNav.classList.add("grid-cols-2");
        appearanceNav.classList.remove("grid-cols-1");
        appearanceNav.classList.add("grid-cols-2");

        // Restore nav links padding
        const navLinks = sidebar.querySelectorAll("nav a");
        navLinks.forEach((link) => {
            link.classList.remove("p-2");
            link.classList.add("p-3");
        });
    }
}

// Generate doctor cards HTML
function generateDoctorCard(doctor) {
    const statusClass = getStatusClass(doctor.status);
    const statusColor = getStatusColor(doctor.status);

    return `
        <div class="p-4 border border-gray-200 dark:border-gray-400 rounded-lg shadow-lg dark:shadow-gray-600/50 hover:shadow-xl dark:hover:shadow-gray-500/50 transition-shadow duration-200 grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
            <div class="flex items-center space-x-4 col-span-1 md:col-span-2">
                <input type="checkbox" class="w-4 h-4 text-custom-blue bg-gray-100 border-gray-300 rounded focus:ring-custom-blue dark:focus:ring-custom-blue dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <img alt="${doctor.name}" class="w-12 h-12 rounded-full" src="${doctor.image}" />
                <div>
                    <p class="font-bold text-gray-800 dark:text-gray-100">${doctor.name}</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">${doctor.specialty}</p>
                </div>
            </div>
            <div class="col-span-1">
                <p class="text-gray-500 dark:text-gray-400 text-sm">Phone</p>
                <p class="font-semibold text-gray-800 dark:text-gray-100">${doctor.phone}</p>
            </div>
            <div class="col-span-1">
                <p class="text-gray-500 dark:text-gray-400 text-sm">Gender</p>
                <p class="font-semibold text-gray-800 dark:text-gray-100">${doctor.gender}</p>
            </div>
            <div class="col-span-1">
                <span class="${statusClass} text-xs font-semibold px-3 py-1.5 rounded-full inline-flex items-center">
                    <span class="w-2 h-2 ${statusColor} rounded-full mr-2"></span> ${doctor.status}
                </span>
            </div>
            <div class="flex items-center justify-end space-x-2 col-span-1">
                <button class="btn-standard rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-200 hover:text-custom-blue w-10">
                    <span class="material-icons">visibility</span>
                </button>
                <button class="btn-standard rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-200 hover:text-custom-blue w-10">
                    <span class="material-icons">edit</span>
                </button>
                <div class="relative">
                    <button onclick="toggleDropdown(this)" class="btn-standard rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-500 dark:text-gray-200 w-10 transition-colors duration-300">
                        <span class="material-icons">more_vert</span>
                    </button>
                    <div class="dropdown-menu absolute hidden right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg z-10 border border-gray-200 dark:border-gray-600 transition-colors duration-300">
                        <a class="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 h-10 transition-colors duration-200" href="#">
                            <span class="material-icons text-gray-500 dark:text-gray-400 mr-3 text-base">print</span>Print
                        </a>
                        <a class="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 h-10 transition-colors duration-200" href="#">
                            <span class="material-icons text-gray-500 dark:text-gray-400 mr-3 text-base">file_download</span>Export
                        </a>
                        <a class="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 h-10 transition-colors duration-200" href="#">
                            <span class="material-icons text-gray-500 dark:text-gray-400 mr-3 text-base">archive</span>Archive
                        </a>
                        <hr class="border-gray-200 dark:border-gray-600 my-1">
                        <a class="flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 h-10 transition-colors duration-200" href="#">
                            <span class="material-icons text-red-500 dark:text-red-400 mr-3 text-base">delete_outline</span>Delete
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Helper functions for status styling
function getStatusClass(status) {
    switch(status) {
        case 'Available': return 'bg-green-100 text-green-700';
        case 'Not Available': return 'bg-red-100 text-red-700';
        case 'On Break': return 'bg-yellow-100 text-yellow-700';
        case 'In Surgery': return 'bg-blue-100 text-blue-700';
        default: return 'bg-gray-100 text-gray-700';
    }
}

function getStatusColor(status) {
    switch(status) {
        case 'Available': return 'bg-green-500';
        case 'Not Available': return 'bg-red-500';
        case 'On Break': return 'bg-yellow-500';
        case 'In Surgery': return 'bg-blue-500';
        default: return 'bg-gray-500';
    }
}

// Search function
function searchDoctors(searchTerm, searchField) {
    filteredItems = [];
    
    doctorsData.forEach((doctor, index) => {
        let shouldShow = false;
        
        if (!searchTerm.trim()) {
            shouldShow = true;
        } else {
            const searchLower = searchTerm.toLowerCase();
            
            switch(searchField) {
                case 'name':
                    shouldShow = doctor.name.toLowerCase().includes(searchLower);
                    break;
                case 'specialty':
                    shouldShow = doctor.specialty.toLowerCase().includes(searchLower);
                    break;
                case 'phone':
                    shouldShow = doctor.phone.toLowerCase().includes(searchLower);
                    break;
                case 'status':
                    shouldShow = doctor.status.toLowerCase().includes(searchLower);
                    break;
                default: // 'all'
                    shouldShow = doctor.name.toLowerCase().includes(searchLower) ||
                                doctor.specialty.toLowerCase().includes(searchLower) ||
                                doctor.phone.toLowerCase().includes(searchLower) ||
                                doctor.status.toLowerCase().includes(searchLower);
            }
        }
        
        if (shouldShow) {
            filteredItems.push(index);
        }
    });
    
    currentPage = 1; // Reset to first page when searching
    displayCurrentPage();
    updatePaginationInfo();
}

// Display current page
function displayCurrentPage() {
    const container = document.getElementById('doctorCardsContainer');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    // Clear container
    container.innerHTML = '';
    
    // Show only the items for current page
    const pageItems = filteredItems.slice(startIndex, endIndex);
    pageItems.forEach(index => {
        const doctor = doctorsData[index];
        container.innerHTML += generateDoctorCard(doctor);
    });
    
    // Scroll to top of container when page changes
    container.scrollTop = 0;
}

// Utility function to scroll to top of doctor cards
function scrollToTopOfCards() {
    const container = document.getElementById('doctorCardsContainer');
    if (container) {
        container.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// Utility function to check if container is scrollable
function isContainerScrollable() {
    const container = document.getElementById('doctorCardsContainer');
    if (container) {
        return container.scrollHeight > container.clientHeight;
    }
    return false;
}

// Update pagination info
function updatePaginationInfo() {
    const totalItems = filteredItems.length;
    const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);
    
    // Update count display
    const countDisplay = document.getElementById('dataCount');
    if (countDisplay) {
        countDisplay.textContent = `${startItem}-${endItem} / ${totalItems}`;
    }
    
    // Update navigation buttons styling
    updateNavigationButtons();
    
    // Update pagination buttons
    updatePaginationButtons();
}

// Update pagination buttons
function updatePaginationButtons() {
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const paginationContainer = document.getElementById('paginationButtons');
    
    if (!paginationContainer) return;
    
    paginationContainer.innerHTML = '';
    
    // Previous button
    const prevBtn = document.createElement('button');
    prevBtn.className = 'pagination-btn border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300';
    prevBtn.textContent = 'Previous';
    prevBtn.disabled = currentPage === 1;
    prevBtn.onclick = () => goToPage(currentPage - 1);
    if (currentPage === 1) {
        prevBtn.classList.add('opacity-50', 'cursor-not-allowed');
    }
    paginationContainer.appendChild(prevBtn);
    
    // Page numbers
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = 'pagination-btn border rounded-lg';
        pageBtn.textContent = i;
        pageBtn.onclick = () => goToPage(i);
        
        if (i === currentPage) {
            pageBtn.classList.add('bg-custom-blue', 'text-white');
        } else {
            pageBtn.classList.add('hover:bg-gray-100', 'dark:hover:bg-gray-600', 'text-gray-600', 'dark:text-gray-300');
        }
        
        paginationContainer.appendChild(pageBtn);
    }
    
    // Next button
    const nextBtn = document.createElement('button');
    nextBtn.className = 'pagination-btn border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300';
    nextBtn.textContent = 'Next';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.onclick = () => goToPage(currentPage + 1);
    if (currentPage === totalPages || totalPages === 0) {
        nextBtn.classList.add('opacity-50', 'cursor-not-allowed');
    }
    paginationContainer.appendChild(nextBtn);
}

// Go to specific page
function goToPage(page) {
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    displayCurrentPage();
    updatePaginationInfo();
}

// Update navigation buttons style
function updateNavigationButtons() {
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const prevBtn = document.getElementById('prevNavBtn');
    const nextBtn = document.getElementById('nextNavBtn');
    
    if (prevBtn && nextBtn) {
        // Reset classes
        prevBtn.className = "btn-standard rounded-lg w-10 transition-colors duration-300";
        nextBtn.className = "btn-standard rounded-lg w-10 transition-colors duration-300";
        
        const prevIcon = prevBtn.querySelector('.material-icons');
        const nextIcon = nextBtn.querySelector('.material-icons');
        
        // Previous button styling
        if (currentPage === 1) {
            // Inactive state
            prevBtn.classList.add('bg-white', 'dark:bg-gray-700', 'cursor-not-allowed', 'opacity-50');
            prevBtn.disabled = true;
            if (prevIcon) {
                prevIcon.className = "material-icons text-gray-400 dark:text-gray-500";
            }
        } else {
            // Active state
            prevBtn.classList.add('bg-white', 'dark:bg-gray-700', 'shadow', 'hover:bg-gray-50', 'dark:hover:bg-gray-600', 'cursor-pointer');
            prevBtn.disabled = false;
            if (prevIcon) {
                prevIcon.className = "material-icons text-custom-blue";
            }
        }
        
        // Next button styling
        if (currentPage === totalPages || totalPages === 0) {
            // Inactive state
            nextBtn.classList.add('bg-white', 'dark:bg-gray-700', 'cursor-not-allowed', 'opacity-50');
            nextBtn.disabled = true;
            if (nextIcon) {
                nextIcon.className = "material-icons text-gray-400 dark:text-gray-500";
            }
        } else {
            // Active state
            nextBtn.classList.add('bg-white', 'dark:bg-gray-700', 'shadow', 'hover:bg-gray-50', 'dark:hover:bg-gray-600', 'cursor-pointer');
            nextBtn.disabled = false;
            if (nextIcon) {
                nextIcon.className = "material-icons text-custom-blue";
            }
        }
    }
}

// Navigation functions
function nextPage() {
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    if (currentPage < totalPages) {
        goToPage(currentPage + 1);
    }
}

function prevPage() {
    if (currentPage > 1) {
        goToPage(currentPage - 1);
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize with all items
    filteredItems = Array.from({length: doctorsData.length}, (_, i) => i);
    
    // Setup search input event listener
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            currentSearchTerm = e.target.value;
            searchDoctors(currentSearchTerm, currentSearchField);
        });
    }
    
    // Setup search field radio buttons
    const searchFieldRadios = document.querySelectorAll('input[name="searchField"]');
    searchFieldRadios.forEach(radio => {
        radio.addEventListener('change', function(e) {
            currentSearchField = e.target.value;
            searchDoctors(currentSearchTerm, currentSearchField);
        });
    });
    
    // Setup navigation buttons
    const prevNavBtn = document.getElementById('prevNavBtn');
    const nextNavBtn = document.getElementById('nextNavBtn');
    
    if (prevNavBtn) {
        prevNavBtn.onclick = prevPage;
    }
    if (nextNavBtn) {
        nextNavBtn.onclick = nextPage;
    }
    
    // Initial display
    displayCurrentPage();
    updatePaginationInfo();
});

// Helper function to clear search
function clearSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = '';
        currentSearchTerm = '';
        searchDoctors('', currentSearchField);
    }
}