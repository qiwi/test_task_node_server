import { pgService } from "../../app";
import { DatePeriodError } from "../errors/date_period";

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
        if (!startDate) {
            startDate = new Date(0);
        }

        if (!endDate) {
            endDate = new Date();
        }

        if (endDate < startDate) {
            throw new DatePeriodError('', startDate, endDate);
        }

        return pgService.getRows(`
            SELECT * FROM aggr_bills
            WHERE bills_add_timestamp >= $1 AND bills_add_timestamp <= $2`,
            [startDate, endDate]);
    }
}