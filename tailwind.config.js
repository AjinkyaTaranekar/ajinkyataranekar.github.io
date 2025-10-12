/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  darkMode: ["class", '[data-theme="luxury"]'],
  theme: {
    screens: {
      xs: "360px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      fontSize: {
        "2xs": "0.625rem", // For extremely small text
      },
      spacing: {
        72: "18rem",
        84: "21rem",
        96: "24rem",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("daisyui"),
  ],
  daisyui: {
    themes: [
      {
        luxury: {
          primary: "#003d80",
          "primary-focus": "#00284d",
          "primary-content": "#ffffff",
          secondary: "#7c3aed",
          accent: "#f59e0b",
          neutral: "#1a1a2e",
          "base-100": "#0f0f1e",
          "base-200": "#16152d",
          "base-300": "#1e1e3f",
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272",
        },
        light: {
          primary: "#003d80",
          "primary-focus": "#00284d",
          "primary-content": "#ffffff",
          secondary: "#7c3aed",
          accent: "#f59e0b",
          neutral: "#2a2e37",
          "base-100": "#ffffff",
          "base-200": "#f9fafb",
          "base-300": "#f3f4f6",
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272",
        },
      },
    ],
    darkTheme: "luxury",
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: false,
    themeRoot: ":root",
  },
};
