// Admin Panel JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize admin panel
    initAdminPanel();
});

/**
 * Initialize admin panel
 */
function initAdminPanel() {
    // Mobile sidebar toggle
    initMobileSidebar();
    
    // Initialize action buttons
    initActionButtons();
    
    // Initialize page-specific functionality
    initPageSpecific();
}

/**
 * Initialize mobile sidebar
 */
function initMobileSidebar() {
    // Create mobile toggle button if it doesn't exist
    if (!document.querySelector('.mobile-toggle')) {
        const header = document.querySelector('.content-header');
        
        if (header) {
            const mobileToggle = document.createElement('button');
            mobileToggle.className = 'mobile-toggle';
            mobileToggle.innerHTML = '☰';
            
            header.insertBefore(mobileToggle, header.firstChild);
            
            // Add event listener
            mobileToggle.addEventListener('click', function() {
                const sidebar = document.querySelector('.sidebar');
                sidebar.classList.toggle('active');
            });
            
            // Close sidebar when clicking outside
            document.addEventListener('click', function(event) {
                const sidebar = document.querySelector('.sidebar');
                const mobileToggle = document.querySelector('.mobile-toggle');
                
                if (sidebar.classList.contains('active') && 
                    !sidebar.contains(event.target) && 
                    !mobileToggle.contains(event.target)) {
                    sidebar.classList.remove('active');
                }
            });
        }
    }
}

/**
 * Initialize action buttons
 */
function initActionButtons() {
    // View buttons
    const viewButtons = document.querySelectorAll('.btn-icon.view');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const id = row.dataset.id;
            
            // Show item details (in a real app, this would open a modal or navigate to a details page)
            console.log('View item with ID:', id);
            alert('Преглед на елемент');
        });
    });
    
    // Edit buttons
    const editButtons = document.querySelectorAll('.btn-icon.edit');
    
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const id = row.dataset.id;
            
            // Edit item (in a real app, this would open a form or navigate to an edit page)
            console.log('Edit item with ID:', id);
            alert('Редактиране на елемент');
        });
    });
    
    // Delete buttons
    const deleteButtons = document.querySelectorAll('.btn-icon.delete');
    
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const id = row.dataset.id;
            
            // Confirm deletion
            if (confirm('Сигурни ли сте, че искате да изтриете този елемент?')) {
                // Delete item (in a real app, this would send a request to the server)
                console.log('Delete item with ID:', id);
                row.remove();
            }
        });
    });
}

/**
 * Initialize page-specific functionality
 */
function initPageSpecific() {
    // Get current page
    const currentPage = window.location.pathname.split('/').pop();
    
    // Dashboard
    if (currentPage === 'index.html' || currentPage === '') {
        // Nothing specific for dashboard yet
    }
    
    // Page Editor
    else if (currentPage === 'page-editor.html') {
        initPageEditor();
    }
    
    // Portfolio Manager
    else if (currentPage === 'portfolio-manager.html') {
        initPortfolioManager();
    }
    
    // Testimonial Manager
    else if (currentPage === 'testimonial-manager.html') {
        initTestimonialManager();
    }
    
    // Inquiry Manager
    else if (currentPage === 'inquiry-manager.html') {
        initInquiryManager();
    }
    
    // Statistics
    else if (currentPage === 'statistics.html') {
        initStatistics();
    }
    
    // UTM Builder
    else if (currentPage === 'utm-builder.html') {
        initUtmBuilder();
    }
}

/**
 * Initialize page editor
 */
function initPageEditor() {
    console.log('Initializing Page Editor');
    // Page editor specific functionality will be implemented here
}

/**
 * Initialize portfolio manager
 */
function initPortfolioManager() {
    console.log('Initializing Portfolio Manager');
    // Portfolio manager specific functionality will be implemented here
}

/**
 * Initialize testimonial manager
 */
function initTestimonialManager() {
    console.log('Initializing Testimonial Manager');
    // Testimonial manager specific functionality will be implemented here
}

/**
 * Initialize inquiry manager
 */
function initInquiryManager() {
    console.log('Initializing Inquiry Manager');
    // Inquiry manager specific functionality will be implemented here
}

/**
 * Initialize statistics
 */
function initStatistics() {
    console.log('Initializing Statistics');
    // Statistics specific functionality will be implemented here
}

/**
 * Initialize UTM builder
 */
