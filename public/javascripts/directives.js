"use strict";

var directives = angular.module('crypto.directives', []);

directives.directive('ngFileSelect', ['$parse', '$http',
    function($parse, $http) {
        $http.uploadFile = function(config) {
            return $http({
                method: 'POST',
                url: config.url,
                headers: {
                    'Content-Type': false
                },
                transformRequest: function(data) {

                    var formData = new FormData();
                    formData.append('file', config.file);
                    for (var key in config.data) {                        
                        formData.append(key, config.data[key]);
                    }
                    return formData;
                }
            });
        };

        return function(scope, elem, attr) {
            var fn = $parse(attr['ngFileSelect']);
            elem.bind('change', function(evt) {
                var files = [];
                var fileList = evt.target.files;
                for (var i = 0; i < fileList.length; i++) {
                    files.push(fileList.item(i));
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