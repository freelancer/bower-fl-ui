'use strict';

angular.module('flUi')
// jshint ignore:start
/**
 * @ngdoc directive
 * @name flUi.directive:flDailyBarGraph
 * @restrict E
 *
 * @description
 * This directive is used to generate bar graphs
 * in daily series (x-axis)
 *
 * @scope
 * @param {Array} values Contains an array of graphs.
 *
 *    Where each graph contains an array of bar objects in this format:
 *
 *    { xValue: <[timestamp]>, yValue: <[number]> , highlight: <[(classname) string]> }
 * @param {String} yUnit Unit displayed for the y-axis markers
 *
 * @example
 * <example module="flUi">
 *   <file name="index.html">
 *     <div ng-controller="myController">
 *       <div class="graph-multiple-wrapper timetracker-graph-weekly">
 *         <fl-daily-bar-graph values="barGraphModels"></fl-daily-bar-graph>
 *       </div>
 *     </div>
 *   </file>
 *   <file name="graph.css">
 *     .graph-bar-content{
 *         height: 100%;
 *     }
 *     figure {
 *       margin-top: 0;
 *     }
 *     .timetracker-graph-weekly {
 *       margin-bottom: 122px;
 *     }
 *     .timetracker-graph-weekly .graph {
 *       margin-left: 33px;
 *     }
 *     .timetracker-graph-weekly .graph:first-child {
 *       margin-left: 0;
 *     }
 *     .timetracker-graph-weekly .graph-multiple-viewer {
 *       padding-bottom: 122px;
 *     }
 *     .graph {
 *       width: 100%;
 *       position: relative;
 *       height: 160px;
 *       padding: 0 50px;
 *       margin-bottom: 50px;
 *       display: inline-block;
 *     }
 *     .graph-y-axis {
 *       list-style: none;
 *       padding: 0;
 *       margin: 0;
 *       position: absolute;
 *       z-index: 1;
 *       height: 100%;
 *       width: 100%;
 *       left: 0;
 *       font-size: 11px;
 *       color: #a3a5a9;
 *     }
 *     .graph-y-axis > li {
 *       height: 33.3%;
 *       width: 100%;
 *       border-top: 1px dashed #c8c9cc;
 *     }
 *     .graph-y-axis > li:last-child {
 *       border-bottom: 1px solid #c8c9cc;
 *     }
 *     .graph-y-axis-marker {
 *       margin-top: -15px;
 *       display: block;
 *     }
 *     .graph-y-axis-marker-right {
 *       float: right;
 *       margin-top: -15px;
 *     }
 *     .graph-bar-list {
 *       list-style: none;
 *       padding: 0;
 *       margin: 0;
 *       height: 100%;
 *       margin-bottom: 50px;
 *       font-size: 0px;
 *       display: inline-block;
 *     }
 *     .graph-bar-wrapper {
 *       position: relative;
 *       display: inline-block;
 *       background: #f4f4f4;
 *       width: 30px;
 *       text-align: center;
 *       height: 100%;
 *       margin-right: 1px;
 *       border-bottom: 2px solid #ffffff;
 *     }
 *     .graph-bar-wrapper.is-current::after {
 *       content: "";
 *       display: block;
 *       position: absolute;
 *       bottom: -10px;
 *       left: 50%;
 *       margin-left: -4px;
 *       width: 0px;
 *       height: 0px;
 *       border-left: 4px solid transparent;
 *       border-right: 4px solid transparent;
 *       border-bottom: 4px solid #7e8187;
 *     }
 *     .graph-bar-value {
 *       position: absolute;
 *       z-index: 3;
 *       left: 0;
 *       right: 0;
 *       bottom: 0;
 *       cursor: pointer;
 *       border-radius: 2px 2px 0 0;
 *       -webkit-transition: all 0.3s ease-in;
 *       -moz-transition: all 0.3s ease-in;
 *       -o-transition: all 0.3s ease-in;
 *       transition: all 0.3s ease-in;
 *     }
 *     .graph-bar-value::before {
 *       display: block;
 *       content: "";
 *       position: absolute;
 *       bottom: 0px;
 *       z-index: 0;
 *       width: 100%;
 *       height: 1px;
 *       background: #595c65;
 *     }
 *     .graph-bar-value.is-success {
 *       background: #a5db9c;
 *       color: #ffffff;
 *     }
 *     .graph-bar-value.is-success:hover {
 *       background: #89cf7e;
 *     }
 *     .graph-bar-value.is-primary {
 *       background: #66c8ec;
 *       color: #ffffff;
 *     }
 *     .graph-bar-value.is-primary:hover {
 *       background: #33b5e6;
 *     }
 *     .graph-bar-value.is-disabled {
 *       cursor: disabled;
 *       background: #ededee;
 *       height: 100% !important;
 *       z-index: 0;
 *       border-radius: none;
 *     }
 *     .graph-bar-value.is-disabled:hover {
 *       background: #464a53;
 *     }
 *     .graph-bar-label {
 *       position: absolute;
 *       bottom: -40px;
 *       left: 50%;
 *       margin-left: -50%;
 *       width: 100%;
 *       font-size: 11px;
 *     }
 *     .graph.is-small .graph-bar-wrapper {
 *       width: 15px;
 *     }
 *     .graph-multiple-wrapper {
 *       position: relative;
 *       padding: 0 50px;
 *       height: 160px;
 *       margin-bottom: 50px;
 *     }
 *     .graph-multiple-wrapper .graph {
 *       padding: 0;
 *       float: left;
 *       width: auto;
 *     }
 *     .graph-multiple-viewer {
 *       position: relative;
 *       overflow: hidden;
 *       width: 100%;
 *       height: 100%;
 *       box-sizing: content-box;
 *       padding-bottom: 60px;
 *     }
 *     .graph-multiple-inner {
 *       position: absolute;
 *       width: 10000%;
 *       left: 0;
 *       zoom: 1;
 *       -webkit-transition: all 0.3s ease-in;
 *       -moz-transition: all 0.3s ease-in;
 *       -o-transition: all 0.3s ease-in;
 *       transition: all 0.3s ease-in;
 *     }
 *     .graph-multiple-inner:before {
 *       content: '';
 *       display: block;
 *     }
 *     .graph-multiple-inner:after {
 *       content: '';
 *       display: table;
 *       clear: both;
 *     }
 *     .graph-bar-label-day {
 *       position: absolute;
 *       bottom: 6px;
 *       left: 0;
 *       z-index: 2;
 *       width: 100%;
 *       font-size: 11px;
 *     }
 *   </file>
 *   <file name="index.js">
 *       angular.module('flUi', []).controller('myController', function($scope) {
 *         $scope.barGraphModels = [
 *           [
 *             {xValue: 1423459904000, yValue: 8 , highlight: 'is-success'},
 *             {xValue: 1423546304000, yValue: 14, highlight: 'is-success'},
 *             {xValue: 1423632704000, yValue: 23, highlight: 'is-success'},
 *             {xValue: 1423719104000, yValue: 18, highlight: 'is-success'},
 *             {xValue: 1423805504000, yValue: 12.75, highlight: 'is-success'},
 *             {xValue: 1423891904000, yValue: 0 , highlight: 'is-disabled'},
 *             {xValue: 1423978304000, yValue: 0 , highlight: 'is-disabled'}
 *           ], [
 *             {xValue: 1424058098000, yValue: 8 , highlight: 'is-primary'},
 *             {xValue: 1424144498000, yValue: 14, highlight: 'is-primary'},
 *             {xValue: 1424230898000, yValue: 22.5, highlight: 'is-primary'},
 *             {xValue: 1424317298000, yValue: 18, highlight: 'is-primary'},
 *             {xValue: 1424403698000, yValue: 12, highlight: 'is-primary'},
 *             {xValue: 1424490098000, yValue: 0 , highlight: 'is-disabled'},
 *             {xValue: 1424576498000, yValue: 0 , highlight: 'is-disabled'}
 *           ],
 *         ];
 *       });
 *   </file>
 *   <file name="flDailyBarGraph.js">
 *     angular.module('flUi').directive('flDailyBarGraph', function() {
 *       return {
 *         restrict: 'E',
 *         scope: {
 *           values: '='
 *         },
 *         template:
 *           '<div class="graph-bar-content">' +
 *           '  <ol class="graph-y-axis">' +
 *           '    <li ng-repeat="mark in yMarkers">' +
 *           '      <time class="graph-y-axis-marker">' +
 *           '        {{mark | number:1}} {{yUnit}}' +
 *           '      </time>' +
 *           '      <time class="graph-y-axis-marker graph-y-axis-marker-right">' +
 *           '        {{mark | number:1}} {{yUnit}}' +
 *           '      </time>' +
 *           '    </li>' +
 *           '  </ol>' +
 *           '  <div class="graph-multiple-viewer">' +
 *           '     <div class="graph-multiple-inner">' +
 *           '      <figure class="graph"' +
 *           '        ng-repeat="graph in graphs">' +
 *           '        <ul class="graph-bar-list">' +
 *           '          <li class="graph-bar-wrapper" ' +
 *           '            ng-repeat="bar in graph">' +
 *           '            <time title="{{bar.yValue}} {{yUnit}}"' +
 *           '              class="graph-bar-value" ng-class="bar.highlight"' +
 *           '              ng-style="{\'height\': barHeight(bar.yValue) + \'%\'}">' +
 *           '              <span class="graph-bar-label-day">' +
 *           '                {{bar.xValue | date:\'EEE\' | limitTo:1}}' +
 *           '              </span>' +
 *           '            </time>' +
 *           '            <time title="{{bar.xValue | date:\'yyyy-MM-dd\'}}"' +
 *           '              class="graph-bar-label">' +
 *           '              <span>{{bar.xValue | date:\'dd\'}}</span>' +
 *           '            </time>' +
 *           '          </li>' +
 *           '        </ul>' +
 *           '      </figure>' +
 *           '    </div>' +
 *           '  </div>' +
 *           '</div>',
 *         link: function postLink($scope, elem, attr) {
 *           var yMax = 0;
 *
 *           $scope.yUnit = attr.yUnit;
 *           $scope.graphs = angular.copy($scope.values);
 *           angular.forEach($scope.graphs, function(graph) {
 *             // Get maximum y-value in all graphs
 *             angular.forEach(graph, function(bar) {
 *               yMax = Math.max(yMax, bar.yValue);
 *             });
 *           });
 *
 *           $scope.yMax = yMax;
 *           $scope.yMarkers = [
 *             yMax,
 *             yMax * 2 / 3,
 *             yMax * 1 / 3
 *           ];
 *
 *           $scope.barHeight = function(value) {
 *             return 100 * value / $scope.yMax;
 *           };
 *         }
 *       };
 *     });
 *   </file>
 * </example>
 */
