### Тестовое задание на позицию JS / TS Fullstack Developer
[![Build Status](https://travis-ci.com/qiwi/test_task_node_server.svg?branch=master)](https://travis-ci.com/qiwi/test_task_node_server/)

#### Закончив реализацию, открывайте Pull Request в этот репозиторий

Этот репозиторий содержит рабочее базовое приложение, в которое предлагается нарастить функциональность.
Приложение во многом похоже на то, с чем вам предстоит работать в QIWI.

Приложение доступно по адресу https://test-task.qiwi.tools:2211/api/

База данных приложения открыта портом 5432 в интернет по адресу test-task-db.qiwi.tools:5432

Для затравочки: в базе данных лежат платёжные данные о пополнениях счетов мобильных операторов по одному из интерфейсов QIWI.
Эти данные нужно будет отдать по API. Для внимательных есть пасхалка: среди транзакционных данных закралась реальная аномалия. Нашедшему жирный плюс =)

#### Для выполнения задания нужно добавить метод контроллера в авторизованной зоне, выдающий содержимое таблицы aggr_bills.
Большим плюсом будет реализация фильтров по дате в качестве параметров запроса.

Схема БД содержит две таблицы: obj_user и aggr_bills. Таблицы никак не связаны.

В таблице obj_user лежит список пользователей. Запросы на выборку из неё реализованы в приложении. Этой функциональностью следует пользоваться как примером.

В таблице aggr_bills лежат платёжные данные в виде транзакционных агрегатов по пятиминутным интервалам. Доступ к данным в этой таблице необходимо реализовать.

В текущей реализации приложение может авторизовать пользователя,
а также в авторизованной зоне выдать список пользователей и информацию о конкретном пользователе по его id.

Рекомендуется пользоваться [API-документацей](https://qiwi.github.io/test_task_node_server/)

Для авторизации служит [POST метод Auth](https://qiwi.github.io/test_task_node_server/#api-Auth) с параметрами:
```
email: candidate@e.ru
password: candidate
```

Полученный при авторизации JWT-токен потребуется для доступа к [запросам авторизованной зоны](https://qiwi.github.io/test_task_node_server/#api-User)

JWT-токен необходимо указать в заголовке Authorization после ключевого слова Bearer.

Все креды для подключения к БД есть в [config/default.json](https://github.com/qiwi/test_task_node_server/blob/master/config/default.json)
Может потребоваться VPN, т.к. сервер БД на амазоне.

#### Для первого запуска приложения достаточно трёх шагов:
*при условии установленной среды Node.js >= 8.11

установить зависимости

```
npm install
```
собрать приложение
```
npm run build
```
и запустить
```
npm start
```

#### Локальная БД или облачная
По умолчанию в проекте используется поднятый в облаке инстанс.
Но у вас могут возникнуть проблемы с доступом к нему из-за борьбы РКН и Telegram.

Базу данных можно поднять локально в докер-контейнере.
Преимуществом локального запуска для вас будет полный доступ к БД.
В облаке пользователь имеет доступ только на чтение.

Для того, чтобы поднять локально, предложен bash скрипт. Запускать можно из корня. Пример:
```
~/workspace/test_task_node_server$ ./db/test-task-db.sh
```
После выполнения скрипта вы сможете подключиться к postgres@localhost:5433.
Для запуска приложения с локальной БД нужен config/development.json
```
~/workspace/test_task_node_server$ export NODE_ENV=development
~/workspace/test_task_node_server$ npm start
server is listening on port 2211
```
#### Линтер
Линтёр - это хорошо.

Пользуемся им так:
```
npm run lint
```
Перед коммитами стараемся не забывать его прогонять.


#### Notes
Implemented new feature in feature/api_aggr_bills:

*   Data retrieval for aggr_bills:

    -   /api/users/itembyemail
    -   /api/bills/items
    -   /api/bills/item
    -   /api/bills/itemsbydate

Documented in ./app/routes.ts

Inconsistency within the bills table in the database: ids are consecutive, but timestamps not. To avoid this in the future I would modify this table with default timestamp:

```sql
ALTER TABLE aggr_bills
ALTER COLUMN bills_add_timestamp
SET DEFAULT now();
```