/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./assets/website/**/*.js",
    "./templates/**/*.html.twig",
  ],  theme: {
    extend: {},
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
    }
  },
  plugins: [],
}
