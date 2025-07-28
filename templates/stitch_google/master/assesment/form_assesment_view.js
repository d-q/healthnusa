// Assessment Form JavaScript
// Mario Hospital Assessment Form

// Global Variables
let markerCount = 6; // Starting from 6 since we have 6 existing markers
let currentConfirmCallback = null;
let isMarkerMode = false; // Track if we're in marker placement mode

// Form Navbar Toggle
document.addEventListener('DOMContentLoaded', function() {
    initializeFormNavigation();
    initializeMarkers();
    initializeFormSubmission();
    loadDraftData();
});

function initializeFormNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const formSections = {
        'general-form': document.getElementById('general-form-section'),
        'specialist-form': document.getElementById('specialist-form-section'),
        'medication-form': document.getElementById('medication-form-section'),
        'instruction-form': document.getElementById('instruction-form-section')
    };

    function switchForm(targetForm) {
        // Remove active class from all nav items
        navItems.forEach(item => item.classList.remove('active'));
        
        // Add active class to clicked nav item
        const activeNavItem = document.querySelector(`[data-form="${targetForm}"]`);
        if (activeNavItem) {
            activeNavItem.classList.add('active');
        }

        // Hide all form sections
        Object.values(formSections).forEach(section => {
            if (section) {
                section.classList.remove('active');
            }
        });

        // Show target form section
        if (formSections[targetForm]) {
            formSections[targetForm].classList.add('active');
        }
    }

    // Add click event listeners to nav items
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetForm = this.getAttribute('data-form');
            switchForm(targetForm);
        });
    });

    // Initialize with general form active
    switchForm('general-form');
}

function initializeMarkers() {
    // Initialize existing markers with click events
    document.querySelectorAll('.anatomy-marker').forEach(marker => {
        marker.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMarkerNote(this);
        });
    });

    // Add click event to anatomy image for placing markers
    const anatomyContainer = document.querySelector('.anatomy-container');
    const anatomyImage = document.querySelector('.anatomy-container img');
    
    if (anatomyImage && anatomyContainer) {
        // Add crosshair cursor when in marker mode
        anatomyImage.style.cursor = 'crosshair';
        
        anatomyContainer.addEventListener('click', function(e) {
            // Check if click is on the image, not on existing markers
            if (e.target === anatomyImage) {
                const rect = anatomyContainer.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                
                // Place marker at clicked position
                placeMarkerAtPosition(x, y);
            }
        });

        // Add hover effect instructions
        anatomyImage.addEventListener('mouseenter', function() {
            showTooltip('Klik pada gambar untuk menambahkan marker');
        });

        anatomyImage.addEventListener('mouseleave', function() {
            hideTooltip();
        });
    }

    // Hide notes when clicking outside
    document.addEventListener('click', function(e) {
        // Don't hide if clicking on marker controls
        if (!e.target.closest('.anatomy-marker') && !e.target.closest('.marker-note')) {
            document.querySelectorAll('.marker-note').forEach(note => {
                note.classList.remove('active');
            });
        }
    });
}

function placeMarkerAtPosition(x, y) {
    markerCount++;
    const container = document.querySelector('.anatomy-container');
    
    if (!container) {
        console.error('Anatomy container not found');
        return;
    }

    const marker = document.createElement('div');
    marker.className = 'anatomy-marker';
    marker.style.top = y + '%';
    marker.style.left = x + '%';
    marker.setAttribute('data-note', markerCount);
    
    const note = document.createElement('div');
    note.className = 'marker-note';
    note.style.top = '-40px';
    note.style.left = '-75px';
    note.innerHTML = `
        <strong>Marker ${markerCount}:</strong><br>
        <textarea class="w-full text-xs border-0 resize-none" rows="2" placeholder="Tambahkan keterangan..." autofocus></textarea>
        <div class="mt-2 flex justify-end space-x-1">
            <button onclick="saveMarkerNote(${markerCount})" class="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">Simpan</button>
            <button onclick="cancelMarkerNote(${markerCount})" class="text-xs bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600">Batal</button>
        </div>
    `;
    
    marker.appendChild(note);
    container.appendChild(marker);

    // Add click event for future editing
    marker.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMarkerNote(this);
    });

    // Automatically show the note for immediate editing
    note.classList.add('active');
    
    // Focus on textarea
    setTimeout(() => {
        const textarea = note.querySelector('textarea');
        if (textarea) {
            textarea.focus();
        }
    }, 10);

    // Add marker to list (initially as draft)
    addMarkerToList(markerCount, 'Menunggu keterangan...', true);
    
    // Show success notification
    showNotification('Marker berhasil ditambahkan. Silakan tambahkan keterangan.', 'info');
}

