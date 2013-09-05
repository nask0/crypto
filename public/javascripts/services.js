"use strict";
var services = angular.module('crypto.services', []);
services.service('Crypt', [
    function() {
        this.bury = function(file, callback) {
            var reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onloadend = function(e) {
                var content = new Uint8Array(this.result);
                var utf8 = "";
                for (var i = 0, len = content.length; i < len; i++) {
                    utf8 += String.fromCharCode(content[i]);
                }
                var b64 = btoa(utf8);
                console.log(content.buffer)
                var encrypted = GibberishAES.enc(b64, "asd");
                //var encrypted = CryptoJS.AES.encrypt(this.result, "asd");
                var blob = new Blob([encrypted], {
                    type: 'application/octet-stream'
                });
                callback({blob: blob, name: file.name});
            }
        }
    }
]);