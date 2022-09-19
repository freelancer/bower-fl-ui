'use strict';

angular.module('flUi')
  .directive('flCountdown', function($interval) {
    return {
      controller: function() {
        // Register callbacks for updating digits (days, hours..)
        this.callbacks = [];
        this.register = function(callback) {
          this.callbacks.push(callback);
        };
      },
      link: function($scope, element, attrs, ctrl) {
        // duration is in second
        var duration = parseInt(attrs.flCountdown, 10);
        var startTime = Date.now() / 1000;
        var refresh = function() {
          var timeLeft = startTime + duration - (Date.now() / 1000);
          for (var i = 0; i < ctrl.callbacks.length; i++) {
            ctrl.callbacks[i](timeLeft > 0 ? timeLeft : 0);
          }
        };
        var timer = $interval(refresh, 1000);
        refresh();

        // Clean up after ourselves
        element.on('$destroy', function() {
          $interval.cancel(timer);
        });
      }
    };
  })

  .directive('flCountdownDays', function() {
    return {
      require: '^flCountdown',
      link: function(scope, element, attrs, flCountdownCtrl) {
        flCountdownCtrl.register(function(timeLeft) {
          element.text(Math.floor(timeLeft / (60 * 60 * 24)));
        });
      }
    };
  })

  .directive('flCountdownHours', function() {
    return {
      require: '^flCountdown',
      link: function(scope, element, attrs, flCountdownCtrl) {
        flCountdownCtrl.register(function(timeLeft) {
          var daysInHours = Math.floor(timeLeft / (60 * 60 * 24)) * 24;
          element.text(Math.floor(timeLeft / (60 * 60)) - daysInHours);
        });
      }
    };
  })

  .directive('flCountdownMinutes', function() {
    return {
      require: '^flCountdown',
      link: function(scope, element, attrs, flCountdownCtrl) {
        flCountdownCtrl.register(function(timeLeft) {
          var hoursInMinutes = Math.floor(timeLeft / (60 * 60)) * 60;
          element.text(Math.floor(timeLeft / 60) - hoursInMinutes);
        });
      }
    };
  })

  .directive('flCountdownSeconds', function() {
    return {
      require: '^flCountdown',
      link: function(scope, element, attrs, flCountdownCtrl) {
        flCountdownCtrl.register(function(timeLeft) {
          var minutesInSeconds = Math.floor(timeLeft / 60) * 60;
          element.text(Math.floor(timeLeft) - minutesInSeconds);
        });
      }
    };
  });

