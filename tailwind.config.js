import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      // Palette inspired by the Blue Mosque at dawn:
      // Pale Sunset #E4D1C9, Hazy Blue #A6BCC4, Dome Blue #5B7586,
      // Stone Gray #9FA6A6, Rooftop Terracotta #9C5D4E, Foliage Green #2C482A
      colors: {
        brand: {
          50: '#f1f5f7',
          100: '#dfe8ec',
          200: '#c4d4db',
          300: '#a6bcc4',
          400: '#86a2af',
          500: '#6a8798',
          600: '#5b7586',
          700: '#4a606e',
          800: '#3d4f5b',
          900: '#33424c',
          950: '#1f2930',
        },
        // Neutral scale built around Stone Gray, replaces Tailwind's slate
        slate: {
          50: '#f7f5f3',
          100: '#efedea',
          200: '#e2e0dd',
          300: '#c9cccd',
          400: '#9fa6a6',
          500: '#6f7878',
          600: '#565f61',
          700: '#41494d',
          800: '#2c3438',
          900: '#1d2428',
          950: '#13191c',
        },
        sunset: {
          50: '#fbf8f6',
          100: '#f4ebe7',
          200: '#e4d1c9',
          300: '#d4b8ac',
        },
        terracotta: {
          50: '#faf1ee',
          100: '#f3e0da',
          200: '#e6c2b7',
          300: '#d49c8c',
          400: '#c07f6e',
          500: '#a96656',
          600: '#9c5d4e',
          700: '#804a3e',
          800: '#663b32',
          900: '#4f2e27',
        },
        foliage: {
          50: '#eef3ed',
          100: '#d9e4d7',
          300: '#93ae8f',
          400: '#76997a',
          500: '#4a6c47',
          600: '#3a5838',
          700: '#2c482a',
          800: '#233a22',
          900: '#1a2b19',
        },
      },
    },
  },
  plugins: [typography],
}
