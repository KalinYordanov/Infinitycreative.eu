/**
 * Компоненти
 * Скрипт за инициализиране и управление на компонентите в сайта
 */

document.addEventListener('DOMContentLoaded', function() {
    // Инициализиране на всички компоненти
    initComponents();
});

/**
 * Инициализира всички компоненти в страницата
 */
function initComponents() {
    // Инициализиране на слайдерите преди/след
    initBeforeAfterSliders();

    // Инициализиране на картите с отзиви
    initTestimonialCards();

    // Инициализиране на таблиците с цени
    initPricingTables();

    // Инициализиране на ценовите карти
    initPricingCards();

    // Инициализиране на формулярите за контакт
    initContactForms();

    // Инициализиране на формулярите за проект
    initProjectForms();

    // Инициализиране на FAQ секциите
    initFaqSections();
}

/**
 * Инициализира всички слайдери преди/след в страницата
 */
function initBeforeAfterSliders() {
    const sliders = document.querySelectorAll('.before-after-slider');

    if (sliders.length === 0) return;

    // Проверка дали скриптът за слайдера е зареден
    if (typeof createBeforeAfterSlider === 'function') {
        sliders.forEach(slider => {
            createBeforeAfterSlider(slider);
        });
    } else {
        console.warn('Скриптът за слайдера преди/след не е зареден');
    }
}

/**
 * Инициализира всички карти с отзиви в страницата
 */
function initTestimonialCards() {
    const testimonialContainers = document.querySelectorAll('[data-component="testimonial-card"]');

    if (testimonialContainers.length === 0) return;

    testimonialContainers.forEach(container => {
        try {
            // Опит за извличане на данните от data атрибута
            const options = JSON.parse(container.dataset.options || '{}');

            // Създаване на карта с отзив
            const testimonialCard = document.createElement('div');
            testimonialCard.className = 'testimonial-card';

            if (options.featured) {
                testimonialCard.classList.add('featured');
            }

            if (options.compact) {
                testimonialCard.classList.add('compact');
            }

            // Добавяне на HTML структурата
            testimonialCard.innerHTML = `
                <div class="testimonial-header">
                    <div class="testimonial-avatar">
                        <img src="${options.avatar || ''}" alt="${options.authorName || 'Аватар'}" class="avatar-img">
                    </div>
                    <div class="testimonial-author">
                        <div class="author-name">${options.authorName || ''}</div>
                        <div class="author-position">${options.authorPosition || ''}</div>
                        <div class="author-company">${options.authorCompany || ''}</div>
                    </div>
                </div>

                <div class="testimonial-rating">
                    <div class="rating-stars">${generateRatingStars(options.rating)}</div>
                    <div class="rating-date">${options.date || ''}</div>
                </div>

                <div class="testimonial-content">
                    <div class="testimonial-text">${options.text || ''}</div>
                </div>

                ${options.projectName ? `
                <div class="testimonial-project">
                    <div class="project-label">Проект:</div>
                    <div class="project-name">${options.projectName}</div>
                </div>
                ` : ''}
            `;

            // Заместване на контейнера с картата
            container.parentNode.replaceChild(testimonialCard, container);
        } catch (error) {
            console.error('Грешка при инициализиране на карта с отзив:', error);
        }
    });
}

/**
 * Генерира HTML за звезди за рейтинг
 * @param {number} rating - Рейтинг (0-5)
 * @returns {string} HTML за звездите
 */
function generateRatingStars(rating) {
    if (!rating) return '';

    // Ограничаване на рейтинга между 0 и 5
    const normalizedRating = Math.min(5, Math.max(0, rating));
    let starsHTML = '';

    for (let i = 1; i <= 5; i++) {
        if (i <= normalizedRating) {
            starsHTML += '<span class="star star-filled">★</span>';
        } else if (i - 0.5 <= normalizedRating) {
            starsHTML += '<span class="star star-half">★</span>';
        } else {
            starsHTML += '<span class="star star-empty">☆</span>';
        }
    }

    return starsHTML;
}

/**
 * Инициализира всички таблици с цени в страницата
 */
function initPricingTables() {
    const pricingContainers = document.querySelectorAll('[data-component="pricing-table"]');

    if (pricingContainers.length === 0) return;

    pricingContainers.forEach(container => {
        try {
            // Опит за извличане на данните от data атрибута
            const options = JSON.parse(container.dataset.options || '{}');

            // Създаване на таблица с цени
            const pricingTable = document.createElement('div');
            pricingTable.className = 'pricing-table';

            if (options.compact) {
                pricingTable.classList.add('compact');
            }

            // Добавяне на HTML структурата
            pricingTable.innerHTML = `
                <div class="pricing-table-header">
                    <h2 class="pricing-table-title">${options.title || 'Нашите цени'}</h2>
                    ${options.description ? `<p class="pricing-table-description">${options.description}</p>` : ''}
                </div>

                <div class="pricing-plans">
                    ${generatePricingPlans(options.plans || [])}
                </div>

                ${(options.note || options.cta) ? `
                <div class="pricing-table-footer">
                    ${options.note ? `<p class="pricing-note">${options.note}</p>` : ''}
                    ${options.cta ? `<div class="pricing-cta">${generateCta(options.cta)}</div>` : ''}
                </div>
                ` : ''}
            `;

            // Заместване на контейнера с таблицата
            container.parentNode.replaceChild(pricingTable, container);
        } catch (error) {
            console.error('Грешка при инициализиране на таблица с цени:', error);
        }
    });
}

