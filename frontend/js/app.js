"use strict";
/// <reference path="./_fix.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var components_1 = require("./components");
var services_1 = require("./services");
var app;
(function (app) {
    var Module = /** @class */ (function () {
        function Module(name, modules) {
            this.app = angular.module(name, modules);
        }
        Module.prototype.addController = function (name, controller) {
            this.app.controller(name, controller);
        };
        Module.prototype.addService = function (name, serviceFunc) {
            this.app.service(name, serviceFunc);
        };
        Module.prototype.addComponent = function (name, component) {
            this.app.component(name, component);
        };
        Module.prototype.config = function () {
            this.app.config(["$httpProvider", "$qProvider", "$routeProvider", function ($httpProvider, $qProvider, $routeProvider) {
                    $httpProvider.defaults.useXDomain = true;
                    delete $httpProvider.defaults.headers.common['X-Requested-With'];
                    $qProvider.errorOnUnhandledRejections(false);
                    // ROUTING
                    $routeProvider
                        .when('/', {
                        templateUrl: "./views/post_view.html"
                    })
                        .when('/posts/:post_id', {
                        templateUrl: './views/single_post_view.html'
                    })
                        .when('/create', {
                        templateUrl: "./views/new_post_view.html"
                    });
                }]);
        };
        Module.$inject = ["ngResource", "ngRoute"];
        return Module;
    }());
    app.Module = Module;
})(app || (app = {}));
var MyTestApp;
(function (MyTestApp) {
    var myApp = new app.Module('myApp', ["ngResource", "ngRoute"]);
    myApp.config();
    myApp.addComponent('navBar', new components_1.ComponentsM.NavComponent());
    myApp.addComponent('mainComponent', new components_1.ComponentsM.MainComponent());
    myApp.addComponent('newPostForm', new components_1.ComponentsM.FormComponent());
    myApp.addComponent('singlePost', new components_1.ComponentsM.SinglePostComponent());
    myApp.addService("dataAccessService", services_1.ServicesM.DataAccessService);
})(MyTestApp || (MyTestApp = {}));
