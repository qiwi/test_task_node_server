import { Controller, ItemValidator } from 'innots';
import { Context } from 'koa';
import { AggrBillsModel } from '../models/aggrbills';

const aggrBillsModel = new AggrBillsModel();

export class AggrBills extends Controller {

    public getItems = async (ctx: Context): Promise<void> => {
        ctx.body = await aggrBillsModel.getItems();
    }

    public getItem = async (ctx: Context): Promise<void> => {
        const idBills: number = this.validate(ctx, (validator: ItemValidator) => {
            return validator.isInt('idBills');
        });

        ctx.body = await aggrBillsModel.getItem(idBills);
    }
}