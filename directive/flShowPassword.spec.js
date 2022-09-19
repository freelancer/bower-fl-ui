'use strict';

describe('Directive: flShowPassword', function() {

  var element, $scope;

  beforeEach(module('flUi'));

  beforeEach(inject(function($rootScope, $compile) {
    $scope = $rootScope.$new();
    element = angular.element(
      '<input type="password" fl-show-password="showPassword"></input>'
    );
    angular.element(document.body).append(element);
    element = $compile(element)($scope);
  }));

  it('should set the input type to "text" when the expression is true',
  function() {
    $scope.showPassword = true;
    $scope.$digest();
    expect(element.attr('type')).toBe('text');
  });

  it('should set the input type to "password" when the expression is false',
  function() {
    $scope.showPassword = false;
    $scope.$digest();
    expect(element.attr('type')).toBe('password');
  });
});
