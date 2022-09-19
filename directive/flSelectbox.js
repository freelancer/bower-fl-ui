'use strict';

angular.module('flUi')
  // Selectbox box
  .directive('flSelectbox', function ($timeout) {
    /* jshint maxlen: false */
    return {
      restrict: 'E',
      template: '<div class="fl-selectbox" fl-touchstart="touch=true">' +
        '  <input type="text" class="fl-selectbox-items-search" placeholder="{{ placeholder }}" ng-model="query" ng-blur="onInputBlur()" ng-keydown="onInputKeyDown($event)">' +
        '  <div class="fl-selectbox-items-container">' +
        '    <div class="fl-selectbox-items-results" ng-show="query.length">' +
        '      <ul class="fl-selectbox-items-list" ng-mouseenter="selecting=true" ng-mouseleave="selecting=false">' +
        '        <li ng-repeat="item in options | fuzzyFilter:{name:query} | limitTo:10 track by item.id" >' +
        '          <a class="fl-selectbox-items-item" ng-click="add(item) || $event.preventDefault()" ng-mouseenter="selected.i=item" fl-touchend="add(item) || $event.preventDefault()" ng-class="{ selected: (selected.i === item) }" fl-touch-active> {{ item[label] }}</a>' +
        '        </li>' +
        '      </ul>' +
        '    </div>' +
        '  </div>' +
        '  <div class="fl-selectbox-selected-items">' +
        '    <span ng-repeat="item in getSelection() track by item.id">' +
        '      <button class="fl-selectbox-pill" ng-click="remove(item) || $event.preventDefault()" ng-class="{ touch: touch }" fl-touch-active>{{ item[label] }}</button>' +
        '    </span>' +
        '  </div>' +
        '</div>',
      scope: {
        options: '=',
        min: '=?',
        max: '=?',
        required: '=?',
        placeholder: '@',
        label: '@',
        selection: '=ngModel'
      }, // isolate the scope!
      require: 'ngModel',
      link: function(scope, element, attrs, ngModelController) {

        // Hold the currently selected item
        scope.selected = {};

        // The viewValue is used to display the current selection,
        // as the model won't be updated until it's valid
        scope.getSelection = function() {
          return ngModelController.$viewValue;
        };

        // Add the item to the collection
        function doAdd(item) {
          // If the list is empty, create it
          if (!ngModelController.$viewValue) {
            ngModelController.$setViewValue([item]);
          } else {
            ngModelController.$setViewValue(ngModelController
              .$viewValue.concat(item));
          }
          // Remove the item from the option list
          scope.options.splice(scope.options.indexOf(item), 1);
          // Clear the query
          scope.query = null;
          // Run the validation
          checkValidity();
        }

        // Call when an item is selected to be added
        scope.add = function(item) {
          scope.selected.i = item;
          // If touch screen, delay a bit to display a visual feedback
          if (scope.touch) {
            $timeout(function() { doAdd(item); }, 50);
          } else {
            doAdd(item);
          }
        };

        // Remove an item from the collection
        function doRemove(item) {
          // Remove the item from the selected list and re-add it to the list
          var clone = angular.copy(ngModelController.$viewValue);
          clone.splice(ngModelController.$viewValue.indexOf(item), 1);
          scope.options.push(item);
          ngModelController.$setViewValue(clone);
          // Run the validation
          checkValidity();
        }

        // Call when as item is selected to be deleted
        scope.remove = function(item) {
          scope.selected.i = item;
          // If touch screen, delay a bit to display a visual feedback
          if (scope.touch) {
            $timeout(function() { doRemove(item); }, 50);
          } else {
            doRemove(item);
          }
        };

        function checkValidity() {
          if (angular.isDefined(scope.min)) {
            ngModelController.$validators.minlength = function() {
              return ngModelController.$viewValue &&
                ngModelController.$viewValue.length >= scope.min;
            };
          }
          if (angular.isDefined(scope.max)) {
            ngModelController.$validators.maxlength = function() {
              return ngModelController.$viewValue &&
                ngModelController.$viewValue.length <= scope.max;
            };
          }
          if (attrs.required) {
            ngModelController.$validators.required = function() {
              return ngModelController.$viewValue &&
                ngModelController.$viewValue.length;
            };
          }
        }

        // check validity on start, in case we're directly out of bounds
        checkValidity();
        // watch out min/max and recheck validity if they change
        scope.$watch('min+max+required', function() {
          checkValidity();
        });

        // Reset the selected item every time the input changes
        scope.$watchCollection('options | fuzzyFilter:{name:query} | limitTo:10',
        function(collection) {
          // Save the new collection
          scope.collection = collection;
          // If there's at least one item, select the first one
          scope.selected.i = collection && collection.length ?
            collection[0] : null;
        });

        // Handle the user interactions with the input box
        scope.onInputKeyDown = function(e) {
          var idx;
          if (e.keyCode === 38) {
            // Keyup -> move the selection up
            idx = scope.collection.indexOf(scope.selected.i);
            scope.selected.i = (idx === 0) ? scope.collection[0] :
              scope.collection[idx - 1];
          } else if(e.keyCode === 40) {
            // Keydown -> move the selection down
            idx = scope.collection.indexOf(scope.selected.i);
            scope.selected.i = (idx === scope.collection.length - 1) ?
              scope.selected.i : scope.collection[idx + 1];
          } else if (e.keyCode === 13) {
            // Enter key -> select the current i
            if (scope.selected.i) {
              scope.add(scope.selected.i);
              // Reset the input box
              scope.query = null;
            }
            // Prevent the enter key to submit the form
            e.preventDefault();
          }
        };

        // Input box has lost its focus. Reset the input if a selection
        // if not in progress
        scope.onInputBlur = function() {
          if (!ngModelController.$touched) {
            ngModelController.$setTouched();
          }

          if (!scope.selecting) {
            scope.query = null;
          }
        };

      }
    };
  });

