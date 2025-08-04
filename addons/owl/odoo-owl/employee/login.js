// ========================================
// LOGIN PAGE JAVASCRIPT
// ========================================

// Demo credentials
const DEMO_CREDENTIALS = {
    email: 'admin@mariohospital.com',
    password: 'admin123'
};

// State management
let isLoading = false;
let formValidation = {
    email: false,
    password: false
};

// ========================================
// VALIDATION FUNCTIONS
// ========================================

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    return password && password.length >= 6;
}

function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + 'Error');
    
    field.classList.remove('valid');
    field.classList.add('invalid');
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.remove('hidden');
    }
    
    formValidation[fieldId] = false;
}

function showFieldSuccess(fieldId) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + 'Error');
    
    field.classList.remove('invalid');
    field.classList.add('valid');
    
    if (errorElement) {
        errorElement.classList.add('hidden');
    }
    
    formValidation[fieldId] = true;
}

function clearFieldValidation(fieldId) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + 'Error');
    
    field.classList.remove('valid', 'invalid');
    
    if (errorElement) {
        errorElement.classList.add('hidden');
    }
    
    formValidation[fieldId] = false;
}

// ========================================
// FORM INTERACTION FUNCTIONS
// ========================================

function togglePasswordVisibility() {
    const passwordField = document.getElementById('password');
    const toggleIcon = document.getElementById('passwordToggleIcon');
    
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleIcon.textContent = 'visibility_off';
    } else {
        passwordField.type = 'password';
        toggleIcon.textContent = 'visibility';
    }
    
    // Add click animation
    toggleIcon.style.transform = 'scale(0.8)';
    setTimeout(() => {
        toggleIcon.style.transform = 'scale(1)';
    }, 150);
}

function fillDemoCredentials() {
    const emailField = document.getElementById('email');
    const passwordField = document.getElementById('password');
    
    // Animate filling
    emailField.value = '';
    passwordField.value = '';
    
    // Clear any existing validations
    clearFieldValidation('email');
    clearFieldValidation('password');
    
    // Type animation for email
    typeAnimation(emailField, DEMO_CREDENTIALS.email, 0, () => {
        // Validate email after typing
        if (validateEmail(emailField.value)) {
            showFieldSuccess('email');
        }
        
        // Type animation for password
        setTimeout(() => {
            typeAnimation(passwordField, DEMO_CREDENTIALS.password, 0, () => {
                // Validate password after typing
                if (validatePassword(passwordField.value)) {
                    showFieldSuccess('password');
                }
            });
        }, 500);
    });
}

function typeAnimation(element, text, index, callback) {
    if (index < text.length) {
        element.value += text.charAt(index);
        setTimeout(() => typeAnimation(element, text, index + 1, callback), 100);
    } else if (callback) {
        callback();
    }
}

// ========================================
// FORM SUBMISSION
// ========================================

function handleSubmit(event) {
    event.preventDefault();
    
    if (isLoading) return;
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    
    // Clear any previous validation states
    clearFieldValidation('email');
    clearFieldValidation('password');
    
    // Reset validation
    let isValid = true;
    
    // Validate email - show "required" message only on form submission
    if (!email) {
        showFieldError('email', 'Email address is required');
        isValid = false;
    } else if (!validateEmail(email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    } else {
        showFieldSuccess('email');
    }
    
    // Validate password - show "required" message only on form submission
    if (!password) {
        showFieldError('password', 'Password is required');
        isValid = false;
    } else if (!validatePassword(password)) {
        showFieldError('password', 'Password must be at least 6 characters long');
        isValid = false;
    } else {
        showFieldSuccess('password');
    }
    
    if (!isValid) {
        // Shake the form
        const form = document.getElementById('loginForm');
        form.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            form.style.animation = '';
        }, 500);
        return;
    }
    
    // Show loading state
    setLoadingState(true);
    
    // Simulate API call
    setTimeout(() => {
        authenticateUser(email, password);
    }, 2000);
}

function authenticateUser(email, password) {
    // Check demo credentials
    if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
        // Success
        setLoadingState(false);
        showSuccessModal();
        
        // Store login state (in real app, this would be handled by backend)
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('loginTime', new Date().toISOString());
    } else {
        // Failed authentication
        setLoadingState(false);
        
        // Clear any existing validation states
        clearFieldValidation('email');
        clearFieldValidation('password');
        
        // Show authentication error on password field
        showFieldError('password', 'Invalid email or password');
        
        // Shake the form
        const form = document.getElementById('loginForm');
        form.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            form.style.animation = '';
        }, 500);
    }
}

