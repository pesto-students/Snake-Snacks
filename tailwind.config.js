module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
        'sans': ['Bubblegum Sans', 'cursive']
    },
    screens: {
        '2xl': {'max': '1535px'},
        // => @media (max-width: 1535px) { ... }
  
        'xl': {'max': '1279px'},
        // => @media (max-width: 1279px) { ... }
        
        'lg': {'max': '1023px'},
        // => @media (max-width: 1023px) { ... }
        
        'mmd': { 'min': '767px' },
        'mlg': {'min': '1023px' },
  
        'md': {'max': '767px'},
        // => @media (max-width: 767px) { ... }
  
        'sm': {'max': '639px'},
        // => @media (max-width: 639px) { ... }
    },
    extend: {
        borderWidth: {
            "20": "20px",
            "xl": "4rem"
        },
        colors: {
          white: '#ffffff',
          lightGray: '#E7E2E2',
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
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
