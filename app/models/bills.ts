import {pgService} from "../../app";

export interface IBills {
    idBills: number;
    bills_add_timestamp: string;
    bills_amount: string;
    bills_paid_amount: string;
    bills_count: string;
    bills_paid_count: string;
    idUser: number;
}

export class BillsModel {
    public async getBills(): Promise<Array<IBills>> {
        return await pgService.getRows(`SELECT * FROM aggr_bills ORDER BY bills_add_timestamp`);
    }
}
