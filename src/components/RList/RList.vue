<script>
  import {
    provide as RegistrableProvide
  } from '../../mixins/registrable';

  // Components
  import RVirtualScroller from '../RVirtualScroller/RVirtualScroller.vue';

  export default {
    name: 'r-list',

    mixins: [
      RegistrableProvide('list')
    ],

    components: {
      RVirtualScroller
    },

    provide () {
      return {
        'listClick': this.listClick
      };
    },

    data: () => ({
      groups: []
    }),

    props: {
      // r-list props
      dense: Boolean,
      expand: Boolean,
      subheader: Boolean,
      threeLine: Boolean,
      twoLine: Boolean,
      virtual: Boolean,

      // virtual scroller props
      items: Array,
      renderers: {
        default: null
      },
      itemHeight: {
        type: [ Number, String ],
        default: null
      },
      maxContentHeight: {
        type: [ Number, String ],
        default: 300
      },
      anyHeight: Boolean,
      typeField: {
        type: String,
        default: 'type'
      },
      keyField: {
        type: String,
        default: 'id'
      },
      heightField: {
        type: String,
        default: 'height'
      },
      mainTag: {
        type: String,
        default: 'div'
      },
      containerTag: {
        type: String,
        default: 'div'
      },
      containerClass: {
        default: null
      },
      contentTag: {
        type: String,
        default: 'div'
      },
      contentClass: {
        default: null
      },
      pageMode: {
        type: Boolean,
        default: false
      },
      buffer: {
        type: [ Number, String ],
        default: 200
      },
      poolSize: {
        type: [ Number, String ],
        default: 2000
      },
      prerender: {
        type: [ Number, String ],
        default: 0
      },
      emitUpdate: {
        type: Boolean,
        default: false
      },
      delayPreviousItems: {
        type: Boolean,
        default: false
      }
    },

    computed: {
      classes () {
        return {
          'list_dense': this.dense,
          'list_subheader': this.subheader,
          'list_two-line': this.twoLine,
          'list_three-line': this.threeLine,
          'list_virtual-scroller': this.virtual
        };
      }
    },

    methods: {
      register (uid, cb) {
        this.groups.push({ uid, cb });
      },
      unregister (uid) {
        const index = this.groups.findIndex(g => g.uid === uid);

        if (index > -1) {
          this.groups.splice(index, 1);
        }
      },
      listClick (uid, isBooted) {
        if (this.expand) {
          return;
        }

        for (let i = this.groups.length; i--;) {
          this.groups[i].cb(uid);
        }
      }
    },

    render (h) {
      const children = [];
      const data = {
        staticClass: 'list',
        'class': this.classes
      };
      let tag = 'ul';

      // items property required by virtual scroller
      // claim it by checking the property
      if (this.virtual && this.items) {
        tag = 'r-virtual-scroller';

        Object.assign(data, {
          props: {
            items: this.items,
            renderers: this.renderers,
            itemHeight: this.itemHeight,
            maxContentHeight: this.maxContentHeight,
            anyHeight: this.anyHeight,
            typeField: this.typeField,
            keyField: this.keyField,
            heightField: this.heightField,
            mainTag: this.mainTag,
            containerTag: this.containerTag,
            containerClass: this.containerClass,
            contentTag: this.contentTag,
            contentClass: this.contentClass,
            pageMode: this.pageMode,
            poolSize: this.poolSize,
            buffer: this.buffer,
            prerender: this.prerender,
            emitUpdate: this.emitUpdate,
            delayPreviousItems: this.delayPreviousItems
          },
          scopedSlots: this.$scopedSlots
        });
      } else {
        children.push(this.$slots.default);
      }
      return h(tag, data, children);
    }
  };
</script>

<style lang="scss">
  @import "../../styles/components/_list.scss";
</style>
