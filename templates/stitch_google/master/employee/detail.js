// ========================================
// DETAIL PAGE TAB FUNCTIONALITY
// ========================================

// Tab functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabNavs = document.querySelectorAll('.tab-nav');
    const tabContents = document.querySelectorAll('.tab-content');

    tabNavs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const targetTab = this.getAttribute('data-tab');

            // Remove active state from all tabs
            tabNavs.forEach(nav => {
                nav.classList.remove('text-custom-blue', 'border-b-2', 'border-custom-blue');
                nav.classList.add('text-gray-500', 'dark:text-gray-400');
            });

            // Add active state to clicked tab
            this.classList.remove('text-gray-500', 'dark:text-gray-400');
            this.classList.add('text-custom-blue', 'border-b-2', 'border-custom-blue');

            // Hide all tab contents
            tabContents.forEach(content => {
                content.classList.add('hidden');
            });

            // Show target tab content
            document.getElementById(targetTab).classList.remove('hidden');
        });
    });
});