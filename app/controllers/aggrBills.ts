import { Controller, ItemValidator } from 'innots';
import { Context } from 'koa';
import { AggrBillsModel } from '../models/aggrBills';

const aggrBillsModel = new AggrBillsModel();

export class AggrBills extends Controller {

    public getItems = async (ctx: Context): Promise<void> => {
        ctx.body = await aggrBillsModel.getItems();
    }
}