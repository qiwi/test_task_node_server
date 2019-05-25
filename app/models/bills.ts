import {pgService} from "../../app";
import * as SQLBuilder from "json-sql-builder2";

const sqlBuilder = new SQLBuilder('PostgreSQL');
const BILLS_TABLE = 'aggr_bills';

export interface IBills {
    idBills: number;
    addTimestamp: Date;
    amount: number;
    count: number;
    paidAmount: number;
    paidCount: number;
}

interface IQueryParams {
    timestampMin?: Date;
    timestampMax?: Date;

}

interface IPaginatedQueryParams extends IQueryParams {
    offset: number;
    limit: number;

}

export class BillsModel {

    public async getPagedItems(params: IPaginatedQueryParams): Promise<Array<IBills>> {

        const query = sqlBuilder.$select(this.buildQuery(params));

        query.$limit = params.limit;
        query.$offset = params.offset;

        return await pgService.getRows(query.sql, query.values);
    }

    public async getItemsCount(params: IQueryParams): Promise<number> {

        const initialQuery = this.buildQuery(params);

        const bakedQuery = sqlBuilder.$select({
            total: {$count: '*'},
            $where: initialQuery.$where,
            $from: initialQuery.$from
        });
        const result = await pgService.getRow(bakedQuery.sql, bakedQuery.values);
        return result.total;

    }

    private buildQuery(params: IQueryParams): any {
        const baseQuery: any = {
            id_bills: true,
            bills_add_timestamp: true,
            bills_amount: true,
            bills_paid_amount: true,
            bills_count: true,
            bills_paid_count: true,

            $from: BILLS_TABLE
        };

        if (params.timestampMin && params.timestampMax) {
            baseQuery.$where = {
                $and: [
                    {bills_add_timestamp: {$gte: params.timestampMin}},
                    {bills_add_timestamp: {$lt: params.timestampMax}}
                ]
            };
        } else if (params.timestampMin) {
            baseQuery.$where = {bills_add_timestamp: {$gte: params.timestampMin}};

        } else if (params.timestampMin) {
            baseQuery.$where = {bills_add_timestamp: {$lt: params.timestampMax}};
        }

        return baseQuery;

    }

}
