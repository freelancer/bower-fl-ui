'use strict';

angular.module('flUi')
  // Add an "is-active" CSS class to a link (i.e., HTML 'a' tag)
  // if its href attribute value matches the current location.
  .directive('flActiveLink', function($rootScope, $location) {
    var ACTIVE_CLASS = 'is-active';
    return {
      link: function postLink(scope, element, attrs) {
        // Check if current URL matches the href of the element.
        var checkActive = function() {
          if (attrs.href === $location.path()) {
            element.addClass(ACTIVE_CLASS);
          } else {
            element.removeClass(ACTIVE_CLASS);
          }
        };
        // Do the check on initial loading.
        checkActive();
        // Bind a listener on the change of location for following
        // location changes.
        $rootScope.$on('$locationChangeSuccess', function() {
          checkActive();
        });
      }
    };
  });
