'use strict';

angular.module('flUi')
  // Autoresize a textarea. Works for  > IE8 
  .directive('flAutoresize', function () {
    return {
      link: function postLink(scope, element, attrs) {
        // Prevent the browser from showing scrollbars 
        element.css({
          overflow: 'hidden',
          resize: 'none'
        });
        function resize() {
          var offset = element[0].offsetHeight - element[0].clientHeight;
          element.css('height', 'auto');
          element.css('height', element[0].scrollHeight + offset + 'px');
        }
        // When the view change
        element.on('input', resize);
        // When the model change
        scope.$watch(attrs.ngModel, resize);
        // That's all folks! Yeah really, no need for 200 hundred lines of
        // jQuery cr*p :-). Works for  > IE8 only though :-p
      }
    };
  });
