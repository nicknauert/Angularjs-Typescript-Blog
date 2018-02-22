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
