/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        creme: '#e3dbc8ff',
        marrom: '#302f2c', // quase preto
        laranjaProgresso: '#e36811ff',
        azulProgresso:'#11a0e3ff',
        verdeProgresso:'#35f02fff',
        rosaProgresso:'#eb2ebfff',
        cinzaEscuro: '#666464ff',
        cinzaClaro: '#c2c2c2ff'
      },
    },
  },
  plugins: [],
}
