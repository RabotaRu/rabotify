<script>
  import Colorable from '../../mixins/colorable';
  import Input from '../../mixins/input';
  import CleaveMaskable from '../../mixins/cleave-maskable';

  export default {
    name: 'r-text-field',

    mixins: [
      Colorable,
      Input,
      CleaveMaskable
    ],

    inheritAttrs: false,

    data () {
      return {
        initialValue: null,
        inputHeight: null,
        internalChange: false,
        badInput: false,
        lazySelection: 0
      };
    },

    props: {
      autofocus: Boolean,
      autoGrow: Boolean,
      box: Boolean,
      clearable: Boolean,
      color: String,
      counter: [
        Boolean,
        Number,
        String
      ],
      fullWidth: Boolean,
      multiLine: Boolean,
      placeholder: String,
      prefix: String,
      rows: {
        default: 5
      },
      singleLine: Boolean,
      solo: Boolean,
      suffix: String,
      textarea: Boolean,
      noResize: Boolean,
      small: Boolean,
      large: Boolean,
      type: {
        type: String,
        default: 'text'
      }
    },

    computed: {
      classes () {
        const classes = {
          'input-group_text-field': true,
          'input-group_text-field-box': this.box,
          'input-group_single-line': this.singleLine || this.solo,
          'input-group_solo': this.solo,
          'input-group_multi-line': this.multiLine,
          'input-group_full-width': this.fullWidth,
          'input-group_prefix': this.prefix,
          'input-group_suffix': this.suffix,
          'input-group_textarea': this.textarea,
          'input-group_no-resize': this.noResize || this.autoGrow
        };

        if (this.hasError) {
          classes['text_error'] = true;
        } else {
          return this.addTextColorClassChecks(classes);
        }

        return classes;
      },
      inputLength () {
        if (this.inputValue) {
          return this.inputValue.toString().length;
        }
        return 0;
      },
      count () {
        return `${this.inputLength} / ${this.counterLength}`;
      },
      counterLength () {
        const parsedLength = parseInt(this.counter, 10);
        return isNaN(parsedLength) ? 25 : parsedLength;
      },
      inputValue: {
        get () {
          return this.lazyValue;
        },
        set (val) {
          if (this.cleaveMask && typeof window !== 'undefined') {
            this.$nextTick(_ => {
              this.lazyValue = val ? this.cleave.getFormattedValue() : val;
              this.$emit('input', this.lazyValue);
            });
          } else {
            this.lazyValue = val;
            this.$emit('input', this.lazyValue);
          }
        }
      },
      isDirty () {
        return this.lazyValue != null &&
          this.lazyValue.toString().length > 0 ||
          this.badInput ||
          [ 'time', 'date', 'datetime-local', 'week', 'month' ].includes(this.type);
      },
      shouldAutoGrow () {
        return (this.multiLine || this.textarea) && this.autoGrow;
      }
    },

    watch: {
      isFocused (val) {
        if (val) {
          this.initialValue = this.lazyValue;
        } else if (this.initialValue !== this.lazyValue) {
          this.$emit('change', this.lazyValue);
        }
      },
      value (val) {
        if (this.cleaveMask && typeof window !== 'undefined') {
          this.cleave.setRawValue(val);
          this.lazyValue = this.cleave.getFormattedValue();
        } else {
          this.lazyValue = val;
        }

        if (this.internalChange) {
          this.internalChange = false;
        }

        !this.validateOnBlur && this.validate();
        this.shouldAutoGrow && this.calculateInputHeight();
      }
    },

    mounted () {
      this.shouldAutoGrow && this.calculateInputHeight();
      this.autofocus && this.focus();
    },

    methods: {
      calculateInputHeight () {
        this.inputHeight = null;

        this.$nextTick(() => {
          const height = this.$refs.input
            ? this.$refs.input.scrollHeight
            : 0;
          const minHeight = this.rows * 24;
          const inputHeight = height < minHeight ? minHeight : height;
          this.inputHeight = inputHeight + (this.textarea ? 4 : 0);
        });
      },
      onInput (e) {
        this.inputValue = e.target.value;
        this.badInput = e.target.validity && e.target.validity.badInput;
        this.shouldAutoGrow && this.calculateInputHeight();
      },
      blur (e) {
        this.isFocused = false;
        // Reset internalChange state
        // to allow external change
        // to persist
        this.internalChange = false;

        this.$nextTick(() => {
          this.validate();
        });
        this.$emit('blur', e);
      },
      focus (e) {
        if (!this.$refs.input) {
          return;
        }

        this.isFocused = true;
        if (document.activeElement !== this.$refs.input) {
          this.$refs.input.focus();
        }
        this.$emit('focus', e);
      },
      keyDown (e) {
        // Prevents closing of a
        // dialog when pressing
        // enter or esc
        if (this.isFocused) {
          const [ escKey, enterKey ] = [ 27, 13 ];
          if (e.keyCode === escKey ||
            this.multiLine && e.keyCode === enterKey
          ) {
            e.stopPropagation();
          }
        }

        this.$emit('keydown', e);

        this.internalChange = true;
      },
      genCounter () {
        const errorCounter = this.hasError || this.inputLength >= this.counterLength;
        const warnCounter = !errorCounter && (
          Math.abs(this.inputLength - this.counterLength) / this.counterLength < 0.2
        );
        return this.$createElement('div', {
          'class': {
            'input-group__counter': true,
            'input-group__counter_error': errorCounter,
            'input-group__counter_warn': warnCounter
          }
        }, this.count);
      },
      genInput () {
        const tag = this.multiLine || this.textarea ? 'textarea' : 'input';
        const listeners = Object.assign({}, this.$listeners);
        delete listeners['change']; // Change should not be bound externally

        const data = {
          style: {},
          domProps: {
            autofocus: this.autofocus,
            disabled: this.disabled,
            required: this.required,
            value: this.lazyValue
          },
          attrs: {
            ...this.$attrs,
            readonly: this.readonly,
            tabindex: this.tabindex,
            'aria-label': (!this.$attrs || !this.$attrs.id) && this.label // Label `for` will be set if we have an id
          },
          on: Object.assign(listeners, {
            blur: this.blur,
            input: this.onInput,
            focus: this.focus,
            keydown: this.keyDown
          }),
          ref: 'input'
        };

        if (this.shouldAutoGrow) {
          data.style.height = this.inputHeight && `${this.inputHeight}px`;
        }

        if (this.placeholder) {
          data.domProps.placeholder = this.placeholder;
        }

        if (!this.textarea && !this.multiLine) {
          data.domProps.type = this.type;
        } else {
          data.domProps.rows = this.rows;
        }

        const children = [ this.$createElement(tag, data) ];

        this.prefix && children.unshift(this.genFix('prefix'));
        this.suffix && children.push(this.genFix('suffix'));

        return children;
      },
      genFix (type) {
        return this.$createElement('span', {
          'class': `input-group_text-field__${type}`
        }, this[type]);
      },
      clearableCallback () {
        this.inputValue = null;
        this.$nextTick(() => this.$refs.input.focus());
      }
    },

    render () {
      return this.genInputGroup(this.genInput(), {
        attrs: {
          tabindex: false
        }
      });
    }
  };
</script>

<style lang="scss">
  @import "../../styles/components/_text-field.scss";
</style>
