<script>
  // Mixins
  import Input from '../../mixins/input';
  import {
    provide as RegistrableProvide
  } from '../../mixins/registrable';

  export default {
    name: 'r-radio-group',

    mixins: [
      Input,
      RegistrableProvide('radio')
    ],

    model: {
      prop: 'inputValue',
      event: 'change'
    },

    provide () {
      return {
        isMandatory: () => this.mandatory,
        name: () => this.name
      };
    },

    data: () => ({
      internalTabIndex: -1,
      radios: []
    }),

    props: {
      column: {
        type: Boolean,
        default: true
      },
      inputValue: null,
      mandatory: {
        type: Boolean,
        default: true
      },
      name: String,
      row: Boolean
    },

    watch: {
      hasError (val) {
        for (const radio of this.radios) {
          radio.parentError = val;
        }
      },
      inputValue (val) {
        for (const radio of this.radios) {
          radio.isActive = val === radio.value;
        }
      }
    },

    computed: {
      classes () {
        return {
          'radio-group': true,
          'radio-group_column': this.column && !this.row,
          'radio-group_row': this.row,
          'text_error': this.hasError
        };
      }
    },

    methods: {
      toggleRadio (value) {
        if (this.disabled) {
          return;
        }

        this.shouldValidate = true;
        this.$emit('change', value);
        this.$nextTick(() => this.validate());

        for (const radio of this.radios) {
          if (radio.value !== value) {
            radio.isActive = false;
          }
        }
      },
      radioBlur (e) {
        if (!e.relatedTarget || !e.relatedTarget.classList.contains('radio')) {
          this.shouldValidate = true;
          this.$emit('blur', this.inputValue);
        }
      },
      register (radio) {
        radio.isActive = this.inputValue === radio.value;
        radio.$el.tabIndex = radio.$el.tabIndex > 0 ? radio.$el.tabIndex : 0;
        radio.$on('change', this.toggleRadio);
        radio.$on('blur', this.radioBlur);
        // radio.$on('focus', this.radioFocus);
        this.radios.push(radio);
      },
      unregister (radio) {
        radio.$off('change', this.toggleRadio);
        radio.$off('blur', this.radioBlur);
        // radio.$off('focus', this.radioFocus);

        const index = this.radios.findIndex(r => r === radio);

        if (index > -1) {
          this.radios.splice(index, 1);
        }
      }
    },

    render (h) {
      const data = {
        attrs: {
          role: 'radiogroup'
        }
      };
      return this.genInputGroup(this.$slots.default, data);
    }
  };
</script>

<style lang="scss">
  @import "../../styles/components/_radio-group.scss";
</style>
