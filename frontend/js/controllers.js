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
