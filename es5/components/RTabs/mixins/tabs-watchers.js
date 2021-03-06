'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Tabs watchers
 *
 * @mixin
 */
exports.default = {
  watch: {
    activeTab: function activeTab(tab, prev) {
      !prev && tab && this.updateTabs();

      setTimeout(this.callSlider, 0);

      if (!tab) {
        return;
      }

      var action = tab.action;
      this.tabItems && this.tabItems(action === tab ? this.tabs.indexOf(tab).toString() : action);
    },

    alignWithTitle: 'callSlider',
    centered: 'callSlider',
    fixedTabs: 'callSlider',
    isBooted: 'findActiveLink',
    lazyValue: 'updateTabs',
    right: 'callSlider',
    value: function value(val) {
      this.lazyValue = val;
    },

    '$rabotify.application.left': 'onContainerResize',
    '$rabotify.application.right': 'onContainerResize',
    scrollOffset: function scrollOffset(val) {
      this.$refs.container.style.transform = 'translateX(' + -val + 'px)';
      if (this.hasArrows) {
        this.prependIconVisible = this.checkPrependIcon();
        this.appendIconVisible = this.checkAppendIcon();
      }
    }
  }
};