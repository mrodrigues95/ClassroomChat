const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {
      inset: {
        '-2': '-2px',
        'full': '100%'
      },
      fontFamily: {
        sans: ['Quicksand', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        container: '0px 4px 30px 0px rgba(0,0,0,0.06)',
      },
      colors: {
        primary: {
          default: '#0D2488',
          light: '#1431AF',
          dark: '#061553',
        },
      },
    },
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'active'],
  },
  plugins: [],
};
