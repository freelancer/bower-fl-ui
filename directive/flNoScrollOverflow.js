'use strict';

angular.module('flUi')

/**
 * @ngdoc directive
 * @name flUi.directive:flNoScrollOverflow
 * @element A
 * @function
 *
 * @description
 * A directive that prevents scrolling in a scrollable element from overflowing
 * onto the page, e.g. scrolling to the top of the message list in the chatbox
 * then continuing to scroll moves the page up. This blocks that by detecting
 * the scroll event, maxxing out the scrollTop to top or bottom manually, and
 * blocking the event from bubbling up the DOM.
 *
 */
.directive('flNoScrollOverflow', function() {
  return {
    restrict: 'A',
    scope: false,
    link: function(scope, elem) {
      elem.bind('DOMMouseScroll mousewheel', function(e) {
        var rawElement = elem[0];
        var scrollTop    = rawElement.scrollTop,
            scrollHeight = rawElement.scrollHeight,
            height       = rawElement.clientHeight,
            delta = (e.type === 'DOMMouseScroll' ?
              e.originalEvent.detail * -40 : e.originalEvent.wheelDelta
            ),
            up = delta > 0;

        // If we hit bottom, set scrollTop to maximum and stop propagation
        if (!up && -delta > scrollHeight - height - scrollTop) {
          e.stopPropagation();
          e.preventDefault();
          rawElement.scrollTop = scrollHeight;
          return false;
        }

        // If we hit top, set scrollTop to 0 and stop propagation
        if (up && delta > scrollTop) {
          e.stopPropagation();
          e.preventDefault();
          rawElement.scrollTop = 0;
          return false;
        }
      });
    }
  };
});
