import { assert, expect } from 'chai';
import { bills } from '../../lib/test/create_bills';
import { suite, test } from '../../node_modules/mocha';

suite("Юнит тесты api платёжных транзакций", () => {

    suite("Проверяем что создается когда используется интерфейс IBills.", () => {

        test('Это не массив.', () => {
            assert.isNotArray(bills);
        });

        test("Это не строка.", () => {
            assert.isNotString(bills);
        });

        test("Это не номер.", () => {
            assert.isNotNumber(bills);
        });

        test("Это не null.", () => {
            assert.isNotNull(bills);
        });

        test("Это не функция.", () => {
            assert.isNotFunction(bills);
        });

        test("Это не булево.", () => {
            assert.isNotBoolean(bills);
        });

        test("Это не NaN.", () => {
            assert.isNotNumber(bills);
        });

        test("Это не неопределено.", () => {
            assert.isDefined(bills);
        });

        test("Это объект", () => {
            assert.isObject(bills);
        });

        test("Объект Javascript", () => {
            assert.isString(JSON.stringify(bills));
        });
    });

    suite("Смотрим глубже - проверяем свойства, устанавливаем идентичнось", () => {

        test("К объекту могут быть добавленны новые свойства, а текущие свойства могут быть удаленны.", () => {
            assert.isNotSealed(bills);
        });

        test("Кол-во свойств объекта идентично IBills.", () => {
            assert.equal(Object.keys(bills).length, 6);
        });

        test("Ключи свойств объекта как у IBills", () => {
            expect(bills).to.be.have.keys(
                "idBills", "billsCount", "billsAmount", "billsPaidCount", "billsPaidAmount", "billsAddTimestamp"
            );
        });

        test("Типы значений в свойствах объекта идентичны IBills", () => {
            for (const v of (Object as any).values(bills)) {
                try {
                    assert.typeOf(v, "number");
                } catch (assertionError) {
                    assert.typeOf(v, "date");
                }
            }
        });
    });
});
