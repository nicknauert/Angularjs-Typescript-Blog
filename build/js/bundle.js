/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/public/assets/js";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/// <reference path="./_fix.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var components_1 = __webpack_require__(1);
var services_1 = __webpack_require__(4);
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
    myApp.addService("dataAccessService", services_1.ServicesM.DataAccessService);
})(MyTestApp || (MyTestApp = {}));


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/// <reference path="./_fix.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var controllers_1 = __webpack_require__(2);
var ComponentsM;
(function (ComponentsM) {
    var NavComponent = /** @class */ (function () {
        function NavComponent() {
            this.controller = controllers_1.ControllerM.NavCtrl;
            this.controllerAs = "$ctrl";
            this.template = __webpack_require__(5);
        }
        return NavComponent;
    }());
    ComponentsM.NavComponent = NavComponent;
    var MainComponent = /** @class */ (function () {
        function MainComponent() {
            this.controller = controllers_1.ControllerM.MainCtrl;
            this.controllerAs = "$ctrl";
            this.template = __webpack_require__(6);
        }
        return MainComponent;
    }());
    ComponentsM.MainComponent = MainComponent;
    var FormComponent = /** @class */ (function () {
        function FormComponent() {
            this.controller = controllers_1.ControllerM.PostFormCtrl;
            this.controllerAs = "$ctrl";
            this.template = __webpack_require__(3);
        }
        return FormComponent;
    }());
    ComponentsM.FormComponent = FormComponent;
})(ComponentsM = exports.ComponentsM || (exports.ComponentsM = {}));


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/// <reference path="../../node_modules/@types/angular-resource/index.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var ControllerM;
(function (ControllerM) {
    ///////////////////////////////
    // MAIN CONTROLLER
    ///////////////
    var MainCtrl = /** @class */ (function () {
        function MainCtrl($http, dataAccessService, $scope) {
            var _this = this;
            this.$http = $http;
            this.dataAccessService = dataAccessService;
            this.$scope = $scope;
            dataAccessService
                .getPostsResource()
                .query(function (data) {
                console.log(data);
                _this.$scope.posts = data;
            });
            this.$scope.$on("POST_SUBMITTED", function () {
                dataAccessService
                    .getPostsResource()
                    .query(function (data) {
                    _this.$scope.posts = data;
                });
            });
        }
        MainCtrl.inject = ["dataAccessService", "$scope"];
        return MainCtrl;
    }());
    ControllerM.MainCtrl = MainCtrl;
    var PostFormCtrl = /** @class */ (function () {
        function PostFormCtrl($scope, dataAccessService, $http, $rootScope, $location) {
            this.$scope = $scope;
            this.dataAccessService = dataAccessService;
            this.$http = $http;
            this.$rootScope = $rootScope;
            this.$location = $location;
            this.dataAccessService = dataAccessService;
        }
        PostFormCtrl.prototype.submit = function () {
            var _this = this;
            var newPostObject = {
                title: this.$scope.title,
                subtitle: this.$scope.subtitle,
                content: this.$scope.content,
            };
            this.$http({
                method: "POST",
                url: "http://localhost:3000/posts",
                data: newPostObject,
                headers: {
                    'Content-Type': "application/json"
                }
            }).then(function (res) {
                _this.$rootScope.$broadcast("POST_SUBMITTED");
                console.log("Post Form Ctrl Broadcasted");
                _this.$location.path("/");
            });
            return true;
        };
        PostFormCtrl.$inject = ["$scope", "dataAccessService", "$http", "$rootScope", "$location"];
        return PostFormCtrl;
    }());
    ControllerM.PostFormCtrl = PostFormCtrl;
    var NavCtrl = /** @class */ (function () {
        function NavCtrl() {
        }
        NavCtrl.prototype.$onInit = function () {
        };
        return NavCtrl;
    }());
    ControllerM.NavCtrl = NavCtrl;
})(ControllerM = exports.ControllerM || (exports.ControllerM = {}));


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = "<!-- Modal Structure -->\n<form name=\"$ctrl.postForm\" ng-submit=\"$ctrl.submit()\">\n    <div class=\"input-field col s6\">\n        <input id=\"title\" type=\"text\" class=\"validate white-text\" ng-model=\"title\">\n        <label for=\"title\">Title</label>\n    </div>\n    <div class=\"input-field col s6\">\n        <input id=\"subtitle\" type=\"text\" class=\"validate white-text\" ng-model=\"subtitle\">\n        <label for=\"subtitle\">Subtitle</label>\n    </div>\n    <div class=\"input-field col s6\">\n        <textarea id=\"content\" type=\"textarea\" class=\"validate white-text materialize-textarea\" ng-model=\"content\"></textarea>\n        <label for=\"content\">Content</label>\n    </div>\n    <div class=\"chips\"></div>\n    <button class=\"waves-effect waves-light btn blue darken-3\" type=\"submit\">Submit</button>\n</form>\n";

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/// <reference path="../../node_modules/@types/angular-resource/index.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var ServicesM;
(function (ServicesM) {
    var DataAccessService = /** @class */ (function () {
        function DataAccessService($resource) {
            this.$resource = $resource;
            this.users = [];
        }
        // The actual service. Resource Class is a generic interface. Applying our custom IUserResource interface to it
        // will require our custom type to be returned from the ajax request
        DataAccessService.prototype.getPostsResource = function () {
            return this.$resource("http://localhost:3000/posts", null, {
                query: {
                    method: 'GET',
                    isArray: true
                }
            });
        };
        // Static injection makes $resource available on the class, instead of only on the instance
        DataAccessService.$inject = ["$resource"];
        return DataAccessService;
    }());
    ServicesM.DataAccessService = DataAccessService;
})(ServicesM = exports.ServicesM || (exports.ServicesM = {}));


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = "<div class=\"navbar-fixed\">\n  <nav>\n    <div class=\"nav-wrapper blue darken-3\">\n      <a href=\"#\" class=\"brand-logo\">Totally</a>\n      <ul id=\"nav-mobile\" class=\"right hide-on-med-and-down\">\n        <li><a href=\"/\">Home</a></li>\n        <li><a href=\"/#!/create\">Post</a></li>\n      </ul>\n    </div>\n  </nav>\n</div>\n";

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\" >\n    <div class=\"col s9 m9\" ng-repeat=\"post in $ctrl.$scope.posts\">\n        <div class=\"card blue darken-3\">\n            <div class=\"card-content\">\n                <h2 class=\"white-text\">{{post.title}}</h2>\n                <h5 class=\"blue-text text-lighten-3\">{{post.subtitle}}</h5>\n                <p class=\"blue-text text-lighten-5\">{{post.content}}</p>\n            </div>\n        </div>\n    </div>\n</div>";

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTk2NjQ1MjU2OWFhZWNjMTM2YTkiLCJ3ZWJwYWNrOi8vLy4vYXBwLnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vY29udHJvbGxlcnMuanMiLCJ3ZWJwYWNrOi8vLy4uL3B1YmxpYy9wYXJ0aWFscy9uZXdQb3N0Rm9ybS5odG1sIiwid2VicGFjazovLy8uL3NlcnZpY2VzLmpzIiwid2VicGFjazovLy8uLi9wdWJsaWMvcGFydGlhbHMvbmF2QmFyLmh0bWwiLCJ3ZWJwYWNrOi8vLy4uL3B1YmxpYy9wYXJ0aWFscy9tYWluQ29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7OztBQzdEQTtBQUNBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDQUFDLGtCQUFrQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyw4QkFBOEI7Ozs7Ozs7O0FDaEQvQjtBQUNBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsQ0FBQyxnRUFBZ0U7Ozs7Ozs7O0FDakNqRTtBQUNBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDQUFDLGdFQUFnRTs7Ozs7OztBQzFFakUseTJCOzs7Ozs7O0FDQUE7QUFDQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLENBQUMsMERBQTBEOzs7Ozs7O0FDekIzRCx5Vzs7Ozs7O0FDQUEsaVBBQWlQLFlBQVksZ0VBQWdFLGVBQWUsK0RBQStELGNBQWMsOEQiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL3B1YmxpYy9hc3NldHMvanNcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA5OTY2NDUyNTY5YWFlY2MxMzZhOSIsIlwidXNlIHN0cmljdFwiO1xuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vX2ZpeC5kLnRzXCIgLz5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBjb21wb25lbnRzXzEgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzXCIpO1xudmFyIHNlcnZpY2VzXzEgPSByZXF1aXJlKFwiLi9zZXJ2aWNlc1wiKTtcbnZhciBhcHA7XG4oZnVuY3Rpb24gKGFwcCkge1xuICAgIHZhciBNb2R1bGUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIE1vZHVsZShuYW1lLCBtb2R1bGVzKSB7XG4gICAgICAgICAgICB0aGlzLmFwcCA9IGFuZ3VsYXIubW9kdWxlKG5hbWUsIG1vZHVsZXMpO1xuICAgICAgICB9XG4gICAgICAgIE1vZHVsZS5wcm90b3R5cGUuYWRkQ29udHJvbGxlciA9IGZ1bmN0aW9uIChuYW1lLCBjb250cm9sbGVyKSB7XG4gICAgICAgICAgICB0aGlzLmFwcC5jb250cm9sbGVyKG5hbWUsIGNvbnRyb2xsZXIpO1xuICAgICAgICB9O1xuICAgICAgICBNb2R1bGUucHJvdG90eXBlLmFkZFNlcnZpY2UgPSBmdW5jdGlvbiAobmFtZSwgc2VydmljZUZ1bmMpIHtcbiAgICAgICAgICAgIHRoaXMuYXBwLnNlcnZpY2UobmFtZSwgc2VydmljZUZ1bmMpO1xuICAgICAgICB9O1xuICAgICAgICBNb2R1bGUucHJvdG90eXBlLmFkZENvbXBvbmVudCA9IGZ1bmN0aW9uIChuYW1lLCBjb21wb25lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuYXBwLmNvbXBvbmVudChuYW1lLCBjb21wb25lbnQpO1xuICAgICAgICB9O1xuICAgICAgICBNb2R1bGUucHJvdG90eXBlLmNvbmZpZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuYXBwLmNvbmZpZyhbXCIkaHR0cFByb3ZpZGVyXCIsIFwiJHFQcm92aWRlclwiLCBcIiRyb3V0ZVByb3ZpZGVyXCIsIGZ1bmN0aW9uICgkaHR0cFByb3ZpZGVyLCAkcVByb3ZpZGVyLCAkcm91dGVQcm92aWRlcikge1xuICAgICAgICAgICAgICAgICAgICAkaHR0cFByb3ZpZGVyLmRlZmF1bHRzLnVzZVhEb21haW4gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgJGh0dHBQcm92aWRlci5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vblsnWC1SZXF1ZXN0ZWQtV2l0aCddO1xuICAgICAgICAgICAgICAgICAgICAkcVByb3ZpZGVyLmVycm9yT25VbmhhbmRsZWRSZWplY3Rpb25zKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gUk9VVElOR1xuICAgICAgICAgICAgICAgICAgICAkcm91dGVQcm92aWRlclxuICAgICAgICAgICAgICAgICAgICAgICAgLndoZW4oJy8nLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogXCIuL3ZpZXdzL3Bvc3Rfdmlldy5odG1sXCJcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC53aGVuKCcvY3JlYXRlJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiLi92aWV3cy9uZXdfcG9zdF92aWV3Lmh0bWxcIlxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XSk7XG4gICAgICAgIH07XG4gICAgICAgIE1vZHVsZS4kaW5qZWN0ID0gW1wibmdSZXNvdXJjZVwiLCBcIm5nUm91dGVcIl07XG4gICAgICAgIHJldHVybiBNb2R1bGU7XG4gICAgfSgpKTtcbiAgICBhcHAuTW9kdWxlID0gTW9kdWxlO1xufSkoYXBwIHx8IChhcHAgPSB7fSkpO1xudmFyIE15VGVzdEFwcDtcbihmdW5jdGlvbiAoTXlUZXN0QXBwKSB7XG4gICAgdmFyIG15QXBwID0gbmV3IGFwcC5Nb2R1bGUoJ215QXBwJywgW1wibmdSZXNvdXJjZVwiLCBcIm5nUm91dGVcIl0pO1xuICAgIG15QXBwLmNvbmZpZygpO1xuICAgIG15QXBwLmFkZENvbXBvbmVudCgnbmF2QmFyJywgbmV3IGNvbXBvbmVudHNfMS5Db21wb25lbnRzTS5OYXZDb21wb25lbnQoKSk7XG4gICAgbXlBcHAuYWRkQ29tcG9uZW50KCdtYWluQ29tcG9uZW50JywgbmV3IGNvbXBvbmVudHNfMS5Db21wb25lbnRzTS5NYWluQ29tcG9uZW50KCkpO1xuICAgIG15QXBwLmFkZENvbXBvbmVudCgnbmV3UG9zdEZvcm0nLCBuZXcgY29tcG9uZW50c18xLkNvbXBvbmVudHNNLkZvcm1Db21wb25lbnQoKSk7XG4gICAgbXlBcHAuYWRkU2VydmljZShcImRhdGFBY2Nlc3NTZXJ2aWNlXCIsIHNlcnZpY2VzXzEuU2VydmljZXNNLkRhdGFBY2Nlc3NTZXJ2aWNlKTtcbn0pKE15VGVzdEFwcCB8fCAoTXlUZXN0QXBwID0ge30pKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwLnRzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vX2ZpeC5kLnRzXCIgLz5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBjb250cm9sbGVyc18xID0gcmVxdWlyZShcIi4vY29udHJvbGxlcnNcIik7XG52YXIgQ29tcG9uZW50c007XG4oZnVuY3Rpb24gKENvbXBvbmVudHNNKSB7XG4gICAgdmFyIE5hdkNvbXBvbmVudCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gTmF2Q29tcG9uZW50KCkge1xuICAgICAgICAgICAgdGhpcy5jb250cm9sbGVyID0gY29udHJvbGxlcnNfMS5Db250cm9sbGVyTS5OYXZDdHJsO1xuICAgICAgICAgICAgdGhpcy5jb250cm9sbGVyQXMgPSBcIiRjdHJsXCI7XG4gICAgICAgICAgICB0aGlzLnRlbXBsYXRlID0gcmVxdWlyZShcIi4uL3B1YmxpYy9wYXJ0aWFscy9uYXZCYXIuaHRtbFwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gTmF2Q29tcG9uZW50O1xuICAgIH0oKSk7XG4gICAgQ29tcG9uZW50c00uTmF2Q29tcG9uZW50ID0gTmF2Q29tcG9uZW50O1xuICAgIHZhciBNYWluQ29tcG9uZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBNYWluQ29tcG9uZW50KCkge1xuICAgICAgICAgICAgdGhpcy5jb250cm9sbGVyID0gY29udHJvbGxlcnNfMS5Db250cm9sbGVyTS5NYWluQ3RybDtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbGxlckFzID0gXCIkY3RybFwiO1xuICAgICAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IHJlcXVpcmUoXCIuLi9wdWJsaWMvcGFydGlhbHMvbWFpbkNvbXBvbmVudC5odG1sXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBNYWluQ29tcG9uZW50O1xuICAgIH0oKSk7XG4gICAgQ29tcG9uZW50c00uTWFpbkNvbXBvbmVudCA9IE1haW5Db21wb25lbnQ7XG4gICAgdmFyIEZvcm1Db21wb25lbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIEZvcm1Db21wb25lbnQoKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBjb250cm9sbGVyc18xLkNvbnRyb2xsZXJNLlBvc3RGb3JtQ3RybDtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbGxlckFzID0gXCIkY3RybFwiO1xuICAgICAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IHJlcXVpcmUoXCIuLi9wdWJsaWMvcGFydGlhbHMvbmV3UG9zdEZvcm0uaHRtbFwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gRm9ybUNvbXBvbmVudDtcbiAgICB9KCkpO1xuICAgIENvbXBvbmVudHNNLkZvcm1Db21wb25lbnQgPSBGb3JtQ29tcG9uZW50O1xufSkoQ29tcG9uZW50c00gPSBleHBvcnRzLkNvbXBvbmVudHNNIHx8IChleHBvcnRzLkNvbXBvbmVudHNNID0ge30pKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY29tcG9uZW50cy5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9ub2RlX21vZHVsZXMvQHR5cGVzL2FuZ3VsYXItcmVzb3VyY2UvaW5kZXguZC50c1wiIC8+XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgQ29udHJvbGxlck07XG4oZnVuY3Rpb24gKENvbnRyb2xsZXJNKSB7XG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIC8vIE1BSU4gQ09OVFJPTExFUlxuICAgIC8vLy8vLy8vLy8vLy8vL1xuICAgIHZhciBNYWluQ3RybCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gTWFpbkN0cmwoJGh0dHAsIGRhdGFBY2Nlc3NTZXJ2aWNlLCAkc2NvcGUpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLiRodHRwID0gJGh0dHA7XG4gICAgICAgICAgICB0aGlzLmRhdGFBY2Nlc3NTZXJ2aWNlID0gZGF0YUFjY2Vzc1NlcnZpY2U7XG4gICAgICAgICAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcbiAgICAgICAgICAgIGRhdGFBY2Nlc3NTZXJ2aWNlXG4gICAgICAgICAgICAgICAgLmdldFBvc3RzUmVzb3VyY2UoKVxuICAgICAgICAgICAgICAgIC5xdWVyeShmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgIF90aGlzLiRzY29wZS5wb3N0cyA9IGRhdGE7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLiRvbihcIlBPU1RfU1VCTUlUVEVEXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBkYXRhQWNjZXNzU2VydmljZVxuICAgICAgICAgICAgICAgICAgICAuZ2V0UG9zdHNSZXNvdXJjZSgpXG4gICAgICAgICAgICAgICAgICAgIC5xdWVyeShmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy4kc2NvcGUucG9zdHMgPSBkYXRhO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgTWFpbkN0cmwuaW5qZWN0ID0gW1wiZGF0YUFjY2Vzc1NlcnZpY2VcIiwgXCIkc2NvcGVcIl07XG4gICAgICAgIHJldHVybiBNYWluQ3RybDtcbiAgICB9KCkpO1xuICAgIENvbnRyb2xsZXJNLk1haW5DdHJsID0gTWFpbkN0cmw7XG4gICAgdmFyIFBvc3RGb3JtQ3RybCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gUG9zdEZvcm1DdHJsKCRzY29wZSwgZGF0YUFjY2Vzc1NlcnZpY2UsICRodHRwLCAkcm9vdFNjb3BlLCAkbG9jYXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICAgICAgdGhpcy5kYXRhQWNjZXNzU2VydmljZSA9IGRhdGFBY2Nlc3NTZXJ2aWNlO1xuICAgICAgICAgICAgdGhpcy4kaHR0cCA9ICRodHRwO1xuICAgICAgICAgICAgdGhpcy4kcm9vdFNjb3BlID0gJHJvb3RTY29wZTtcbiAgICAgICAgICAgIHRoaXMuJGxvY2F0aW9uID0gJGxvY2F0aW9uO1xuICAgICAgICAgICAgdGhpcy5kYXRhQWNjZXNzU2VydmljZSA9IGRhdGFBY2Nlc3NTZXJ2aWNlO1xuICAgICAgICB9XG4gICAgICAgIFBvc3RGb3JtQ3RybC5wcm90b3R5cGUuc3VibWl0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHZhciBuZXdQb3N0T2JqZWN0ID0ge1xuICAgICAgICAgICAgICAgIHRpdGxlOiB0aGlzLiRzY29wZS50aXRsZSxcbiAgICAgICAgICAgICAgICBzdWJ0aXRsZTogdGhpcy4kc2NvcGUuc3VidGl0bGUsXG4gICAgICAgICAgICAgICAgY29udGVudDogdGhpcy4kc2NvcGUuY29udGVudCxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLiRodHRwKHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgIHVybDogXCJodHRwOi8vbG9jYWxob3N0OjMwMDAvcG9zdHNcIixcbiAgICAgICAgICAgICAgICBkYXRhOiBuZXdQb3N0T2JqZWN0LFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuJHJvb3RTY29wZS4kYnJvYWRjYXN0KFwiUE9TVF9TVUJNSVRURURcIik7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJQb3N0IEZvcm0gQ3RybCBCcm9hZGNhc3RlZFwiKTtcbiAgICAgICAgICAgICAgICBfdGhpcy4kbG9jYXRpb24ucGF0aChcIi9cIik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICBQb3N0Rm9ybUN0cmwuJGluamVjdCA9IFtcIiRzY29wZVwiLCBcImRhdGFBY2Nlc3NTZXJ2aWNlXCIsIFwiJGh0dHBcIiwgXCIkcm9vdFNjb3BlXCIsIFwiJGxvY2F0aW9uXCJdO1xuICAgICAgICByZXR1cm4gUG9zdEZvcm1DdHJsO1xuICAgIH0oKSk7XG4gICAgQ29udHJvbGxlck0uUG9zdEZvcm1DdHJsID0gUG9zdEZvcm1DdHJsO1xuICAgIHZhciBOYXZDdHJsID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBOYXZDdHJsKCkge1xuICAgICAgICB9XG4gICAgICAgIE5hdkN0cmwucHJvdG90eXBlLiRvbkluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBOYXZDdHJsO1xuICAgIH0oKSk7XG4gICAgQ29udHJvbGxlck0uTmF2Q3RybCA9IE5hdkN0cmw7XG59KShDb250cm9sbGVyTSA9IGV4cG9ydHMuQ29udHJvbGxlck0gfHwgKGV4cG9ydHMuQ29udHJvbGxlck0gPSB7fSkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jb250cm9sbGVycy5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPCEtLSBNb2RhbCBTdHJ1Y3R1cmUgLS0+XFxuPGZvcm0gbmFtZT1cXFwiJGN0cmwucG9zdEZvcm1cXFwiIG5nLXN1Ym1pdD1cXFwiJGN0cmwuc3VibWl0KClcXFwiPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJpbnB1dC1maWVsZCBjb2wgczZcXFwiPlxcbiAgICAgICAgPGlucHV0IGlkPVxcXCJ0aXRsZVxcXCIgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcInZhbGlkYXRlIHdoaXRlLXRleHRcXFwiIG5nLW1vZGVsPVxcXCJ0aXRsZVxcXCI+XFxuICAgICAgICA8bGFiZWwgZm9yPVxcXCJ0aXRsZVxcXCI+VGl0bGU8L2xhYmVsPlxcbiAgICA8L2Rpdj5cXG4gICAgPGRpdiBjbGFzcz1cXFwiaW5wdXQtZmllbGQgY29sIHM2XFxcIj5cXG4gICAgICAgIDxpbnB1dCBpZD1cXFwic3VidGl0bGVcXFwiIHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJ2YWxpZGF0ZSB3aGl0ZS10ZXh0XFxcIiBuZy1tb2RlbD1cXFwic3VidGl0bGVcXFwiPlxcbiAgICAgICAgPGxhYmVsIGZvcj1cXFwic3VidGl0bGVcXFwiPlN1YnRpdGxlPC9sYWJlbD5cXG4gICAgPC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XFxcImlucHV0LWZpZWxkIGNvbCBzNlxcXCI+XFxuICAgICAgICA8dGV4dGFyZWEgaWQ9XFxcImNvbnRlbnRcXFwiIHR5cGU9XFxcInRleHRhcmVhXFxcIiBjbGFzcz1cXFwidmFsaWRhdGUgd2hpdGUtdGV4dCBtYXRlcmlhbGl6ZS10ZXh0YXJlYVxcXCIgbmctbW9kZWw9XFxcImNvbnRlbnRcXFwiPjwvdGV4dGFyZWE+XFxuICAgICAgICA8bGFiZWwgZm9yPVxcXCJjb250ZW50XFxcIj5Db250ZW50PC9sYWJlbD5cXG4gICAgPC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XFxcImNoaXBzXFxcIj48L2Rpdj5cXG4gICAgPGJ1dHRvbiBjbGFzcz1cXFwid2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0IGJ0biBibHVlIGRhcmtlbi0zXFxcIiB0eXBlPVxcXCJzdWJtaXRcXFwiPlN1Ym1pdDwvYnV0dG9uPlxcbjwvZm9ybT5cXG5cIjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9wdWJsaWMvcGFydGlhbHMvbmV3UG9zdEZvcm0uaHRtbFxuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9ub2RlX21vZHVsZXMvQHR5cGVzL2FuZ3VsYXItcmVzb3VyY2UvaW5kZXguZC50c1wiIC8+XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgU2VydmljZXNNO1xuKGZ1bmN0aW9uIChTZXJ2aWNlc00pIHtcbiAgICB2YXIgRGF0YUFjY2Vzc1NlcnZpY2UgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIERhdGFBY2Nlc3NTZXJ2aWNlKCRyZXNvdXJjZSkge1xuICAgICAgICAgICAgdGhpcy4kcmVzb3VyY2UgPSAkcmVzb3VyY2U7XG4gICAgICAgICAgICB0aGlzLnVzZXJzID0gW107XG4gICAgICAgIH1cbiAgICAgICAgLy8gVGhlIGFjdHVhbCBzZXJ2aWNlLiBSZXNvdXJjZSBDbGFzcyBpcyBhIGdlbmVyaWMgaW50ZXJmYWNlLiBBcHBseWluZyBvdXIgY3VzdG9tIElVc2VyUmVzb3VyY2UgaW50ZXJmYWNlIHRvIGl0XG4gICAgICAgIC8vIHdpbGwgcmVxdWlyZSBvdXIgY3VzdG9tIHR5cGUgdG8gYmUgcmV0dXJuZWQgZnJvbSB0aGUgYWpheCByZXF1ZXN0XG4gICAgICAgIERhdGFBY2Nlc3NTZXJ2aWNlLnByb3RvdHlwZS5nZXRQb3N0c1Jlc291cmNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHJlc291cmNlKFwiaHR0cDovL2xvY2FsaG9zdDozMDAwL3Bvc3RzXCIsIG51bGwsIHtcbiAgICAgICAgICAgICAgICBxdWVyeToge1xuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgICAgICAgICBpc0FycmF5OiB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIC8vIFN0YXRpYyBpbmplY3Rpb24gbWFrZXMgJHJlc291cmNlIGF2YWlsYWJsZSBvbiB0aGUgY2xhc3MsIGluc3RlYWQgb2Ygb25seSBvbiB0aGUgaW5zdGFuY2VcbiAgICAgICAgRGF0YUFjY2Vzc1NlcnZpY2UuJGluamVjdCA9IFtcIiRyZXNvdXJjZVwiXTtcbiAgICAgICAgcmV0dXJuIERhdGFBY2Nlc3NTZXJ2aWNlO1xuICAgIH0oKSk7XG4gICAgU2VydmljZXNNLkRhdGFBY2Nlc3NTZXJ2aWNlID0gRGF0YUFjY2Vzc1NlcnZpY2U7XG59KShTZXJ2aWNlc00gPSBleHBvcnRzLlNlcnZpY2VzTSB8fCAoZXhwb3J0cy5TZXJ2aWNlc00gPSB7fSkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zZXJ2aWNlcy5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBjbGFzcz1cXFwibmF2YmFyLWZpeGVkXFxcIj5cXG4gIDxuYXY+XFxuICAgIDxkaXYgY2xhc3M9XFxcIm5hdi13cmFwcGVyIGJsdWUgZGFya2VuLTNcXFwiPlxcbiAgICAgIDxhIGhyZWY9XFxcIiNcXFwiIGNsYXNzPVxcXCJicmFuZC1sb2dvXFxcIj5Ub3RhbGx5PC9hPlxcbiAgICAgIDx1bCBpZD1cXFwibmF2LW1vYmlsZVxcXCIgY2xhc3M9XFxcInJpZ2h0IGhpZGUtb24tbWVkLWFuZC1kb3duXFxcIj5cXG4gICAgICAgIDxsaT48YSBocmVmPVxcXCIvXFxcIj5Ib21lPC9hPjwvbGk+XFxuICAgICAgICA8bGk+PGEgaHJlZj1cXFwiLyMhL2NyZWF0ZVxcXCI+UG9zdDwvYT48L2xpPlxcbiAgICAgIDwvdWw+XFxuICAgIDwvZGl2PlxcbiAgPC9uYXY+XFxuPC9kaXY+XFxuXCI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vcHVibGljL3BhcnRpYWxzL25hdkJhci5odG1sXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGNsYXNzPVxcXCJyb3dcXFwiID5cXG4gICAgPGRpdiBjbGFzcz1cXFwiY29sIHM5IG05XFxcIiBuZy1yZXBlYXQ9XFxcInBvc3QgaW4gJGN0cmwuJHNjb3BlLnBvc3RzXFxcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImNhcmQgYmx1ZSBkYXJrZW4tM1xcXCI+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY2FyZC1jb250ZW50XFxcIj5cXG4gICAgICAgICAgICAgICAgPGgyIGNsYXNzPVxcXCJ3aGl0ZS10ZXh0XFxcIj57e3Bvc3QudGl0bGV9fTwvaDI+XFxuICAgICAgICAgICAgICAgIDxoNSBjbGFzcz1cXFwiYmx1ZS10ZXh0IHRleHQtbGlnaHRlbi0zXFxcIj57e3Bvc3Quc3VidGl0bGV9fTwvaDU+XFxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVxcXCJibHVlLXRleHQgdGV4dC1saWdodGVuLTVcXFwiPnt7cG9zdC5jb250ZW50fX08L3A+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuPC9kaXY+XCI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vcHVibGljL3BhcnRpYWxzL21haW5Db21wb25lbnQuaHRtbFxuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9