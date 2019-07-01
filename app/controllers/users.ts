import {Controller, ItemValidator} from 'innots';
import {Context} from 'koa';
import {UsersModel} from '../models/users';

const usersModel = new UsersModel();

export class UsersController extends Controller {

    public getItems = async (ctx: Context): Promise<void> => {
        ctx.body = await usersModel.getItems();
    }

    public getItem = async (ctx: Context): Promise<void> => {
        const idUser: number = this.validate(ctx, (validator: ItemValidator) => {
            return validator.isInt('id');
        });

        ctx.body = await usersModel.getItem(idUser);
    }
}