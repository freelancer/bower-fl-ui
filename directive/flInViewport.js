'use strict';
angular.module('flUi')
  /**
   * @ngdoc directive
   * @name flUi.directive:flInViewport
   * @element A
   * @function
   *
   * @description
   * Listen to the window scroll events, toggle "in-viewport" &
   * "not-in-viewport" CSS classes and evaluate the Angular expression given as
   * param when the element is in the viewport. A "fl-in-viewport-once"
   * attribute allows it to work in "one-shot" mode, only executing the
   * expression and toggling the CSS classes once.
   *
   * Because iOS is a piece of sh*t and does not run JS during scrolling
   * momentum, the scroll event handlers will be delayed after the scrolling
   * but still executed.
   *
   * In this directive is used inside a scrolling container, an helper
   * "fl-in-viewport-container" can be set on the scrolling container to listen
   * to the scroll events on that container.
   */
  .directive('flInViewportContainer', function() {
    return {
      controller: function($element) {
        this.container = $element;
      }
    };
  })
  .directive('flInViewport', function($window) {
    var NOT_IN_VIEWPORT_CLASS = 'not-in-viewport';
    var IN_VIEWPORT_CLASS = 'in-viewport';
    return {
      require: '?^flInViewportContainer',
      link: function(scope, element, attrs, ctrl) {

        // Init CSS class
        element.addClass(NOT_IN_VIEWPORT_CLASS);

        // Toggle CSS classes & evaluate the expression if the element in
        // visible
        function onScroll() {
          if(inViewport(element[0])) {
            // Tooggle CSS classes
            element.removeClass(NOT_IN_VIEWPORT_CLASS)
              .addClass(IN_VIEWPORT_CLASS);
            // Call the callback
            scope.$eval(attrs.flInViewport);
            // Unregister the event listener in the "fl-in-viewport-once"
            // attribute is defined
            if (angular.isDefined(attrs.flInViewportOnce)) {
              if (ctrl) {
                ctrl.container.off('scroll', onScroll);
              } else {
                angular.element($window).off('scroll', onScroll);
              }
            }
          } else {
            // Tooggle CSS classes
            element.removeClass(IN_VIEWPORT_CLASS)
              .addClass(NOT_IN_VIEWPORT_CLASS);
          }
        }

        // Returns true if el is visible in the viewport. Thanks SO my brain
        // was burning out :)
        function inViewport(el) {
          var rect = el.getBoundingClientRect();
          return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= window.innerHeight &&
            rect.right <= window.innerWidth
          );
        }
        // Register scroll event listener
        if (ctrl) {
          ctrl.container.on('scroll', onScroll);
        } else {
          angular.element($window).on('scroll', onScroll);
        }
        
      }
    };
  });
