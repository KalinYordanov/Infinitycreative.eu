# Infinity Creative - Дигитална агенция

Уеб сайт на дигитална агенция Infinity Creative, разработен с Tailwind CSS и DaisyUI.

## Инсталация

1. Клонирайте репозиторито:
```
git clone https://github.com/your-username/infinity-creative.git
cd infinity-creative
```

2. Инсталирайте зависимостите:
```
npm install
```

3. Стартирайте разработката:
```
npm run dev
```

4. За production build:
```
npm run build
```

## Структура на проекта

```
infinity-creative/
├── assets/                      # Статични файлове (изображения, шрифтове и т.н.)
├── components/                  # HTML компоненти
├── config/                      # Конфигурационни файлове
│   ├── tailwind.config.js       # Tailwind CSS конфигурация
│   └── postcss.config.js        # PostCSS конфигурация
├── css/                         # CSS файлове
│   ├── animations.css           # CSS анимации
│   ├── components/              # CSS компоненти
│   └── tailwind/                # Tailwind CSS файлове
│       ├── input.css            # Входен файл за Tailwind
│       └── output.css           # Компилиран CSS файл
├── js/                          # JavaScript файлове
│   ├── animations.js            # JS анимации
│   ├── before-after-slider.js   # Преди/След слайдер
│   ├── components.js            # JS компоненти
│   ├── form-validator.js        # Валидация на формуляри
│   ├── language-switcher.js     # Превключвател на езика
│   ├── main.js                  # Основен JS файл
│   ├── viber-button.js          # Viber бутон
│   └── tailwind/                # Tailwind JS файлове
│       └── tailwind-config.js   # Tailwind конфигурация за браузъра
├── json/                        # JSON файлове
│   ├── config.json              # Основна конфигурация на сайта
│   ├── package.json             # NPM конфигурация (копие)
│   ├── portfolio.json           # Данни за портфолиото
│   ├── services.json            # Данни за услугите
│   └── testimonials.json        # Данни за отзивите
├── locales/                     # Езикови файлове
├── services/                    # Страници за услуги
├── index.html                   # Начална страница
├── package.json                 # NPM конфигурация
└── README.md                    # Документация
```

## Технологии

- HTML5
- Tailwind CSS
- DaisyUI
- JavaScript
- PostCSS
- Autoprefixer

## Цветова палитра

Проектът използва персонализирана цветова палитра, дефинирана с DaisyUI:

```css
@plugin "daisyui/theme" {
  name: "infinity creative";
  default: false;
  prefersdark: false;
  color-scheme: "dark";
  --color-base-100: oklch(13% 0.028 261.692);
  --color-base-200: oklch(21% 0.034 264.665);
  --color-base-300: oklch(27% 0.033 256.848);
  --color-base-content: oklch(96% 0.003 264.542);
  --color-primary: oklch(84% 0.143 164.978);
  --color-primary-content: oklch(26% 0.051 172.552);
  --color-secondary: oklch(81% 0.117 11.638);
  --color-secondary-content: oklch(27% 0.105 12.094);
  --color-accent: oklch(78% 0.115 274.713);
  --color-accent-content: oklch(25% 0.09 281.288);
  --color-neutral: oklch(13% 0.028 261.692);
  --color-neutral-content: oklch(98% 0.002 247.839);
  --color-info: oklch(74% 0.16 232.661);
  --color-info-content: oklch(29% 0.066 243.157);
  --color-success: oklch(79% 0.209 151.711);
  --color-success-content: oklch(26% 0.065 152.934);
  --color-warning: oklch(85% 0.199 91.936);
  --color-warning-content: oklch(28% 0.066 53.813);
  --color-error: oklch(71% 0.194 13.428);
  --color-error-content: oklch(27% 0.105 12.094);
  --radius-selector: 0.25rem;
  --radius-field: 0.5rem;
  --radius-box: 2rem;
  --size-selector: 0.25rem;
  --size-field: 0.25rem;
  --border: 1px;
  --depth: 0;
  --noise: 0;
}
```

### Основни цветове

| Име | OKLCH | Описание |
|-----|-------|----------|
| Primary | oklch(84% 0.143 164.978) | Основен цвят за бутони и акценти |
| Secondary | oklch(81% 0.117 11.638) | Вторичен цвят за елементи |
| Accent | oklch(78% 0.115 274.713) | Акцентен цвят за важни елементи |
| Base-100 | oklch(13% 0.028 261.692) | Основен фонов цвят (тъмен) |
| Base-Content | oklch(96% 0.003 264.542) | Цвят на текста върху основния фон |

## Лиценз

ISC
