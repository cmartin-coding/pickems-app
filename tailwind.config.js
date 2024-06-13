/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        // sans: ['Gill Sans'],
        // serif: ['Times New Roman'],
        sans: ["Lato-Italic"],
        serif: ["Romie-Trial-Bold"],
      },
      fontSize: {
        "2xs": "10px",
        xs: "13px",
        sm: "15px",
        md: "17px",
        // md: 17,
        // md: [17, { lineHeight: '1.5rem' }],
        lg: "20px",
        xl: "25px",
        "2xl": "35px",
        "3xl": "48px",
        "4xl": "65px",
      },

      colors: {},
      borderRadius: {
        borderRadius: {
          lg: "18px",
          xl: "26px",
        },
      },
      width: {
        modal: 330,
      },
      padding: {
        modal: 20,
      },
    },
  },
  plugins: [],
};