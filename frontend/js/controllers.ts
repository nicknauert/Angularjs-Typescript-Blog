/// <reference path="../../node_modules/@types/angular-resource/index.d.ts" />

import { IHttpResponse, IHttpService } from "angular";
import { ServicesM, Models } from "./services";




export module ControllerM {

    ///////////////////////////////
    // MAIN CONTROLLER
    ///////////////

    interface IMainCtrlScope extends ng.IScope {
        posts: Models.IPost[];
    }

    export class MainCtrl implements ng.IController {

        static inject: string[] = ["dataAccessService", "$scope"]

        constructor(private $http: ng.IHttpService,
            private dataAccessService: ServicesM.DataAccessService,
            private $scope: IMainCtrlScope) {
            dataAccessService
                .getPostsResource()
                .query(data => {
                    console.log(data);
                    this.$scope.posts = data;
                })
            this.$scope.$on("POST_SUBMITTED", () => {
                dataAccessService
                    .getPostsResource()
                    .query(data => {
                        this.$scope.posts = data;
                    })
            })
        }


    }

    
    ///////////////////////////////
    // NEW USER FORM CONTROLLER
    ///////////////
    
    interface IPostFormScope extends ng.IScope {
        title: string;
        subtitle: string;
        content: string;
    }

    export class PostFormCtrl implements ng.IController {

        postForm: ng.IFormController

        static $inject=["$scope", "dataAccessService", "$http", "$rootScope", "$location"]
        constructor(private $scope: IPostFormScope,
            private dataAccessService: ServicesM.DataAccessService,
            private $http: IHttpService,
            private $rootScope: ng.IRootScopeService,
            private $location){
            this.dataAccessService = dataAccessService
        }

        submit(){
            var newPostObject: Models.IPost = {
                title: this.$scope.title,
                subtitle: this.$scope.subtitle,
                content: this.$scope.content,
            }

            this.$http({
                method: "POST",
                url: "http://localhost:3000/posts",
                data: newPostObject,
                headers: {
                    'Content-Type': "application/json"
                }}).then( res => {
                    this.$rootScope.$broadcast("POST_SUBMITTED")
                    console.log("Post Form Ctrl Broadcasted");
                    this.$location.path("/")
                })
            
            return true;
        }

    }

    export class NavCtrl implements ng.IController {
        public $onInit(){
        }
    }
}