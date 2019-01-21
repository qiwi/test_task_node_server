import { pgService } from '../../app';

export interface IBills {
    idBill: number;
    billsCount: number;
    billsAmount: number;
    billsPaidCount: number;
    billsPaidAmount: number;
    billsAddTimestamp: string;
}

export class BillsModel {
    public async getItems(): Promise<Array<IBills>> {
        return await pgService.getRows(`
        SELECT id_bills, bills_count, bills_amount, bills_paid_count, bills_paid_amount, bills_add_timestamp
        FROM aggr_bills
        `);
    }

    public async getItem(idBills: number): Promise<IBills> {
        return await pgService.getRow(
            `
            SELECT id_bills, bills_count, bills_amount, bills_paid_count, bills_paid_amount, bills_add_timestamp
            FROM aggr_bills
            WHERE id_bills = $1
            `,
            [idBills]
        );
    }

    public async getItemsByDates(from: string, to: string): Promise<Array<IBills>> {
        return await pgService.getRows(
            `SELECT id_bills,
                bills_count,
                bills_amount,
                bills_paid_count,
                bills_paid_amount,
                bills_add_timestamp
            FROM aggr_bills
            WHERE bills_add_timestamp >= $1 AND bills_add_timestamp < $2
            `,
            [from, to]
        );
    }
}
