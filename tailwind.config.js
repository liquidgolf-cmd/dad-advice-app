/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm, dad-friendly color palette
        dad: {
          wood: {
            light: '#D4A574',
            DEFAULT: '#8B6F47',
            dark: '#5C4A2F',
          },
          blue: {
            light: '#A8D5E2',
            DEFAULT: '#6B9AC4',
            dark: '#4A7BA7',
          },
          warm: {
            light: '#F5E6D3',
            DEFAULT: '#E8D4B8',
            dark: '#D4B896',
          },
          green: {
            light: '#C8D5B9',
            DEFAULT: '#A3B899',
            dark: '#7A9070',
          },
          accent: {
            orange: '#E89B6C',
            red: '#C07070',
          }
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Nunito', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
        'thinking': 'thinking 1.5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        thinking: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