function saveMarkerNote(markerId) {
    const marker = document.querySelector(`[data-note="${markerId}"]`);
    if (!marker) return;

    const textarea = marker.querySelector('textarea');
    const description = textarea ? textarea.value.trim() : '';
    
    if (!description) {
        showNotification('Silakan masukkan keterangan untuk marker', 'warning');
        return;
    }

    // Update marker note to read-only
    const note = marker.querySelector('.marker-note');
    if (note) {
        note.innerHTML = `
            <strong>Marker ${markerId}:</strong><br>
            <span class="text-xs">${description}</span>
            <div class="mt-2 flex justify-end space-x-1">
                <button onclick="editMarkerNote(${markerId})" class="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">Edit</button>
                <button onclick="deleteMarker(${markerId})" class="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Hapus</button>
            </div>
        `;
    }

    // Update marker in list
    updateMarkerInList(markerId, description, false);
    
    showNotification('Keterangan marker berhasil disimpan', 'success');
}

function cancelMarkerNote(markerId) {
    const marker = document.querySelector(`[data-note="${markerId}"]`);
    const markerListItem = document.querySelector(`[data-marker-id="${markerId}"]`);
    
    if (marker) {
        marker.remove();
    }
    
    if (markerListItem) {
        markerListItem.remove();
    }
    
    markerCount--; // Decrease counter since we cancelled
    showNotification('Penambahan marker dibatalkan', 'info');
}

function editMarkerNote(markerId) {
    const marker = document.querySelector(`[data-note="${markerId}"]`);
    if (!marker) return;

    const note = marker.querySelector('.marker-note');
    const currentDescription = note.querySelector('span').textContent;
    
    note.innerHTML = `
        <strong>Marker ${markerId}:</strong><br>
        <textarea class="w-full text-xs border-0 resize-none" rows="2" autofocus>${currentDescription}</textarea>
        <div class="mt-2 flex justify-end space-x-1">
            <button onclick="saveMarkerNote(${markerId})" class="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">Simpan</button>
            <button onclick="cancelEditMarkerNote(${markerId}, '${currentDescription.replace(/'/g, "\\'")})" class="text-xs bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600">Batal</button>
        </div>
    `;
    
    // Focus on textarea
    setTimeout(() => {
        const textarea = note.querySelector('textarea');
        if (textarea) {
            textarea.focus();
            textarea.select();
        }
    }, 10);
}

function cancelEditMarkerNote(markerId, originalDescription) {
    const marker = document.querySelector(`[data-note="${markerId}"]`);
    if (!marker) return;

    const note = marker.querySelector('.marker-note');
    if (note) {
        note.innerHTML = `
            <strong>Marker ${markerId}:</strong><br>
            <span class="text-xs">${originalDescription}</span>
            <div class="mt-2 flex justify-end space-x-1">
                <button onclick="editMarkerNote(${markerId})" class="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">Edit</button>
                <button onclick="deleteMarker(${markerId})" class="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Hapus</button>
            </div>
        `;
    }
}

function showTooltip(message) {
    // Remove existing tooltip
    const existingTooltip = document.getElementById('marker-tooltip');
    if (existingTooltip) {
        existingTooltip.remove();
    }

    const tooltip = document.createElement('div');
    tooltip.id = 'marker-tooltip';
    tooltip.className = 'fixed bg-gray-800 text-white text-xs px-2 py-1 rounded shadow-lg z-50 pointer-events-none';
    tooltip.textContent = message;
    
    document.body.appendChild(tooltip);

    // Position tooltip to follow mouse
    document.addEventListener('mousemove', positionTooltip);
}

function positionTooltip(e) {
    const tooltip = document.getElementById('marker-tooltip');
    if (tooltip) {
        tooltip.style.left = (e.clientX + 10) + 'px';
        tooltip.style.top = (e.clientY - 30) + 'px';
    }
}

function hideTooltip() {
    const tooltip = document.getElementById('marker-tooltip');
    if (tooltip) {
        tooltip.remove();
    }
    document.removeEventListener('mousemove', positionTooltip);
}

// Anatomy Marker Functions
function addMarker() {
    // This function now just shows instruction
    showNotification('Klik langsung pada gambar anatomi untuk menambahkan marker', 'info');
}

