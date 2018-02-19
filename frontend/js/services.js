"use strict";
/// <reference path="../../node_modules/@types/angular-resource/index.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var ServicesM;
(function (ServicesM) {
    var DataAccessService = /** @class */ (function () {
        function DataAccessService($resource) {
            this.$resource = $resource;
            this.users = [];
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
        // Static injection makes $resource available on the class, instead of only on the instance
        DataAccessService.$inject = ["$resource"];
        return DataAccessService;
    }());
    ServicesM.DataAccessService = DataAccessService;
})(ServicesM = exports.ServicesM || (exports.ServicesM = {}));
