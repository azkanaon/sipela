/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        aqua: "#003B46",
        ice: "#A1D6E2",
        overpost: "#F1F1F2",
        glacier_blue: "#1995AD",
        ocean: "#07575B",
        wave: "#66A5AD",
        seaform: "#C4DFE6",
        warm_grey: "#BCBABE",
      },
      backgroundImage: {
        backgroundLogin: "url('/backgroundLogin.jpeg')",
      },
    },
  },
  plugins: [daisyui],

  daisyui: {
    themes: false,
    darkTheme: "light", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
};
