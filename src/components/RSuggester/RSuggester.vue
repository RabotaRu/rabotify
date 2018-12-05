<script>
  // Icons
  import MdClose from 'md-svg-vue/dist/navigation/MdClose.vue';
  import MdKeyboardArrowDown from 'md-svg-vue/dist/hardware/MdKeyboardArrowDown.vue';

  // Components
  import RTextField from '../RTextField/RTextField';
  import RMenu from '../RMenu/RMenu';
  import { RList, RListTile, RListTileSubTitle } from '../RList';

  // Component's mixins
  import {
    Computed,
    Props,
  } from './mixins';

  // Mixins
  import Dependent from '../../mixins/dependent';

  // Utils
  import {
    ensureString,
    getElementHeight,
    getElementRelativeOffset, getObjectValueByPath,
    isObject,
    resolveElement, clampNumber
  } from '../../util/helpers';

  export default {
    name: 'r-suggester',

    inheritAttrs: false,

    mixins: [
      Computed,
      Props,
      Dependent,
    ],

    components: {
      MdClose,
      MdKeyboardArrowDown,

      RTextField,
      RMenu,
      RList,
      RListTile,
      RListTileSubTitle
    },

    directives: {
    },

    data () {
      return {
        // input
        lazyValue: this.value,
        lazySearch: this.getItemText( this.value ),
        lazyItems: [],

        // input states
        focused: false,
        errored: false,

        // menu
        isActive: false,
        menuIndex: -1,

        // misc
        lastRequestId: null,
        cache: new Map(),
        needsToCloseMenu: false,

        inputHeight: 34 // default input height, we'll recompute this later
      };
    },

    mounted () {
      // If instance is being destroyed
      // do not run mounted functions
      if (this._isDestroyed) {
        return;
      }

      this.lazyItems = [];

      this.updateInputHeight();

      if (this.isAsync && this.value && this.prefetch) {
        this.search( this.lazySearch );
      }
    },

    methods: {
      onFocus (ev) {
        this.focused = true;
        this.$emit( 'focus', ev );
      },

      onBlur (ev) {
        this.focused = false;
        this.$emit( 'blur', ev );

        if (!this.isActive) {
          this.save();
        }
      },

      blur () {
        const input = getObjectValueByPath( this.$refs, 'input.$refs.input' );

        if (input) {
          input.blur();
        }
      },

      onClick (ev) {
        this.updateMenuOpenState();
      },

      onKeyDown (ev) {
        // on tab pressed
        if (ev.keyCode === 9) {
          this.onTabPressed( ev );
        } else if (ev.keyCode === 27) {
          this.onEscPressed( ev );
        } else if (ev.keyCode === 13) {
          this.onEnterPressed( ev );
        } else if ([ 38, 40 ].includes( ev.keyCode )) {
          // on arrow keys pressed
          this.changeMenuIndex( ev );
        }
      },

      onTabPressed (ev) {
        this.isActive = false;
      },

      onEscPressed (ev) {
        if (this.isActive) {
          this.isActive = false;
        } else {
          this.reset();
        }
      },

      onEnterPressed (ev) {
        if (this.isActive && this.lazyItems.length) {
          let selected = false;

          if (this.menuIndex === -1 && this.selectFirstOnEnter) {
            const item = this.findAppropriateValue();
            if (item) {
              this.selectItem( item );
              selected = true;
            }
          } else if (this.menuIndex >= 0) {
            const menuIndex = clampNumber( this.menuIndex, 0, this.lazyItems.length - 1 );

            this.selectItem( this.lazyItems[ menuIndex ] );
            selected = true;
          }

          if (selected) {
            this.needsToCloseMenu = true;
            this.blur();

            this.$nextTick(_ => {
              this.isActive = false;
            });
          }
        }

        this.$emit( 'enter', ev, this.menuIndex );
      },

      changeMenuIndex (ev) {
        const direction = ev.keyCode === 38 ? -1 : 1;
        if ((this.menuIndex === -1 || this.menuIndex === 0) && direction === -1) {
          this.menuIndex = this.lazyItems.length - 1;
        } else if (this.menuIndex === this.lazyItems.length - 1 && direction === 1) {
          this.menuIndex = 0;
        } else {
          this.menuIndex += direction;
        }

        ev.preventDefault();

        this.updateMenuScroll();
      },

      resetMenuIndex () {
        this.menuIndex = -1;
        this.updateMenuScroll();
      },

      updateMenuScroll () {
        const menu = this.$refs.menu;
        const menuElement = resolveElement( menu.$refs.content );
        const list = menuElement && menuElement.querySelector( '.list' );

        if (!list) {
          return;
        }

        const item = list.childNodes[ this.menuIndex ];

        let scrollTop = 0;

        if (item) {
          const offset = getElementRelativeOffset( item, menuElement );
          scrollTop = Math.max( 0, offset.top - getElementHeight( item ) );
        }

        menuElement.scrollTop = scrollTop;
      },

      selectItem (item) {
        this.lazyValue = item;
        this.updateSearchValue();
      },

      getItemValue (value) {
        if (!value) {
          value = this.lazyValue;
        }

        return typeof value === 'string'
          ? value
          : value[ this.itemValue ] || value;
      },

      getItemText (value = this.lazyValue) {
        if (!value) {
          return '';
        }

        return typeof value === 'string'
          ? value
          : value[ this.itemText ] || value;
      },

      updateSearchValue () {
        this.lazySearch = this.getItemText( this.lazyValue );
      },

      updateMenuOpenState () {
        this.isActive = !this.needsToCloseMenu
          && this.focused
          && this.lazyItems.length > 0
          && this.lazySearch.length > 0;

        if (this.needsToCloseMenu) {
          this.needsToCloseMenu = false;
        }
      },

      updateInputHeight () {
        const input = getObjectValueByPath( this.$refs, 'input' );

        if (!input) {
          return;
        }

        this.inputHeight = getElementHeight(
          resolveElement( input )
        );
      },

      async search (query) {
        // console.log( `[RSuggester] searching: "${query}"` );

        const args = [ query ];

        if (this.isAsync) {
          if (this.isCacheable && this.hasCache( query )) {
            this.lazyItems = this.getCache( query );
            this.lastRequestId = Date.now();

            return;
          }

          args.push( Date.now() );
        }

        return (
          this.isAsync
            ? this.fetch( ...args )
            : Promise.resolve( this.filterItems( ...args ) )
        ).then(response => {
          if (Array.isArray( response )) {
            this.lazyItems = response;

            if (this.isCacheable) {
              this.setCache( query, response );
            }
          } else if (isObject(response)) {
            const { items = [], requestId } = response;

            if (!requestId || !this.lastRequestId
              || this.lastRequestId < requestId) {
              this.lazyItems = items;
              this.lastRequestId = requestId;
            }

            if (this.isCacheable) {
              this.setCache( query, items );
            }
          }
        });
      },

      filterItems (query, items = this.items) {
        return items.filter(item => {
          return this.getItemText( item )
            .toLowerCase()
            .includes(
              query.toLowerCase()
            );
        });
      },

      findAppropriateValue () {
        return this.lazyItems.find(item => {
          return this.makeTextSearchable( this.getItemText( item ) ) === this.makeTextSearchable( this.lazySearch );
        });
      },

      save () {
        if (this.isSearchEmpty) {
          this.reset();
        } else {
          const foundValue = this.findAppropriateValue();

          if (foundValue) {
            this.selectItem( foundValue );
          } else if (this.strictValue) {
            this.updateSearchValue();
          } else {
            this.lazyValue = this.lazySearch;
          }
        }
      },

      onMenuInput (val) {
        if (!val) {
          this.save();
          this.isActive = false;
        }
      },

      clearText (text) {
        return ensureString( text )
          .toString()
          .trim();
      },

      makeTextSearchable (text) {
        return this.clearText( text ).toLowerCase();
      },

      reset () {
        this.lazyValue = null;
        this.updateSearchValue();
      },

      hasCache (query) {
        return this.cache.has(
          this.makeTextSearchable( query )
        );
      },

      getCache (query) {
        return this.cache.get(
          this.makeTextSearchable( query )
        );
      },

      setCache (query, value) {
        this.cache.set(
          this.makeTextSearchable( query ),
          value
        );
      }
    },

    computed: {
      isAsync () {
        return !!this.fetch;
      },

      isCacheable () {
        return this.isAsync && this.cacheItems;
      },

      isSearchEmpty () {
        return !this.clearText( this.lazySearch );
      }
    },

    watch: {
      lazySearch (value) {
        value = this.clearText( value );

        this.$emit( 'search', value );

        if (!value) {
          this.lazyItems = [];
          return ( this.isActive = false );
        }

        this.isActive = !!this.lazyItems.length;

        return this.search( value ).then(_ => {
          this.$nextTick(_ => {
            this.updateMenuOpenState();
          });
        });
      },

      lazyValue (value) {
        this.$emit( 'input', value );
      },

      value (value) {
        this.lazyValue = value;
        this.updateSearchValue();
      },

      isActive (value) {
        if (!value) {
          this.menuIndex = -1;
        } else {
          this.updateInputHeight();
        }
      }
    },

    beforeDestroy () {
    }
  };
