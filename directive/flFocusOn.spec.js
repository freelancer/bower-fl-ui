'use strict';

describe('Directive: flFocusOn', function() {

  var element, $scope;

  beforeEach(module('flUi'));

  beforeEach(inject(function($rootScope, $compile) {
    $scope = $rootScope.$new();
    element = angular.element(
      '<input type="text" fl-focus-on="focus"></input>'
    );
    angular.element(document.body).append(element);
    element = $compile(element)($scope);
  }));

  beforeEach(function() {
    jasmine.addMatchers({
      toHaveFocus: function() {
        return {
          compare: function(actual) {
            return {
              pass: document.activeElement === actual[0]
            };
          }
        };
      }
    });
  });

  it('should focus an element when the expression is true',
  function() {
    $scope.focus = true;
    $scope.$digest();
    expect(element).toHaveFocus();
  });

  it('should not focus an element when the expression is false',
  function() {
    $scope.focus = false;
    $scope.$digest();
    expect(element).not.toHaveFocus();
  });

});
