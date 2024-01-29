/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    fontFamily: {
      'FoundryGridnik': ['FoundryGridnik'],
      'RobotoSlab': ['Roboto Slab', 'sans-serif']
    },
    backgroundColor: _theme => ({
      'white-bg': '#ededed',
      'black-bg': '#101010'
    }),
    colors: {
      'white-txt': '#ccc',
      'black-txt': '#333'
    }
  },
  plugins: [],
}