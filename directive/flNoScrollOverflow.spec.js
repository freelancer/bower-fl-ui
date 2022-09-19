'use strict';

describe('Directive: flNoScrollOverflow', function() {
  var parentHeight = 10;
  var contentHeight = 100;
  var scrollBarMiddle = 50;
  var scrollAmount = 20;
  var halfScrollAmount = scrollAmount / 2;
  // For firefox, there are weird scroll increments
  var firefoxScrollAmount = scrollAmount / -40.0;

  var element, $scope;
  var fakeMouseEvent, rawElement;

  beforeEach(module('flUi'));

  beforeEach(inject(function($compile, $rootScope) {
    $scope = $rootScope.$new();
    element = angular.element(
      '<div style="height: ' + parentHeight + 'px; overflow-y: scroll"' +
      '     fl-no-scroll-overflow>' +
      ' <div style="height:' + contentHeight + 'px"></div>' +
      '</div>'
    );
    angular.element(document.body).append(element);

    element = $compile(element)($scope);
    rawElement = element[0];
    $scope.$apply();
  }));

  beforeEach(function() {
    fakeMouseEvent = document.createEvent('Event');
    spyOn(fakeMouseEvent, 'stopPropagation');
    spyOn(fakeMouseEvent, 'preventDefault');
  });

  describe('in firefox, IE', function() {
    beforeEach(function() {
      fakeMouseEvent.type = 'DOMMouseScroll';
      fakeMouseEvent.initEvent('DOMMouseScroll', true, true);
      fakeMouseEvent.originalEvent = {
        detail: firefoxScrollAmount
      };
    });

    describe('when in the middle', function() {
      beforeEach(function() {
        rawElement.scrollTop = scrollBarMiddle;
      });
      afterEach(function() {
        expect(fakeMouseEvent.stopPropagation).not.toHaveBeenCalled();
        expect(fakeMouseEvent.preventDefault).not.toHaveBeenCalled();
      });
      it('does nothing when scrolling up', function() {
        rawElement.dispatchEvent(fakeMouseEvent);
      });
      it('does nothing when scrolling down', function() {
        fakeMouseEvent.originalEvent.detail *= -1;
        rawElement.dispatchEvent(fakeMouseEvent);
      });
    });

    describe('when near the boundaries of scroll', function() {
      afterEach(function() {
        expect(fakeMouseEvent.stopPropagation).toHaveBeenCalled();
        expect(fakeMouseEvent.preventDefault).toHaveBeenCalled();
      });

      it('scrollup, should stop at top and prevent propagation', function() {
        rawElement.scrollTop = halfScrollAmount;
        rawElement.dispatchEvent(fakeMouseEvent);
        expect(rawElement.scrollTop).toEqual(0);
      });

      it('should stop at bottom and prevent propagation', function() {
        fakeMouseEvent.originalEvent.detail *= -1;
        // Scroll distance is 10, so set the distance from the bottom to less
        rawElement.scrollTop = contentHeight - parentHeight - halfScrollAmount;
        rawElement.dispatchEvent(fakeMouseEvent);
        expect(rawElement.scrollTop)
          .toEqual(rawElement.scrollHeight - parentHeight);
      });
    });
  });

  describe('in chrome, otherwise', function() {
    beforeEach(function() {
      fakeMouseEvent.type = 'mousewheel';
      fakeMouseEvent.initEvent('mousewheel', true, true);
      fakeMouseEvent.originalEvent = {
        wheelDelta: scrollAmount
      };
    });
    describe('when in the middle', function() {
      beforeEach(function() {
        rawElement.scrollTop = scrollBarMiddle;
      });

      it('does nothing when scrolling up', function() {
        rawElement.dispatchEvent(fakeMouseEvent);
      });

      it('does nothing when scrolling down', function() {
        // reverse scroll direction by multiplying with -1
        fakeMouseEvent.originalEvent.wheelDelta *= -1;
        rawElement.dispatchEvent(fakeMouseEvent);
      });

      afterEach(function() {
        expect(fakeMouseEvent.stopPropagation).not.toHaveBeenCalled();
        expect(fakeMouseEvent.preventDefault).not.toHaveBeenCalled();
      });
    });

    describe('when near the boundary', function() {
      afterEach(function() {
        expect(fakeMouseEvent.stopPropagation).toHaveBeenCalled();
        expect(fakeMouseEvent.preventDefault).toHaveBeenCalled();
      });

      it('should stop at top and prevent propagation', function() {
        rawElement.scrollTop = 5;
        rawElement.dispatchEvent(fakeMouseEvent);
        expect(rawElement.scrollTop).toEqual(0);
      });

      it('should stop at the bottom and go no further', function() {
        fakeMouseEvent.originalEvent.wheelDelta *= -1;
        // Scroll distance is 10, so set the distance from the bottom to less
        rawElement.scrollTop = contentHeight - parentHeight - halfScrollAmount;

        rawElement.dispatchEvent(fakeMouseEvent);

        expect(rawElement.scrollTop)
          .toEqual(rawElement.scrollHeight - parentHeight);
      });
    });
  });
});
