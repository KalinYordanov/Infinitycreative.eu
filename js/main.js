// Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    // Зареждане на компонентите
    Promise.all([
        loadComponentAsync('header', '#header'),
        loadComponentAsync('footer', '#footer'),
        loadComponentAsync('viber-button', '#viber-button')
    ]).then(() => {
        console.log('All components loaded');

        // Инициализиране на функционалностите след зареждане на компонентите
        initMobileMenu();
        initDropdowns();
        initLanguageSwitcher();
        initScrollAnimations();
        setActiveNavLink();
        initHeaderScroll();

        // Инициализиране на частиците, ако библиотеката е заредена
        if (typeof initParticles === 'function') {
            initParticles();
        }
    }).catch(error => {
        console.error('Error loading components:', error);
    });
});

/**
 * Load HTML component asynchronously
 * @param {string} componentName - Name of the component
 * @param {string} targetSelector - CSS selector for the target element
 * @returns {Promise} - Promise that resolves when the component is loaded
 */
function loadComponentAsync(componentName, targetSelector) {
    return new Promise((resolve, reject) => {
        const targetElement = document.querySelector(targetSelector);

        if (!targetElement) {
            reject(`Target element ${targetSelector} not found`);
            return;
        }

        // Determine the correct path based on the current page location
        let basePath = '';

        // Check if we're in a subdirectory
        if (window.location.pathname.includes('/services/') ||
            window.location.pathname.includes('/admin/')) {
            basePath = '../';
        }

        fetch(`${basePath}components/${componentName}.html`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                targetElement.innerHTML = html;
                console.log(`Component ${componentName} loaded`);

                // Инициализиране на компонента, ако е необходимо
                if (componentName === 'header') {
                    // Не инициализираме тук, за да избегнем дублиране
                    // Инициализацията ще се извърши след зареждане на всички компоненти
                }

                resolve(componentName);
            })
            .catch(error => {
                console.error(`Error loading component ${componentName}:`, error);
                reject(error);
            });
    });
}

/**
 * Load HTML component (legacy version)
 * @param {string} componentName - Name of the component
 * @param {string} targetSelector - CSS selector for the target element
 */
