import { Controller, ItemValidator } from "innots";
import { Context } from "koa";
import { AggrBillsModel } from "../models/aggr_bills";

const aggrBillsModel = new AggrBillsModel();

const startDateParamName = "startDate";
const endDateParamName = "endDate";

export class AggrBillsController extends Controller {
    public getAggrBills = async (ctx: Context): Promise<void> => {
        const params = ctx.request.query;
        const dateBorders = {
                startDate: this.isValidDate(params[startDateParamName]),
                endDate: this.isValidDate(params[endDateParamName])
            };
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