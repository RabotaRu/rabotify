'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                                               * Image methods
                                                                                                                                                                                                                                                                               *
                                                                                                                                                                                                                                                                               * @mixin
                                                                                                                                                                                                                                                                               *
                                                                                                                                                                                                                                                                               * Methods for the r-image component
                                                                                                                                                                                                                                                                               */


var _helpers = require('../../../util/helpers');

exports.default = {
  methods: {
    ensureSrcSetItem: function ensureSrcSetItem(option, index) {
      if ((typeof option === 'undefined' ? 'undefined' : _typeof(option)) === 'object') {
        return option;
      } else if (typeof option === 'string' || typeof option === 'number') {
        var size = this.getFormattedSize(option);
        var item = {
          size: index + 2 + 'x',
          src: option
        };
        if (size) {
          item.size = size;
          item.src = this.getSizedImage(size);
        }
      }
    },
    getFormattedSize: function getFormattedSize(size) {
      if ((typeof size === 'undefined' ? 'undefined' : _typeof(size)) === (0, _helpers.ensureNumber)(size)) {
        return size + 'x';
      }
      var unitsRegex = /^\d+[wx]$/i;
      return unitsRegex.test(size) ? size : null;
    },
    getSizedImage: function getSizedImage(size) {
      var defaultSuffix = '@';
      var extensionRegex = /\.(\w+)$/i;
      var nameRegex = /\/([a-zA-Zа-яА-ЯёЁ0-9_. -]+)\.\w+$/i;
      var fullNameRegex = /\/([a-zA-Zа-яА-ЯёЁ0-9_. -]+\.\w+)$/i;

      // checking for a proper image name
      if (!fullNameRegex.test(this.src)) {
        return this.src;
      }

      var extension = this.src.match(extensionRegex)[1];
      var name = this.src.match(nameRegex)[1];
      var pathTo = this.src.replace(fullNameRegex, '');

      return '' + pathTo + name + defaultSuffix + size + '.' + extension;
    }
  }
};