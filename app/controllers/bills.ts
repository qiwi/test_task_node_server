import { Controller, ItemValidator } from 'innots';
import { Context } from 'koa';
import { BillsModel } from '../models/bills';

const billsModel = new BillsModel();

export class Bills extends Controller {

    // public getItems = async (ctx: Context): Promise<void> => {
    //     ctx.body = await billsModel.getItems();
    // }

    public getItems = async (ctx: Context): Promise<void> => {
        const billsDateFrom: string = this.validate(ctx, (validator: ItemValidator) => {
            return validator.optional.isString('from');
        });
        const billsDateTo: string = this.validate(ctx, (validator: ItemValidator) => {
            return validator.optional.isString('to');
        });

        ctx.body = await billsModel.getItems(billsDateFrom, billsDateTo);

    }

}