import { IPost } from '../../publicModels/models';

export interface IMainCtrlScope extends ng.IScope {
    posts: IPost[];
}