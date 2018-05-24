import { pgService } from "../../app";

export interface IAggrBill {
	idBills: number;
	count: number;
	amount: number;
	paidCount: number;
	paidAmount: number;
	addTimeStamp: string;
}

export class AggrBillsModel {
    public async getItems(): Promise<Array<IAggrBill>> {
        return await pgService.getRows(`SELECT id_bills, bills_count, bills_amount, bills_paid_count, bills_paid_amount, bills_add_timestamp FROM aggr_bills`);
    }
}