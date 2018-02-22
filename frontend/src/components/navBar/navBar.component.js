"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var navBar_controller_1 = require("./navBar.controller");
var NavComponent = /** @class */ (function () {
    function NavComponent() {
        this.controller = navBar_controller_1.NavCtrl;
        this.controllerAs = "$ctrl";
        this.template = require("./navBar.html");
    }
    return NavComponent;
}());
exports.NavComponent = NavComponent;
