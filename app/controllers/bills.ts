import {Controller, ItemValidator, Joi, ValidationError} from "innots";
import { Context } from 'koa';
import {BillsModel, IBillRequest} from "../models/bills";
import {Paginator} from "../models/interfaces/paginator";
import {IMiddleware} from "koa-router";
import {createValidationMiddleware} from "innots/build/lib/koa/middleware/validation_middleware";

const paymentsModel = new BillsModel();

export class BillsController extends Controller {

    public validator: IMiddleware = async (ctx, next) => {
        const schema = Joi.object().keys({
            startDate: Joi.date().iso().default(new Date(0)),
            endDate: Joi.date().iso().default(new Date()),
            page: Joi.number().min(1).default(1),
            perPage: Joi.number().min(1).max(25).default(10)
        });

        await createValidationMiddleware(schema)(ctx, next);
    };

    public getItems = async (ctx: Context): Promise<void> => {
        const req: IBillRequest = ctx.validatedData.originalCase;

        console.log(req.startDate);
        console.log(req.endDate);
        console.log(req.startDate >= req.endDate);
        if(req.startDate > req.endDate)
            throw new ValidationError(
                ValidationError.VALIDATION,
                'startDate',
                req.startDate,
                'Начальная дата должна быть раньше конечной',
                'Date'
            );

        const total = (await paymentsModel.getItemsCount()).count;
        ctx.body = new Paginator(
            await paymentsModel.getItems(req.startDate, req.endDate, req.page * req.perPage, req.perPage),
            total,
            req.page,
            req.perPage
        );
    };

    public getItem = async (ctx: Context): Promise<void> => {
        const idPayment: number = this.validate(ctx, (validator: ItemValidator) => {
            return validator.isInt('id');
        });

        ctx.body = await paymentsModel.getItem(idPayment);
    };

}