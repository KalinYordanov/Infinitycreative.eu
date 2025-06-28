// Typing Effect JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Инициализиране на ефекта на писане в Hero секцията
    initHeroTypingEffect();
});

/**
 * Инициализира ефекта на писане в Hero секцията
 */
function initHeroTypingEffect() {
    const typingElement = document.getElementById('typing-text');

    if (!typingElement) return;

    // Запазваме оригиналния текст
    const originalText = typingElement.textContent;
    // Изчистваме текста, за да започнем анимацията
    typingElement.textContent = '';

    // Добавяме клас за курсора
    typingElement.classList.add('typing-cursor');

    // Масив с различни фрази, които ще се сменят
    const phrases = [
        'малък бизнес',
        'стартъп',
        'онлайн магазин',
        'ресторант',
        'салон за красота',
        'фитнес център',
        'консултантски бизнес',
        'строителна фирма',
        'счетоводна къща',
        'адвокатска кантора'
    ];

    let currentPhraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100; // Скорост на писане в милисекунди
    let pauseEnd = 2000; // Пауза в края на фразата
    let pauseStart = 500; // Пауза в началото на фразата

    /**
     * Функция за писане и изтриване на текст
     */
    function typeText() {
        const currentPhrase = phrases[currentPhraseIndex];

        // Ако пишем
        if (!isDeleting) {
            // Добавяме следващия символ
            typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;

            // Ако сме написали цялата фраза
            if (charIndex === currentPhrase.length) {
                // Задаваме пауза преди да започнем да изтриваме
                isDeleting = true;
                typingSpeed = pauseEnd; // Пауза преди изтриване
            } else {
                // Различна скорост за различни символи за по-естествен ефект
                typingSpeed = Math.random() * 50 + 70;
            }
        }
        // Ако изтриваме
        else {
            // Премахваме последния символ
            typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;

            // Ако сме изтрили цялата фраза
            if (charIndex === 0) {
                isDeleting = false;
                // Преминаваме към следващата фраза
                currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
                typingSpeed = pauseStart; // Пауза преди следващата фраза
            } else {
                // По-бързо изтриване с малки вариации в скоростта
                typingSpeed = Math.random() * 30 + 30;
            }
        }

        // Продължаваме анимацията
        setTimeout(typeText, typingSpeed);
    }

    // Добавяме функция за случайно разбъркване на масива с фрази
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Разбъркваме фразите за по-интересен ефект
    shuffleArray(phrases);

    // Стартираме анимацията след кратко забавяне
    setTimeout(typeText, 1000);
}
