module.exports = {
  theme: {
    extend: {
      colors: {
        current: `currentColor`,
        transparent: `transparent`,
        black: `black`,
        white: `white`,
        grey: {
          100: `#F8F9FA`,
          200: `#E9ECEF`,
          300: `#DEE2E6`,
          400: `#CED4DA`,
          500: `#ADB5BD`,
          600: `#6C757D`,
          700: `#495057`,
          800: `#343A40`,
          900: `#212529`,
        },
        red: {
          100: `#D66464`,
        },
      },
      fontSize: {
        "2xs": [`11px`, `14.3px`],
        "xs": [`12px`, `24px`],
        "sm": [`14px`, `22.4px`],
        "base": [`16px`, `25.6px`],
        "lg": [`18px`, `28.8px`],
        "xl": [`20px`, `35px`],
        "2xl": [`24px`, `36px`],
        "3xl": [`30px`, `39px`],
        "4xl": [`36px`, `43.2px`],
        "5xl": [`48px`, `48px`],
        "6xl": [`60px`, `57px`],
        "7xl": [`72px`, `68.4px`],
        "8xl": [`96px`, `91.2px`],
        "9xl": [`108px`, `102.6px`],
        "10xl": [`160px`, `152px`],
      },
      fontWeight: {
        xthin: 100,
        thin: 200,
        light: 300,
        regular: 400,
        medium: 500,
        semi: 600,
        bold: 700,
        xbold: 800,
        black: 900,
      },
      fontFamily: {
        sans: [`Manrope`, `sans-serif`],
        mono: [`IBM Plex Mono`, `monospace`],
      },
    },
  },
};
