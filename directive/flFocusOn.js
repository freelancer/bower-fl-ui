'use strict';
angular.module('flUi')
  // jshint ignore:start
  /**
  * @ngdoc directive
  * @name flUi.directive:flFocusOn
  * @element input
  * @function
  *
  * @description
  * Focus an element when the attached expression is true
  *
  * @usage
  * <!-- This input will gain focus when focus evaluates to true -->
  * <input type="text" fl-focus-on="focus">
  * </input>
  *
  * @example
  *  <example module="flUi">
  *    <file name="index.html">
  *      <div ng-controller="myController">
  *        <input type="text" fl-focus-on="result.willBeTrue" ng-model="confirmation">
  *        </input>
  *        <a ng-click="startInterval()" class="btn btn-primary" href="">
  *          Run example again
  *        </a>
  *      </div>
  *    </file>
  *    <file name="index.js">
  *        angular.module('flUi', []).controller('myController',
  *        function($scope, $interval) {
  *          // Here we store our $interval so we can cancel it (stop it) later
  *          var interval;
  *          // Initialize this to false. As soon as it turns to true,
  *          // our input element will gain focus.
  *          $scope.result = {
  *            willBeTrue: false
  *          };
  *          // The value of this var will appear in the text input
  *          //after 5 secs
  *          $scope.confirmation = null;
  *
  *          // Make expression evaluate to true after 3 seconds
  *          $scope.startInterval = function() {
  *            $scope.result.willBeTrue = false;
  *            $scope.confirmation = 5;
  *
  *            interval = $interval(function() {
  *              $scope.confirmation--;
  *
  *              if($scope.confirmation === 0) {
  *                $scope.confirmation = "I should have focus now...";
  *                $scope.result.willBeTrue = true;
  *                $interval.cancel(interval);
  *              };
  *            }, 1000);
  *          };
  *
  *          $scope.startInterval();
  *        })
  *    </file>
  *  </example>
  */
  // jshint ignore:end
  .directive('flFocusOn', function () {
    return {
      link: function postLink(scope, element, attrs) {
        scope.$watch(attrs.flFocusOn, function(doFocus) {
          if (doFocus) {
            element[0].focus();
          }
        });
      }
    };
  });
