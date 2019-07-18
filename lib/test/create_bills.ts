import { IBills } from '../../app/models/bills';

function createBills(...args): IBills {
    let bills = {} as IBills;
    [bills.idBills, bills.billsCount, bills.billsAmount, bills.billsPaidCount, bills.billsPaidAmount, bills.billsAddTimestamp] = [...args]
    return bills;
}

let bills = createBills(424, 3123, 592352.09, 1241, 12309.94, new Date("2018"))
              
export { bills };

