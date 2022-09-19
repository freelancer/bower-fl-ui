'use strict';

describe('flFileSelect directive', function() {
  var element, event, $compile, $rootScope, $scope;

  beforeEach(module('flUi'));

  beforeEach(inject(function(_$rootScope_, _$compile_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    element = angular.element('<div fl-file-drop="onFiles($files, $event)">' +
                              '</div>');
    $compile(element)($scope);

    event = document.createEvent('Event');
    event.initEvent('drop', true, true);
    event.dataTransfer = {};
  }));

  describe('when the drop event fires', function() {
    it('should call preventDefault()', function(done) {
      event.preventDefault = function() {
        done();
      };

      element[0].dispatchEvent(event);
    });

    it('should not call the drop function if there are no files',
    function(done) {
      var called = false;

      $scope.onFiles = function() {
        called = true;
      };

      event.dataTransfer.files = [];
      element[0].dispatchEvent(event);

      setTimeout(function() {
        expect(called).toBeFalsy();
        done();
      }, 100);
    });

    it('should call the drop function if there are files', function(done) {
      var files = [1];

      $scope.onFiles = function($files) {
        expect($files).toEqual(files);
        done();
      };

      event.dataTransfer.files = files;

      element[0].dispatchEvent(event);
    });

    it('should pass the event down to the drop function', function(done) {
      var files = [1];

      event.dataTransfer.files = files;

      $scope.onFiles = function($files, $event) {
        expect($event).toEqual($event);
        done();
      };

      element[0].dispatchEvent(event);
    });
  });

  describe('when the dragover event fires', function() {
    it('should call preventDefault()', function(done) {
      var event = document.createEvent('Event');
      event.initEvent('dragover', true, true);
      event.preventDefault = function() {
        done();
      };

      element[0].dispatchEvent(event);
    });
  });
});

describe('flFileSelect directive', function() {
  var element, event, inputElement, $compile, $rootScope, $scope;

  beforeEach(module('flUi'));

  beforeEach(inject(function(_$rootScope_, _$compile_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
    element = angular.element('<div fl-file-select="onFiles($files, $event)">' +
                              '</div>');
    $compile(element)($scope);
    inputElement = element.find('input');
  }));

  describe('the new file input element css property', function() {
    it('width should be set to 1px', function() {
      expect(inputElement.css('width')).toEqual('1px');
    });

    it('height should be set to 1px', function() {
      expect(inputElement.css('height')).toEqual('1px');
    });

    it('opacity should be set to 0', function() {
      expect(inputElement.css('opacity')).toEqual('0');
    });

    it('position should be set to absolute', function() {
      expect(inputElement.css('position')).toEqual('absolute');
    });
  });

  describe('when you select a file', function() {
    beforeEach(function() {
      event = document.createEvent('Event');
      event.initEvent('change', true, true);
    });

    it('should re-create the input element', function(done) {
      inputElement[0].old_element = 'hi calvin';
      inputElement[0].dispatchEvent(event);

      setTimeout(function() {
        expect(element.find('input')[0].old_element).toBeUndefined();
        done();
      }, 50);
    });

    it('should not fire the onFiles function if no files were selected',
    function(done) {
      var called = false;
      $scope.onFiles = function() {
        called = true;
      };

      event.__files__ = [];
      inputElement[0].dispatchEvent(event);

      setTimeout(function() {
        expect(called).toBeFalsy();
        done();
      }, 50);
    });

    it('should fire the onFiles function with the files that were selected',
    function(done) {
      var files = [1, 2];
      $scope.onFiles = function($files) {
        expect($files).toEqual(files);
        done();
      };

      event.__files__ = files;
      inputElement[0].dispatchEvent(event);
    });
  });

  describe('when you click on the original element', function() {
    it('should trigger a click on the input element', function(done) {
      inputElement[0].click = done;

      var event = document.createEvent('Event');
      event.initEvent('click', true, true);
      element[0].dispatchEvent(event);
    });
  });
});
