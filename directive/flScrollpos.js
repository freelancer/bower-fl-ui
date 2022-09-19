'use strict';
angular.module('flUi')
  /**
   * @ngdoc directive
   * @name flUi.directive:flScrollpos
   * @element A
   * @function
   *
   * @description
   * Listen to the window scroll events and update the specified model with the
   * current scroll position. A typical use case is to save & restore the
   * scrolling position on a long list to prevent pogosticking
   */
  .directive('flScrollpos', function ($window) {
      return {
        scope: {
          position: '=flScrollpos'
        },
        link: function postLink(scope, element, attrs) {

          // Watch for a update of the scroll position and reflect that update
          // in the view
          scope.$watch('position', function(newVal) {
            var currentVal;
            if (angular.isDefined(attrs.flScrollposContainer)) {
              currentVal = element[0].scrollTop;
            } else {
              currentVal = $window.scrollY;
            }
            // Only set the scroll position if it's different from the current
            // one
            if (angular.isDefined(newVal) && newVal !== currentVal) {
              // Delay the update of the scrolling position after the current
              // digest cycle. That seems
              scope.$evalAsync(function(scope) {
                if (angular.isDefined(attrs.flScrollposContainer)) {
                  angular.element(element)[0].scrollTop = scope.position;
                } else {
                  $window.scrollTo(0, scope.position);
                }
              });
            }
          });

          function onScroll(e) {
            if (angular.isDefined(attrs.flScrollposContainer)) {
              scope.position = e.target.scrollTop;
            } else {
              scope.position = e.target.scrollY;
            }
          }

          if (angular.isDefined(attrs.flScrollposContainer)) {
            element.on('scroll', onScroll);
          } else {
            angular.element($window).on('scroll', onScroll);
          }
        }
      };
    });