function setLoadingState(loading) {
    isLoading = loading;
    const loginButton = document.getElementById('loginButton');
    const loginButtonText = document.getElementById('loginButtonText');
    const loginSpinner = document.getElementById('loginSpinner');
    const form = document.getElementById('loginForm');
    
    if (loading) {
        loginButton.disabled = true;
        loginButtonText.textContent = 'Signing In...';
        loginSpinner.classList.remove('hidden');
        form.classList.add('loading');
        loginButton.classList.add('opacity-75', 'cursor-not-allowed');
    } else {
        loginButton.disabled = false;
        loginButtonText.textContent = 'Sign In';
        loginSpinner.classList.add('hidden');
        form.classList.remove('loading');
        loginButton.classList.remove('opacity-75', 'cursor-not-allowed');
    }
}

// ========================================
// SUCCESS MODAL FUNCTIONS
// ========================================

function showSuccessModal() {
    const modal = document.getElementById('successModal');
    const modalContent = document.getElementById('successModalContent');
    
    modal.classList.remove('hidden');
    modal.classList.add('show');
    
    // Animate modal content
    setTimeout(() => {
        modalContent.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    }, 50);
    
    // Auto redirect after 3 seconds
    setTimeout(() => {
        redirectToDashboard();
    }, 3000);
}

function hideSuccessModal() {
    const modal = document.getElementById('successModal');
    const modalContent = document.getElementById('successModalContent');
    
    modalContent.style.opacity = '0';
    modalContent.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        modal.classList.add('hidden');
        modal.classList.remove('show');
    }, 300);
}

function redirectToDashboard() {
    // Add page transition effect
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-out';
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 500);
}

// ========================================
// REAL-TIME VALIDATION
// ========================================

function setupRealTimeValidation() {
    const emailField = document.getElementById('email');
    const passwordField = document.getElementById('password');
    
    // Email validation - only show success or format error during typing
    emailField.addEventListener('input', function() {
        const email = this.value.trim();
        
        // Clear any "required" error message when user starts typing
        const errorElement = document.getElementById('emailError');
        if (errorElement && errorElement.textContent === 'Email address is required') {
            clearFieldValidation('email');
        }
        
        if (email === '') {
            // Don't show any validation while empty during typing
            if (!errorElement || errorElement.textContent !== 'Email address is required') {
                clearFieldValidation('email');
            }
        } else if (validateEmail(email)) {
            showFieldSuccess('email');
        } else if (email.length > 0) {
            showFieldError('email', 'Please enter a valid email address');
        }
    });
    
    // Remove blur validation for email - no "required" message on blur
    emailField.addEventListener('blur', function() {
        const email = this.value.trim();
        // Only show format error if user has typed something invalid
        if (email.length > 0 && !validateEmail(email)) {
            showFieldError('email', 'Please enter a valid email address');
        } else if (email === '') {
            // Don't show required message on blur, only on form submission
            const errorElement = document.getElementById('emailError');
            if (errorElement && errorElement.textContent !== 'Email address is required') {
                clearFieldValidation('email');
            }
        }
    });
    
    // Password validation - only show success or length error during typing
    passwordField.addEventListener('input', function() {
        const password = this.value;
        
        // Clear any "required" error message when user starts typing
        const errorElement = document.getElementById('passwordError');
        if (errorElement && (errorElement.textContent === 'Password is required' || errorElement.textContent === 'Invalid email or password')) {
            clearFieldValidation('password');
        }
        
        if (password === '') {
            // Don't show any validation while empty during typing
            if (!errorElement || (errorElement.textContent !== 'Password is required' && errorElement.textContent !== 'Invalid email or password')) {
                clearFieldValidation('password');
            }
        } else if (validatePassword(password)) {
            showFieldSuccess('password');
        } else if (password.length > 0) {
            showFieldError('password', 'Password must be at least 6 characters long');
        }
    });
    
    // Remove blur validation for password - no "required" message on blur
    passwordField.addEventListener('blur', function() {
        const password = this.value;
        // Only show length error if user has typed something too short
        if (password.length > 0 && !validatePassword(password)) {
            showFieldError('password', 'Password must be at least 6 characters long');
        } else if (password === '') {
            // Don't show required message on blur, only on form submission
            const errorElement = document.getElementById('passwordError');
            if (errorElement && errorElement.textContent !== 'Password is required' && errorElement.textContent !== 'Invalid email or password') {
                clearFieldValidation('password');
            }
        }
    });
}

// ========================================
// KEYBOARD SHORTCUTS
// ========================================

