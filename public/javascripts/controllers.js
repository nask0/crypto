"use strict";

app.controller('mainCtrl', ['$scope', '$http',
    function($scope, $http) {
        $scope.template = "partials/form.html";
        $scope.files = [];
        $scope.onFileSelect = function(files) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                $scope.files.push(file)
            }
        };

        $scope.upload = function() {
            $scope.files.forEach(function(e) {
                $http.uploadFile({
                    url: 'api/file',
                    file: e,
                    data: {key: $scope.key}
                }).success(function(data) {
                    e.link = data;
                });
            })
        }

        $scope.uploadCheck = function() {
            return ($scope.files.length == 0 || !$scope.key)
        }
    }
]);