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

export class BillsModel {

    public async getItems({from, to}: { from?: Date, to?: Date }): Promise<Array<IBills>> {

        const baseQuery: any = {
            id_bills: true,
            bills_add_timestamp: true,
            bills_amount: true,
            bills_paid_amount: true,
            bills_count: true,
            bills_paid_count: true,

            $from: BILLS_TABLE,
            $where: {
                $and: [
                    {bills_add_timestamp: {$gt: from}},
                    {bills_add_timestamp: {$lt: to}}
                ]
            }
        };

        if (from && to) {
            baseQuery.$where = {
                $and: [
                    {bills_add_timestamp: {$gt: from}},
                    {bills_add_timestamp: {$lt: to}}
                ]
            };
        } else if (from) {
            baseQuery.$where = {bills_add_timestamp: {$gte: from}};

        } else if (to) {
            baseQuery.$where = {bills_add_timestamp: {$lte: to}};
        }

        const query = sqlBuilder.$select(baseQuery);

        return await pgService.getRows(query.sql, query.values);
    }

}
