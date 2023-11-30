import type {Config} from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        "3xl": "46.5px",
      },
    },
    extend: {
      fontFamily: {
        overpass: ["var(--font-overpass)"],
      },
      screens: {
        "3xl": "1920px",
      },
      colors: {
        primary: {
          blue: {
            main: "#009EE0",
            400: "#4CBBE9",
            300: "#80CEF0",
            200: "#B3E2F6",
            100: "#E5F5FC",
          },
          midBlue: {
            main: "#004594",
            400: "#4C7DB4",
            300: "#80A2C9",
            200: "#B3C7DF",
            100: "#E5ECF4",
          },
          black: {
            main: "#140F24",
          },
        },
        secondary: {
          offWhite: {
            main: "#E6ECF3",
            white: "#FFF",
          },
          green: "#179C6F",
          yellow: "#F7CC5F",
        },
      },
      height: {
        screen: [
          "100vh /* fallback for Opera, IE and etc. */",
          "100dvh",
        ] as unknown as string,
      },
    },
  },
  plugins: [require("@tailwindcss/container-queries"),

],
};
export default config;
