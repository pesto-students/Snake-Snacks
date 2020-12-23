module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      white: '#ffffff',
      bermudaGray: '#668AA7',
      vistaBlue: '#9CCFAD',
      springRain: '#9FD0AF',
      crail: '#C15143',
      mojo: '#C84E41',
      flax: '#EED688',
      tango: '#EF732D',
      burntSienna: '#EF7350',
      flaxShade: '#EFD887',
      springRain60: '#9fd0b0',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
