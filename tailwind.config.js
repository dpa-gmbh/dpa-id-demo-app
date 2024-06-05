/* eslint-env node */
const tailwindConfig = require('@dpa-id-components/dpa-shared-components/tailwindConfig')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.vue', './node_modules/@dpa-id-components/dpa-shared-components/**/*.mjs'],
  ...tailwindConfig,
  theme: {
    ...tailwindConfig.theme,
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1165px', // necessary to align with the breakpoint in dpa-id-auth project.
      xl: '1280px',
      xxl: '1600px'
    },
    extend: {
      ...tailwindConfig.theme.extend,
      borderRadius: {
        '4xl': '40px'
      }
    }
  }
}
