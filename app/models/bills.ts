import { pgService } from "../../app";

export interface IBills {
    id_bills: number;
    bills_count: number;
    bills_amount: number;
    bills_paid_count: number;
    bills_paid_amount: number;
    bills_add_timestamp: string; // timestamp
}

export class BillsModel {
    public async getItems(): Promise<Array<IBills>> {
        return await pgService.getRows(
            `
SELECT 
id_bills
, bills_count
, bills_amount
, bills_paid_count
, bills_paid_amount
, bills_add_timestamp
FROM aggr_bills`);
    }
}
