import {Controller, InnoError} from 'innots';
import {Context} from 'koa';
import {BillsModel} from "../models/bills";

const billsModel = new BillsModel();

export class BillsController extends Controller {

    public getItems = async (ctx: Context, next: any): Promise<void> => {
        const {from, to, page, pageSize} = ctx.validatedData.camelCase;

        console.log(pageSize);

        if (from && to && from > to) {
            throw new InnoError('INVALID_REQUEST_PARAMS', 400, "from must be less then to");
        }

        ctx.body = await billsModel.getPagedItems({
            timestampMax: to,
            timestampMin: from,
            offset: page * pageSize,
            limit: pageSize
        });

        const maxIndexFetcher = billsModel.getItemsCount({
            timestampMax: to,
            timestampMin: from
        });

        next();

        const itemsCount = await maxIndexFetcher;

        console.log(itemsCount);

        ctx.body.page = {
            index: page,
            size: pageSize,
            // tslint:disable-next-line:no-bitwise
            maxIndex: (itemsCount / pageSize) | 0
        };
    }

}
