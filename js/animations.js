// Animations JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();

    // Add typing effect
    addTypingEffects();

    // Animate lists
    animateTypingLists();
});

/**
 * Initialize animations
 */
function initAnimations() {
    // Hero section animations
    animateHero();

    // Animate elements on scroll
    initScrollAnimations();

    // Initialize counters
    initCounters();

    // Паралакс ефектът е премахнат за по-добра производителност
    // initParallax();
}

/**
 * Animate hero section
 */
function animateHero() {
    const hero = document.querySelector('.hero');

    if (!hero) return;

    const heroTitle = hero.querySelector('h1');
    const heroText = hero.querySelector('p');
    const heroButton = hero.querySelector('.btn');

    if (heroTitle) {
        heroTitle.classList.add('fade-in-down');
        heroTitle.style.animationDelay = '0.2s';
    }

    if (heroText) {
        heroText.classList.add('fade-in-up');
        heroText.style.animationDelay = '0.4s';
    }

    if (heroButton) {
        heroButton.classList.add('fade-in-up');
        heroButton.style.animationDelay = '0.6s';
    }
}

/**
 * Initialize scroll animations
 */
function initScrollAnimations() {
    // Get all elements with animation classes
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if (animatedElements.length === 0) return;

    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }

    // Check elements on scroll
    function checkElements() {
        animatedElements.forEach(element => {
            if (isInViewport(element)) {
                element.classList.add('visible');
            }
        });
    }

    // Initial check
    checkElements();

    // Check on scroll
    window.addEventListener('scroll', checkElements);
}

/**
 * Initialize counters
 */
function initCounters() {
    const counters = document.querySelectorAll('.counter');

    if (counters.length === 0) return;

    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }

    // Animate counter
    function animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = parseInt(counter.getAttribute('data-duration') || 2000);
        const step = target / (duration / 16); // 60fps

        let current = 0;
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    }

    // Check counters on scroll
    function checkCounters() {
        counters.forEach(counter => {
            if (isInViewport(counter) && !counter.classList.contains('counted')) {
                counter.classList.add('counted');
                animateCounter(counter);
            }
        });
    }

    // Initial check
    checkCounters();

    // Check on scroll
    window.addEventListener('scroll', checkCounters);
}

/**
 * Initialize parallax effect - DISABLED
 */
function initParallax() {
    // Функцията е деактивирана за по-добра производителност
    return;
}

/**
 * Animate element with typing effect
 * @param {HTMLElement} element - Element to animate
 * @param {string} text - Text to type
 * @param {number} speed - Typing speed in milliseconds
 * @param {Function} callback - Optional callback after typing completes
 */
function typeWriter(element, text, speed = 50, callback = null) {
    if (!element) return;

    let i = 0;
    element.textContent = '';
    element.classList.add('typing-cursor');

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Премахваме класа с курсора след кратко забавяне
            setTimeout(() => {
                element.classList.remove('typing-cursor');
                if (callback && typeof callback === 'function') {
                    callback();
                }
            }, 500);
        }
    }

    type();
}

/**
 * Animate element with count up effect
 * @param {HTMLElement} element - Element to animate
 * @param {number} target - Target number
 * @param {number} duration - Animation duration in milliseconds
 */
function countUp(element, target, duration = 2000) {
    if (!element) return;

    let start = 0;
    const step = target / (duration / 16); // 60fps

    function updateCount() {
        start += step;
        if (start < target) {
            element.textContent = Math.ceil(start);
            requestAnimationFrame(updateCount);
        } else {
            element.textContent = target;
        }
    }

    updateCount();
}

/**
 * Add typing effect to multiple elements
 */
function addTypingEffects() {
    // Масив с селектори и настройки за елементите, които ще имат ефект на писане
    const typingElements = [
        { selector: '.hero h1', speed: 70, delay: 0 },
        { selector: '.hero p', speed: 30, delay: 1500 },
        { selector: '.section-title h2', speed: 50, delay: 300 },
        { selector: '.intro h2', speed: 60, delay: 200 },
        { selector: '.about h2', speed: 60, delay: 200 }
    ];

    // Функция за проверка дали елемент е видим
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }

    // Функция за стартиране на анимацията на писане
    function startTypingAnimation(element, config) {
        // Запазваме оригиналния текст
        const originalText = element.textContent;
        // Маркираме елемента като анимиран
        element.setAttribute('data-animated', 'true');

        // Стартираме анимацията след зададеното забавяне
        setTimeout(() => {
            typeWriter(element, originalText, config.speed);
        }, config.delay);
    }

    // Проверяваме елементите, които са видими при зареждане
    typingElements.forEach(config => {
        const elements = document.querySelectorAll(config.selector);
        elements.forEach(element => {
            // Проверяваме дали елементът вече е анимиран
            if (element.getAttribute('data-animated') === 'true') return;

            // За hero елементите стартираме веднага
            if (config.selector.includes('hero')) {
                startTypingAnimation(element, config);
            }
            // За останалите елементи проверяваме дали са видими
            else if (isInViewport(element)) {
                startTypingAnimation(element, config);
            }
        });
    });

    // Проверяваме при скролиране за нови елементи
    function checkElementsOnScroll() {
        typingElements.forEach(config => {
            // Пропускаме hero елементите, тъй като те вече са анимирани
            if (config.selector.includes('hero')) return;

            const elements = document.querySelectorAll(config.selector);
            elements.forEach(element => {
                // Проверяваме дали елементът вече е анимиран
                if (element.getAttribute('data-animated') === 'true') return;

                // Проверяваме дали елементът е видим
                if (isInViewport(element)) {
                    startTypingAnimation(element, config);
                }
            });
        });
    }

    // Добавяме event listener за скролиране
    window.addEventListener('scroll', checkElementsOnScroll);
}

/**
 * Animate lists with typing-like effect
 */
function animateTypingLists() {
    const lists = document.querySelectorAll('ul.animate-list, ol.animate-list');

    lists.forEach(list => {
        // Добавяме клас за стилизиране
        list.classList.add('typing-list');

        // Вземаме всички елементи на списъка
        const items = list.querySelectorAll('li');

        // Функция за проверка дали списъкът е видим
        function isListInViewport() {
            const rect = list.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
                rect.bottom >= 0
            );
        }

        // Функция за анимиране на елементите на списъка
        function animateItems() {
            if (!isListInViewport()) return;

            // Маркираме списъка като анимиран
            list.setAttribute('data-animated', 'true');

            // Анимираме елементите един след друг
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('visible');
                }, 300 + (index * 150));
            });

            // Премахваме event listener след анимацията
            window.removeEventListener('scroll', animateItems);
        }

        // Проверяваме дали списъкът вече е анимиран
        if (list.getAttribute('data-animated') === 'true') return;

        // Първоначална проверка
        animateItems();

        // Проверка при скролиране
        window.addEventListener('scroll', animateItems);
    });
}

// Добавяме извикване на функцията
document.addEventListener('DOMContentLoaded', function() {
    // Инициализиране на анимации
    initAnimations();

    // Добавяне на ефекти на писане
    addTypingEffects();

    // Анимиране на списъци
    animateTypingLists();
});


