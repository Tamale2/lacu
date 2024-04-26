/**
 * @file
 * Marker InfoWindow.
 */

/**
 * @typedef {Object} MarkerInfoWindowSettings
 *
 * @extends {GeolocationMapFeatureSettings}
 *
 * @property {Boolean} infoAutoDisplay
 * @property {Boolean} disableAutoPan
 * @property {Boolean} infoWindowSolitary
 * @property {int} maxWidth
 */

/**
 * @typedef {Object} GoogleInfoWindow
 * @property {Function} open
 * @property {Function} close
 */

/**
 * @property {GoogleInfoWindow} GeolocationGoogleMap.infoWindow
 * @property {function({}):GoogleInfoWindow} GeolocationGoogleMap.InfoWindow
 */

(function (Drupal) {

  'use strict';

  /**
   * Marker InfoWindow.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Attaches common map style functionality to relevant elements.
   */
  Drupal.behaviors.geolocationMarkerInfoWindow = {
    attach: function (context, drupalSettings) {
      Drupal.geolocation.executeFeatureOnAllMaps(
        'marker_infowindow',

        /**
         * @param {GeolocationGoogleMap} map - Current map.
         * @param {MarkerInfoWindowSettings} featureSettings - Settings for current feature.
         */
        function (map, featureSettings) {
          map.addMarkerAddedCallback(function (currentMarker) {
            if (typeof (currentMarker.locationWrapper) === 'undefined') {
              return;
            }

            var content = currentMarker.locationWrapper.find('.location-content');

            if (content.length < 1) {
              return;
            }
            content = content.html();

            var markerInfoWindow = {
              content: content.toString(),
              disableAutoPan: featureSettings.disableAutoPan
            };

            if (featureSettings.maxWidth > 0) {
              markerInfoWindow.maxWidth = featureSettings.maxWidth;
            }

            // Set the info popup text.
            var currentInfoWindow = new google.maps.InfoWindow(markerInfoWindow);

            currentMarker.addListener('click', function () {
              if (featureSettings.infoWindowSolitary) {
                if (typeof map.infoWindow !== 'undefined') {
                  map.infoWindow.close();
                }
                map.infoWindow = currentInfoWindow;
              }
              currentInfoWindow.open(map.googleMap, currentMarker);
            });

            if (featureSettings.infoAutoDisplay) {
              if (map.googleMap.get('tilesloading')) {
                google.maps.event.addListenerOnce(map.googleMap, 'tilesloaded', function () {
                  google.maps.event.trigger(currentMarker, 'click');
                });
              }
              else {
                jQuery.each(map.mapMarkers, function (index, currentMarker) {
                  google.maps.event.trigger(currentMarker, 'click');
                })
              }
            }
          });

          return true;
        },
        drupalSettings
      );
    },
    detach: function (context, drupalSettings) {}
  };
})(Drupal);
;
/**
 * @file
 * Control locate.
 */

(function ($, Drupal) {

  'use strict';

  /**
   * Locate control.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Attaches common map style functionality to relevant elements.
   */
  Drupal.behaviors.geolocationControlLocate = {
    attach: function (context, drupalSettings) {
      Drupal.geolocation.executeFeatureOnAllMaps(
        'control_locate',

        /**
         * @param {GeolocationMapInterface} map
         * @param {GeolocationMapFeatureSettings} featureSettings
         */
        function (map, featureSettings) {
          map.addInitializedCallback(function (map) {
            var locateButton = $('.geolocation-map-control .locate', map.wrapper);

            if (navigator.geolocation && window.location.protocol === 'finder.html') {
              locateButton.click(function (e) {
                navigator.geolocation.getCurrentPosition(function (currentPosition) {
                  var currentLocation = new google.maps.LatLng(currentPosition.coords.latitude, currentPosition.coords.longitude);
                  map.setCenterByCoordinates(currentLocation, currentPosition.coords.accuracy, 'google_control_locate');
                });
                e.preventDefault();
              });
            }
            else {
              locateButton.remove();
            }
          });

          return true;
        },
        drupalSettings
      );
    },
    detach: function (context, drupalSettings) {}
  };

})(jQuery, Drupal);
;
/**
 * @file
 * Zoom Control.
 */

/**
 * @typedef {Object} ControlZoomSettings
 *
 * @extends {GeolocationMapFeatureSettings}
 *
 * @property {String} behavior
 * @property {String} position
 * @property {String} style
 */

(function (Drupal) {

  'use strict';

  /**
   * Zoom control.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Attaches common map style functionality to relevant elements.
   */
  Drupal.behaviors.geolocationZoomControl = {
    attach: function (context, drupalSettings) {
      Drupal.geolocation.executeFeatureOnAllMaps(
        'control_zoom',

        /**
         * @param {GeolocationGoogleMap} map - Current map.
         * @param {ControlZoomSettings} featureSettings - Settings for current feature.
         */
        function (map, featureSettings) {
          map.addPopulatedCallback(function (map) {
            var options = {
              zoomControlOptions: {
                position: google.maps.ControlPosition[featureSettings.position],
                style: google.maps.ZoomControlStyle[featureSettings.style]
              }
            };

            if (featureSettings.behavior === 'always') {
              options.zoomControl = true;
            }
            else {
              options.zoomControl = undefined;
            }
            map.googleMap.setOptions(options);
          });

          return true;
        },
        drupalSettings
      );
    },
    detach: function (context, drupalSettings) {}
  };

})(Drupal);
;
/**
 * @file
 * Control MapType.
 */

/**
 * @typedef {Object} ControlMapTypeSettings
 *
 * @extends {GeolocationMapFeatureSettings}
 *
 * @property {String} position
 * @property {String} style
 * @property {String} behavior
 */

