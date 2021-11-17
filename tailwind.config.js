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
        tDefault: "var(--color-text-default)",
        tMuted: "var(--color-text-muted)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
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
      borderColor: (theme) => ({
        ...theme("colors"),
        DEFAULT: theme("colors.border", "currentColor"),
      }),
      fill: {
        paper: "var(--color-paper)",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.tDefault"),
            pre: {
              backgroundColor: "inherit",
              paddingRight: 0,
              paddingLeft: 0,
              marginLeft: 0,
              marginRight: 0,
            },
            h1: {
              paddingBottom: ".2em",
              marginBottom: "1.1rem",
              borderBottom: `1px solid ${theme("colors.border")}`,
            },
            a: {
              color: theme("colors.primary.600"),
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            },
          },
        },
      }),
    },
    nightwind: {
      typography: true,
    },
  },
  variants: {
    extend: {
      typography: ["dark"],
    },
  },
  plugins: [require("nightwind"), require("@tailwindcss/typography")],
};
