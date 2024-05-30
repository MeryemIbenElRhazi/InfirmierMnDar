/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        white: '#ffffff', // Changer l'arrière-plan en blanc
        primary: "#161622",
        secondary: {
          DEFAULT: "#29CCB1", // Changer l'orange en #29CCB1
          100: "#FF9001",
          200: "#29CCB1",
        },
        black: {
          DEFAULT: "#ffffff",
          100: "#1E1E2D",
          200: "#29CCB1",
        },
        gray: {
          100: "#000000",
        },
      },
      fontFamily: {
        pthin: ["Poppins-Thin", "sans-serif"],
        pextralight: ["Poppins-ExtraLight", "sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
        pextrabold: ["Poppins-ExtraBold", "sans-serif"],
        pblack: ["Poppins-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};
