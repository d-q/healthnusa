// Enhanced form.js with Add Time functionality

// Simple form functionality
function saveRow(button) {
    const icon = button.querySelector('.material-icons');
    const originalIcon = icon.textContent;
    
    icon.textContent = 'check';
    button.classList.remove('text-blue-600');
    button.classList.add('text-green-600');
    
    setTimeout(() => {
        icon.textContent = originalIcon;
        button.classList.remove('text-green-600');
        button.classList.add('text-blue-600');
    }, 1000);
}

function deleteRow(button) {
    if (confirm('Are you sure you want to delete this row?')) {
        const row = button.closest('tr');
        row.remove();
    }
}

function editRow(button) {
    const row = button.closest('tr');
    const cells = row.querySelectorAll('td');
    
    for (let i = 0; i < cells.length - 1; i++) {
        const cell = cells[i];
        const text = cell.textContent.trim();
        cell.innerHTML = '<input class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100" type="text" value="' + text + '" />';
    }
    
    const actionCell = cells[cells.length - 1];
    actionCell.innerHTML = '<div class="flex justify-end space-x-2"><button class="text-blue-600 hover:text-blue-800" onclick="saveRow(this)"><span class="material-icons">save</span></button><button class="text-red-600 hover:text-red-800" onclick="deleteRow(this)"><span class="material-icons">delete</span></button></div>';
}

function addEducationRow() {
    const tbody = document.querySelector('table tbody');
    const newRow = document.createElement('tr');
    newRow.className = 'bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700';
    newRow.innerHTML = '<td class="px-6 py-4 font-medium text-gray-900 dark:text-gray-100"><input class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100" type="text" placeholder="Enter degree" /></td><td class="px-6 py-4"><input class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100" type="text" placeholder="Enter institution" /></td><td class="px-6 py-4"><input class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100" type="text" placeholder="Enter year" /></td><td class="px-6 py-4 text-right"><div class="flex justify-end space-x-2"><button class="text-blue-600 hover:text-blue-800" onclick="saveRow(this)"><span class="material-icons">save</span></button><button class="text-red-600 hover:text-red-800" onclick="deleteRow(this)"><span class="material-icons">delete</span></button></div></td>';
    tbody.appendChild(newRow);
}

function addExperienceRow() {
    const tables = document.querySelectorAll('table');
    const tbody = tables[1].querySelector('tbody');
    const newRow = document.createElement('tr');
    newRow.className = 'bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700';
    newRow.innerHTML = '<td class="px-6 py-4 font-medium text-gray-900 dark:text-gray-100"><input class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100" type="text" placeholder="Enter position" /></td><td class="px-6 py-4"><input class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100" type="text" placeholder="Enter institution" /></td><td class="px-6 py-4"><input class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100" type="text" placeholder="Enter period" /></td><td class="px-6 py-4 text-right"><div class="flex justify-end space-x-2"><button class="text-blue-600 hover:text-blue-800" onclick="saveRow(this)"><span class="material-icons">save</span></button><button class="text-red-600 hover:text-red-800" onclick="deleteRow(this)"><span class="material-icons">delete</span></button></div></td>';
    tbody.appendChild(newRow);
}

// Add Time functionality for schedule
function addTimeSlot(button) {
    const timeContainer = button.closest('.flex-1');
    const addButton = button;
    
    // Create new time slot
    const newTimeSlot = document.createElement('div');
    newTimeSlot.className = 'flex items-center space-x-2';
    newTimeSlot.innerHTML = `
        <input class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100" 
               type="time" value="09:00" />
        <span>-</span>
        <input class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100" 
               type="time" value="17:00" />
        <button class="text-gray-400 hover:text-red-500" onclick="removeTimeSlot(this)">
            <span class="material-icons text-base">delete</span>
        </button>
    `;
    
    // Insert before the add button
    addButton.parentNode.insertBefore(newTimeSlot, addButton);
    
    // Add visual feedback
    newTimeSlot.style.opacity = '0';
    newTimeSlot.style.transform = 'translateY(-10px)';
    
    // Animate in
    setTimeout(() => {
        newTimeSlot.style.transition = 'all 0.3s ease';
        newTimeSlot.style.opacity = '1';
        newTimeSlot.style.transform = 'translateY(0)';
    }, 10);
}

