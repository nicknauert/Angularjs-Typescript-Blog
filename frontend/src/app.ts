/// <reference path="./declarations/_fix.d.ts" />
/// <reference path="../../node_modules/@types/angular-resource/index.d.ts" />

import { MainComponent, FormComponent, NavComponent, SinglePostComponent } from './components/index'
import { DataAccessService } from "./services/services"

module app {

    export class Module {
        
        app: ng.IModule;
        static $inject = ["ngResource", "ngRoute"]
        
        constructor(name:string, modules: Array<string> ){
            this.app = angular.module(name, modules);
        }
        
        addController( name: string, controller ){
            this.app.controller( name, controller )
        }

        addService(name: string, serviceFunc ) {
            this.app.service( name, serviceFunc );

        }        

        addComponent(name: string, component){
            this.app.component(name, component);
        }

        config(){
            this.app.config([ "$httpProvider", "$qProvider", "$routeProvider", function($httpProvider, $qProvider, $routeProvider){
                $httpProvider.defaults.useXDomain = true;
                delete $httpProvider.defaults.headers.common['X-Requested-With'];
                $qProvider.errorOnUnhandledRejections(false);

                // ROUTING
                $routeProvider
                    .when('/', {
                        templateUrl: "./views/post_view.html"
                    })
                    .when('/posts/:post_id', {
                        templateUrl: './views/single_post_view.html'
                    })
                    .when('/create', {
                        templateUrl: "./views/new_post_view.html"
                    })

            }])
        }

    }
}


module MyTestApp {
    var myApp = new app.Module('myApp', ["ngResource", "ngRoute"]);
    myApp.config();
    myApp.addComponent('navBar', new NavComponent());
    myApp.addComponent('mainComponent', new MainComponent());
    myApp.addComponent('newPostForm', new FormComponent());
    myApp.addComponent('singlePost', new SinglePostComponent());
    myApp.addService("dataAccessService", DataAccessService);
}