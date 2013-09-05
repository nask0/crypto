"use strict";
var services = angular.module('crypto.services', []);
services.service('Crypt', [
    function() {
        this.init = function(callback) {
            window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
            window.requestFileSystem(window.TEMPORARY, 50 * 1024 * 1024, callback);
        }
        this.process = function(fs, file, callback) {
            fs.root.getFile(file.name, {
                create: true
            }, function(fileEntry) {
                fileEntry.createWriter(function(fileWriter) {
                    fileWriter.onwriteend = function(e) {
                        fs.root.getFile(file.name, {}, function(encfileEntry) {
                            encfileEntry.file(function(file) {
                                callback(file)
                            });
                        });
                    };
                    var reader = new FileReader();
                    reader.readAsArrayBuffer(file);
                    reader.onloadend = function(e) {
                        var content = new Uint8Array(this.result);
                        var utf8 = "";
                        for (var i = 0, len = content.length; i < len; i++) {
                            utf8 += String.fromCharCode(content[i]);
                        }
                        var b64 = btoa(utf8);
                        console.log(content)
                        var encrypted = GibberishAES.enc(b64, "asd");
                        //var encrypted = CryptoJS.AES.encrypt(this.result, "asd");
                        var blob = new Blob([encrypted], {
                            type: 'application/octet-stream'
                        });
                        fileWriter.write(blob);
                    }
                });
            });
        }
        this.encrypt = function(key) {

        }
    }
]);