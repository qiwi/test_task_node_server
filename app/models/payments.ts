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
    public async getItems(fromDate: Date | null, toDate: Date | null): Promise<Array<IPayments>> {
        let where = "";
        if (fromDate) {
            where += `WHERE bills_add_timestamp >= '${fromDate.toISOString()}' `;
        }
        if (toDate) {
            where += where ? ` and bills_add_timestamp <= '${toDate.toISOString()}' `
                : `WHERE bills_add_timestamp <= '${toDate.toISOString()}' `;
        }
        return await pgService.getRows(
            `
            SELECT id_bills, bills_add_timestamp, bills_amount, bills_paid_amount, bills_count, bills_paid_count
            FROM aggr_bills ${where ? where : ""}
            `);
    }

}
