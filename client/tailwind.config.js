/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mainColor: "var(--mainColor)",
        mainColorDark: "var(--mainColorDark)",
        mainColorLight: "var(--mainColorLight)",
        mianBg: "var(--mainBg)",
        mainColorDarkSecond: "#112d4e",
      },
      boxShadow: {
        sp: "rgba(0, 0, 0, 0.05) 0rem 1.25rem 1.6875rem 0rem",
      },
    },
  },
  plugins: [],
};
