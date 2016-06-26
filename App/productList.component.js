(function() {
    "use strict";

    var app = angular.module("productApp");



    var GetProducts = function($http) {
        var url = "http://localhost:42073/api/Products";
        return $http.get(url).success(function(responce) {
            return responce;
        }).error(function(reason) {
            return reason;
        });
    };

    var DeleteProduct = function($http, id) {
        var url = "http://localhost:42073/api/Products/";
        return $http.delete(url + id)
            .success(function(responce) {
                return responce;
            })
            .error(function(reason) {
                return reason;
            });

    }

    var productListController = function($http) {
        var model = this;
        model.$onInit = function() {
            GetProducts($http).then(function(responce) {
                if (responce) {
                    model.Products = responce.data.map(function(obj) {
                        obj.Content = "data:" + obj.ContentType + ";base64," + obj.Content;
                        return obj;
                    });

                }
            }, function(error) {
                console.log(reason);
            });
        }
        model.DeleteProduct = function(id) {
            if (id) {
                DeleteProduct($http, id).then(function(responce) {
                    for (var i = 0; i < model.Products.length; i++) {
                        if (model.Products[i].Id === id) {
                            model.Products.splice(i, 1);
                           return ;
                        }
                    }
                }, function(error) {
                    console.log(reason);
                });
            }
        };


    };

    app.component("productList", {
        templateUrl: "App/productList.component.html",
        controllerAs: "model",
        controller: ["$http", productListController]
    });
}());
