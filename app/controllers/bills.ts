import { Controller, ItemValidator } from "innots";
import { Context } from 'koa';
import { BillsModel } from "../models/bills";

const billsModel = new BillsModel();

export class BillsController extends Controller {
    public getItems = async (ctx: Context): Promise<void> => {
        ctx.body = await billsModel.getItems();
    }

    public getItemsFilteredByDate = async (ctx: Context): Promise<void> => {
        const validatedFilter = this.validate(ctx, (validator: ItemValidator) => {
            return {
                dateFrom: validator.isDate('dateFrom'),
                dateTo: validator.isDate('dateTo')
            };
        });
        ctx.body = await billsModel.getItemsFilteredByDate(validatedFilter.dateFrom, validatedFilter.dateTo);
    }
}