function loadComponent(componentName, targetSelector) {
    const targetElement = document.querySelector(targetSelector);

    if (!targetElement) {
        console.error(`Target element ${targetSelector} not found`);
        return;
    }

    // Determine the correct path based on the current page location
    let basePath = '';

    // Check if we're in a subdirectory
    if (window.location.pathname.includes('/services/') ||
        window.location.pathname.includes('/admin/')) {
        basePath = '../';
    }

    fetch(`${basePath}components/${componentName}.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            targetElement.innerHTML = html;

            // After loading the component, initialize its functionality
            if (componentName === 'header') {
                initMobileMenu();
                initDropdowns();
                initLanguageSwitcher();
                setActiveNavLink();
            }
        })
        .catch(error => {
            console.error(`Error loading component ${componentName}:`, error);
        });
}

/**
 * Инициализира мобилното меню
 */
function initMobileMenu() {
    console.log('Initializing mobile menu...');

    // Изчакваме малко, за да сме сигурни, че DOM е напълно зареден
    setTimeout(() => {
        const hamburgerButton = document.getElementById('hamburger-button');
        const mobileCloseButton = document.getElementById('mobile-close');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
        const mobileCta = document.querySelector('.mobile-cta');

        if (!hamburgerButton) {
            console.error('Hamburger button not found!');
            return;
        }

        if (!mobileMenu) {
            console.error('Mobile menu not found!');
            return;
        }

        console.log('Mobile menu elements found, initializing...');

        // Функция за отваряне на мобилното меню
        function openMobileMenu() {
            console.log('Opening mobile menu');
            mobileMenu.classList.add('active');
            hamburgerButton.classList.add('active');
            document.body.style.overflow = 'hidden'; // Предотвратяваме скролване на страницата
        }

        // Функция за затваряне на мобилното меню
        function closeMobileMenu() {
            console.log('Closing mobile menu');
            mobileMenu.classList.remove('active');
            hamburgerButton.classList.remove('active');
            document.body.style.overflow = ''; // Възстановяваме скролването
        }

        // Добавяне на event listener за отваряне на менюто
        hamburgerButton.addEventListener('click', function(e) {
            console.log('Hamburger button clicked');
            e.preventDefault();
            openMobileMenu();
        });

        // Добавяне на event listener за затваряне на менюто
        if (mobileCloseButton) {
            mobileCloseButton.addEventListener('click', function(e) {
                console.log('Mobile close button clicked');
                e.preventDefault();
                closeMobileMenu();
            });
        }

        // Добавяме event listener за затваряне на менюто при клик върху линковете в него
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                console.log('Mobile menu link clicked, closing menu...');
                closeMobileMenu();
            });
        });

        // Добавяме event listener за затваряне на менюто при клик върху CTA бутона
        if (mobileCta) {
            mobileCta.addEventListener('click', function() {
                console.log('Mobile CTA clicked, closing menu...');
                closeMobileMenu();
            });
        }

        // Добавяме media query listener за затваряне на мобилното меню при преминаване към десктоп
        const mediaQuery = window.matchMedia('(min-width: 992px)');

        function handleScreenChange(e) {
            if (e.matches) {
                // Ако екранът е станал по-голям от 992px, затваряме мобилното меню
                closeMobileMenu();
            }
        }

        // Добавяме listener за промяна на размера на екрана
        mediaQuery.addEventListener('change', handleScreenChange);

        // Добавяме активен клас към текущата страница
        setActiveNavLink();

        console.log('Mobile menu initialized successfully');
    }, 100);
}

/**
 * Инициализира dropdown менютата в мобилното меню
 */
function initMobileDropdowns() {
    const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');

    if (mobileDropdownToggles.length === 0) {
        console.warn('No mobile dropdown toggles found');
        return;
    }

    console.log(`Found ${mobileDropdownToggles.length} mobile dropdown toggles`);

    // Директно добавяме event listeners без клониране на елементите
    mobileDropdownToggles.forEach(toggle => {
        // Премахваме съществуващите event listeners
        toggle.removeEventListener('click', toggleMobileDropdown);

        // Добавяме нов event listener
        toggle.addEventListener('click', toggleMobileDropdown);
    });

    // Функция за превключване на мобилните dropdown менюта
    function toggleMobileDropdown(e) {
        console.log(`Mobile dropdown toggle clicked`);
        e.preventDefault();
        e.stopPropagation();

        const parent = this.closest('.mobile-dropdown');
        if (parent) {
            parent.classList.toggle('active');

            // Иконата се променя чрез CSS (rotate)
        }
    }
}

/**
 * Initialize dropdown menus
 */
function initDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');

        if (!toggle || !menu) return;

        // За всички устройства, не само за тъч устройства
        toggle.addEventListener('click', function(e) {
            e.preventDefault();

            // Затваряме всички други dropdown менюта
            dropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('active');
                }
            });

            dropdown.classList.toggle('active');

            // Затваряме dropdown при клик извън него
            const closeDropdown = function(event) {
                if (!dropdown.contains(event.target)) {
                    dropdown.classList.remove('active');
                    document.removeEventListener('click', closeDropdown);
                }
            };

            document.addEventListener('click', closeDropdown);
        });
    });
}

/**
 * Initialize language switcher
 */
function initLanguageSwitcher() {
    // Десктоп езиков превключвател
    const langSwitcher = document.getElementById('language-switcher');
    if (langSwitcher) {
        const langButtons = langSwitcher.querySelectorAll('.lang-button');

        // Вземаме текущия език от localStorage или използваме 'bg' по подразбиране
        const currentLang = localStorage.getItem('language') || 'bg';

        // Маркираме текущия език като активен
        langButtons.forEach(button => {
            if (button.dataset.lang === currentLang) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }

            // Добавяме събитие при клик
            button.addEventListener('click', function() {
                const lang = this.dataset.lang;

                // Запазваме избрания език в localStorage
                localStorage.setItem('language', lang);

                // Презареждаме страницата с новия език
                window.location.reload();
            });
        });
    }

    // Мобилен езиков превключвател
    const mobileLangSwitcher = document.querySelector('.mobile-lang-switcher');
    if (mobileLangSwitcher) {
        const mobileLangButtons = mobileLangSwitcher.querySelectorAll('.mobile-lang-button');

        // Вземаме текущия език от localStorage или използваме 'bg' по подразбиране
        const currentLang = localStorage.getItem('language') || 'bg';

        // Маркираме текущия език като активен
        mobileLangButtons.forEach(button => {
            if (button.dataset.lang === currentLang) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }

            // Добавяме събитие при клик
            button.addEventListener('click', function() {
                const lang = this.dataset.lang;

                // Запазваме избрания език в localStorage
                localStorage.setItem('language', lang);

                // Презареждаме страницата с новия език
                window.location.reload();
            });
        });
    }
}

/**
 * Initialize scroll animations
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if (animatedElements.length === 0) return;

    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        // Намаляваме прага за по-ранно активиране на анимациите
        const threshold = 0.85;

        return (
            rect.top <= viewportHeight * threshold &&
            rect.bottom >= 0
        );
    }

    // Check elements on scroll
    function checkElements() {
        animatedElements.forEach(element => {
            if (isInViewport(element) && !element.classList.contains('visible')) {
                // Изчисляваме забавянето от transition-delay стила и добавяме клас за видимост със забавяне
                const delay = parseFloat(element.style.transitionDelay || '0s') * 1000 || 50;

                setTimeout(() => {
                    element.classList.add('visible');

                    // Добавяме клас за завършена анимация след приключване на анимацията
                    const transitionDuration = getComputedStyle(element).transitionDuration;
                    const duration = parseFloat(transitionDuration) * 1000 || 600;

                    setTimeout(() => {
                        element.classList.add('animation-completed');
                    }, duration);
                }, delay);
            }
        });
    }

    // Initial check with slight delay to ensure DOM is fully loaded
    setTimeout(checkElements, 100);

    // Check on scroll with throttling for better performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                checkElements();
                scrollTimeout = null;
            }, 10);
        }
    });

    // Also check on window resize
    window.addEventListener('resize', checkElements);
}

/**
 * Set active navigation link based on current page
 */
function setActiveNavLink() {
    const currentPath = window.location.pathname;

    // Получаваме текущата страница без разширението
    let currentPage = currentPath.replace(/\/$/, '').split('/').pop().replace('.html', '');
    if (currentPage === '' || !currentPage) {
        currentPage = 'index';
    }

    // Конвертираме името на страницата към ID
    let pageId = currentPage === 'index' ? 'начало' :
                 currentPage === 'special-offer' ? 'дигитален-старт' :
                 currentPage === 'testimonials' ? 'отзиви' :
                 currentPage === 'portfolio' ? 'портфолио' :
                 currentPage === 'services' ? 'услуги' :
                 currentPage === 'contact' ? 'контакти' : '';

    console.log('Current page ID:', pageId);

    // Активираме съответния линк в десктоп менюто
    const desktopLinks = document.querySelectorAll('.menu-link');
    desktopLinks.forEach(link => {
        if (link.id === pageId) {
            link.classList.add('active');
            link.classList.add(pageId); // Добавяме специфичен клас за цвета
        } else {
            link.classList.remove('active');
        }
    });

    // Активираме съответния линк в мобилното меню
    const mobileLinks = document.querySelectorAll('.mobile-menu-link');
    mobileLinks.forEach(link => {
        if (link.id === 'mobile-' + pageId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * Инициализира поведението на хедъра при скролване
 */
function initHeaderScroll() {
    const navContainer = document.querySelector('.nav-container');

    if (!navContainer) {
        console.error('Nav container not found!');
        return;
    }

    // Запазваме първоначалната позиция на хедъра
    const headerHeight = navContainer.offsetHeight;

    // Функция, която се изпълнява при скролване
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Ако скролваме надолу и сме преминали височината на хедъра
        if (scrollTop > headerHeight) {
            // Добавяме клас за по-прозрачен фон и по-силно замъгляване
            navContainer.classList.add('header-scrolled');

            // Директно задаваме стилове за по-голяма прозрачност и по-силно замъгляване
            // Използваме правилния основен цвят от бранд палитрата (тъмносин #0B3954)
            navContainer.style.backgroundColor = 'rgba(11, 57, 84, 0.4)'; // Тъмносин с 40% непрозрачност
            navContainer.style.backdropFilter = 'blur(15px)';
            navContainer.style.webkitBackdropFilter = 'blur(15px)';
        } else {
            // Премахваме класа, когато сме в началото на страницата
            navContainer.classList.remove('header-scrolled');

            // Връщаме към по-прозрачен фон и по-лек ефект на замъгляване в началото
            navContainer.style.backgroundColor = 'rgba(11, 57, 84, 0.2)'; // Тъмносин с 20% непрозрачност
            navContainer.style.backdropFilter = 'blur(10px)';
            navContainer.style.webkitBackdropFilter = 'blur(10px)';
        }
    }

    // Добавяме слушател за събитието scroll
    window.addEventListener('scroll', handleScroll);

    // Извикваме функцията веднъж при зареждане, за да се приложи правилното състояние
    handleScroll();
}

