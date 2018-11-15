'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _registrable = require('../mixins/registrable');

exports.default = {
  name: 'validatable',

  mixins: [(0, _registrable.inject)('formErrors', 'r-form')],

  data: function data() {
    return {
      errorBucket: [],
      errorMessages: [],
      hasFocused: false,
      hasInput: false,
      shouldValidate: false,
      valid: false
    };
  },


  props: {
    error: {
      type: Boolean
    },
    errorField: String,
    rules: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    validateOnBlur: Boolean
  },

  computed: {
    validations: function validations() {
      if (!Array.isArray(this.errorMessages)) {
        return [this.errorMessages];
      } else if (this.errorMessages.length > 0) {
        return this.errorMessages;
      } else if (this.shouldValidate) {
        return this.errorBucket;
      } else {
        return [];
      }
    },
    hasError: function hasError() {
      return this.validations.length > 0 || this.errorMessages.length > 0 || this.error;
    }
  },

  watch: {
    rules: {
      handler: function handler(newVal, oldVal) {
        // TODO: This handler seems to trigger when input changes, even though
        // rules array stays the same? Solved it like this for now
        if (newVal.length === oldVal.length) {
          return;
        }

        this.validate();
      },

      deep: true
    },

    formErrors: function formErrors() {
      var _this = this;

      var errors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      var isOwnError = function isOwnError(error) {
        return error && error.field && error.field === _this.errorField;
      };

      for (var i = 0; i < errors.length; ++i) {
        var error = errors[i];
        if (isOwnError(error)) {
          this.errorMessages.push(error.message);
        }
      }
    },
    inputValue: function inputValue(val) {
      // If it's the first time we're setting input,
      // mark it with hasInput
      if (!!val && !this.hasInput) {
        this.hasInput = true;
      }

      if (this.hasInput && !this.validateOnBlur) {
        this.shouldValidate = true;
      }
    },
    isFocused: function isFocused(val) {
      // If we're not focused, and it's the first time
      // we're defocusing, set shouldValidate to true
      if (!val && !this.hasFocused) {
        this.hasFocused = true;
        this.shouldValidate = true;

        this.$emit('update:error', this.errorBucket.length > 0);
      }
    },
    hasError: function hasError(val) {
      if (this.shouldValidate) {
        this.$emit('update:error', val);
      }
    },
    error: function error(val) {
      this.shouldValidate = !!val;
    }
  },

  mounted: function mounted() {
    this.shouldValidate = !!this.error;
    this.validate();
  },


  methods: {
    reset: function reset() {
      var _this2 = this;

      // TODO: Do this another way!
      // This is so that we can reset all types of inputs
      this.$emit('input', this.isMultiple ? [] : null);
      this.$emit('change', null);
      this.errorMessages = [];

      this.$nextTick(function () {
        _this2.shouldValidate = false;
        _this2.hasFocused = false;
        _this2.validate();
      });
    },
    validate: function validate() {
      var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.inputValue;

      if (value === null && this.shouldValidate) {
        this.errorBucket = [];
        return this.valid = this.optional;
      }

      if (force) {
        this.shouldValidate = true;
      }

      this.errorBucket = [];
      this.errorMessages = [];

      value = value || '';
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.rules[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var rule = _step.value;

          var valid = typeof rule === 'function' ? rule(value) : rule;

          if (this.optional && !value) {
            valid = true;
          }

          if (valid === false || typeof valid === 'string') {
            this.errorBucket.push(valid);
          } else if (valid !== true) {
            throw new TypeError('Rules should return a string or boolean, received \'' + (typeof valid === 'undefined' ? 'undefined' : _typeof(valid)) + '\' instead');
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this.valid = this.errorBucket.length === 0;

      return this.valid;
    }
  }
};