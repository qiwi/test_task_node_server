import { Controller, InnoError, ItemValidator } from 'innots';
import { Context } from 'koa';
import { isISO8601 } from 'validator';
import { BillsModel } from '../models/bills';

const billsModel = new BillsModel();

export class Bills extends Controller {

    // public getItems = async (ctx: Context): Promise<void> => {
    //     ctx.body = await billsModel.getItems();
    // }

    // TODO:
    // 1) в новом innots есть isDate!

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

        // Закоментированный кусок кода ниже можно уже убрать, т.к. используется innots isDate
        // Checking thant `from` and `to` argements is a date
        // if (dateFromStr && !isISO8601(dateFromStr)) {
        //     throw new InnoError('DATE_FROM_IS_NOT_A_DATE', 400);
        // }
        // if (dateToStr && !isISO8601(dateToStr)) {
        //     throw new InnoError('DATE_TO_IS_NOT_A_DATE', 400);
        // }

        // Checking that from date is lower than higher date
        const dateFrom = dateFromStr && new Date(dateFromStr);
        const dateTo = dateToStr && new Date(dateToStr);

        if (dateFrom > dateTo) {
            throw new InnoError('FROM_DATE_IS_MORE_THAN_TO_DATE', 400);
        }

        ctx.body = await billsModel.getItems({ dateFrom, dateTo, offset, limit, idFrom, idTo });

    }

}