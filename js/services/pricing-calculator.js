/**
 * Калкулатор на цени
 * Скрипт за изчисляване на цени за различни услуги
 */

document.addEventListener('DOMContentLoaded', function() {
    // Инициализиране на калкулатора на цени
    initPricingCalculator();
});

/**
 * Инициализира калкулатора на цени
 */
function initPricingCalculator() {
    // Намиране на всички калкулатори в страницата
    const calculators = document.querySelectorAll('.pricing-calculator');
    
    if (calculators.length === 0) return;
    
    calculators.forEach(calculator => {
        // Определяне на типа на калкулатора
        const calculatorType = calculator.dataset.calculatorType || 'default';
        
        // Инициализиране на калкулатора според типа
        switch (calculatorType) {
            case 'website':
                initWebsiteCalculator(calculator);
                break;
            case 'sales-funnel':
                initSalesFunnelCalculator(calculator);
                break;
            case 'ads':
                initAdsCalculator(calculator);
                break;
            case 'design':
                initDesignCalculator(calculator);
                break;
            case 'video':
                initVideoCalculator(calculator);
                break;
            case 'content':
                initContentCalculator(calculator);
                break;
            case 'prepress':
                initPrepressCalculator(calculator);
                break;
            case 'seo':
                initSeoCalculator(calculator);
                break;
            default:
                initDefaultCalculator(calculator);
                break;
        }
    });
}

/**
 * Инициализира калкулатор за уеб сайтове
 * @param {HTMLElement} calculator - Елемент на калкулатора
 */
function initWebsiteCalculator(calculator) {
    // Намиране на елементите на калкулатора
    const pricingCards = calculator.querySelectorAll('.pricing-card');
    
    if (pricingCards.length === 0) return;
    
    pricingCards.forEach(card => {
        // Базова цена
        const basePrice = parseFloat(card.dataset.basePrice) || 0;
        
        // Елементи за изчисляване на цената
        const checkboxes = card.querySelectorAll('input[type="checkbox"]');
        const selects = card.querySelectorAll('select');
        const totalPriceElement = card.querySelector('.total-price');
        
        if (!totalPriceElement) return;
        
        // Функция за изчисляване на общата цена
        function calculateTotalPrice() {
            let totalPrice = basePrice;
            
            // Добавяне на цените от чекбоксовете
            checkboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    totalPrice += parseFloat(checkbox.dataset.price) || 0;
                }
            });
            
            // Добавяне на цените от падащите менюта
            selects.forEach(select => {
                const selectedOption = select.options[select.selectedIndex];
                if (selectedOption && selectedOption.dataset.price) {
                    totalPrice += parseFloat(selectedOption.dataset.price) || 0;
                }
            });
            
            // Форматиране на цената
            const formattedPrice = formatPrice(totalPrice);
            
            // Актуализиране на елемента с общата цена
            totalPriceElement.textContent = formattedPrice;
        }
        
        // Добавяне на слушатели за събития
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', calculateTotalPrice);
        });
        
        selects.forEach(select => {
            select.addEventListener('change', calculateTotalPrice);
        });
        
        // Първоначално изчисляване на цената
        calculateTotalPrice();
    });
}

/**
 * Инициализира калкулатор за продажбени фунии
 * @param {HTMLElement} calculator - Елемент на калкулатора
 */
function initSalesFunnelCalculator(calculator) {
    // Логиката е подобна на тази за уеб сайтове
    initWebsiteCalculator(calculator);
}

/**
 * Инициализира калкулатор за реклами
 * @param {HTMLElement} calculator - Елемент на калкулатора
 */
