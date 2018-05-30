import { Controller, ItemValidator, ValidationError } from 'innots';
import { Context } from 'koa';
import { AggrBillsModel } from '../models/aggrBills';

const aggrBillsModel = new AggrBillsModel();

export class AggrBills extends Controller {

    public getItems = async (ctx: Context): Promise<void> => {
        const fromDate: Date = this.validate(ctx, (validator: ItemValidator) => {
            return validator.optional.isDate('fromDate');
        });

        const toDate: Date = this.validate(ctx, (validator: ItemValidator) => {
            return validator.optional.isDate('toDate');
        });

        if (fromDate > toDate) {
            throw new ValidationError(ValidationError.VALIDATION);
        }

        ctx.body = await aggrBillsModel.getItems(fromDate, toDate);
    }
}