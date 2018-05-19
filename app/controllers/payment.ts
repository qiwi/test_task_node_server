import { Controller } from 'innots';
import { Context } from 'koa';
import { PaymentsModel } from '../models/payments';

const paymentsModel = new PaymentsModel();

export class Payments extends Controller {

    public getItems = async (ctx: Context): Promise<void> => {
        ctx.body = await paymentsModel.getItems();
    }
}