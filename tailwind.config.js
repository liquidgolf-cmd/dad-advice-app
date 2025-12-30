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
        // Avatar animations
        'avatar-idle': 'avatarIdle 3s ease-in-out infinite',
        'avatar-listening': 'avatarListening 2s ease-in-out infinite',
        'avatar-thinking': 'avatarThinking 2s ease-in-out infinite',
        'avatar-explaining': 'avatarExplaining 1.5s ease-in-out infinite',
        'avatar-laughing': 'avatarLaughing 0.8s ease-in-out infinite',
        'avatar-concerned': 'avatarConcerned 2.5s ease-in-out infinite',
        'avatar-proud': 'avatarProud 2s ease-in-out infinite',
        'avatar-silly': 'avatarSilly 1.2s ease-in-out infinite',
        'avatar-surprised': 'avatarSurprised 0.6s ease-out',
        'avatar-encouraging': 'avatarEncouraging 1.8s ease-in-out infinite',
        'avatar-nod': 'avatarNod 0.5s ease-in-out',
        'avatar-gesture': 'avatarGesture 2s ease-in-out infinite',
        'ring-pulse': 'ringPulse 2s ease-in-out infinite',
        'ring-concerned': 'ringConcerned 1.5s ease-in-out infinite',
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
        // Avatar animation keyframes
        avatarIdle: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-2px) scale(1.01)' },
        },
        avatarListening: {
          '0%, 100%': { transform: 'translateX(0) translateY(0) rotate(0deg)' },
          '25%': { transform: 'translateX(-3px) translateY(-2px) rotate(-2deg)' },
          '75%': { transform: 'translateX(3px) translateY(-2px) rotate(2deg)' },
        },
        avatarThinking: {
          '0%, 100%': { transform: 'rotate(0deg) translateY(0)' },
          '25%': { transform: 'rotate(-5deg) translateY(-3px)' },
          '50%': { transform: 'rotate(0deg) translateY(-5px)' },
          '75%': { transform: 'rotate(5deg) translateY(-3px)' },
        },
        avatarExplaining: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '25%': { transform: 'translateY(-8px) scale(1.02)' },
          '50%': { transform: 'translateY(-12px) scale(1.03)' },
          '75%': { transform: 'translateY(-8px) scale(1.02)' },
        },
        avatarLaughing: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg) scale(1)' },
          '25%': { transform: 'translateY(-5px) rotate(-3deg) scale(1.05)' },
          '50%': { transform: 'translateY(-10px) rotate(0deg) scale(1.08)' },
          '75%': { transform: 'translateY(-5px) rotate(3deg) scale(1.05)' },
        },
        avatarConcerned: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-3px) rotate(-2deg)' },
        },
        avatarProud: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-6px) scale(1.04)' },
        },
        avatarSilly: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg) scale(1)' },
          '25%': { transform: 'translateY(-5px) rotate(-8deg) scale(1.05)' },
          '50%': { transform: 'translateY(-8px) rotate(0deg) scale(1.08)' },
          '75%': { transform: 'translateY(-5px) rotate(8deg) scale(1.05)' },
        },
        avatarSurprised: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.15)' },
          '100%': { transform: 'scale(1.05)' },
        },
        avatarEncouraging: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-8px) scale(1.05)' },
        },
        avatarNod: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(5px) rotate(5deg)' },
        },
        avatarGesture: {
          '0%, 100%': { transform: 'translateX(0) rotate(0deg)' },
          '25%': { transform: 'translateX(-5px) rotate(-5deg)' },
          '75%': { transform: 'translateX(5px) rotate(5deg)' },
        },
        ringPulse: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        ringConcerned: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.08)' },
        },
      },
    },
  },
  plugins: [],
}

