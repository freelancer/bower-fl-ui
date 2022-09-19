'use strict';

angular.module('flUi')
  /**
   * @ngdoc directive
   * @name flUi.directive:flScrollGlue
   * @element A
   * @function
   *
   * @description
   * A directive that keeps a scrollable element scrolled to right to the bottom
   * unless the user scrolls to a different place.
   *
   * @example
   *  <example module="flUi">
   *    <file name="index.html">
   *      <div ng-controller="myController">
   *        <div style="height: 100px; overflow-y: scroll" fl-scroll-glue>
   *          <div ng-repeat="item in items">{{item}}</div>
   *        </div>
   *      </div>
   *    </file>
   *    <file name="index.js">
   *      angular.module('flUi', [])
   *        .controller('myController', function($scope, $interval) {
   *         var interval;
   *         var counter = 0;
   *
   *         $scope.items = [];
   *
   *         // Make expression evaluate to true after 3 seconds
   *         $scope.startInterval = function() {
   *           interval = $interval(function() {
   *             $scope.items.push(counter++);
   *           }, 1000);
   *         };
   *
   *         $scope.stopInterval = function() {
   *           $interval.cancel(interval);
   *         };
   *
   *         $scope.startInterval();
   *        });
   *    </file>
   *  </example>
   *
   */
  .directive('flScrollGlue', function() {
    return {
      restrict: 'A',
      scope: {},
      link: function(scope, elem) {
        var rawElement = elem[0];

        // Because we modify the scrollTop attribute, we trigger a scroll event.
        // However, we do not want to process our own scroll event, so we keep
        // track of if we have changed scrollTop, and in the scroll event
        // listener we reset this value. If this value is truthy, then we do not
        // scroll treat the scroll event as if a user performed it.
        var adjusting = false;

        scope.active = true;

        function isScrolledToBottom() {
          // Supposedly there are off by one errors in chrome at somestage.
          // The original scroll glue plugin[1] implemented this, so I have
          // replicated the same behaviour here.
          //
          // [1] https://github.com/Luegg/angularjs-scroll-glue
          return (rawElement.scrollTop + rawElement.clientHeight + 1 >=
                  rawElement.scrollHeight);
        }

        function onScroll() {
          if (adjusting) {
            adjusting = false;
            return;
          }

          scope.active = isScrolledToBottom();
        }

        function onScopeChange() {
          if (scope.active && !isScrolledToBottom()) {
            adjusting = true;
            rawElement.scrollTop = rawElement.scrollHeight;
          }
        }

        elem.bind('scroll', onScroll);
        scope.$parent.$watch(onScopeChange);
      }
    };
  });