(function (Drupal) {

  'use strict';

  /**
   * Maptype control.
   *
   * @type {Drupal~behavior}
   *
   * @prop {Drupal~behaviorAttach} attach
   *   Attaches common map style functionality to relevant elements.
   */
  Drupal.behaviors.geolocationMapTypeControl = {
    attach: function (context, drupalSettings) {
      Drupal.geolocation.executeFeatureOnAllMaps(
        'control_maptype',

        /**
         * @param {GeolocationGoogleMap} map - Current map.
         * @param {ControlMapTypeSettings} featureSettings - Settings for current feature.
         */
        function (map, featureSettings) {
          map.addPopulatedCallback(function (map) {
            var options = {
              mapTypeControlOptions: {
                position: google.maps.ControlPosition[featureSettings.position],
                style: google.maps.MapTypeControlStyle[featureSettings.style]
              }
            };

            if (featureSettings.behavior === 'always') {
              options.mapTypeControl = true;
            }
            else {
              options.mapTypeControl = undefined;
            }

            map.googleMap.setOptions(options);
          });

          return true;
        },
        drupalSettings
      );
    },
    detach: function (context, drupalSettings) {}
  };

})(Drupal);
;
require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({4:[function(require,module,exports){
"use strict";

(function ($) {

  var $body = $("body");

  // $(document).ready(function () {
  //   var $toggle = $(".filters-toggle");
  //   var $filters = $('#' + $toggle.attr("aria-controls"));

  //   $toggle.off();
  //   $toggle.on("click", function(e){
  //     $(this).toggleClass("is-expanded");
  //     $filters.toggleClass("is-shown is-hidden");
  //     e.preventDefault();
  //   });
  // });

  Drupal.behaviors.myBehavior = {
    attach: function attach(context, settings) {
      var $toggle = $(".filters-toggle");
      var $filters = $('#' + $toggle.attr("aria-controls"));

      $toggle.parent().removeClass("is-toggled");
      $toggle.parent().addClass("is-toggled");

      $filters.removeClass("is-hidden");
      $filters.addClass("is-hidden");

      $toggle.off();
      $toggle.on("click", function (e) {
        $(this).toggleClass("is-expanded");
        $filters.toggleClass("is-shown is-hidden");
        e.preventDefault();
      });
    }
  };
  // $(".filter__map").remove();

  // });
})(jQuery);

},{}]},{},[4]);
;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/
(function ($, Drupal, debounce) {
  var offsets = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
  function getRawOffset(el, edge) {
    var $el = $(el);
    var documentElement = document.documentElement;
    var displacement = 0;
    var horizontal = edge === 'left' || edge === 'right';
    var placement = $el.offset()[horizontal ? 'left' : 'top'];
    placement -= window["scroll".concat(horizontal ? 'X' : 'Y')] || document.documentElement["scroll".concat(horizontal ? 'Left' : 'Top')] || 0;
    switch (edge) {
      case 'top':
        displacement = placement + $el.outerHeight();
        break;
      case 'left':
        displacement = placement + $el.outerWidth();
        break;
      case 'bottom':
        displacement = documentElement.clientHeight - placement;
        break;
      case 'right':
        displacement = documentElement.clientWidth - placement;
        break;
      default:
        displacement = 0;
    }
    return displacement;
  }
  function calculateOffset(edge) {
    var edgeOffset = 0;
    var displacingElements = document.querySelectorAll("[data-offset-".concat(edge, "]"));
    var n = displacingElements.length;
    for (var i = 0; i < n; i++) {
      var el = displacingElements[i];
      if (el.style.display === 'none') {
        continue;
      }
      var displacement = parseInt(el.getAttribute("data-offset-".concat(edge)), 10);
      if (isNaN(displacement)) {
        displacement = getRawOffset(el, edge);
      }
      edgeOffset = Math.max(edgeOffset, displacement);
    }
    return edgeOffset;
  }
  function calculateOffsets() {
    return {
      top: calculateOffset('top'),
      right: calculateOffset('right'),
      bottom: calculateOffset('bottom'),
      left: calculateOffset('left')
    };
  }
  function displace(broadcast) {
    offsets = calculateOffsets();
    Drupal.displace.offsets = offsets;
    if (typeof broadcast === 'undefined' || broadcast) {
      $(document).trigger('drupalViewportOffsetChange', offsets);
    }
    return offsets;
  }
  Drupal.behaviors.drupalDisplace = {
    attach: function attach() {
      if (this.displaceProcessed) {
        return;
      }
      this.displaceProcessed = true;
      $(window).on('resize.drupalDisplace', debounce(displace, 200));
    }
  };
  Drupal.displace = displace;
  $.extend(Drupal.displace, {
    offsets: offsets,
    calculateOffset: calculateOffset
  });
})(jQuery, Drupal, Drupal.debounce);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/
(function ($, Drupal, _ref) {
  var isTabbable = _ref.isTabbable;
  $.extend($.expr[':'], {
    tabbable: function tabbable(element) {
      Drupal.deprecationError({
        message: 'The :tabbable selector is deprecated in Drupal 9.2.0 and will be removed in Drupal 11.0.0. Use the core/tabbable library instead. See https://www.drupal.org/node/3183730'
      });
      if (element.tagName === 'SUMMARY' || element.tagName === 'DETAILS') {
        var tabIndex = element.getAttribute('tabIndex');
        if (tabIndex === null || tabIndex < 0) {
          return false;
        }
      }
      return isTabbable(element);
    }
  });
})(jQuery, Drupal, window.tabbable);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/
(function ($) {
  var cachedScrollbarWidth = null;
  var max = Math.max,
    abs = Math.abs;
  var regexHorizontal = /left|center|right/;
  var regexVertical = /top|center|bottom/;
  var regexOffset = /[+-]\d+(\.[\d]+)?%?/;
  var regexPosition = /^\w+/;
  var regexPercent = /%$/;
  var _position = $.fn.position;
  function getOffsets(offsets, width, height) {
    return [parseFloat(offsets[0]) * (regexPercent.test(offsets[0]) ? width / 100 : 1), parseFloat(offsets[1]) * (regexPercent.test(offsets[1]) ? height / 100 : 1)];
  }
  function parseCss(element, property) {
    return parseInt($.css(element, property), 10) || 0;
  }
  function getDimensions(elem) {
    var raw = elem[0];
    if (raw.nodeType === 9) {
      return {
        width: elem.width(),
        height: elem.height(),
        offset: {
          top: 0,
          left: 0
        }
      };
    }
    if ($.isWindow(raw)) {
      return {
        width: elem.width(),
        height: elem.height(),
        offset: {
          top: elem.scrollTop(),
          left: elem.scrollLeft()
        }
      };
    }
    if (raw.preventDefault) {
      return {
        width: 0,
        height: 0,
        offset: {
          top: raw.pageY,
          left: raw.pageX
        }
      };
    }
    return {
      width: elem.outerWidth(),
      height: elem.outerHeight(),
      offset: elem.offset()
    };
  }
  var collisions = {
    fit: {
      left: function left(position, data) {
        var within = data.within;
        var withinOffset = within.isWindow ? within.scrollLeft : within.offset.left;
        var outerWidth = within.width;
        var collisionPosLeft = position.left - data.collisionPosition.marginLeft;
        var overLeft = withinOffset - collisionPosLeft;
        var overRight = collisionPosLeft + data.collisionWidth - outerWidth - withinOffset;
        var newOverRight;
        if (data.collisionWidth > outerWidth) {
          if (overLeft > 0 && overRight <= 0) {
            newOverRight = position.left + overLeft + data.collisionWidth - outerWidth - withinOffset;
            position.left += overLeft - newOverRight;
          } else if (overRight > 0 && overLeft <= 0) {
            position.left = withinOffset;
          } else if (overLeft > overRight) {
            position.left = withinOffset + outerWidth - data.collisionWidth;
          } else {
            position.left = withinOffset;
          }
        } else if (overLeft > 0) {
          position.left += overLeft;
        } else if (overRight > 0) {
          position.left -= overRight;
        } else {
          position.left = max(position.left - collisionPosLeft, position.left);
        }
      },
      top: function top(position, data) {
        var within = data.within;
        var withinOffset = within.isWindow ? within.scrollTop : within.offset.top;
        var outerHeight = data.within.height;
        var collisionPosTop = position.top - data.collisionPosition.marginTop;
        var overTop = withinOffset - collisionPosTop;
        var overBottom = collisionPosTop + data.collisionHeight - outerHeight - withinOffset;
        var newOverBottom;
        if (data.collisionHeight > outerHeight) {
          if (overTop > 0 && overBottom <= 0) {
            newOverBottom = position.top + overTop + data.collisionHeight - outerHeight - withinOffset;
            position.top += overTop - newOverBottom;
          } else if (overBottom > 0 && overTop <= 0) {
            position.top = withinOffset;
          } else if (overTop > overBottom) {
            position.top = withinOffset + outerHeight - data.collisionHeight;
          } else {
            position.top = withinOffset;
          }
        } else if (overTop > 0) {
          position.top += overTop;
        } else if (overBottom > 0) {
          position.top -= overBottom;
        } else {
          position.top = max(position.top - collisionPosTop, position.top);
        }
      }
    },
    flip: {
      left: function left(position, data) {
        var within = data.within;
        var withinOffset = within.offset.left + within.scrollLeft;
        var outerWidth = within.width;
        var offsetLeft = within.isWindow ? within.scrollLeft : within.offset.left;
        var collisionPosLeft = position.left - data.collisionPosition.marginLeft;
        var overLeft = collisionPosLeft - offsetLeft;
        var overRight = collisionPosLeft + data.collisionWidth - outerWidth - offsetLeft;
        var myOffset = data.my[0] === 'left' ? -data.elemWidth : data.my[0] === 'right' ? data.elemWidth : 0;
        var atOffset = data.at[0] === 'left' ? data.targetWidth : data.at[0] === 'right' ? -data.targetWidth : 0;
        var offset = -2 * data.offset[0];
        var newOverRight;
        var newOverLeft;
        if (overLeft < 0) {
          newOverRight = position.left + myOffset + atOffset + offset + data.collisionWidth - outerWidth - withinOffset;
          if (newOverRight < 0 || newOverRight < abs(overLeft)) {
            position.left += myOffset + atOffset + offset;
          }
        } else if (overRight > 0) {
          newOverLeft = position.left - data.collisionPosition.marginLeft + myOffset + atOffset + offset - offsetLeft;
          if (newOverLeft > 0 || abs(newOverLeft) < overRight) {
            position.left += myOffset + atOffset + offset;
          }
        }
      },
      top: function top(position, data) {
        var within = data.within;
        var withinOffset = within.offset.top + within.scrollTop;
        var outerHeight = within.height;
        var offsetTop = within.isWindow ? within.scrollTop : within.offset.top;
        var collisionPosTop = position.top - data.collisionPosition.marginTop;
        var overTop = collisionPosTop - offsetTop;
        var overBottom = collisionPosTop + data.collisionHeight - outerHeight - offsetTop;
        var top = data.my[1] === 'top';
        var myOffset = top ? -data.elemHeight : data.my[1] === 'bottom' ? data.elemHeight : 0;
        var atOffset = data.at[1] === 'top' ? data.targetHeight : data.at[1] === 'bottom' ? -data.targetHeight : 0;
        var offset = -2 * data.offset[1];
        var newOverTop;
        var newOverBottom;
        if (overTop < 0) {
          newOverBottom = position.top + myOffset + atOffset + offset + data.collisionHeight - outerHeight - withinOffset;
          if (newOverBottom < 0 || newOverBottom < abs(overTop)) {
            position.top += myOffset + atOffset + offset;
          }
        } else if (overBottom > 0) {
          newOverTop = position.top - data.collisionPosition.marginTop + myOffset + atOffset + offset - offsetTop;
          if (newOverTop > 0 || abs(newOverTop) < overBottom) {
            position.top += myOffset + atOffset + offset;
          }
        }
      }
    },
    flipfit: {
      left: function left() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        collisions.flip.left.apply(this, args);
        collisions.fit.left.apply(this, args);
      },
      top: function top() {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }
        collisions.flip.top.apply(this, args);
        collisions.fit.top.apply(this, args);
      }
    }
  };
  $.position = {
    scrollbarWidth: function scrollbarWidth() {
      if (cachedScrollbarWidth !== undefined) {
        return cachedScrollbarWidth;
      }
      var div = $('<div ' + "style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'>" + "<div style='height:100px;width:auto;'></div></div>");
      var innerDiv = div.children()[0];
      $('body').append(div);
      var w1 = innerDiv.offsetWidth;
      div.css('overflow', 'scroll');
      var w2 = innerDiv.offsetWidth;
      if (w1 === w2) {
        w2 = div[0].clientWidth;
      }
      div.remove();
      cachedScrollbarWidth = w1 - w2;
      return cachedScrollbarWidth;
    },
    getScrollInfo: function getScrollInfo(within) {
      var overflowX = within.isWindow || within.isDocument ? '' : within.element.css('overflow-x');
      var overflowY = within.isWindow || within.isDocument ? '' : within.element.css('overflow-y');
      var hasOverflowX = overflowX === 'scroll' || overflowX === 'auto' && within.width < within.element[0].scrollWidth;
      var hasOverflowY = overflowY === 'scroll' || overflowY === 'auto' && within.height < within.element[0].scrollHeight;
      return {
        width: hasOverflowY ? $.position.scrollbarWidth() : 0,
        height: hasOverflowX ? $.position.scrollbarWidth() : 0
      };
    },
    getWithinInfo: function getWithinInfo(element) {
      var withinElement = $(element || window);
      var isWindow = $.isWindow(withinElement[0]);
      var isDocument = !!withinElement[0] && withinElement[0].nodeType === 9;
      var hasOffset = !isWindow && !isDocument;
      return {
        element: withinElement,
        isWindow: isWindow,
        isDocument: isDocument,
        offset: hasOffset ? $(element).offset() : {
          left: 0,
          top: 0
        },
        scrollLeft: withinElement.scrollLeft(),
        scrollTop: withinElement.scrollTop(),
        width: withinElement.outerWidth(),
        height: withinElement.outerHeight()
      };
    }
  };
  $.fn.position = function (options) {
    if (!options || !options.of) {
      return _position.apply(this, arguments);
    }
    options = $.extend({}, options);
    var within = $.position.getWithinInfo(options.within);
    var scrollInfo = $.position.getScrollInfo(within);
    var collision = (options.collision || 'flip').split(' ');
    var offsets = {};
    var target = typeof options.of === 'string' ? $(document).find(options.of) : $(options.of);
    var dimensions = getDimensions(target);
    var targetWidth = dimensions.width;
    var targetHeight = dimensions.height;
    var targetOffset = dimensions.offset;
    if (target[0].preventDefault) {
      options.at = 'left top';
    }
    var basePosition = $.extend({}, targetOffset);
    $.each(['my', 'at'], function () {
      var pos = (options[this] || '').split(' ');
      if (pos.length === 1) {
        pos = regexHorizontal.test(pos[0]) ? pos.concat(['center']) : regexVertical.test(pos[0]) ? ['center'].concat(pos) : ['center', 'center'];
      }
      pos[0] = regexHorizontal.test(pos[0]) ? pos[0] : 'center';
      pos[1] = regexVertical.test(pos[1]) ? pos[1] : 'center';
      var horizontalOffset = regexOffset.exec(pos[0]);
      var verticalOffset = regexOffset.exec(pos[1]);
      offsets[this] = [horizontalOffset ? horizontalOffset[0] : 0, verticalOffset ? verticalOffset[0] : 0];
      options[this] = [regexPosition.exec(pos[0])[0], regexPosition.exec(pos[1])[0]];
    });
    if (collision.length === 1) {
      collision[1] = collision[0];
    }
    if (options.at[0] === 'right') {
      basePosition.left += targetWidth;
    } else if (options.at[0] === 'center') {
      basePosition.left += targetWidth / 2;
    }
    if (options.at[1] === 'bottom') {
      basePosition.top += targetHeight;
    } else if (options.at[1] === 'center') {
      basePosition.top += targetHeight / 2;
    }
    var atOffset = getOffsets(offsets.at, targetWidth, targetHeight);
    basePosition.left += atOffset[0];
    basePosition.top += atOffset[1];
    return this.each(function () {
      var using;
      var elem = $(this);
      var elemWidth = elem.outerWidth();
      var elemHeight = elem.outerHeight();
      var marginLeft = parseCss(this, 'marginLeft');
      var marginTop = parseCss(this, 'marginTop');
      var collisionWidth = elemWidth + marginLeft + parseCss(this, 'marginRight') + scrollInfo.width;
      var collisionHeight = elemHeight + marginTop + parseCss(this, 'marginBottom') + scrollInfo.height;
      var position = $.extend({}, basePosition);
      var myOffset = getOffsets(offsets.my, elem.outerWidth(), elem.outerHeight());
      if (options.my[0] === 'right') {
        position.left -= elemWidth;
      } else if (options.my[0] === 'center') {
        position.left -= elemWidth / 2;
      }
      if (options.my[1] === 'bottom') {
        position.top -= elemHeight;
      } else if (options.my[1] === 'center') {
        position.top -= elemHeight / 2;
      }
      position.left += myOffset[0];
      position.top += myOffset[1];
      var collisionPosition = {
        marginLeft: marginLeft,
        marginTop: marginTop
      };
      $.each(['left', 'top'], function (i, dir) {
        if (collisions[collision[i]]) {
          collisions[collision[i]][dir](position, {
            targetWidth: targetWidth,
            targetHeight: targetHeight,
            elemWidth: elemWidth,
            elemHeight: elemHeight,
            collisionPosition: collisionPosition,
            collisionWidth: collisionWidth,
            collisionHeight: collisionHeight,
            offset: [atOffset[0] + myOffset[0], atOffset[1] + myOffset[1]],
            my: options.my,
            at: options.at,
            within: within,
            elem: elem
          });
        }
      });
      if (options.using) {
        using = function using(props) {
          var left = targetOffset.left - position.left;
          var right = left + targetWidth - elemWidth;
          var top = targetOffset.top - position.top;
          var bottom = top + targetHeight - elemHeight;
          var feedback = {
            target: {
              element: target,
              left: targetOffset.left,
              top: targetOffset.top,
              width: targetWidth,
              height: targetHeight
            },
            element: {
              element: elem,
              left: position.left,
              top: position.top,
              width: elemWidth,
              height: elemHeight
            },
            horizontal: right < 0 ? 'left' : left > 0 ? 'right' : 'center',
            vertical: bottom < 0 ? 'top' : top > 0 ? 'bottom' : 'middle'
          };
          if (targetWidth < elemWidth && abs(left + right) < targetWidth) {
            feedback.horizontal = 'center';
          }
          if (targetHeight < elemHeight && abs(top + bottom) < targetHeight) {
            feedback.vertical = 'middle';
          }
          if (max(abs(left), abs(right)) > max(abs(top), abs(bottom))) {
            feedback.important = 'horizontal';
          } else {
            feedback.important = 'vertical';
          }
          options.using.call(this, props, feedback);
        };
      }
      elem.offset($.extend(position, {
        using: using
      }));
    });
  };
  if (!$.hasOwnProperty('ui')) {
    $.ui = {};
  }
  $.ui.position = collisions;
})(jQuery);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/
(function ($, Drupal, drupalSettings) {
  drupalSettings.dialog = {
    autoOpen: true,
    dialogClass: '',
    buttonClass: 'button',
    buttonPrimaryClass: 'button--primary',
    close: function close(event) {
      Drupal.dialog(event.target).close();
      Drupal.detachBehaviors(event.target, null, 'unload');
    }
  };
  Drupal.dialog = function (element, options) {
    var undef;
    var $element = $(element);
    var dialog = {
      open: false,
      returnValue: undef
    };
    function openDialog(settings) {
      settings = $.extend({}, drupalSettings.dialog, options, settings);
      $(window).trigger('dialog:beforecreate', [dialog, $element, settings]);
      $element.dialog(settings);
      dialog.open = true;
      $(window).trigger('dialog:aftercreate', [dialog, $element, settings]);
    }
    function closeDialog(value) {
      $(window).trigger('dialog:beforeclose', [dialog, $element]);
      $element.dialog('close');
      dialog.returnValue = value;
      dialog.open = false;
      $(window).trigger('dialog:afterclose', [dialog, $element]);
    }
    dialog.show = function () {
      openDialog({
        modal: false
      });
    };
    dialog.showModal = function () {
      openDialog({
        modal: true
      });
    };
    dialog.close = closeDialog;
    return dialog;
  };
})(jQuery, Drupal, drupalSettings);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/
(function ($, Drupal, drupalSettings, debounce, displace) {
  drupalSettings.dialog = $.extend({
    autoResize: true,
    maxHeight: '95%'
  }, drupalSettings.dialog);
  function resetPosition(options) {
    var offsets = displace.offsets;
    var left = offsets.left - offsets.right;
    var top = offsets.top - offsets.bottom;
    var leftString = "".concat((left > 0 ? '+' : '-') + Math.abs(Math.round(left / 2)), "px");
    var topString = "".concat((top > 0 ? '+' : '-') + Math.abs(Math.round(top / 2)), "px");
    options.position = {
      my: "center".concat(left !== 0 ? leftString : '', " center").concat(top !== 0 ? topString : ''),
      of: window
    };
    return options;
  }
  function resetSize(event) {
    var positionOptions = ['width', 'height', 'minWidth', 'minHeight', 'maxHeight', 'maxWidth', 'position'];
    var adjustedOptions = {};
    var windowHeight = $(window).height();
    var option;
    var optionValue;
    var adjustedValue;
    for (var n = 0; n < positionOptions.length; n++) {
      option = positionOptions[n];
      optionValue = event.data.settings[option];
      if (optionValue) {
        if (typeof optionValue === 'string' && /%$/.test(optionValue) && /height/i.test(option)) {
          windowHeight -= displace.offsets.top + displace.offsets.bottom;
          adjustedValue = parseInt(0.01 * parseInt(optionValue, 10) * windowHeight, 10);
          if (option === 'height' && event.data.$element.parent().outerHeight() < adjustedValue) {
            adjustedValue = 'auto';
          }
          adjustedOptions[option] = adjustedValue;
        }
      }
    }
    if (!event.data.settings.modal) {
      adjustedOptions = resetPosition(adjustedOptions);
    }
    event.data.$element.dialog('option', adjustedOptions).trigger('dialogContentResize');
  }
  $(window).on({
    'dialog:aftercreate': function dialogAftercreate(event, dialog, $element, settings) {
      var autoResize = debounce(resetSize, 20);
      var eventData = {
        settings: settings,
        $element: $element
      };
      if (settings.autoResize === true || settings.autoResize === 'true') {
        $element.dialog('option', {
          resizable: false,
          draggable: false
        }).dialog('widget').css('position', 'fixed');
        $(window).on('resize.dialogResize scroll.dialogResize', eventData, autoResize).trigger('resize.dialogResize');
        $(document).on('drupalViewportOffsetChange.dialogResize', eventData, autoResize);
      }
    },
    'dialog:beforeclose': function dialogBeforeclose(event, dialog, $element) {
      $(window).off('.dialogResize');
      $(document).off('.dialogResize');
    }
  });
})(jQuery, Drupal, drupalSettings, Drupal.debounce, Drupal.displace);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/
(function ($, _ref) {
  var tabbable = _ref.tabbable,
    isTabbable = _ref.isTabbable;
  $.widget('ui.dialog', $.ui.dialog, {
    options: {
      buttonClass: 'button',
      buttonPrimaryClass: 'button--primary'
    },
    _createButtons: function _createButtons() {
      var opts = this.options;
      var primaryIndex;
      var index;
      var il = opts.buttons.length;
      for (index = 0; index < il; index++) {
        if (opts.buttons[index].primary && opts.buttons[index].primary === true) {
          primaryIndex = index;
          delete opts.buttons[index].primary;
          break;
        }
      }
      this._super();
      var $buttons = this.uiButtonSet.children().addClass(opts.buttonClass);
      if (typeof primaryIndex !== 'undefined') {
        $buttons.eq(index).addClass(opts.buttonPrimaryClass);
      }
    },
    _focusTabbable: function _focusTabbable() {
      var hasFocus = this._focusedElement ? this._focusedElement.get(0) : null;
      if (!hasFocus) {
        hasFocus = this.element.find('[autofocus]').get(0);
      }
      if (!hasFocus) {
        var $elements = [this.element, this.uiDialogButtonPane];
        for (var i = 0; i < $elements.length; i++) {
          var element = $elements[i].get(0);
          if (element) {
            var elementTabbable = tabbable(element);
            hasFocus = elementTabbable.length ? elementTabbable[0] : null;
          }
          if (hasFocus) {
            break;
          }
        }
      }
      if (!hasFocus) {
        var closeBtn = this.uiDialogTitlebarClose.get(0);
        hasFocus = closeBtn && isTabbable(closeBtn) ? closeBtn : null;
      }
      if (!hasFocus) {
        hasFocus = this.uiDialog.get(0);
      }
      $(hasFocus).eq(0).trigger('focus');
    }
  });
})(jQuery, window.tabbable);;
/**
 * @file
 * File init.js.
 */

