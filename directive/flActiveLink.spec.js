'use strict';

describe('Directive: flActiveLink', function () {

  var element, $scope, $location, $rootScope, $compile;

  // Load the directive's module
  beforeEach(module('flUi'));

  beforeEach(inject(function(_$rootScope_, _$compile_, _$location_) {
    $rootScope = _$rootScope_;
    $location = _$location_;
    $compile = _$compile_;
    $scope = $rootScope.$new();
    element = angular.element('<a href="/post-project" fl-active-link></a>');
  }));

  //it('should add an "is-active" class if the link matches the current route',
  //function() {
    //spyOn($location, 'path').and.returnValue('/post-project');
    //element = $compile(element)($scope);
    //expect(element.hasClass('is-active')).toBe(true);
  //});

  //it('should not have "is-active" class if the link does not match the route',
  //function() {
    //spyOn($location, 'path').and.returnValue('/login-or-not');
    //element = $compile(element)($scope);
    //expect(element.hasClass('is-active')).toBe(false);
  /*});*/

/*  it('should add "is-active" class on location change if it matches
 *  the route',*/
  //function() {
    //$location.path('/login');
    //element = $compile(element)($scope);
    //expect(element.hasClass('is-active')).toBe(false);
    //$location.path('/post-project');
    //// $locationChangeSuccess event is triggered on next digest cycle
    //$rootScope.$broadcast('$locationChangeSuccess');
    //expect(element.hasClass('is-active')).toBe(true);
  /*});*/

/*  it('should remove "is-active" class on location change if not match
 *  route',*/
  //function() {
    //$location.path('/post-project');
    //element = $compile(element)($scope);
    //expect(element.hasClass('is-active')).toBe(true);
    //$location.path('/login');
    //// $locationChangeSuccess event is triggered on next digest cycle
    //$rootScope.$broadcast('$locationChangeSuccess');
    //expect(element.hasClass('is-active')).toBe(false);
 
  /*});*/

});
