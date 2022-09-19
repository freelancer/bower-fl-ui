'use strict';

// Update a progress bar (its CSS width value
angular.module('flUi')
  .directive('flProgressBar', function ($interval) {
    return {
      link: function postLink(scope, element, attrs) {
        var progress; // Current progress in %
        var timer; // Reference to the timer

        // update the UI
        function updateBar() {
          element.css('width', progress + '%');
        }

        // watch the expression, and update the UI on change.
        scope.$watch(attrs.flProgressBar, function(value) {
          progress = value;
          updateBar();
        });

        timer = $interval(updateBar, 10);

        // Intervals are not automatically destroyed when
        // a directive's element is destroyed
        element.on('$destroy', function() {
          $interval.cancel(timer);
        });

      }
    };
  });