(function (Drupal, settings) {
  Drupal.behaviors.googleTranslatorElement = {

    init: function () {
      var displayMode = settings.googleTranslatorElement.displayMode;
      new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: settings.googleTranslatorElement.languages,
        layout: google.translate.TranslateElement.InlineLayout[displayMode],
      }, settings.googleTranslatorElement.id);
    },

  };
})(Drupal, drupalSettings);
;
/**
 * @file
 * File disclaimer.js.
 */

(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.googleTranslatorDisclaimer = {

    getCookie: function (name) {
      // Check for google translations cookies.
      var i, x, y, cookies = document.cookie.split(";");
      for (i = 0; i < cookies.length; i++) {
        x = cookies[i].substring(0, cookies[i].indexOf("="));
        y = cookies[i].substring(cookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == name) {
          return decodeURIComponent(y);
        }
      }
    },

    attach: function (context, settings) {
      var disclaimerLink;
      var config = settings.googleTranslatorDisclaimer || {},
        disclaimerLink = $(config.selector, context),
        swap = function () {
          disclaimerLink.replaceWith(config.element);

          // When the gadget has loaded, focus on it.
          var translateGadgetObserver = new MutationObserver((mutations, obs) => {
            var displayMode = settings.googleTranslatorDisclaimer.displayMode;
            if (displayMode == "SIMPLE") {
              var gadget = document.getElementsByClassName('goog-te-menu-value')[0];
            } else {
              var gadget = document.getElementsByClassName('goog-te-combo')[0];
            }
            if (gadget) {
              // Focus on the link. I don't know why we need delay but something
              // keeps the focus from happening without it.
              window.setTimeout(() => gadget.focus(), 500);

              // Found the gadget, end the MutationObserver.
              obs.disconnect();
              return;
            }
          })

          // start observing
          translateGadgetObserver.observe(document, {
            childList: true,
            subtree: true
          });
        };

      // When the user has previously activated google translate, the cookie
      // will be set and we can proceed straight to exposing the language
      // button without the disclaimer interstitial.
      if ((disclaimerLink.length &&
          typeof this.getCookie('googtrans') != 'undefined')
          || (config.disclaimer.trim().length == 0)) {
        swap();
      }
      else {
        // Listen for user click on the translate interstitial (disclaimer) link.
        disclaimerLink.click(function (event) {

          // Show the disclaimer text if available.
          if (config.disclaimer &&
              config.disclaimer.trim().length > 0) {

            var disclaimerModal = $('<div class="message">' + config.disclaimer + '<div>').appendTo('body');
            Drupal.dialog(disclaimerModal, {
              title: config.disclaimerTitle,
              classes: {
                'ui-dialog': 'google-translator-disclaimer-modal',
              },
              width: 'auto',
              buttons: [
                {
                  text: config.acceptText,
                  click: function() {
                    $(this).dialog('close');
                    swap();
                  }
                },
                {
                  text: config.dontAcceptText,
                  click: function() {
                    $(this).dialog('close');
                  }
                }
              ]
            }).showModal();
          }

          // If the disclaimer text is not available, then just show the gadget.
          else {
            swap();
          }
        });
      }
    }

  }
})(jQuery, Drupal);
;
console.log('logger.html');

