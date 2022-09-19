'use strict';
// Add that to the body of your page a add a dynamic 'fl-touch-active'
// class to a button or link element when touched. Fixed the lack of
// "active" state on Android (better touch feedback).
angular.module('flUi')
  .directive('flTouchActiveFix', function() {
    var ACTIVE_CLASS = 'fl-touch-active';
    function getButton(el) {
      while (el) {
        if (el.tagName.toLowerCase() === 'button' ||
          el.tagName.toLowerCase() === 'a') {
          break;
        }
        el = el.parentElement;
      }
      return el;
    }
    return {
      link: function postLink(scope, element) {
        element[0].addEventListener('touchstart', function(e) {
          angular.element(getButton(e.target)).addClass(ACTIVE_CLASS);
        }, true);
        element[0].addEventListener('touchend', function(e) {
          angular.element(getButton(e.target)).removeClass(ACTIVE_CLASS);
        }, true);
        element[0].addEventListener('touchcancel', function(e) {
          angular.element(getButton(e.target)).removeClass(ACTIVE_CLASS);
        }, true);
      }
    };
  });
