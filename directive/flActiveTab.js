'use strict';

angular.module('flUi')
  // Add an "is-active" CSS class to a link (i.e., HTML 'a' tag)
  // if its href attribute value matches the current location.
  .directive('flActiveTab', function() {
    var ACTIVE_CLASS = 'is-active';
    return {
      link: function postLink(scope, element, attrs) {
        // Check if tab name matches current tab open
        var checkActive = function() {
          if (attrs.tab === scope.tab.name) {
            element.addClass(ACTIVE_CLASS);
          } else {
            element.removeClass(ACTIVE_CLASS);
          }
        };
        scope.$watch('tab.name', function() {
          checkActive();
        });
        checkActive();
      }
    };
  });
