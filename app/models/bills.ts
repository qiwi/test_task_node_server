import { pgService } from "../../app";

export interface IBill {
  idBills: number;
  billsDateFrom: string;
  billsDateTo: string;
}

export class BillsModel {
  // public async getItems(): Promise<Array<IBill>> {
  //   return await pgService.getRows(
  //     `SELECT id_bills, bills_add_timestamp, bills_amount, bills_paid_amount, bills_count, bills_paid_count
  //      FROM aggr_bills`
  //   );
  // }

  public async getItems(billsDateFrom: string , billsDateTo: string): Promise<Array<IBill>> {
    return await pgService.getRows(
      `
        SELECT id_bills, bills_add_timestamp, bills_amount, bills_paid_amount, bills_count, bills_paid_count
        FROM aggr_bills
        WHERE  bills_add_timestamp BETWEEN COALESCE($1, bills_add_timestamp) AND COALESCE($2, bills_add_timestamp)
      `,
      [billsDateFrom, billsDateTo]
    );
  }

}
