"use strict";

app.controller('mainCtrl', ['$scope', '$http',
    function($scope, $http) {
        $scope.template = "partials/form.html";
        $scope.files = [];
        $scope.key = {};
        
        $scope.onFileSelect = function(files) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                $scope.files.push(file)
            }
        };

        $scope.upload = function() {
            $scope.files.forEach(function(e) {
                if (typeof e.uploading === 'undefined') {
                    e.uploading = true;
                    $http.uploadFile({
                        url: 'file',
                        file: e,
                        data: {
                            key: $scope.key.value
                        }
                    }).success(function(data) {
                        e.uploading = false;
                        e.id = data;
                    });
                }
            })
        }

        $scope.uploadCheck = function() {
            return ($scope.files.length == 0 || !$scope.key)
        }
    }
]);