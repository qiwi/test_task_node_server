import { Controller, ItemValidator } from "innots";
import { Context } from "koa";
import { AggrBillsModel } from "../models/aggr_bills";

const aggrBillsModel = new AggrBillsModel();

export class AggrBillsController extends Controller {
    public getAggrBills = async (ctx: Context): Promise<void> => {
        const dateBorders = this.validate(ctx, (validator: ItemValidator) => {
            return {
                startDate: this.isValidDate(validator.item("startDate")),
                endDate: this.isValidDate(validator.item("endDate"))
            };
        });

        ctx.body = await aggrBillsModel.getAggrBills(dateBorders.startDate, dateBorders.endDate);
    }

    private isValidDate(dateString?: string): Date | null {
        if (dateString) {
            const date = new Date(dateString);
            if (!isNaN(date.getTime())) {
                return date;
            }
        }
        return null;
    }
}