function removeTimeSlot(button) {
    const timeSlot = button.closest('.flex.items-center.space-x-2');
    const timeContainer = timeSlot.closest('.flex-1');
    
    // Don't allow removing if it's the only time slot
    const timeSlots = timeContainer.querySelectorAll('.flex.items-center.space-x-2');
    if (timeSlots.length <= 2) { // 1 time slot + 1 add button
        alert('At least one time slot is required');
        return;
    }
    
    // Animate out
    timeSlot.style.transition = 'all 0.3s ease';
    timeSlot.style.opacity = '0';
    timeSlot.style.transform = 'translateY(-10px)';
    
    setTimeout(() => {
        timeSlot.remove();
    }, 300);
}

// Standardized tab function - handles all tabs including appointments
function showTab(event, tabId) {
    event.preventDefault();
    
    // Update nav active state
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.classList.remove('text-blue-600', 'border-b-2', 'border-blue-600');
        link.classList.add('text-gray-500', 'dark:text-gray-400');
    });
    
    event.target.closest('a').classList.remove('text-gray-500', 'dark:text-gray-400');
    event.target.closest('a').classList.add('text-blue-600', 'border-b-2', 'border-blue-600');
    
    const mainContent = document.getElementById('mainContent');
    
    // Handle appointments tab differently
    if (tabId === 'appointments') {
        // Remove any existing appointments content
        const appointmentsContent = document.getElementById('appointments-content');
        if (appointmentsContent) {
            appointmentsContent.remove();
        }
        
        // Hide all regular tabs
        const tabs = document.querySelectorAll('.tab-content');
        tabs.forEach(tab => tab.classList.add('hidden'));
        
        // Create appointments content
        const appointmentsDiv = document.createElement('div');
        appointmentsDiv.id = 'appointments-content';
        appointmentsDiv.className = 'tab-content';
        appointmentsDiv.innerHTML = `
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-lg font-bold text-gray-800 dark:text-gray-100">Upcoming Appointments</h3>
                <div class="flex items-center space-x-2">
                    <span class="text-sm text-gray-600 dark:text-gray-300">Today: January 15, 2025</span>
                    <span class="bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded-full">8 appointments</span>
                </div>
            </div>
            <div class="space-y-4">
                <div class="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-4">
                            <div class="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                                <span class="material-icons text-gray-600 dark:text-gray-300">person</span>
                            </div>
                            <div>
                                <h4 class="font-semibold text-gray-800 dark:text-gray-100">Sarah Johnson</h4>
                                <p class="text-sm text-gray-600 dark:text-gray-300">ID: PAT-001234</p>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Chest pain consultation</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <div class="flex items-center space-x-2 mb-1">
                                <span class="material-icons text-sm text-gray-500">schedule</span>
                                <span class="text-sm font-medium text-gray-800 dark:text-gray-100">09:00 - 09:30</span>
                            </div>
                            <span class="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-medium px-2 py-1 rounded-full">Confirmed</span>
                        </div>
                    </div>
                </div>
                <div class="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-4">
                            <div class="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                                <span class="material-icons text-gray-600 dark:text-gray-300">person</span>
                            </div>
                            <div>
                                <h4 class="font-semibold text-gray-800 dark:text-gray-100">Michael Chen</h4>
                                <p class="text-sm text-gray-600 dark:text-gray-300">ID: PAT-001235</p>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Regular checkup</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <div class="flex items-center space-x-2 mb-1">
                                <span class="material-icons text-sm text-gray-500">schedule</span>
                                <span class="text-sm font-medium text-gray-800 dark:text-gray-100">10:00 - 10:30</span>
                            </div>
                            <span class="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs font-medium px-2 py-1 rounded-full">Waiting</span>
                        </div>
                    </div>
                </div>
                <div class="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-4">
                            <div class="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                                <span class="material-icons text-gray-600 dark:text-gray-300">person</span>
                            </div>
                            <div>
                                <h4 class="font-semibold text-gray-800 dark:text-gray-100">Emma Williams</h4>
                                <p class="text-sm text-gray-600 dark:text-gray-300">ID: PAT-001236</p>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Hypertension follow-up</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <div class="flex items-center space-x-2 mb-1">
                                <span class="material-icons text-sm text-gray-500">schedule</span>
                                <span class="text-sm font-medium text-gray-800 dark:text-gray-100">11:00 - 11:30</span>
                            </div>
                            <span class="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium px-2 py-1 rounded-full">In Progress</span>
                        </div>
                    </div>
                </div>
                <div class="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-4">
                            <div class="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                                <span class="material-icons text-gray-600 dark:text-gray-300">person</span>
                            </div>
                            <div>
                                <h4 class="font-semibold text-gray-800 dark:text-gray-100">Robert Davis</h4>
                                <p class="text-sm text-gray-600 dark:text-gray-300">ID: PAT-001237</p>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Heart rhythm evaluation</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <div class="flex items-center space-x-2 mb-1">
                                <span class="material-icons text-sm text-gray-500">schedule</span>
                                <span class="text-sm font-medium text-gray-800 dark:text-gray-100">13:00 - 13:30</span>
                            </div>
                            <span class="bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 text-xs font-medium px-2 py-1 rounded-full">Scheduled</span>
                        </div>
                    </div>
                </div>
                <div class="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-4">
                            <div class="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                                <span class="material-icons text-gray-600 dark:text-gray-300">person</span>
                            </div>
                            <div>
                                <h4 class="font-semibold text-gray-800 dark:text-gray-100">Lisa Anderson</h4>
                                <p class="text-sm text-gray-600 dark:text-gray-300">ID: PAT-001238</p>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Post-surgery follow-up</p>
                            </div>
                        </div>
                        <div class="text-right">
                            <div class="flex items-center space-x-2 mb-1">
                                <span class="material-icons text-sm text-gray-500">schedule</span>
                                <span class="text-sm font-medium text-gray-800 dark:text-gray-100">14:00 - 14:30</span>
                            </div>
                            <span class="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-medium px-2 py-1 rounded-full">Confirmed</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add appointments content to mainContent
        mainContent.appendChild(appointmentsDiv);
    } else {
        // Handle regular tabs (doctor-details, medical-license)
        // Remove appointments content if exists
        const appointmentsContent = document.getElementById('appointments-content');
        if (appointmentsContent) {
            appointmentsContent.remove();
        }
        
        // Restore original content if needed
        const doctorDetails = document.getElementById('doctor-details');
        const medicalLicense = document.getElementById('medical-license');
        
        if (!doctorDetails || !medicalLicense) {
            // Reload page to restore original content
            location.reload();
            return;
        }
        
        // Hide all tabs
        const tabs = document.querySelectorAll('.tab-content');
        tabs.forEach(tab => tab.classList.add('hidden'));
        
        // Show selected tab
        const selectedTab = document.getElementById(tabId);
        if (selectedTab) {
            selectedTab.classList.remove('hidden');
        }
    }
}

// License functions
function showAddLicenseForm() {
    document.getElementById('addLicenseForm').classList.remove('hidden');
}

function hideAddLicenseForm() {
    document.getElementById('addLicenseForm').classList.add('hidden');
    document.getElementById('addLicenseForm').querySelector('form').reset();
}

function addNewLicense(event) {
    event.preventDefault();
    alert('License added successfully!');
    hideAddLicenseForm();
}

function editLicense(button) {
    const licenseCard = button.closest('.bg-gray-50');
    const fields = licenseCard.querySelectorAll('p');
    
    fields.forEach(field => {
        const text = field.textContent.trim();
        field.innerHTML = '<input class="w-full p-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100" type="text" value="' + text + '" />';
    });
    
    const actionContainer = button.closest('.flex.items-center.space-x-2');
    actionContainer.innerHTML = '<button class="text-green-600 hover:text-green-800" onclick="saveLicense(this)"><span class="material-icons text-base">save</span></button><button class="text-gray-600 hover:text-gray-800" onclick="cancelEditLicense(this)"><span class="material-icons text-base">cancel</span></button>';
}

function saveLicense(button) {
    const licenseCard = button.closest('.bg-gray-50');
    const inputs = licenseCard.querySelectorAll('input');
    
    inputs.forEach(input => {
        const p = document.createElement('p');
        p.className = 'text-gray-800 dark:text-gray-100 font-medium';
        p.textContent = input.value;
        input.parentNode.replaceChild(p, input);
    });
    
    const actionContainer = button.closest('.flex.items-center.space-x-2');
    actionContainer.innerHTML = '<button class="text-gray-500 hover:text-blue-600" onclick="editLicense(this)"><span class="material-icons text-base">edit</span></button><button class="text-gray-500 hover:text-red-600" onclick="deleteLicense(this)"><span class="material-icons text-base">delete</span></button>';
    
    alert('License updated successfully!');
}

function cancelEditLicense(button) {
    location.reload();
}

function deleteLicense(button) {
    if (confirm('Are you sure you want to delete this license?')) {
        button.closest('.bg-gray-50').remove();
    }
}

// Schedule functions
document.addEventListener('DOMContentLoaded', function() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const container = this.closest('.flex.items-start.space-x-2');
            if (!container) return;
            
            const timeContainer = container.querySelector('.flex-1');
            const timeInputs = timeContainer.querySelectorAll('input[type="time"]');
            const buttons = timeContainer.querySelectorAll('button');
            const label = this.closest('label');
            
            if (this.checked) {
                timeInputs.forEach(input => input.disabled = false);
                buttons.forEach(btn => btn.disabled = false);
                timeContainer.classList.remove('opacity-50');
                
                const day = this.nextElementSibling.textContent;
                label.classList.remove('bg-gray-100', 'dark:bg-gray-700', 'text-gray-500', 'dark:text-gray-400');
                
                switch(day) {
                    case 'Mon':
                        label.classList.add('bg-blue-100', 'text-blue-600');
                        break;
                    case 'Tue':
                        label.classList.add('bg-green-100', 'text-green-600');
                        break;
                    case 'Wed':
                        label.classList.add('bg-pink-100', 'text-pink-600');
                        break;
                    case 'Thu':
                        label.classList.add('bg-purple-100', 'text-purple-600');
                        break;
                    case 'Fri':
                        label.classList.add('bg-yellow-100', 'text-yellow-600');
                        break;
                }
            } else {
                timeInputs.forEach(input => input.disabled = true);
                buttons.forEach(btn => btn.disabled = true);
                timeContainer.classList.add('opacity-50');
                
                label.className = 'flex items-center space-x-2 p-2 border border-gray-300 dark:border-gray-600 rounded-md cursor-pointer bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 w-20 justify-center';
            }
        });
    });
    
    // Update existing "+ Add time" buttons to use the new function
    const addTimeButtons = document.querySelectorAll('button[onclick*="Add time"]');
    addTimeButtons.forEach(button => {
        if (button.textContent.includes('+ Add time')) {
            button.setAttribute('onclick', 'addTimeSlot(this)');
        }
    });
    
    const saveButton = document.querySelector('.bg-blue-500');
    const cancelButton = document.querySelector('.bg-gray-200');
    
    if (saveButton) {
        saveButton.addEventListener('click', function() {
            const originalText = this.innerHTML;
            this.innerHTML = 'Saving...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
                alert('Changes saved successfully!');
            }, 2000);
        });
    }
    
    if (cancelButton) {
        cancelButton.addEventListener('click', function() {
            if (confirm('Are you sure you want to cancel? All changes will be lost.')) {
                window.location.href = 'detail.html';
            }
        });
    }
});