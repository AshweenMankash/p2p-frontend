import type { Config } from 'tailwindcss'

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderWidth: {
        DEFAULT: '1px',
        '0': '0.1px'
      },
      backgroundImage: {
        "hero": "~/images/background.jpg"
      },
      height: {
        "9lvh": "90lvh"
      },
      
      keyframes: {
        shadowDrop: {
          '0%': { transform: 'translate(400%, 400%) scale(40)', transformOrigin:'0% 0%',},
          "20%":    {transform:'scale(4)'},  
          '100%': { transform: 'scale(10) translate(0%, 0%)', transformOrigin:'100% 100%', },
        }
      },
      animation:{
        shadowDrop: 'shadowDrop 5s cubic-bezier(0.22, 0.6 , 0.2, 0.1) both'
      },
      colors:{
        "blurBackground": "--tw-bg-opacity: 0.6; background-color: rgb(255 255 255 / var(--tw-bg-opacity));"
      }

    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
} satisfies Config

