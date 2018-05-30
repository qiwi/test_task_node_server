import { pgService } from "../../app";

export interface IAggrBill {
	idBills: number;
	count: number;
	amount: number;
	paidCount: number;
	paidAmount: number;
	addTimeStamp: Date;
}

export class AggrBillsModel {
    public async getItems(fromDate: Date | null, toDate: Date | null): Promise<Array<IAggrBill>> {
        let filter = "";

        if (fromDate) {
            filter += `WHERE bills_add_timestamp >= '${fromDate.toISOString()}' `;
        }

        if (toDate) {
            filter += filter ? `AND bills_add_timestamp < '${toDate.toISOString()}' ` : `WHERE bills_add_timestamp < '${toDate.toISOString()}' `;
        }

        return await pgService.getRows(`
            SELECT id_bills, bills_count, bills_amount, bills_paid_count, bills_paid_amount, bills_add_timestamp
            FROM aggr_bills
            ${filter ? filter : ""}
        `);
    }
}