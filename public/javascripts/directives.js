"use strict";
var directives = angular.module('crypto.directives', []);
directives.directive('fileselect', ['$parse',
    function($parse) {
        return function(scope, elem, attr) {
            var fn = $parse(attr['fileselect']);
            elem.bind('change', function(evt) {
                var files = [];
                var fileList = evt.target.files;
                for (var i = 0; i < fileList.length; i++) {
                    files.push(fileList[i]);
                }
                scope.$apply(function() {
                    fn(scope, {
                        files: files,
                        $event: evt
                    });
                });
            });
        };
    }
]);