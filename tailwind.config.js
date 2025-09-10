// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Cores Rotary Brand Guidelines
      colors: {
        rotary: {
          blue: '#17458f',
          gold: '#f7a81b',
          'blue-mono': '#0067c8',
          'interact-blue': '#00a2e0',
          'rotaract-magenta': '#d41367',
        },
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#17458f', // Rotary Blue
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        secondary: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f7a81b', // Rotary Gold
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        }
      },
      
      // Fontes - Usando Open Sans como padrão Rotary
      fontFamily: {
        sans: ['Open Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Consolas', 'monospace'],
      },
      
      // Espaçamentos customizados
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      // Bordas arredondadas
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      
      // Sombras customizadas Rotary
      boxShadow: {
        'rotary': '0 4px 6px -1px rgba(23, 69, 143, 0.1), 0 2px 4px -1px rgba(23, 69, 143, 0.06)',
        'rotary-lg': '0 10px 15px -3px rgba(23, 69, 143, 0.1), 0 4px 6px -2px rgba(23, 69, 143, 0.05)',
        'rotary-xl': '0 20px 25px -5px rgba(23, 69, 143, 0.1), 0 10px 10px -5px rgba(23, 69, 143, 0.04)',
        'gold': '0 4px 6px -1px rgba(247, 168, 27, 0.1), 0 2px 4px -1px rgba(247, 168, 27, 0.06)',
        'gold-lg': '0 10px 15px -3px rgba(247, 168, 27, 0.1), 0 4px 6px -2px rgba(247, 168, 27, 0.05)',
      },
      
      // Gradientes customizados
      backgroundImage: {
        'gradient-rotary': 'linear-gradient(135deg, #17458f 0%, #0067c8 100%)',
        'gradient-rotary-gold': 'linear-gradient(135deg, #f7a81b 0%, #e6971a 100%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      
      // Animações customizadas
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'fade-in-down': 'fadeInDown 0.5s ease-out',
        'fade-in-left': 'fadeInLeft 0.5s ease-out',
        'fade-in-right': 'fadeInRight 0.5s ease-out',
        'slide-in-bottom': 'slideInBottom 0.3s ease-out',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      
      // Keyframes customizados
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInBottom: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      
      // Breakpoints customizados
      screens: {
        'xs': '475px',
        '3xl': '1600px',
      },
      
      // Z-index scale
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
      
      // Tamanhos máximos
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      
      // Altura mínima
      minHeight: {
        '12': '3rem',
        '16': '4rem',
        '20': '5rem',
      },
    },
  },
  plugins: [
    // Plugin customizado para utilitários Rotary
    function({ addUtilities }) {
      const newUtilities = {
        '.text-shadow': {
          textShadow: '0 2px 4px rgba(0,0,0,0.10)',
        },
        '.text-shadow-md': {
          textShadow: '0 4px 8px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08)',
        },
        '.text-shadow-lg': {
          textShadow: '0 15px 30px rgba(0,0,0,0.11), 0 5px 15px rgba(0,0,0,0.08)',
        },
        '.text-shadow-none': {
          textShadow: 'none',
        },
        
        // Glassmorphism effect
        '.glass': {
          background: 'rgba(255, 255, 255, 0.25)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
        },
        
        // Rotary button styles
        '.btn-rotary': {
          background: 'linear-gradient(135deg, #17458f 0%, #0067c8 100%)',
          color: 'white',
          padding: '0.75rem 1.5rem',
          borderRadius: '0.5rem',
          fontWeight: '500',
          transition: 'all 0.2s ease',
          border: 'none',
          cursor: 'pointer',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 10px 15px -3px rgba(23, 69, 143, 0.1)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        
        '.btn-rotary-gold': {
          background: 'linear-gradient(135deg, #f7a81b 0%, #e6971a 100%)',
          color: 'white',
          padding: '0.75rem 1.5rem',
          borderRadius: '0.5rem',
          fontWeight: '500',
          transition: 'all 0.2s ease',
          border: 'none',
          cursor: 'pointer',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 10px 15px -3px rgba(247, 168, 27, 0.1)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        
        // Hover effects
        '.hover-lift': {
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          },
        },
        
        // Utility classes para Rotary
        '.rotary-gradient': {
          background: 'linear-gradient(135deg, #17458f 0%, #0067c8 100%)',
        },
        
        '.rotary-gold-gradient': {
          background: 'linear-gradient(135deg, #f7a81b 0%, #e6971a 100%)',
        },
        
        '.rotary-shadow': {
          boxShadow: '0 4px 6px -1px rgba(23, 69, 143, 0.1), 0 2px 4px -1px rgba(23, 69, 143, 0.06)',
        },
        
        '.rotary-shadow-lg': {
          boxShadow: '0 10px 15px -3px rgba(23, 69, 143, 0.1), 0 4px 6px -2px rgba(23, 69, 143, 0.05)',
        },
        
        // Card styles
        '.card-rotary': {
          backgroundColor: 'white',
          borderRadius: '0.75rem',
          boxShadow: '0 4px 6px -1px rgba(23, 69, 143, 0.1), 0 2px 4px -1px rgba(23, 69, 143, 0.06)',
          padding: '1.5rem',
          border: '1px solid #e5e7eb',
        },
        
        '.card-rotary-hover': {
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 15px -3px rgba(23, 69, 143, 0.1), 0 4px 6px -2px rgba(23, 69, 143, 0.05)',
          },
        },
      }
      
      addUtilities(newUtilities)
    },
  ],
}
