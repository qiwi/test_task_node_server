import { Controller, ItemValidator } from 'innots';
import { Context } from 'koa';
import { UsersModel } from '../models/users';

const usersModel = new UsersModel();

export class Users extends Controller {
    public getItems = async (ctx: Context): Promise<void> => {
        ctx.body = await usersModel.getItems();
    }

    public getItem = async (ctx: Context): Promise<void> => {
        const idUser: number = this.validate(ctx, (validator: ItemValidator) => {
            return validator.isInt('id');
        });

        ctx.body = await usersModel.getItem(idUser);
    }

    public getItemByEmail = async (ctx: Context): Promise<void> => {
        const emailUser: string = this.validate(ctx, (validator: ItemValidator) => {
            return validator.isString('email');
        });

        ctx.body = await usersModel.getItemByEmail(emailUser);
    }
}
