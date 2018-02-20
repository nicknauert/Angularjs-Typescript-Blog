"use strict";
/// <reference path="./_fix.d.ts" />
Object.defineProperty(exports, "__esModule", { value: true });
var controllers_1 = require("./controllers");
var ComponentsM;
(function (ComponentsM) {
    var NavComponent = /** @class */ (function () {
        function NavComponent() {
            this.controller = controllers_1.ControllerM.NavCtrl;
            this.controllerAs = "$ctrl";
            this.template = require("../public/partials/navBar.html");
        }
        return NavComponent;
    }());
    ComponentsM.NavComponent = NavComponent;
    var MainComponent = /** @class */ (function () {
        function MainComponent() {
            this.controller = controllers_1.ControllerM.MainCtrl;
            this.controllerAs = "$ctrl";
            this.template = require("../public/partials/mainComponent.html");
        }
        return MainComponent;
    }());
    ComponentsM.MainComponent = MainComponent;
    var SinglePostComponent = /** @class */ (function () {
        function SinglePostComponent() {
            this.controller = controllers_1.ControllerM.SinglePostCtrl;
            this.controllerAs = "$ctrl";
            this.template = require("../public/partials/singlePost.html");
        }
        return SinglePostComponent;
    }());
    ComponentsM.SinglePostComponent = SinglePostComponent;
    var FormComponent = /** @class */ (function () {
        function FormComponent() {
            this.controller = controllers_1.ControllerM.PostFormCtrl;
            this.controllerAs = "$ctrl";
            this.template = require("../public/partials/newPostForm.html");
        }
        return FormComponent;
    }());
    ComponentsM.FormComponent = FormComponent;
})(ComponentsM = exports.ComponentsM || (exports.ComponentsM = {}));
