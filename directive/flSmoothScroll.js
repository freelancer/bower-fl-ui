'use strict';

angular.module('flUi')
  // Smooth scroll to an achor tag
  .directive('flSmoothScroll', function($window, $document, $interval) {
    return {
      link: function($scope, element, attrs) {

        // easeInOutCubic: acceleration until halfway, then deceleration
        function easing(time) {
          if (time < 0.5) {
            return 4 * time * time * time;
          } else {
            return (time - 1) * (2 * time - 2) * (2 * time - 2) + 1;
          }
        }

        function doScroll(anchor) {
          var speed = 500;
          var container = $document[0].querySelector('.scroll-container');
          // The way the main container is setted up (height=100% and
          // overflow:auto) prevent us from using the traditional
          // window.pageYOffset & window.scrollBy. The work around is to
          // act directly on the container DOM element.
          var startLocation = container ? container.scrollTop :
            $window.pageYOffset;

          // getBoundingClientRect returns value relative to the viewport,
          // so it gives us the actual distance to move. We just need to
          // make up for the fixed header (if any).
          var headerHeight = container.getBoundingClientRect().top;
          var scrollToBottom = container.scrollHeight -
                                container.clientHeight;

          var offset = attrs.flSmoothScrollOffset || 10;
          var distance = anchor.getBoundingClientRect().top - headerHeight -
          offset;
          if (scrollToBottom < distance) {
            distance = scrollToBottom;
          }

          var startTime;
          var percentage, position;
          function step(time) {
            if (typeof startTime === 'undefined') {
              startTime = time;
            }
            percentage = ((time - startTime) / speed);
            if (percentage <= 1) {
              position = startLocation + (distance * easing(percentage));
              if (container) {
                container.scrollTop = Math.floor(position);
              } else {
                $window.scrollBy(0, Math.floor(position));
              }
              $window.requestAnimationFrame(step);
            }
          }
          $window.requestAnimationFrame(step);
        }

        element.on('click', function() {
          var anchorName = attrs.flSmoothScroll ? attrs.flSmoothScroll :
            attrs.href.substring(1);
          // Retry until the element has been rendered on the page
          var retry = $interval(function() {
            var anchor = $document[0].querySelector(anchorName);
            if (anchor) {
              $interval.cancel(retry);
              doScroll(anchor);
            }
          }, 50, 100);
        });
      }
    };
  });
