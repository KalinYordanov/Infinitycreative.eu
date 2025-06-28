// Before-After Slider JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all before-after sliders
    initBeforeAfterSliders();
});

/**
 * Initialize all before-after sliders on the page
 */
function initBeforeAfterSliders() {
    const sliders = document.querySelectorAll('.before-after-slider');
    
    if (sliders.length === 0) return;
    
    sliders.forEach(slider => {
        initBeforeAfterSlider(slider);
    });
}

/**
 * Initialize a single before-after slider
 * @param {HTMLElement} slider - The slider element
 */
function initBeforeAfterSlider(slider) {
    const sliderHandle = slider.querySelector('.slider-handle');
    const beforeImage = slider.querySelector('.before-image');
    
    if (!sliderHandle || !beforeImage) return;
    
    // Set initial position
    let sliderPosition = 50;
    updateSliderPosition(sliderPosition);
    
    // Mouse events
    sliderHandle.addEventListener('mousedown', startDrag);
    
    // Touch events for mobile
    sliderHandle.addEventListener('touchstart', startDrag, { passive: true });
    
    /**
     * Start dragging the slider handle
     * @param {Event} e - The event object
     */
    function startDrag(e) {
        e.preventDefault();
        
        // Add event listeners for drag and end
        document.addEventListener('mousemove', drag);
        document.addEventListener('touchmove', drag, { passive: true });
        document.addEventListener('mouseup', endDrag);
        document.addEventListener('touchend', endDrag);
        
        // Add active class to slider
        slider.classList.add('active');
    }
    
    /**
     * Drag the slider handle
     * @param {Event} e - The event object
     */
    function drag(e) {
        // Get mouse or touch position
        let clientX;
        
        if (e.type === 'touchmove') {
            clientX = e.touches[0].clientX;
        } else {
            clientX = e.clientX;
        }
        
        // Calculate slider position
        const sliderRect = slider.getBoundingClientRect();
        const sliderWidth = sliderRect.width;
        const sliderLeft = sliderRect.left;
        
        // Calculate position as percentage
        let newPosition = ((clientX - sliderLeft) / sliderWidth) * 100;
        
        // Limit position to 0-100%
        newPosition = Math.max(0, Math.min(100, newPosition));
        
        // Update slider position
        updateSliderPosition(newPosition);
    }
    
    /**
     * End dragging the slider handle
     */
    function endDrag() {
        // Remove event listeners
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('touchmove', drag);
        document.removeEventListener('mouseup', endDrag);
        document.removeEventListener('touchend', endDrag);
        
        // Remove active class from slider
        slider.classList.remove('active');
    }
    
    /**
     * Update the slider position
     * @param {number} position - The position as percentage (0-100)
     */
    function updateSliderPosition(position) {
        sliderPosition = position;
        sliderHandle.style.left = `${position}%`;
        beforeImage.style.width = `${position}%`;
    }
}


