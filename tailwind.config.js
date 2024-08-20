/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/**/*.{html,ts}'],
  theme: {
    extend: {},
    colors: {
      'red-primary': '#C73E3E',
      'red-error': '#CB1A14',
      'red-secondary': '#F9A7BB',
      'red-light': '#FFEEF2',
      'dark-primary': '#1B1818',
      'dark-secondary': '#6D6D6D',
      'grey-light': '#FAFAFA',
      'grey-900': '#101928',
      'grey-200': '#E4E7EC',
      'grey-400': '#98A2B3',
      'grey-600': '#475367',
      'grey-500': '#667185',
      'grey-100': '#F9FAFB',
      // gradient: "#AB0003",
    },
    screens: {
      sm: '300px',
      md: '640px',
      lg: '1024px',
    },
  },
  plugins: [],
};
