import * as Squel from "squel";
import {PostgresSquel} from "squel";
import {pgService} from "../../app";
import {IPaginatedResponse, PaginatedResponse} from "../services/pager";

export interface IBillAggregate {
    idBills: number;
    billsCount: number;
    billsAmount: number;
    billsPaidCount: number;
    billsPaidAmount: number;
    billsAddTimestamp: Date;
}

export interface IAggrBillsRequest {
    fromDate: Date|undefined;
    toDate: Date|undefined;
    page: number;
    perPage: number;
}

export class BillsModel {
    private squel: PostgresSquel = Squel.useFlavour('postgres');

    public async getAggregatedItems(req: IAggrBillsRequest): Promise<IPaginatedResponse<IBillAggregate>> {
        const builder = this.squel.select().from('aggr_bills');
        if (req.fromDate) {
            builder.where('bills_add_timestamp >= ?', req.fromDate);
        }

        if (req.toDate) {
            builder.where('bills_add_timestamp <= ?', req.toDate);
        }

        const countQuery = builder.clone().field('count(id_bills)').toParam();

        builder.order('bills_add_timestamp')
            .offset(req.perPage * (req.page - 1))
            .limit(req.perPage);

        const query = builder.toParam();
        const total = parseInt((await pgService.getRow(countQuery.text, countQuery.values)).count, 10);
        const items = await pgService.getRows(query.text, query.values);

        return new PaginatedResponse(items, total, req.page, req.perPage);
    }
}
