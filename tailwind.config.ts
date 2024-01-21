import type { Config } from 'tailwindcss'

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderWidth:{
      DEFAULT: '1px',
      '0': '0.1px'
    },
    backgroundImage:{
      "hero": "~/images/background.jpg"
    }
    },
  },
  plugins: [],
} satisfies Config

