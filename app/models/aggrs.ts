import { pgService } from "../../app";

export interface IAggr {
    idBills: string;
    billsAddTimestamp: string;
    billsAmount: string;
    billsCount: string;
}

export class AggrsModel {
    public async getItems(): Promise<Array<IAggr>> {
        return await pgService.getRows(`SELECT id_bills, bills_add_timestamp, bills_amount, bills_count FROM aggr_bills LIMIT 100`);
    }

}
