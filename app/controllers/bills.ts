import { Controller, ItemValidator } from 'innots';
import { Context } from 'koa';
import { BillsModel } from '../models/bills';
import { InnoError } from 'innots';

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

        const dateRegexValidation = /^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z$)/;
        if (!dateRegexValidation.test(ctx.query.fromDate) || !dateRegexValidation.test(ctx.query.toDate)) {
            throw new InnoError('WRONG_DATE_FORMAT', 400, {});
        }

        const filterData = this.validate(ctx, (validator: ItemValidator) => {
            return {
                fromDate: validator.isString('fromDate'),
                toDate: validator.isString('toDate')
            };
        });

        ctx.body = await billsModel.getItemsByDates(filterData.fromDate, filterData.toDate);
    }
}
