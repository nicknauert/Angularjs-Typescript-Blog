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

module.exports = "<div class=\"row\" >\n    <div class=\"col s9 m9\" ng-repeat=\"post in $ctrl.$scope.posts track by $index\">\n        <div class=\"card blue darken-3\">\n            <div class=\"card-content\">\n                <h2 class=\"white-text\"><a href=\"/#!/posts/{{post.post_id}}\">{{post.title}}</a></h2>\n                <h5 class=\"blue-text text-lighten-3\">{{post.subtitle}}</h5>\n                <p class=\"blue-text text-lighten-5\">{{post.content}}</p>\n            </div>\n                <div ng-if=\"post.tags\" class=\"card-action\">\n                    <span class=\"blue-text text-lighten-2\">Tags</span>\n                    <span ng-repeat=\"tag in post.tags\" class=\"chip blue-text text-darken-1\">{{tag}}</span>\n                </div>\n        </div>\n    </div>\n</div>";

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
            return this.$resource("http://localhost:3000/posts/:post_id", { post_id: id }, {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMmZmOGU2MTBmMTYzOTg3NzEzNzAiLCJ3ZWJwYWNrOi8vLy4vYXBwLnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMuanMiLCJ3ZWJwYWNrOi8vLy4vY29udHJvbGxlcnMuanMiLCJ3ZWJwYWNrOi8vLy4uL3B1YmxpYy9wYXJ0aWFscy9uYXZCYXIuaHRtbCIsIndlYnBhY2s6Ly8vLi4vcHVibGljL3BhcnRpYWxzL21haW5Db21wb25lbnQuaHRtbCIsIndlYnBhY2s6Ly8vLi4vcHVibGljL3BhcnRpYWxzL25ld1Bvc3RGb3JtLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc2VydmljZXMuanMiLCJ3ZWJwYWNrOi8vLy4uL3B1YmxpYy9wYXJ0aWFscy9zaW5nbGVQb3N0Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7OztBQzdEQTtBQUNBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLENBQUMsa0JBQWtCO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsOEJBQThCOzs7Ozs7OztBQ3BEL0I7QUFDQTtBQUNBLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsQ0FBQyxnRUFBZ0U7Ozs7Ozs7O0FDMUNqRTtBQUNBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLHNDQUFzQyx5Q0FBeUMsRUFBRTtBQUNqRix1Q0FBdUMseUJBQXlCLEVBQUU7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLENBQUMsZ0VBQWdFOzs7Ozs7O0FDbEhqRSx5Vzs7Ozs7O0FDQUEscVJBQXFSLGNBQWMsS0FBSyxZQUFZLG9FQUFvRSxlQUFlLCtEQUErRCxjQUFjLHVRQUF1USxLQUFLLHFFOzs7Ozs7QUNBaHVCLHNpQzs7Ozs7OztBQ0FBO0FBQ0E7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSwyRUFBMkUsY0FBYztBQUN6RjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLENBQUMsMERBQTBEOzs7Ozs7O0FDaEMzRCxrS0FBa0sseUJBQXlCLDREQUE0RCw0QkFBNEIsMkRBQTJELDJCQUEyQixxUUFBcVEsS0FBSyw2QyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvcHVibGljL2Fzc2V0cy9qc1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDJmZjhlNjEwZjE2Mzk4NzcxMzcwIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9fZml4LmQudHNcIiAvPlxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGNvbXBvbmVudHNfMSA9IHJlcXVpcmUoXCIuL2NvbXBvbmVudHNcIik7XG52YXIgc2VydmljZXNfMSA9IHJlcXVpcmUoXCIuL3NlcnZpY2VzXCIpO1xudmFyIGFwcDtcbihmdW5jdGlvbiAoYXBwKSB7XG4gICAgdmFyIE1vZHVsZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gTW9kdWxlKG5hbWUsIG1vZHVsZXMpIHtcbiAgICAgICAgICAgIHRoaXMuYXBwID0gYW5ndWxhci5tb2R1bGUobmFtZSwgbW9kdWxlcyk7XG4gICAgICAgIH1cbiAgICAgICAgTW9kdWxlLnByb3RvdHlwZS5hZGRDb250cm9sbGVyID0gZnVuY3Rpb24gKG5hbWUsIGNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgIHRoaXMuYXBwLmNvbnRyb2xsZXIobmFtZSwgY29udHJvbGxlcik7XG4gICAgICAgIH07XG4gICAgICAgIE1vZHVsZS5wcm90b3R5cGUuYWRkU2VydmljZSA9IGZ1bmN0aW9uIChuYW1lLCBzZXJ2aWNlRnVuYykge1xuICAgICAgICAgICAgdGhpcy5hcHAuc2VydmljZShuYW1lLCBzZXJ2aWNlRnVuYyk7XG4gICAgICAgIH07XG4gICAgICAgIE1vZHVsZS5wcm90b3R5cGUuYWRkQ29tcG9uZW50ID0gZnVuY3Rpb24gKG5hbWUsIGNvbXBvbmVudCkge1xuICAgICAgICAgICAgdGhpcy5hcHAuY29tcG9uZW50KG5hbWUsIGNvbXBvbmVudCk7XG4gICAgICAgIH07XG4gICAgICAgIE1vZHVsZS5wcm90b3R5cGUuY29uZmlnID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5hcHAuY29uZmlnKFtcIiRodHRwUHJvdmlkZXJcIiwgXCIkcVByb3ZpZGVyXCIsIFwiJHJvdXRlUHJvdmlkZXJcIiwgZnVuY3Rpb24gKCRodHRwUHJvdmlkZXIsICRxUHJvdmlkZXIsICRyb3V0ZVByb3ZpZGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICRodHRwUHJvdmlkZXIuZGVmYXVsdHMudXNlWERvbWFpbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSAkaHR0cFByb3ZpZGVyLmRlZmF1bHRzLmhlYWRlcnMuY29tbW9uWydYLVJlcXVlc3RlZC1XaXRoJ107XG4gICAgICAgICAgICAgICAgICAgICRxUHJvdmlkZXIuZXJyb3JPblVuaGFuZGxlZFJlamVjdGlvbnMoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAvLyBST1VUSU5HXG4gICAgICAgICAgICAgICAgICAgICRyb3V0ZVByb3ZpZGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAud2hlbignLycsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcIi4vdmlld3MvcG9zdF92aWV3Lmh0bWxcIlxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLndoZW4oJy9wb3N0cy86cG9zdF9pZCcsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnLi92aWV3cy9zaW5nbGVfcG9zdF92aWV3Lmh0bWwnXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAud2hlbignL2NyZWF0ZScsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBcIi4vdmlld3MvbmV3X3Bvc3Rfdmlldy5odG1sXCJcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfV0pO1xuICAgICAgICB9O1xuICAgICAgICBNb2R1bGUuJGluamVjdCA9IFtcIm5nUmVzb3VyY2VcIiwgXCJuZ1JvdXRlXCJdO1xuICAgICAgICByZXR1cm4gTW9kdWxlO1xuICAgIH0oKSk7XG4gICAgYXBwLk1vZHVsZSA9IE1vZHVsZTtcbn0pKGFwcCB8fCAoYXBwID0ge30pKTtcbnZhciBNeVRlc3RBcHA7XG4oZnVuY3Rpb24gKE15VGVzdEFwcCkge1xuICAgIHZhciBteUFwcCA9IG5ldyBhcHAuTW9kdWxlKCdteUFwcCcsIFtcIm5nUmVzb3VyY2VcIiwgXCJuZ1JvdXRlXCJdKTtcbiAgICBteUFwcC5jb25maWcoKTtcbiAgICBteUFwcC5hZGRDb21wb25lbnQoJ25hdkJhcicsIG5ldyBjb21wb25lbnRzXzEuQ29tcG9uZW50c00uTmF2Q29tcG9uZW50KCkpO1xuICAgIG15QXBwLmFkZENvbXBvbmVudCgnbWFpbkNvbXBvbmVudCcsIG5ldyBjb21wb25lbnRzXzEuQ29tcG9uZW50c00uTWFpbkNvbXBvbmVudCgpKTtcbiAgICBteUFwcC5hZGRDb21wb25lbnQoJ25ld1Bvc3RGb3JtJywgbmV3IGNvbXBvbmVudHNfMS5Db21wb25lbnRzTS5Gb3JtQ29tcG9uZW50KCkpO1xuICAgIG15QXBwLmFkZENvbXBvbmVudCgnc2luZ2xlUG9zdCcsIG5ldyBjb21wb25lbnRzXzEuQ29tcG9uZW50c00uU2luZ2xlUG9zdENvbXBvbmVudCgpKTtcbiAgICBteUFwcC5hZGRTZXJ2aWNlKFwiZGF0YUFjY2Vzc1NlcnZpY2VcIiwgc2VydmljZXNfMS5TZXJ2aWNlc00uRGF0YUFjY2Vzc1NlcnZpY2UpO1xufSkoTXlUZXN0QXBwIHx8IChNeVRlc3RBcHAgPSB7fSkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAudHNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9fZml4LmQudHNcIiAvPlxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGNvbnRyb2xsZXJzXzEgPSByZXF1aXJlKFwiLi9jb250cm9sbGVyc1wiKTtcbnZhciBDb21wb25lbnRzTTtcbihmdW5jdGlvbiAoQ29tcG9uZW50c00pIHtcbiAgICB2YXIgTmF2Q29tcG9uZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBOYXZDb21wb25lbnQoKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBjb250cm9sbGVyc18xLkNvbnRyb2xsZXJNLk5hdkN0cmw7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xsZXJBcyA9IFwiJGN0cmxcIjtcbiAgICAgICAgICAgIHRoaXMudGVtcGxhdGUgPSByZXF1aXJlKFwiLi4vcHVibGljL3BhcnRpYWxzL25hdkJhci5odG1sXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBOYXZDb21wb25lbnQ7XG4gICAgfSgpKTtcbiAgICBDb21wb25lbnRzTS5OYXZDb21wb25lbnQgPSBOYXZDb21wb25lbnQ7XG4gICAgdmFyIE1haW5Db21wb25lbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIE1haW5Db21wb25lbnQoKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBjb250cm9sbGVyc18xLkNvbnRyb2xsZXJNLk1haW5DdHJsO1xuICAgICAgICAgICAgdGhpcy5jb250cm9sbGVyQXMgPSBcIiRjdHJsXCI7XG4gICAgICAgICAgICB0aGlzLnRlbXBsYXRlID0gcmVxdWlyZShcIi4uL3B1YmxpYy9wYXJ0aWFscy9tYWluQ29tcG9uZW50Lmh0bWxcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIE1haW5Db21wb25lbnQ7XG4gICAgfSgpKTtcbiAgICBDb21wb25lbnRzTS5NYWluQ29tcG9uZW50ID0gTWFpbkNvbXBvbmVudDtcbiAgICB2YXIgU2luZ2xlUG9zdENvbXBvbmVudCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gU2luZ2xlUG9zdENvbXBvbmVudCgpIHtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbGxlciA9IGNvbnRyb2xsZXJzXzEuQ29udHJvbGxlck0uU2luZ2xlUG9zdEN0cmw7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xsZXJBcyA9IFwiJGN0cmxcIjtcbiAgICAgICAgICAgIHRoaXMudGVtcGxhdGUgPSByZXF1aXJlKFwiLi4vcHVibGljL3BhcnRpYWxzL3NpbmdsZVBvc3QuaHRtbFwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gU2luZ2xlUG9zdENvbXBvbmVudDtcbiAgICB9KCkpO1xuICAgIENvbXBvbmVudHNNLlNpbmdsZVBvc3RDb21wb25lbnQgPSBTaW5nbGVQb3N0Q29tcG9uZW50O1xuICAgIHZhciBGb3JtQ29tcG9uZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBGb3JtQ29tcG9uZW50KCkge1xuICAgICAgICAgICAgdGhpcy5jb250cm9sbGVyID0gY29udHJvbGxlcnNfMS5Db250cm9sbGVyTS5Qb3N0Rm9ybUN0cmw7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xsZXJBcyA9IFwiJGN0cmxcIjtcbiAgICAgICAgICAgIHRoaXMudGVtcGxhdGUgPSByZXF1aXJlKFwiLi4vcHVibGljL3BhcnRpYWxzL25ld1Bvc3RGb3JtLmh0bWxcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEZvcm1Db21wb25lbnQ7XG4gICAgfSgpKTtcbiAgICBDb21wb25lbnRzTS5Gb3JtQ29tcG9uZW50ID0gRm9ybUNvbXBvbmVudDtcbn0pKENvbXBvbmVudHNNID0gZXhwb3J0cy5Db21wb25lbnRzTSB8fCAoZXhwb3J0cy5Db21wb25lbnRzTSA9IHt9KSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2NvbXBvbmVudHMuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vbm9kZV9tb2R1bGVzL0B0eXBlcy9hbmd1bGFyLXJlc291cmNlL2luZGV4LmQudHNcIiAvPlxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIENvbnRyb2xsZXJNO1xuKGZ1bmN0aW9uIChDb250cm9sbGVyTSkge1xuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICAvLyBNQUlOIENPTlRST0xMRVIgXG4gICAgLy8vLy8vLy8vLy8vLy8vXG4gICAgdmFyIE1haW5DdHJsID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBNYWluQ3RybCgkaHR0cCwgZGF0YUFjY2Vzc1NlcnZpY2UsICRzY29wZSkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMuJGh0dHAgPSAkaHR0cDtcbiAgICAgICAgICAgIHRoaXMuZGF0YUFjY2Vzc1NlcnZpY2UgPSBkYXRhQWNjZXNzU2VydmljZTtcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUuJG9uKFwiUE9TVF9TVUJNSVRURURcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLmdldFBvc3RMaXN0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBNYWluQ3RybC5wcm90b3R5cGUuJG9uSW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaW5pdFwiKTtcbiAgICAgICAgICAgIHRoaXMuZ2V0UG9zdExpc3QoKTtcbiAgICAgICAgfTtcbiAgICAgICAgTWFpbkN0cmwucHJvdG90eXBlLmdldFBvc3RMaXN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMuZGF0YUFjY2Vzc1NlcnZpY2VcbiAgICAgICAgICAgICAgICAuZ2V0UG9zdHNSZXNvdXJjZSgpXG4gICAgICAgICAgICAgICAgLnF1ZXJ5KGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZvcm1hdHRlZERhdGEgPSBkYXRhLm1hcChmdW5jdGlvbiAocG9zdCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocG9zdC50YWdzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb3N0LnRhZ3MgPSBwb3N0LnRhZ3Muc3BsaXQoJyAnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcG9zdDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhmb3JtYXR0ZWREYXRhKTtcbiAgICAgICAgICAgICAgICBfdGhpcy4kc2NvcGUucG9zdHMgPSBmb3JtYXR0ZWREYXRhO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIE1haW5DdHJsLmluamVjdCA9IFtcImRhdGFBY2Nlc3NTZXJ2aWNlXCIsIFwiJHNjb3BlXCJdO1xuICAgICAgICByZXR1cm4gTWFpbkN0cmw7XG4gICAgfSgpKTtcbiAgICBDb250cm9sbGVyTS5NYWluQ3RybCA9IE1haW5DdHJsO1xuICAgIHZhciBTaW5nbGVQb3N0Q3RybCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gU2luZ2xlUG9zdEN0cmwoJGh0dHAsIGRhdGFBY2Nlc3NTZXJ2aWNlLCAkc2NvcGUsICRsb2NhdGlvbikge1xuICAgICAgICAgICAgdGhpcy4kaHR0cCA9ICRodHRwO1xuICAgICAgICAgICAgdGhpcy5kYXRhQWNjZXNzU2VydmljZSA9IGRhdGFBY2Nlc3NTZXJ2aWNlO1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgICAgICB0aGlzLiRsb2NhdGlvbiA9ICRsb2NhdGlvbjtcbiAgICAgICAgfVxuICAgICAgICBTaW5nbGVQb3N0Q3RybC5wcm90b3R5cGUuJG9uSW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuJGxvY2F0aW9uLnBhdGgoKS5zcGxpdCgnLycpWzJdKTtcbiAgICAgICAgICAgIHRoaXMuZ2V0U2luZ2xlUG9zdCh0aGlzLiRsb2NhdGlvbi5wYXRoKCkuc3BsaXQoJy8nKVsyXSk7XG4gICAgICAgIH07XG4gICAgICAgIFNpbmdsZVBvc3RDdHJsLnByb3RvdHlwZS5nZXRTaW5nbGVQb3N0ID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5kYXRhQWNjZXNzU2VydmljZVxuICAgICAgICAgICAgICAgIC5nZXRTaW5nbGVQb3N0UmVzb3VyY2UoaWQpXG4gICAgICAgICAgICAgICAgLnF1ZXJ5KGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgdmFyIHBvc3RPYmogPSBkYXRhWzBdO1xuICAgICAgICAgICAgICAgIHBvc3RPYmoudGFncyA9IHBvc3RPYmoudGFncy5zcGxpdCgnICcpO1xuICAgICAgICAgICAgICAgIF90aGlzLiRzY29wZS5wb3N0ID0gcG9zdE9iajtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICBTaW5nbGVQb3N0Q3RybC5pbmplY3QgPSBbXCJkYXRhQWNjZXNzU2VydmljZVwiLCBcIiRzY29wZVwiLCBcIiRsb2NhdGlvblwiXTtcbiAgICAgICAgcmV0dXJuIFNpbmdsZVBvc3RDdHJsO1xuICAgIH0oKSk7XG4gICAgQ29udHJvbGxlck0uU2luZ2xlUG9zdEN0cmwgPSBTaW5nbGVQb3N0Q3RybDtcbiAgICB2YXIgUG9zdEZvcm1DdHJsID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBQb3N0Rm9ybUN0cmwoJHNjb3BlLCBkYXRhQWNjZXNzU2VydmljZSwgJGh0dHAsICRyb290U2NvcGUsICRsb2NhdGlvbikge1xuICAgICAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgICAgICB0aGlzLmRhdGFBY2Nlc3NTZXJ2aWNlID0gZGF0YUFjY2Vzc1NlcnZpY2U7XG4gICAgICAgICAgICB0aGlzLiRodHRwID0gJGh0dHA7XG4gICAgICAgICAgICB0aGlzLiRyb290U2NvcGUgPSAkcm9vdFNjb3BlO1xuICAgICAgICAgICAgdGhpcy4kbG9jYXRpb24gPSAkbG9jYXRpb247XG4gICAgICAgICAgICB0aGlzLmRhdGFBY2Nlc3NTZXJ2aWNlID0gZGF0YUFjY2Vzc1NlcnZpY2U7XG4gICAgICAgIH1cbiAgICAgICAgUG9zdEZvcm1DdHJsLnByb3RvdHlwZS5zdWJtaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgbmV3UG9zdE9iamVjdCA9IHtcbiAgICAgICAgICAgICAgICB0aXRsZTogdGhpcy4kc2NvcGUudGl0bGUsXG4gICAgICAgICAgICAgICAgc3VidGl0bGU6IHRoaXMuJHNjb3BlLnN1YnRpdGxlLFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHRoaXMuJHNjb3BlLmNvbnRlbnQsXG4gICAgICAgICAgICAgICAgdGFnczogdGhpcy4kc2NvcGUudGFnc1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuc2VuZE5ld1Bvc3QobmV3UG9zdE9iamVjdCk7XG4gICAgICAgIH07XG4gICAgICAgIFBvc3RGb3JtQ3RybC5wcm90b3R5cGUuc2VuZE5ld1Bvc3QgPSBmdW5jdGlvbiAocG9zdE9iaikge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMuJGh0dHAoe1xuICAgICAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgdXJsOiBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9wb3N0c1wiLFxuICAgICAgICAgICAgICAgIGRhdGE6IHBvc3RPYmosXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHsgcmV0dXJuIF90aGlzLmhhbmRsZU5ld1Bvc3RSZXNwb25zZShyZXMpOyB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7IHJldHVybiBjb25zb2xlLmxvZyhlcnIpOyB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgUG9zdEZvcm1DdHJsLnByb3RvdHlwZS5oYW5kbGVOZXdQb3N0UmVzcG9uc2UgPSBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5ldyBQb3N0IEhhbmRsZXJcIik7XG4gICAgICAgICAgICB0aGlzLiRyb290U2NvcGUuJGJyb2FkY2FzdChcIlBPU1RfU1VCTUlUVEVEXCIpO1xuICAgICAgICAgICAgdGhpcy4kbG9jYXRpb24ucGF0aChcIi9cIik7XG4gICAgICAgIH07XG4gICAgICAgIFBvc3RGb3JtQ3RybC4kaW5qZWN0ID0gW1wiJHNjb3BlXCIsIFwiZGF0YUFjY2Vzc1NlcnZpY2VcIiwgXCIkaHR0cFwiLCBcIiRyb290U2NvcGVcIiwgXCIkbG9jYXRpb25cIl07XG4gICAgICAgIHJldHVybiBQb3N0Rm9ybUN0cmw7XG4gICAgfSgpKTtcbiAgICBDb250cm9sbGVyTS5Qb3N0Rm9ybUN0cmwgPSBQb3N0Rm9ybUN0cmw7XG4gICAgdmFyIE5hdkN0cmwgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIE5hdkN0cmwoKSB7XG4gICAgICAgIH1cbiAgICAgICAgTmF2Q3RybC5wcm90b3R5cGUuJG9uSW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIE5hdkN0cmw7XG4gICAgfSgpKTtcbiAgICBDb250cm9sbGVyTS5OYXZDdHJsID0gTmF2Q3RybDtcbn0pKENvbnRyb2xsZXJNID0gZXhwb3J0cy5Db250cm9sbGVyTSB8fCAoZXhwb3J0cy5Db250cm9sbGVyTSA9IHt9KSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2NvbnRyb2xsZXJzLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGNsYXNzPVxcXCJuYXZiYXItZml4ZWRcXFwiPlxcbiAgPG5hdj5cXG4gICAgPGRpdiBjbGFzcz1cXFwibmF2LXdyYXBwZXIgYmx1ZSBkYXJrZW4tM1xcXCI+XFxuICAgICAgPGEgaHJlZj1cXFwiI1xcXCIgY2xhc3M9XFxcImJyYW5kLWxvZ29cXFwiPlRvdGFsbHk8L2E+XFxuICAgICAgPHVsIGlkPVxcXCJuYXYtbW9iaWxlXFxcIiBjbGFzcz1cXFwicmlnaHQgaGlkZS1vbi1tZWQtYW5kLWRvd25cXFwiPlxcbiAgICAgICAgPGxpPjxhIGhyZWY9XFxcIi9cXFwiPkhvbWU8L2E+PC9saT5cXG4gICAgICAgIDxsaT48YSBocmVmPVxcXCIvIyEvY3JlYXRlXFxcIj5Qb3N0PC9hPjwvbGk+XFxuICAgICAgPC91bD5cXG4gICAgPC9kaXY+XFxuICA8L25hdj5cXG48L2Rpdj5cXG5cIjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9wdWJsaWMvcGFydGlhbHMvbmF2QmFyLmh0bWxcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgY2xhc3M9XFxcInJvd1xcXCIgPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJjb2wgczkgbTlcXFwiIG5nLXJlcGVhdD1cXFwicG9zdCBpbiAkY3RybC4kc2NvcGUucG9zdHMgdHJhY2sgYnkgJGluZGV4XFxcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImNhcmQgYmx1ZSBkYXJrZW4tM1xcXCI+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiY2FyZC1jb250ZW50XFxcIj5cXG4gICAgICAgICAgICAgICAgPGgyIGNsYXNzPVxcXCJ3aGl0ZS10ZXh0XFxcIj48YSBocmVmPVxcXCIvIyEvcG9zdHMve3twb3N0LnBvc3RfaWR9fVxcXCI+e3twb3N0LnRpdGxlfX08L2E+PC9oMj5cXG4gICAgICAgICAgICAgICAgPGg1IGNsYXNzPVxcXCJibHVlLXRleHQgdGV4dC1saWdodGVuLTNcXFwiPnt7cG9zdC5zdWJ0aXRsZX19PC9oNT5cXG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XFxcImJsdWUtdGV4dCB0ZXh0LWxpZ2h0ZW4tNVxcXCI+e3twb3N0LmNvbnRlbnR9fTwvcD5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgPGRpdiBuZy1pZj1cXFwicG9zdC50YWdzXFxcIiBjbGFzcz1cXFwiY2FyZC1hY3Rpb25cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcImJsdWUtdGV4dCB0ZXh0LWxpZ2h0ZW4tMlxcXCI+VGFnczwvc3Bhbj5cXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIG5nLXJlcGVhdD1cXFwidGFnIGluIHBvc3QudGFnc1xcXCIgY2xhc3M9XFxcImNoaXAgYmx1ZS10ZXh0IHRleHQtZGFya2VuLTFcXFwiPnt7dGFnfX08L3NwYW4+XFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlxcbjwvZGl2PlwiO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL3B1YmxpYy9wYXJ0aWFscy9tYWluQ29tcG9uZW50Lmh0bWxcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBcIjwhLS0gTW9kYWwgU3RydWN0dXJlIC0tPlxcbjxmb3JtIG5hbWU9XFxcIiRjdHJsLnBvc3RGb3JtXFxcIiBuZy1zdWJtaXQ9XFxcIiRjdHJsLnN1Ym1pdCgpXFxcIj5cXG4gICAgPGRpdiBjbGFzcz1cXFwiaW5wdXQtZmllbGQgY29sIHM2XFxcIj5cXG4gICAgICAgIDxpbnB1dCBpZD1cXFwidGl0bGVcXFwiIHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJ2YWxpZGF0ZSB3aGl0ZS10ZXh0XFxcIiBuZy1tb2RlbD1cXFwidGl0bGVcXFwiPlxcbiAgICAgICAgPGxhYmVsIGZvcj1cXFwidGl0bGVcXFwiPlRpdGxlPC9sYWJlbD5cXG4gICAgPC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XFxcImlucHV0LWZpZWxkIGNvbCBzNlxcXCI+XFxuICAgICAgICA8aW5wdXQgaWQ9XFxcInN1YnRpdGxlXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwidmFsaWRhdGUgd2hpdGUtdGV4dFxcXCIgbmctbW9kZWw9XFxcInN1YnRpdGxlXFxcIj5cXG4gICAgICAgIDxsYWJlbCBmb3I9XFxcInN1YnRpdGxlXFxcIj5TdWJ0aXRsZTwvbGFiZWw+XFxuICAgIDwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJpbnB1dC1maWVsZCBjb2wgczZcXFwiPlxcbiAgICAgICAgPHRleHRhcmVhIGlkPVxcXCJjb250ZW50XFxcIiB0eXBlPVxcXCJ0ZXh0YXJlYVxcXCIgY2xhc3M9XFxcInZhbGlkYXRlIHdoaXRlLXRleHQgbWF0ZXJpYWxpemUtdGV4dGFyZWFcXFwiIG5nLW1vZGVsPVxcXCJjb250ZW50XFxcIj48L3RleHRhcmVhPlxcbiAgICAgICAgPGxhYmVsIGZvcj1cXFwiY29udGVudFxcXCI+Q29udGVudDwvbGFiZWw+XFxuICAgIDwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJpbnB1dC1maWVsZCBjb2wgczZcXFwiPlxcbiAgICAgICAgPHRleHRhcmVhIGlkPVxcXCJ0YWdzXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwidmFsaWRhdGUgd2hpdGUtdGV4dCBtYXRlcmlhbGl6ZS10ZXh0YXJlYVxcXCIgbmctbW9kZWw9XFxcInRhZ3NcXFwiPjwvdGV4dGFyZWE+XFxuICAgICAgICA8bGFiZWwgZm9yPVxcXCJ0YWdzXFxcIj5UYWdzPC9sYWJlbD5cXG4gICAgPC9kaXY+XFxuXFxuICAgIDxidXR0b24gY2xhc3M9XFxcIndhdmVzLWVmZmVjdCB3YXZlcy1saWdodCBidG4gYmx1ZSBkYXJrZW4tM1xcXCIgdHlwZT1cXFwic3VibWl0XFxcIj5TdWJtaXQ8L2J1dHRvbj5cXG48L2Zvcm0+XFxuXCI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vcHVibGljL3BhcnRpYWxzL25ld1Bvc3RGb3JtLmh0bWxcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vbm9kZV9tb2R1bGVzL0B0eXBlcy9hbmd1bGFyLXJlc291cmNlL2luZGV4LmQudHNcIiAvPlxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIFNlcnZpY2VzTTtcbihmdW5jdGlvbiAoU2VydmljZXNNKSB7XG4gICAgdmFyIERhdGFBY2Nlc3NTZXJ2aWNlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBEYXRhQWNjZXNzU2VydmljZSgkcmVzb3VyY2UpIHtcbiAgICAgICAgICAgIHRoaXMuJHJlc291cmNlID0gJHJlc291cmNlO1xuICAgICAgICB9XG4gICAgICAgIC8vIFRoZSBhY3R1YWwgc2VydmljZS4gUmVzb3VyY2UgQ2xhc3MgaXMgYSBnZW5lcmljIGludGVyZmFjZS4gQXBwbHlpbmcgb3VyIGN1c3RvbSBJVXNlclJlc291cmNlIGludGVyZmFjZSB0byBpdFxuICAgICAgICAvLyB3aWxsIHJlcXVpcmUgb3VyIGN1c3RvbSB0eXBlIHRvIGJlIHJldHVybmVkIGZyb20gdGhlIGFqYXggcmVxdWVzdFxuICAgICAgICBEYXRhQWNjZXNzU2VydmljZS5wcm90b3R5cGUuZ2V0UG9zdHNSZXNvdXJjZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRyZXNvdXJjZShcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9wb3N0c1wiLCBudWxsLCB7XG4gICAgICAgICAgICAgICAgcXVlcnk6IHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgICAgICAgICAgaXNBcnJheTogdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICBEYXRhQWNjZXNzU2VydmljZS5wcm90b3R5cGUuZ2V0U2luZ2xlUG9zdFJlc291cmNlID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kcmVzb3VyY2UoXCJodHRwOi8vbG9jYWxob3N0OjMwMDAvcG9zdHMvOnBvc3RfaWRcIiwgeyBwb3N0X2lkOiBpZCB9LCB7XG4gICAgICAgICAgICAgICAgZ2V0OiB7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICAgICAgICAgIGlzQXJyYXk6IGZhbHNlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIC8vIFN0YXRpYyBpbmplY3Rpb24gbWFrZXMgJHJlc291cmNlIGF2YWlsYWJsZSBvbiB0aGUgY2xhc3MsIGluc3RlYWQgb2Ygb25seSBvbiB0aGUgaW5zdGFuY2VcbiAgICAgICAgRGF0YUFjY2Vzc1NlcnZpY2UuJGluamVjdCA9IFtcIiRyZXNvdXJjZVwiXTtcbiAgICAgICAgcmV0dXJuIERhdGFBY2Nlc3NTZXJ2aWNlO1xuICAgIH0oKSk7XG4gICAgU2VydmljZXNNLkRhdGFBY2Nlc3NTZXJ2aWNlID0gRGF0YUFjY2Vzc1NlcnZpY2U7XG59KShTZXJ2aWNlc00gPSBleHBvcnRzLlNlcnZpY2VzTSB8fCAoZXhwb3J0cy5TZXJ2aWNlc00gPSB7fSkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zZXJ2aWNlcy5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBjbGFzcz1cXFwiY29sIHM5IG05XFxcIj5cXG4gICAgPGRpdiBjbGFzcz1cXFwiY2FyZCBibHVlIGRhcmtlbi0zXFxcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImNhcmQtY29udGVudFxcXCI+XFxuICAgICAgICAgICAgPGgyIGNsYXNzPVxcXCJ3aGl0ZS10ZXh0XFxcIj57eyRjdHJsLiRzY29wZS5wb3N0LnRpdGxlfX08L2gyPlxcbiAgICAgICAgICAgIDxoNSBjbGFzcz1cXFwiYmx1ZS10ZXh0IHRleHQtbGlnaHRlbi0zXFxcIj57eyRjdHJsLiRzY29wZS5wb3N0LnN1YnRpdGxlfX08L2g1PlxcbiAgICAgICAgICAgIDxwIGNsYXNzPVxcXCJibHVlLXRleHQgdGV4dC1saWdodGVuLTVcXFwiPnt7JGN0cmwuJHNjb3BlLnBvc3QuY29udGVudH19PC9wPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICA8ZGl2IG5nLWlmPVxcXCIkY3RybC4kc2NvcGUucG9zdC50YWdzXFxcIiBjbGFzcz1cXFwiY2FyZC1hY3Rpb25cXFwiPlxcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJibHVlLXRleHQgdGV4dC1saWdodGVuLTJcXFwiPlRhZ3M8L3NwYW4+XFxuICAgICAgICAgICAgPHNwYW4gbmctcmVwZWF0PVxcXCJ0YWcgaW4gJGN0cmwuJHNjb3BlLnBvc3QudGFnc1xcXCIgY2xhc3M9XFxcImNoaXAgYmx1ZS10ZXh0IHRleHQtZGFya2VuLTFcXFwiPnt7dGFnfX08L3NwYW4+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuPC9kaXY+XCI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vcHVibGljL3BhcnRpYWxzL3NpbmdsZVBvc3QuaHRtbFxuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9