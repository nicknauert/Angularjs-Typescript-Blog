"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var newPostForm_controller_1 = require("./newPostForm.controller");
var FormComponent = /** @class */ (function () {
    function FormComponent() {
        this.controller = newPostForm_controller_1.PostFormCtrl;
        this.controllerAs = "$ctrl";
        this.template = require("./newPostForm.html");
    }
    return FormComponent;
}());
exports.FormComponent = FormComponent;
