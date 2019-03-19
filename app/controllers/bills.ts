import {Controller, Joi, ValidationError} from "innots";
import {createValidationMiddleware} from "innots/build/lib/koa/middleware/validation_middleware";
import {IMiddleware} from "koa-router";
import {BillsModel, IAggrBillsRequest} from "../models/bills";

const billsModel = new BillsModel();

export class BillsController extends Controller {
    public aggregatedValidation: IMiddleware = async (ctx, next) => {
        const schema = Joi.object().keys({
            fromDate: Joi.date().iso().optional(),
            toDate: Joi.date().iso(),
            page: Joi.number().min(1).default(1),
            perPage: Joi.number().min(1).max(50).default(10)
        });

        await createValidationMiddleware(schema)(ctx, next);
    }

    public aggregated: IMiddleware = async (ctx) => {
        const req: IAggrBillsRequest = ctx.validatedData.originalCase;
        if (req.page !== 1 && !req.toDate) {
            throw new ValidationError(
                ValidationError.DEFAULT,
                'page',
                req.page,
                '"page" greater than 1 is not allowed without "toDate" parameter'
            );
        }

        ctx.status = 200;
        ctx.body = await billsModel.getAggregatedItems(req);
    }
}
