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

      colors: {
        "pickems-blue": "#0000FF",
        "pickems-base-blue": "#3F3FFF",
        "pickems-light-blue": "#72BEFF",
        "pickems-blue-complement": "#ffff00",
        "pickems-background-blue": "#e3e4e8",
        "pickems-dark-blue": "#03002e",
        "cardinals-primary": "#97233F",
        "cardinals-secondary": "#000000",
        "cardinals-tertiary": "#FFB612",
        "falcons-primary": "#A71930",
        "falcons-secondary": "#000000",
        "falcons-tertiary": "#A5ACAF",
        "ravens-primary": "#241773",
        "ravens-secondary": "#000000",
        "ravens-tertiary": "#9E7C0C",
        "bills-primary": "#00338D",
        "bills-secondary": "#C60C30",
        "panthers-primary": "#0085CA",
        "panthers-secondary": "#101820",
        "panthers-tertiary": "#BFC0BF",
        "bears-secondary": "#0B162A",
        "bears-primary": "#C83803",
        "bengals-primary": "#FB4F14",
        "bengals-seondary": "#000000",
        "browns-primary": "#311D00",
        "browns-secondary": "#FF3C00",
        "browns-tertiary": "#FFFFFF",
        "cowboys-primary": "#003594",
        "cowboys-secondary": "#041E42",
        "cowboys-tertiary": "#869397",
        "broncos-primary": "#FB4F14",
        "broncos-secondary": "#002244",
        "lions-primary": "#0076B6",
        "lions-secondary": "#B0B7BC",
        "lions-tertiary": "#000000",
        "packers-primary": "#203731",
        "packers-secondary": "#FFB612",
        "texans-secondary": "#03202F",
        "texans-primary": "#A71930",
        "colts-primary": "#002C5F",
        "colts-secondary": "#A2AAAD",
        "jaguars-primary": "#D7A22A",
        "jaguars-secondary": "#D7A22A",
        "jaguars-tertiary": "#9F792C",
        "chiefs-primary": "#E31837",
        "chiefs-secondary": "#FFB81C",
        "raiders-primary": "#000000",
        "raiders-secondary": "#A5ACAF",
        "chargers-primary": "#0080C6",
        "chargers-secondary": "#FFC20E",
        "chargers-tertiary": "#FFFFFF",
        "rams-primary": "#003594",
        "rams-secondary": "#003594",
        "rams-tertiary": "#FF8200",
        "dolphins-primary": "#008E97",
        "dolphins-secondary": "#FC4C02",
        "dolphins-tertiary": "#005778",
        "vikings-primary": "#4F2683",
        "vikings-secondary": "#FFC62F",
        "patriots-primary": "#002244",
        "patriots-secondary": "#C60C30",
        "patriots-tertiary": "#B0B7BC",
        "saints-primary": "#D3BC8D",
        "saints-secondary": "#101820",
        "giants-secondary": "#0B2265",
        "giants-primary": "#A71930",
        "giants-tertiary": "#A5ACAF",
        "jets-primary": "#125740",
        "jets-secondary": "#000000",
        "jets-tertiary": "#FFFFFF",
        "eagles-primary": "#004C54",
        "eagles-secondary": "#A5ACAF",
        "eagles-tertiary": "#000000",
        "steelers-primary": "#FFB612",
        "steelers-secondary": "#101820",
        "49ers-primary": "#AA0000",
        "49ers-secondary": "#B3995D",
        "seahawks-secondary": "#002244",
        "seahawks-primary": "#69BE28",
        "seahawks-tertiary": "#A5ACAF",
        "buccaneers-primary": "#D50A0A",
        "buccaneers-secondary": "#FF7900",
        "buccaneers-tertiary": "#0A0A08",
        "titans-secondary": "#0C2340",
        "titans-primary": "#4B92DB",
        "titans-tertiary": "#C8102E",
        "commanders-primary": "#5A1414",
        "commanders-secondary": "#FFB612",

        "dark-green": "#2D6A4F",
        "light-green": "#D8F3DC",
      },
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
