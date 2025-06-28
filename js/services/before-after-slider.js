// Before-After Slider JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize before-after sliders
    initBeforeAfterSliders();
});

/**
 * Initialize before-after sliders
 */
function initBeforeAfterSliders() {
    const sliders = document.querySelectorAll('.before-after-slider');
    
    if (sliders.length === 0) return;
    
    sliders.forEach(slider => {
        createBeforeAfterSlider(slider);
    });
}

/**
 * Create before-after slider
 * @param {HTMLElement} container - Container for the slider
 */
function createBeforeAfterSlider(container) {
    // Create slider elements if they don't exist
    if (!container.querySelector('.slider-before') || !container.querySelector('.slider-after')) {
        // Get before and after image URLs from data attributes
        const beforeImageUrl = container.getAttribute('data-before-image');
        const afterImageUrl = container.getAttribute('data-after-image');
        
        if (!beforeImageUrl || !afterImageUrl) {
            console.error('Before and after image URLs are required');
            return;
        }
        
        // Create slider HTML
        container.innerHTML = `
            <div class="slider-wrapper">
                <div class="slider-before">
                    <img src="${beforeImageUrl}" alt="Before">
                    <div class="slider-label">Преди</div>
                </div>
                <div class="slider-after">
                    <img src="${afterImageUrl}" alt="After">
                    <div class="slider-label">След</div>
                </div>
                <div class="slider-handle">
                    <div class="slider-handle-line"></div>
                    <div class="slider-handle-circle">
                        <div class="slider-handle-arrows">
                            <span class="arrow-left">◀</span>
                            <span class="arrow-right">▶</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Get slider elements
    const wrapper = container.querySelector('.slider-wrapper');
    const beforeDiv = container.querySelector('.slider-before');
    const handle = container.querySelector('.slider-handle');
    
    if (!wrapper || !beforeDiv || !handle) return;
    
    // Set initial position (50%)
    beforeDiv.style.width = '50%';
    handle.style.left = '50%';
    
    // Variables for drag functionality
    let isDragging = false;
    
    // Mouse events
    handle.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', endDrag);
    
    // Touch events
    handle.addEventListener('touchstart', startDrag);
    document.addEventListener('touchmove', drag);
    document.addEventListener('touchend', endDrag);
    
    // Click/tap on slider
    wrapper.addEventListener('click', jumpToPosition);
    
    /**
     * Start dragging
     * @param {Event} e - Mouse or touch event
     */
    function startDrag(e) {
        e.preventDefault();
        isDragging = true;
    }
    
    /**
     * Drag handle
     * @param {Event} e - Mouse or touch event
     */
    function drag(e) {
        if (!isDragging) return;
        
        e.preventDefault();
        
        // Get cursor position
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        
        if (!clientX) return;
        
        // Get slider dimensions
        const rect = wrapper.getBoundingClientRect();
        const sliderWidth = rect.width;
        const sliderLeft = rect.left;
        
        // Calculate position (0-100%)
        let position = ((clientX - sliderLeft) / sliderWidth) * 100;
        
        // Limit position to 0-100%
        position = Math.max(0, Math.min(100, position));
        
        // Update slider
        updateSliderPosition(position);
    }
    
    /**
     * End dragging
     */
    function endDrag() {
        isDragging = false;
    }
    
    /**
     * Jump to position on click/tap
     * @param {Event} e - Mouse or touch event
     */
    function jumpToPosition(e) {
        // Ignore if clicked on handle
        if (e.target === handle || handle.contains(e.target)) return;
        
        // Get cursor position
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        
        if (!clientX) return;
        
        // Get slider dimensions
        const rect = wrapper.getBoundingClientRect();
        const sliderWidth = rect.width;
        const sliderLeft = rect.left;
        
        // Calculate position (0-100%)
        let position = ((clientX - sliderLeft) / sliderWidth) * 100;
        
        // Limit position to 0-100%
        position = Math.max(0, Math.min(100, position));
        
        // Update slider
        updateSliderPosition(position);
    }
    
    /**
     * Update slider position
     * @param {number} position - Position (0-100%)
     */
    function updateSliderPosition(position) {
        beforeDiv.style.width = `${position}%`;
        handle.style.left = `${position}%`;
    }
}
