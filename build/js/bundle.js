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
/******/ 	__webpack_require__.p = "/public/assets";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/// <reference path="./declarations/_fix.d.ts" />
/// <reference path="../../node_modules/@types/angular-resource/index.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(1);
var services_1 = __webpack_require__(14);
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
    myApp.addComponent('navBar', new index_1.NavComponent());
    myApp.addComponent('mainComponent', new index_1.MainComponent());
    myApp.addComponent('newPostForm', new index_1.FormComponent());
    myApp.addComponent('singlePost', new index_1.SinglePostComponent());
    myApp.addService("dataAccessService", services_1.DataAccessService);
})(MyTestApp || (MyTestApp = {}));


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var main_component_1 = __webpack_require__(2);
exports.MainComponent = main_component_1.MainComponent;
var navBar_component_1 = __webpack_require__(5);
exports.NavComponent = navBar_component_1.NavComponent;
var singlePost_component_1 = __webpack_require__(8);
exports.SinglePostComponent = singlePost_component_1.SinglePostComponent;
var newPostForm_component_1 = __webpack_require__(11);
exports.FormComponent = newPostForm_component_1.FormComponent;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var main_controller_1 = __webpack_require__(3);
var MainComponent = /** @class */ (function () {
    function MainComponent() {
        this.controller = main_controller_1.MainCtrl;
        this.controllerAs = "$ctrl";
        this.template = __webpack_require__(4);
    }
    return MainComponent;
}());
exports.MainComponent = MainComponent;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var MainCtrl = /** @class */ (function () {
    function MainCtrl($http, dataAccessService, $scope, $filter) {
        var _this = this;
        this.$http = $http;
        this.dataAccessService = dataAccessService;
        this.$scope = $scope;
        this.$filter = $filter;
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
    MainCtrl.inject = ["dataAccessService", "$scope", "$filter"];
    return MainCtrl;
}());
exports.MainCtrl = MainCtrl;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\" >\n        <div class=\"col s9 m9\" ng-repeat=\"post in $ctrl.$scope.posts track by $index\">\n            <div class=\"card blue darken-3\">\n                <div class=\"card-content\">\n                    <h2 class=\"white-text\"><a href=\"/#!/posts/{{post.post_id}}\">{{post.title}}</a></h2>\n                    <h5 class=\"blue-text text-lighten-3\">{{post.subtitle}}</h5>\n                    <p class=\"blue-text text-lighten-5 flow-text\">{{post.content | limitTo: 300}}...</p>\n                </div>\n                    <div ng-if=\"post.tags\" class=\"card-action\">\n                        <span class=\"blue-text text-lighten-2\">Tags</span>\n                        <span ng-repeat=\"tag in post.tags\" class=\"chip blue-text text-darken-1\">{{tag}}</span>\n                    </div>\n            </div>\n        </div>\n    </div>";

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var navBar_controller_1 = __webpack_require__(6);
var NavComponent = /** @class */ (function () {
    function NavComponent() {
        this.controller = navBar_controller_1.NavCtrl;
        this.controllerAs = "$ctrl";
        this.template = __webpack_require__(7);
    }
    return NavComponent;
}());
exports.NavComponent = NavComponent;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var NavCtrl = /** @class */ (function () {
    function NavCtrl() {
    }
    NavCtrl.prototype.$onInit = function () {
    };
    return NavCtrl;
}());
exports.NavCtrl = NavCtrl;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = "<div class=\"navbar-fixed\">\n  <nav>\n    <div class=\"nav-wrapper blue darken-3\">\n      <a href=\"#\" class=\"brand-logo\">Totally</a>\n      <ul id=\"nav-mobile\" class=\"right hide-on-med-and-down\">\n        <li><a href=\"/\">Home</a></li>\n        <li><a href=\"/#!/create\">Post</a></li>\n      </ul>\n    </div>\n  </nav>\n</div>\n";

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var singlePost_controller_1 = __webpack_require__(9);
var SinglePostComponent = /** @class */ (function () {
    function SinglePostComponent() {
        this.controller = singlePost_controller_1.SinglePostCtrl;
        this.controllerAs = "$ctrl";
        this.template = __webpack_require__(10);
    }
    return SinglePostComponent;
}());
exports.SinglePostComponent = SinglePostComponent;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
exports.SinglePostCtrl = SinglePostCtrl;


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = "<div class=\"col s9 m9\">\n    <div class=\"card blue darken-3\">\n        <div class=\"card-content\">\n            <h2 class=\"white-text\">{{$ctrl.$scope.post.title}}</h2>\n            <h5 class=\"blue-text text-lighten-3\">{{$ctrl.$scope.post.subtitle}}</h5>\n            <p class=\"blue-text text-lighten-5 flow-text\">{{$ctrl.$scope.post.content}}</p>\n        </div>\n        <div ng-if=\"$ctrl.$scope.post.tags\" class=\"card-action\">\n            <span class=\"blue-text text-lighten-2\">Tags</span>\n            <span ng-repeat=\"tag in $ctrl.$scope.post.tags\" class=\"chip blue-text text-darken-1\">{{tag}}</span>\n        </div>\n    </div>\n</div>";

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var newPostForm_controller_1 = __webpack_require__(12);
var FormComponent = /** @class */ (function () {
    function FormComponent() {
        this.controller = newPostForm_controller_1.PostFormCtrl;
        this.controllerAs = "$ctrl";
        this.template = __webpack_require__(13);
    }
    return FormComponent;
}());
exports.FormComponent = FormComponent;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
        this.$rootScope.$broadcast("POST_SUBMITTED");
        this.$location.path("/");
    };
    PostFormCtrl.$inject = ["$scope", "dataAccessService", "$http", "$rootScope", "$location"];
    return PostFormCtrl;
}());
exports.PostFormCtrl = PostFormCtrl;


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = "<!-- Modal Structure -->\n<div class=\"card blue darken-3 col-s9\">\n    <div class=\"card-content\">\n        <form name=\"$ctrl.postForm\" ng-submit=\"$ctrl.submit()\">\n            <div class=\"input-field col s6\">\n                <input id=\"title\" type=\"text\" class=\"validate white-text\" ng-model=\"title\">\n                <label for=\"title\">Title</label>\n            </div>\n            <div class=\"input-field col s6\">\n                <input id=\"subtitle\" type=\"text\" class=\"validate white-text\" ng-model=\"subtitle\">\n                <label for=\"subtitle\">Subtitle</label>\n            </div>\n            <div class=\"input-field col s6\">\n                <textarea id=\"content\" type=\"textarea\" class=\"validate white-text materialize-textarea\" ng-model=\"content\"></textarea>\n                <label for=\"content\">Content</label>\n            </div>\n            <div class=\"input-field col s6\">\n                <input id=\"tags\" type=\"text\" class=\"validate white-text\" ng-model=\"tags\"></input>\n                <label for=\"tags\">Tags</label>\n            </div>\n        \n            <button class=\"waves-effect waves-light btn white blue-text darken-text-3\" type=\"submit\">Submit</button>\n        </form>\n    </div>\n</div>\n";

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
exports.DataAccessService = DataAccessService;


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMzgxODhjYTlhMjAzYTllNjYwNmMiLCJ3ZWJwYWNrOi8vLy4vYXBwLnRzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9tYWluL21haW4uY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbWFpbi9tYWluLmNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9tYWluL21haW4uaHRtbCIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL25hdkJhci9uYXZCYXIuY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbmF2QmFyL25hdkJhci5jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvbmF2QmFyL25hdkJhci5odG1sIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvc2luZ2xlUG9zdC9zaW5nbGVQb3N0LmNvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL3NpbmdsZVBvc3Qvc2luZ2xlUG9zdC5jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL2NvbXBvbmVudHMvc2luZ2xlUG9zdC9zaW5nbGVQb3N0Lmh0bWwiLCJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9uZXdQb3N0L25ld1Bvc3RGb3JtLmNvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL25ld1Bvc3QvbmV3UG9zdEZvcm0uY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL25ld1Bvc3QvbmV3UG9zdEZvcm0uaHRtbCIsIndlYnBhY2s6Ly8vLi9zZXJ2aWNlcy9zZXJ2aWNlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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UztBQUNULGtDQUFrQyx5Q0FBeUMsRUFBRTtBQUM3RSxtQ0FBbUMseUJBQXlCLEVBQUU7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7Ozs7Ozs7QUN4Q0EsNHhDOzs7Ozs7O0FDQUE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLHNFQUFzRSxjQUFjO0FBQ3BGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9wdWJsaWMvYXNzZXRzXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMzgxODhjYTlhMjAzYTllNjYwNmMiLCJcInVzZSBzdHJpY3RcIjtcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL2RlY2xhcmF0aW9ucy9fZml4LmQudHNcIiAvPlxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL25vZGVfbW9kdWxlcy9AdHlwZXMvYW5ndWxhci1yZXNvdXJjZS9pbmRleC5kLnRzXCIgLz5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBpbmRleF8xID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy9pbmRleFwiKTtcbnZhciBzZXJ2aWNlc18xID0gcmVxdWlyZShcIi4vc2VydmljZXMvc2VydmljZXNcIik7XG52YXIgYXBwO1xuKGZ1bmN0aW9uIChhcHApIHtcbiAgICB2YXIgTW9kdWxlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBNb2R1bGUobmFtZSwgbW9kdWxlcykge1xuICAgICAgICAgICAgdGhpcy5hcHAgPSBhbmd1bGFyLm1vZHVsZShuYW1lLCBtb2R1bGVzKTtcbiAgICAgICAgfVxuICAgICAgICBNb2R1bGUucHJvdG90eXBlLmFkZENvbnRyb2xsZXIgPSBmdW5jdGlvbiAobmFtZSwgY29udHJvbGxlcikge1xuICAgICAgICAgICAgdGhpcy5hcHAuY29udHJvbGxlcihuYW1lLCBjb250cm9sbGVyKTtcbiAgICAgICAgfTtcbiAgICAgICAgTW9kdWxlLnByb3RvdHlwZS5hZGRTZXJ2aWNlID0gZnVuY3Rpb24gKG5hbWUsIHNlcnZpY2VGdW5jKSB7XG4gICAgICAgICAgICB0aGlzLmFwcC5zZXJ2aWNlKG5hbWUsIHNlcnZpY2VGdW5jKTtcbiAgICAgICAgfTtcbiAgICAgICAgTW9kdWxlLnByb3RvdHlwZS5hZGRDb21wb25lbnQgPSBmdW5jdGlvbiAobmFtZSwgY29tcG9uZW50KSB7XG4gICAgICAgICAgICB0aGlzLmFwcC5jb21wb25lbnQobmFtZSwgY29tcG9uZW50KTtcbiAgICAgICAgfTtcbiAgICAgICAgTW9kdWxlLnByb3RvdHlwZS5jb25maWcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmFwcC5jb25maWcoW1wiJGh0dHBQcm92aWRlclwiLCBcIiRxUHJvdmlkZXJcIiwgXCIkcm91dGVQcm92aWRlclwiLCBmdW5jdGlvbiAoJGh0dHBQcm92aWRlciwgJHFQcm92aWRlciwgJHJvdXRlUHJvdmlkZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgJGh0dHBQcm92aWRlci5kZWZhdWx0cy51c2VYRG9tYWluID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlICRodHRwUHJvdmlkZXIuZGVmYXVsdHMuaGVhZGVycy5jb21tb25bJ1gtUmVxdWVzdGVkLVdpdGgnXTtcbiAgICAgICAgICAgICAgICAgICAgJHFQcm92aWRlci5lcnJvck9uVW5oYW5kbGVkUmVqZWN0aW9ucyhmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIFJPVVRJTkdcbiAgICAgICAgICAgICAgICAgICAgJHJvdXRlUHJvdmlkZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIC53aGVuKCcvJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiLi92aWV3cy9wb3N0X3ZpZXcuaHRtbFwiXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAud2hlbignL3Bvc3RzLzpwb3N0X2lkJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcuL3ZpZXdzL3NpbmdsZV9wb3N0X3ZpZXcuaHRtbCdcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC53aGVuKCcvY3JlYXRlJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiLi92aWV3cy9uZXdfcG9zdF92aWV3Lmh0bWxcIlxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XSk7XG4gICAgICAgIH07XG4gICAgICAgIE1vZHVsZS4kaW5qZWN0ID0gW1wibmdSZXNvdXJjZVwiLCBcIm5nUm91dGVcIl07XG4gICAgICAgIHJldHVybiBNb2R1bGU7XG4gICAgfSgpKTtcbiAgICBhcHAuTW9kdWxlID0gTW9kdWxlO1xufSkoYXBwIHx8IChhcHAgPSB7fSkpO1xudmFyIE15VGVzdEFwcDtcbihmdW5jdGlvbiAoTXlUZXN0QXBwKSB7XG4gICAgdmFyIG15QXBwID0gbmV3IGFwcC5Nb2R1bGUoJ215QXBwJywgW1wibmdSZXNvdXJjZVwiLCBcIm5nUm91dGVcIl0pO1xuICAgIG15QXBwLmNvbmZpZygpO1xuICAgIG15QXBwLmFkZENvbXBvbmVudCgnbmF2QmFyJywgbmV3IGluZGV4XzEuTmF2Q29tcG9uZW50KCkpO1xuICAgIG15QXBwLmFkZENvbXBvbmVudCgnbWFpbkNvbXBvbmVudCcsIG5ldyBpbmRleF8xLk1haW5Db21wb25lbnQoKSk7XG4gICAgbXlBcHAuYWRkQ29tcG9uZW50KCduZXdQb3N0Rm9ybScsIG5ldyBpbmRleF8xLkZvcm1Db21wb25lbnQoKSk7XG4gICAgbXlBcHAuYWRkQ29tcG9uZW50KCdzaW5nbGVQb3N0JywgbmV3IGluZGV4XzEuU2luZ2xlUG9zdENvbXBvbmVudCgpKTtcbiAgICBteUFwcC5hZGRTZXJ2aWNlKFwiZGF0YUFjY2Vzc1NlcnZpY2VcIiwgc2VydmljZXNfMS5EYXRhQWNjZXNzU2VydmljZSk7XG59KShNeVRlc3RBcHAgfHwgKE15VGVzdEFwcCA9IHt9KSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC50c1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBtYWluX2NvbXBvbmVudF8xID0gcmVxdWlyZShcIi4vbWFpbi9tYWluLmNvbXBvbmVudFwiKTtcbmV4cG9ydHMuTWFpbkNvbXBvbmVudCA9IG1haW5fY29tcG9uZW50XzEuTWFpbkNvbXBvbmVudDtcbnZhciBuYXZCYXJfY29tcG9uZW50XzEgPSByZXF1aXJlKFwiLi9uYXZCYXIvbmF2QmFyLmNvbXBvbmVudFwiKTtcbmV4cG9ydHMuTmF2Q29tcG9uZW50ID0gbmF2QmFyX2NvbXBvbmVudF8xLk5hdkNvbXBvbmVudDtcbnZhciBzaW5nbGVQb3N0X2NvbXBvbmVudF8xID0gcmVxdWlyZShcIi4vc2luZ2xlUG9zdC9zaW5nbGVQb3N0LmNvbXBvbmVudFwiKTtcbmV4cG9ydHMuU2luZ2xlUG9zdENvbXBvbmVudCA9IHNpbmdsZVBvc3RfY29tcG9uZW50XzEuU2luZ2xlUG9zdENvbXBvbmVudDtcbnZhciBuZXdQb3N0Rm9ybV9jb21wb25lbnRfMSA9IHJlcXVpcmUoXCIuL25ld1Bvc3QvbmV3UG9zdEZvcm0uY29tcG9uZW50XCIpO1xuZXhwb3J0cy5Gb3JtQ29tcG9uZW50ID0gbmV3UG9zdEZvcm1fY29tcG9uZW50XzEuRm9ybUNvbXBvbmVudDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY29tcG9uZW50cy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBtYWluX2NvbnRyb2xsZXJfMSA9IHJlcXVpcmUoXCIuL21haW4uY29udHJvbGxlclwiKTtcbnZhciBNYWluQ29tcG9uZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1haW5Db21wb25lbnQoKSB7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IG1haW5fY29udHJvbGxlcl8xLk1haW5DdHJsO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXJBcyA9IFwiJGN0cmxcIjtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IHJlcXVpcmUoXCIuL21haW4uaHRtbFwiKTtcbiAgICB9XG4gICAgcmV0dXJuIE1haW5Db21wb25lbnQ7XG59KCkpO1xuZXhwb3J0cy5NYWluQ29tcG9uZW50ID0gTWFpbkNvbXBvbmVudDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY29tcG9uZW50cy9tYWluL21haW4uY29tcG9uZW50LmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIE1haW5DdHJsID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1haW5DdHJsKCRodHRwLCBkYXRhQWNjZXNzU2VydmljZSwgJHNjb3BlLCAkZmlsdGVyKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuJGh0dHAgPSAkaHR0cDtcbiAgICAgICAgdGhpcy5kYXRhQWNjZXNzU2VydmljZSA9IGRhdGFBY2Nlc3NTZXJ2aWNlO1xuICAgICAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcbiAgICAgICAgdGhpcy4kZmlsdGVyID0gJGZpbHRlcjtcbiAgICAgICAgdGhpcy4kc2NvcGUuJG9uKFwiUE9TVF9TVUJNSVRURURcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgX3RoaXMuZ2V0UG9zdExpc3QoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIE1haW5DdHJsLnByb3RvdHlwZS4kb25Jbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcImluaXRcIik7XG4gICAgICAgIHRoaXMuZ2V0UG9zdExpc3QoKTtcbiAgICB9O1xuICAgIE1haW5DdHJsLnByb3RvdHlwZS5nZXRQb3N0TGlzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5kYXRhQWNjZXNzU2VydmljZVxuICAgICAgICAgICAgLmdldFBvc3RzUmVzb3VyY2UoKVxuICAgICAgICAgICAgLnF1ZXJ5KGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICB2YXIgZm9ybWF0dGVkRGF0YSA9IGRhdGEubWFwKGZ1bmN0aW9uIChwb3N0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHBvc3QudGFncykge1xuICAgICAgICAgICAgICAgICAgICBwb3N0LnRhZ3MgPSBwb3N0LnRhZ3Muc3BsaXQoJyAnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBvc3Q7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGZvcm1hdHRlZERhdGEpO1xuICAgICAgICAgICAgX3RoaXMuJHNjb3BlLnBvc3RzID0gZm9ybWF0dGVkRGF0YTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBNYWluQ3RybC5pbmplY3QgPSBbXCJkYXRhQWNjZXNzU2VydmljZVwiLCBcIiRzY29wZVwiLCBcIiRmaWx0ZXJcIl07XG4gICAgcmV0dXJuIE1haW5DdHJsO1xufSgpKTtcbmV4cG9ydHMuTWFpbkN0cmwgPSBNYWluQ3RybDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY29tcG9uZW50cy9tYWluL21haW4uY29udHJvbGxlci5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBjbGFzcz1cXFwicm93XFxcIiA+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjb2wgczkgbTlcXFwiIG5nLXJlcGVhdD1cXFwicG9zdCBpbiAkY3RybC4kc2NvcGUucG9zdHMgdHJhY2sgYnkgJGluZGV4XFxcIj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjYXJkIGJsdWUgZGFya2VuLTNcXFwiPlxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjYXJkLWNvbnRlbnRcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPGgyIGNsYXNzPVxcXCJ3aGl0ZS10ZXh0XFxcIj48YSBocmVmPVxcXCIvIyEvcG9zdHMve3twb3N0LnBvc3RfaWR9fVxcXCI+e3twb3N0LnRpdGxlfX08L2E+PC9oMj5cXG4gICAgICAgICAgICAgICAgICAgIDxoNSBjbGFzcz1cXFwiYmx1ZS10ZXh0IHRleHQtbGlnaHRlbi0zXFxcIj57e3Bvc3Quc3VidGl0bGV9fTwvaDU+XFxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cXFwiYmx1ZS10ZXh0IHRleHQtbGlnaHRlbi01IGZsb3ctdGV4dFxcXCI+e3twb3N0LmNvbnRlbnQgfCBsaW1pdFRvOiAzMDB9fS4uLjwvcD5cXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IG5nLWlmPVxcXCJwb3N0LnRhZ3NcXFwiIGNsYXNzPVxcXCJjYXJkLWFjdGlvblxcXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcImJsdWUtdGV4dCB0ZXh0LWxpZ2h0ZW4tMlxcXCI+VGFnczwvc3Bhbj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBuZy1yZXBlYXQ9XFxcInRhZyBpbiBwb3N0LnRhZ3NcXFwiIGNsYXNzPVxcXCJjaGlwIGJsdWUtdGV4dCB0ZXh0LWRhcmtlbi0xXFxcIj57e3RhZ319PC9zcGFuPlxcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XCI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jb21wb25lbnRzL21haW4vbWFpbi5odG1sXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIG5hdkJhcl9jb250cm9sbGVyXzEgPSByZXF1aXJlKFwiLi9uYXZCYXIuY29udHJvbGxlclwiKTtcbnZhciBOYXZDb21wb25lbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTmF2Q29tcG9uZW50KCkge1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBuYXZCYXJfY29udHJvbGxlcl8xLk5hdkN0cmw7XG4gICAgICAgIHRoaXMuY29udHJvbGxlckFzID0gXCIkY3RybFwiO1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gcmVxdWlyZShcIi4vbmF2QmFyLmh0bWxcIik7XG4gICAgfVxuICAgIHJldHVybiBOYXZDb21wb25lbnQ7XG59KCkpO1xuZXhwb3J0cy5OYXZDb21wb25lbnQgPSBOYXZDb21wb25lbnQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2NvbXBvbmVudHMvbmF2QmFyL25hdkJhci5jb21wb25lbnQuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgTmF2Q3RybCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBOYXZDdHJsKCkge1xuICAgIH1cbiAgICBOYXZDdHJsLnByb3RvdHlwZS4kb25Jbml0ID0gZnVuY3Rpb24gKCkge1xuICAgIH07XG4gICAgcmV0dXJuIE5hdkN0cmw7XG59KCkpO1xuZXhwb3J0cy5OYXZDdHJsID0gTmF2Q3RybDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY29tcG9uZW50cy9uYXZCYXIvbmF2QmFyLmNvbnRyb2xsZXIuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgY2xhc3M9XFxcIm5hdmJhci1maXhlZFxcXCI+XFxuICA8bmF2PlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJuYXYtd3JhcHBlciBibHVlIGRhcmtlbi0zXFxcIj5cXG4gICAgICA8YSBocmVmPVxcXCIjXFxcIiBjbGFzcz1cXFwiYnJhbmQtbG9nb1xcXCI+VG90YWxseTwvYT5cXG4gICAgICA8dWwgaWQ9XFxcIm5hdi1tb2JpbGVcXFwiIGNsYXNzPVxcXCJyaWdodCBoaWRlLW9uLW1lZC1hbmQtZG93blxcXCI+XFxuICAgICAgICA8bGk+PGEgaHJlZj1cXFwiL1xcXCI+SG9tZTwvYT48L2xpPlxcbiAgICAgICAgPGxpPjxhIGhyZWY9XFxcIi8jIS9jcmVhdGVcXFwiPlBvc3Q8L2E+PC9saT5cXG4gICAgICA8L3VsPlxcbiAgICA8L2Rpdj5cXG4gIDwvbmF2PlxcbjwvZGl2PlxcblwiO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY29tcG9uZW50cy9uYXZCYXIvbmF2QmFyLmh0bWxcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgc2luZ2xlUG9zdF9jb250cm9sbGVyXzEgPSByZXF1aXJlKFwiLi9zaW5nbGVQb3N0LmNvbnRyb2xsZXJcIik7XG52YXIgU2luZ2xlUG9zdENvbXBvbmVudCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTaW5nbGVQb3N0Q29tcG9uZW50KCkge1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXIgPSBzaW5nbGVQb3N0X2NvbnRyb2xsZXJfMS5TaW5nbGVQb3N0Q3RybDtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyQXMgPSBcIiRjdHJsXCI7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSByZXF1aXJlKFwiLi9zaW5nbGVQb3N0Lmh0bWxcIik7XG4gICAgfVxuICAgIHJldHVybiBTaW5nbGVQb3N0Q29tcG9uZW50O1xufSgpKTtcbmV4cG9ydHMuU2luZ2xlUG9zdENvbXBvbmVudCA9IFNpbmdsZVBvc3RDb21wb25lbnQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2NvbXBvbmVudHMvc2luZ2xlUG9zdC9zaW5nbGVQb3N0LmNvbXBvbmVudC5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBTaW5nbGVQb3N0Q3RybCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTaW5nbGVQb3N0Q3RybCgkaHR0cCwgZGF0YUFjY2Vzc1NlcnZpY2UsICRzY29wZSwgJGxvY2F0aW9uKSB7XG4gICAgICAgIHRoaXMuJGh0dHAgPSAkaHR0cDtcbiAgICAgICAgdGhpcy5kYXRhQWNjZXNzU2VydmljZSA9IGRhdGFBY2Nlc3NTZXJ2aWNlO1xuICAgICAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcbiAgICAgICAgdGhpcy4kbG9jYXRpb24gPSAkbG9jYXRpb247XG4gICAgfVxuICAgIFNpbmdsZVBvc3RDdHJsLnByb3RvdHlwZS4kb25Jbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLiRsb2NhdGlvbi5wYXRoKCkuc3BsaXQoJy8nKVsyXSk7XG4gICAgICAgIHRoaXMuZ2V0U2luZ2xlUG9zdCh0aGlzLiRsb2NhdGlvbi5wYXRoKCkuc3BsaXQoJy8nKVsyXSk7XG4gICAgfTtcbiAgICBTaW5nbGVQb3N0Q3RybC5wcm90b3R5cGUuZ2V0U2luZ2xlUG9zdCA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmRhdGFBY2Nlc3NTZXJ2aWNlXG4gICAgICAgICAgICAuZ2V0U2luZ2xlUG9zdFJlc291cmNlKGlkKVxuICAgICAgICAgICAgLnF1ZXJ5KGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICB2YXIgcG9zdE9iaiA9IGRhdGFbMF07XG4gICAgICAgICAgICBwb3N0T2JqLnRhZ3MgPSBwb3N0T2JqLnRhZ3Muc3BsaXQoJyAnKTtcbiAgICAgICAgICAgIF90aGlzLiRzY29wZS5wb3N0ID0gcG9zdE9iajtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBTaW5nbGVQb3N0Q3RybC5pbmplY3QgPSBbXCJkYXRhQWNjZXNzU2VydmljZVwiLCBcIiRzY29wZVwiLCBcIiRsb2NhdGlvblwiXTtcbiAgICByZXR1cm4gU2luZ2xlUG9zdEN0cmw7XG59KCkpO1xuZXhwb3J0cy5TaW5nbGVQb3N0Q3RybCA9IFNpbmdsZVBvc3RDdHJsO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jb21wb25lbnRzL3NpbmdsZVBvc3Qvc2luZ2xlUG9zdC5jb250cm9sbGVyLmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGNsYXNzPVxcXCJjb2wgczkgbTlcXFwiPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJjYXJkIGJsdWUgZGFya2VuLTNcXFwiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiY2FyZC1jb250ZW50XFxcIj5cXG4gICAgICAgICAgICA8aDIgY2xhc3M9XFxcIndoaXRlLXRleHRcXFwiPnt7JGN0cmwuJHNjb3BlLnBvc3QudGl0bGV9fTwvaDI+XFxuICAgICAgICAgICAgPGg1IGNsYXNzPVxcXCJibHVlLXRleHQgdGV4dC1saWdodGVuLTNcXFwiPnt7JGN0cmwuJHNjb3BlLnBvc3Quc3VidGl0bGV9fTwvaDU+XFxuICAgICAgICAgICAgPHAgY2xhc3M9XFxcImJsdWUtdGV4dCB0ZXh0LWxpZ2h0ZW4tNSBmbG93LXRleHRcXFwiPnt7JGN0cmwuJHNjb3BlLnBvc3QuY29udGVudH19PC9wPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICA8ZGl2IG5nLWlmPVxcXCIkY3RybC4kc2NvcGUucG9zdC50YWdzXFxcIiBjbGFzcz1cXFwiY2FyZC1hY3Rpb25cXFwiPlxcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJibHVlLXRleHQgdGV4dC1saWdodGVuLTJcXFwiPlRhZ3M8L3NwYW4+XFxuICAgICAgICAgICAgPHNwYW4gbmctcmVwZWF0PVxcXCJ0YWcgaW4gJGN0cmwuJHNjb3BlLnBvc3QudGFnc1xcXCIgY2xhc3M9XFxcImNoaXAgYmx1ZS10ZXh0IHRleHQtZGFya2VuLTFcXFwiPnt7dGFnfX08L3NwYW4+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuPC9kaXY+XCI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jb21wb25lbnRzL3NpbmdsZVBvc3Qvc2luZ2xlUG9zdC5odG1sXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBuZXdQb3N0Rm9ybV9jb250cm9sbGVyXzEgPSByZXF1aXJlKFwiLi9uZXdQb3N0Rm9ybS5jb250cm9sbGVyXCIpO1xudmFyIEZvcm1Db21wb25lbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRm9ybUNvbXBvbmVudCgpIHtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gbmV3UG9zdEZvcm1fY29udHJvbGxlcl8xLlBvc3RGb3JtQ3RybDtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyQXMgPSBcIiRjdHJsXCI7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSByZXF1aXJlKFwiLi9uZXdQb3N0Rm9ybS5odG1sXCIpO1xuICAgIH1cbiAgICByZXR1cm4gRm9ybUNvbXBvbmVudDtcbn0oKSk7XG5leHBvcnRzLkZvcm1Db21wb25lbnQgPSBGb3JtQ29tcG9uZW50O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jb21wb25lbnRzL25ld1Bvc3QvbmV3UG9zdEZvcm0uY29tcG9uZW50LmpzXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBQb3N0Rm9ybUN0cmwgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUG9zdEZvcm1DdHJsKCRzY29wZSwgZGF0YUFjY2Vzc1NlcnZpY2UsICRodHRwLCAkcm9vdFNjb3BlLCAkbG9jYXRpb24pIHtcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuZGF0YUFjY2Vzc1NlcnZpY2UgPSBkYXRhQWNjZXNzU2VydmljZTtcbiAgICAgICAgdGhpcy4kaHR0cCA9ICRodHRwO1xuICAgICAgICB0aGlzLiRyb290U2NvcGUgPSAkcm9vdFNjb3BlO1xuICAgICAgICB0aGlzLiRsb2NhdGlvbiA9ICRsb2NhdGlvbjtcbiAgICAgICAgdGhpcy5kYXRhQWNjZXNzU2VydmljZSA9IGRhdGFBY2Nlc3NTZXJ2aWNlO1xuICAgIH1cbiAgICBQb3N0Rm9ybUN0cmwucHJvdG90eXBlLnN1Ym1pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG5ld1Bvc3RPYmplY3QgPSB7XG4gICAgICAgICAgICB0aXRsZTogdGhpcy4kc2NvcGUudGl0bGUsXG4gICAgICAgICAgICBzdWJ0aXRsZTogdGhpcy4kc2NvcGUuc3VidGl0bGUsXG4gICAgICAgICAgICBjb250ZW50OiB0aGlzLiRzY29wZS5jb250ZW50LFxuICAgICAgICAgICAgdGFnczogdGhpcy4kc2NvcGUudGFnc1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNlbmROZXdQb3N0KG5ld1Bvc3RPYmplY3QpO1xuICAgIH07XG4gICAgUG9zdEZvcm1DdHJsLnByb3RvdHlwZS5zZW5kTmV3UG9zdCA9IGZ1bmN0aW9uIChwb3N0T2JqKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuJGh0dHAoe1xuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICAgIHVybDogXCJodHRwOi8vbG9jYWxob3N0OjMwMDAvcG9zdHNcIixcbiAgICAgICAgICAgIGRhdGE6IHBvc3RPYmosXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7IHJldHVybiBfdGhpcy5oYW5kbGVOZXdQb3N0UmVzcG9uc2UocmVzKTsgfSlcbiAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoZXJyKSB7IHJldHVybiBjb25zb2xlLmxvZyhlcnIpOyB9KTtcbiAgICB9O1xuICAgIFBvc3RGb3JtQ3RybC5wcm90b3R5cGUuaGFuZGxlTmV3UG9zdFJlc3BvbnNlID0gZnVuY3Rpb24gKHJlcykge1xuICAgICAgICB0aGlzLiRyb290U2NvcGUuJGJyb2FkY2FzdChcIlBPU1RfU1VCTUlUVEVEXCIpO1xuICAgICAgICB0aGlzLiRsb2NhdGlvbi5wYXRoKFwiL1wiKTtcbiAgICB9O1xuICAgIFBvc3RGb3JtQ3RybC4kaW5qZWN0ID0gW1wiJHNjb3BlXCIsIFwiZGF0YUFjY2Vzc1NlcnZpY2VcIiwgXCIkaHR0cFwiLCBcIiRyb290U2NvcGVcIiwgXCIkbG9jYXRpb25cIl07XG4gICAgcmV0dXJuIFBvc3RGb3JtQ3RybDtcbn0oKSk7XG5leHBvcnRzLlBvc3RGb3JtQ3RybCA9IFBvc3RGb3JtQ3RybDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY29tcG9uZW50cy9uZXdQb3N0L25ld1Bvc3RGb3JtLmNvbnRyb2xsZXIuanNcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gXCI8IS0tIE1vZGFsIFN0cnVjdHVyZSAtLT5cXG48ZGl2IGNsYXNzPVxcXCJjYXJkIGJsdWUgZGFya2VuLTMgY29sLXM5XFxcIj5cXG4gICAgPGRpdiBjbGFzcz1cXFwiY2FyZC1jb250ZW50XFxcIj5cXG4gICAgICAgIDxmb3JtIG5hbWU9XFxcIiRjdHJsLnBvc3RGb3JtXFxcIiBuZy1zdWJtaXQ9XFxcIiRjdHJsLnN1Ym1pdCgpXFxcIj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJpbnB1dC1maWVsZCBjb2wgczZcXFwiPlxcbiAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XFxcInRpdGxlXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwidmFsaWRhdGUgd2hpdGUtdGV4dFxcXCIgbmctbW9kZWw9XFxcInRpdGxlXFxcIj5cXG4gICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cXFwidGl0bGVcXFwiPlRpdGxlPC9sYWJlbD5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJpbnB1dC1maWVsZCBjb2wgczZcXFwiPlxcbiAgICAgICAgICAgICAgICA8aW5wdXQgaWQ9XFxcInN1YnRpdGxlXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwidmFsaWRhdGUgd2hpdGUtdGV4dFxcXCIgbmctbW9kZWw9XFxcInN1YnRpdGxlXFxcIj5cXG4gICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cXFwic3VidGl0bGVcXFwiPlN1YnRpdGxlPC9sYWJlbD5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJpbnB1dC1maWVsZCBjb2wgczZcXFwiPlxcbiAgICAgICAgICAgICAgICA8dGV4dGFyZWEgaWQ9XFxcImNvbnRlbnRcXFwiIHR5cGU9XFxcInRleHRhcmVhXFxcIiBjbGFzcz1cXFwidmFsaWRhdGUgd2hpdGUtdGV4dCBtYXRlcmlhbGl6ZS10ZXh0YXJlYVxcXCIgbmctbW9kZWw9XFxcImNvbnRlbnRcXFwiPjwvdGV4dGFyZWE+XFxuICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XFxcImNvbnRlbnRcXFwiPkNvbnRlbnQ8L2xhYmVsPlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImlucHV0LWZpZWxkIGNvbCBzNlxcXCI+XFxuICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cXFwidGFnc1xcXCIgdHlwZT1cXFwidGV4dFxcXCIgY2xhc3M9XFxcInZhbGlkYXRlIHdoaXRlLXRleHRcXFwiIG5nLW1vZGVsPVxcXCJ0YWdzXFxcIj48L2lucHV0PlxcbiAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVxcXCJ0YWdzXFxcIj5UYWdzPC9sYWJlbD5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIFxcbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XFxcIndhdmVzLWVmZmVjdCB3YXZlcy1saWdodCBidG4gd2hpdGUgYmx1ZS10ZXh0IGRhcmtlbi10ZXh0LTNcXFwiIHR5cGU9XFxcInN1Ym1pdFxcXCI+U3VibWl0PC9idXR0b24+XFxuICAgICAgICA8L2Zvcm0+XFxuICAgIDwvZGl2PlxcbjwvZGl2PlxcblwiO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY29tcG9uZW50cy9uZXdQb3N0L25ld1Bvc3RGb3JtLmh0bWxcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIERhdGFBY2Nlc3NTZXJ2aWNlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERhdGFBY2Nlc3NTZXJ2aWNlKCRyZXNvdXJjZSkge1xuICAgICAgICB0aGlzLiRyZXNvdXJjZSA9ICRyZXNvdXJjZTtcbiAgICB9XG4gICAgLy8gVGhlIGFjdHVhbCBzZXJ2aWNlLiBSZXNvdXJjZSBDbGFzcyBpcyBhIGdlbmVyaWMgaW50ZXJmYWNlLiBBcHBseWluZyBvdXIgY3VzdG9tIElVc2VyUmVzb3VyY2UgaW50ZXJmYWNlIHRvIGl0XG4gICAgLy8gd2lsbCByZXF1aXJlIG91ciBjdXN0b20gdHlwZSB0byBiZSByZXR1cm5lZCBmcm9tIHRoZSBhamF4IHJlcXVlc3RcbiAgICBEYXRhQWNjZXNzU2VydmljZS5wcm90b3R5cGUuZ2V0UG9zdHNSZXNvdXJjZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHJlc291cmNlKFwiaHR0cDovL2xvY2FsaG9zdDozMDAwL3Bvc3RzXCIsIG51bGwsIHtcbiAgICAgICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgICAgICBpc0FycmF5OiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgRGF0YUFjY2Vzc1NlcnZpY2UucHJvdG90eXBlLmdldFNpbmdsZVBvc3RSZXNvdXJjZSA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kcmVzb3VyY2UoXCJodHRwOi8vbG9jYWxob3N0OjMwMDAvcG9zdC86cG9zdF9pZFwiLCB7IHBvc3RfaWQ6IGlkIH0sIHtcbiAgICAgICAgICAgIGdldDoge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICAgICAgaXNBcnJheTogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvLyBTdGF0aWMgaW5qZWN0aW9uIG1ha2VzICRyZXNvdXJjZSBhdmFpbGFibGUgb24gdGhlIGNsYXNzLCBpbnN0ZWFkIG9mIG9ubHkgb24gdGhlIGluc3RhbmNlXG4gICAgRGF0YUFjY2Vzc1NlcnZpY2UuJGluamVjdCA9IFtcIiRyZXNvdXJjZVwiXTtcbiAgICByZXR1cm4gRGF0YUFjY2Vzc1NlcnZpY2U7XG59KCkpO1xuZXhwb3J0cy5EYXRhQWNjZXNzU2VydmljZSA9IERhdGFBY2Nlc3NTZXJ2aWNlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zZXJ2aWNlcy9zZXJ2aWNlcy5qc1xuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==