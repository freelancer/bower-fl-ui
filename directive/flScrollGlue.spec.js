'use strict';

describe('Directive: flScrollGlue', function() {
  var parentHeight = 10;
  var contentHeight = 30;

  var element, $scope, $rootScope, $compile, $isolateScope;

  beforeEach(module('flUi'));

  beforeEach(inject(function(_$rootScope_, _$compile_) {
    $rootScope = _$rootScope_;
    $compile = _$compile_;

    $scope = $rootScope.$new();
    element = angular.element(
      '<div style="height: ' + parentHeight + 'px; overflow-y:scroll" ' +
      '   fl-scroll-glue>' +
      '    <div id="content" style="height: ' + contentHeight + 'px"></div>' +
      '</div>'
    );
    angular.element(document.body).append(element);
  }));

  describe('the active variable on the scope', function() {
    describe('when scrolling', function() {
      beforeEach(function() {
        element = $compile(element)($scope);
        $isolateScope = element.isolateScope();
      });

      describe('to the bottom', function() {
        it('should be true', function(done) {
          element.bind('scroll', function() {
            expect($isolateScope.active).toBeTruthy();
            done();
          });

          element[0].scrollTop = contentHeight;
        });
      });

      describe('to 1px from the bottom', function() {
        it('should be true', function(done) {
          element.bind('scroll', function() {
            expect($isolateScope.active).toBeTruthy();
            done();
          });

          element[0].scrollTop = contentHeight - 1;
        });
      });

      describe('to more than 1px from the bottom', function() {
        it('should be false', function(done) {
          element.bind('scroll', function() {
            expect($isolateScope.active).toBeFalsy();
            done();
          });

          element[0].scrollTop = 5;
        });
      });
    });
  });

  describe('on each parent scope digest', function() {
    beforeEach(function() {
      element = $compile(element)($scope);
      $isolateScope = element.isolateScope();
      $scope.lol = 'a';
    });

    describe('when active', function() {
      beforeEach(function() {
        $isolateScope.active = true;
        $scope.$apply();
      });

      it('should scroll to the bottom', function() {
        expect(element[0].scrollTop).toEqual(contentHeight - parentHeight);
      });

      it('should not respond to its own scroll event', function(done) {
        element.bind('scroll', function() {
          expect($isolateScope.active).toBeTruthy();
          done();
        });

        element[0].scrollTop = 10;
      });

      it('should scroll to the bottom after dealing with its own scroll event.',
      function(done) {
        element[0].scrollTop = 10;

        setTimeout(function() {
          $scope.lol = 'b';
          $scope.$apply();

          expect(element[0].scrollTop).toEqual(contentHeight - parentHeight);
          done();
        });
      });
    });

    describe('when not active', function() {
      var scrollTop = 1;

      beforeEach(function() {
        element[0].scrollTop = scrollTop;
        $isolateScope.active = false;
        $scope.$apply();
      });

      it('should not scroll', function() {
        expect(element[0].scrollTop).toEqual(scrollTop);
      });
    });
  });
});
