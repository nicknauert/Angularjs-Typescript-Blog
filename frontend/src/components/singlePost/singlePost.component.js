"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var singlePost_controller_1 = require("./singlePost.controller");
var SinglePostComponent = /** @class */ (function () {
    function SinglePostComponent() {
        this.controller = singlePost_controller_1.SinglePostCtrl;
        this.controllerAs = "$ctrl";
        this.template = require("./singlePost.html");
    }
    return SinglePostComponent;
}());
exports.SinglePostComponent = SinglePostComponent;
