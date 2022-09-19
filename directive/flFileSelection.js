'use strict';

angular.module('flUi')
/**
 * @ngdoc directive
 * @name flUi.directive.flFileDrop
 * @element A
 * @function
 *
 * @description
 * This directive listens for files that have been dropped onto the element it
 * was applied to.
 *
 * @example
 *  <example module="flUi">
 *    <file name="index.html">
 *      <div ng-controller="myController">
 *        <div style="height: 100px" fl-file-drop="onFiles($files)">
 *          Drop your files here!
 *        </div>
 *      </div>
 *    </file>
 *    <file name="index.js">
 *      angular.module('flUi', [])
 *        .controller('myController', function($scope, $log) {
 *          $scope.onFiles = function onFiles($files) {
 *            $log.log($files);
 *          };
 *        });
 *    </file>
 *  </example>
 */
.directive('flFileDrop', function($parse) {
  return {
    restrict: 'A',
    link: function postLink(scope, element, attrs) {
      var dropFunction = $parse(attrs.flFileDrop);

      // Add a dragover event listener, so when the user drags a file into the
      // window and drops it, the browser won't open that file.
      element[0].addEventListener('dragover', function(event) {
        event.preventDefault();
      }, false);

      // The actual drop event we need
      element[0].addEventListener('drop', function(event) {
        event.preventDefault();

        if (event.dataTransfer && event.dataTransfer.files &&
            event.dataTransfer.files.length > 0) {
          dropFunction(scope, {
            $files: event.dataTransfer.files,
            $event: event
          });
        }
      }, false);
    }
  };
})

/**
 * @ngdoc directive
 * @name flUi.directive.flFileSelect
 * @element A
 * @function
 *
 * @description
 * This directive will handle opening a file selection dialog for you, when you
 * click on an element. It does this by creating an input element with type
 * file and appending that to the element this directive is applied to.
 * NOTE: To correctly reset the file selection dialog each time (so you can
 * select the same file more than once), it must remove and recreate the file
 * input element. Therefore it is advisable not to bind to any events on that
 * input element and furthermore you should not yourself insert any input
 * elements into the div this directive is applied to.
 *
 * @example
 *  <example module="flUi">
 *    <file name="index.html">
 *      <div ng-controller="myController">
 *        <div style="height: 100px" fl-file-select="onFiles($files)">
 *          Click here to select files!
 *        </div>
 *      </div>
 *    </file>
 *    <file name="index.js">
 *      angular.module('flUi', [])
 *        .controller('myController', function($scope, $log) {
 *          $scope.onFiles = function onFiles($files) {
 *            $log.log($files);
 *          };
 *        });
 *    </file>
 *  </example>
 */
.directive('flFileSelect', function($parse) {
  return {
    restrict: 'A',
    link: function postLink(scope, element, attrs) {
      var selectFunction = $parse(attrs.flFileSelect);
      var fileElement;

      function handleFileSelection(event) {
        var fileList = event.__files__ || event.target.files;
        if (fileList && fileList.length > 0) {
          selectFunction(scope, {
            $files: fileList,
            $event: event
          });
        }

        // Remove the file element, rebuild it and add it to the dom.
        // This essentially 'resets' the file element, so the user is able to
        // select the same files again.
        fileElement.remove();
        buildFileElement();
      }

      function buildFileElement() {
        // We need to use a file input element, as we need this to be able to
        // trigger the file selection box. There is no other way to trigger such
        // dialogs.
        fileElement = angular.element('<input type="file">');
        // Try our best to hide the file input element
        fileElement.css('width', '1px')
                    .css('height', '1px')
                    .css('opacity', 0)
                    .css('position', 'absolute')
                    .css('filter', 'alpha(opacity=0)');
        element.append(fileElement);
        fileElement.bind('change', handleFileSelection);
      }

      element.bind('click', function() {
        fileElement[0].click();
      });

      buildFileElement();
    }
  };
});
