'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = theme;
var THEME_DEFAULTS = {
  primary: '#ff5644',
  secondary: '#424b5c',
  accent: '#FBD91A',
  error: '#ff3928',
  info: '#00bcd4',
  success: '#00c853',
  warning: '#FFC107'
};

function theme(theme) {
  theme = theme || {};

  return Object.assign({}, THEME_DEFAULTS, theme);
}