function addMarkerToList(markerId, description, isDraft = false) {
    const markerList = document.getElementById('marker-list');
    
    if (!markerList) {
        console.error('Marker list not found');
        return;
    }

    const markerItem = document.createElement('div');
    markerItem.className = 'bg-white p-3 rounded border border-gray-200';
    markerItem.setAttribute('data-marker-id', markerId);
    
    const statusClass = isDraft ? 'bg-yellow-500' : 'bg-red-500';
    const statusText = isDraft ? 'Draft' : '';
    
    markerItem.innerHTML = `
        <div class="flex items-start space-x-2">
            <div class="w-3 h-3 ${statusClass} rounded-full mt-1 flex-shrink-0"></div>
            <div class="flex-1">
                <p class="text-sm font-medium text-gray-700">Marker ${markerId} ${statusText}</p>
                <p class="text-xs text-gray-500">${description}</p>
            </div>
            <button class="text-red-500 hover:text-red-700 text-xs" onclick="deleteMarker(${markerId})">
                <span class="material-icons text-sm">delete</span>
            </button>
        </div>
    `;
    
    markerList.appendChild(markerItem);
}

function updateMarkerInList(markerId, description, isDraft = false) {
    const markerListItem = document.querySelector(`[data-marker-id="${markerId}"]`);
    if (!markerListItem) return;

    const statusClass = isDraft ? 'bg-yellow-500' : 'bg-red-500';
    const statusText = isDraft ? 'Draft' : '';
    
    markerListItem.innerHTML = `
        <div class="flex items-start space-x-2">
            <div class="w-3 h-3 ${statusClass} rounded-full mt-1 flex-shrink-0"></div>
            <div class="flex-1">
                <p class="text-sm font-medium text-gray-700">Marker ${markerId} ${statusText}</p>
                <p class="text-xs text-gray-500">${description}</p>
            </div>
            <button class="text-red-500 hover:text-red-700 text-xs" onclick="deleteMarker(${markerId})">
                <span class="material-icons text-sm">delete</span>
            </button>
        </div>
    `;
}

function deleteMarker(markerId) {
    showConfirmationModal(
        'Hapus Marker',
        `Apakah Anda yakin ingin menghapus Marker ${markerId}?`,
        'Data marker dan semua keterangan terkait akan dihapus permanen.',
        function() {
            // Remove from anatomy image
            const anatomyMarker = document.querySelector(`[data-note="${markerId}"]`);
            if (anatomyMarker) {
                anatomyMarker.remove();
            }
            
            // Remove from marker list
            const markerListItem = document.querySelector(`[data-marker-id="${markerId}"]`);
            if (markerListItem) {
                markerListItem.style.transition = 'all 0.3s ease';
                markerListItem.style.opacity = '0';
                markerListItem.style.transform = 'translateX(-100%)';
                
                setTimeout(() => {
                    markerListItem.remove();
                    showNotification('Marker berhasil dihapus', 'success');
                }, 300);
            }
        }
    );
}

function toggleMarkerNote(marker) {
    const note = marker.querySelector('.marker-note');
    const allNotes = document.querySelectorAll('.marker-note');
    
    // Hide all other notes
    allNotes.forEach(n => n.classList.remove('active'));
    
    // Toggle this note
    if (note) {
        note.classList.add('active');
    }
}

