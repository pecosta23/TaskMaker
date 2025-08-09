/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        creme: '#FDF6E3',
        marrom: '#3E2C24', // quase preto
        laranjaProgresso: '#e36811ff',
        cinzaClaro: '#D9D9D9',
      },
    },
  },
  plugins: [],
}
