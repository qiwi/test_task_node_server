import { assert } from "chai";
import { makeRandomDate, t } from './random_date';
import { requestConfig } from "./request_config";

export function makeRandomDateTest(repeat: number) {
    let i = 0;
    while (i < repeat) {
        setTimeout(function test() {
            let [rmin, rmax] = makeRandomDate(requestConfig.maxDate, requestConfig.minDate)
            assert.isAbove(rmax.getTime(), rmin.getTime())
            assert.isAtLeast(t(rmin), t(requestConfig.minDate))
            assert.isAtMost(t(rmax), t(requestConfig.maxDate))
        }, 50)
        i++
    }
}

makeRandomDateTest(1000)
