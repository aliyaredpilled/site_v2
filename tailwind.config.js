/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Добавляем пользовательские цвета Microsoft
        'microsoft-blue': '#0167b8',
        'microsoft-dark-blue': '#004e8c',
        'microsoft-light-blue': '#50e6ff',
        'microsoft-white': '#ffffff',
        'microsoft-black': '#000000',
        'microsoft-gray': {
          100: '#f5f5f5',
          200: '#e6e6e6',
          300: '#d2d2d2',
          400: '#a6a6a6',
          500: '#7a7a7a',
          600: '#6e6e6e',
          700: '#414141',
          800: '#252525',
          900: '#1d1d1d',
        },
        'microsoft-red': '#e81123',
        'microsoft-green': '#107c10',
        'microsoft-yellow': '#ffb900',
        'microsoft-orange': '#d83b01',
        'microsoft-purple': '#8661c5',
      },
      // Добавляем шрифты из лендинга
      fontFamily: {
        // sans: ['Inter', 'Helvetica', 'Arial', 'sans-serif'], // Inter как основной sans-serif
        sans: ['Roboto Condensed', 'Helvetica', 'Arial', 'sans-serif'], // Возвращаем запасные шрифты
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
};
