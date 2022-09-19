'use strict';
// This should be part of the core framework
angular.module('flUi')
  .directive('flTouchend', function($parse) {
    return {
      compile: function($element, attrs) {
        var fn = $parse(attrs.flTouchend);
        return function(scope, element) {
          element.on('touchend', function(event) {
            scope.$apply(function() {
              fn(scope, {$event:event});
            });
          });
        };
      }
    };
  });
