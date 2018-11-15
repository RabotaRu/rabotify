module.exports = {
  root: true,
  plugins: [
    'vue',
    'html'
  ],
  globals: {
    'expect': true,
    'describe': true,
    'it': true,
    'jest': true
  },
  env: {
    "es6": true,
    "node": true,
    "browser": true
  },
  parser: "babel-eslint",
  parserOptions: {
    "sourceType": "module"
  }
};
