import { Controller, InnoError, ItemValidator } from 'innots';
import { Context } from 'koa';
import { isISO8601 } from 'validator';
import { AggrBillsModel } from '../models/aggr_bills';

const aggrBillsModel = new AggrBillsModel();

export class AggrBills extends Controller {
    public getItems = async (ctx: Context): Promise<void> => {
        const limit: number = this.validate(ctx, (validator: ItemValidator) =>
            validator.optional.isInt('limit', 0)
        );

        const offset: number = this.validate(ctx, (validator: ItemValidator) =>
            validator.optional.isInt('offset', 0)
        );

        const startDateString: string = this.validate(ctx, (validator: ItemValidator) =>
            validator.optional.isString('startDate')
        );

        const endDateString: string = this.validate(ctx, (validator: ItemValidator) =>
            validator.optional.isString('endDate')
        );

        if (startDateString && !isISO8601(startDateString)) {
            throw new InnoError('VALIDATION_NO_DATE', 400, {
                invalidField: 'startDate',
                invalidValue: startDateString
            });
        }

        if (endDateString && !isISO8601(endDateString)) {
            throw new InnoError('VALIDATION_NO_DATE', 400, {
                invalidField: 'endDate',
                invalidValue: endDateString
            });
        }

        const endDate = endDateString && new Date(endDateString);
        const startDate = startDateString && new Date(startDateString);

        ctx.body = await aggrBillsModel.getItems({
            limit,
            offset,
            startDate,
            endDate
        });
    }
}
