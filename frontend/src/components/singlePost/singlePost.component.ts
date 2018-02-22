import { SinglePostCtrl } from "./singlePost.controller";

export class SinglePostComponent implements ng.IComponentOptions {

    public controller: ng.Injectable<ng.IControllerConstructor>;
    public controllerAs: string;
    public template: string;

    constructor() {
        this.controller = SinglePostCtrl;
        this.controllerAs = "$ctrl";
        this.template = require("./singlePost.html")
    }
}