function initAdsCalculator(calculator) {
    // Намиране на елементите на калкулатора
    const budgetInput = calculator.querySelector('input[name="budget"]');
    const setupFeeElement = calculator.querySelector('.setup-fee');
    const maintenanceFeeElement = calculator.querySelector('.maintenance-fee');
    const totalPriceElement = calculator.querySelector('.total-price');
    
    if (!budgetInput || !setupFeeElement || !maintenanceFeeElement || !totalPriceElement) return;
    
    // Извличане на цените от data атрибути
    const setupFee = parseFloat(calculator.dataset.setupFee) || 120;
    const maintenanceThreshold = parseFloat(calculator.dataset.maintenanceThreshold) || 500;
    const maintenanceFeeBelow = parseFloat(calculator.dataset.maintenanceFeeBelow) || 100;
    const maintenanceFeeAbovePercent = parseFloat(calculator.dataset.maintenanceFeeAbovePercent) || 20;
    
    // Функция за изчисляване на общата цена
    function calculateTotalPrice() {
        const budget = parseFloat(budgetInput.value) || 0;
        
        // Изчисляване на таксата за поддръжка
        let maintenanceFee = 0;
        
        if (budget > 0) {
            if (budget <= maintenanceThreshold) {
                maintenanceFee = maintenanceFeeBelow;
            } else {
                maintenanceFee = budget * (maintenanceFeeAbovePercent / 100);
            }
        }
        
        // Изчисляване на общата цена
        const totalPrice = setupFee + maintenanceFee;
        
        // Форматиране на цените
        setupFeeElement.textContent = formatPrice(setupFee);
        maintenanceFeeElement.textContent = formatPrice(maintenanceFee);
        totalPriceElement.textContent = formatPrice(totalPrice);
    }
    
    // Добавяне на слушател за събитие
    budgetInput.addEventListener('input', calculateTotalPrice);
    
    // Първоначално изчисляване на цената
    calculateTotalPrice();
}

/**
 * Инициализира калкулатор за дизайн
 * @param {HTMLElement} calculator - Елемент на калкулатора
 */
function initDesignCalculator(calculator) {
    // Намиране на елементите на калкулатора
    const serviceSelects = calculator.querySelectorAll('select[name="service"]');
    const quantityInputs = calculator.querySelectorAll('input[name="quantity"]');
    const totalPriceElement = calculator.querySelector('.total-price');
    
    if (serviceSelects.length === 0 || quantityInputs.length === 0 || !totalPriceElement) return;
    
    // Функция за изчисляване на общата цена
    function calculateTotalPrice() {
        let totalPrice = 0;
        
        // Обхождане на всички редове с услуги
        for (let i = 0; i < serviceSelects.length; i++) {
            const serviceSelect = serviceSelects[i];
            const quantityInput = quantityInputs[i];
            
            const selectedOption = serviceSelect.options[serviceSelect.selectedIndex];
            const quantity = parseInt(quantityInput.value) || 0;
            
            if (selectedOption && selectedOption.dataset.price) {
                const price = parseFloat(selectedOption.dataset.price) || 0;
                totalPrice += price * quantity;
            }
        }
        
        // Форматиране на цената
        const formattedPrice = formatPrice(totalPrice);
        
        // Актуализиране на елемента с общата цена
        totalPriceElement.textContent = formattedPrice;
    }
    
    // Добавяне на слушатели за събития
    serviceSelects.forEach(select => {
        select.addEventListener('change', calculateTotalPrice);
    });
    
    quantityInputs.forEach(input => {
        input.addEventListener('input', calculateTotalPrice);
    });
    
    // Първоначално изчисляване на цената
    calculateTotalPrice();
}

/**
 * Инициализира калкулатор за видео обработка
 * @param {HTMLElement} calculator - Елемент на калкулатора
 */
function initVideoCalculator(calculator) {
    // Логиката е подобна на тази за дизайн
    initDesignCalculator(calculator);
}

/**
 * Инициализира калкулатор за контент маркетинг
 * @param {HTMLElement} calculator - Елемент на калкулатора
 */
