<script>
  export default {
    name: 'r-form-group',

    props: {
      label: String,
      labelTop: Boolean,
      required: Boolean,
      vertical: Boolean,
      labelClass: String,
      controlClass: String,
      labelOffset: Boolean,
      narrowControl: Boolean,
      smallIndent: Boolean,
    },

    computed: {
      classes () {
        return {
          'form-group_vertical': this.vertical,
          'form-group_indent-small': this.smallIndent
        };
      },
      labelClasses () {
        return {
          [this.labelClass]: !!this.labelClass,
          'form-group__label_top': this.labelTop
        };
      },
      controlClasses () {
        return {
          [this.controlClass]: !!this.controlClass,
          'form-group__control_offset-label': this.labelOffset,
          'form-group__control_narrow': this.narrowControl
        };
      }
    }
  };
</script>

<template>
  <div class="form-group"
       :class="classes">
    <label class="form-group__label"
           :class="labelClasses"
           v-if="label || $slots.label">
      <span v-if="label" v-html="label"></span>
      <span v-else>
        <slot name="label"></slot>
      </span>
      <sup class="form-group__required" v-if="required">*</sup>
    </label>
    <div class="form-group__control"
         :class="controlClasses"
          v-if="$slots.default">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
  @import "../../styles/components/_form-group.scss";
</style>
