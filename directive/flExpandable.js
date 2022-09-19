'use strict';

// Expandable box
angular.module('flUi')
  .directive('flExpandable', function ($parse) {
    return {
      controller: function() {
        this.isExpanded = false;
        var callbacks = [];
        this.registerClbk = function(callback) {
          callbacks.push(callback);
        };
        // Notifiy the listeners of the new Read More state
        this.expand = function(expand) {
          this.isExpanded = expand;
          for (var i = 0; i < callbacks.length; i++) {
            callbacks[i](expand);
          }
        };
      },
      link: function postLink(scope, element, attrs, ctrl) {
        var expandOnInit = $parse(attrs.flExpandable)(scope);
        ctrl.expand(expandOnInit);
      }
    };
  })

  // Put that on a element to prevent the box to expand
  .directive('flExpandableContent', function() {
    return {
      require: '^flExpandable',
      link: function($scope, element, attrs, flExpandableCtrl) {
        // Hide on init
        element.addClass('ng-hide');
        // Register callback on expandable state
        flExpandableCtrl.registerClbk(function(expand) {
          // Show the associated element only when the content is
          // in "read more" mode
          if (expand) {
            element.removeClass('ng-hide');
          } else {
            element.addClass('ng-hide');
          }
        });
      }
    };
  })

  // Put that on a element to prevent the box to expand
  .directive('flExpandableToggle', function() {
    return {
      require: '^flExpandable',
      link: function($scope, element, attrs, flExpandableCtrl) {
        // Toggle on click
        element.on('click', function() {
          flExpandableCtrl.expand(!flExpandableCtrl.isExpanded);
        });
      }
    };
  })

  // Put that on a element to prevent the box to expand
  .directive('flExpandableExpand', function() {
    return {
      require: '^flExpandable',
      link: function($scope, element, attrs, flExpandableCtrl) {
        // Register callback on expandable state
        flExpandableCtrl.registerClbk(function(expand) {
          // Show the associated element only when the content is
          // in "read more" mode
          if (expand) {
            element.addClass('ng-hide');
          } else {
            element.removeClass('ng-hide');
          }
        });
        // Expand on click
        element.on('click', function(e) {
          e.stopPropagation();
          flExpandableCtrl.expand(true);
        });
      }
    };
  })

  // Put that on a element to prevent the box to expand
  .directive('flExpandableCollapse', function() {
    return {
      require: '^flExpandable',
      link: function($scope, element, attrs, flExpandableCtrl) {
        // Register callback on expandable state
        flExpandableCtrl.registerClbk(function(expand) {
          // Show the associated element only when the content is
          // in "read more" mode
          if (expand) {
            element.removeClass('ng-hide');
          } else {
            element.addClass('ng-hide');
          }
        });
        // Expand on click
        element.on('click', function(e) {
          e.stopPropagation();
          flExpandableCtrl.expand(false);
        });
      }
    };
  })

  // Put that on a element to prevent the box to expand
  .directive('flExpandablePrevent', function() {
    return {
      require: '^flExpandable',
      link: function($scope, element) {
        element.on('click', function(e) {
          e.stopPropagation();
        });
      }
    };
  });


