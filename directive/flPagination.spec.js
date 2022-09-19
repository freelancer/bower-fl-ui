'use strict';

/* These tests do not cover the scrolling behaviour of the directive.
 * Scrolling behaviour was different between PhantomJS and Chrome
 * which made this difficult to test.
 */
describe('Directive: flPagination', function () {

  // load the directive's module
  beforeEach(module('flUi'));

  var $window, $interval, $timeout,
   element, scope, firstPage, secondPage, nextPageButton;

  beforeEach(inject(function ($rootScope, $compile, _$timeout_, _$window_,
          _$interval_) {
    $window = _$window_;
    $window.requestAnimationFrame = function(fn) {
      fn();
    };
    $timeout = _$timeout_;
    $interval = _$interval_;
    scope = $rootScope.$new();
    element = angular.element(
        '<div fl-pagination="progress.current">' +
          '<div id="first-page" fl-pagination-page="0"' +
            'style="width: 150px; height: 50px">' +
            '<button id="next-page-button" fl-pagination-goto="1"></button>' +
          '</div>' +
          '<div id="second-page" fl-pagination-page="1"' +
            'style="width: 150px; height: 50px">' +
            '<button></button>' +
          '</div>' +
        '</div>'
    );
    element = $compile(element)(scope);
    firstPage = angular.element(element[0].querySelector('#first-page'));
    secondPage = angular.element(element[0].querySelector('#second-page'));
    nextPageButton = angular.element(
        element[0].querySelector('#next-page-button'));
    angular.element(document.body).append(element);
  }));

  it('should initially display the first page', function() {
    scope.$digest();

    var firstPageHidden = firstPage.hasClass('ng-hide');
    expect(firstPageHidden).toBe(false);
    var secondPageHidden = secondPage.hasClass('ng-hide');
    expect(secondPageHidden).toBe(true);
  });

  it('should scroll to the next page', function() {
    scope.$digest();

    // Second page should initially be hidden
    var secondPageHidden = secondPage.hasClass('ng-hide');
    expect(secondPageHidden).toBe(true);

    nextPageButton[0].click();
    scope.$digest();
    $timeout.flush();
    $interval.flush(50);

    // Second page should now appear and be at the top of the page
    secondPageHidden = secondPage.hasClass('ng-hide');
    expect(secondPageHidden).toBe(false);
  });

});
