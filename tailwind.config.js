module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      borderWidth: {
        px: '1px',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
