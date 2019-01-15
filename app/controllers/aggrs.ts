import { Controller, ItemValidator } from 'innots';
import { Context } from 'koa';
import { AggrsModel } from '../models/aggrs';

const aggrsModel = new AggrsModel();

export class AggrsController extends Controller {

    public getItems = async (ctx: Context): Promise<void> => {
        ctx.body = await aggrsModel.getItems();
    }
}