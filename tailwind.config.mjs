/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Victorian Dark Academia Color Palette
        parchment: '#f4f1e8',
        moss: '#6b7c32',
        plum: '#5d2e5d',
        brass: '#b5651d',
        charcoal: '#2c2c2c',
        sepia: '#704214',
        rust: '#a0522d',
        'forest-shadow': '#3d4a1a',
        cream: '#faf8f3',
        sage: '#87a96b',
        // Seasonal variations
        spring: '#9db665',
        summer: '#4a5d23',
        autumn: '#d4a574',
        winter: '#6b7b8c',
      },
      fontFamily: {
        'heading': ['Cormorant Garamond', 'serif'],
        'secondary': ['Playfair Display', 'serif'], 
        'body': ['Lora', 'serif'],
        'ui': ['Raleway', 'sans-serif'],
      },
      fontSize: {
        'hero': ['3.5rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'title': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
      },
      spacing: {
        'xs': '0.5rem',
        'sm': '1rem', 
        'md': '1.5rem',
        'lg': '2rem',
        'xl': '3rem',
      },
      boxShadow: {
        'soft': '0 2px 8px rgba(44, 44, 44, 0.1)',
        'medium': '0 4px 16px rgba(44, 44, 44, 0.15)',
        'strong': '0 8px 24px rgba(44, 44, 44, 0.2)',
        'mystical': '0 0 20px rgba(107, 124, 50, 0.4)',
      },
      borderColor: {
        'mystical': '#6b7c32',
        'decorative': '#704214',
      },
      borderWidth: {
        'mystical': '2px',
        'decorative': '1px',
      },
      maxWidth: {
        'container': '1920px',
      },
      backgroundImage: {
        'parchment-texture': 'radial-gradient(circle at 25% 25%, #faf8f3 0%, transparent 50%), radial-gradient(circle at 75% 75%, #87a96b 0%, transparent 50%)',
      },
      animation: {
        'mystical-glow': 'mysticalGlow 3s infinite',
        'floating': 'floating 6s ease-in-out infinite',
        'floating-spore': 'floatingSpore 8s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        mysticalGlow: {
          '0%, 100%': { 
            filter: 'drop-shadow(0 0 5px #6b7c32)', 
            opacity: '1' 
          },
          '50%': { 
            filter: 'drop-shadow(0 0 15px #6b7c32)', 
            opacity: '0.8' 
          },
        },
        floating: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        floatingSpore: {
          '0%, 100%': { 
            transform: 'translateY(0px) translateX(0px) scale(1)',
            opacity: '0.6'
          },
          '25%': { 
            transform: 'translateY(-20px) translateX(10px) scale(1.2)',
            opacity: '0.8'
          },
          '50%': { 
            transform: 'translateY(-10px) translateX(-15px) scale(0.8)',
            opacity: '0.4'
          },
          '75%': { 
            transform: 'translateY(-30px) translateX(5px) scale(1.1)',
            opacity: '0.7'
          },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};