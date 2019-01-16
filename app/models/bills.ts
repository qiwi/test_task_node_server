import { pgService } from "../../app";

export interface IBill {
  idBills: number;
  billsDateFrom: string;
  billsDateTo: string;
}

export class BillsModel {
  public async getItems(): Promise<Array<IBill>> {
    return await pgService.getRows(
      `SELECT id_bills, bills_add_timestamp, bills_amount, bills_paid_amount, bills_count, bills_paid_count
       FROM aggr_bills`
    );
  }

  public async getItem(idBills: number): Promise<IBill> {
    return await pgService.getRow(
      `
        SELECT id_bills, bills_add_timestamp, bills_amount, bills_paid_amount, bills_count, bills_paid_count
        FROM aggr_bills
        WHERE id_bills = $1`,
      [idBills]
    );
  }

}
