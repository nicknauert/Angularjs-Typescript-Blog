import { PostFormCtrl } from './newPostForm.controller'

export class FormComponent implements ng.IComponentOptions {

    public controller: ng.Injectable<ng.IControllerConstructor>;
    public controllerAs: string;
    public template: string;

    constructor() {
        this.controller = PostFormCtrl;
        this.controllerAs = "$ctrl";
        this.template = require("./newPostForm.html")
    }
}