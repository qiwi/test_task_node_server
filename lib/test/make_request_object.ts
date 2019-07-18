import * as request from "request-promise";
import { makeRequestAddress } from './make_request_address';
import { makeRandomDate } from "./random_date";
import { requestConfig as config } from "./request_config";
let [rmin, rmax] = makeRandomDate(config.maxDate, config.minDate)

export class makeRequestObject {

    withAuthError = request.get(makeRequestAddress(config.serverPort, config.billsUrl))

    withToken = request.get(makeRequestAddress(config.serverPort, config.billsUrl), { headers: config.headersWithToken })

    withFilter = request.get(makeRequestAddress(config.serverPort, config.billsUrlFilteredByDate),
        { headers: config.headersWithToken, qs: { dateFrom: rmin, dateTo: rmax} })

}

const req = new makeRequestObject();

export { req };

