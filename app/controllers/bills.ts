import {Controller, ItemValidator} from 'innots';
import {Context} from 'koa';
import {BillsModel} from '../models/bills';

const billsModel = new BillsModel();

export class BillsController extends Controller {

    public getBills = async (ctx: Context): Promise<void> => {
        ctx.body = await billsModel.getBills();
    }
}