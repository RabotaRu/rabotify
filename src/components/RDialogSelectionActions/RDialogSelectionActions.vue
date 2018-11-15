<script>
  import RDialog from '../RDialog/RDialog.vue';
  import RCheckbox from '../RCheckbox/RCheckbox.vue';

  export default {
    name: 'r-dialog-selection-actions',

    components: {
      RDialog,
      RCheckbox
    },

    data: () => ({
      selectionDialog: false
    }),

    props: {
      items: {
        type: Array,
        default: []
      },
      itemsNumber: {
        type: Number,
        default: 0
      },
      mobileMenuOpened: Boolean
    },

    watch: {
      items () {
        this.selectionDialog = this.items.length > 0;
      }
    },

    methods: {
      onCheckboxClick () {
        this.$emit('checkboxClick');
      }
    },

    computed: {
      isIndeterminate () {
        return this.itemsNumber > this.items.length && this.items.length > 0;
      },
      contentClasses () {
        const classes = {
          'dialog-selection-actions': true,
          'dialog-selection-actions_mobile-menu-opened': this.mobileMenuOpened
        };
        return Object.keys(classes).reduce((className, currentClass) => {
          return `${className} ${classes[ currentClass ] ? currentClass : ''}`;
        }, '').trim();
      }
    }
  };
</script>

<template>
  <r-dialog lazy
            v-model="selectionDialog"
            hideOverlay
            persistent
            maxWidth="100%"
            :safariBlurOverlay="false"
            :contentClass="contentClasses"
            attachBottom
            transition="dialog-bottom-transition">
    <div class="dialog-selection-actions__inner">
      <div class="dialog-selection-actions__checkbox">
        <r-checkbox ripple color="primary"
                    :indeterminate="isIndeterminate"
                    @click="onCheckboxClick"
                    :inputValue="selectionDialog"></r-checkbox>
      </div>
      <div class="dialog-selection-actions__actions">
        <slot name="actions"></slot>
      </div>
    </div>
  </r-dialog>
</template>

<style lang="scss">
  @import "../../styles/components/_dialog-selection-actions.scss";
</style>
