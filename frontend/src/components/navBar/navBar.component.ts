import { NavCtrl } from './navBar.controller'

export class NavComponent implements ng.IComponentOptions {
        
    public controller: ng.Injectable<ng.IControllerConstructor>;
    public controllerAs: string;
    public template;

    constructor(){
        this.controller = NavCtrl;
        this.controllerAs = "$ctrl";
        this.template = require("./navBar.html")
    }

}