// jshint ignore:end
.directive('flDailyBarGraph', function() {
  return {
    restrict: 'E',
    scope: {
      values: '='
    },
    template:
      '<div class="graph-bar-content">' +
      '  <ol class="graph-y-axis">' +
      '    <li ng-repeat="mark in yMarkers">' +
      '      <time class="graph-y-axis-marker">' +
      '        {{::mark | number:1}} {{::yUnit}}' +
      '      </time>' +
      '      <time class="graph-y-axis-marker graph-y-axis-marker-right">' +
      '        {{::mark | number:1}} {{::yUnit}}' +
      '      </time>' +
      '    </li>' +
      '  </ol>' +
      '  <div class="graph-multiple-viewer">' +
      '     <div class="graph-multiple-inner">' +
      '      <figure class="graph"' +
      '        ng-repeat="graph in graphs">' +
      '        <ul class="graph-bar-list">' +
      '          <li class="graph-bar-wrapper" ' +
      '            ng-repeat="bar in graph">' +
      '            <time title="{{::bar.yValue}} {{yUnit}}"' +
      '              class="graph-bar-value" ng-class="bar.highlight"' +
      '              ng-style="{\'height\': barHeight(bar.yValue) + \'%\'}">' +
      '              <span class="graph-bar-label-day">' +
      '                {{::bar.xValue | date:\'EEE\' | limitTo:1}}' +
      '              </span>' +
      '            </time>' +
      '            <time title="{{::bar.xValue | date:\'yyyy-MM-dd\'}}"' +
      '              class="graph-bar-label">' +
      '              <span>{{::bar.xValue | date:\'dd\'}}</span>' +
      '            </time>' +
      '          </li>' +
      '        </ul>' +
      '      </figure>' +
      '    </div>' +
      '  </div>' +
      '</div>',
    link: function postLink($scope, elem, attr) {
      var yMax = 0;

      $scope.yUnit = attr.yUnit;
      $scope.graphs = angular.copy($scope.values);
      angular.forEach($scope.graphs, function(graph) {
        // Get maximum y-value in all graphs
        angular.forEach(graph, function(bar) {
          yMax = Math.max(yMax, bar.yValue);
        });
      });

      $scope.yMax = yMax;
      if (yMax > 0) {
        $scope.yMarkers = [
          yMax,
          yMax * 2 / 3,
          yMax * 1 / 3
        ];
      }

      $scope.barHeight = function(value) {
        return 100 * value / $scope.yMax;
      };
    }
  };
});
