import { Controller, ItemValidator } from "innots";
import { Context } from "koa";
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
                    startDate: this.isDate(data.startDate),
                    endDate: this.isDate(data.endDate)
                };
            ctx.body = await aggrBillsModel.getAggrBills(dateBorders.startDate, dateBorders.endDate);
        } catch (ValidationError) {
            let errorText: string;
            let paramName: string;
            [errorText, paramName] = ValidationError.message.split(':');
            ctx.body = {
                error: errorText,
                details: {
                    invalidField: paramName,
                    invalidValue: data[paramName]
                }
            };
        }
    }

    protected isDate(paramName: string, dateString?: string): Date | never {
        if (dateString) {
            const date = new Date(dateString);
            if (!isNaN(date.getTime())) {
                return date;
            } else {
                throw new Error(DATE_VALIDATION_ERROR + ":" + paramName);
            }
        }
        return null;
    }
}