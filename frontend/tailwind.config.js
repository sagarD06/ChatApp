/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        AuthBg:
          "url('https://w0.peakpx.com/wallpaper/818/148/HD-wallpaper-whatsapp-background-cool-dark-green-new-theme-whatsapp.jpg')",
      },
      colors: {
        buttonPrimary: "#00e958",
        buttonHover: "#00c245",
        background: "#6fffa9",
        darker: "#07602b",
        dark: "#003715",
        lighterDark: "#009638",
      },
    },
  },
  plugins: [require("daisyui")],
};
