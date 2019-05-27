import {Controller, InnoError} from 'innots';
import {Context} from 'koa';
import {BillsModel} from "../models/bills";

const billsModel = new BillsModel();

export class BillsController extends Controller {

    public getItems = async (ctx: Context, next: any): Promise<void> => {
        const {fromDate, toDate, pageIndex, pageSize} = ctx.validatedData.camelCase;

        if (fromDate && toDate && fromDate > toDate) {
            throw new InnoError('INVALID_REQUEST_PARAMS', 400, "from must be less then to");
        }

        ctx.body = await billsModel.getPagedItems({
            timestampMax: toDate,
            timestampMin: fromDate,
            offset: pageIndex * pageSize,
            limit: pageSize
        });

        const maxIndexFetcher = billsModel.getItemsCount({
            timestampMax: toDate,
            timestampMin: fromDate
        });

        next();

        const itemsCount = await maxIndexFetcher;

        ctx.body.page = {
            index: pageIndex,
            size: pageSize,
            // tslint:disable-next-line:no-bitwise
            maxIndex: (itemsCount / pageSize) | 0
        };
    }

}
