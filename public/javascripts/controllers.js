"use strict";
app.controller('mainCtrl', ['$scope', '$http', 'Crypt',
    function($scope, $http, Crypt) {
        $scope.template = "partials/form.html";
        $scope.files = [];
        $scope.key = {};
        $scope.onFileSelect = function(files) {
            for (var i = 0; i < files.length; i++) {
                Crypt.bury(files[i], $scope.key.value, function(blob) {
                    $scope.$apply(function() {
                        $scope.files.push(blob)
                    });
                });
            }
        };
        $scope.upload = function() {
            $scope.files.forEach(function(file) {
                if (typeof file.uploading === 'undefined') {
                    file.uploading = true;
                    $http({
                        method: 'POST',
                        url: 'file',
                        headers: {
                            'Content-Type': false
                        },
                        transformRequest: function() {
                            var formData = new FormData();
                            formData.append('file', file.blob);
                            return formData;
                        }
                    }).success(function(data) {
                        file.uploading = false;
                        file.id = data;
                    });
                }
            })
        }

        $scope.keyCheck = function() {
            return !$scope.key.value;
        }

        $scope.uploadCheck = function() {
            return ($scope.files.length == 0 || !$scope.key.value)
        }
    }
]);