"use strict";
/// <reference path="./declarations/_fix.d.ts" />
/// <reference path="../../node_modules/@types/angular-resource/index.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./components/index");
var services_1 = require("./services/services");
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
                        template: "<main-component></main-component>"
                    })
                        .when('/posts/:post_id', {
                        template: '<single-post></single-post>'
                    })
                        .when('/create', {
                        template: "<new-post-form></new-post-form>"
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
    myApp.addComponent('navBar', new index_1.NavComponent());
    myApp.addComponent('mainComponent', new index_1.MainComponent());
    myApp.addComponent('newPostForm', new index_1.FormComponent());
    myApp.addComponent('singlePost', new index_1.SinglePostComponent());
    myApp.addService("dataAccessService", services_1.DataAccessService);
})(MyTestApp || (MyTestApp = {}));
