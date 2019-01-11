import { Controller, ItemValidator } from 'innots';
import { Context } from 'koa';
import { BillsModel } from '../models/bills';


const billsModel = new BillsModel();

export class Bills extends Controller {

    public getItems = async (ctx: Context): Promise<void> => {
        ctx.body = await billsModel.getItems();
    }

    public getItem = async (ctx: Context): Promise<void> => {
        const idBill: number = this.validate(ctx, (validator: ItemValidator) => {
            return validator.isInt('idBill');
        }
        );
        ctx.body = await billsModel.getItem(idBill);
    }
    public getItemsDate = async (ctx: Context): Promise<void> => {
        const fromDate: Date = this.validate(ctx, (validator: ItemValidator) => {
                return validator.isString('fromDate');
            }
        );
        const toDate: Date = this.validate(ctx, (validator: ItemValidator) => {
            return validator.isString('toDate');
        });

        ctx.body = await billsModel.getItemsDate(fromDate, toDate);
    }
}