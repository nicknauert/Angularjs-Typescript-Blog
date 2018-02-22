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
