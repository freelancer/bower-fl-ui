'use strict';
// i18n experiment. not working for now
angular.module('flUi')
  .filter('timeAgo', function (i18n) {
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
        MINUTE = 60,
        HOUR = 3600,
        DAY = 86400,
        WEEK = 604800,
        MONTH = 2629744,
        YEAR = 31556926;

      if (offset <= MINUTE) {
        return i18n('less than a minute');
      } else if (offset < (MINUTE * 60)) {
        return i18n({
          one: '1 minute',
          other: '${count} minutes'
        },{
          count: Math.round(Math.abs(offset / MINUTE))
        });
      } else if (offset < (HOUR * 24)) {
        return i18n({
          one: '1 hour',
          other: '${count} hours'
        },{
          count: Math.round(Math.abs(offset / HOUR))
        });
      } else if (offset < (DAY * 7)) {
        return i18n({
          one: '1 day',
          other: '${count} days'
        },{
          count: Math.round(Math.abs(offset / DAY))
        });
      } else if (offset < (WEEK * 4)) {
        return i18n({
          one: '1 week',
          other: '${count} weeks'
        },{
          count: Math.round(Math.abs(offset / WEEK))
        });
      } else if (offset < (MONTH * 12)) {
        return i18n({
          one: '1 month',
          other: '${count} months'
        },{
          count: Math.round(Math.abs(offset / MONTH))
        });
      } else if (offset < (YEAR * 100)) {
        return i18n({
          one: '1 year',
          other: '${count} years'
        },{
          count: Math.round(Math.abs(offset / YEAR))
        });
      } else {
        return i18n('a long time');
      }
    };
  });
