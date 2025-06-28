// Viber Button JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Viber button
    initViberButton();
});

/**
 * Initialize Viber button
 */
function initViberButton() {
    const viberButton = document.querySelector('.viber-button');
    
    if (!viberButton) return;
    
    // Add animation class
    viberButton.classList.add('pulse');
    
    // Add click event
    viberButton.addEventListener('click', function(e) {
        // Check if on mobile device
        if (isMobileDevice()) {
            // Let the default action happen (open Viber app)
            return;
        } else {
            // On desktop, show tooltip with phone number
            e.preventDefault();
            
            const tooltip = viberButton.querySelector('.viber-tooltip');
            
            if (tooltip) {
                tooltip.textContent = 'Viber: 0882 717 158';
                tooltip.classList.add('show');
                
                // Hide tooltip after 3 seconds
                setTimeout(() => {
                    tooltip.classList.remove('show');
                    tooltip.textContent = 'Свържете се с нас чрез Viber';
                }, 3000);
            }
        }
    });
}

/**
 * Check if user is on a mobile device
 * @returns {boolean} True if on mobile device
 */
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
