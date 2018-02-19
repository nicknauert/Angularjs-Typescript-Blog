/// <reference path="./_fix.d.ts" />

import { ControllerM } from "./controllers"


export module ComponentsM {

    export class NavComponent implements ng.IComponentOptions {
        
        public controller: ng.Injectable<ng.IControllerConstructor>;
        public controllerAs: string;
        public template;

        constructor(){
            this.controller = ControllerM.NavCtrl;
            this.controllerAs = "$ctrl";
            this.template = require("../public/partials/navBar.html")
        }

    }

    export class MainComponent implements ng.IComponentOptions {

        public controller: ng.Injectable<ng.IControllerConstructor>;
        public controllerAs: string;
        public template: string;
    
        constructor() {
            this.controller = ControllerM.MainCtrl;
            this.controllerAs = "$ctrl";
            this.template = require("../public/partials/mainComponent.html")
        }
    }

    export class FormComponent implements ng.IComponentOptions {

        public controller: ng.Injectable<ng.IControllerConstructor>;
        public controllerAs: string;
        public template: string;
    
        constructor() {
            this.controller = ControllerM.PostFormCtrl;
            this.controllerAs = "$ctrl";
            this.template = require("../public/partials/newPostForm.html")
        }
    }
}