var logger = {};

logger.canLog = null;
logger.canApply = null;

// define contexts and whether they can console.log or not
logger.debugSettings = {
  master: true,
  multimedia: true
};

/**
 * Check if we are in a console capable system
 */
logger.init = function() {
  logger.canLog = typeof console !== 'undefined' && typeof console.log !== 'undefined';
  logger.canApply = typeof console.log.apply !== 'undefined';
};

/**
 * Log a message, taking context and loggability into account.
 */
logger.log = function() {
  var context = 'master',
    thisArguments = Array.prototype.slice.call(arguments);

  if (logger.canLog === null) {
    logger.init();
  }

  if (arguments.length > 1) {
    if (typeof arguments[0] === 'string' && typeof logger.debugSettings[arguments[0]] !== 'undefined') {
      console.log(arguments);
      console.log(thisArguments);
      context = arguments[0];
      thisArguments.shift();
    }
  }

  if (typeof logger.debugSettings[context] !== 'undefined' && logger.debugSettings[context]) {
    if (logger.canLog) {
      if (logger.canApply) {
        return console.log.apply(console, thisArguments);
      }

      // non-apply version for some browsers (*cough* ie)
      console.log(thisArguments);
    }
  }
};
;
/*!
 * hoverIntent v1.8.1 // 2014.08.11 // jQuery v1.9.1+
 * http://briancherne.github.io/jquery-hoverIntent/
 *
 * You may use hoverIntent under the terms of the MIT license. Basically that
 * means you are free to use hoverIntent as long as this header is left intact.
 * Copyright 2007, 2014 Brian Cherne
 */

