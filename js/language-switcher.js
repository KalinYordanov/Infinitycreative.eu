// Language Switcher JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize language switcher
    initLanguageSwitcher();
});

/**
 * Initialize language switcher
 */
function initLanguageSwitcher() {
    // Get language switcher elements
    const languageSwitcher = document.getElementById('language-switcher');
    
    if (!languageSwitcher) return;
    
    const languageLinks = languageSwitcher.querySelectorAll('a[data-lang]');
    const languageBtn = languageSwitcher.querySelector('.language-btn');
    
    // Get current language from localStorage or default to 'bg'
    const currentLang = localStorage.getItem('language') || 'bg';
    
    // Update language button text
    if (languageBtn) {
        languageBtn.textContent = currentLang.toUpperCase();
    }
    
    // Mark current language as active
    languageLinks.forEach(link => {
        if (link.dataset.lang === currentLang) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
        
        // Add click event to language links
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const lang = this.dataset.lang;
            
            // Save selected language to localStorage
            localStorage.setItem('language', lang);
            
            // Reload page with new language
            window.location.reload();
        });
    });
    
    // Do the same for mobile language switcher
    const mobileLangSwitcher = document.querySelector('.mobile-language-switcher');
    
    if (mobileLangSwitcher) {
        const mobileLangLinks = mobileLangSwitcher.querySelectorAll('a[data-lang]');
        
        mobileLangLinks.forEach(link => {
            if (link.dataset.lang === currentLang) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
            
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const lang = this.dataset.lang;
                localStorage.setItem('language', lang);
                window.location.reload();
            });
        });
    }
    
    // Load translations
    loadTranslations(currentLang);
}

/**
 * Load translations for the current language
 * @param {string} lang - Language code
 */
function loadTranslations(lang) {
    // Determine the correct path based on the current page location
    let basePath = '';
    
    // Check if we're in a subdirectory
    if (window.location.pathname.includes('/services/') || 
        window.location.pathname.includes('/admin/')) {
        basePath = '../';
    }
    
    fetch(`${basePath}locales/${lang}/translation.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(translations => {
            // Store translations in global variable
            window.translations = translations;
            
            // Apply translations to the page
            applyTranslations(translations);
        })
        .catch(error => {
            console.error('Error loading translations:', error);
        });
}

/**
 * Apply translations to the page
 * @param {Object} translations - Translations object
 */
function applyTranslations(translations) {
    // Get all elements with data-i18n attribute
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = getNestedTranslation(translations, key);
        
        if (translation) {
            // Check if element has placeholder attribute
            if (element.hasAttribute('placeholder')) {
                element.setAttribute('placeholder', translation);
            } else {
                element.textContent = translation;
            }
        }
    });
}

/**
 * Get nested translation from object using dot notation
 * @param {Object} obj - Translations object
 * @param {string} path - Path to translation using dot notation
 * @returns {string|null} Translation or null if not found
 */
function getNestedTranslation(obj, path) {
    const keys = path.split('.');
    let result = obj;
    
    for (const key of keys) {
        if (result && typeof result === 'object' && key in result) {
            result = result[key];
        } else {
            return null;
        }
    }
    
    return result;
}

/**
 * Translate text using the global translations object
 * @param {string} key - Translation key using dot notation
 * @returns {string} Translated text or the key if translation not found
 */
function translate(key) {
    if (!window.translations) return key;
    
    const translation = getNestedTranslation(window.translations, key);
    return translation || key;
}
