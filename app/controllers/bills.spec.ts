import { assert, expect } from "chai";
import { app } from "../../app";
import { bills } from "../../lib/test/create_bills";
import { genDateList as genDate } from "../../lib/test/date_generator";
import { dateTester } from "../../lib/test/date_validator";
import { req } from "../../lib/test/make_request_object";

describe("Интеграционные  тесты точки api платёжных транзакций", async () => {
    before(async () => {
        await app;
    });

    describe('GET /api/bills/items => ! "Массив транзакций"', async () => {
        let respBills;

        beforeEach(async () => {
            await req.withToken.then((response) => {
                respBills = JSON.parse(response);
            });
        });

        it("Возвращает ошибку 401 при запросе без указания токена", async () => {
            req.withAuthError.then(async (resp) => {
                await assert.equal(resp.statusCode, 401, "status code = 401");
            });
        });

        it("Возвращает массив при запросе с токеном", async () => {
            await assert.isArray(respBills, "response  это массив объектов js");
        });

        it("В возвращенном массиве больше 4000 объектов", async () => {
            await assert.isAbove(respBills.length, 4000);
        });

        it("Ключи объектов в возвращенном массиве идентичны IBills", async () => {
            await expect(respBills[ 0 ]).to.have.all.keys(bills);
        });

        it("Типы значений свойств объекта идентичны IBills", async () => {
            for (const v of (Object as any).values(respBills[ 0 ])) {
                try {
                    assert.typeOf(v, "number");
                } catch (error) {
                    assert.typeOf(new Date(v), "Date");
                }
            }
        });
    });

    describe('GET /api/bills/filteredByDate?dateFrom=[Date]&dateTo=[Date]=> \
            "Отфильтрованный по датам массив транзакций"', async () => {
            beforeEach(async () => {
                await req.withFilter
                    .then((response) => {
                        dateTester.dates = [ ...genDate(JSON.parse(response)) ];
                    })
                    .catch((err) => {
                        throw err;
                    });
            });

            it("Все даты валидны", async () => {
                await dateTester.assertDate("valid");
            });

            it("Первая дата больше или равна последней", async () => {
                await dateTester.assertDate("isAtMost");
            });

            it("Каждая следующая дата больше текущей", async () => {
                await dateTester.assertDate("isAbove");
            });

            it("Каждая предъидущая дата меньше текущей", async () => {
                await dateTester.assertDate("isBelow");
            });

            it("Диапазон между датами всегда 300000", async () => {
                await dateTester.assertDate("approximately");
            });
        });
});
