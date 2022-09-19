'use strict';
// NOTE: In the following tests we change the dimension of the Window instead
// of scrolling the window itself to scrolling works in Chrome but is broken in
// PhamtomJS. However, this still enables to test the directive's logic.
describe('Directive: flInViewport', function() {
  var element;
  var span;
  var $scope;

  beforeEach(module('flUi'));

  describe('default mode (infinite)', function() {

    beforeEach(inject(function($compile, $rootScope) {
      $scope = $rootScope.$new();
      $scope.callback = jasmine.createSpy();
      element = angular.element(
        '<div style="height: 10024px;">' +
        ' <div style="height: 10000px"></div>' +
        ' <span fl-in-viewport="callback()"></span>' +
        '</div>'
        );
      angular.element(document.body).append(element);
      $compile(element)($scope);
      span = element.find('span');
      $scope.$apply();
    }));

    afterEach(function() {
      element.remove();
    });

    it('should add a "not-in-viewport" CSS class on init', function() {
      expect(span.hasClass('not-in-viewport')).toBeTruthy();
    });

    it('should do nothing if the element is not in the viewport',
    function() {
      window.innerHeight = 1000;
      angular.element(window).triggerHandler('scroll');
      expect($scope.callback).not.toHaveBeenCalled();
      expect(span.hasClass('in-viewport')).toBeFalsy();
    });

    it('should evaluate the Angular expression and switch the css class when ' +
      'the element is in the viewport', function() {
      window.innerHeight = 20000;
      angular.element(window).triggerHandler('scroll');
      expect($scope.callback).toHaveBeenCalled();
      expect(span.hasClass('in-viewport')).toBeTruthy();
      expect(span.hasClass('not-in-viewport')).toBeFalsy();
    });

    it('should toggle the CSS classes back to default when the element is ' +
      'not in the viewport anymore', function(done) {
      window.innerHeight = 20000;
      angular.element(window).triggerHandler('scroll');
      expect($scope.callback).toHaveBeenCalled();
      expect(span.hasClass('in-viewport')).toBeTruthy();
      expect(span.hasClass('not-in-viewport')).toBeFalsy();

      window.innerHeight = 1000;
      angular.element(window).triggerHandler('scroll');
      expect(span.hasClass('not-in-viewport')).toBeTruthy();
      expect(span.hasClass('in-viewport')).toBeFalsy();
      done();
    });

  });

  describe('when in "one-shot" mode', function() {

    beforeEach(inject(function($compile, $rootScope) {
      $scope = $rootScope.$new();
      $scope.callback = jasmine.createSpy();
      element = angular.element(
        '<div style="height: 10024px">' +
        ' <div style="height: 10000px"></div>' +
        ' <span fl-in-viewport="callback()" fl-in-viewport-once></span>' +
        '</div>'
        );
      angular.element(document.body).append(element);
      $compile(element)($scope);
      span = element.find('span');
      $scope.$apply();
    }));

    afterEach(function() {
      element.remove();
    });

    it('should evaluate the Angular expression and switch the css classes ' +
      'only once', function() {
      window.innerHeight = 20000;
      angular.element(window).triggerHandler('scroll');
      expect(span.hasClass('in-viewport')).toBeTruthy();
      expect(span.hasClass('not-in-viewport')).toBeFalsy();

      window.innerHeight = 1000;
      angular.element(window).triggerHandler('scroll');
      expect(span.hasClass('in-viewport')).toBeTruthy();
      expect(span.hasClass('not-in-viewport')).toBeFalsy();

      expect($scope.callback).toHaveBeenCalled();
    });

  });

  describe('when used inside a scrolling container', function() {

    beforeEach(inject(function($compile, $rootScope) {
      $scope = $rootScope.$new();
      $scope.callback = jasmine.createSpy();
      element = angular.element(
        '<div style="height: 100px; overflow-y: scroll" ' +
        '    fl-in-viewport-container>' +
        '  <div style="height: 10024px">' +
        '   <div style="height: 10000px"></div>' +
        '   <span fl-in-viewport="callback()"></span>' +
        '  </div>' +
        '</div>'
        );
      angular.element(document.body).append(element);
      $compile(element)($scope);
      span = element.find('span');
      $scope.$apply();
    }));

    afterEach(function() {
      element.remove();
    });

    it('should do nothing if the element is not in the viewport',
    function() {
      element[0].scrollTop = 0;
      element.triggerHandler('scroll');
      expect($scope.callback).not.toHaveBeenCalled();
      expect(span.hasClass('in-viewport')).toBeFalsy();
    });

    it('should evaluate the Angular expression and switch the css class when ' +
      'the element is in the viewport', function() {
      element[0].scrollTop = 10000;
      element.triggerHandler('scroll');
      expect($scope.callback).toHaveBeenCalled();
      expect(span.hasClass('in-viewport')).toBeTruthy();
      expect(span.hasClass('not-in-viewport')).toBeFalsy();
    });

    it('should toggle the CSS classes back to default when the element is ' +
      'not in the viewport anymore', function(done) {
      element[0].scrollTop = 10000;
      element.triggerHandler('scroll');
      expect($scope.callback).toHaveBeenCalled();
      expect(span.hasClass('in-viewport')).toBeTruthy();
      expect(span.hasClass('not-in-viewport')).toBeFalsy();

      element[0].scrollTop = 0;
      element.triggerHandler('scroll');
      expect(span.hasClass('not-in-viewport')).toBeTruthy();
      expect(span.hasClass('in-viewport')).toBeFalsy();
      done();
    });

  });

  describe('when used inside a scrolling container in "one-shot" mode',
    function() {

    beforeEach(inject(function($compile, $rootScope) {
      $scope = $rootScope.$new();
      $scope.callback = jasmine.createSpy();
      element = angular.element(
        '<div style="height: 100px; overflow-y: scroll" ' +
        '    fl-in-viewport-container>' +
        '  <div style="height: 10024px">' +
        '   <div style="height: 10000px"></div>' +
        '   <span fl-in-viewport="callback()" fl-in-viewport-once></span>' +
        '  </div>' +
        '</div>'
      );
      angular.element(document.body).append(element);
      $compile(element)($scope);
      span = element.find('span');
      $scope.$apply();
    }));

    afterEach(function() {
      element.remove();
    });

    it('should evaluate the Angular expression and switch the css classes ' +
      'only once', function() {
      element[0].scrollTop = 10000;
      element.triggerHandler('scroll');
      expect(span.hasClass('in-viewport')).toBeTruthy();
      expect(span.hasClass('not-in-viewport')).toBeFalsy();

      element[0].scrollTop = 1;
      element.triggerHandler('scroll');
      expect(span.hasClass('in-viewport')).toBeTruthy();
      expect(span.hasClass('not-in-viewport')).toBeFalsy();

      expect($scope.callback).toHaveBeenCalled();
    });

  });

});
