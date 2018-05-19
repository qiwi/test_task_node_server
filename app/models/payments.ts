import { pgService } from "../../app";

export interface IPayments {
    idBills: string;
    billsAddTimestamp: Date;
    billsAmount: number;
    billsPaidAmount: number;
    billsCount: number;
    billsPaidCount: number;
}

export class PaymentsModel {
    public async getItems(): Promise<Array<IPayments>> {
        return await pgService.getRows(
            `
            SELECT id_bills, bills_add_timestamp, bills_amount, bills_paid_amount, bills_count, bills_paid_count
            FROM aggr_bills
            `);
    }

}
