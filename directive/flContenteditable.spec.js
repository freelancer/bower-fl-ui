'use strict';

describe('Directive: flContenteditable', function () {

  beforeEach(module('flUi'));

  var element, scope;

  describe('with ngModel', function() {

    beforeEach(inject(function($rootScope, $compile) {
      element = angular.element(
        '<span name="title" contenteditable="true" fl-contenteditable' +
          ' ng-model="title">' +
          '   default text' +
          '<span>'
      );
      scope = $rootScope.$new();
      element = $compile(element)(scope);
    }));

    it('should update the model when the view change',
    inject(function() {
      // on change event
      element.html('Hello World');
      element.triggerHandler('change');
      scope.$digest();
      expect(scope.title).toBe('Hello World');
      // on blur event
      element.html('Hello World 2');
      element.triggerHandler('blur');
      scope.$digest();
      expect(scope.title).toBe('Hello World 2');
      // on keyup event
      element.html('Hello World 3');
      element.triggerHandler('keyup');
      scope.$digest();
      expect(scope.title).toBe('Hello World 3');
    }));

    it('should update the view when the model change',
    inject(function() {
      scope.title = 'Chuck';
      scope.$digest();
      expect(scope.title).toBe('Chuck');
      scope.title = '';
      scope.$digest();
      expect(scope.title).toBe('');
    }));

  });

  describe('with required', function () {

    beforeEach(inject(function($rootScope, $compile) {
      element = angular.element(
        '<span name="title" contenteditable="true" fl-contenteditable' +
          ' required ng-model="title">default text with required<span>'
      );
      scope = $rootScope.$new();
      element = $compile(element)(scope);
    }));

    it('should not update the model when the view is empty and "required"' +
    ' is set', inject(function() {
      element.html('');
      element.triggerHandler('change');
      scope.$digest();
      expect(scope.title).not.toBe('');
      expect(scope.title).not.toBe('');
    }));

    it('should update the model when the view is not empty and "required"' +
    ' is set', inject(function() {
      element.html('hello');
      element.triggerHandler('change');
      scope.$digest();
      expect(scope.title).toBe('hello');
    }));

  });

  describe('with minlength', function () {

    beforeEach(inject(function($rootScope, $compile) {
      element = angular.element(
        '<span name="title" contenteditable="true" fl-contenteditable' +
          ' ng-minlength=4 ng-model="title">' +
          '  This is the default text' +
          '<span>'
      );
      scope = $rootScope.$new();
      element = $compile(element)(scope);
    }));

    it('should not update the model when the length of the field is' +
    ' under minlength', inject(function() {
      element.html('hel');
      element.triggerHandler('change');
      scope.$digest();
      expect(scope.title).not.toBe('hel');
    }));

    it('should update the model when the length of the field is' +
    ' over minlength', inject(function() {
      element.html('hello');
      element.triggerHandler('change');
      scope.$digest();
      expect(scope.title).toBe('hello');
    }));

  });

  describe('with maxlength', function () {

    beforeEach(inject(function($rootScope, $compile) {
      element = angular.element(
        '<span name="title" contenteditable="true" fl-contenteditable' +
          ' ng-maxlength=4 ng-model="title">' +
          '  default with maxlength text' +
          '<span>'
      );
      scope = $rootScope.$new();
      element = $compile(element)(scope);
    }));

    it('should not update the model when the length of the field is' +
    ' over maxlength', inject(function() {
      element.html('hello');
      element.triggerHandler('change');
      scope.$digest();
      expect(scope.title).not.toBe('hello');
    }));

    it('should update the model when the length of the field is' +
    ' under maxlength', inject(function() {
      element.html('hel');
      element.triggerHandler('change');
      scope.$digest();
      expect(scope.title).toBe('hel');
    }));

  });

});