/* hoverIntent is similar to jQuery's built-in "hover" method except that
 * instead of firing the handlerIn function immediately, hoverIntent checks
 * to see if the user's mouse has slowed down (beneath the sensitivity
 * threshold) before firing the event. The handlerOut function is only
 * called after a matching handlerIn.
 *
 * // basic usage ... just like .hover()
 * .hoverIntent( handlerIn, handlerOut )
 * .hoverIntent( handlerInOut )
 *
 * // basic usage ... with event delegation!
 * .hoverIntent( handlerIn, handlerOut, selector )
 * .hoverIntent( handlerInOut, selector )
 *
 * // using a basic configuration object
 * .hoverIntent( config )
 *
 * @param  handlerIn   function OR configuration object
 * @param  handlerOut  function OR selector for delegation OR undefined
 * @param  selector    selector OR undefined
 * @author Brian Cherne <brian(at)cherne(dot)net>
 */

;(function(factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (jQuery && !jQuery.fn.hoverIntent) {
        factory(jQuery);
    }
})(function($) {
    'use strict';

    // default configuration values
    var _cfg = {
        interval: 100,
        sensitivity: 6,
        timeout: 0
    };

    // counter used to generate an ID for each instance
    var INSTANCE_COUNT = 0;

    // current X and Y position of mouse, updated during mousemove tracking (shared across instances)
    var cX, cY;

    // saves the current pointer position coordinates based on the given mousemove event
    var track = function(ev) {
        cX = ev.pageX;
        cY = ev.pageY;
    };

    // compares current and previous mouse positions
    var compare = function(ev,$el,s,cfg) {
        // compare mouse positions to see if pointer has slowed enough to trigger `over` function
        if ( Math.sqrt( (s.pX-cX)*(s.pX-cX) + (s.pY-cY)*(s.pY-cY) ) < cfg.sensitivity ) {
            $el.off(s.event,track);
            delete s.timeoutId;
            // set hoverIntent state as active for this element (permits `out` handler to trigger)
            s.isActive = true;
            // overwrite old mouseenter event coordinates with most recent pointer position
            ev.pageX = cX; ev.pageY = cY;
            // clear coordinate data from state object
            delete s.pX; delete s.pY;
            return cfg.over.apply($el[0],[ev]);
        } else {
            // set previous coordinates for next comparison
            s.pX = cX; s.pY = cY;
            // use self-calling timeout, guarantees intervals are spaced out properly (avoids JavaScript timer bugs)
            s.timeoutId = setTimeout( function(){compare(ev, $el, s, cfg);} , cfg.interval );
        }
    };

    // triggers given `out` function at configured `timeout` after a mouseleave and clears state
    var delay = function(ev,$el,s,out) {
        delete $el.data('hoverIntent')[s.id];
        return out.apply($el[0],[ev]);
    };

    $.fn.hoverIntent = function(handlerIn,handlerOut,selector) {
        // instance ID, used as a key to store and retrieve state information on an element
        var instanceId = INSTANCE_COUNT++;

        // extend the default configuration and parse parameters
        var cfg = $.extend({}, _cfg);
        if ( $.isPlainObject(handlerIn) ) {
            cfg = $.extend(cfg, handlerIn);
            if ( !$.isFunction(cfg.out) ) {
                cfg.out = cfg.over;
            }
        } else if ( $.isFunction(handlerOut) ) {
            cfg = $.extend(cfg, { over: handlerIn, out: handlerOut, selector: selector } );
        } else {
            cfg = $.extend(cfg, { over: handlerIn, out: handlerIn, selector: handlerOut } );
        }

        // A private function for handling mouse 'hovering'
        var handleHover = function(e) {
            // cloned event to pass to handlers (copy required for event object to be passed in IE)
            var ev = $.extend({},e);

            // the current target of the mouse event, wrapped in a jQuery object
            var $el = $(this);

            // read hoverIntent data from element (or initialize if not present)
            var hoverIntentData = $el.data('hoverIntent');
            if (!hoverIntentData) { $el.data('hoverIntent', (hoverIntentData = {})); }

            // read per-instance state from element (or initialize if not present)
            var state = hoverIntentData[instanceId];
            if (!state) { hoverIntentData[instanceId] = state = { id: instanceId }; }

            // state properties:
            // id = instance ID, used to clean up data
            // timeoutId = timeout ID, reused for tracking mouse position and delaying "out" handler
            // isActive = plugin state, true after `over` is called just until `out` is called
            // pX, pY = previously-measured pointer coordinates, updated at each polling interval
            // event = string representing the namespaced event used for mouse tracking

            // clear any existing timeout
            if (state.timeoutId) { state.timeoutId = clearTimeout(state.timeoutId); }

            // namespaced event used to register and unregister mousemove tracking
            var mousemove = state.event = 'mousemove.hoverIntent.hoverIntent'+instanceId;

            // handle the event, based on its type
            if (e.type === 'mouseenter') {
                // do nothing if already active
                if (state.isActive) { return; }
                // set "previous" X and Y position based on initial entry point
                state.pX = ev.pageX; state.pY = ev.pageY;
                // update "current" X and Y position based on mousemove
                $el.off(mousemove,track).on(mousemove,track);
                // start polling interval (self-calling timeout) to compare mouse coordinates over time
                state.timeoutId = setTimeout( function(){compare(ev,$el,state,cfg);} , cfg.interval );
            } else { // "mouseleave"
                // do nothing if not already active
                if (!state.isActive) { return; }
                // unbind expensive mousemove event
                $el.off(mousemove,track);
                // if hoverIntent state is true, then call the mouseOut function after the specified delay
                state.timeoutId = setTimeout( function(){delay(ev,$el,state,cfg.out);} , cfg.timeout );
            }
        };

        // listen for mouseenter and mouseleave
        return this.on({'mouseenter.hoverIntent':handleHover,'mouseleave.hoverIntent':handleHover}, cfg.selector);
    };
});
;
/*!
 * enquire.js v2.1.6 - Awesome Media Queries in JavaScript
 * Copyright (c) 2017 Nick Williams - http://wicky.nillia.ms/enquire.js
 * License: MIT */

