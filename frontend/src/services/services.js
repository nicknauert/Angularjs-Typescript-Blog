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
