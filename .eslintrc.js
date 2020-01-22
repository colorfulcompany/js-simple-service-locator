module.exports = {
  extends: [
    'standard',
    'plugin:jsdoc/recommended'
  ],
  rules: {
    'jsdoc/require-param-description': 'off',
    'jsdoc/require-returns-description': 'off'
  },
  settings: {
    jsdoc: {
      tagNamePreference: {
        returns: 'return'
      }
    }
  }
}
