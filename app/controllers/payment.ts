import {Controller, ItemValidator, ValidationError} from 'innots';
import { Context } from 'koa';
import { PaymentsModel } from '../models/payments';

const paymentsModel = new PaymentsModel();

export class Payments extends Controller {

    public getItems = async (ctx: Context): Promise<void> => {
        const fromDate: Date = this.validate(ctx, (validator: ItemValidator) => {
            return validator.optional.isDate('from_date');
        });

        const toDate: Date = this.validate(ctx, (validator: ItemValidator) => {
            return validator.optional.isDate('to_date');
        });
        if (fromDate > toDate) {
            throw new ValidationError(ValidationError.VALIDATION);
        }
        ctx.body = await paymentsModel.getItems(fromDate, toDate);
    }
}