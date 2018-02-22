import { MainCtrl } from "./main.controller"

export class MainComponent implements ng.IComponentOptions {

    public controller: ng.Injectable<ng.IControllerConstructor>;
    public controllerAs: string;
    public template: string;

    constructor() {
        this.controller = MainCtrl;
        this.controllerAs = "$ctrl";
        this.template = require("./main.html")
    }
}