/**
 * Генерира HTML за планове за цени
 * @param {Array} plans - Масив с планове
 * @returns {string} HTML за плановете
 */
function generatePricingPlans(plans) {
    if (!plans || plans.length === 0) return '';

    return plans.map(plan => `
        <div class="pricing-plan${plan.featured ? ' featured' : ''}">
            ${plan.featured ? `<div class="pricing-badge">${plan.badgeText || 'Най-популярен'}</div>` : ''}

            <div class="pricing-header">
                <h3>${plan.title || ''}</h3>
                <div class="price">${plan.price || ''}</div>
                <div class="price-type">${plan.period || ''}</div>
            </div>

            <div class="pricing-features">
                ${plan.features && plan.features.length > 0 ? `
                <ul>
                    ${plan.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
                ` : ''}
            </div>

            ${plan.subtext ? `<div class="pricing-subtext">${plan.subtext}</div>` : ''}

            <div class="pricing-footer">
                ${plan.buttonText && plan.buttonUrl ? `
                <a href="${plan.buttonUrl}" class="${plan.buttonClass || 'btn btn-primary'}">${plan.buttonText}</a>
                ` : ''}
            </div>
        </div>
    `).join('');
}

/**
 * Генерира HTML за CTA (Call to Action)
 * @param {Object|string} cta - Обект с данни за CTA или HTML низ
 * @returns {string} HTML за CTA
 */
function generateCta(cta) {
    if (!cta) return '';

    if (typeof cta === 'string') {
        return cta;
    }

    if (cta.text && cta.url) {
        return `<a href="${cta.url}" class="${cta.className || 'btn btn-primary'}">${cta.text}</a>`;
    }

    return '';
}

/**
 * Инициализира всички FAQ секции в страницата
 */
function initFaqSections() {
    const faqItems = document.querySelectorAll('.faq-item');

    if (faqItems.length === 0) return;

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        if (!question) return;

        question.addEventListener('click', () => {
            // Превключване на активното състояние
            item.classList.toggle('active');
        });
    });
}

/**
 * Инициализира всички ценови карти в страницата
 */
function initPricingCards() {
    const pricingCardContainers = document.querySelectorAll('[data-component="pricing-card"]');

    if (pricingCardContainers.length === 0) return;

    pricingCardContainers.forEach(container => {
        try {
            // Опит за извличане на данните от data атрибута
            const options = JSON.parse(container.dataset.options || '{}');

            // Създаване на ценова карта
            createPricingCardFromData(container);
        } catch (error) {
            console.error('Грешка при инициализиране на ценова карта:', error);
        }
    });
}

/**
 * Инициализира всички формуляри за контакт в страницата
 */
function initContactForms() {
    const contactFormContainers = document.querySelectorAll('[data-component="contact-form"]');

    if (contactFormContainers.length === 0) return;

    contactFormContainers.forEach(container => {
        try {
            // Опит за извличане на данните от data атрибута
            const options = JSON.parse(container.dataset.options || '{}');

            // Създаване на формуляр за контакт
            const contactFormContainer = document.createElement('div');
            contactFormContainer.className = 'contact-form-container';

            // Зареждане на HTML шаблона
            fetch('/components/contact-form.html')
                .then(response => response.text())
                .then(html => {
                    contactFormContainer.innerHTML = html;

                    // Инициализиране на формуляра
                    const contactForm = contactFormContainer.querySelector('.contact-form');
                    initContactForm(contactFormContainer, options);

                    // Заместване на контейнера с формуляра
                    container.parentNode.replaceChild(contactFormContainer, container);
                })
                .catch(error => {
                    console.error('Грешка при зареждане на шаблона за формуляр за контакт:', error);
                });
        } catch (error) {
            console.error('Грешка при инициализиране на формуляр за контакт:', error);
        }
    });
}

/**
 * Инициализира всички формуляри за проект в страницата
 */
function initProjectForms() {
    const projectFormContainers = document.querySelectorAll('[data-component="project-form"]');

    if (projectFormContainers.length === 0) return;

    projectFormContainers.forEach(container => {
        try {
            // Опит за извличане на данните от data атрибута
            const options = JSON.parse(container.dataset.options || '{}');

            // Създаване на формуляр за проект
            const projectFormContainer = document.createElement('div');
            projectFormContainer.className = 'project-form-container';

            // Зареждане на HTML шаблона
            fetch('/components/project-form.html')
                .then(response => response.text())
                .then(html => {
                    projectFormContainer.innerHTML = html;

                    // Инициализиране на формуляра
                    const projectForm = projectFormContainer.querySelector('.project-form');
                    initProjectForm(projectFormContainer, options);

                    // Заместване на контейнера с формуляра
                    container.parentNode.replaceChild(projectFormContainer, container);
                })
                .catch(error => {
                    console.error('Грешка при зареждане на шаблона за формуляр за проект:', error);
                });
        } catch (error) {
            console.error('Грешка при инициализиране на формуляр за проект:', error);
        }
    });
}
