'use strict';
/**
 * @ngdoc filter
 * @name flUi.filter:timeAgoFilter
 * @function
 *
 * @description
 * Formats a timestamp as a string indicating the time interval occurred
 * between local time (a.k.a. now) and the specified date (e.g. '1 year ago'
 * or '3 weeks ago').
 *
 * @param {number|Date|string} time the input, formatted as a Unix timestamp
 * (in second) or a javascript Date object, or a String
 * @returns {string} A string in the form of "3 months ago"
 *
 * @example

      <example module="flUi">
        <file name="index.html">
          <div ng-controller="ExampleController">
            <span>Date submitted: {{timestamp | timeAgoFilter}}</p>
          </div>
        </file>
        <file name="index.js">
          angular.module('flUi', [])
            .controller('ExampleController', ['$scope', function($scope) {
              $scope.timestamp = 1374182884;
            }]);
        </file>
        <file name="timeAgoFilter.js">
          angular.module('flUi')
            .filter('timeAgoFilter', function () {
              return function (time) {
                if (!time) {
                  return;
                }

                // Attempt to convert a Date or String input to a
                // timestamp, to add a bit of flexibility
                if (angular.isDate(time)) {
                  time = time.getTime() / 1000;
                } else if (typeof time === 'string') {
                  time = new Date(time).getTime() / 1000;
                }

                // If conversion did not succeed, return
                if (isNaN(time)) {
                  return;
                }

                var now = Date.now() / 1000,
                  offset = Math.abs((now - time)),
                  span = [],
                  MINUTE = 60,
                  HOUR = 3600,
                  DAY = 86400,
                  WEEK = 604800,
                  MONTH = 2629744,
                  YEAR = 31556926;

                if (offset <= MINUTE) {
                  span = [ '', 'less than a minute' ];
                } else if (offset < (MINUTE * 60)) {
                  span = [ Math.round(Math.abs(offset / MINUTE)), 'minute' ];
                } else if (offset < (HOUR * 24)) {
                  span = [ Math.round(Math.abs(offset / HOUR)), 'hour' ];
                } else if (offset < (DAY * 7)) {
                  span = [ Math.round(Math.abs(offset / DAY)), 'day' ];
                } else if (offset < (WEEK * 4)) {
                  span = [ Math.round(Math.abs(offset / WEEK)), 'week' ];
                } else if (offset < (MONTH * 12)) {
                  span = [ Math.round(Math.abs(offset / MONTH)), 'month' ];
                } else if (offset < (YEAR * 100)) {
                  span = [ Math.round(Math.abs(offset / YEAR)), 'year' ];
                } else {
                  span = [ '', 'a long time' ];
                }

                span[1] += (span[0] === 0 || span[0] > 1) ? 's' : '';
                span = span.join(' ').trim();

                return span;
              };
        </file>
     </example>
 */
angular.module('flUi')
  .filter('timeAgoFilter', function () {
    return function (time) {
      if (!time) {
        return;
      }

      // Attempt to convert a Date or String input to a timestamp, to add a bit
      // of flexibility
      if (angular.isDate(time)) {
        time = time.getTime() / 1000;
      } else if (typeof time === 'string') {
        time = new Date(time).getTime() / 1000;
      }

      // If conversion did not succeed, return
      if (isNaN(time)) {
        return;
      }

      var now = Date.now() / 1000,
        offset = Math.abs((now - time)),
        span = [],
        MINUTE = 60,
        HOUR = 3600,
        DAY = 86400,
        WEEK = 604800,
        MONTH = 2629744,
        YEAR = 31556926;

      if (offset <= MINUTE) {
        span = [ '', 'less than a minute' ];
      } else if (offset < (MINUTE * 60)) {
        span = [ Math.round(Math.abs(offset / MINUTE)), 'minute' ];
      } else if (offset < (HOUR * 24)) {
        span = [ Math.round(Math.abs(offset / HOUR)), 'hour' ];
      } else if (offset < (DAY * 7)) {
        span = [ Math.round(Math.abs(offset / DAY)), 'day' ];
      } else if (offset < (WEEK * 4)) {
        span = [ Math.round(Math.abs(offset / WEEK)), 'week' ];
      } else if (offset < (MONTH * 12)) {
        span = [ Math.round(Math.abs(offset / MONTH)), 'month' ];
      } else if (offset < (YEAR * 100)) {
        span = [ Math.round(Math.abs(offset / YEAR)), 'year' ];
      } else {
        span = [ '', 'a long time' ];
      }

      span[1] += (span[0] === 0 || span[0] > 1) ? 's' : '';
      span = span.join(' ').trim();

      return span;
    };
  });
