'use strict';

describe('Directive: flDailyBarGraph', function() {
  var element, $scope, $isolateScope;

  beforeEach(module('flUi'));

  beforeEach(inject(function($rootScope) {
    $scope = $rootScope.$new();
    element = angular.element(
      '<fl-daily-bar-graph values="values"></fl-daily-bar-graph>'
    );
  }));

  describe('When yMax is greater than zero', function() {
    beforeEach(inject(function($compile) {
      $scope.values = [
        [
          {xValue: 1423459904000, yValue: 8 , highlight: 'is-success'},
          {xValue: 1423546304000, yValue: 14, highlight: 'is-primary'},
          {xValue: 1423632704000, yValue: 21, highlight: 'is-disabled'},
          {xValue: 1423719104000, yValue: 18, highlight: 'is-success'}
        ],
      ];
      element = $compile(element)($scope);
      $isolateScope = element.isolateScope();
      $scope.$digest();
    }));

    it('should copy the graphs from the values', function() {
      expect($isolateScope.graphs).toBeDefined();
      expect(
        angular.toJson($isolateScope.graphs)
      ).toEqual(
        angular.toJson($scope.values)
      );
    });

    it('should set correct yUnit, yMax, and yMarkers', function() {
      expect($isolateScope.yUnit).toBeUndefined();
      expect($isolateScope.yMax).toEqual(21);
      expect($isolateScope.yMarkers).toEqual([21, 14, 7]);
    });

    it('should return correct barHeight', function() {
      expect($isolateScope.barHeight(7)).toEqual(100/3);
    });

    it('should set bar graph contents', function() {
      var yMarkers = element.find('ol').children();
      var graph = element.find('figure');
      var bars = graph.find('li');
      // 3 yMarkers
      expect(yMarkers.length).toEqual(3);
      // 1 graph
      expect(graph.length).toEqual(1);
      // 4 bars
      expect(bars.length).toEqual(4);
    });
  });

  describe('When yMax is zero', function() {
    beforeEach(inject(function($compile) {
      $scope.values = [
        [{xValue: 1423719104000, yValue: 0, highlight: 'is-success'}],
      ];
      element = $compile(element)($scope);
      $isolateScope = element.isolateScope();
      $scope.$digest();
    }));

    it('should not set yMarkers', function() {
      expect($isolateScope.yMax).toEqual(0);
      expect($isolateScope.yMarkers).toBeUndefined();
    });
  });
});
