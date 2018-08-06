import { pgService } from "../../app";

export interface IAggrBills {
    idBlls: number;
    billsCount: string;
    billsPaidCount: string;
    billsAmount: string;
    billsPaidAmount: string;
    billsAddTimestamp: string;
}

export class AggrBillsModel {
    public async getItem(): Promise<Array<IAggrBills>> {
        return await pgService.getRows(`SELECT id_bills, bills_count, bills_amount, bills_paid_count,
         bills_paid_amount, bills_add_timestamp FROM aggr_bills`);
    }
    public async getItems(idBills: number): Promise<IAggrBills> {
        return await pgService.getRow(
            `
            SELECT id_bills, bills_count, bills_amount, bills_paid_count, bills_paid_amount,
            bills_add_timestamp FROM aggr_bills
            WHERE id_bills = $1
            `,
            [idBills]);
    }

}
