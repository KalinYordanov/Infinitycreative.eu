/**
 * JSON Loader
 * Този файл се използва за зареждане на данни от JSON файлове
 */

class JsonLoader {
    constructor() {
        this.cache = {};
    }

    /**
     * Зареждане на JSON файл
     * @param {string} path - Път до JSON файла
     * @returns {Promise<Object>} - Promise с данните от JSON файла
     */
    async load(path) {
        // Проверка дали файлът вече е зареден
        if (this.cache[path]) {
            return this.cache[path];
        }

        try {
            const response = await fetch(path);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this.cache[path] = data;
            return data;
        } catch (error) {
            console.error(`Грешка при зареждане на JSON файл: ${path}`, error);
            return null;
        }
    }

    /**
     * Зареждане на конфигурация
     * @returns {Promise<Object>} - Promise с конфигурацията
     */
    async loadConfig() {
        return this.load('json/config.json');
    }

    /**
     * Зареждане на услуги
     * @returns {Promise<Object>} - Promise с услугите
     */
    async loadServices() {
        return this.load('json/services.json');
    }

    /**
     * Зареждане на отзиви
     * @returns {Promise<Object>} - Promise с отзивите
     */
    async loadTestimonials() {
        return this.load('json/testimonials.json');
    }

    /**
     * Зареждане на портфолио
     * @returns {Promise<Object>} - Promise с портфолиото
     */
    async loadPortfolio() {
        return this.load('json/portfolio.json');
    }
}

// Създаване на глобална инстанция
const jsonLoader = new JsonLoader();

// Инициализиране при зареждане на страницата
document.addEventListener('DOMContentLoaded', async () => {
    console.log('JSON Loader инициализиран');
    
    // Зареждане на конфигурацията
    const config = await jsonLoader.loadConfig();
    if (config) {
        console.log('Конфигурацията е заредена успешно');
        
        // Тук може да добавите код за инициализиране на сайта с конфигурацията
        // Например, задаване на заглавие, лого, меню и т.н.
    }
});
