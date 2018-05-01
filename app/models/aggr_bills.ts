import { pgService } from "../../app";

export interface IAggrBills {
    idBills: number;
    billsCount: number;
    billsAmount: number;
    billsPaidCount: number;
    billsPaidAmount: number;
    billsAddTimestamp: Date;
}

export class AggrBillsModel {

    private static dateToUnix(dateTime: Date): number {
        return Math.floor(dateTime.getTime() / 1000);
    }

    public async getAggrBills(startDate?: Date, endDate?: Date): Promise<Array<IAggrBills>> {
        let unixStartDate: number;
        let unixEndDate: number;

        if (!startDate) {
            unixStartDate = 0;
        } else {
            unixStartDate = AggrBillsModel.dateToUnix(startDate);
        }

        if (!endDate) {
            endDate = new Date();
        }

        unixEndDate = AggrBillsModel.dateToUnix(endDate);

        if (unixEndDate < unixStartDate) {
            [unixEndDate, unixStartDate] = [unixStartDate, unixEndDate];
        }

        return pgService.getRows(`
            SELECT * FROM aggr_bills
            WHERE bills_add_timestamp >= to_timestamp($1) AND bills_add_timestamp <= to_timestamp($2)`,
            [unixStartDate, unixEndDate]);
    }
}