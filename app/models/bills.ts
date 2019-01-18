import { pgService } from "../../app";

export interface IBills {
  idBills: number;
  billsAddTimestamp: string;
  billsAmount: string;
  billsPaidAmount: string;
  billsCount: string;
  billsPaidCount: string;
}

export class BillsModel {

  public async getItems({
    dateFrom,
    dateTo,
    offset,
    limit,
    idFrom,
    idTo
  }: {
    dateFrom?: Date;
    dateTo?: Date;
    offset?: number;
    limit?: number;
    idFrom?: number;
    idTo?: number;
  } = {}): Promise<Array<IBills>> {
    dateFrom = dateFrom || new Date(0);
    dateTo = dateTo || new Date();
    limit = limit || 100;
    offset = offset || 0;
    idFrom = idFrom || 0;
    idTo = idTo || 2147483627;

    return await pgService.getRows(
      `
        SELECT id_bills, bills_add_timestamp, bills_amount, bills_paid_amount, bills_count, bills_paid_count
        FROM aggr_bills
        WHERE  bills_add_timestamp BETWEEN $1 AND $2 AND id_bills BETWEEN $5 AND $6
        ORDER BY id_bills
        OFFSET $3 LIMIT $4
      `,
      [dateFrom, dateTo, offset, limit, idFrom, idTo]
    );
  }

  public async getItemsIds(): Promise<Array<IBills>> {
    const result =   await pgService.getRows(`SELECT id_bills FROM aggr_bills`);
    return result.map((b) => b.idBills);
  }

}