function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(event) {
        // Enter key submits form
        if (event.key === 'Enter' && !isLoading) {
            const form = document.getElementById('loginForm');
            if (document.activeElement && form.contains(document.activeElement)) {
                handleSubmit(event);
            }
        }
        
        // Escape key closes modal
        if (event.key === 'Escape') {
            const modal = document.getElementById('successModal');
            if (!modal.classList.contains('hidden')) {
                hideSuccessModal();
            }
        }
        
        // Ctrl/Cmd + D fills demo credentials
        if ((event.ctrlKey || event.metaKey) && event.key === 'd') {
            event.preventDefault();
            fillDemoCredentials();
        }
    });
}

// ========================================
// SECURITY FUNCTIONS
// ========================================

function checkExistingSession() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const loginTime = localStorage.getItem('loginTime');
    
    if (isLoggedIn === 'true' && loginTime) {
        const loginDate = new Date(loginTime);
        const now = new Date();
        const hoursSinceLogin = (now - loginDate) / (1000 * 60 * 60);
        
        // Auto-logout after 24 hours
        if (hoursSinceLogin < 24) {
            // User is still logged in, redirect to dashboard
            showSuccessModal();
            return true;
        } else {
            // Session expired, clear storage
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('loginTime');
        }
    }
    
    return false;
}

function preventBruteForce() {
    const attempts = localStorage.getItem('loginAttempts') || 0;
    const lastAttempt = localStorage.getItem('lastLoginAttempt');
    
    if (attempts >= 5) {
        const now = new Date();
        const lastAttemptDate = new Date(lastAttempt);
        const minutesSinceLastAttempt = (now - lastAttemptDate) / (1000 * 60);
        
        if (minutesSinceLastAttempt < 15) {
            const remainingTime = Math.ceil(15 - minutesSinceLastAttempt);
            showFieldError('password', `Too many failed attempts. Try again in ${remainingTime} minutes.`);
            return false;
        } else {
            // Reset attempts after 15 minutes
            localStorage.removeItem('loginAttempts');
            localStorage.removeItem('lastLoginAttempt');
        }
    }
    
    return true;
}

function recordFailedAttempt() {
    const attempts = parseInt(localStorage.getItem('loginAttempts') || 0) + 1;
    localStorage.setItem('loginAttempts', attempts.toString());
    localStorage.setItem('lastLoginAttempt', new Date().toISOString());
}

// ========================================
// ACCESSIBILITY FUNCTIONS
// ========================================

function setupAccessibility() {
    // Add ARIA labels and descriptions
    const emailField = document.getElementById('email');
    const passwordField = document.getElementById('password');
    
    emailField.setAttribute('aria-describedby', 'emailError');
    passwordField.setAttribute('aria-describedby', 'passwordError');
    
    // Announce validation messages to screen readers
    const originalShowFieldError = showFieldError;
    showFieldError = function(fieldId, message) {
        originalShowFieldError(fieldId, message);
        announceToScreenReader(`Error: ${message}`);
    };
    
    const originalShowFieldSuccess = showFieldSuccess;
    showFieldSuccess = function(fieldId) {
        originalShowFieldSuccess(fieldId);
        announceToScreenReader(`${fieldId} is valid`);
    };
}

function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize dark mode
    initDarkMode();
    
    // Check if user is already logged in
    if (checkExistingSession()) {
        return;
    }
    
    // Setup form handling
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', handleSubmit);
    
    // Setup real-time validation
    setupRealTimeValidation();
    
    // Setup keyboard shortcuts
    setupKeyboardShortcuts();
    
    // Setup accessibility
    setupAccessibility();
    
    // Focus on email field
    const emailField = document.getElementById('email');
    setTimeout(() => {
        emailField.focus();
    }, 100);
    
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Preload dashboard assets for faster transition
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = 'index.html';
    document.head.appendChild(link);
});

// ========================================
// UTILITY FUNCTIONS
// ========================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300 ${
        type === 'success' ? 'bg-green-500 text-white' :
        type === 'error' ? 'bg-red-500 text-white' :
        'bg-blue-500 text-white'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(full)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Enhanced form submission with brute force protection
const originalHandleSubmit = handleSubmit;
handleSubmit = function(event) {
    event.preventDefault();
    
    if (!preventBruteForce()) {
        return;
    }
    
    // Store original authenticate function
    const originalAuthenticate = authenticateUser;
    authenticateUser = function(email, password) {
        if (email !== DEMO_CREDENTIALS.email || password !== DEMO_CREDENTIALS.password) {
            recordFailedAttempt();
        } else {
            // Clear failed attempts on successful login
            localStorage.removeItem('loginAttempts');
            localStorage.removeItem('lastLoginAttempt');
        }
        originalAuthenticate(email, password);
    };
    
    originalHandleSubmit(event);
};