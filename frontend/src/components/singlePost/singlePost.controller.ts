import { IPostCtrlScope } from "./singlePost.models"
import { DataAccessService } from '../../services/services'

export class SinglePostCtrl implements ng.IController {
        

    static inject: string[] = ["dataAccessService", "$scope", "$location"]

    constructor
        (
            private $http: ng.IHttpService,
            private dataAccessService: DataAccessService,
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