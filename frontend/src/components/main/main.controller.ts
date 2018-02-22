import { DataAccessService } from '../../services/services'
import { IMainCtrlScope } from './main.models'
import { IHttpResponse, IHttpService, IFilterService } from "angular";


export class MainCtrl implements ng.IController {

    static inject: string[] = ["dataAccessService", "$scope", "$filter"]

    constructor
        (
            private $http: ng.IHttpService,
            private dataAccessService: DataAccessService,
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