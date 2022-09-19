'use strict';

describe('Filter: timeAgoFilter', function() {
  var filter,
    MINUTE = 60,
    HOUR = 3600,
    DAY = 86400,
    WEEK = 604800,
    MONTH = 2629744,
    YEAR = 31556926,
    now;

  beforeEach(module('flUi'));

  beforeEach(inject(function($filter) {
    filter = $filter;
  }));

  it('should convert past timestamp into string like "2 days"', function() {
    now = new Date().getTime() / 1000;

    expect(filter('timeAgoFilter')(now - 10))
      .toEqual('less than a minute');
    expect(filter('timeAgoFilter')(now - MINUTE * 5))
      .toEqual('5 minutes');
    expect(filter('timeAgoFilter')(now - HOUR))
      .toEqual('1 hour');
    expect(filter('timeAgoFilter')(now - DAY))
      .toEqual('1 day');
    expect(filter('timeAgoFilter')(now - WEEK))
      .toEqual('1 week');
    expect(filter('timeAgoFilter')(now - MONTH))
      .toEqual('1 month');
    expect(filter('timeAgoFilter')(now - YEAR * 2))
      .toEqual('2 years');
    expect(filter('timeAgoFilter')(now - YEAR * 200))
      .toEqual('a long time');
    expect(filter('timeAgoFilter')()).toBeUndefined();
  });

  it('should convert future timestamp into string like "2 days"', function() {
    now = new Date().getTime() / 1000;

    expect(filter('timeAgoFilter')(now + 10))
      .toEqual('less than a minute');
    expect(filter('timeAgoFilter')(now + MINUTE * 3))
      .toEqual('3 minutes');
    expect(filter('timeAgoFilter')(now + HOUR * 2))
      .toEqual('2 hours');
    expect(filter('timeAgoFilter')(now + DAY * 6))
      .toEqual('6 days');
    expect(filter('timeAgoFilter')(now + WEEK * 3))
      .toEqual('3 weeks');
    expect(filter('timeAgoFilter')(now + MONTH * 4))
      .toEqual('4 months');
    expect(filter('timeAgoFilter')(now + YEAR * 4))
      .toEqual('4 years');
    expect(filter('timeAgoFilter')(now + YEAR * 250))
      .toEqual('a long time');
  });

  it('should handle Date objects as an input', function() {
    now = new Date().getTime();
    var myDate = new Date(now - 10000);
    expect(filter('timeAgoFilter')(myDate))
      .toEqual('less than a minute');
  });

  it('should handle String objects as an input', function() {
    var myString = new Date().toString();

    expect(filter('timeAgoFilter')(myString))
      .toEqual('less than a minute');

    expect(filter('timeAgoFilter')('lol')).toBeUndefined();
  });
});
