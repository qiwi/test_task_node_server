import { Controller, ItemValidator } from 'innots';
import { Context } from 'koa';
import { BillsModel } from '../models/bills';

const billsModel = new BillsModel();

export class BillsController extends Controller {

    public getItems = async (ctx: Context): Promise<void> => {
        ctx.body = await billsModel.getItems();
    }

    // public getItem = async (ctx: Context): Promise<void> => {
    //     const idUser: number = this.validate(ctx, (validator: ItemValidator) => {
    //         return validator.isInt('id');
    //     });

    //     ctx.body = await billsModel.getItem(idUser);
    // }
}