function initContentCalculator(calculator) {
    // Намиране на елементите на калкулатора
    const packageSelects = calculator.querySelectorAll('input[name="package"]');
    const durationSelects = calculator.querySelectorAll('select[name="duration"]');
    const totalPriceElement = calculator.querySelector('.total-price');
    
    if (packageSelects.length === 0 || !totalPriceElement) return;
    
    // Функция за изчисляване на общата цена
    function calculateTotalPrice() {
        let totalPrice = 0;
        let packagePrice = 0;
        let duration = 1;
        
        // Намиране на избрания пакет
        packageSelects.forEach(radio => {
            if (radio.checked) {
                packagePrice = parseFloat(radio.dataset.price) || 0;
            }
        });
        
        // Намиране на избраната продължителност
        if (durationSelects.length > 0) {
            const durationSelect = durationSelects[0];
            const selectedOption = durationSelect.options[durationSelect.selectedIndex];
            
            if (selectedOption && selectedOption.dataset.months) {
                duration = parseInt(selectedOption.dataset.months) || 1;
            }
        }
        
        // Изчисляване на общата цена
        totalPrice = packagePrice * duration;
        
        // Прилагане на отстъпка за по-дълги периоди
        if (duration >= 6) {
            totalPrice *= 0.9; // 10% отстъпка за 6+ месеца
        } else if (duration >= 3) {
            totalPrice *= 0.95; // 5% отстъпка за 3+ месеца
        }
        
        // Форматиране на цената
        const formattedPrice = formatPrice(totalPrice);
        
        // Актуализиране на елемента с общата цена
        totalPriceElement.textContent = formattedPrice;
    }
    
    // Добавяне на слушатели за събития
    packageSelects.forEach(radio => {
        radio.addEventListener('change', calculateTotalPrice);
    });
    
    durationSelects.forEach(select => {
        select.addEventListener('change', calculateTotalPrice);
    });
    
    // Първоначално изчисляване на цената
    calculateTotalPrice();
}

/**
 * Инициализира калкулатор за предпечат
 * @param {HTMLElement} calculator - Елемент на калкулатора
 */
function initPrepressCalculator(calculator) {
    // Логиката е подобна на тази за дизайн
    initDesignCalculator(calculator);
}

/**
 * Инициализира калкулатор за SEO
 * @param {HTMLElement} calculator - Елемент на калкулатора
 */
function initSeoCalculator(calculator) {
    // Логиката е подобна на тази за контент маркетинг
    initContentCalculator(calculator);
}

/**
 * Инициализира калкулатор по подразбиране
 * @param {HTMLElement} calculator - Елемент на калкулатора
 */
function initDefaultCalculator(calculator) {
    // Намиране на елементите на калкулатора
    const inputs = calculator.querySelectorAll('input[data-price], select[data-price]');
    const totalPriceElement = calculator.querySelector('.total-price');
    
    if (inputs.length === 0 || !totalPriceElement) return;
    
    // Функция за изчисляване на общата цена
    function calculateTotalPrice() {
        let totalPrice = 0;
        
        // Обхождане на всички входове
        inputs.forEach(input => {
            if (input.type === 'checkbox' || input.type === 'radio') {
                if (input.checked) {
                    totalPrice += parseFloat(input.dataset.price) || 0;
                }
            } else if (input.tagName === 'SELECT') {
                const selectedOption = input.options[input.selectedIndex];
                if (selectedOption && selectedOption.dataset.price) {
                    totalPrice += parseFloat(selectedOption.dataset.price) || 0;
                }
            } else {
                const value = parseFloat(input.value) || 0;
                const price = parseFloat(input.dataset.price) || 0;
                totalPrice += value * price;
            }
        });
        
        // Форматиране на цената
        const formattedPrice = formatPrice(totalPrice);
        
        // Актуализиране на елемента с общата цена
        totalPriceElement.textContent = formattedPrice;
    }
    
    // Добавяне на слушатели за събития
    inputs.forEach(input => {
        if (input.type === 'checkbox' || input.type === 'radio') {
            input.addEventListener('change', calculateTotalPrice);
        } else {
            input.addEventListener('input', calculateTotalPrice);
        }
    });
    
    // Първоначално изчисляване на цената
    calculateTotalPrice();
}

/**
 * Форматира цена
 * @param {number} price - Цена
 * @param {string} currency - Валута (по подразбиране: лв.)
 * @returns {string} Форматирана цена
 */
function formatPrice(price, currency = 'лв.') {
    // Закръгляне до 2 знака след десетичната запетая
    price = Math.round(price * 100) / 100;
    
    // Форматиране на цената
    return `${price} ${currency}`;
}
