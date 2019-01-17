import { pgService } from "../../app";

export interface IBills {
  idBills: number;
  billsAddTimestamp: Date;
  billsAmount: number;
  billsPaidAmount: number;
  billsCount: number;
  billsPaidCount: number;
}

export class BillsModel {

  public async getItems({
    dateFromStr,
    dateToStr,
    offset,
    limit
  }: {
    dateFromStr?: string;
    dateToStr?: string;
    offset?: number;
    limit?: number;
  } = {}): Promise<Array<IBills>> {
    return await pgService.getRows(
      `
        SELECT id_bills, bills_add_timestamp, bills_amount, bills_paid_amount, bills_count, bills_paid_count
        FROM aggr_bills
        WHERE  bills_add_timestamp BETWEEN COALESCE($1, bills_add_timestamp) AND COALESCE($2, bills_add_timestamp)
        OFFSET $3 LIMIT $4
      `,
      [dateFromStr, dateToStr, offset, limit]
    );
  }

}
