import ClickOutside from './click-outside';
import KeydownToggle from './keydown-toggle';
import Resize from './resize';
import Scroll from './scroll';
import Touch from './touch';
import Ripple from './ripple';

export {
  ClickOutside,
  KeydownToggle,
  Resize,
  Ripple,
  Scroll,
  Touch
};

export default function install (Vue) {
  Vue.directive('click-outside', ClickOutside);
  Vue.directive('keydown-toggle', KeydownToggle);
  Vue.directive('resize', Resize);
  Vue.directive('ripple', Ripple);
  Vue.directive('scroll', Scroll);
  Vue.directive('touch', Touch);
}
