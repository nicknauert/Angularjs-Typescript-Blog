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
