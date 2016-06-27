(function() {
    "use strict";

    var app = angular.module("productApp");
    var AddProduct = function($http, product) {
        var url = "http://localhost:42073/api/Products";
        var files = document.getElementById('UploadPhoto').files;
        var fd = new FormData();

        angular.forEach(files, function(file) {
            fd.append('file', file);
        });
        fd.append("Name", product.Name);
        fd.append("Price", product.Price);
        return $http.post(url, fd, {
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
    var productAddController = function($http) {
        var model = this;
        model.Save = function() {
            var isValid = true;

            if (!model.Product || !model.Product.Name || !model.Product.Price) {
                isValid = false;
            }
            if (isValid) {
                AddProduct($http, model.Product)
                    .then(function(responce) {
                        model.$router.navigate(['List']);
                    }, function(error) {
                        console.log(reason);
                    });
            }
        }
    };

    app.component("productAdd", {
        templateUrl: "App/productAddEdit.component.html",
        controllerAs: "model",
        controller: ["$http", productAddController],
        bindings: {
            "$router": "<"
        }
    });
}());
