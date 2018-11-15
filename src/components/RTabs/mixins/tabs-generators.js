/**
 * Tabs generators
 *
 * @mixin
 */
export default {
  methods: {
    genBar (items) {
      return this.$createElement('div', {
        staticClass: 'tabs__bar',
        'class': this.addBackgroundColorClassChecks({}),
        ref: 'bar'
      }, [
        this.genTransition('prepend'),
        this.genWrapper(
          this.genContainer(items)
        ),
        this.genTransition('append')
      ]);
    },
    genContainer (items) {
      return this.$createElement('div', {
        staticClass: 'tabs__container',
        class: {
          'tabs__container_align-with-title': this.alignWithTitle,
          'tabs__container_centered': this.centered,
          'tabs__container_fixed-tabs': this.fixedTabs,
          'tabs__container_grow': this.grow,
          'tabs__container_icons-and-text': this.iconsAndText,
          'tabs__container_overflow': this.isOverflowing,
          'tabs__container_right': this.right
        },
        style: this.containerStyles,
        ref: 'container'
      }, items);
    },
    genIcon (direction) {
      if (!this.hasArrows ||
        !this[`${direction}IconVisible`]
      ) {
        return null;
      }

      const icon = this.$createElement(this[`${direction}Icon`]);

      return this.$createElement('span', {
        staticClass: `tabs__icon tabs__icon_${direction}`,
        props: {
          disabled: !this[`${direction}IconVisible`]
        },
        on: {
          click: () => this.scrollTo(direction)
        }
      }, [ icon ]);
    },
    genItems (items, item) {
      if (items.length > 0) {
        return items;
      }
      if (!item.length) {
        return null;
      }

      return this.$createElement('r-tabs-items', item);
    },
    genTransition (direction) {
      const transitionName = `slide-x${direction !== 'append' ? '' : '-reverse'}-transition`;
      return this.$createElement('transition', {
        props: { name: transitionName }
      }, [ this.genIcon(direction) ]);
    },
    genWrapper (items) {
      return this.$createElement('div', {
        staticClass: 'tabs__wrapper',
        class: {
          'tabs__wrapper_show-arrows': this.hasArrows
        },
        ref: 'wrapper',
        directives: [{
          name: 'touch',
          value: {
            start: e => this.overflowCheck(e, this.onTouchStart),
            move: e => this.overflowCheck(e, this.onTouchMove),
            end: e => this.overflowCheck(e, this.onTouchEnd)
          }
        }]
      }, [ items ]);
    },
    genSlider (items) {
      items = [
        this.$createElement('r-tabs-slider', {
          props: { color: this.sliderColor }
        })
      ];

      return this.$createElement('div', {
        staticClass: 'tabs__slider-wrapper',
        style: this.sliderStyles
      }, items);
    }
  }
};
