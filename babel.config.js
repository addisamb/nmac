module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
      'react-native-worklets/plugin',
    ],
  env: {
    // Release bundles shipped ~260 console statements, several printing full API
    // responses (emails, phone numbers, tokens). Strip them from production
    // builds; keep console.error so real crashes stay debuggable.
    production: {
      plugins: [['transform-remove-console', {exclude: ['error']}]],
    },
  },
};