'use strict';
angular.module('flUi')
  /* jshint ignore:start */
  /**
   * @ngdoc directive
   * @name flUi.directive:flPagination
   * @element A
   * @function
   *
   * @description
   * A vertical carrousel A directive that implements the NgModelController API for non-input
   * elements so that ngModel can be used with "contenteditable" elements.
   * Adding the "contenteditable" to your element and use the
   * "fl-content-attribute" will:
   *
   * - Binding the view into the model
   * - Provide validation behavior (required, minlength, maxlength)
   * - Keeping the state of the control (valid/invalid, validation errors)
   *
   * The directive internally used the $sce service to prevent  provide HTML escaping.
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
  .directive('flPagination', function($timeout) {
    return {
      scope: {
        current: '=flPagination'
      },
      controller: function() {
        this.pages = [];
        this.select = function(page) {
          for (var i = 0; i < this.pages.length; i++) {
            if (this.pages[i]) {
              this.pages[i].update(page);
            }
          }
        };
      },
      link: function postLink(scope, element, attrs, ctrl) {
        ctrl.container = attrs.flPaginationContainer;
        ctrl.setBottomMargin = function(height) {
          element.css('margin-bottom', height + 'px');
        };
        ctrl.gotoPage = function(page) {
          scope.current = page;
          // Only re-select the page it's already the selected one,
          // otherwise the watch will be triggered anyway
          if (scope.current === page) {
            ctrl.select(page);
          }
        };
        scope.$watch('current', function(page) {
          if (angular.isNumber(page)) {
            $timeout(function() {
              ctrl.select(page);
            }, 50);
          }
        });
      }
    };
  })
  .directive('flPaginationPage', function ($window, $document, $interval,
    $animate) {
    return {
      require: '^flPagination',
      link: function postLink(scope, element, attrs, flPaginationCtrl) {
        // easeInOutCubic: acceleration until halfway, then deceleration
        var easing = function(time) {
          if (time < 0.5) {
            return 4 * time * time * time;
          } else {
            return (time - 1) * (2 * time - 2) * (2 * time - 2) + 1;
          }
        };
        // Adjust the bottom margin of the paginated form to make sure that
        // the last page is tall enough to fill the screen
        var adjustPageHeight = function() {
          // If a scroll container is used, use it instead of the window element
          var container = $document[0]
          .querySelector(flPaginationCtrl.container);
          var availHeight;
          if (container) {
            availHeight = container.getBoundingClientRect().height;
          } else {
            availHeight = $window.innerHeight;
          }
          // Height of the page
          var elHeight = element[0].getBoundingClientRect().height;
          var fillHeight = availHeight - elHeight - 45;
          // Set the element height to fill the available height
          flPaginationCtrl.setBottomMargin(fillHeight > 0 ? fillHeight : 0);
        };

        // Scroll to that page
        var scrollToPage = function() {
          var container = $document[0]
            .querySelector(flPaginationCtrl.container);
          var startLocation = container ? container.scrollTop :
            $window.pageYOffset;
          var distance = element[0].getBoundingClientRect().top;
          if (container) {
            distance = distance - container.getBoundingClientRect().top;
          }
          // TODO: improve that
          distance -= 25;
          // Do scroll (16ms interval)
          var speed = 500;
          var timeLapsed = 0;
          var percentage, position;
          function step() {
            timeLapsed += 16;
            percentage = (timeLapsed / speed);
            if (percentage <= 1) {
              position = startLocation + (distance * easing(percentage));
              if (container) {
                container.scrollTop = Math.floor(position);
              } else {
                $window.scrollBy(0, Math.floor(position));
              }
              $window.requestAnimationFrame(step);
            }
          }
          $window.requestAnimationFrame(step);
        };
        // Register the scroll to function to the pagination controller
        scope.$watch(attrs.flPaginationPage, function(num) {
          var pageNumber = parseInt(num);
          if (angular.isNumber(pageNumber)) {
            // Only show the first page by default
            $animate[pageNumber === 0 ?
              'removeClass' : 'addClass'](element, 'ng-hide');
            // If page is already registered, remove it
            for (var i = 0; i < flPaginationCtrl.pages.length; i++) {
              if (flPaginationCtrl.pages[i]) {
                if (flPaginationCtrl.pages[i].element === element) {
                  delete flPaginationCtrl.pages[i];
                }
              }
            }
            // Register scrolling function
            flPaginationCtrl.pages[pageNumber] = {
              update: function(current) {
                // Hide/show page
                $animate[pageNumber <= current ?
                  'removeClass' : 'addClass'](element, 'ng-hide');
                if (pageNumber === current) {
                  // Retry until the element has been rendered on the page
                  var retry = $interval(function() {
                    if (element[0].getBoundingClientRect().height) {
                      adjustPageHeight();
                      scrollToPage();
                      $interval.cancel(retry);
                    }
                  }, 50);
                }
              },
              element: element
            };
          }
        });
      }
    };
  })
  // Reset the current page (useful to jumb twice to the same page)
  .directive('flPaginationGoto', function ($timeout, $parse) {
    return {
      require: '^flPagination',
      link: function postLink(scope, element, attrs, flPaginationCtrl) {
        element.on('click', function() {
          $timeout(function() {
            var page = $parse(attrs.flPaginationGoto)(scope);
            flPaginationCtrl.gotoPage(page);
          }, 50);
        });
      }
    };
  });

