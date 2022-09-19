'use strict';

angular.module('flUi')
  /**
  * @ngdoc directive
  * @name flUi.directive:flShowPassword
  * @element input
  * @function
  *
  * @description
  * Change a password input type to show & hide a user's password
  *
  * @usage
  * <!-- The password will be shown as plain text (instead of dots)
  * when showPassword is true -->
  * <input type="password" fl-show-password="showPassword">
  *
  * @example
  *  <example module="flUi">
  *    <file name="index.html">
  *      <div ng-controller="myController">
  *        <input type="password" fl-show-password="showPassword">Freelancer2014
  *        <input type="checkbox" ng-model="showPassword">Show Password
  *      </div>
  *    </file>
  *    <file name="index.js">
  *        angular.module('flUi', []).controller('myController',
  *        function($scope) {
  *          $scope.showPassword = false;
  *        })
  *    </file>
  *    <file name="flFocusOn.js">
  *      angular.module('flUi').directive('flShowPassword', function () {
          return {
            link: function postLink(scope, element, attrs) {
              scope.$watch(attrs.flShowPassword, function(showPassword) {
                if (showPassword) {
                  element[0].type = 'text';
                } else {
                  element[0].type = 'password';
                }
              });
            }
          };
  *      });
  *    </file>
  *  </example>
  */
  .directive('flShowPassword', function () {
    return {
      link: function postLink(scope, element, attrs) {
        scope.$watch(attrs.flShowPassword, function(showPassword) {
          if (showPassword) {
            element[0].type = 'text';
          } else {
            element[0].type = 'password';
          }
        });
      }
    };
  });
