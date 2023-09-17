/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: "Poppins, sans-serif",
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
    },
    extend: {
      lineHeight: {
        11: "3rem",
      },
      colors: {
        primary: {
          // 0: "#FCECE8",
          // 100: "#F9DAD0",
          // 200: "#F6C7B9",
          // 300: "#F3B4A1",
          // 400: "#F0A18A",
          // 500: "#ED8F72",
          // 600: "#EA7C5B",
          // 700: "#E76943",
          800: "#533A71",
          // 900: "#C7421A",
        },
        secondary: {
          // 0: "#ECF7FE",
          // 100: "#D8EFFD",
          // 200: "#B1DFFB",
          // 300: "#8ACFF9",
          // 400: "#63BFF8",
          // 500: "#3BAFF6",
          // 600: "#159FF4",
          // 700: "#0A88D6",
          // 800: "#086FAF",
          // 900: "#065788",
        },
        accent: {
          0: "#FFFFFF",
          100: "#919191",
          // 200: "#F7F7F7",
          // 300: "#EFEFEF",
          // 400: "#D2D2D2",
          // 500: "#A5A5A5",
          // 600: "#797979",
          // 700: "#4C4C4C",
          800: "#212121",
          900: "#171717",
        },
        success: {
          0: "#BDEFE1",
          100: "#9CE7D2",
          200: "#6BDBBB",
          300: "#4AD3AC",
          400: "#30C59B",
          500: "#269F7C",
          600: "#208367",
          700: "#18634D",
          800: "#104234",
          900: "#0C3127",
        },
        error: {
          0: "#F6DFDF",
          100: "#EEBFBF",
          200: "#E59E9E",
          300: "#DD7E7E",
          400: "#D45E5E",
          500: "#CC3F40",
          600: "#B12F2F",
          700: "#912727",
          800: "#711E1E",
          900: "#511515",
        },
        warning: {
          0: "#FFF7D0",
          100: "#FFD285",
          200: "#FFBC47",
          300: "#EFA508",
          400: "#D48C00",
          500: "#BC7800",
          600: "#A36400",
          700: "#8C5100",
          800: "#763E00",
          900: "#612B00",
        },
        modalBackdrop: "rgba(0, 0, 0, .5)",
        overlayBackdrop: "rgba(0, 0, 0, .6)",
      },
      spacing: {
        76: "19rem",
        108: "27rem",
        124: "31rem",
        132: "33rem",
      },
      backgroundImage: {
        // pledgeBanner: "url('/assets/images/dashboard-cards/pledge-banner.svg')",
      },
    },
  },
  plugins: [],
};

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./src/**/*.{js,ts,jsx,tsx}"],
//   plugins: [
//     /* eslint-disable global-require */
//     require("tailwind-scrollbar-hide"),
//     /* eslint-enable global-require */
//   ],
// };
