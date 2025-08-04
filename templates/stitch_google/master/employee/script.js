// ========================================
// GLOBAL VARIABLES
// ========================================
let currentPage = 1;
let itemsPerPage = 10;
let currentSearchTerm = "";
let currentSearchField = "all";
let filteredItems = [];
let sortField = "";
let sortDirection = "asc";

// ========================================
// SAMPLE DATA
// ========================================
const listData = [
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

// ========================================
// DARK MODE FUNCTIONS
// ========================================
function toggleDarkMode() {
    const html = document.documentElement;
    const body = document.body;
    const icon = document.getElementById("darkModeIcon");

    if (html.classList.contains("dark")) {
        html.classList.remove("dark");
        body.classList.remove("dark");
        icon.textContent = "dark_mode";
        localStorage.setItem("darkMode", "false");
    } else {
        html.classList.add("dark");
        body.classList.add("dark");
        icon.textContent = "light_mode";
        localStorage.setItem("darkMode", "true");
    }
    
    forceScrollbarRefresh();
}

function forceScrollbarRefresh() {
    const container = document.querySelector('.data-list-container');
    if (container) {
        const originalDisplay = container.style.display;
        container.style.display = 'none';
        container.offsetHeight;
        container.style.display = originalDisplay || 'block';
        
        const originalOverflow = container.style.overflowY;
        container.style.overflowY = 'hidden';
        setTimeout(() => {
            container.style.overflowY = originalOverflow || 'auto';
        }, 10);
    }
}

function initDarkMode() {
    const savedMode = localStorage.getItem("darkMode");
    const icon = document.getElementById("darkModeIcon");
    const html = document.documentElement;
    const body = document.body;

    if (savedMode === "true") {
        html.classList.add("dark");
        body.classList.add("dark");
        icon.textContent = "light_mode";
    } else {
        html.classList.remove("dark");
        body.classList.remove("dark");
        icon.textContent = "dark_mode";
    }
    
    setTimeout(forceScrollbarRefresh, 100);
}

// ========================================
// SIDEBAR FUNCTIONS
// ========================================
function toggleSidebar() {
    const sidebar = document.querySelector(".sidebar");
    const menuIcon = document.getElementById("menuIcon");
    const sidebarTexts = document.querySelectorAll(".sidebar-text");
    const mainNav = document.querySelector(".main-nav");
    const appearanceNav = document.querySelector(".appearance-nav");

    if (sidebar.classList.contains("w-64")) {
        sidebar.classList.remove("w-64");
        sidebar.classList.add("w-20");
        menuIcon.textContent = "menu_open";

        sidebarTexts.forEach((el) => {
            el.style.display = "none";
        });

        mainNav.classList.remove("grid-cols-2");
        mainNav.classList.add("grid-cols-1");
        appearanceNav.classList.remove("grid-cols-2");
        appearanceNav.classList.add("grid-cols-1");

        const navLinks = sidebar.querySelectorAll("nav a");
        navLinks.forEach((link) => {
            link.classList.remove("p-3");
            link.classList.add("p-2");
        });
    } else {
        sidebar.classList.remove("w-20");
        sidebar.classList.add("w-64");
        menuIcon.textContent = "menu";

        sidebarTexts.forEach((el) => {
            el.style.display = "";
        });

        mainNav.classList.remove("grid-cols-1");
        mainNav.classList.add("grid-cols-2");
        appearanceNav.classList.remove("grid-cols-1");
        appearanceNav.classList.add("grid-cols-2");

        const navLinks = sidebar.querySelectorAll("nav a");
        navLinks.forEach((link) => {
            link.classList.remove("p-2");
            link.classList.add("p-3");
        });
    }
}

// ========================================
// CHECKBOX FUNCTIONS
// ========================================
function toggleSelectAll() {
    const selectAllCheckbox = document.getElementById('selectAllCheckbox');
    const dataCheckboxes = document.querySelectorAll('.data-checkbox');
    
    if (selectAllCheckbox.checked) {
        // Check all checkboxes
        dataCheckboxes.forEach(checkbox => {
            checkbox.checked = true;
        });
    } else {
        // Uncheck all checkboxes
        dataCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
    }
    
    updateSelectAllState();
}

function updateSelectAllState() {
    const selectAllCheckbox = document.getElementById('selectAllCheckbox');
    const dataCheckboxes = document.querySelectorAll('.data-checkbox');
    const checkedBoxes = document.querySelectorAll('.data-checkbox:checked');
    
    if (checkedBoxes.length === 0) {
        // No checkboxes checked
        selectAllCheckbox.checked = false;
        selectAllCheckbox.indeterminate = false;
    } else if (checkedBoxes.length === dataCheckboxes.length) {
        // All checkboxes checked
        selectAllCheckbox.checked = true;
        selectAllCheckbox.indeterminate = false;
    } else {
        // Some checkboxes checked (indeterminate state)
        selectAllCheckbox.checked = false;
        selectAllCheckbox.indeterminate = true;
    }
}

function getSelectedItems() {
    const checkedBoxes = document.querySelectorAll('.data-checkbox:checked');
    const selectedIds = Array.from(checkedBoxes).map(checkbox => {
        return parseInt(checkbox.getAttribute('data-id'));
    });
    return selectedIds;
}

function clearAllSelections() {
    const selectAllCheckbox = document.getElementById('selectAllCheckbox');
    const dataCheckboxes = document.querySelectorAll('.data-checkbox');
    
    selectAllCheckbox.checked = false;
    selectAllCheckbox.indeterminate = false;
    
    dataCheckboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
}
function toggleSearchFilter(button) {
    const dropdown = button.nextElementSibling;
    const isVisible = dropdown.classList.contains("show");

    document.querySelectorAll(".search-filter-menu").forEach((menu) => {
        menu.classList.remove("show");
    });

    if (!isVisible) {
        dropdown.classList.add("show");
    }
}

function toggleDropdown(button) {
    const dropdown = button.nextElementSibling;
    const isVisible = dropdown.classList.contains("show");

    document.querySelectorAll(".dropdown-menu").forEach((menu) => {
        menu.classList.remove("show");
    });

    if (!isVisible) {
        dropdown.classList.add("show");
    }
}

// ========================================
// SORTING FUNCTIONS
// ========================================
function sortData(field) {
    if (sortField === field) {
        sortDirection = sortDirection === "asc" ? "desc" : "asc";
    } else {
        sortField = field;
        sortDirection = "asc";
    }
    
    updateSortIcons(field, sortDirection);
    
    filteredItems.sort((a, b) => {
        const dataA = listData[a];
        const dataB = listData[b];
        let valueA, valueB;
        
        switch(field) {
            case 'name':
                valueA = dataA.name.toLowerCase();
                valueB = dataB.name.toLowerCase();
                break;
            case 'phone':
                valueA = dataA.phone.toLowerCase();
                valueB = dataB.phone.toLowerCase();
                break;
            case 'gender':
                valueA = dataA.gender.toLowerCase();
                valueB = dataB.gender.toLowerCase();
                break;
            case 'status':
                const statusPriority = {
                    'available': 1,
                    'on break': 2,
                    'in surgery': 3,
                    'not available': 4
                };
                valueA = statusPriority[dataA.status.toLowerCase()] || 5;
                valueB = statusPriority[dataB.status.toLowerCase()] || 5;
                break;
            case 'specialty':
                valueA = dataA.specialty.toLowerCase();
                valueB = dataB.specialty.toLowerCase();
                break;
            default:
                return 0;
        }
        
        if (valueA < valueB) {
            return sortDirection === "asc" ? -1 : 1;
        }
        if (valueA > valueB) {
            return sortDirection === "asc" ? 1 : -1;
        }
        return 0;
    });
    
    currentPage = 1;
    displayCurrentPage();
    updatePaginationInfo();
}

function updateSortIcons(activeField, direction) {
    const sortButtons = document.querySelectorAll('.sort-btn');
    sortButtons.forEach(button => {
        const icon = button.querySelector('.material-icons');
        const field = button.getAttribute('data-sort');
        
        if (field === activeField) {
            button.classList.add('text-custom-blue');
            button.classList.remove('text-gray-600', 'dark:text-gray-300');
            
            if (direction === "asc") {
                icon.textContent = "keyboard_arrow_up";
                icon.classList.add('text-custom-blue');
                icon.classList.remove('text-gray-400');
            } else {
                icon.textContent = "keyboard_arrow_down";
                icon.classList.add('text-custom-blue');
                icon.classList.remove('text-gray-400');
            }
        } else {
            button.classList.remove('text-custom-blue');
            button.classList.add('text-gray-600', 'dark:text-gray-300');
            
            icon.textContent = "unfold_more";
            icon.classList.remove('text-custom-blue');
            icon.classList.add('text-gray-400');
        }
    });
}

// ========================================
// SEARCH FUNCTIONS
// ========================================
function searchData(searchTerm, searchField) {
    filteredItems = [];
    
    listData.forEach((data, index) => {
        let shouldShow = false;
        
        if (!searchTerm.trim()) {
            shouldShow = true;
        } else {
            const searchLower = searchTerm.toLowerCase();
            
            switch(searchField) {
                case 'name':
                    shouldShow = data.name.toLowerCase().includes(searchLower);
                    break;
                case 'specialty':
                    shouldShow = data.specialty.toLowerCase().includes(searchLower);
                    break;
                case 'phone':
                    shouldShow = data.phone.toLowerCase().includes(searchLower);
                    break;
                case 'status':
                    shouldShow = data.status.toLowerCase().includes(searchLower);
                    break;
                default:
                    shouldShow = data.name.toLowerCase().includes(searchLower) ||
                                data.specialty.toLowerCase().includes(searchLower) ||
                                data.phone.toLowerCase().includes(searchLower) ||
                                data.status.toLowerCase().includes(searchLower);
            }
        }
        
        if (shouldShow) {
            filteredItems.push(index);
        }
    });
    
    if (sortField) {
        sortData(sortField);
    } else {
        currentPage = 1;
        displayCurrentPage();
        updatePaginationInfo();
    }
}

function clearSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = '';
        currentSearchTerm = '';
        searchData('', currentSearchField);
    }
}

