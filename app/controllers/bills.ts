import { Controller, ItemValidator } from 'innots';
import { Context } from 'koa';
import { BillsModel } from '../models/bills';

const billsModel = new BillsModel();

export class BillsController extends Controller {

    public getItems = async (ctx: Context): Promise<void> => {
        ctx.body = await billsModel.getItems();
    }

    public getRange = async (ctx: Context): Promise<void> => {
        const data = this.validate(ctx, (validator: ItemValidator) => {
            return {
                start: validator.isString('start'), // datatime
                end: validator.isString('end') // datatime
            };
        });

        ctx.body = await billsModel.getRange(data.start, data.end);
    }

    public getLast = async (ctx: Context): Promise<void> => {
        const quantity = this.validate(ctx, (validator: ItemValidator) => {
            return validator.isInt('quantity');
        });

        ctx.body = await billsModel.getLast(quantity);
    }
}
