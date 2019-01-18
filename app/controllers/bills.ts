import { Controller, InnoError, ItemValidator } from 'innots';
import { Context } from 'koa';
import { isISO8601 } from 'validator';
import { BillsModel } from '../models/bills';

const billsModel = new BillsModel();

export class Bills extends Controller {

    public getItems = async (ctx: Context): Promise<void> => {
        const dateFromStr: string = this.validate(ctx, (validator: ItemValidator) => {
            return validator.optional.isDate('from');
        });
        const dateToStr: string = this.validate(ctx, (validator: ItemValidator) => {
            return validator.optional.isDate('to');
        });
        const offset: number = this.validate(ctx, (validator: ItemValidator) => {
            return validator.optional.isInt('offset');
        });
        const limit: number = this.validate(ctx, (validator: ItemValidator) => {
            return validator.optional.isInt('limit');
        });
        const idFrom: number = this.validate(ctx, (validator: ItemValidator) => {
            return validator.optional.isInt('id_from');
        });
        const idTo: number = this.validate(ctx, (validator: ItemValidator) => {
            return validator.optional.isInt('id_to');
        });

        // Checking that from date is lower than higher date
        const dateFrom = dateFromStr && new Date(dateFromStr);
        const dateTo = dateToStr && new Date(dateToStr);

        if (dateFrom > dateTo) {
            throw new InnoError('FROM_DATE_IS_MORE_THAN_TO_DATE', 400);
        }

        ctx.body = await billsModel.getItems({ dateFrom, dateTo, offset, limit, idFrom, idTo });

    }

    public getItemsIds = async (ctx: Context): Promise<void> => {
        ctx.body = await billsModel.getItemsIds();

    }

}