module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        arial: ["Arial", "sans-serif"],
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        lightGrey: '#808080',
        lightGrey1: '#BFBFBF',
        lightGrey2: '#A6A6A6',
        grey: '#4D4D4D',
        darkGrey: '#404040',
      },
      screens: {
        'sm': '640px',
        // => @media (min-width: 640px) { ... }

        'md': '768px',
        // => @media (min-width: 768px) { ... }

        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }

        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }

        '2xl': '1600px',
        // => @media (min-width: 1600px) { ... }

        '3xl': '1700px',
        // => @media (min-width: 1700px) { ... }

        '4xl': '2200px'
        // => @media (min-width: 2200px) { ... }
      },
      spacing: {
        first: '325px',
        second: '660px',
        third: '995px',
        fourth: '1330px',
        fifth: '1665px',
        sixth: '2000px',
        miniFirst: '200px',
        miniSecond: '623px',
        miniThird: '834px',
        miniFourth: '1256px',
        miniFifth: '1678px',
      },
      margin: {
        'm5': '-5px'
      },
      padding: {
        '3.75': '15px'
      },
      height: {
        '58': '232px'
      },
      lineHeight: {
        '4.5': '18px'
      }
    },
    borderWidth: {
      '1.5': '1.5px',
      '2' : '2px'
    }
  },
  plugins: [],
};
