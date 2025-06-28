/**
 * Infinity Creative Theme Configuration
 * Конфигурация на темата за DaisyUI
 */

// Дефиниране на темата
const infinityCreativeTheme = {
  name: "infinity creative",
  default: false,
  prefersdark: false,
  "color-scheme": "dark",
  colors: {
    // Основни цветове
    "base-100": "oklch(13% 0.028 261.692)",
    "base-200": "oklch(21% 0.034 264.665)",
    "base-300": "oklch(27% 0.033 256.848)",
    "base-content": "oklch(96% 0.003 264.542)",
    
    // Брандирани цветове
    "primary": "oklch(84% 0.143 164.978)",
    "primary-content": "oklch(26% 0.051 172.552)",
    "secondary": "oklch(81% 0.117 11.638)",
    "secondary-content": "oklch(27% 0.105 12.094)",
    "accent": "oklch(78% 0.115 274.713)",
    "accent-content": "oklch(25% 0.09 281.288)",
    
    // Неутрални цветове
    "neutral": "oklch(13% 0.028 261.692)",
    "neutral-content": "oklch(98% 0.002 247.839)",
    
    // Информационни цветове
    "info": "oklch(74% 0.16 232.661)",
    "info-content": "oklch(29% 0.066 243.157)",
    "success": "oklch(79% 0.209 151.711)",
    "success-content": "oklch(26% 0.065 152.934)",
    "warning": "oklch(85% 0.199 91.936)",
    "warning-content": "oklch(28% 0.066 53.813)",
    "error": "oklch(71% 0.194 13.428)",
    "error-content": "oklch(27% 0.105 12.094)",
  },
  
  // Радиуси и размери
  variables: {
    "--radius-selector": "0.25rem",
    "--radius-field": "0.5rem",
    "--radius-box": "2rem",
    "--size-selector": "0.25rem",
    "--size-field": "0.25rem",
    "--border": "1px",
    "--depth": "0",
    "--noise": "0",
    
    // DaisyUI специфични променливи
    "--rounded-box": "2rem",
    "--rounded-btn": "0.5rem",
    "--rounded-badge": "0.25rem",
    "--animation-btn": "0.25s",
    "--animation-input": "0.2s",
    "--btn-focus-scale": "0.95",
    "--border-btn": "1px",
    "--tab-border": "1px",
    "--tab-radius": "0.5rem",
  }
};

// Функция за прилагане на темата към DaisyUI
function applyInfinityCreativeTheme() {
  // Проверка дали DaisyUI е наличен
  if (typeof window !== 'undefined' && window.daisyui) {
    window.daisyui.themes = [infinityCreativeTheme];
    console.log('Infinity Creative theme applied to DaisyUI');
  } else {
    console.warn('DaisyUI not found. Theme could not be applied.');
  }
}

// Експортиране на темата и функцията за прилагане
export { infinityCreativeTheme, applyInfinityCreativeTheme };

// Автоматично прилагане на темата при зареждане на скрипта
document.addEventListener('DOMContentLoaded', function() {
  // Задаване на data-theme атрибут на html елемента
  document.documentElement.setAttribute('data-theme', 'infinity creative');
  console.log('Theme attribute set to "infinity creative"');
  
  // Опит за прилагане на темата към DaisyUI
  if (typeof applyInfinityCreativeTheme === 'function') {
    applyInfinityCreativeTheme();
  }
});

// Генериране на CSS променливи за темата
function generateThemeCSS() {
  let css = ':root {\n';
  
  // Добавяне на цветовете
  for (const [key, value] of Object.entries(infinityCreativeTheme.colors)) {
    css += `  --${key}: ${value};\n`;
  }
  
  // Добавяне на променливите
  for (const [key, value] of Object.entries(infinityCreativeTheme.variables)) {
    css += `  ${key}: ${value};\n`;
  }
  
  css += '}\n';
  return css;
}

// Функция за добавяне на CSS към страницата
function injectThemeCSS() {
  const css = generateThemeCSS();
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
  console.log('Infinity Creative theme CSS injected');
}

// Инжектиране на CSS при зареждане на страницата
document.addEventListener('DOMContentLoaded', injectThemeCSS);
