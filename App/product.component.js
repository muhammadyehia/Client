(function() {
    "use strict";

    var app = angular.module("productApp");

    app.component("product", {
        templateUrl: "App/product.component.html",
        $routeConfig: [
            { path: "/list", component: "productList", name: "List" },
            { path: "/edit/:id", component: "productEdit", name: "Edit" },
            { path: "/add", component: "productAdd", name: "Add" },
            { path: "/**", redirectTo: ["List"] }
        ]
    });
}());
