"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var main_controller_1 = require("./main.controller");
var MainComponent = /** @class */ (function () {
    function MainComponent() {
        this.controller = main_controller_1.MainCtrl;
        this.controllerAs = "$ctrl";
        this.template = require("./main.html");
    }
    return MainComponent;
}());
exports.MainComponent = MainComponent;
