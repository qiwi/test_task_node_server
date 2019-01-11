import { pgService } from "../../app";

export interface IBill {
    idBill: number;
    countBills: number;
    amountBills: string;
    paidCountBills: number;
    paidAmountBills: string;
    dateAddBills: Date;
}

export class BillsModel {
    public async getItems(): Promise<Array<IBill>> {return await pgService.getRows(`
SELECT id_bills, bills_count, bills_amount, bills_paid_count, bills_paid_amount, bills_add_timestamp FROM aggr_bills`);
    }

    public async getItem(idBill: number): Promise<IBill> {
        return await pgService.getRow(`
 SELECT id_bills, bills_count, bills_amount, bills_paid_count, bills_paid_amount, bills_add_timestamp FROM aggr_bills
            WHERE id_bills= $1`,
            [idBill]);
    }

    public async getItemsDate(toDate: Date, fromDate: Date): Promise<Array<IBill>> {
        return await pgService.getRows(`
 SELECT id_bills, bills_count, bills_amount, bills_paid_count, bills_paid_amount, bills_add_timestamp FROM aggr_bills
            WHERE bills_add_timestamp < date ($2) and bills_add_timestamp >= ($1)`,
            [toDate, fromDate]);
    }
}