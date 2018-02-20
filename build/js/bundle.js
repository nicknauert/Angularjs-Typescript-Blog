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
var services_1 = __webpack_require__(6);
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
            this.template = __webpack_require__(3);
        }
        return NavComponent;
    }());
    ComponentsM.NavComponent = NavComponent;
    var MainComponent = /** @class */ (function () {
        function MainComponent() {
            this.controller = controllers_1.ControllerM.MainCtrl;
            this.controllerAs = "$ctrl";
            this.template = __webpack_require__(4);
        }
        return MainComponent;
    }());
    ComponentsM.MainComponent = MainComponent;
    var SinglePostComponent = /** @class */ (function () {
        function SinglePostComponent() {
            this.controller = controllers_1.ControllerM.SinglePostCtrl;
            this.controllerAs = "$ctrl";
            this.template = __webpack_require__(7);
        }
        return SinglePostComponent;
    }());
    ComponentsM.SinglePostComponent = SinglePostComponent;
    var FormComponent = /** @class */ (function () {
        function FormComponent() {
            this.controller = controllers_1.ControllerM.PostFormCtrl;
            this.controllerAs = "$ctrl";
            this.template = __webpack_require__(5);
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
            this.$scope.$on("POST_SUBMITTED", function () {
                _this.getPostList();
            });
        }
        MainCtrl.prototype.$onInit = function () {
            console.log("init");
            this.getPostList();
        };
        MainCtrl.prototype.getPostList = function () {
            var _this = this;
            this.dataAccessService
                .getPostsResource()
                .query(function (data) {
                var formattedData = data.map(function (post) {
                    if (post.tags) {
                        post.tags = post.tags.split(' ');
                    }
                    return post;
                });
                console.log(formattedData);
                _this.$scope.posts = formattedData;
            });
        };
        MainCtrl.inject = ["dataAccessService", "$scope"];
        return MainCtrl;
    }());
    ControllerM.MainCtrl = MainCtrl;
    var SinglePostCtrl = /** @class */ (function () {
        function SinglePostCtrl($http, dataAccessService, $scope, $location) {
            this.$http = $http;
            this.dataAccessService = dataAccessService;
            this.$scope = $scope;
            this.$location = $location;
        }
        SinglePostCtrl.prototype.$onInit = function () {
            console.log(this.$location.path().split('/')[2]);
            this.getSinglePost(this.$location.path().split('/')[2]);
        };
        SinglePostCtrl.prototype.getSinglePost = function (id) {
            var _this = this;
            this.dataAccessService
                .getSinglePostResource(id)
                .query(function (data) {
                var postObj = data[0];
                postObj.tags = postObj.tags.split(' ');
                _this.$scope.post = postObj;
            });
        };
        SinglePostCtrl.inject = ["dataAccessService", "$scope", "$location"];
        return SinglePostCtrl;
    }());
    ControllerM.SinglePostCtrl = SinglePostCtrl;
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
            var newPostObject = {
                title: this.$scope.title,
                subtitle: this.$scope.subtitle,
                content: this.$scope.content,
                tags: this.$scope.tags
            };
            this.sendNewPost(newPostObject);
        };
        PostFormCtrl.prototype.sendNewPost = function (postObj) {
            var _this = this;
            this.$http({
                method: "POST",
                url: "http://localhost:3000/posts",
                data: postObj,
                headers: {
                    'Content-Type': "application/json"
                }
            })
                .then(function (res) { return _this.handleNewPostResponse(res); })
                .catch(function (err) { return console.log(err); });
        };
        PostFormCtrl.prototype.handleNewPostResponse = function (res) {
            console.log("new Post Handler");
            this.$rootScope.$broadcast("POST_SUBMITTED");
            this.$location.path("/");
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

module.exports = "<div class=\"navbar-fixed\">\n  <nav>\n    <div class=\"nav-wrapper blue darken-3\">\n      <a href=\"#\" class=\"brand-logo\">Totally</a>\n      <ul id=\"nav-mobile\" class=\"right hide-on-med-and-down\">\n        <li><a href=\"/\">Home</a></li>\n        <li><a href=\"/#!/create\">Post</a></li>\n      </ul>\n    </div>\n  </nav>\n</div>\n";

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\" >\n    <div class=\"col s9 m9\" ng-repeat=\"post in $ctrl.$scope.posts track by $index\">\n        <div class=\"card blue darken-3\">\n            <div class=\"card-content\">\n                <h2 class=\"white-text\"><a href=\"/#!/posts/{{post.post_id}}\">{{post.title}}</a></h2>\n                <h5 class=\"blue-text text-lighten-3\">{{post.subtitle}}</h5>\n                <p class=\"blue-text text-lighten-5\">{{post.content | limitTo: 300}}...</p>\n            </div>\n                <div ng-if=\"post.tags\" class=\"card-action\">\n                    <span class=\"blue-text text-lighten-2\">Tags</span>\n                    <span ng-repeat=\"tag in post.tags\" class=\"chip blue-text text-darken-1\">{{tag}}</span>\n                </div>\n        </div>\n    </div>\n</div>";

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = "<!-- Modal Structure -->\n<form name=\"$ctrl.postForm\" ng-submit=\"$ctrl.submit()\">\n    <div class=\"input-field col s6\">\n        <input id=\"title\" type=\"text\" class=\"validate white-text\" ng-model=\"title\">\n        <label for=\"title\">Title</label>\n    </div>\n    <div class=\"input-field col s6\">\n        <input id=\"subtitle\" type=\"text\" class=\"validate white-text\" ng-model=\"subtitle\">\n        <label for=\"subtitle\">Subtitle</label>\n    </div>\n    <div class=\"input-field col s6\">\n        <textarea id=\"content\" type=\"textarea\" class=\"validate white-text materialize-textarea\" ng-model=\"content\"></textarea>\n        <label for=\"content\">Content</label>\n    </div>\n    <div class=\"input-field col s6\">\n        <textarea id=\"tags\" type=\"text\" class=\"validate white-text materialize-textarea\" ng-model=\"tags\"></textarea>\n        <label for=\"tags\">Tags</label>\n    </div>\n\n    <button class=\"waves-effect waves-light btn blue darken-3\" type=\"submit\">Submit</button>\n</form>\n";

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/// <reference path="../../node_modules/@types/angular-resource/index.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var ServicesM;
(function (ServicesM) {
    var DataAccessService = /** @class */ (function () {
        function DataAccessService($resource) {
            this.$resource = $resource;
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
        DataAccessService.prototype.getSinglePostResource = function (id) {
            return this.$resource("http://localhost:3000/post/:post_id", { post_id: id }, {
                get: {
                    method: 'GET',
                    isArray: false
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
/* 7 */
/***/ (function(module, exports) {

module.exports = "<div class=\"col s9 m9\">\n    <div class=\"card blue darken-3\">\n        <div class=\"card-content\">\n            <h2 class=\"white-text\">{{$ctrl.$scope.post.title}}</h2>\n            <h5 class=\"blue-text text-lighten-3\">{{$ctrl.$scope.post.subtitle}}</h5>\n            <p class=\"blue-text text-lighten-5\">{{$ctrl.$scope.post.content}}</p>\n        </div>\n        <div ng-if=\"$ctrl.$scope.post.tags\" class=\"card-action\">\n            <span class=\"blue-text text-lighten-2\">Tags</span>\n            <span ng-repeat=\"tag in $ctrl.$scope.post.tags\" class=\"chip blue-text text-darken-1\">{{tag}}</span>\n        </div>\n    </div>\n</div>";

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjM3ZjRkZDQ1MWZhZjIwNTViNWQiLCJ3ZWJwYWNrOi8vLy4vYXBwLnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vY29udHJvbGxlcnMuanMiLCJ3ZWJwYWNrOi8vLy4uL3B1YmxpYy9wYXJ0aWFscy9uYXZCYXIuaHRtbCIsIndlYnBhY2s6Ly8vLi4vcHVibGljL3BhcnRpYWxzL21haW5Db21wb25lbnQuaHRtbCIsIndlYnBhY2s6Ly8vLi4vcHVibGljL3BhcnRpYWxzL25ld1Bvc3RGb3JtLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc2VydmljZXMuanMiLCJ3ZWJwYWNrOi8vLy4uL3B1YmxpYy9wYXJ0aWFscy9zaW5nbGVQb3N0Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7OztBQzdEQTtBQUNBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLENBQUMsa0JBQWtCO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsOEJBQThCOzs7Ozs7OztBQ3BEL0I7QUFDQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsQ0FBQyxnRUFBZ0U7Ozs7Ozs7O0FDMUNqRTtBQUNBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLHNDQUFzQyx5Q0FBeUMsRUFBRTtBQUNqRix1Q0FBdUMseUJBQXlCLEVBQUU7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLENBQUMsZ0VBQWdFOzs7Ozs7O0FDbEhqRSx5Vzs7Ozs7O0FDQUEscVJBQXFSLGNBQWMsS0FBSyxZQUFZLG9FQUFvRSxlQUFlLCtEQUErRCw2QkFBNkIsMFFBQTBRLEtBQUsscUU7Ozs7OztBQ0FsdkIsc2lDOzs7Ozs7O0FDQUE7QUFDQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLDBFQUEwRSxjQUFjO0FBQ3hGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsQ0FBQywwREFBMEQ7Ozs7Ozs7QUNoQzNELGtLQUFrSyx5QkFBeUIsNERBQTRELDRCQUE0QiwyREFBMkQsMkJBQTJCLHFRQUFxUSxLQUFLLDZDIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9wdWJsaWMvYXNzZXRzL2pzXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZjM3ZjRkZDQ1MWZhZjIwNTViNWQiLCJcInVzZSBzdHJpY3RcIjtcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL19maXguZC50c1wiIC8+XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgY29tcG9uZW50c18xID0gcmVxdWlyZShcIi4vY29tcG9uZW50c1wiKTtcbnZhciBzZXJ2aWNlc18xID0gcmVxdWlyZShcIi4vc2VydmljZXNcIik7XG52YXIgYXBwO1xuKGZ1bmN0aW9uIChhcHApIHtcbiAgICB2YXIgTW9kdWxlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBNb2R1bGUobmFtZSwgbW9kdWxlcykge1xuICAgICAgICAgICAgdGhpcy5hcHAgPSBhbmd1bGFyLm1vZHVsZShuYW1lLCBtb2R1bGVzKTtcbiAgICAgICAgfVxuICAgICAgICBNb2R1bGUucHJvdG90eXBlLmFkZENvbnRyb2xsZXIgPSBmdW5jdGlvbiAobmFtZSwgY29udHJvbGxlcikge1xuICAgICAgICAgICAgdGhpcy5hcHAuY29udHJvbGxlcihuYW1lLCBjb250cm9sbGVyKTtcbiAgICAgICAgfTtcbiAgICAgICAgTW9kdWxlLnByb3RvdHlwZS5hZGRTZXJ2aWNlID0gZnVuY3Rpb24gKG5hbWUsIHNlcnZpY2VGdW5jKSB7XG4gICAgICAgICAgICB0aGlzLmFwcC5zZXJ2aWNlKG5hbWUsIHNlcnZpY2VGdW5jKTtcbiAgICAgICAgfTtcbiAgICAgICAgTW9kdWxlLnByb3RvdHlwZS5hZGRDb21wb25lbnQgPSBmdW5jdGlvbiAobmFtZSwgY29tcG9uZW50KSB7XG4gICAgICAgICAgICB0aGlzLmFwcC5jb21wb25lbnQobmFtZSwgY29tcG9uZW50KTtcbiAgICAgICAgfTtcbiAgICAgICAgTW9kdWxlLnByb3RvdHlwZS5jb25maWcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmFwcC5jb25maWcoW1wiJGh0dHBQcm92aWRlclwiLCBcIiRxUHJvdmlkZXJcIiwgXCIkcm91dGVQcm92aWRlclwiLCBmdW5jdGlvbiAoJGh0dHBQcm92aWRlciwgJHFQcm92aWRlciwgJHJvdXRlUHJvdmlkZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgJGh0dHBQcm92aWRlci5kZWZhdWx0cy51c2VYRG9tYWluID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlICRodHRwUHJvdmlkZXIuZGVmYXVsdHMuaGVhZGVycy5jb21tb25bJ1gtUmVxdWVzdGVkLVdpdGgnXTtcbiAgICAgICAgICAgICAgICAgICAgJHFQcm92aWRlci5lcnJvck9uVW5oYW5kbGVkUmVqZWN0aW9ucyhmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIFJPVVRJTkdcbiAgICAgICAgICAgICAgICAgICAgJHJvdXRlUHJvdmlkZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIC53aGVuKCcvJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiLi92aWV3cy9wb3N0X3ZpZXcuaHRtbFwiXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAud2hlbignL3Bvc3RzLzpwb3N0X2lkJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuL3ZpZXdzL3NpbmdsZV9wb3N0X3ZpZXcuaHRtbCdcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC53aGVuKCcvY3JlYXRlJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiLi92aWV3cy9uZXdfcG9zdF92aWV3Lmh0bWxcIlxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XSk7XG4gICAgICAgIH07XG4gICAgICAgIE1vZHVsZS4kaW5qZWN0ID0gW1wibmdSZXNvdXJjZVwiLCBcIm5nUm91dGVcIl07XG4gICAgICAgIHJldHVybiBNb2R1bGU7XG4gICAgfSgpKTtcbiAgICBhcHAuTW9kdWxlID0gTW9kdWxlO1xufSkoYXBwIHx8IChhcHAgPSB7fSkpO1xudmFyIE15VGVzdEFwcDtcbihmdW5jdGlvbiAoTXlUZXN0QXBwKSB7XG4gICAgdmFyIG15QXBwID0gbmV3IGFwcC5Nb2R1bGUoJ215QXBwJywgW1wibmdSZXNvdXJjZVwiLCBcIm5nUm91dGVcIl0pO1xuICAgIG15QXBwLmNvbmZpZygpO1xuICAgIG15QXBwLmFkZENvbXBvbmVudCgnbmF2QmFyJywgbmV3IGNvbXBvbmVudHNfMS5Db21wb25lbnRzTS5OYXZDb21wb25lbnQoKSk7XG4gICAgbXlBcHAuYWRkQ29tcG9uZW50KCdtYWluQ29tcG9uZW50JywgbmV3IGNvbXBvbmVudHNfMS5Db21wb25lbnRzTS5NYWluQ29tcG9uZW50KCkpO1xuICAgIG15QXBwLmFkZENvbXBvbmVudCgnbmV3UG9zdEZvcm0nLCBuZXcgY29tcG9uZW50c18xLkNvbXBvbmVudHNNLkZvcm1Db21wb25lbnQoKSk7XG4gICAgbXlBcHAuYWRkQ29tcG9uZW50KCdzaW5nbGVQb3N0JywgbmV3IGNvbXBvbmVudHNfMS5Db21wb25lbnRzTS5TaW5nbGVQb3N0Q29tcG9uZW50KCkpO1xuICAgIG15QXBwLmFkZFNlcnZpY2UoXCJkYXRhQWNjZXNzU2VydmljZVwiLCBzZXJ2aWNlc18xLlNlcnZpY2VzTS5EYXRhQWNjZXNzU2VydmljZSk7XG59KShNeVRlc3RBcHAgfHwgKE15VGVzdEFwcCA9IHt9KSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC50c1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL19maXguZC50c1wiIC8+XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgY29udHJvbGxlcnNfMSA9IHJlcXVpcmUoXCIuL2NvbnRyb2xsZXJzXCIpO1xudmFyIENvbXBvbmVudHNNO1xuKGZ1bmN0aW9uIChDb21wb25lbnRzTSkge1xuICAgIHZhciBOYXZDb21wb25lbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIE5hdkNvbXBvbmVudCgpIHtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbGxlciA9IGNvbnRyb2xsZXJzXzEuQ29udHJvbGxlck0uTmF2Q3RybDtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbGxlckFzID0gXCIkY3RybFwiO1xuICAgICAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IHJlcXVpcmUoXCIuLi9wdWJsaWMvcGFydGlhbHMvbmF2QmFyLmh0bWxcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIE5hdkNvbXBvbmVudDtcbiAgICB9KCkpO1xuICAgIENvbXBvbmVudHNNLk5hdkNvbXBvbmVudCA9IE5hdkNvbXBvbmVudDtcbiAgICB2YXIgTWFpbkNvbXBvbmVudCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gTWFpbkNvbXBvbmVudCgpIHtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbGxlciA9IGNvbnRyb2xsZXJzXzEuQ29udHJvbGxlck0uTWFpbkN0cmw7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xsZXJBcyA9IFwiJGN0cmxcIjtcbiAgICAgICAgICAgIHRoaXMudGVtcGxhdGUgPSByZXF1aXJlKFwiLi4vcHVibGljL3BhcnRpYWxzL21haW5Db21wb25lbnQuaHRtbFwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gTWFpbkNvbXBvbmVudDtcbiAgICB9KCkpO1xuICAgIENvbXBvbmVudHNNLk1haW5Db21wb25lbnQgPSBNYWluQ29tcG9uZW50O1xuICAgIHZhciBTaW5nbGVQb3N0Q29tcG9uZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBTaW5nbGVQb3N0Q29tcG9uZW50KCkge1xuICAgICAgICAgICAgdGhpcy5jb250cm9sbGVyID0gY29udHJvbGxlcnNfMS5Db250cm9sbGVyTS5TaW5nbGVQb3N0Q3RybDtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbGxlckFzID0gXCIkY3RybFwiO1xuICAgICAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IHJlcXVpcmUoXCIuLi9wdWJsaWMvcGFydGlhbHMvc2luZ2xlUG9zdC5odG1sXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBTaW5nbGVQb3N0Q29tcG9uZW50O1xuICAgIH0oKSk7XG4gICAgQ29tcG9uZW50c00uU2luZ2xlUG9zdENvbXBvbmVudCA9IFNpbmdsZVBvc3RDb21wb25lbnQ7XG4gICAgdmFyIEZvcm1Db21wb25lbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIEZvcm1Db21wb25lbnQoKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBjb250cm9sbGVyc18xLkNvbnRyb2xsZXJNLlBvc3RGb3JtQ3RybDtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbGxlckFzID0gXCIkY3RybFwiO1xuICAgICAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IHJlcXVpcmUoXCIuLi9wdWJsaWMvcGFydGlhbHMvbmV3UG9zdEZvcm0uaHRtbFwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gRm9ybUNvbXBvbmVudDtcbiAgICB9KCkpO1xuICAgIENvbXBvbmVudHNNLkZvcm1Db21wb25lbnQgPSBGb3JtQ29tcG9uZW50O1xufSkoQ29tcG9uZW50c00gPSBleHBvcnRzLkNvbXBvbmVudHNNIHx8IChleHBvcnRzLkNvbXBvbmVudHNNID0ge30pKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY29tcG9uZW50cy5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9ub2RlX21vZHVsZXMvQHR5cGVzL2FuZ3VsYXItcmVzb3VyY2UvaW5kZXguZC50c1wiIC8+XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgQ29udHJvbGxlck07XG4oZnVuY3Rpb24gKENvbnRyb2xsZXJNKSB7XG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIC8vIE1BSU4gQ09OVFJPTExFUiBcbiAgICAvLy8vLy8vLy8vLy8vLy9cbiAgICB2YXIgTWFpbkN0cmwgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIE1haW5DdHJsKCRodHRwLCBkYXRhQWNjZXNzU2VydmljZSwgJHNjb3BlKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy4kaHR0cCA9ICRodHRwO1xuICAgICAgICAgICAgdGhpcy5kYXRhQWNjZXNzU2VydmljZSA9IGRhdGFBY2Nlc3NTZXJ2aWNlO1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgICAgICB0aGlzLiRzY29wZS4kb24oXCJQT1NUX1NVQk1JVFRFRFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuZ2V0UG9zdExpc3QoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIE1haW5DdHJsLnByb3RvdHlwZS4kb25Jbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJpbml0XCIpO1xuICAgICAgICAgICAgdGhpcy5nZXRQb3N0TGlzdCgpO1xuICAgICAgICB9O1xuICAgICAgICBNYWluQ3RybC5wcm90b3R5cGUuZ2V0UG9zdExpc3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5kYXRhQWNjZXNzU2VydmljZVxuICAgICAgICAgICAgICAgIC5nZXRQb3N0c1Jlc291cmNlKClcbiAgICAgICAgICAgICAgICAucXVlcnkoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICB2YXIgZm9ybWF0dGVkRGF0YSA9IGRhdGEubWFwKGZ1bmN0aW9uIChwb3N0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwb3N0LnRhZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc3QudGFncyA9IHBvc3QudGFncy5zcGxpdCgnICcpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwb3N0O1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGZvcm1hdHRlZERhdGEpO1xuICAgICAgICAgICAgICAgIF90aGlzLiRzY29wZS5wb3N0cyA9IGZvcm1hdHRlZERhdGE7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgTWFpbkN0cmwuaW5qZWN0ID0gW1wiZGF0YUFjY2Vzc1NlcnZpY2VcIiwgXCIkc2NvcGVcIl07XG4gICAgICAgIHJldHVybiBNYWluQ3RybDtcbiAgICB9KCkpO1xuICAgIENvbnRyb2xsZXJNLk1haW5DdHJsID0gTWFpbkN0cmw7XG4gICAgdmFyIFNpbmdsZVBvc3RDdHJsID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBTaW5nbGVQb3N0Q3RybCgkaHR0cCwgZGF0YUFjY2Vzc1NlcnZpY2UsICRzY29wZSwgJGxvY2F0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLiRodHRwID0gJGh0dHA7XG4gICAgICAgICAgICB0aGlzLmRhdGFBY2Nlc3NTZXJ2aWNlID0gZGF0YUFjY2Vzc1NlcnZpY2U7XG4gICAgICAgICAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcbiAgICAgICAgICAgIHRoaXMuJGxvY2F0aW9uID0gJGxvY2F0aW9uO1xuICAgICAgICB9XG4gICAgICAgIFNpbmdsZVBvc3RDdHJsLnByb3RvdHlwZS4kb25Jbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy4kbG9jYXRpb24ucGF0aCgpLnNwbGl0KCcvJylbMl0pO1xuICAgICAgICAgICAgdGhpcy5nZXRTaW5nbGVQb3N0KHRoaXMuJGxvY2F0aW9uLnBhdGgoKS5zcGxpdCgnLycpWzJdKTtcbiAgICAgICAgfTtcbiAgICAgICAgU2luZ2xlUG9zdEN0cmwucHJvdG90eXBlLmdldFNpbmdsZVBvc3QgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLmRhdGFBY2Nlc3NTZXJ2aWNlXG4gICAgICAgICAgICAgICAgLmdldFNpbmdsZVBvc3RSZXNvdXJjZShpZClcbiAgICAgICAgICAgICAgICAucXVlcnkoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICB2YXIgcG9zdE9iaiA9IGRhdGFbMF07XG4gICAgICAgICAgICAgICAgcG9zdE9iai50YWdzID0gcG9zdE9iai50YWdzLnNwbGl0KCcgJyk7XG4gICAgICAgICAgICAgICAgX3RoaXMuJHNjb3BlLnBvc3QgPSBwb3N0T2JqO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIFNpbmdsZVBvc3RDdHJsLmluamVjdCA9IFtcImRhdGFBY2Nlc3NTZXJ2aWNlXCIsIFwiJHNjb3BlXCIsIFwiJGxvY2F0aW9uXCJdO1xuICAgICAgICByZXR1cm4gU2luZ2xlUG9zdEN0cmw7XG4gICAgfSgpKTtcbiAgICBDb250cm9sbGVyTS5TaW5nbGVQb3N0Q3RybCA9IFNpbmdsZVBvc3RDdHJsO1xuICAgIHZhciBQb3N0Rm9ybUN0cmwgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIFBvc3RGb3JtQ3RybCgkc2NvcGUsIGRhdGFBY2Nlc3NTZXJ2aWNlLCAkaHR0cCwgJHJvb3RTY29wZSwgJGxvY2F0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcbiAgICAgICAgICAgIHRoaXMuZGF0YUFjY2Vzc1NlcnZpY2UgPSBkYXRhQWNjZXNzU2VydmljZTtcbiAgICAgICAgICAgIHRoaXMuJGh0dHAgPSAkaHR0cDtcbiAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZSA9ICRyb290U2NvcGU7XG4gICAgICAgICAgICB0aGlzLiRsb2NhdGlvbiA9ICRsb2NhdGlvbjtcbiAgICAgICAgICAgIHRoaXMuZGF0YUFjY2Vzc1NlcnZpY2UgPSBkYXRhQWNjZXNzU2VydmljZTtcbiAgICAgICAgfVxuICAgICAgICBQb3N0Rm9ybUN0cmwucHJvdG90eXBlLnN1Ym1pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBuZXdQb3N0T2JqZWN0ID0ge1xuICAgICAgICAgICAgICAgIHRpdGxlOiB0aGlzLiRzY29wZS50aXRsZSxcbiAgICAgICAgICAgICAgICBzdWJ0aXRsZTogdGhpcy4kc2NvcGUuc3VidGl0bGUsXG4gICAgICAgICAgICAgICAgY29udGVudDogdGhpcy4kc2NvcGUuY29udGVudCxcbiAgICAgICAgICAgICAgICB0YWdzOiB0aGlzLiRzY29wZS50YWdzXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5zZW5kTmV3UG9zdChuZXdQb3N0T2JqZWN0KTtcbiAgICAgICAgfTtcbiAgICAgICAgUG9zdEZvcm1DdHJsLnByb3RvdHlwZS5zZW5kTmV3UG9zdCA9IGZ1bmN0aW9uIChwb3N0T2JqKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy4kaHR0cCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICB1cmw6IFwiaHR0cDovL2xvY2FsaG9zdDozMDAwL3Bvc3RzXCIsXG4gICAgICAgICAgICAgICAgZGF0YTogcG9zdE9iaixcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gX3RoaXMuaGFuZGxlTmV3UG9zdFJlc3BvbnNlKHJlcyk7IH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHsgcmV0dXJuIGNvbnNvbGUubG9nKGVycik7IH0pO1xuICAgICAgICB9O1xuICAgICAgICBQb3N0Rm9ybUN0cmwucHJvdG90eXBlLmhhbmRsZU5ld1Bvc3RSZXNwb25zZSA9IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibmV3IFBvc3QgSGFuZGxlclwiKTtcbiAgICAgICAgICAgIHRoaXMuJHJvb3RTY29wZS4kYnJvYWRjYXN0KFwiUE9TVF9TVUJNSVRURURcIik7XG4gICAgICAgICAgICB0aGlzLiRsb2NhdGlvbi5wYXRoKFwiL1wiKTtcbiAgICAgICAgfTtcbiAgICAgICAgUG9zdEZvcm1DdHJsLiRpbmplY3QgPSBbXCIkc2NvcGVcIiwgXCJkYXRhQWNjZXNzU2VydmljZVwiLCBcIiRodHRwXCIsIFwiJHJvb3RTY29wZVwiLCBcIiRsb2NhdGlvblwiXTtcbiAgICAgICAgcmV0dXJuIFBvc3RGb3JtQ3RybDtcbiAgICB9KCkpO1xuICAgIENvbnRyb2xsZXJNLlBvc3RGb3JtQ3RybCA9IFBvc3RGb3JtQ3RybDtcbiAgICB2YXIgTmF2Q3RybCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gTmF2Q3RybCgpIHtcbiAgICAgICAgfVxuICAgICAgICBOYXZDdHJsLnByb3RvdHlwZS4kb25Jbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gTmF2Q3RybDtcbiAgICB9KCkpO1xuICAgIENvbnRyb2xsZXJNLk5hdkN0cmwgPSBOYXZDdHJsO1xufSkoQ29udHJvbGxlck0gPSBleHBvcnRzLkNvbnRyb2xsZXJNIHx8IChleHBvcnRzLkNvbnRyb2xsZXJNID0ge30pKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY29udHJvbGxlcnMuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgY2xhc3M9XFxcIm5hdmJhci1maXhlZFxcXCI+XFxuICA8bmF2PlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJuYXYtd3JhcHBlciBibHVlIGRhcmtlbi0zXFxcIj5cXG4gICAgICA8YSBocmVmPVxcXCIjXFxcIiBjbGFzcz1cXFwiYnJhbmQtbG9nb1xcXCI+VG90YWxseTwvYT5cXG4gICAgICA8dWwgaWQ9XFxcIm5hdi1tb2JpbGVcXFwiIGNsYXNzPVxcXCJyaWdodCBoaWRlLW9uLW1lZC1hbmQtZG93blxcXCI+XFxuICAgICAgICA8bGk+PGEgaHJlZj1cXFwiL1xcXCI+SG9tZTwvYT48L2xpPlxcbiAgICAgICAgPGxpPjxhIGhyZWY9XFxcIi8jIS9jcmVhdGVcXFwiPlBvc3Q8L2E+PC9saT5cXG4gICAgICA8L3VsPlxcbiAgICA8L2Rpdj5cXG4gIDwvbmF2PlxcbjwvZGl2PlxcblwiO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL3B1YmxpYy9wYXJ0aWFscy9uYXZCYXIuaHRtbFxuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBjbGFzcz1cXFwicm93XFxcIiA+XFxuICAgIDxkaXYgY2xhc3M9XFxcImNvbCBzOSBtOVxcXCIgbmctcmVwZWF0PVxcXCJwb3N0IGluICRjdHJsLiRzY29wZS5wb3N0cyB0cmFjayBieSAkaW5kZXhcXFwiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiY2FyZCBibHVlIGRhcmtlbi0zXFxcIj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjYXJkLWNvbnRlbnRcXFwiPlxcbiAgICAgICAgICAgICAgICA8aDIgY2xhc3M9XFxcIndoaXRlLXRleHRcXFwiPjxhIGhyZWY9XFxcIi8jIS9wb3N0cy97e3Bvc3QucG9zdF9pZH19XFxcIj57e3Bvc3QudGl0bGV9fTwvYT48L2gyPlxcbiAgICAgICAgICAgICAgICA8aDUgY2xhc3M9XFxcImJsdWUtdGV4dCB0ZXh0LWxpZ2h0ZW4tM1xcXCI+e3twb3N0LnN1YnRpdGxlfX08L2g1PlxcbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cXFwiYmx1ZS10ZXh0IHRleHQtbGlnaHRlbi01XFxcIj57e3Bvc3QuY29udGVudCB8IGxpbWl0VG86IDMwMH19Li4uPC9wPlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICA8ZGl2IG5nLWlmPVxcXCJwb3N0LnRhZ3NcXFwiIGNsYXNzPVxcXCJjYXJkLWFjdGlvblxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwiYmx1ZS10ZXh0IHRleHQtbGlnaHRlbi0yXFxcIj5UYWdzPC9zcGFuPlxcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gbmctcmVwZWF0PVxcXCJ0YWcgaW4gcG9zdC50YWdzXFxcIiBjbGFzcz1cXFwiY2hpcCBibHVlLXRleHQgdGV4dC1kYXJrZW4tMVxcXCI+e3t0YWd9fTwvc3Bhbj5cXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuPC9kaXY+XCI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vcHVibGljL3BhcnRpYWxzL21haW5Db21wb25lbnQuaHRtbFxuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPCEtLSBNb2RhbCBTdHJ1Y3R1cmUgLS0+XFxuPGZvcm0gbmFtZT1cXFwiJGN0cmwucG9zdEZvcm1cXFwiIG5nLXN1Ym1pdD1cXFwiJGN0cmwuc3VibWl0KClcXFwiPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJpbnB1dC1maWVsZCBjb2wgczZcXFwiPlxcbiAgICAgICAgPGlucHV0IGlkPVxcXCJ0aXRsZVxcXCIgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcInZhbGlkYXRlIHdoaXRlLXRleHRcXFwiIG5nLW1vZGVsPVxcXCJ0aXRsZVxcXCI+XFxuICAgICAgICA8bGFiZWwgZm9yPVxcXCJ0aXRsZVxcXCI+VGl0bGU8L2xhYmVsPlxcbiAgICA8L2Rpdj5cXG4gICAgPGRpdiBjbGFzcz1cXFwiaW5wdXQtZmllbGQgY29sIHM2XFxcIj5cXG4gICAgICAgIDxpbnB1dCBpZD1cXFwic3VidGl0bGVcXFwiIHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJ2YWxpZGF0ZSB3aGl0ZS10ZXh0XFxcIiBuZy1tb2RlbD1cXFwic3VidGl0bGVcXFwiPlxcbiAgICAgICAgPGxhYmVsIGZvcj1cXFwic3VidGl0bGVcXFwiPlN1YnRpdGxlPC9sYWJlbD5cXG4gICAgPC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XFxcImlucHV0LWZpZWxkIGNvbCBzNlxcXCI+XFxuICAgICAgICA8dGV4dGFyZWEgaWQ9XFxcImNvbnRlbnRcXFwiIHR5cGU9XFxcInRleHRhcmVhXFxcIiBjbGFzcz1cXFwidmFsaWRhdGUgd2hpdGUtdGV4dCBtYXRlcmlhbGl6ZS10ZXh0YXJlYVxcXCIgbmctbW9kZWw9XFxcImNvbnRlbnRcXFwiPjwvdGV4dGFyZWE+XFxuICAgICAgICA8bGFiZWwgZm9yPVxcXCJjb250ZW50XFxcIj5Db250ZW50PC9sYWJlbD5cXG4gICAgPC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XFxcImlucHV0LWZpZWxkIGNvbCBzNlxcXCI+XFxuICAgICAgICA8dGV4dGFyZWEgaWQ9XFxcInRhZ3NcXFwiIHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJ2YWxpZGF0ZSB3aGl0ZS10ZXh0IG1hdGVyaWFsaXplLXRleHRhcmVhXFxcIiBuZy1tb2RlbD1cXFwidGFnc1xcXCI+PC90ZXh0YXJlYT5cXG4gICAgICAgIDxsYWJlbCBmb3I9XFxcInRhZ3NcXFwiPlRhZ3M8L2xhYmVsPlxcbiAgICA8L2Rpdj5cXG5cXG4gICAgPGJ1dHRvbiBjbGFzcz1cXFwid2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0IGJ0biBibHVlIGRhcmtlbi0zXFxcIiB0eXBlPVxcXCJzdWJtaXRcXFwiPlN1Ym1pdDwvYnV0dG9uPlxcbjwvZm9ybT5cXG5cIjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9wdWJsaWMvcGFydGlhbHMvbmV3UG9zdEZvcm0uaHRtbFxuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi9ub2RlX21vZHVsZXMvQHR5cGVzL2FuZ3VsYXItcmVzb3VyY2UvaW5kZXguZC50c1wiIC8+XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgU2VydmljZXNNO1xuKGZ1bmN0aW9uIChTZXJ2aWNlc00pIHtcbiAgICB2YXIgRGF0YUFjY2Vzc1NlcnZpY2UgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIERhdGFBY2Nlc3NTZXJ2aWNlKCRyZXNvdXJjZSkge1xuICAgICAgICAgICAgdGhpcy4kcmVzb3VyY2UgPSAkcmVzb3VyY2U7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVGhlIGFjdHVhbCBzZXJ2aWNlLiBSZXNvdXJjZSBDbGFzcyBpcyBhIGdlbmVyaWMgaW50ZXJmYWNlLiBBcHBseWluZyBvdXIgY3VzdG9tIElVc2VyUmVzb3VyY2UgaW50ZXJmYWNlIHRvIGl0XG4gICAgICAgIC8vIHdpbGwgcmVxdWlyZSBvdXIgY3VzdG9tIHR5cGUgdG8gYmUgcmV0dXJuZWQgZnJvbSB0aGUgYWpheCByZXF1ZXN0XG4gICAgICAgIERhdGFBY2Nlc3NTZXJ2aWNlLnByb3RvdHlwZS5nZXRQb3N0c1Jlc291cmNlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHJlc291cmNlKFwiaHR0cDovL2xvY2FsaG9zdDozMDAwL3Bvc3RzXCIsIG51bGwsIHtcbiAgICAgICAgICAgICAgICBxdWVyeToge1xuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgICAgICAgICBpc0FycmF5OiB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIERhdGFBY2Nlc3NTZXJ2aWNlLnByb3RvdHlwZS5nZXRTaW5nbGVQb3N0UmVzb3VyY2UgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRyZXNvdXJjZShcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9wb3N0Lzpwb3N0X2lkXCIsIHsgcG9zdF9pZDogaWQgfSwge1xuICAgICAgICAgICAgICAgIGdldDoge1xuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgICAgICAgICAgICBpc0FycmF5OiBmYWxzZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICAvLyBTdGF0aWMgaW5qZWN0aW9uIG1ha2VzICRyZXNvdXJjZSBhdmFpbGFibGUgb24gdGhlIGNsYXNzLCBpbnN0ZWFkIG9mIG9ubHkgb24gdGhlIGluc3RhbmNlXG4gICAgICAgIERhdGFBY2Nlc3NTZXJ2aWNlLiRpbmplY3QgPSBbXCIkcmVzb3VyY2VcIl07XG4gICAgICAgIHJldHVybiBEYXRhQWNjZXNzU2VydmljZTtcbiAgICB9KCkpO1xuICAgIFNlcnZpY2VzTS5EYXRhQWNjZXNzU2VydmljZSA9IERhdGFBY2Nlc3NTZXJ2aWNlO1xufSkoU2VydmljZXNNID0gZXhwb3J0cy5TZXJ2aWNlc00gfHwgKGV4cG9ydHMuU2VydmljZXNNID0ge30pKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc2VydmljZXMuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgY2xhc3M9XFxcImNvbCBzOSBtOVxcXCI+XFxuICAgIDxkaXYgY2xhc3M9XFxcImNhcmQgYmx1ZSBkYXJrZW4tM1xcXCI+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjYXJkLWNvbnRlbnRcXFwiPlxcbiAgICAgICAgICAgIDxoMiBjbGFzcz1cXFwid2hpdGUtdGV4dFxcXCI+e3skY3RybC4kc2NvcGUucG9zdC50aXRsZX19PC9oMj5cXG4gICAgICAgICAgICA8aDUgY2xhc3M9XFxcImJsdWUtdGV4dCB0ZXh0LWxpZ2h0ZW4tM1xcXCI+e3skY3RybC4kc2NvcGUucG9zdC5zdWJ0aXRsZX19PC9oNT5cXG4gICAgICAgICAgICA8cCBjbGFzcz1cXFwiYmx1ZS10ZXh0IHRleHQtbGlnaHRlbi01XFxcIj57eyRjdHJsLiRzY29wZS5wb3N0LmNvbnRlbnR9fTwvcD5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPGRpdiBuZy1pZj1cXFwiJGN0cmwuJHNjb3BlLnBvc3QudGFnc1xcXCIgY2xhc3M9XFxcImNhcmQtYWN0aW9uXFxcIj5cXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cXFwiYmx1ZS10ZXh0IHRleHQtbGlnaHRlbi0yXFxcIj5UYWdzPC9zcGFuPlxcbiAgICAgICAgICAgIDxzcGFuIG5nLXJlcGVhdD1cXFwidGFnIGluICRjdHJsLiRzY29wZS5wb3N0LnRhZ3NcXFwiIGNsYXNzPVxcXCJjaGlwIGJsdWUtdGV4dCB0ZXh0LWRhcmtlbi0xXFxcIj57e3RhZ319PC9zcGFuPlxcbiAgICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcbjwvZGl2PlwiO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL3B1YmxpYy9wYXJ0aWFscy9zaW5nbGVQb3N0Lmh0bWxcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==