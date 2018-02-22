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
/******/ 	__webpack_require__.p = "/build/";
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

module.exports = "<div class=\"row\" >\n        <div class=\"col s9 m9\" ng-repeat=\"post in $ctrl.$scope.posts track by $index\">\n            <div class=\"card blue darken-3\">\n                <div class=\"card-content\">\n                    <h2><a  class=\"white-text post-title\" href=\"/#!/posts/{{post.post_id}}\">{{post.title}}</a></h2>\n                    <h5 class=\"blue-text text-lighten-4\">{{post.subtitle}}</h5>\n                    <p class=\"blue-text text-lighten-4\" style=\"white-space: pre-line\">{{post.content | limitTo: 300}}...</p>\n                </div>\n                    <div ng-if=\"post.tags\" class=\"card-action\">\n                        <span class=\"blue-text text-lighten-2\">Tags</span>\n                        <span ng-repeat=\"tag in post.tags\" class=\"chip blue-text text-darken-1\">{{tag}}</span>\n                    </div>\n            </div>\n        </div>\n    </div>";

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

module.exports = "<div class=\"col s9 m9\">\n    <div class=\"card blue darken-3\">\n        <div class=\"card-content\">\n            <h2 class=\"white-text post-title\">{{$ctrl.$scope.post.title}}</h2>\n            <h5 class=\"blue-text text-lighten-4 post-sub-title\">{{$ctrl.$scope.post.subtitle}}</h5>\n            <p class=\"blue-text text-lighten-4\" style=\"white-space: pre-line\">{{$ctrl.$scope.post.content}}</p>\n        </div>\n        <div ng-if=\"$ctrl.$scope.post.tags\" class=\"card-action\">\n            <span class=\"blue-text text-lighten-2\">Tags</span>\n            <span ng-repeat=\"tag in $ctrl.$scope.post.tags\" class=\"chip blue-text text-darken-1\">{{tag}}</span>\n        </div>\n    </div>\n</div>";

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMmY2YTNiMjFlYTdjZGRjNWI1ZjEiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9tYWluL21haW4uY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL21haW4vbWFpbi5jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL21haW4vbWFpbi5odG1sIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL25hdkJhci9uYXZCYXIuY29tcG9uZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL25hdkJhci9uYXZCYXIuY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9uYXZCYXIvbmF2QmFyLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvc2luZ2xlUG9zdC9zaW5nbGVQb3N0LmNvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9zaW5nbGVQb3N0L3NpbmdsZVBvc3QuY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9zaW5nbGVQb3N0L3NpbmdsZVBvc3QuaHRtbCIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9uZXdQb3N0L25ld1Bvc3RGb3JtLmNvbXBvbmVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9uZXdQb3N0L25ld1Bvc3RGb3JtLmNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbmV3UG9zdC9uZXdQb3N0Rm9ybS5odG1sIiwid2VicGFjazovLy8uL3NyYy9zZXJ2aWNlcy9zZXJ2aWNlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFD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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULGtDQUFrQyx5Q0FBeUMsRUFBRTtBQUM3RSxtQ0FBbUMseUJBQXlCLEVBQUU7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7Ozs7Ozs7QUN4Q0EsNHhDOzs7Ozs7O0FDQUE7QUFDQSw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLHNFQUFzRSxjQUFjO0FBQ3BGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9idWlsZC9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAyZjZhM2IyMWVhN2NkZGM1YjVmMSIsIlwidXNlIHN0cmljdFwiO1xuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vZGVjbGFyYXRpb25zL19maXguZC50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vLi4vbm9kZV9tb2R1bGVzL0B0eXBlcy9hbmd1bGFyLXJlc291cmNlL2luZGV4LmQudHNcIiAvPlxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGluZGV4XzEgPSByZXF1aXJlKFwiLi9jb21wb25lbnRzL2luZGV4XCIpO1xudmFyIHNlcnZpY2VzXzEgPSByZXF1aXJlKFwiLi9zZXJ2aWNlcy9zZXJ2aWNlc1wiKTtcbnZhciBhcHA7XG4oZnVuY3Rpb24gKGFwcCkge1xuICAgIHZhciBNb2R1bGUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIE1vZHVsZShuYW1lLCBtb2R1bGVzKSB7XG4gICAgICAgICAgICB0aGlzLmFwcCA9IGFuZ3VsYXIubW9kdWxlKG5hbWUsIG1vZHVsZXMpO1xuICAgICAgICB9XG4gICAgICAgIE1vZHVsZS5wcm90b3R5cGUuYWRkQ29udHJvbGxlciA9IGZ1bmN0aW9uIChuYW1lLCBjb250cm9sbGVyKSB7XG4gICAgICAgICAgICB0aGlzLmFwcC5jb250cm9sbGVyKG5hbWUsIGNvbnRyb2xsZXIpO1xuICAgICAgICB9O1xuICAgICAgICBNb2R1bGUucHJvdG90eXBlLmFkZFNlcnZpY2UgPSBmdW5jdGlvbiAobmFtZSwgc2VydmljZUZ1bmMpIHtcbiAgICAgICAgICAgIHRoaXMuYXBwLnNlcnZpY2UobmFtZSwgc2VydmljZUZ1bmMpO1xuICAgICAgICB9O1xuICAgICAgICBNb2R1bGUucHJvdG90eXBlLmFkZENvbXBvbmVudCA9IGZ1bmN0aW9uIChuYW1lLCBjb21wb25lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuYXBwLmNvbXBvbmVudChuYW1lLCBjb21wb25lbnQpO1xuICAgICAgICB9O1xuICAgICAgICBNb2R1bGUucHJvdG90eXBlLmNvbmZpZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuYXBwLmNvbmZpZyhbXCIkaHR0cFByb3ZpZGVyXCIsIFwiJHFQcm92aWRlclwiLCBcIiRyb3V0ZVByb3ZpZGVyXCIsIGZ1bmN0aW9uICgkaHR0cFByb3ZpZGVyLCAkcVByb3ZpZGVyLCAkcm91dGVQcm92aWRlcikge1xuICAgICAgICAgICAgICAgICAgICAkaHR0cFByb3ZpZGVyLmRlZmF1bHRzLnVzZVhEb21haW4gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgJGh0dHBQcm92aWRlci5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vblsnWC1SZXF1ZXN0ZWQtV2l0aCddO1xuICAgICAgICAgICAgICAgICAgICAkcVByb3ZpZGVyLmVycm9yT25VbmhhbmRsZWRSZWplY3Rpb25zKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gUk9VVElOR1xuICAgICAgICAgICAgICAgICAgICAkcm91dGVQcm92aWRlclxuICAgICAgICAgICAgICAgICAgICAgICAgLndoZW4oJy8nLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogXCI8bWFpbi1jb21wb25lbnQ+PC9tYWluLWNvbXBvbmVudD5cIlxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLndoZW4oJy9wb3N0cy86cG9zdF9pZCcsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlOiAnPHNpbmdsZS1wb3N0Pjwvc2luZ2xlLXBvc3Q+J1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLndoZW4oJy9jcmVhdGUnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZTogXCI8bmV3LXBvc3QtZm9ybT48L25ldy1wb3N0LWZvcm0+XCJcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfV0pO1xuICAgICAgICB9O1xuICAgICAgICBNb2R1bGUuJGluamVjdCA9IFtcIm5nUmVzb3VyY2VcIiwgXCJuZ1JvdXRlXCJdO1xuICAgICAgICByZXR1cm4gTW9kdWxlO1xuICAgIH0oKSk7XG4gICAgYXBwLk1vZHVsZSA9IE1vZHVsZTtcbn0pKGFwcCB8fCAoYXBwID0ge30pKTtcbnZhciBNeVRlc3RBcHA7XG4oZnVuY3Rpb24gKE15VGVzdEFwcCkge1xuICAgIHZhciBteUFwcCA9IG5ldyBhcHAuTW9kdWxlKCdteUFwcCcsIFtcIm5nUmVzb3VyY2VcIiwgXCJuZ1JvdXRlXCJdKTtcbiAgICBteUFwcC5jb25maWcoKTtcbiAgICBteUFwcC5hZGRDb21wb25lbnQoJ25hdkJhcicsIG5ldyBpbmRleF8xLk5hdkNvbXBvbmVudCgpKTtcbiAgICBteUFwcC5hZGRDb21wb25lbnQoJ21haW5Db21wb25lbnQnLCBuZXcgaW5kZXhfMS5NYWluQ29tcG9uZW50KCkpO1xuICAgIG15QXBwLmFkZENvbXBvbmVudCgnbmV3UG9zdEZvcm0nLCBuZXcgaW5kZXhfMS5Gb3JtQ29tcG9uZW50KCkpO1xuICAgIG15QXBwLmFkZENvbXBvbmVudCgnc2luZ2xlUG9zdCcsIG5ldyBpbmRleF8xLlNpbmdsZVBvc3RDb21wb25lbnQoKSk7XG4gICAgbXlBcHAuYWRkU2VydmljZShcImRhdGFBY2Nlc3NTZXJ2aWNlXCIsIHNlcnZpY2VzXzEuRGF0YUFjY2Vzc1NlcnZpY2UpO1xufSkoTXlUZXN0QXBwIHx8IChNeVRlc3RBcHAgPSB7fSkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYXBwLnRzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIG1haW5fY29tcG9uZW50XzEgPSByZXF1aXJlKFwiLi9tYWluL21haW4uY29tcG9uZW50XCIpO1xuZXhwb3J0cy5NYWluQ29tcG9uZW50ID0gbWFpbl9jb21wb25lbnRfMS5NYWluQ29tcG9uZW50O1xudmFyIG5hdkJhcl9jb21wb25lbnRfMSA9IHJlcXVpcmUoXCIuL25hdkJhci9uYXZCYXIuY29tcG9uZW50XCIpO1xuZXhwb3J0cy5OYXZDb21wb25lbnQgPSBuYXZCYXJfY29tcG9uZW50XzEuTmF2Q29tcG9uZW50O1xudmFyIHNpbmdsZVBvc3RfY29tcG9uZW50XzEgPSByZXF1aXJlKFwiLi9zaW5nbGVQb3N0L3NpbmdsZVBvc3QuY29tcG9uZW50XCIpO1xuZXhwb3J0cy5TaW5nbGVQb3N0Q29tcG9uZW50ID0gc2luZ2xlUG9zdF9jb21wb25lbnRfMS5TaW5nbGVQb3N0Q29tcG9uZW50O1xudmFyIG5ld1Bvc3RGb3JtX2NvbXBvbmVudF8xID0gcmVxdWlyZShcIi4vbmV3UG9zdC9uZXdQb3N0Rm9ybS5jb21wb25lbnRcIik7XG5leHBvcnRzLkZvcm1Db21wb25lbnQgPSBuZXdQb3N0Rm9ybV9jb21wb25lbnRfMS5Gb3JtQ29tcG9uZW50O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBtYWluX2NvbnRyb2xsZXJfMSA9IHJlcXVpcmUoXCIuL21haW4uY29udHJvbGxlclwiKTtcbnZhciBNYWluQ29tcG9uZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1haW5Db21wb25lbnQoKSB7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IG1haW5fY29udHJvbGxlcl8xLk1haW5DdHJsO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXJBcyA9IFwiJGN0cmxcIjtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IHJlcXVpcmUoXCIuL21haW4uaHRtbFwiKTtcbiAgICB9XG4gICAgcmV0dXJuIE1haW5Db21wb25lbnQ7XG59KCkpO1xuZXhwb3J0cy5NYWluQ29tcG9uZW50ID0gTWFpbkNvbXBvbmVudDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvbWFpbi9tYWluLmNvbXBvbmVudC5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBNYWluQ3RybCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBNYWluQ3RybCgkaHR0cCwgZGF0YUFjY2Vzc1NlcnZpY2UsICRzY29wZSwgJGZpbHRlcikge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLiRodHRwID0gJGh0dHA7XG4gICAgICAgIHRoaXMuZGF0YUFjY2Vzc1NlcnZpY2UgPSBkYXRhQWNjZXNzU2VydmljZTtcbiAgICAgICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgICAgIHRoaXMuJGZpbHRlciA9ICRmaWx0ZXI7XG4gICAgICAgIHRoaXMuJHNjb3BlLiRvbihcIlBPU1RfU1VCTUlUVEVEXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGlzLmdldFBvc3RMaXN0KCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBNYWluQ3RybC5wcm90b3R5cGUuJG9uSW5pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJpbml0XCIpO1xuICAgICAgICB0aGlzLmdldFBvc3RMaXN0KCk7XG4gICAgfTtcbiAgICBNYWluQ3RybC5wcm90b3R5cGUuZ2V0UG9zdExpc3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMuZGF0YUFjY2Vzc1NlcnZpY2VcbiAgICAgICAgICAgIC5nZXRQb3N0c1Jlc291cmNlKClcbiAgICAgICAgICAgIC5xdWVyeShmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgdmFyIGZvcm1hdHRlZERhdGEgPSBkYXRhLm1hcChmdW5jdGlvbiAocG9zdCkge1xuICAgICAgICAgICAgICAgIGlmIChwb3N0LnRhZ3MpIHtcbiAgICAgICAgICAgICAgICAgICAgcG9zdC50YWdzID0gcG9zdC50YWdzLnNwbGl0KCcgJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBwb3N0O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhmb3JtYXR0ZWREYXRhKTtcbiAgICAgICAgICAgIF90aGlzLiRzY29wZS5wb3N0cyA9IGZvcm1hdHRlZERhdGE7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgTWFpbkN0cmwuaW5qZWN0ID0gW1wiZGF0YUFjY2Vzc1NlcnZpY2VcIiwgXCIkc2NvcGVcIiwgXCIkZmlsdGVyXCJdO1xuICAgIHJldHVybiBNYWluQ3RybDtcbn0oKSk7XG5leHBvcnRzLk1haW5DdHJsID0gTWFpbkN0cmw7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL21haW4vbWFpbi5jb250cm9sbGVyLmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGNsYXNzPVxcXCJyb3dcXFwiID5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImNvbCBzOSBtOVxcXCIgbmctcmVwZWF0PVxcXCJwb3N0IGluICRjdHJsLiRzY29wZS5wb3N0cyB0cmFjayBieSAkaW5kZXhcXFwiPlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNhcmQgYmx1ZSBkYXJrZW4tM1xcXCI+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImNhcmQtY29udGVudFxcXCI+XFxuICAgICAgICAgICAgICAgICAgICA8aDI+PGEgIGNsYXNzPVxcXCJ3aGl0ZS10ZXh0IHBvc3QtdGl0bGVcXFwiIGhyZWY9XFxcIi8jIS9wb3N0cy97e3Bvc3QucG9zdF9pZH19XFxcIj57e3Bvc3QudGl0bGV9fTwvYT48L2gyPlxcbiAgICAgICAgICAgICAgICAgICAgPGg1IGNsYXNzPVxcXCJibHVlLXRleHQgdGV4dC1saWdodGVuLTRcXFwiPnt7cG9zdC5zdWJ0aXRsZX19PC9oNT5cXG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVxcXCJibHVlLXRleHQgdGV4dC1saWdodGVuLTRcXFwiIHN0eWxlPVxcXCJ3aGl0ZS1zcGFjZTogcHJlLWxpbmVcXFwiPnt7cG9zdC5jb250ZW50IHwgbGltaXRUbzogMzAwfX0uLi48L3A+XFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBuZy1pZj1cXFwicG9zdC50YWdzXFxcIiBjbGFzcz1cXFwiY2FyZC1hY3Rpb25cXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJibHVlLXRleHQgdGV4dC1saWdodGVuLTJcXFwiPlRhZ3M8L3NwYW4+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gbmctcmVwZWF0PVxcXCJ0YWcgaW4gcG9zdC50YWdzXFxcIiBjbGFzcz1cXFwiY2hpcCBibHVlLXRleHQgdGV4dC1kYXJrZW4tMVxcXCI+e3t0YWd9fTwvc3Bhbj5cXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgPC9kaXY+XFxuICAgIDwvZGl2PlwiO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvbWFpbi9tYWluLmh0bWxcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgbmF2QmFyX2NvbnRyb2xsZXJfMSA9IHJlcXVpcmUoXCIuL25hdkJhci5jb250cm9sbGVyXCIpO1xudmFyIE5hdkNvbXBvbmVudCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBOYXZDb21wb25lbnQoKSB7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IG5hdkJhcl9jb250cm9sbGVyXzEuTmF2Q3RybDtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyQXMgPSBcIiRjdHJsXCI7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSByZXF1aXJlKFwiLi9uYXZCYXIuaHRtbFwiKTtcbiAgICB9XG4gICAgcmV0dXJuIE5hdkNvbXBvbmVudDtcbn0oKSk7XG5leHBvcnRzLk5hdkNvbXBvbmVudCA9IE5hdkNvbXBvbmVudDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvbmF2QmFyL25hdkJhci5jb21wb25lbnQuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgTmF2Q3RybCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBOYXZDdHJsKCkge1xuICAgIH1cbiAgICBOYXZDdHJsLnByb3RvdHlwZS4kb25Jbml0ID0gZnVuY3Rpb24gKCkge1xuICAgIH07XG4gICAgcmV0dXJuIE5hdkN0cmw7XG59KCkpO1xuZXhwb3J0cy5OYXZDdHJsID0gTmF2Q3RybDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvbmF2QmFyL25hdkJhci5jb250cm9sbGVyLmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGNsYXNzPVxcXCJuYXZiYXItZml4ZWRcXFwiPlxcbiAgPG5hdj5cXG4gICAgPGRpdiBjbGFzcz1cXFwibmF2LXdyYXBwZXIgYmx1ZSBkYXJrZW4tM1xcXCI+XFxuICAgICAgPGEgaHJlZj1cXFwiI1xcXCIgY2xhc3M9XFxcImJyYW5kLWxvZ29cXFwiPlRvdGFsbHk8L2E+XFxuICAgICAgPHVsIGlkPVxcXCJuYXYtbW9iaWxlXFxcIiBjbGFzcz1cXFwicmlnaHQgaGlkZS1vbi1tZWQtYW5kLWRvd25cXFwiPlxcbiAgICAgICAgPGxpPjxhIGhyZWY9XFxcIi9cXFwiPkhvbWU8L2E+PC9saT5cXG4gICAgICAgIDxsaT48YSBocmVmPVxcXCIvIyEvY3JlYXRlXFxcIj5Qb3N0PC9hPjwvbGk+XFxuICAgICAgPC91bD5cXG4gICAgPC9kaXY+XFxuICA8L25hdj5cXG48L2Rpdj5cXG5cIjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL25hdkJhci9uYXZCYXIuaHRtbFxuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBzaW5nbGVQb3N0X2NvbnRyb2xsZXJfMSA9IHJlcXVpcmUoXCIuL3NpbmdsZVBvc3QuY29udHJvbGxlclwiKTtcbnZhciBTaW5nbGVQb3N0Q29tcG9uZW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFNpbmdsZVBvc3RDb21wb25lbnQoKSB7XG4gICAgICAgIHRoaXMuY29udHJvbGxlciA9IHNpbmdsZVBvc3RfY29udHJvbGxlcl8xLlNpbmdsZVBvc3RDdHJsO1xuICAgICAgICB0aGlzLmNvbnRyb2xsZXJBcyA9IFwiJGN0cmxcIjtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IHJlcXVpcmUoXCIuL3NpbmdsZVBvc3QuaHRtbFwiKTtcbiAgICB9XG4gICAgcmV0dXJuIFNpbmdsZVBvc3RDb21wb25lbnQ7XG59KCkpO1xuZXhwb3J0cy5TaW5nbGVQb3N0Q29tcG9uZW50ID0gU2luZ2xlUG9zdENvbXBvbmVudDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbXBvbmVudHMvc2luZ2xlUG9zdC9zaW5nbGVQb3N0LmNvbXBvbmVudC5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBTaW5nbGVQb3N0Q3RybCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTaW5nbGVQb3N0Q3RybCgkaHR0cCwgZGF0YUFjY2Vzc1NlcnZpY2UsICRzY29wZSwgJGxvY2F0aW9uKSB7XG4gICAgICAgIHRoaXMuJGh0dHAgPSAkaHR0cDtcbiAgICAgICAgdGhpcy5kYXRhQWNjZXNzU2VydmljZSA9IGRhdGFBY2Nlc3NTZXJ2aWNlO1xuICAgICAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcbiAgICAgICAgdGhpcy4kbG9jYXRpb24gPSAkbG9jYXRpb247XG4gICAgfVxuICAgIFNpbmdsZVBvc3RDdHJsLnByb3RvdHlwZS4kb25Jbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLiRsb2NhdGlvbi5wYXRoKCkuc3BsaXQoJy8nKVsyXSk7XG4gICAgICAgIHRoaXMuZ2V0U2luZ2xlUG9zdCh0aGlzLiRsb2NhdGlvbi5wYXRoKCkuc3BsaXQoJy8nKVsyXSk7XG4gICAgfTtcbiAgICBTaW5nbGVQb3N0Q3RybC5wcm90b3R5cGUuZ2V0U2luZ2xlUG9zdCA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmRhdGFBY2Nlc3NTZXJ2aWNlXG4gICAgICAgICAgICAuZ2V0U2luZ2xlUG9zdFJlc291cmNlKGlkKVxuICAgICAgICAgICAgLnF1ZXJ5KGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICB2YXIgcG9zdE9iaiA9IGRhdGFbMF07XG4gICAgICAgICAgICBwb3N0T2JqLnRhZ3MgPSBwb3N0T2JqLnRhZ3Muc3BsaXQoJyAnKTtcbiAgICAgICAgICAgIF90aGlzLiRzY29wZS5wb3N0ID0gcG9zdE9iajtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBTaW5nbGVQb3N0Q3RybC5pbmplY3QgPSBbXCJkYXRhQWNjZXNzU2VydmljZVwiLCBcIiRzY29wZVwiLCBcIiRsb2NhdGlvblwiXTtcbiAgICByZXR1cm4gU2luZ2xlUG9zdEN0cmw7XG59KCkpO1xuZXhwb3J0cy5TaW5nbGVQb3N0Q3RybCA9IFNpbmdsZVBvc3RDdHJsO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9zaW5nbGVQb3N0L3NpbmdsZVBvc3QuY29udHJvbGxlci5qc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBjbGFzcz1cXFwiY29sIHM5IG05XFxcIj5cXG4gICAgPGRpdiBjbGFzcz1cXFwiY2FyZCBibHVlIGRhcmtlbi0zXFxcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImNhcmQtY29udGVudFxcXCI+XFxuICAgICAgICAgICAgPGgyIGNsYXNzPVxcXCJ3aGl0ZS10ZXh0IHBvc3QtdGl0bGVcXFwiPnt7JGN0cmwuJHNjb3BlLnBvc3QudGl0bGV9fTwvaDI+XFxuICAgICAgICAgICAgPGg1IGNsYXNzPVxcXCJibHVlLXRleHQgdGV4dC1saWdodGVuLTQgcG9zdC1zdWItdGl0bGVcXFwiPnt7JGN0cmwuJHNjb3BlLnBvc3Quc3VidGl0bGV9fTwvaDU+XFxuICAgICAgICAgICAgPHAgY2xhc3M9XFxcImJsdWUtdGV4dCB0ZXh0LWxpZ2h0ZW4tNFxcXCIgc3R5bGU9XFxcIndoaXRlLXNwYWNlOiBwcmUtbGluZVxcXCI+e3skY3RybC4kc2NvcGUucG9zdC5jb250ZW50fX08L3A+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxkaXYgbmctaWY9XFxcIiRjdHJsLiRzY29wZS5wb3N0LnRhZ3NcXFwiIGNsYXNzPVxcXCJjYXJkLWFjdGlvblxcXCI+XFxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XFxcImJsdWUtdGV4dCB0ZXh0LWxpZ2h0ZW4tMlxcXCI+VGFnczwvc3Bhbj5cXG4gICAgICAgICAgICA8c3BhbiBuZy1yZXBlYXQ9XFxcInRhZyBpbiAkY3RybC4kc2NvcGUucG9zdC50YWdzXFxcIiBjbGFzcz1cXFwiY2hpcCBibHVlLXRleHQgdGV4dC1kYXJrZW4tMVxcXCI+e3t0YWd9fTwvc3Bhbj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG48L2Rpdj5cIjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL3NpbmdsZVBvc3Qvc2luZ2xlUG9zdC5odG1sXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBuZXdQb3N0Rm9ybV9jb250cm9sbGVyXzEgPSByZXF1aXJlKFwiLi9uZXdQb3N0Rm9ybS5jb250cm9sbGVyXCIpO1xudmFyIEZvcm1Db21wb25lbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRm9ybUNvbXBvbmVudCgpIHtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyID0gbmV3UG9zdEZvcm1fY29udHJvbGxlcl8xLlBvc3RGb3JtQ3RybDtcbiAgICAgICAgdGhpcy5jb250cm9sbGVyQXMgPSBcIiRjdHJsXCI7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSByZXF1aXJlKFwiLi9uZXdQb3N0Rm9ybS5odG1sXCIpO1xuICAgIH1cbiAgICByZXR1cm4gRm9ybUNvbXBvbmVudDtcbn0oKSk7XG5leHBvcnRzLkZvcm1Db21wb25lbnQgPSBGb3JtQ29tcG9uZW50O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9uZXdQb3N0L25ld1Bvc3RGb3JtLmNvbXBvbmVudC5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgUG9zdEZvcm1DdHJsID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFBvc3RGb3JtQ3RybCgkc2NvcGUsIGRhdGFBY2Nlc3NTZXJ2aWNlLCAkaHR0cCwgJHJvb3RTY29wZSwgJGxvY2F0aW9uKSB7XG4gICAgICAgIHRoaXMuJHNjb3BlID0gJHNjb3BlO1xuICAgICAgICB0aGlzLmRhdGFBY2Nlc3NTZXJ2aWNlID0gZGF0YUFjY2Vzc1NlcnZpY2U7XG4gICAgICAgIHRoaXMuJGh0dHAgPSAkaHR0cDtcbiAgICAgICAgdGhpcy4kcm9vdFNjb3BlID0gJHJvb3RTY29wZTtcbiAgICAgICAgdGhpcy4kbG9jYXRpb24gPSAkbG9jYXRpb247XG4gICAgICAgIHRoaXMuZGF0YUFjY2Vzc1NlcnZpY2UgPSBkYXRhQWNjZXNzU2VydmljZTtcbiAgICB9XG4gICAgUG9zdEZvcm1DdHJsLnByb3RvdHlwZS5zdWJtaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBuZXdQb3N0T2JqZWN0ID0ge1xuICAgICAgICAgICAgdGl0bGU6IHRoaXMuJHNjb3BlLnRpdGxlLFxuICAgICAgICAgICAgc3VidGl0bGU6IHRoaXMuJHNjb3BlLnN1YnRpdGxlLFxuICAgICAgICAgICAgY29udGVudDogdGhpcy4kc2NvcGUuY29udGVudCxcbiAgICAgICAgICAgIHRhZ3M6IHRoaXMuJHNjb3BlLnRhZ3NcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zZW5kTmV3UG9zdChuZXdQb3N0T2JqZWN0KTtcbiAgICB9O1xuICAgIFBvc3RGb3JtQ3RybC5wcm90b3R5cGUuc2VuZE5ld1Bvc3QgPSBmdW5jdGlvbiAocG9zdE9iaikge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLiRodHRwKHtcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgICB1cmw6IFwiaHR0cDovL2xvY2FsaG9zdDozMDAwL3Bvc3RzXCIsXG4gICAgICAgICAgICBkYXRhOiBwb3N0T2JqLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykgeyByZXR1cm4gX3RoaXMuaGFuZGxlTmV3UG9zdFJlc3BvbnNlKHJlcyk7IH0pXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycikgeyByZXR1cm4gY29uc29sZS5sb2coZXJyKTsgfSk7XG4gICAgfTtcbiAgICBQb3N0Rm9ybUN0cmwucHJvdG90eXBlLmhhbmRsZU5ld1Bvc3RSZXNwb25zZSA9IGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgdGhpcy4kcm9vdFNjb3BlLiRicm9hZGNhc3QoXCJQT1NUX1NVQk1JVFRFRFwiKTtcbiAgICAgICAgdGhpcy4kbG9jYXRpb24ucGF0aChcIi9cIik7XG4gICAgfTtcbiAgICBQb3N0Rm9ybUN0cmwuJGluamVjdCA9IFtcIiRzY29wZVwiLCBcImRhdGFBY2Nlc3NTZXJ2aWNlXCIsIFwiJGh0dHBcIiwgXCIkcm9vdFNjb3BlXCIsIFwiJGxvY2F0aW9uXCJdO1xuICAgIHJldHVybiBQb3N0Rm9ybUN0cmw7XG59KCkpO1xuZXhwb3J0cy5Qb3N0Rm9ybUN0cmwgPSBQb3N0Rm9ybUN0cmw7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb21wb25lbnRzL25ld1Bvc3QvbmV3UG9zdEZvcm0uY29udHJvbGxlci5qc1xuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBcIjwhLS0gTW9kYWwgU3RydWN0dXJlIC0tPlxcbjxkaXYgY2xhc3M9XFxcImNhcmQgYmx1ZSBkYXJrZW4tMyBjb2wtczlcXFwiPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJjYXJkLWNvbnRlbnRcXFwiPlxcbiAgICAgICAgPGZvcm0gbmFtZT1cXFwiJGN0cmwucG9zdEZvcm1cXFwiIG5nLXN1Ym1pdD1cXFwiJGN0cmwuc3VibWl0KClcXFwiPlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImlucHV0LWZpZWxkIGNvbCBzNlxcXCI+XFxuICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cXFwidGl0bGVcXFwiIHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJ2YWxpZGF0ZSB3aGl0ZS10ZXh0XFxcIiBuZy1tb2RlbD1cXFwidGl0bGVcXFwiPlxcbiAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVxcXCJ0aXRsZVxcXCI+VGl0bGU8L2xhYmVsPlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImlucHV0LWZpZWxkIGNvbCBzNlxcXCI+XFxuICAgICAgICAgICAgICAgIDxpbnB1dCBpZD1cXFwic3VidGl0bGVcXFwiIHR5cGU9XFxcInRleHRcXFwiIGNsYXNzPVxcXCJ2YWxpZGF0ZSB3aGl0ZS10ZXh0XFxcIiBuZy1tb2RlbD1cXFwic3VidGl0bGVcXFwiPlxcbiAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVxcXCJzdWJ0aXRsZVxcXCI+U3VidGl0bGU8L2xhYmVsPlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImlucHV0LWZpZWxkIGNvbCBzNlxcXCI+XFxuICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBpZD1cXFwiY29udGVudFxcXCIgdHlwZT1cXFwidGV4dGFyZWFcXFwiIGNsYXNzPVxcXCJ2YWxpZGF0ZSB3aGl0ZS10ZXh0IG1hdGVyaWFsaXplLXRleHRhcmVhXFxcIiBuZy1tb2RlbD1cXFwiY29udGVudFxcXCI+PC90ZXh0YXJlYT5cXG4gICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cXFwiY29udGVudFxcXCI+Q29udGVudDwvbGFiZWw+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiaW5wdXQtZmllbGQgY29sIHM2XFxcIj5cXG4gICAgICAgICAgICAgICAgPGlucHV0IGlkPVxcXCJ0YWdzXFxcIiB0eXBlPVxcXCJ0ZXh0XFxcIiBjbGFzcz1cXFwidmFsaWRhdGUgd2hpdGUtdGV4dFxcXCIgbmctbW9kZWw9XFxcInRhZ3NcXFwiPjwvaW5wdXQ+XFxuICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XFxcInRhZ3NcXFwiPlRhZ3M8L2xhYmVsPlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgXFxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cXFwid2F2ZXMtZWZmZWN0IHdhdmVzLWxpZ2h0IGJ0biB3aGl0ZSBibHVlLXRleHQgZGFya2VuLXRleHQtM1xcXCIgdHlwZT1cXFwic3VibWl0XFxcIj5TdWJtaXQ8L2J1dHRvbj5cXG4gICAgICAgIDwvZm9ybT5cXG4gICAgPC9kaXY+XFxuPC9kaXY+XFxuXCI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29tcG9uZW50cy9uZXdQb3N0L25ld1Bvc3RGb3JtLmh0bWxcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIERhdGFBY2Nlc3NTZXJ2aWNlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERhdGFBY2Nlc3NTZXJ2aWNlKCRyZXNvdXJjZSkge1xuICAgICAgICB0aGlzLiRyZXNvdXJjZSA9ICRyZXNvdXJjZTtcbiAgICB9XG4gICAgLy8gVGhlIGFjdHVhbCBzZXJ2aWNlLiBSZXNvdXJjZSBDbGFzcyBpcyBhIGdlbmVyaWMgaW50ZXJmYWNlLiBBcHBseWluZyBvdXIgY3VzdG9tIElVc2VyUmVzb3VyY2UgaW50ZXJmYWNlIHRvIGl0XG4gICAgLy8gd2lsbCByZXF1aXJlIG91ciBjdXN0b20gdHlwZSB0byBiZSByZXR1cm5lZCBmcm9tIHRoZSBhamF4IHJlcXVlc3RcbiAgICBEYXRhQWNjZXNzU2VydmljZS5wcm90b3R5cGUuZ2V0UG9zdHNSZXNvdXJjZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJHJlc291cmNlKFwiaHR0cDovL2xvY2FsaG9zdDozMDAwL3Bvc3RzXCIsIG51bGwsIHtcbiAgICAgICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgICAgICBpc0FycmF5OiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgRGF0YUFjY2Vzc1NlcnZpY2UucHJvdG90eXBlLmdldFNpbmdsZVBvc3RSZXNvdXJjZSA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kcmVzb3VyY2UoXCJodHRwOi8vbG9jYWxob3N0OjMwMDAvcG9zdC86cG9zdF9pZFwiLCB7IHBvc3RfaWQ6IGlkIH0sIHtcbiAgICAgICAgICAgIGdldDoge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgICAgICAgaXNBcnJheTogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICAvLyBTdGF0aWMgaW5qZWN0aW9uIG1ha2VzICRyZXNvdXJjZSBhdmFpbGFibGUgb24gdGhlIGNsYXNzLCBpbnN0ZWFkIG9mIG9ubHkgb24gdGhlIGluc3RhbmNlXG4gICAgRGF0YUFjY2Vzc1NlcnZpY2UuJGluamVjdCA9IFtcIiRyZXNvdXJjZVwiXTtcbiAgICByZXR1cm4gRGF0YUFjY2Vzc1NlcnZpY2U7XG59KCkpO1xuZXhwb3J0cy5EYXRhQWNjZXNzU2VydmljZSA9IERhdGFBY2Nlc3NTZXJ2aWNlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvc2VydmljZXMvc2VydmljZXMuanNcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=