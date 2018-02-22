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
