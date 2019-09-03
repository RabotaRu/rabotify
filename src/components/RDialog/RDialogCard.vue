<script>
  // Directives
  import Scroll from '../../directives/scroll';

  // Icons
  import MdClose from '@rabota/md-svg-vue/dist/navigation/MdClose.vue';

  // Components
  import RBtn from '../RBtn/RBtn.vue';
  import RCard from '../RCard/RCard.vue';
  import RCardText from '../RCard/RCardText.vue';
  import RCardActions from '../RCard/RCardActions.vue';
  import RDialogHeader from './RDialogHeader.vue';

  let dialogCardNumber = 1;

  export default {
    name: 'r-dialog-card',

    components: {
      MdClose,

      RBtn,
      RCard,
      RCardText,
      RCardActions,
      RDialogHeader,
    },

    directives: {
      Scroll
    },

    props: {
      actionsStyles: Object,
      actionsClass: String
    },

    data () {
      return {
        id: dialogCardNumber++,
        headerFlat: true
      };
    },

    methods: {
      onContentScroll (ev) {
        this.headerFlat = !( ev.target && ev.target.scrollTop > 0 );
      },

      closeDialog () {
        this.$emit('close');
      }
    },

    computed: {
      classes () {
        return {
          'dialog-card': true
        };
      },

      dialogHeaderClasses () {
        return {
          'dialog-card__header': true
        };
      },

      actionsClasses () {
        return {
          'dialog-card__actions': true,
          [this.actionsClass]: !!this.actionsClass
        };
      },

      dialogCardId () {
        return `dialog-card-${this.id}`;
      },

      dialogCardScrollTarget () {
        return `#${this.dialogCardId} .dialog-card__inner`;
      }
    }
  };
</script>

<template>
  <r-card :class="classes" :id="dialogCardId">

    <div class="dialog-card__header-wrapper">
      <template v-if="$slots.header">
        <slot name="header"></slot>
      </template>
      <r-dialog-header v-else-if="$slots.title || $slots.close"
                       :class="dialogHeaderClasses"
                       :flat="headerFlat">
        <slot name="title"></slot>
      </r-dialog-header>
    </div>

    <div class="dialog-card__close">
      <r-btn v-if="!$slots.close"
             ripple icon flat round large
             @click.native.stop="closeDialog()">
        <md-close></md-close>
      </r-btn>
      <slot v-else name="close"></slot>
    </div>

    <r-card-text ref="text"
                 class="dialog-card__inner"
                 v-scroll="{ callback: onContentScroll, target: dialogCardScrollTarget }">
      <slot name="default"></slot>
    </r-card-text>

    <r-card-actions ref="actions"
                    v-if="$slots.actions"
                    :class="actionsClasses"
                    :style="actionsStyles">
      <slot name="actions"></slot>
    </r-card-actions>
  </r-card>
</template>

<style lang="scss">
  @import "../../styles/components/dialog/_dialog-card.scss";
</style>
