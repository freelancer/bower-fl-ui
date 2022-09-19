'use strict';
// This should be part of the core framework
angular.module('flUi')
  .directive('flTouchstart', function($parse) {
    return {
      compile: function($element, attrs) {
        var fn = $parse(attrs.flTouchstart);
        return function(scope, element) {
          element.on('touchstart', function(event) {
            scope.$apply(function() {
              fn(scope, {$event:event});
            });
          });
        };
      }
    };
  });
