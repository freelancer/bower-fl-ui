'use strict';

describe('Directive: progressBar', function () {

  // load the directive's module
  beforeEach(module('flUi'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element(
      '<div class="progress-bar progress-info"' +
      ' fl-progress-bar="progress"></div>');
    element = $compile(element)(scope);
  }));
});
