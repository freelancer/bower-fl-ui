'use strict';
angular.module('flUi')
  /* jshint ignore:start */
  /**
   * @ngdoc directive
   * @name flUi.directive:flContenteditable
   * @element A
   * @function
   *
   * @description
   * A directive that implements the NgModelController API for non-input
   * elements so that ngModel can be used with "contenteditable" elements.
   * Adding the "contenteditable" to your element and use the
   * "fl-content-attribute" will:
   *
   * - Binding the view into the model
   * - Provide validation behavior (required, minlength, maxlength)
   * - Keeping the state of the control (valid/invalid, validation errors)
   *
   * It internally uses the $sce service to prevent  provide HTML escaping.
   *
   * @example
    ```
      <span name="title" contenteditable="true" fl-contenteditable required ng-minlength=4 ng-model="project.title">
        This is the default text
      <span>
    ```
   *
   * Use the ngValue attribute if you want to bind an Angular expression
   * to the element's value.
   *
    ```
      <span name="title" contenteditable="true" fl-contenteditable ng-model="project.title" ng-value="defaultTitle">
      <span>
    ```
   *
   */
  /* jshint ignore:end */
  .directive('flContenteditable', function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {

        // Model -> View
        ngModel.$render = function() {
          element.text(ngModel.$viewValue || '');
        };

        // View -> Model
        function read() {
          ngModel.$setViewValue(element.text().trim());
        }

        // Listen for change events to enable binding
        element.on('blur keyup change', function() {
          scope.$apply(read);
        });

        // min length validator
        if (attrs.ngMinlength) {
          var minlength = parseInt(attrs.ngMinlength);
          ngModel.$validators.minlength = function(value) {
            return ngModel.$isEmpty(value) || value.length >= minlength;
          };
        }

        // max length validator
        if (attrs.ngMaxlength) {
          var maxlength = parseInt(attrs.ngMaxlength);
          ngModel.$validators.maxlength = function(value) {
            return ngModel.$isEmpty(value) || value.length <= maxlength;
          };
        }
      }
    };
  });

