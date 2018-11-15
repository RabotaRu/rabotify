'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = scrollTo;

var _console = require('../../../util/console');

var _easingPatterns = require('../../../util/easing-patterns');

var easingPatterns = _interopRequireWildcard(_easingPatterns);

var _helpers = require('../../../util/helpers');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var defaults = {
  duration: 400,
  offset: 0,
  easing: 'easeInOutCubic'
};

function getDocumentHeight() {
  return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
}

function getWindowHeight() {
  return window.innerHeight || (document.documentElement || document.body).clientHeight;
}

function isVueComponent(obj) {
  return obj && obj.constructor && obj.constructor.name === 'VueComponent';
}

function getTargetLocation(target, settings) {
  var location = 0;

  if (target instanceof Element) {
    location = target.offsetTop;
  } else if (isVueComponent(target)) {
    location = (0, _helpers.getElementOffset)(target.$el).top;
  } else if (typeof target === 'string') {
    var element = document.querySelector(target);
    if (element) {
      location = (0, _helpers.getElementOffset)(element).top;
    }
  } else if (typeof target === 'number') {
    location = target;
  } else {
    location = undefined;
  }

  return Math.round(Math.min(Math.max(location + settings.offset, 0), getDocumentHeight() - getWindowHeight()));
}

function scrollTo(target, options) {
  if (typeof window === 'undefined') {
    return;
  }

  var settings = Object.assign({}, defaults, options);

  var startTime = performance.now();
  var startLocation = window.pageYOffset;
  var targetLocation = getTargetLocation(target, settings);
  var distanceToScroll = targetLocation - startLocation;
  var easingFunction = typeof settings.easing === 'function' ? settings.easing : easingPatterns[settings.easing];

  if (isNaN(targetLocation)) {
    var type = target && target.constructor ? target.constructor.name : target;
    return (0, _console.consoleError)('Target must be a Selector/Number/DOMElement/VueComponent, received ' + type + ' instead.');
  }

  if (!easingFunction) {
    return (0, _console.consoleError)('Easing function \'' + settings.easing + '\' not found.');
  }

  function step(currentTime) {
    var progressPercentage = Math.min(1, (currentTime - startTime) / settings.duration);
    var targetPosition = Math.floor(startLocation + distanceToScroll * easingFunction(progressPercentage));

    window.scrollTo(0, targetPosition);
    if (Math.round(window.pageYOffset) === targetLocation) {
      return;
    }
    window.requestAnimationFrame(step);
  }

  window.requestAnimationFrame(step);
}