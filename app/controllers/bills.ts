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
    // 1) тип данных не string, а Date
    // 2) в новом innots есть isDate!
    // 3) сравение from < to c выдачей ошибки, если это не так

    public getItems = async (ctx: Context): Promise<void> => {
        const dateFromStr: string = this.validate(ctx, (validator: ItemValidator) => {
            return validator.optional.isString('from');
        });
        const dateToStr: string = this.validate(ctx, (validator: ItemValidator) => {
            return validator.optional.isString('to');
        });
        const offset: number = this.validate(ctx, (validator: ItemValidator) => {
            return validator.optional.isInt('offset');
        });
        const limit: number = this.validate(ctx, (validator: ItemValidator) => {
            return validator.optional.isInt('limit');
        });

        // Checking thant `from` and `to` argements is a date
        // P.S. По-хорошему, надо обновить innots и использовать isDate
        // (но обновление пакета вызывает ошибки, поэтому я решил пока проверить вручную)
        if (dateFromStr && !isISO8601(dateFromStr)) {
            throw new InnoError('DATE_FROM_IS_NOT_A_DATE', 400);
        }
        if (dateToStr && !isISO8601(dateToStr)) {
            throw new InnoError('DATE_TO_IS_NOT_A_DATE', 400);
        }

        // Checking that from date is lower than higher date
        const dateFrom = new Date(dateFromStr);
        const dateTo = new Date(dateToStr);
        if (dateFrom > dateTo) {
            throw new InnoError('FROM_DATE_IS_MORE_THAN_TO_DATE', 400);
        }

        ctx.body = await billsModel.getItems({ dateFromStr, dateToStr, offset, limit });

    }

}