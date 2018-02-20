/// <reference path="../../node_modules/@types/angular-resource/index.d.ts" />

import { IHttpResponse, IHttpService, IFilterService } from "angular";
import { ServicesM, Models } from "./services";

export module ControllerM {

    ///////////////////////////////
    // MAIN CONTROLLER 
    ///////////////

    interface IMainCtrlScope extends ng.IScope {
        posts: Models.IPost[];
    }

    export class MainCtrl implements ng.IController {

        static inject: string[] = ["dataAccessService", "$scope", "$filter"]

        constructor
            (
                private $http: ng.IHttpService,
                private dataAccessService: ServicesM.DataAccessService,
                private $scope: IMainCtrlScope,
                private $filter: IFilterService
            ){
                this.$scope.$on("POST_SUBMITTED", () => {
                    this.getPostList();
                })
            }

            $onInit(){
                console.log("init");
                this.getPostList();
            }

            getPostList(){
                this.dataAccessService
                    .getPostsResource()
                    .query(data => {
                        let formattedData = data.map( post => {
                            if(post.tags){
                                post.tags = post.tags.split(' ');
                            }
                            return post
                        });
                        console.log(formattedData);
                        this.$scope.posts = formattedData;
                    })
            }
    }

    ///////////////////////////////
    // SINGLE POST CONTROLLER
    ///////////////

    interface IPostCtrlScope extends ng.IScope{
        post;
    }

    export class SinglePostCtrl implements ng.IController {
        

        static inject: string[] = ["dataAccessService", "$scope", "$location"]

        constructor
            (
                private $http: ng.IHttpService,
                private dataAccessService: ServicesM.DataAccessService,
                private $scope: IPostCtrlScope,
                private $location: ng.ILocationService
            ){
                
            }

        $onInit(){
            console.log(this.$location.path().split('/')[2]);
            this.getSinglePost( this.$location.path().split('/')[2] )
        }

        getSinglePost(id){
            this.dataAccessService
                .getSinglePostResource(id)
                .query(data => {
                    let postObj = data[0];
                    postObj.tags = postObj.tags.split(' ');
                    this.$scope.post = postObj
                })
        }

    }

    
    ///////////////////////////////
    // NEW POST FORM CONTROLLER
    ///////////////
    
    interface IPostFormScope extends ng.IScope {
        title: string;
        subtitle: string;
        content: string;
        tags: string;
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

        submit(): void{
            var newPostObject: Models.IPost = {
                title: this.$scope.title,
                subtitle: this.$scope.subtitle,
                content: this.$scope.content,
                tags: this.$scope.tags
            }
            this.sendNewPost(newPostObject);
        }

        sendNewPost(postObj){
            this.$http({
                method: "POST",
                url: "http://localhost:3000/posts",
                data: postObj,
                headers: {
                    'Content-Type': "application/json"
                }})
                .then(res => this.handleNewPostResponse(res))
                .catch( err => console.log(err));
        }

        handleNewPostResponse(res): void{
                this.$rootScope.$broadcast("POST_SUBMITTED")
                this.$location.path("/")
        }
    }

    export class NavCtrl implements ng.IController {
        public $onInit(){
        }
    }
}