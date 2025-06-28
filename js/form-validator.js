// Form Validator JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize form validation
    initFormValidation();
});

/**
 * Initialize form validation
 */
function initFormValidation() {
    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        validateForm(contactForm);
    }
    
    // Request project form
    const requestForm = document.getElementById('request-project-form');
    if (requestForm) {
        validateForm(requestForm);
        
        // Check for URL parameters to pre-select service
        const urlParams = new URLSearchParams(window.location.search);
        const serviceParam = urlParams.get('service');
        
        if (serviceParam) {
            const serviceSelect = requestForm.querySelector('#service-type');
            if (serviceSelect) {
                // Find option with matching value
                const options = Array.from(serviceSelect.options);
                const matchingOption = options.find(option => option.value === serviceParam);
                
                if (matchingOption) {
                    matchingOption.selected = true;
                }
            }
        }
    }
    
    // Digital start form
    const digitalStartForm = document.getElementById('digital-start-form');
    if (digitalStartForm) {
        validateForm(digitalStartForm);
    }
}

/**
 * Validate form
 * @param {HTMLFormElement} form - Form to validate
 */
function validateForm(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset previous error messages
        const errorMessages = form.querySelectorAll('.error-message');
        errorMessages.forEach(message => message.remove());
        
        // Reset error styles
        const formInputs = form.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.classList.remove('error');
        });
        
        // Validate required fields
        let isValid = true;
        
        formInputs.forEach(input => {
            if (input.hasAttribute('required') && !validateInput(input)) {
                isValid = false;
                showError(input, 'Това поле е задължително');
            }
            
            // Validate email
            if (input.type === 'email' && input.value.trim() !== '' && !validateEmail(input.value)) {
                isValid = false;
                showError(input, 'Моля, въведете валиден имейл адрес');
            }
            
            // Validate phone
            if (input.type === 'tel' && input.value.trim() !== '' && !validatePhone(input.value)) {
                isValid = false;
                showError(input, 'Моля, въведете валиден телефонен номер');
            }
            
            // Validate URL
            if (input.type === 'url' && input.value.trim() !== '' && !validateUrl(input.value)) {
                isValid = false;
                showError(input, 'Моля, въведете валиден URL адрес');
            }
        });
        
        if (isValid) {
            // Show success message
            showSuccessMessage(form);
            
            // Reset form after successful submission
            form.reset();
            
            // In a real application, you would submit the form data to the server here
            // For now, we'll just simulate a successful submission
            console.log('Form submitted successfully');
        }
    });
    
    // Live validation on input
    const formInputs = form.querySelectorAll('input, select, textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            // Remove previous error message
            const errorMessage = input.parentNode.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.remove();
            }
            
            // Reset error style
            input.classList.remove('error');
            
            // Validate required field
            if (input.hasAttribute('required') && !validateInput(input)) {
                showError(input, 'Това поле е задължително');
            }
            
            // Validate email
            if (input.type === 'email' && input.value.trim() !== '' && !validateEmail(input.value)) {
                showError(input, 'Моля, въведете валиден имейл адрес');
            }
            
            // Validate phone
            if (input.type === 'tel' && input.value.trim() !== '' && !validatePhone(input.value)) {
                showError(input, 'Моля, въведете валиден телефонен номер');
            }
            
            // Validate URL
            if (input.type === 'url' && input.value.trim() !== '' && !validateUrl(input.value)) {
                showError(input, 'Моля, въведете валиден URL адрес');
            }
        });
    });
}

/**
 * Validate input
 * @param {HTMLInputElement} input - Input to validate
 * @returns {boolean} True if input is valid
 */
function validateInput(input) {
    if (input.type === 'checkbox') {
        return input.checked;
    }
    
    return input.value.trim() !== '';
}

/**
 * Validate email
 * @param {string} email - Email to validate
 * @returns {boolean} True if email is valid
 */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Validate phone
 * @param {string} phone - Phone to validate
 * @returns {boolean} True if phone is valid
 */
function validatePhone(phone) {
    // Allow digits, spaces, and the following characters: + - . ( )
    const re = /^[0-9\s\+\-\.\(\)]{7,20}$/;
    return re.test(phone);
}

/**
 * Validate URL
 * @param {string} url - URL to validate
 * @returns {boolean} True if URL is valid
 */
function validateUrl(url) {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * Show error message
 * @param {HTMLInputElement} input - Input with error
 * @param {string} message - Error message
 */
function showError(input, message) {
    input.classList.add('error');
    
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    
    input.parentNode.appendChild(errorMessage);
}

/**
 * Show success message
 * @param {HTMLFormElement} form - Form with successful submission
 */
function showSuccessMessage(form) {
    // Create success message element
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Формата е изпратена успешно! Ще се свържем с вас скоро.';
    
    // Add success message to form
    form.appendChild(successMessage);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}
