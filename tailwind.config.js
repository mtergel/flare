module.exports = {
  mode: "jit",
  purge: {
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  },
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        // dodger-blue
        primary: {
          DEFAULT: "#3EA8FF",
          50: "#F6FBFF",
          100: "#E1F2FF",
          200: "#B8DFFF",
          300: "#90CDFF",
          400: "#67BAFF",
          500: "#3EA8FF",
          600: "#068FFF",
          700: "#0070CD",
          800: "#005295",
          900: "#00335D",
        },
        paper: "var(--color-paper)",
        base: "var(--color-bg)",
        border: "var(--color-border)",
      },
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      animation: {
        spinner: "spinner 1.5s linear infinite",
      },
      keyframes: {
        spinner: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      ringWidth: {
        DEFAULT: "2px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("nightwind")],
};
