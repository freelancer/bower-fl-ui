'use strict';
describe('Directive: flScrollpos', function() {
  var element;
  var WindowMock;
  var $scope;

  beforeEach(module('flUi', function($provide) {
    WindowMock = {
      scrollTo: jasmine.createSpy()
    };
    $provide.constant('$window', angular.extend(window, WindowMock));
  }));

  describe('with window as the scroll container (default)', function() {

    beforeEach(inject(function($compile, $rootScope) {
      $scope = $rootScope.$new();
      $scope.model = {};
      element = angular.element(
        '<div fl-scrollpos="model.scrollpos"></div>'
      );
      angular.element(document.body).append(element);
      $compile(element)($scope);
      $scope.$apply();
    }));

    afterEach(function() {
      element.remove();
    });

    it('should update the model with the scroll position on scroll',
    function() {
      expect($scope.model.scrollpos).not.toBeDefined();
      angular.element(window).triggerHandler('scroll');
      $scope.$digest();
      expect($scope.model.scrollpos).toEqual(0);
    });

    it('should update the scroll position when the model changes',
    function() {
      $scope.model.scrollpos = 10;
      $scope.$digest();
      expect(WindowMock.scrollTo).toHaveBeenCalledWith(0, 10);
    });

    it('should not update the scroll position when the model changes if ' +
      'the scroll position is unchanged', function() {
      $scope.model.scrollpos = 0;
      $scope.$digest();
      expect(WindowMock.scrollTo).not.toHaveBeenCalled();
    });

  });

  describe('when used inside a scrolling container', function() {

    beforeEach(inject(function($compile, $rootScope) {
      $scope = $rootScope.$new();
      $scope.model = {};
      element = angular.element(
        '<div style="height: 100px; overflow-y: scroll" ' +
        '    fl-scrollpos="model.scrollpos" fl-scrollpos-container>' +
        '  <div style="height: 10024px"></div>' +
        '</div>'
      );
      angular.element(document.body).append(element);
      $compile(element)($scope);
      $scope.$apply();
    }));

    afterEach(function() {
      element.remove();
    });

    it('should update the model with the scroll position on scroll',
    function() {
      expect($scope.model.scrollpos).not.toBeDefined();
      angular.element(element).triggerHandler('scroll');
      $scope.$digest();
      expect($scope.model.scrollpos).toEqual(0);
    });

    it('should update the scroll position when the model changes',
    function() {
      $scope.model.scrollpos = 10;
      $scope.$digest();
      expect(element[0].scrollTop).toEqual(10);
    });

  });

});
