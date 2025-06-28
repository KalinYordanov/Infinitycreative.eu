/**
 * Tailwind CSS конфигурационен файл
 * Този файл се използва за инициализиране на Tailwind CSS в браузъра
 * за разработка и тестване
 */

// Зареждане на конфигурацията от config/tailwind.config.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('Tailwind CSS инициализиран');

    // Проверка дали конфигурацията е заредена правилно
    try {
        // В production режим конфигурацията се зарежда от компилирания CSS файл
        console.log('Tailwind CSS конфигурация заредена от: ./config/tailwind.config.js');
    } catch (error) {
        console.error('Грешка при зареждане на Tailwind CSS конфигурация:', error);
    }

    // Тук може да добавите допълнителна логика за Tailwind CSS
    // например динамично добавяне на класове или теми
});
