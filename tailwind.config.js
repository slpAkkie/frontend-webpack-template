/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{pug,scss}"],

  theme: {
    extend: {
      //
    },
  },

  separator: '_',

  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
