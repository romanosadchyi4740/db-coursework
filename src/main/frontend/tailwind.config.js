/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bookstore: {
          // New sophisticated brown palette
          primary: '#8B4513', // Saddle Brown - rich, deep brown
          secondary: '#CD853F', // Peru - warm, golden brown
          accent: '#DEB887', // Burlywood - soft, light brown
          light: '#F5DEB3', // Wheat - very light brown
          lighter: '#FAF0E6', // Linen - almost white with brown tint
          dark: '#654321', // Dark Brown - deep, rich brown
          darker: '#3E2723', // Dark Chocolate - very dark brown

          // Background colors
          paper: '#FEFCF8', // Warm white with brown undertone
          surface: '#FDF8F3', // Soft cream with brown tint

          // Accent colors
          gold: '#DAA520', // Goldenrod - warm gold
          copper: '#B87333', // Copper - metallic brown
          amber: '#FF8C00', // Dark Orange - warm accent

          // Status colors
          success: '#556B2F', // Dark Olive Green - earthy success
          warning: '#D2691E', // Chocolate - warm warning
          error: '#8B0000', // Dark Red - deep error
          info: '#4682B4', // Steel Blue - cool info
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Crimson Text', 'serif'],
      },
      backgroundImage: {
        'paper-texture':
          'url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23faf0e6" fill-opacity="0.4"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')',
        'wood-grain':
          'url(\'data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23deb887" fill-opacity="0.1"%3E%3Cpath d="M0 0h100v100H0z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')',
        'gradient-primary': 'linear-gradient(135deg, #8B4513 0%, #CD853F 100%)',
        'gradient-secondary':
          'linear-gradient(135deg, #CD853F 0%, #DEB887 100%)',
        'gradient-accent': 'linear-gradient(135deg, #DEB887 0%, #F5DEB3 100%)',
      },
      boxShadow: {
        book: '0 4px 6px -1px rgba(139, 69, 19, 0.1), 0 2px 4px -1px rgba(139, 69, 19, 0.06)',
        'book-hover':
          '0 10px 15px -3px rgba(139, 69, 19, 0.1), 0 4px 6px -2px rgba(139, 69, 19, 0.05)',
        elegant:
          '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'brown-glow': '0 0 20px rgba(139, 69, 19, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
