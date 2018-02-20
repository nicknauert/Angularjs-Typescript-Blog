/// <reference path="../../node_modules/@types/angular-resource/index.d.ts" />

export module ServicesM {

    // Defines an interface for the service itself.
    interface IDataAccessService {
        getPostsResource(): ng.resource.IResourceClass<IPostResource>
    }

    // This creates a resource template using our basic IUser interface. This lays the
    // groundwork to create the resource service farther down
    interface IPostResource extends ng.resource.IResource<Models.IPost> {}

    export class DataAccessService implements IDataAccessService {

        // Static injection makes $resource available on the class, instead of only on the instance
        static $inject = ["$resource"];

        constructor( private $resource: ng.resource.IResourceService){}

        // The actual service. Resource Class is a generic interface. Applying our custom IUserResource interface to it
        // will require our custom type to be returned from the ajax request
        getPostsResource(): ng.resource.IResourceClass<IPostResource> {
            return this.$resource("http://localhost:3000/posts", null, {
                query: {
                    method: 'GET',
                    isArray: true
                }
            });
        }

        getSinglePostResource(id): ng.resource.IResourceClass<IPostResource> {
            return this.$resource("http://localhost:3000/posts/:post_id", { post_id: id }, {
                get: {
                    method: 'GET',
                    isArray: false
                }
            });
        }
    }
}

export module Models {

    export interface IPost {
        title: string;
        subtitle: string;
        content: string;
        tags: string;
    }

}