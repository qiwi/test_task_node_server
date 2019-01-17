import { Controller, ItemValidator } from 'innots';
import { Context } from 'koa';
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

        // const DateFrom = new Date(DateFromStr);
        // const DateTo = new Date(DateToStr);

        ctx.body = await billsModel.getItems({ dateFromStr, dateToStr, offset, limit });

    }

}