!function(a){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=a();else if("function"==typeof define&&define.amd)define([],a);else{var b;b="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,b.enquire=a()}}(function(){return function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){function d(a,b){this.query=a,this.isUnconditional=b,this.handlers=[],this.mql=window.matchMedia(a);var c=this;this.listener=function(a){c.mql=a.currentTarget||a,c.assess()},this.mql.addListener(this.listener)}var e=a(3),f=a(4).each;d.prototype={constuctor:d,addHandler:function(a){var b=new e(a);this.handlers.push(b),this.matches()&&b.on()},removeHandler:function(a){var b=this.handlers;f(b,function(c,d){if(c.equals(a))return c.destroy(),!b.splice(d,1)})},matches:function(){return this.mql.matches||this.isUnconditional},clear:function(){f(this.handlers,function(a){a.destroy()}),this.mql.removeListener(this.listener),this.handlers.length=0},assess:function(){var a=this.matches()?"on":"off";f(this.handlers,function(b){b[a]()})}},b.exports=d},{3:3,4:4}],2:[function(a,b,c){function d(){if(!window.matchMedia)throw new Error("matchMedia not present, legacy browsers require a polyfill");this.queries={},this.browserIsIncapable=!window.matchMedia("only all").matches}var e=a(1),f=a(4),g=f.each,h=f.isFunction,i=f.isArray;d.prototype={constructor:d,register:function(a,b,c){var d=this.queries,f=c&&this.browserIsIncapable;return d[a]||(d[a]=new e(a,f)),h(b)&&(b={match:b}),i(b)||(b=[b]),g(b,function(b){h(b)&&(b={match:b}),d[a].addHandler(b)}),this},unregister:function(a,b){var c=this.queries[a];return c&&(b?c.removeHandler(b):(c.clear(),delete this.queries[a])),this}},b.exports=d},{1:1,4:4}],3:[function(a,b,c){function d(a){this.options=a,!a.deferSetup&&this.setup()}d.prototype={constructor:d,setup:function(){this.options.setup&&this.options.setup(),this.initialised=!0},on:function(){!this.initialised&&this.setup(),this.options.match&&this.options.match()},off:function(){this.options.unmatch&&this.options.unmatch()},destroy:function(){this.options.destroy?this.options.destroy():this.off()},equals:function(a){return this.options===a||this.options.match===a}},b.exports=d},{}],4:[function(a,b,c){function d(a,b){var c=0,d=a.length;for(c;c<d&&b(a[c],c)!==!1;c++);}function e(a){return"[object Array]"===Object.prototype.toString.apply(a)}function f(a){return"function"==typeof a}b.exports={isFunction:f,isArray:e,each:d}},{}],5:[function(a,b,c){var d=a(2);b.exports=new d},{2:2}]},{},[5])(5)});;
require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({15:[function(require,module,exports){
'use strict';

// 
// CAS header.js
// 
// var enquire = require('enquire');
var mega = require('./lib/mega');

// to top right away
if (window.location.hash) scroll(0, 0);
// void some browsers issue
setTimeout(function () {
  scroll(0, 0);
}, 1);

//
//  Initialize the header.
//
var HeaderModule = function HeaderModule($, enquire) {

  var $header;
  // var $headerMobile;
  var $mega;
  var dragging;
  var $body;
  // var $tabletNav;
  // var $desktopNav;


  // 
  // Header state manager
  // @type {Object}
  // 
  var state = {
    header: 'default',
    mobileIsInitialized: false,
    hidden: true
    // tabletIsInitialized: false
  };

  // 
  // Generates the markup for the mobile header and populates it
  //  with content scraped from the default desktop header.
  // 
  function createMobileHeader() {}

  // return $(mobileHeaderTemplate.render({
  //   logo: $('#branding').html(),
  //   nav: $headerDefault.find('#navigation .main-menu').html(),
  //   mega: $headerDefault.find('.nav--mega-wrapper').html(),
  //   search: $headerDefault.find('.tab-panel')[0].outerHTML,
  //   locationsLink: $headerDefault.find('a.toolbar-menu-locations').attr('href'),
  //   accountLink: $headerDefault.find('a.my-account-link').attr('href'),
  //   card: $headerDefault.find('a.user-menu-get-card')[0].outerHTML,
  //   contact: $headerDefault.find('a.toolbar-menu-contact-us')[0].outerHTML,
  //   languages: {
  //     es: $headerDefault.find('a.toolbar-menu-espanol')[0].outerHTML,
  //     ar: $headerDefault.find('a.toolbar-menu-arabic')[0].outerHTML
  //   }
  // }));


  /*
   // 
  // Generates the markup for the tablet navigation populates it
  //  with content scraped from the default desktop header.
  // 
  function createTabletNav() {
     return $(tabletNavTemplate.render({
      nav: $headerDefault.find('#navigation .main-menu').html(),
      mega: $headerDefault.find('.nav--mega-wrapper').html(),
    }));
  }
  */

  // 
  // Sets the header to the appropriate state
  // @param {[type]} state [description]
  // 
  function setHeaderTo(targetState) {
    if (targetState == "mobile") {
      $('#block-googletranslator').appendTo('.nav--mobile--primary');
      console.log('this is mobile');
    } else {
      console.log('this is not mobile');
      $('#block-googletranslator').appendTo('#header .header__navigation .header__menu-utility');
    }
    if (targetState === state.header) {
      return targetState;
    }

    state.header = targetState;
    $('body').toggleClass("is--mobile", state.header == "mobile");
    hideNav();
    if ($('.nav-trigger').prop('checked')) {
      $('.nav-trigger').click();
    }
    /*
    switch (targetState) {
      case 'mobile':
        $headerDefault.replaceWith($headerMobile);
        break;
      default:
        $headerMobile.replaceWith($headerDefault);
        break;
    }
    */

    // Re init Tabs
    // tabs.init();
    // Re in nav
    // initTablet();
    return targetState;
  }

  // 
  // Enquire.js initialization.
  // 
  function initEnquire() {

    // Mobile media query.
    enquire.register("screen and (max-width:991px)", {

      match: function match() {
        setHeaderTo('mobile');
        mega.setBreakpoint('mobile');
      },

      unmatch: function unmatch() {
        setHeaderTo('default');
      }
    });

    /*
    // Tablet media query.
    enquire.register("screen and (min-width:768px) and (max-width: 991px)", {
       match: function() {
        $('#block-menu-block-npl-global-main .menu-toggle').trigger('collapse.toggle');
        mega.setBreakpoint('tablet');
        initTablet();
        // Replace the main nav block contents with the tablet nav.
        $('#block-menu-block-npl-global-main > .block-content')
          .html($tabletNav);
        $('#navigation > .nav--mega-wrapper').hide();
      },
       unmatch: function() {
        $('#block-menu-block-npl-global-main .menu-toggle').trigger('expand.toggle');
      },
    });
    */

    // Desktop media query.
    enquire.register("screen and (min-width:992px)", {

      match: function match() {
        mega.setBreakpoint('desktop');
        // $mega.appendTo('#navigation');
        setHeaderTo('default');

        // $('#block-menu-block-npl-global-main > .block-content')
        //   .html($desktopNav);
      }
    });
  }

  function initScroll() {
    $(window).on("scroll", function () {
      var fromTop = $(window).scrollTop();
      $('body').toggleClass("is--scrolled", fromTop > 0);
      updateHeaderPadding();
    });

    $(window).on("resize", function () {
      updateHeaderPadding();
    });

    var fromTop = $(window).scrollTop();
    $('body').toggleClass("is--scrolled", fromTop > 0);
    updateHeaderPadding();

    $("#header a[href*='#']").on('click', function (e) {
      if (window.location.pathname == this.pathname) {
        e.preventDefault();
        scrollToHash(this);
        mega.hide();
        if (history.pushState) {
          history.pushState(null, null, this.hash);
        } else {
          location.hash = this.hash;
        }
      }
    });

    if (window.location.hash) {
      scrollToHash(window.location);
    }
  }

  function scrollToHash($target) {
    var scrollHeight = document.body.scrollHeight;

    var bodyOffset = 200;
    if ($('body').hasClass("is--scrolled")) {
      bodyOffset = 120;
    }
    $('html, body').stop(true).animate({
      scrollTop: $($target.hash).offset().top - bodyOffset + 'px'
    }, {
      progress: function progress() {
        // If the page scroll height changes, scroll afresh to the shifted target
        if (scrollHeight !== document.body.scrollHeight) {
          scrollToHash($target);
        }
      }
    }, 500, 'swing');
  }

  function updateHeaderPadding() {
    var headerHeight = $header.height();

    if ($(".toolbar-horizontal").length > 0) {
      var toolbar = $(".toolbar-bar");
      var toolbarHeight = toolbar.height();
      headerHeight += toolbarHeight + toolbarHeight;
    }

    if ($(".toolbar-vertical").length > 0) {
      var toolbar = $(".toolbar-bar");
      var toolbarHeight = toolbar.height();
      headerHeight += toolbarHeight;
    }

    $('body').css("padding-top", headerHeight);
  }

  /*
  // 
  // Toggles a tab pane on.
  //   Used for the main mobile navigation.
  // @param  {Object} el The tabe node that was clicked.
  // 
  function toggleMobileTabs(el) {
    var $target;
    var data;
    var $btn;
     $btn = $(el);
    data = $btn.data();
     if (data.hasOwnProperty('target')) {
       $target = $('#' + data.target);
      if ($btn.is('.is-expanded')) {
        mega.hide();
      }
       // Button
      $btn.toggleClass('is-collapsed')
        .toggleClass('is-expanded');
       // Panel
      $target.toggleClass('is-collapsed')
        .toggleClass('is-expanded');
    }
  }
  */

  /*
  // 
  // Initialize Mobile toggles
  // 
  function initMobileToggles() {
    var $menu;
    var $btns;
     $('body').delegate('.menu-toggle', 'click', function() {
      $menu = $('#header').find('.mobile-header-menu');
      $btns = $menu.find('.menu-toggle');
       toggleMobileTabs(this);
       // collapse any open toggles.
      $menu
        .find('.menu-toggle')
        .not(this)
        .filter('.is-expanded')
        .each(function() {
          toggleMobileTabs(this);
        });
    });
  }
  */

  function initMobileToggle() {
    $('.nav-trigger').on('change', function (e) {
      $('html')[e.target.checked ? 'addClass' : 'removeClass']('nav--is-shown');
      handleBackTap();
    });
  }

  function handleBackTap(e) {
    state.hidden = true;
    hideNav();
  }

  function hideNav() {
    // $('.nav--mobile--secondary .mobile--subnav').removeClass('is--expanded');
    $('.nav--mobile-wrapper').removeClass('is--expanded');
    state.hidden = true;
  }

  function handleLinkTap(e) {
    if (dragging) {
      return;
    }

    var panelId = $(e.target).attr('aria-controls');
    if (!panelId) {
      return;
    } else {
      toggleMobileNav(panelId);
      state.hidden = false;
      e.preventDefault();
    }
    // Add a class to html to detect taps events.
    $('html').addClass('is-touch');
  }

  function handleLinkClick(e) {
    var panelId = $(e.target).attr('aria-controls');
    if (!panelId) {
      return;
    } else {
      if ($('.nav--mobile--secondary .' + panelId).length > 0) {
        toggleMobileNav(panelId);
        state.hidden = false;
        e.preventDefault();
      } else {
        return;
      }
    }
  }

  function toggleMobileNav(panelId) {
    if ($('.nav--mobile--secondary .' + panelId).length > 0) {
      $('.nav--mobile-wrapper').addClass('is--expanded');
      $('.nav--mobile--secondary .mobile--subnav').removeClass('is--expanded');
      $('.nav--mobile--secondary .' + panelId).addClass('is--expanded');
    }
  }

  // 
  // Initialize the mobile header.
  // 
  function initMobile() {
    if (state.mobileIsInitialized) {
      return;
    }

    // Render mobile template.
    // $headerMobile = createMobileHeader();
    initMobileToggle();

    state.mobileIsInitialized = true;

    $('.nav--mobile-wrapper .nav--mobile--primary .menu--primary .menu__link').each(function () {
      var aria = $(this).attr("aria-controls");
      if (aria) {
        // console.log($(this));
        aria = aria.replace("submenu", "mobile");
        $(this).attr("aria-controls", aria);
      }
    });

    $body.delegate('.nav--mobile-wrapper .nav--mobile--primary .menu--primary .menu__link', {
      touchend: handleLinkTap,
      click: handleLinkClick
    });

    $body.bind('touchstart', function () {
      dragging = false;
    });
    $body.bind('touchmove', function () {
      dragging = true;
    });

    $body.delegate('.mega-back', {
      click: handleBackTap
    });
  }

  /*
   // 
  // Initialize the tablet header.
  // 
  function initTablet() {
    if (state.tabletIsInitialized) { return; }
     // Render mobile template.
    $tabletNav = createTabletNav();
     state.tabletIsInitialized = true;
     $('body').delegate('.menu-toggle', 'collapse.toggle', mega.hide);
  }
  */

  // 
  // Public Methods
  // 
  return {
    init: function init() {
      $body = $('body');
      mega.init();
      $mega = $('.nav--mega-wrapper');
      $header = $('#header');
      // $desktopNav = $('#block-menu-block-npl-global-main > .block-content').html();
      initMobile();
      // initTablet();
      // tabs.init();
      initMobileToggle();
      initEnquire();
      initScroll();
      // updateHeaderPadding();
      setInterval(updateHeaderPadding, 50);
    }
  };
};
module.exports = HeaderModule();

HeaderModule(jQuery, enquire).init();

},{"./lib/mega":17}],17:[function(require,module,exports){
'use strict';

console.log('mega.html');

/**
 * CA Mega Menu JS
 */

function mega($) {
  var dragging;
  var navMenu;
  var navItem;
  var navLink;
  var navMega;
  var navMegaWrapper;
  var navMobileWrapper;
  var navHeader;
  var navBack;
  var $body;
  // var width_desktop;
  // var width_mobile;

  var state = {
    hidden: true,
    breakpoint: 'desktop',
    active: 'submenu--about'
  };
  var hideTimeout;

  var showOn = {
    mobile: function mobile(panelId) {
      navMobileWrapper.attr('aria-hidden', false);
      navHeader.attr('aria-hidden', true);
      navMegaWrapper.attr('aria-hidden', true);
    },

    desktop: function desktop(panelId) {
      // navMegaWrapper.fadeIn(200);
      navMobileWrapper.attr('aria-hidden', true);
      navHeader.attr('aria-hidden', false);
      navMegaWrapper.attr('aria-hidden', false);
    }
  };

  var hideOn = {
    mobile: function mobile() {
      navMobileWrapper.attr('aria-hidden', false);
      navHeader.attr('aria-hidden', true);
      navMegaWrapper.attr('aria-hidden', true);
    },

    // tablet: function() {
    //   // $('#tablet-header-nav').attr('aria-expanded', false);
    //   navMegaWrapper.attr('aria-hidden', true);
    // },

    desktop: function desktop() {
      // navMegaWrapper.fadeOut(200);
      navMobileWrapper.attr('aria-hidden', true);
      navHeader.attr('aria-hidden', false);
      navMegaWrapper.attr('aria-hidden', true);
      // hideAll();
    }
  };

  function hideAll() {
    $('.nav--mega-wrapper').attr('aria-hidden', true);
    $('.nav--mega').attr('aria-hidden', true);
    navLink.removeClass('is-active');
  }

  function activatePanel(panelId) {
    state.active = panelId;
    hideAll();
    $('[aria-controls="' + panelId + '"]').addClass('is-active');
    $('.nav--mega-wrapper').attr('aria-hidden', false);
    $('#' + panelId).attr('aria-hidden', false);
  }

  //
  // Handlers
  //


  function handleLinkTap(e) {
    if (dragging) {
      return;
    }

    var panelId = $(e.target).attr('aria-controls');
    if (!panelId) {
      return;
    } else {
      activatePanel(panelId);
      window.clearTimeout(hideTimeout);
      state.hidden = false;
      pub.show(panelId);
      e.preventDefault();
    }
    // Add a class to html to detect taps events.
    $('html').addClass('is-touch');
  }

  function handleLinkClick(e) {
    if (state.breakpoint !== 'tablet') {
      return;
    }
    var panelId = $(e.target).attr('aria-controls');
    if (!panelId) {
      return;
    } else {
      activatePanel(panelId);
      window.clearTimeout(hideTimeout);
      state.hidden = false;
      pub.show(panelId);
      e.preventDefault();
    }
  }

  function handleBackTap(e) {
    // state.hidden = true;
    pub.hide();
  }

  function handleLinkMouseout(e) {
    // console.log("handleLinkMouseout");
    if (state.breakpoint !== 'desktop') {
      return;
    }
    window.clearTimeout(hideTimeout);
    state.hidden = true;
    hideTimeout = setTimeout(function () {
      if (state.hidden) {
        pub.hide();
      }
    }, 1000);
  }

  function handleMouseout(e) {
    // console.log("handleMouseout");
    if (state.breakpoint !== 'desktop') {
      return;
    }
    window.clearTimeout(hideTimeout);
    state.hidden = true;
    hideTimeout = setTimeout(function () {
      if (state.hidden) {
        pub.hide();
      }
    }, 1000);
  }

  function handleLinkMouseover(e) {
    // console.log("handleLinkMouseover");
    if (state.breakpoint !== 'desktop') {
      return;
    }
    var panelId = $(e.target).attr('aria-controls');
    if (!panelId) {
      console.log("NO panelId");
      handleMouseout(e);
    } else {
      activatePanel(panelId);
      // handleMouseover(e);
      if (state.breakpoint !== 'desktop') {
        return;
      }
      state.hidden = false;
      window.clearTimeout(hideTimeout);
    }
  }

  function handleMouseover(e) {
    // console.log("handleMouseover", state.breakpoint);
    if (state.breakpoint !== 'desktop') {
      return;
    }
    state.hidden = false;
    window.clearTimeout(hideTimeout);
  }

  function bindUi() {

    // Hide and Show megamenu on mouseover nav items.
    $body.delegate('.menu--main .menu__link', {
      // mouseover: handleLinkMouseover,
      // mouseout: handleMouseout,
      touchend: handleLinkTap,
      click: handleLinkClick
    });

    $body.bind('touchstart', function () {
      dragging = false;
    });
    $body.bind('touchmove', function () {
      dragging = true;
    });

    $('.menu--main .menu__link[aria-controls]').hoverIntent({
      over: handleLinkMouseover,
      out: handleLinkMouseout,
      interval: 75
    });

    $('.menu--primary > .menu--main > li.menu__item--search > a').on('click', function (e) {
      e.preventDefault();
      $("#edit-search").focus();
    });

    $('.nav--mega-wrapper').hoverIntent({
      over: handleMouseover,
      out: handleMouseout,
      interval: 75
    });

    $body.delegate('.mega-back', {
      click: handleBackTap
    });
  }

  var pub = {
    init: function init() {
      navMenu = $('.menu--primary');
      navItem = $('.menu--primary > .menu--main > li');
      navLink = $('.menu--primary > .menu--main > li > a');
      navMega = $('.nav--mega');
      navMegaWrapper = $('.nav--mega-wrapper');
      navMobileWrapper = $('.nav--mobile-wrapper');
      navHeader = $('.header__navigation');
      navBack = $('.mega-back');
      $body = $('body');
      bindUi();
    },

    hide: function hide() {
      state.hidden = true;
      $('body').removeClass('mega--is-open');
      // hideOn[state.breakpoint]();
      hideAll();
    },

    show: function show(panelId) {
      $('body').addClass('mega--is-open');
      state.hidden = false;
      showOn[state.breakpoint](panelId);
    },

    setPanel: activatePanel,

    setBreakpoint: function setBreakpoint(breakpoint) {
      hideOn[breakpoint]();
      state.breakpoint = breakpoint;
    }
  };

  return pub;
}

module.exports = mega(jQuery);

},{}]},{},[15]);
;
