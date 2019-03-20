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

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var defaults = {
  duration: 300,
  offset: 0,
  easing: 'easeInOutCubic'
};

/**
 * @param {RabotifyScrollToElement} target
 * @param {RabotifyScrollToOptions} settings
 * @param {RabotifyScrollToElement?} relativeElement
 * @return {number}
 */
function getTargetLocation(target, settings) {
  var relativeElement = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  var isRelativeToWindow = !relativeElement;
  var getOffset = isRelativeToWindow ? _helpers.getElementOffset : _helpers.getElementRelativeOffset;

  var location = 0;

  if (typeof target === 'number') {
    location = target;
  } else {
    var element = (0, _helpers.resolveElement)(target);
    var relative = (0, _helpers.resolveElement)(relativeElement);
    if (element) {
      location = getOffset.apply(undefined, _toConsumableArray([element, relative].filter(function (v) {
        return !!v;
      }))).top;
    }
  }

  if (settings.offset) {
    location += (0, _helpers.ensureNumber)(settings.offset);
  }

  var minLocation = isRelativeToWindow ? (0, _helpers.getDocumentHeight)() - (0, _helpers.getWindowHeight)() : (0, _helpers.getElementScrollHeight)(relativeElement) - (0, _helpers.getElementHeight)(relativeElement);

  return Math.round(Math.min(Math.max(location, 0), minLocation));
}

/**
 * @param {RabotifyScrollToElement} target
 * @param {RabotifyScrollToOptions} options
 * @param {RabotifyScrollToElement} relativeTo
 */
function scrollTo(target, options) {
  var relativeTo = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  return new Promise(function (resolve, reject) {
    if (typeof window === 'undefined') {
      return resolve();
    }

    var isRelativeToWindow = !relativeTo;
    var relativeElement = (0, _helpers.resolveElement)(relativeTo);

    var settings = Object.assign({}, defaults, options);

    var startTime = performance.now();

    var startLocation = isRelativeToWindow ? window.pageYOffset : relativeElement.scrollTop;
    var targetLocation = getTargetLocation(target, settings, relativeElement);
    var distanceToScroll = targetLocation - startLocation;

    var easingFunction = typeof settings.easing === 'function' ? settings.easing : easingPatterns[settings.easing];

    if (isNaN(targetLocation)) {
      var type = target && target.constructor ? target.constructor.name : target;
      var err = new TypeError('Target must be a Selector/Number/DOMElement/VueComponent, received ' + type + ' instead.');
      (0, _console.consoleError)(err);
      return reject(err);
    }

    if (!easingFunction) {
      var _err = new RangeError('Easing function \'' + settings.easing + '\' not found.');
      (0, _console.consoleError)(_err);
      return reject(_err);
    }

    function step(currentTime) {
      var progressPercentage = Math.min(1, (currentTime - startTime) / settings.duration);
      var targetPosition = Math.floor(startLocation + distanceToScroll * easingFunction(progressPercentage));

      if (isRelativeToWindow) {
        window.scrollTo(0, targetPosition);
        if (Math.round(window.pageYOffset) === targetLocation) {
          return resolve();
        }
      } else {
        relativeElement.scrollTop = targetPosition;
        if (Math.round(relativeElement.scrollTop) === targetLocation) {
          return resolve();
        }
      }

      if (currentTime - startTime < settings.duration) {
        window.requestAnimationFrame(step);
      } else {
        resolve();
      }
    }

    window.requestAnimationFrame(step);
  });
}