// Modal Functions
function showConfirmationModal(title, message, warning, onConfirm) {
    // Remove existing modal if any
    const existingModal = document.getElementById('confirmation-modal');
    if (existingModal) {
        existingModal.remove();
    }

    // Create modal HTML
    const modal = document.createElement('div');
    modal.id = 'confirmation-modal';
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4 transform transition-all duration-300 scale-95 opacity-0">
            <div class="flex items-center space-x-3 mb-4">
                <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <span class="material-icons text-red-600">warning</span>
                </div>
                <h3 class="text-lg font-semibold text-gray-900">${title}</h3>
            </div>
            
            <div class="mb-4">
                <p class="text-gray-700 mb-2">${message}</p>
                <p class="text-sm text-red-600 bg-red-50 p-2 rounded border-l-4 border-red-400">
                    <span class="material-icons text-sm align-middle mr-1">info</span>
                    ${warning}
                </p>
            </div>
            
            <div class="flex space-x-3 justify-end">
                <button 
                    onclick="closeConfirmationModal()" 
                    class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                    Batal
                </button>
                <button 
                    onclick="confirmDelete()" 
                    class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    Hapus
                </button>
            </div>
        </div>
    `;

    // Store the callback function
    currentConfirmCallback = onConfirm;

    // Add to body
    document.body.appendChild(modal);

    // Animate in
    setTimeout(() => {
        const modalContent = modal.querySelector('div > div');
        if (modalContent) {
            modalContent.classList.remove('scale-95', 'opacity-0');
            modalContent.classList.add('scale-100', 'opacity-100');
        }
    }, 10);

    // Close on background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeConfirmationModal();
        }
    });

    // Close on escape key
    const escapeHandler = function(e) {
        if (e.key === 'Escape') {
            closeConfirmationModal();
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);
}

function closeConfirmationModal() {
    const modal = document.getElementById('confirmation-modal');
    if (modal) {
        const modalContent = modal.querySelector('div > div');
        if (modalContent) {
            modalContent.classList.add('scale-95', 'opacity-0');
            modalContent.classList.remove('scale-100', 'opacity-100');
        }
        
        setTimeout(() => {
            modal.remove();
            currentConfirmCallback = null;
        }, 300);
    }
}

function confirmDelete() {
    if (currentConfirmCallback) {
        currentConfirmCallback();
        closeConfirmationModal();
    }
}

function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existingNotification = document.getElementById('notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.id = 'notification';
    notification.className = 'fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transform transition-all duration-300 translate-x-full';
    
    const colors = {
        success: 'bg-green-500 text-white',
        error: 'bg-red-500 text-white',
        warning: 'bg-yellow-500 text-white',
        info: 'bg-blue-500 text-white'
    };
    
    const icons = {
        success: 'check_circle',
        error: 'error',
        warning: 'warning',
        info: 'info'
    };

    notification.className += ` ${colors[type] || colors.info}`;
    notification.innerHTML = `
        <div class="flex items-center space-x-2">
            <span class="material-icons">${icons[type] || icons.info}</span>
            <span>${message}</span>
        </div>
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 10);

    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Dynamic Table Functions
