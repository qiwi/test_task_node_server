import { pgService } from "../../app";

export interface IAggrBills {
    idBills: number;
    billsCount: string;
    billsPaidCount: string;
    billsAmount: string;
    billsPaidAmount: string;
    billsAddTimestamp: string;
}

export class AggrBillsModel {
    public async getItems(): Promise<Array<IAggrBills>> {
        return await pgService.getRows(
            `SELECT id_bills, bills_count, bills_paid_count, bills_amount,
            bills_paid_amount FROM aggr_bills`
        );
    }

    public async getItemsByDateRange(fromDate: Date, toDate: Date): Promise<Array<IAggrBills>> {
        return await pgService.getRows(
            `SELECT id_bills, bills_count, bills_paid_count, bills_amount,
            bills_paid_amount FROM aggr_bills WHERE bills_add_timestamp BETWEEN $1 AND $2`,
            [fromDate, toDate]
        );
    }

    public async getItem(idBills: number): Promise<IAggrBills> {
        return await pgService.getRow(
            `SELECT id_bills, bills_count, bills_paid_count, bills_amount,
            bills_paid_amount FROM aggr_bills WHERE id_bills = $1`,
            [idBills]
        );
    }
}