</script>

<template>
  <div class="r-suggester">
    <div class="r-suggester__inner">

      <div class="r-suggester__input-group">
        <r-text-field class="r-suggester__input"
                      v-model="lazySearch"
                      @focus="onFocus"
                      @blur="onBlur"
                      @click="onClick"
                      @keydown="onKeyDown"
                      :color="color"
                      :disabled="disabled"
                      :readonly="readonly"
                      :placeholder="placeholder"
                      :label="label"
                      :clearable="clearable"
                      ref="input"
                      key="input"></r-text-field>
      </div>

      <div class="r-suggester__menu-wrapper">
        <r-menu ref="menu"
                v-model="isActive"
                v-bind="menuOptionsComputed"
                @input="onMenuInput"
                :activator="$refs.input && $refs.input.$el">

          <r-list>
            <r-list-tile v-for="(item, index) in lazyItems"
                         :key="item.id || index"
                         :class="{'list__tile_highlighted': index === menuIndex}"
                         @click="selectItem(item)">
              <r-list-tile-sub-title>{{ getItemText( item ) }}</r-list-tile-sub-title>
            </r-list-tile>
          </r-list>

        </r-menu>
      </div>

    </div>
  </div>
</template>

<style lang="scss">
  @import "../../styles/components/select/_suggester";
</style>
