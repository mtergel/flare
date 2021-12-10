module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
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
      boxShadow: {
        flare: "0 2px 4px #4385bb12",
        popover: "0 3px 12px -1px #04253f40",
      },
      animation: {
        spinner: "spinner 1.5s linear infinite",
        // dropdown
        slideUpAndFade: "slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideDownAndFade:
          "slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideRightAndFade:
          "slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideLeftAndFade:
          "slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",

        // general/overlay
        opacityFadeIn: "opacityFadeIn 150ms cubic-bezier(0.16, 1, 0.3, 1)",

        // dialog
        contentShow: "contentShow 200ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideUp: "slideUp 400ms cubic-bezier(0.16, 1, 0.3, 1)",

        // custom toast
        enter: "enter 200ms ease-out",
        leave: "leave 150ms ease-in forwards",
      },
      keyframes: {
        spinner: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        slideUpAndFade: {
          "0%": { opacity: 0, transform: "translateY(2px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        slideDownAndFade: {
          "0%": { opacity: 0, transform: "translateY(-2px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        slideRightAndFade: {
          "0%": { opacity: 0, transform: "translateX(-2px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        slideLeftAndFade: {
          "0%": { opacity: 0, transform: "translateX(2px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        opacityFadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        contentShow: {
          "0%": { opacity: 0, transform: "translate(-50%, -48%)" },
          "100%": { opacity: 1, transform: "translate(-50%, -50%)" },
        },
        slideUp: {
          "0%": { transform: "translateY(4px)" },
          "100%": { transform: "translateY(0)" },
        },
        enter: {
          "0%": { transform: "scale(0.9)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        leave: {
          "0%": { transform: "scale(1)", opacity: 1 },
          "100%": { transform: "scale(0.9)", opacity: 0 },
        },
      },
      ringWidth: {
        DEFAULT: "2px",
      },
      borderColor: (theme) => ({
        ...theme("colors"),
        DEFAULT: theme("colors.border", "currentColor"),
      }),
      fill: (theme) => ({
        current: "currentColor",
        paper: "var(--color-paper)",
        black: theme("colors.black"),
        white: theme("colors.white"),
      }),

      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.tDefault"),

            "pre code::before": {
              "padding-left": "unset",
            },
            "pre code::after": {
              "padding-right": "unset",
            },
            img: {
              margin: "1.5rem auto",
              display: "table",
              maxWidth: "100%",
              height: "auto",
            },
            code: {
              backgroundColor: theme("colors.gray.100"),
              fontWeight: "normal",
              "border-radius": "6px",
              padding: ".2em .4em",
              margin: 0,
              fontSize: "85%",
            },
            "code::before": {
              content: '""',
            },
            "code::after": {
              content: '""',
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
    // nightwind: {
    //   typography: true,
    // },
  },
  variants: {
    extend: {
      typography: ["dark"],
    },
  },
  plugins: [
    require("nightwind"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
  ],
};
