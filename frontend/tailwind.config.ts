import type {Config} from "tailwindcss";
import plugin from "tailwindcss/plugin";

function toFixed(value: number) {
  return parseFloat(value.toFixed(4));
}

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/wp-templates/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/wp-blocks/**/*.{js,ts,jsx,tsx,mdx}",
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
      letterSpacing: {
        tight: "-0.01em",
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
            background: "#050014",
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
        "eerie-black": "#0F1424",
      },
      height: {
        screen: [
          "100vh /* fallback for Opera, IE and etc. */",
          "100svh",
        ] as unknown as string,
      },
    },
  },
  plugins: [
    require("@tailwindcss/container-queries"),
    require("@tailwindcss/typography"),
    plugin(function ({matchUtilities}) {
      matchUtilities(
        {
          "min-max": (value) => {
            const arr = value.split(" ");
            if (arr.length !== 2 && arr.length !== 4) return null;

            const minFontSize = Number(arr[0]);
            const maxFontSize = Number(arr[1]);
            const minWidth = Number(arr[2]) || 375;
            const maxWidth = Number(arr[3]) || 1280;

            if (minFontSize > maxFontSize || minWidth > maxWidth) return null;

            const slope = (maxFontSize - minFontSize) / (maxWidth - minWidth);
            const yAxisIntersection = toFixed(-minWidth * slope + minFontSize);

            const min = `${minFontSize}px`;
            const max = `${maxFontSize}px`;
            const preferred = `${yAxisIntersection}px + ${toFixed(
              slope * 100
            )}vw`;

            return {
              "font-size": `clamp(${min}, ${preferred}, ${max})`,
            };
          },
        },
        {
          values: {
            "20px": "1 20",
          },
        }
      );
    }),
    plugin(function ({addComponents}) {
      addComponents({
        ".container-fluid": {
          width: "100%",
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: "1.25rem",
          paddingRight: "1.25rem",
          maxWidth: "2550px",
          "@screen xl": {
            paddingLeft: "1.5rem",
            paddingRight: "1.5rem",
          },
        },
        ".heading-2": {
          fontSize: "40px",
          fontWeight: "700",
          lineHeight: "140%",
          letterSpacing: "-0.01em",
          "@screen lg": {
            fontSize: "48px",
          },
          "@screen xl": {
            fontSize: "64px",
          },
        },
        ".heading-3": {
          fontSize: "30px",
          fontWeight: "700",
          lineHeight: "140%",
          letterSpacing: "-0.01em",
          "@screen xl": {
            fontSize: "48px",
          },
        },
      });
    }),
  ],
};
export default config;
