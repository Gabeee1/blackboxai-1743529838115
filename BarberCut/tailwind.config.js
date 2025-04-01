module.exports = {
  content: [
    './index.html',
    './schedule.html'
  ],
  theme: {
    extend: {
      colors: {
        'barbercut-black': '#000000',
        'barbercut-gray': {
          100: '#F8F9FA',
          200: '#E9ECEF',
          300: '#DEE2E6',
          400: '#CED4DA',
          500: '#ADB5BD',
          600: '#6C757D',
          700: '#495057',
          800: '#343A40',
          900: '#212529',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}