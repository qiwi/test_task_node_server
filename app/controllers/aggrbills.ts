import { Controller, ItemValidator } from 'innots';
import { Context } from 'koa';
import { AggrBillsModel } from '../models/aggrbills';

const aggrBillsModel = new AggrBillsModel();

export class AggrBillsController extends Controller {

    public getItems = async (ctx: Context): Promise<void> => {
        const fromDate: Date = this.validate(ctx, (validator: ItemValidator) => {
            return validator.optional.isDate('fromDate');
        });
        const toDate: Date = this.validate(ctx, (validator: ItemValidator) => {
            return validator.optional.isDate('toDate');
        });
        ctx.body = await aggrBillsModel.getItemsByDateRange(fromDate || new Date(0), toDate || new Date());
    }

    public getItem = async (ctx: Context): Promise<void> => {
        const idBills: number = this.validate(ctx, (validator: ItemValidator) => {
            return validator.isInt('id');
        });

        ctx.body = await aggrBillsModel.getItem(idBills);
    }
}
