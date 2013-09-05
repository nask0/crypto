"use strict";
app.controller('mainCtrl', ['$scope', '$http', 'Crypt',
    function($scope, $http, Crypt) {
        $scope.template = "partials/form.html";
        $scope.files = [];

        $scope.onFileSelect = function(files) {
            Crypt.init(function(fs) {
                for (var i = 0; i < files.length; i++) {
                    Crypt.process(fs, files[i], function(efile) {
                        $scope.$apply(function() {
                            $scope.files.push(efile)
                        });
                    });
                }
            })
        };
        $scope.upload = function() {
            $scope.files.forEach(function(e) {
                if (typeof e.uploading === 'undefined') {
                    e.uploading = true;
                    $http.uploadFile({
                        url: 'file',
                        file: e
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