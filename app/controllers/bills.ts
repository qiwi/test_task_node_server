import {Controller, InnoError} from 'innots';
import {Context} from 'koa';
import {BillsModel} from "../models/bills";

const billsModel = new BillsModel();

export class BillsController extends Controller {

    public getItems = async (ctx: Context): Promise<void> => {
        const {from, to} = ctx.validatedData.camelCase;

        if (from && to && from > to) {
            throw new InnoError('INVALID_REQUEST_PARAMS', 400, "from must be less then to");
        }

        ctx.body = await billsModel.getItems(ctx.validatedData.camelCase);
    }

}