// ========================================
// DATA DISPLAY FUNCTIONS
// ========================================
function generateDataCard(data) {
    const statusClass = getStatusClass(data.status);
    const statusColor = getStatusColor(data.status);

    return `
        <div class="p-4 border border-gray-200 dark:border-gray-400 rounded-lg shadow-lg dark:shadow-gray-600/50 hover:shadow-xl dark:hover:shadow-gray-500/50 transition-shadow duration-200 grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
            <div class="flex items-center space-x-4 col-span-1 md:col-span-2">
                <input type="checkbox" class="data-checkbox w-4 h-4 text-custom-blue bg-gray-100 border-gray-300 rounded focus:ring-custom-blue dark:focus:ring-custom-blue dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" data-id="${data.id}" />
                <img alt="${data.name}" class="w-12 h-12 rounded-full" src="${data.image}" />
                <div>
                    <p class="font-bold text-gray-800 dark:text-gray-100">${data.name}</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400">${data.specialty}</p>
                </div>
            </div>
            <div class="col-span-1">
                <p class="text-gray-500 dark:text-gray-400 text-sm">Contact</p>
                <p class="font-semibold text-gray-800 dark:text-gray-100">${data.phone}</p>
            </div>
            <div class="col-span-1">
                <p class="text-gray-500 dark:text-gray-400 text-sm">Category</p>
                <p class="font-semibold text-gray-800 dark:text-gray-100">${data.gender}</p>
            </div>
            <div class="col-span-1">
                <span class="${statusClass} text-xs font-semibold px-3 py-1.5 rounded-full inline-flex items-center">
                    <span class="w-2 h-2 ${statusColor} rounded-full mr-2"></span> ${data.status}
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

function displayCurrentPage() {
    const container = document.querySelector('.data-list-container');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    container.innerHTML = '';
    
    const pageItems = filteredItems.slice(startIndex, endIndex);
    pageItems.forEach(index => {
        const data = listData[index];
        container.innerHTML += generateDataCard(data);
    });
    
    // Add event listeners to individual checkboxes
    const dataCheckboxes = container.querySelectorAll('.data-checkbox');
    dataCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateSelectAllState();
        });
    });
    
    container.scrollTop = 0;
    updateSelectAllState();
}

// ========================================
// HELPER FUNCTIONS
// ========================================
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

function scrollToTopOfCards() {
    const container = document.querySelector('.data-list-container');
    if (container) {
        container.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

function isContainerScrollable() {
    const container = document.querySelector('.data-list-container');
    if (container) {
        return container.scrollHeight > container.clientHeight;
    }
    return false;
}

// ========================================
// PAGINATION FUNCTIONS
// ========================================
function updatePaginationInfo() {
    const totalItems = filteredItems.length;
    const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);
    
    const countDisplay = document.querySelector('.data-count');
    if (countDisplay) {
        countDisplay.textContent = `${startItem}-${endItem} / ${totalItems}`;
    }
    
    updateNavigationButtons();
    updatePaginationButtons();
}

function updatePaginationButtons() {
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const paginationContainer = document.querySelector('.pagination-buttons');
    
    if (!paginationContainer) return;
    
    paginationContainer.innerHTML = '';
    
    const prevBtn = document.createElement('button');
    prevBtn.className = 'pagination-btn border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300';
    prevBtn.textContent = 'Previous';
    prevBtn.disabled = currentPage === 1;
    prevBtn.onclick = () => goToPage(currentPage - 1);
    if (currentPage === 1) {
        prevBtn.classList.add('opacity-50', 'cursor-not-allowed');
    }
    paginationContainer.appendChild(prevBtn);
    
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

function goToPage(page) {
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    displayCurrentPage();
    updatePaginationInfo();
}

function updateNavigationButtons() {
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const prevBtn = document.querySelector('.prev-nav-btn');
    const nextBtn = document.querySelector('.next-nav-btn');
    
    if (prevBtn && nextBtn) {
        prevBtn.className = "prev-nav-btn btn-standard rounded-lg w-10 transition-colors duration-300";
        nextBtn.className = "next-nav-btn btn-standard rounded-lg w-10 transition-colors duration-300";
        
        const prevIcon = prevBtn.querySelector('.material-icons');
        const nextIcon = nextBtn.querySelector('.material-icons');
        
        if (currentPage === 1) {
            prevBtn.classList.add('bg-white', 'dark:bg-gray-700', 'cursor-not-allowed', 'opacity-50');
            prevBtn.disabled = true;
            if (prevIcon) {
                prevIcon.className = "material-icons text-gray-400 dark:text-gray-500";
            }
        } else {
            prevBtn.classList.add('bg-white', 'dark:bg-gray-700', 'shadow', 'hover:bg-gray-50', 'dark:hover:bg-gray-600', 'cursor-pointer');
            prevBtn.disabled = false;
            if (prevIcon) {
                prevIcon.className = "material-icons text-custom-blue";
            }
        }
        
        if (currentPage === totalPages || totalPages === 0) {
            nextBtn.classList.add('bg-white', 'dark:bg-gray-700', 'cursor-not-allowed', 'opacity-50');
            nextBtn.disabled = true;
            if (nextIcon) {
                nextIcon.className = "material-icons text-gray-400 dark:text-gray-500";
            }
        } else {
            nextBtn.classList.add('bg-white', 'dark:bg-gray-700', 'shadow', 'hover:bg-gray-50', 'dark:hover:bg-gray-600', 'cursor-pointer');
            nextBtn.disabled = false;
            if (nextIcon) {
                nextIcon.className = "material-icons text-custom-blue";
            }
        }
    }
}

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

// ========================================
// EVENT LISTENERS AND INITIALIZATION
// ========================================
document.addEventListener("click", function (event) {
    const dropdowns = document.querySelectorAll(".dropdown-menu, .search-filter-menu");
    const isDropdownButton = event.target.closest('button[onclick*="toggleDropdown"]') ||
                            event.target.closest('button[onclick*="toggleSearchFilter"]');
    const isInsideSearchFilter = event.target.closest(".search-filter-menu");

    if (!isDropdownButton && !isInsideSearchFilter) {
        dropdowns.forEach((dropdown) => {
            dropdown.classList.remove("show");
        });
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        document.querySelectorAll(".dropdown-menu, .search-filter-menu").forEach((menu) => {
            menu.classList.remove("show");
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    initDarkMode();
    
    filteredItems = Array.from({length: listData.length}, (_, i) => i);
    
    // Setup select all checkbox
    const selectAllCheckbox = document.getElementById('selectAllCheckbox');
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', toggleSelectAll);
    }
    
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            currentSearchTerm = e.target.value;
            searchData(currentSearchTerm, currentSearchField);
        });
    }
    
    const searchFieldRadios = document.querySelectorAll('input[name="searchField"]');
    searchFieldRadios.forEach(radio => {
        radio.addEventListener('change', function(e) {
            currentSearchField = e.target.value;
            searchData(currentSearchTerm, currentSearchField);
        });
    });
    
    const prevNavBtn = document.querySelector('.prev-nav-btn');
    const nextNavBtn = document.querySelector('.next-nav-btn');
    
    if (prevNavBtn) {
        prevNavBtn.onclick = prevPage;
    }
    if (nextNavBtn) {
        nextNavBtn.onclick = nextPage;
    }
    
    const sortButtons = document.querySelectorAll('.sort-btn');
    sortButtons.forEach(button => {
        button.addEventListener('click', function() {
            const field = this.getAttribute('data-sort');
            sortData(field);
        });
    });
    
    displayCurrentPage();
    updatePaginationInfo();
});