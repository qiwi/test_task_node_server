import { Controller, ItemValidator } from 'innots';
import { Context } from 'koa';
import { BillsModel } from '../models/bills';

const billsModel = new BillsModel();

export class Bills extends Controller {
    public getItem = async (ctx: Context): Promise<void> => {
        const idBills: number = this.validate(ctx, (validator: ItemValidator) => {
            return validator.isInt('id');
        });

        ctx.body = await billsModel.getItem(idBills);
    }

    public getItems = async (ctx: Context): Promise<void> => {
        ctx.body = await billsModel.getItems();
    }

    public getItemsByDates = async (ctx: Context): Promise<void> => {
        const filterData = this.validate(ctx, (validator: ItemValidator) => {
            return {
                from: validator.isString('from'),
                to: validator.isString('to')
            };
        });

        ctx.body = await billsModel.getItemsByDates(filterData.from, filterData.to);
    }
}
