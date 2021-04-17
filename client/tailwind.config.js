const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/**/*.ts', './src/**/*.tsx'],
  darkMode: false,
  theme: {
    extend: {
      fontSize: {
        '7xl': '4.5rem',
        '8xl': '6rem',
        '9xl': '8rem',
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      maxHeight: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      fontFamily: {
        sans: ['Quicksand', ...defaultTheme.fontFamily.sans],
      },
      inset: {
        '-2': '-2px',
        full: '100%',
      },
      boxShadow: {
        container: '0px 4px 30px 0px rgba(0,0,0,0.06)',
      },
      colors: {
        primary: {
          default: '#0D2488',
          light: '#122c9d',
          dark: '#0a1c6c',
        },
      },
    },
  },
  plugins: [],
};
