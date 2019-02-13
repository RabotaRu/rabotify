import {
  inject as RegistrableInject
} from '../mixins/registrable';

export default {
  name: 'validatable',

  mixins: [
    RegistrableInject('formErrors', 'r-form')
  ],

  data () {
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
      default: () => []
    },
    validateOnBlur: Boolean
  },

  computed: {
    validations () {
      if (!Array.isArray(this.errorMessages)) {
        return [ this.errorMessages ];
      } else if (this.errorMessages.length > 0) {
        return this.errorMessages;
      } else if (this.shouldValidate) {
        return this.errorBucket;
      } else {
        return [];
      }
    },
    hasError () {
      return this.validations.length > 0 ||
        this.errorMessages.length > 0 ||
        this.error;
    }
  },

  watch: {
    rules: {
      handler (newVal, oldVal) {
        // TODO: This handler seems to trigger when input changes, even though
        // rules array stays the same? Solved it like this for now
        if (newVal.length === oldVal.length) {
          return;
        }

        this.validate();
      },
      deep: true
    },

    formErrors (errors = []) {
      const isOwnError = error => error && error.field && error.field === this.errorField;

      for (let i = 0; i < errors.length; ++i) {
        const error = errors[ i ];
        if (isOwnError(error)) {
          this.errorMessages.push(error.user_message || error.system_message || error.message);
        }
      }
    },

    inputValue (val) {
      // If it's the first time we're setting input,
      // mark it with hasInput
      if (!!val && !this.hasInput) {
        this.hasInput = true;
      }

      if (this.hasInput && !this.validateOnBlur) {
        this.shouldValidate = true;
      }
    },

    isFocused (val) {
      // If we're not focused, and it's the first time
      // we're defocusing, set shouldValidate to true
      if (!val && !this.hasFocused) {
        this.hasFocused = true;
        this.shouldValidate = true;

        this.$emit('update:error', this.errorBucket.length > 0);
      }
    },

    hasError (val) {
      if (this.shouldValidate) {
        this.$emit('update:error', val);
      }
    },

    error (val) {
      this.shouldValidate = !!val;
    }
  },

  mounted () {
    this.shouldValidate = !!this.error;
    this.validate();
  },

  methods: {
    reset () {
      // TODO: Do this another way!
      // This is so that we can reset all types of inputs
      this.$emit('input', this.isMultiple ? [] : null);
      this.$emit('change', null);
      this.errorMessages = [];

      this.$nextTick(() => {
        this.shouldValidate = false;
        this.hasFocused = false;
        this.validate();
      });
    },
    validate (force = false, value = this.inputValue) {
      if (value === null && this.shouldValidate) {
        this.errorBucket = [];
        return (this.valid = this.optional);
      }

      if (force) {
        this.shouldValidate = true;
      }

      this.errorBucket = [];
      this.errorMessages = [];

      value = value || '';
      for (const rule of this.rules) {
        let valid = typeof rule === 'function' ? rule(value) : rule;

        if (this.optional && !value) {
          valid = true;
        }

        if (valid === false || typeof valid === 'string') {
          this.errorBucket.push(valid);
        } else if (valid !== true) {
          throw new TypeError(`Rules should return a string or boolean, received '${typeof valid}' instead`);
        }
      }

      this.valid = this.errorBucket.length === 0;

      return this.valid;
    }
  }
};
