'use strict';

// Update a progress bar (its CSS width value
angular.module('flUi')
  .directive('flReadMore', function () {
    return {
      controller: function() {
        this.contentSize = 0;
        this.readMore = false;
        this.isEnable = false;
        // Register callback to be notified when the Read More
        // state change
        var callbacks = [];
        this.registerClbk = function(callback) {
          callbacks.push(callback);
        };
        // Notifiy the listeners of the new Read More state
        this.notify = function() {
          for (var i = 0; i < callbacks.length; i++) {
            callbacks[i](this.readMore);
          }
        };
      },
      link: function postLink(scope, element, attrs, ctrl) {
        ctrl.contentSize = parseInt(attrs.flReadMore, 10);
      }
    };
  })

  .directive('flReadMoreContent', function () {
    return {
      require: '^flReadMore',
      link: function postLink(scope, element, attrs, flReadMoreCtrl) {
        var originalContent;
        scope.$watch(function() { return element.text(); }, function(content) {
          // Only enable read more if the content length is bigger than the
          // specified length
          if (content.length > flReadMoreCtrl.contentSize) {
            flReadMoreCtrl.isEnable = true;
            originalContent = content;
            flReadMoreCtrl.notify();
          }
        });
        // Register callback on ReadMore state
        flReadMoreCtrl.registerClbk(function(readMore) {
          // If read more, restore the original content
          if (readMore) {
            element.text(originalContent);
          } else {
            // If in "read less", cut the content
            // Account for the dots ' ...' there
            if (originalContent) {
              var shortenValue = originalContent.substring(0,
                flReadMoreCtrl.contentSize - 4);
              element.text(shortenValue + ' ...');
            }
          }
        });
      }
    };
  })

  // Register a click handler on the element it's attached to and toggle
  // the readmore state of the content on click
  .directive('flReadMoreToggle', function () {
    return {
      require: '^flReadMore',
      link: function postLink(scope, element, attrs, flReadMoreCtrl) {
        element.on('click', function() {
          // Only expand on click, don't shrink (otherwise it becomes
          // impossible to select the text
          if (!flReadMoreCtrl.readMore) {
            flReadMoreCtrl.readMore = true;
            flReadMoreCtrl.notify();
          }
        });
      }
    };
  })

  .directive('flReadMoreMore', function () {
    return {
      require: '^flReadMore',
      link: function postLink(scope, element, attrs, flReadMoreCtrl) {
        // Hide element on init (ReadMore is disabled by default)
        element.addClass('ng-hide');
        // Register callback on ReadMore state
        flReadMoreCtrl.registerClbk(function(readMore) {
          // Show the associated element only when the content is
          // in "read less" mode
          if (readMore) {
            element.addClass('ng-hide');
          } else {
            // If in "read less", only show if readmore is enabled
            if (flReadMoreCtrl.isEnable) {
              element.removeClass('ng-hide');
            } else {
              element.addClass('ng-hide');
            }
          }
        });
        // Expand text on click
        element.on('click', function(e) {
          e.stopPropagation();
          flReadMoreCtrl.readMore = true;
          flReadMoreCtrl.notify();
        });
      }
    };
  })

  .directive('flReadMoreLess', function () {
    return {
      require: '^flReadMore',
      link: function postLink(scope, element, attrs, flReadMoreCtrl) {
        // Hide element on init (ReadMore is disabled by default)
        element.addClass('ng-hide');
        // Register callback on ReadMore state
        flReadMoreCtrl.registerClbk(function(readMore) {
          // Show the associated element only when the content is
          // in "read more" mode
          if (!readMore) {
            element.addClass('ng-hide');
          } else {
            // If in "read more", only show if readmore is enabled
            if (flReadMoreCtrl.isEnable) {
              element.removeClass('ng-hide');
            } else {
              element.addClass('ng-hide');
            }
          }
        });
        // Shrink text on click
        element.on('click', function(e) {
          e.stopPropagation();
          flReadMoreCtrl.readMore = false;
          flReadMoreCtrl.notify();
        });
      }
    };
  });

