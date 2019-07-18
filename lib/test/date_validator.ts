import { assert } from 'chai';
import * as Joi from "joi";

class DateTester {

    dates;

    private unixTime(index: number): number {
        return new Date(this.dates[index]).getTime()
    }

    async assertDate(asserts: string) {
        for (const i of this.dates) {
            let nextDate = this.unixTime(i + 1);
            let currentDate = this.unixTime(i);
            let presentDate = this.unixTime(i - 1);
            if (this.dates.length - 1 > i && i > 0) {
                switch (asserts) {
                    case "isAbove":
                        assert.isAbove(nextDate, currentDate, "Каждая следующая дата больше текущей");
                        break;
                    case "isBelow":
                        assert.isBelow(presentDate, currentDate, "Каждая предъидущая дата меньше текущей");
                        break;
                    case "approximately":
                        assert.approximately(currentDate, nextDate, 300000, "Диапазон между датами всегда 300000");
                        break;
                    case "valid":
                        Joi.validate(currentDate, Joi.date(), ((error, value) => {
                            assert.isNull(error, "Дата валидна")
                        }));
                        break;
                    case "isAtMost":
                        if (i === 1) {
                            assert.isAtMost(this.dates[0], this.dates[this.dates.length - 1]);
                            break
                        } else { break }
                }
            }
        }
    }
}

const dateTester = new DateTester();

export { dateTester };