function initUtmBuilder() {
    console.log('Initializing UTM Builder');
    
    const utmForm = document.getElementById('utm-form');
    
    if (!utmForm) return;
    
    utmForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const url = document.getElementById('utm-url').value;
        const source = document.getElementById('utm-source').value;
        const medium = document.getElementById('utm-medium').value;
        const campaign = document.getElementById('utm-campaign').value;
        const term = document.getElementById('utm-term').value;
        const content = document.getElementById('utm-content').value;
        
        // Create UTM URL
        let utmUrl = url;
        
        // Add parameters
        utmUrl += (url.includes('?') ? '&' : '?');
        utmUrl += `utm_source=${encodeURIComponent(source)}`;
        utmUrl += `&utm_medium=${encodeURIComponent(medium)}`;
        utmUrl += `&utm_campaign=${encodeURIComponent(campaign)}`;
        
        if (term) {
            utmUrl += `&utm_term=${encodeURIComponent(term)}`;
        }
        
        if (content) {
            utmUrl += `&utm_content=${encodeURIComponent(content)}`;
        }
        
        // Display result
        const resultContainer = document.getElementById('utm-result');
        
        if (resultContainer) {
            resultContainer.innerHTML = `
                <div class="result-url">${utmUrl}</div>
                <button class="btn btn-primary copy-btn" data-url="${utmUrl}">Копирай</button>
            `;
            
            // Add copy functionality
            const copyBtn = resultContainer.querySelector('.copy-btn');
            
            if (copyBtn) {
                copyBtn.addEventListener('click', function() {
                    const url = this.dataset.url;
                    
                    // Copy to clipboard
                    navigator.clipboard.writeText(url)
                        .then(() => {
                            this.textContent = 'Копирано!';
                            
                            // Reset button text after 2 seconds
                            setTimeout(() => {
                                this.textContent = 'Копирай';
                            }, 2000);
                        })
                        .catch(err => {
                            console.error('Failed to copy URL:', err);
                        });
                });
            }
        }
        
        // Save to history (in a real app, this would be saved to a database)
        saveUtmToHistory(utmUrl, source, medium, campaign);
    });
}

/**
 * Save UTM to history
 * @param {string} url - UTM URL
 * @param {string} source - UTM source
 * @param {string} medium - UTM medium
 * @param {string} campaign - UTM campaign
 */
function saveUtmToHistory(url, source, medium, campaign) {
    const historyContainer = document.getElementById('utm-history');
    
    if (!historyContainer) return;
    
    // Create history item
    const historyItem = document.createElement('div');
    historyItem.className = 'history-item';
    historyItem.innerHTML = `
        <div class="history-details">
            <div class="history-campaign">${campaign}</div>
            <div class="history-source">${source} / ${medium}</div>
        </div>
        <div class="history-actions">
            <button class="btn-icon view" data-url="${url}">👁️</button>
            <button class="btn-icon copy" data-url="${url}">📋</button>
        </div>
    `;
    
    // Add to history
    historyContainer.prepend(historyItem);
    
    // Add event listeners
    const viewBtn = historyItem.querySelector('.btn-icon.view');
    const copyBtn = historyItem.querySelector('.btn-icon.copy');
    
    viewBtn.addEventListener('click', function() {
        const url = this.dataset.url;
        
        // Show URL in result container
        const resultContainer = document.getElementById('utm-result');
        
        if (resultContainer) {
            resultContainer.innerHTML = `
                <div class="result-url">${url}</div>
                <button class="btn btn-primary copy-btn" data-url="${url}">Копирай</button>
            `;
            
            // Add copy functionality
            const copyBtn = resultContainer.querySelector('.copy-btn');
            
            if (copyBtn) {
                copyBtn.addEventListener('click', function() {
                    const url = this.dataset.url;
                    
                    // Copy to clipboard
                    navigator.clipboard.writeText(url)
                        .then(() => {
                            this.textContent = 'Копирано!';
                            
                            // Reset button text after 2 seconds
                            setTimeout(() => {
                                this.textContent = 'Копирай';
                            }, 2000);
                        })
                        .catch(err => {
                            console.error('Failed to copy URL:', err);
                        });
                });
            }
        }
    });
    
    copyBtn.addEventListener('click', function() {
        const url = this.dataset.url;
        
        // Copy to clipboard
        navigator.clipboard.writeText(url)
            .then(() => {
                this.textContent = '✓';
                
                // Reset button text after 2 seconds
                setTimeout(() => {
                    this.textContent = '📋';
                }, 2000);
            })
            .catch(err => {
                console.error('Failed to copy URL:', err);
            });
    });
}
