import { Controller, ItemValidator } from "innots";
import { Context } from "koa";
import { DateValidationError } from "../errors/date_validation";
import { AggrBillsModel } from "../models/aggr_bills";

const aggrBillsModel = new AggrBillsModel();

const startDateParamName = "startDate";
const endDateParamName = "endDate";
const DATE_VALIDATION_ERROR = "ERROR_VALIDATION_NO_DATE";

export class AggrBillsController extends Controller {
    public getAggrBills = async (ctx: Context): Promise<void> => {
        const data = this.validate(ctx, (validator) => {
            return {
                startDate: validator.optional.isString(startDateParamName, 24, 24),
                endDate: validator.optional.isString(endDateParamName, 24, 24)
            };
        });
        try {
            const dateBorders = {
                    startDate: this.isDate(startDateParamName, data.startDate),
                    endDate: this.isDate(endDateParamName, data.endDate)
                };
            ctx.body = await aggrBillsModel.getAggrBills(dateBorders.startDate, dateBorders.endDate);
        } catch (error) {
            ctx.body = error;
        }
    }

    protected isDate(paramName: string, dateString?: string): Date | never {
        if (dateString) {
            const date = new Date(dateString);
            if (!isNaN(date.getTime())) {
                return date;
            } else {
                throw new DateValidationError('', paramName, dateString);
            }
        }
        return null;
    }
}