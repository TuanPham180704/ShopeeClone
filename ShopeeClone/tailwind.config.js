const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}' // 👈 rất quan trọng
  ],
  corePlugins: {
    container : false
  },
  theme: {
    extend: {
      colors: {
        orange: '#ee4d2d'
      }
    }
  },
  plugins: [
    plugin(function({addComponents,theme}){
      addComponents({
        '.container' : {
          maxWith: theme('columns.7xl'),
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: theme('spacing.4'),
          paddingRight: theme('spacing.4'),
        }
      })
    })
  ]
}
