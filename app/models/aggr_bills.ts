import { pgService } from "../../app";

export interface IAggrBills {
    idBills: number;
    billsAddTimestamp: Date;
    billsAmount: number;
    billsPaidCount: number;
    billsCount: number;
    billsPaidAmount: number;
}

export class AggrBillsModel {
    public async getItems({
        startDate,
        endDate,
        limit,
        offset
    }: {
        startDate?: Date;
        endDate?: Date;
        limit?: number;
        offset?: number;
    } = {}): Promise<Array<IAggrBills>> {
        startDate = startDate || new Date(0);
        endDate = endDate || new Date();
        limit = limit || 100;
        offset = offset || 0;

        return pgService.getRows(
            `
            SELECT * FROM aggr_bills
            WHERE bills_add_timestamp >= $1 AND bills_add_timestamp <= $2
            OFFSET $3 LIMIT $4`,
            [startDate, endDate, offset, limit]
        );
    }
}