function addMedication() {
    const tableBody = document.getElementById('medication-list');
    if (!tableBody) return;

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            <input type="text" class="w-full border-0 focus:ring-0" placeholder="Nama obat..." />
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <input type="text" class="w-full border-0 focus:ring-0" placeholder="Dosis..." />
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <input type="text" class="w-full border-0 focus:ring-0" placeholder="Frekuensi..." />
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <select class="w-full border-0 focus:ring-0">
                <option>Oral</option>
                <option>IV</option>
                <option>IM</option>
                <option>SC</option>
                <option>Topikal</option>
            </select>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <input type="date" class="w-full border-0 focus:ring-0" />
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-yellow-600">Draft</td>
        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <a class="text-green-600 hover:text-green-800 mr-2 cursor-pointer" onclick="saveMedication(this)">Simpan</a>
            <a class="text-red-600 hover:text-red-800 cursor-pointer" onclick="deleteMedication(this)">Hapus</a>
        </td>
    `;
    
    tableBody.appendChild(newRow);
}

function addInstruction() {
    const tableBody = document.getElementById('instruction-list');
    if (!tableBody) return;

    const newRow = document.createElement('tr');
    const today = new Date().toLocaleDateString('id-ID');
    
    newRow.innerHTML = `
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${today}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            <select class="w-full border-0 focus:ring-0">
                <option>Medik</option>
                <option>Keperawatan</option>
            </select>
        </td>
        <td class="px-6 py-4 text-sm text-gray-900">
            <textarea class="w-full border-0 focus:ring-0 resize-none" rows="2" placeholder="Masukkan instruksi..."></textarea>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Dr. Alexa</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-yellow-600">Draft</td>
        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <a class="text-green-600 hover:text-green-800 mr-2 cursor-pointer" onclick="saveInstruction(this)">Simpan</a>
            <a class="text-red-600 hover:text-red-800 cursor-pointer" onclick="deleteInstruction(this)">Hapus</a>
        </td>
    `;
    
    tableBody.appendChild(newRow);
}

function addDiagnosis() {
    const tableBody = document.getElementById('diagnosis-list');
    if (!tableBody) return;

    const newRow = document.createElement('tr');
    const today = new Date().toLocaleDateString('id-ID');
    
    newRow.innerHTML = `
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            <select class="w-full border-0 focus:ring-0">
                <option>Primer</option>
                <option>Sekunder</option>
                <option>Komplikasi</option>
            </select>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <input type="text" class="w-full border-0 focus:ring-0" placeholder="Kode ICD-10..." />
        </td>
        <td class="px-6 py-4 text-sm text-gray-900">
            <textarea class="w-full border-0 focus:ring-0 resize-none" rows="2" placeholder="Deskripsi diagnosis..."></textarea>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${today}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-yellow-600">Draft</td>
        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <a class="text-green-600 hover:text-green-800 mr-2 cursor-pointer" onclick="saveDiagnosis(this)">Simpan</a>
            <a class="text-red-600 hover:text-red-800 cursor-pointer" onclick="deleteDiagnosis(this)">Hapus</a>
        </td>
    `;
    
    tableBody.appendChild(newRow);
}

// Save Functions
function saveMedication(element) {
    const row = element.closest('tr');
    if (!row) return;

    const statusCell = row.querySelector('td:nth-child(6)');
    if (statusCell) {
        statusCell.textContent = 'Aktif';
        statusCell.className = 'px-6 py-4 whitespace-nowrap text-sm text-green-600';
    }
    
    // Convert inputs to text
    const inputs = row.querySelectorAll('input, select');
    inputs.forEach(input => {
        const span = document.createElement('span');
        span.textContent = input.value || (input.options && input.options[input.selectedIndex] ? input.options[input.selectedIndex].text : '');
        if (input.parentNode) {
            input.parentNode.replaceChild(span, input);
        }
    });
    
    // Update actions
    const actionsCell = row.querySelector('td:last-child');
    if (actionsCell) {
        actionsCell.innerHTML = `
            <a class="text-custom-blue hover:text-blue-700 mr-2 cursor-pointer">Edit</a>
            <a class="text-red-600 hover:text-red-800 cursor-pointer" onclick="deleteMedication(this)">Hapus</a>
        `;
    }

    showNotification('Obat berhasil disimpan', 'success');
}

function saveInstruction(element) {
    const row = element.closest('tr');
    if (!row) return;

    const statusCell = row.querySelector('td:nth-child(5)');
    if (statusCell) {
        statusCell.textContent = 'Aktif';
        statusCell.className = 'px-6 py-4 whitespace-nowrap text-sm text-green-600';
    }
    
    // Convert inputs to text
    const inputs = row.querySelectorAll('textarea, select');
    inputs.forEach(input => {
        const span = document.createElement('span');
        span.textContent = input.value || (input.options && input.options[input.selectedIndex] ? input.options[input.selectedIndex].text : '');
        if (input.parentNode) {
            input.parentNode.replaceChild(span, input);
        }
    });
    
    // Update actions
    const actionsCell = row.querySelector('td:last-child');
    if (actionsCell) {
        actionsCell.innerHTML = `
            <a class="text-custom-blue hover:text-blue-700 mr-2 cursor-pointer">Edit</a>
            <a class="text-red-600 hover:text-red-800 cursor-pointer" onclick="deleteInstruction(this)">Selesai</a>
        `;
    }

    showNotification('Instruksi berhasil disimpan', 'success');
}

function saveDiagnosis(element) {
    const row = element.closest('tr');
    if (!row) return;

    const statusCell = row.querySelector('td:nth-child(5)');
    if (statusCell) {
        statusCell.textContent = 'Aktif';
        statusCell.className = 'px-6 py-4 whitespace-nowrap text-sm text-green-600';
    }
    
    // Convert inputs to text
    const inputs = row.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        const span = document.createElement('span');
        span.textContent = input.value || (input.options && input.options[input.selectedIndex] ? input.options[input.selectedIndex].text : '');
        if (input.parentNode) {
            input.parentNode.replaceChild(span, input);
        }
    });
    
    // Update actions
    const actionsCell = row.querySelector('td:last-child');
    if (actionsCell) {
        actionsCell.innerHTML = `
            <a class="text-custom-blue hover:text-blue-700 mr-2 cursor-pointer">Edit</a>
            <a class="text-red-600 hover:text-red-800 cursor-pointer" onclick="deleteDiagnosis(this)">Hapus</a>
        `;
    }

    showNotification('Diagnosis berhasil disimpan', 'success');
}

// Delete Functions with Validation
function deleteMedication(element) {
    const row = element.closest('tr');
    if (!row) return;

    const medicationName = row.querySelector('td:first-child').textContent.trim() || 'obat ini';
    
    showConfirmationModal(
        'Hapus Obat',
        `Apakah Anda yakin ingin menghapus "${medicationName}" dari daftar obat?`,
        'Data obat akan dihapus permanen dari riwayat penggunaan obat.',
        function() {
            row.style.transition = 'all 0.3s ease';
            row.style.opacity = '0';
            row.style.transform = 'translateX(-100%)';
            
            setTimeout(() => {
                if (row.parentNode) {
                    row.remove();
                }
                showNotification('Obat berhasil dihapus', 'success');
            }, 300);
        }
    );
}

function deleteInstruction(element) {
    const row = element.closest('tr');
    if (!row) return;

    const instructionText = row.querySelector('td:nth-child(3)').textContent.trim() || 'instruksi ini';
    const instructionType = row.querySelector('td:nth-child(2)').textContent.trim();
    
    showConfirmationModal(
        'Hapus Instruksi',
        `Apakah Anda yakin ingin menghapus instruksi ${instructionType.toLowerCase()}?`,
        `"${instructionText.substring(0, 50)}${instructionText.length > 50 ? '...' : ''}" akan dihapus permanen.`,
        function() {
            row.style.transition = 'all 0.3s ease';
            row.style.opacity = '0';
            row.style.transform = 'translateX(-100%)';
            
            setTimeout(() => {
                if (row.parentNode) {
                    row.remove();
                }
                showNotification('Instruksi berhasil dihapus', 'success');
            }, 300);
        }
    );
}

function deleteDiagnosis(element) {
    const row = element.closest('tr');
    if (!row) return;

    const diagnosisType = row.querySelector('td:first-child').textContent.trim();
    const icdCode = row.querySelector('td:nth-child(2)').textContent.trim();
    const description = row.querySelector('td:nth-child(3)').textContent.trim();
    
    showConfirmationModal(
        'Hapus Diagnosis',
        `Apakah Anda yakin ingin menghapus diagnosis ${diagnosisType.toLowerCase()}?`,
        `Diagnosis "${icdCode} - ${description.substring(0, 40)}${description.length > 40 ? '...' : ''}" akan dihapus permanen.`,
        function() {
            row.style.transition = 'all 0.3s ease';
            row.style.opacity = '0';
            row.style.transform = 'translateX(-100%)';
            
            setTimeout(() => {
                if (row.parentNode) {
                    row.remove();
                }
                showNotification('Diagnosis berhasil dihapus', 'success');
            }, 300);
        }
    );
}

// GCS Score Calculator
function calculateGCS() {
    const eyeSelect = document.querySelector('select[name="gcs_eye"]');
    const verbalSelect = document.querySelector('select[name="gcs_verbal"]');
    const motorSelect = document.querySelector('select[name="gcs_motor"]');
    
    if (eyeSelect && verbalSelect && motorSelect) {
        const total = parseInt(eyeSelect.value || 0) + 
                     parseInt(verbalSelect.value || 0) + 
                     parseInt(motorSelect.value || 0);
        
        console.log('GCS Total:', total);
        
        const gcsDisplay = document.getElementById('gcs-total');
        if (gcsDisplay) {
            gcsDisplay.textContent = `Total: ${total}`;
        }
    }
}

// Form Validation
function validateForm() {
    const requiredFields = document.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('border-red-500');
            isValid = false;
        } else {
            field.classList.remove('border-red-500');
        }
    });
    
    return isValid;
}

// Form Submission
function initializeFormSubmission() {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                const formData = new FormData(form);
                console.log('Form submitted successfully');
                showNotification('Assessment berhasil disimpan!', 'success');
            } else {
                showNotification('Mohon lengkapi semua field yang diperlukan', 'warning');
            }
        });
    }
}

// Auto-save functionality
function autoSave() {
    try {
        const form = document.querySelector('form');
        if (form) {
            const formData = new FormData(form);
            localStorage.setItem('assessment_draft', JSON.stringify(Object.fromEntries(formData)));
            console.log('Auto-saved at', new Date().toLocaleTimeString());
        }
    } catch (error) {
        console.error('Auto-save failed:', error);
    }
}

// Load draft data
function loadDraftData() {
    try {
        const savedDraft = localStorage.getItem('assessment_draft');
        if (savedDraft) {
            const data = JSON.parse(savedDraft);
            Object.keys(data).forEach(key => {
                const field = document.querySelector(`[name="${key}"]`);
                if (field) {
                    field.value = data[key];
                }
            });
        }
    } catch (error) {
        console.error('Failed to load draft data:', error);
    }
}

// Auto-save every 30 seconds
setInterval(autoSave, 30000);