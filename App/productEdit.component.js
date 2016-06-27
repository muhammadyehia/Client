(function() {
    "use strict";

    var app = angular.module("productApp");
    var GetProduct = function($http, id) {
        var url = "http://localhost:42073/api/Products/" + id;
        return $http.get(url).success(function(responce) {
            return responce;
        }).error(function(reason) {
            return reason;
        });
    };
    var UpdateProduct = function($http, product) {
        var url = "http://localhost:42073/api/Products/" + product.Id;
        var files = document.getElementById('UploadPhoto').files;
        var fd = new FormData();

        if (files.length) {
            angular.forEach(files, function(file) {
                fd.append('file', file);
            });
        }
        //else {
        //     fd.append("OldPhotoChanged", false);
        // }
        fd.append("Name", product.Name);
        fd.append("Price", product.Price);
        return $http.put(url, fd, {
                withCredentials: false,
                headers: {
                    'Content-Type': undefined
                },
                transformRequest: angular.identity
            })
            .success(function(data) {
                console.log(data);
            })
            .error(function(data) {
                console.log(data);
            });
    };
    var productEditController = function($http) {
        var model = this;
        model.$routerOnActivate = function(next) {
            GetProduct($http, next.params.id).then(function(responce) {
                if (responce) {
                    model.Product = responce.data;
                    model.Product.Content = "data:" + model.Product.ContentType + ";base64," + model.Product.Content;
                }
            }, function(error) {
                console.log(reason);
            });
        };
        model.Save = function() {
            var isValid = true;
            if (!model.Product || !model.Product.Name || !model.Product.Price) {
                isValid = false;
            }
            if (isValid) {
                UpdateProduct($http, model.Product)
                    .then(function(responce) {
                        model.$router.navigate(['List']);
                    }, function(error) {
                        console.log(reason);
                    });
            }
        }
    };

    app.component("productEdit", {
        templateUrl: "App/productAddEdit.component.html",
        controllerAs: "model",
        controller: ["$http", productEditController],
        bindings: {
            "$router": "<"
        }
    });
}());
