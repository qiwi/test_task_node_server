import { pgService} from "../../app";

export interface IBill {
    idBills: number;
    billsAddTimestamp: Date;
    billsAmount: number;
    billsPaidAmount: number;
    billsCount: number;
    billsPaidCount: number;
}

export interface IBillCounter {
    count: number;
}

export interface IBillRequest {
    startDate: Date|undefined;
    endDate: Date|undefined;
    page: number;
    perPage: number;
}

export class BillsModel {

    public async getItems(startDate: Date, endDate: Date, offset: number, limit: number): Promise<Array<IBill>> {
        return await pgService.getRows(`
            SELECT * FROM aggr_bills 
            WHERE bills_add_timestamp >= $1
                AND bills_add_timestamp <= $2
            ORDER BY bills_add_timestamp ASC
            OFFSET $3
            LIMIT $4
            `, [startDate, endDate, offset, limit]);
    }

    public async getItem(idPayment: number): Promise<IBill> {
        return await pgService.getRow(`
            SELECT * FROM aggr_bills
            WHERE id_bills = $1
            ORDER BY bills_add_timestamp ASC
           `, [idPayment])
    }

    public async getItemsCount(): Promise<IBillCounter> {
        return await pgService.getRow("SELECT COUNT(*) FROM aggr_bills");
    }
}