import { pgService } from "../../app";

export interface IBills {
    idBills: number;
    billsCount: number;
    billsAmount: number;
    billsPaidCount: number;
    billsPaidAmount: number;
    billsAddTimestamp: Date;
}

export class BillsModel {

    public getItems = async (): Promise<Array<IBills>> => await pgService.getRows(`SELECT * FROM public.aggr_bills`);

    public getItemsFilteredByDate = async (dateFrom: Date, dateTo: Date): Promise<Array<IBills>> => await pgService
        .getRows(`SELECT * FROM aggr_bills WHERE bills_add_timestamp >= $1 AND bills_add_timestamp <= $2 \
            ORDER BY bills_add_timestamp`, [dateFrom, dateTo])
}