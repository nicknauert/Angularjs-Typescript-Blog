import { DataAccessService } from '../../services/services'
import { IPostFormScope } from './newPostForm.models'
import { IPost } from '../../publicModels/models';

export class PostFormCtrl implements ng.IController {

    postForm: ng.IFormController

    static $inject=["$scope", "dataAccessService", "$http", "$rootScope", "$location"]
    constructor(private $scope: IPostFormScope,
        private dataAccessService: DataAccessService,
        private $http: ng.IHttpService,
        private $rootScope: ng.IRootScopeService,
        private $location){
        this.dataAccessService = dataAccessService
    }

    submit(): void{
        var newPostObject: IPost = {
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