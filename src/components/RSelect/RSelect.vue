<script>
  // Icons
  import MdKeyboardArrowDown from 'md-svg-vue/dist/hardware/MdKeyboardArrowDown.vue';

  // Mixins
  import Colorable from '../../mixins/colorable';
  import Dependent from '../../mixins/dependent';
  import Filterable from '../../mixins/filterable';
  import Input from '../../mixins/input';

  // Components
  import RMenu from '../RMenu/RMenu.vue';
  import RBtn from '../RBtn/RBtn.vue';
  import RCheckbox from '../RCheckbox/RCheckbox.vue';
  import RChip from '../RChip/RChip.vue';
  import RCard from '../RCard/RCard.vue';
  import RLoading from '../RLoading/RLoading.vue';

  import RList from '../RList/RList.vue';
  import RListTile from '../RList/RListTile.vue';
  import RListTileSubTitle from '../RList/RListTileSubTitle.vue';
  import RListTileContent from '../RList/RListTileContent.vue';
  import RListTileAction from '../RList/RListTileAction.vue';

  import RSubheader from '../RSubheader/RSubheader.vue';
  import RDivider from '../RDivider/RDivider.vue';

  // Component level mixins
  import Autocomplete from './mixins/select-autocomplete';
  import Computed from './mixins/select-computed';
  import Events from './mixins/select-events';
  import Generators from './mixins/select-generators';
  import Helpers from './mixins/select-helpers';
  import Menu from './mixins/select-menu';
  import Props from './mixins/select-props';
  import Watchers from './mixins/select-watchers';

  // Directives
  import ClickOutside from '../../directives/click-outside';

  export default {
    name: 'r-select',

    inheritAttrs: false,

    components: {
      MdKeyboardArrowDown,
      RMenu,
      RBtn,
      RCheckbox,
      RChip,
      RCard,
      RLoading,
      RList,
      RListTile,
      RListTileSubTitle,
      RListTileContent,
      RListTileAction,
      RSubheader,
      RDivider
    },

    directives: {
      ClickOutside
    },

    mixins: [
      Autocomplete,
      Colorable,
      Dependent,
      Events,
      Filterable,
      Generators,
      Helpers,
      Input,
      Menu,
      Props,
      Watchers,
      // Input and Computed both
      // contain isDirty props
      // last gets merged in
      Computed
    ],

    data () {
      return {
        cachedItems: this.cacheItems ? this.items : [],
        content: {},
        defaultColor: '',
        inputValue: (this.multiple || this.tags) && !this.value ? [] : this.value,
        isBooted: false,
        lastItem: 20,
        lazySearch: null,
        isActive: false,
        menuIsActive: false,
        selectedIndex: -1,
        selectedItems: [],
        shouldBreak: false
      };
    },

    mounted () {
      // If instance is being destroyed
      // do not run mounted functions
      if (this._isDestroyed) {
        return;
      }

      // Evaluate the selected items immediately
      // to avoid a unnecessary label transition
      this.genSelectedItems();

      this.content = this.$refs.menu.$refs.content;
    },

    beforeDestroy () {
      if (this.isBooted) {
        if (this.content) {
          this.content.removeEventListener('scroll', this.onScroll, false);
        }
      }
    },

    methods: {
      needsTile (tile) {
        return tile.componentOptions == null || tile.componentOptions.tag !== 'r-list-tile';
      },
      changeSelectedIndex (keyCode) {
        // backspace, left, right, delete
        if (![ 8, 37, 39, 46 ].includes(keyCode)) {
          return;
        }

        const indexes = this.selectedItems.length - 1;

        if (this.arrowNavigation) {
          if (keyCode === 37) { // Left arrow
            this.selectedIndex = this.selectedIndex === -1
              ? indexes
              : this.selectedIndex - 1;
          } else if (keyCode === 39) { // Right arrow
            this.selectedIndex = this.selectedIndex >= indexes
              ? -1
              : this.selectedIndex + 1;
          } else if (this.selectedIndex === -1) {
            this.selectedIndex = indexes;
            return;
          }
        }

        // backspace/delete
        if ([ 8, 46 ].includes(keyCode) && this.backspaceDeletable) {
          const newIndex = this.selectedIndex === indexes
            ? this.selectedIndex - 1
            : this.selectedItems[this.selectedIndex + 1]
              ? this.selectedIndex
              : -1;

          this.combobox
            ? this.inputValue = null
            : this.selectItem(this.selectedItems[this.selectedIndex]);
          this.selectedIndex = newIndex;
        }
      },
      closeConditional (e) {
        if (this.persistentMenu) {
          return false;
        }
        return (
          this.isActive &&
          !!this.content &&
          !this.content.contains(e.target)
        );
      },
      filterDuplicates (arr) {
        const uniqueValues = new Map();
        for (let index = 0; index < arr.length; ++index) {
          const item = arr[index];
          const val = this.getValue(item);

          !uniqueValues.has(val) && uniqueValues.set(val, item);
        }
        return Array.from(uniqueValues.values());
      },
      genDirectives () {
        return [{
          name: 'click-outside',
          value: () => (this.isActive = false),
          args: {
            closeConditional: this.closeConditional
          }
        }];
      },
      genSelectedItems (val = this.inputValue) {
        // If we are using tags, don't filter results
        if (this.tags || this.chips) {
          return (this.selectedItems = val);
        }

        // Combobox is the single version
        // of a taggable select element
        if (this.combobox) {
          return (this.selectedItems = val != null ? [ val ] : []);
        }

        let selectedItems = this.computedItems.filter(i => {
          if (!this.isMultiple) {
            return this.getValue(i) === this.getValue(val);
          } else {
            // Always return Boolean
            return this.findExistingIndex(i) > -1;
          }
        });

        if (!selectedItems.length &&
          val != null &&
          this.tags
        ) {
          selectedItems = Array.isArray(val) ? val : [ val ];
        }

        this.selectedItems = selectedItems;
      },
      clearableCallback () {
        const inputValue = this.isMultiple ? [] : null;

        this.inputValue = inputValue;
        this.$emit('change', inputValue);
        this.genSelectedItems();

        // When input is cleared
        // reset search value and
        // re-focus the input
        setTimeout(() => {
          this.searchValue = null;
          this.focusInput();
        }, 0);

        if (this.openOnClear) {
          setTimeout(this.showMenu, 50);
        }
      },
      onScroll () {
        if (!this.isActive) {
          requestAnimationFrame(() => (this.content.scrollTop = 0));
        } else {
          if (this.virtual || this.lastItem >= this.computedItems.length) {
            return;
          }

          const showMoreItems = (
            this.content.scrollHeight -
            (this.content.scrollTop +
              this.content.clientHeight)
          ) < 200;

          if (showMoreItems) {
            this.lastItem += 20;
          }
        }
      },
      findExistingItem (val) {
        const itemValue = this.getValue(val);
        return this.items.find(i => this.valueComparator(this.getValue(i), itemValue));
      },
      findExistingIndex (item) {
        const itemValue = this.getValue(item);
        return this.inputValue.findIndex(i => this.valueComparator(this.getValue(i), itemValue));
      },
      setCaretPosition (selection) {
        this.selection = selection;

        setTimeout(() => {
          this.$refs.input && this.$refs.input.setSelectionRange(this.selection, this.selection);
        }, 0);
      },
      selectItem (item, options = {}) {
        const { focusInputAfterSelect = true, removeItem = true } = options;

        if (!this.isMultiple) {
          this.inputValue = this.returnObject ? item : this.getValue(item);
          this.selectedItems = [ item ];
        } else {
          const selectedItems = [];
          const inputValue = this.inputValue.slice();
          const i = this.findExistingIndex(item);

          if (i !== -1) {
            removeItem && inputValue.splice(i, 1);
          } else {
            inputValue.push(item);
          }

          this.inputValue = inputValue.map(i => {
            selectedItems.push(i);
            return this.returnObject ? i : this.getValue(i);
          });

          this.selectedItems = selectedItems;
          this.selectedIndex = -1;
        }

        this.searchValue = !this.isMultiple &&
        !this.chips &&
        !this.$scopedSlots.selection
          ? this.getText(this.selectedItem)
          : null;

        this.$emit('change', this.inputValue);

        // List tile will re-render, reset index to
        // maintain highlighting
        const savedIndex = this.getMenuIndex();
        this.resetMenuIndex();

        if (!focusInputAfterSelect) {
          return;
        }

        // After selecting an item
        // refocus the input and
        // reset the caret pos
        this.$nextTick(() => {
          this.focusInput();
          this.setCaretPosition(this.currentRange);

          requestAnimationFrame(() => {
            if (savedIndex > -1) {
              this.setMenuIndex(savedIndex);
            }
          });
        });
      }
    },

    render (h) {
      const data = {
        attrs: {
          tabindex: this.isAutocomplete || this.disabled ? -1 : this.tabindex,
          'data-uid': this._uid,
          ...(this.isAutocomplete ? null : this.$attrs),
          role: this.isAutocomplete ? null : 'combobox'
        }
      };
      const selectionsOutside = this.chipsOutside
        ? this.genSelectionsAndSearch({ search: false })
        : null;

      if (!this.isAutocomplete) {
        data.on = this.genListeners();
        data.directives = this.genDirectives();
      } else {
        data.on = {
          click: () => {
            if (this.disabled || this.readonly || this.isFocused) {
              return;
            }

            // If the input is dirty,
            // the input is not targetable
            // so we must manually focus
            if (this.isDirty) {
              this.focus();
              this.$nextTick(this.focusInput);
            }
          }
        };
      }

      return this.$createElement('div', {
        'class': 'input-group__select-wrapper',
        ref: 'select'
      }, [
        this.genInputGroup([
          this.genSelectionsAndSearch({ selections: !this.chipsOutside }),
          this.genMenu()
        ], data, this.toggleMenu),
        selectionsOutside
      ]);
    }
  };
</script>

<style lang="scss">
  @import "../../styles/components/_text-field.scss";
  @import "../../styles/components/_select.scss";
</style>
