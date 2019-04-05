import * as config from 'config';
import * as Router from 'koa-router';
import {AuthController} from "./controllers/auth";
import {UsersController} from './controllers/users';
import {Context} from "koa";
import {BillsController} from "./controllers/bills";

const router = new Router();
const bills = new BillsController();
const users = new UsersController();
const auth = new AuthController();

const usersProtectedRoute = config.get('appConfig.apiPrefix') + 'users/';
const billsProtectedRoute = config.get('appConfig.apiPrefix') + 'bills/';
const authPublicRoute = config.get('appConfig.publicApiPrefix') + 'auth/';
const healthcheckRoute = config.get('appConfig.publicApiPrefix') + 'healthcheck';

router

    /**
     * @api {get} /api/public/healthcheck
     * @apiName healthcheck
     * @apiGroup healthcheck
     *
     * @apiDescription Всегда вернет 200, когда приложение запущено
     *
     * @apiSuccess {Number} result 1
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "result": 1
     *     }
     */
    .get(healthcheckRoute, (ctx: Context, next: () => void) => {
        ctx.body = 1;
        next();
    })
    /**
     * @api {post} /api/public/auth/login
     * @apiName login
     * @apiGroup Auth
     *
     * @apiDescription Авторизует пользователя. В ответ на запрос отдаст JWT-Токен.
     * Его необходимо указывать в заголовке Authorization.
     *
     * @apiParam {String} email Почта пользователя.
     * @apiParam {String} password Пароль пользователя.
     *
     * @apiSuccess {String} result jwtToken
     *
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "result":
     *          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIifQ.dtxWM6MIcgoeMgH87tGvsNDY6cHWL6MGW4LeYvnm1JA"
     *     }
     */
    .post(authPublicRoute + 'login', auth.login)
    /**
     * @api {get} /api/users/items
     * @apiName getUsers
     * @apiGroup User
     *
     * @apiDescription Возвращает список пользователей
     *
     * * @apiHeader (Authorization) authorization Authorization value.
     * @apiHeaderExample Headers-Example:
     *   { "Authorization": "Bearer :jwtToken" }
     *
     * @apiSuccess {Array} result Массив созданных пользователей.
     */
    .get(usersProtectedRoute + 'items', users.getItems)
    /**
     * @api {get} /api/users/item
     * @apiName getUser
     * @apiGroup User
     *
     * @apiDescription Возвращает пользователя по id
     *
     * @apiHeader (Authorization) authorization Authorization value.
     * @apiHeaderExample Headers-Example:
     *   { "Authorization": "Bearer :jwtToken" }
     *
     * @apiParam {Number} id Идентификатор пользователя.
     *
     * @apiSuccess {Object} result пользователь.
     */
    .get(usersProtectedRoute + 'item', users.getItem)
    /**
     * @api {get} /api/bill/item
     * @apiName getBill
     * @apiGroup Bill
     *
     * @apiDescription Возвращает платежные данные по id
     *
     * @apiHeader (Authorization) authorization Authorization value.
     * @apiHeaderExample Headers-Example:
     *   { "Authorization": "Bearer :jwtToken" }
     *
     * @apiParam {Number} id Идентификатор пользователя.
     *
     * @apiSuccess {Object} result Объект платежных данных
     */
    .get(billsProtectedRoute + "item", bills.getItem)
    /**
     * @api {get} /api/bills/items
     * @apiName getBills
     * @apiGroup Bill
     *
     * @apiDescription Возвращает платежные данные
     *
     * @apiHeader (Authorization) authorization Authorization value.
     * @apiHeaderExample Headers-Example:
     *   { "Authorization": "Bearer :jwtToken" }
     *
     * @apiParam {number} page Страница
     * @apiParam {number} perPage Количество на страницу
     * @apiParam {string} startDate Начальная дата выборки
     * @apiParamExample {string} startDate
     *   2019-04-05T21:40:02.377Z
     * @apiParam {string} endDate Конечная дата выборки
     * @apiParamExample {string} endDate
     *   2019-04-05T21:40:02.377Z
     *
     * @apiSuccess {Array} result Массив платежных данных
     *
     * @apiSuccessExample Success-Response:
     *   {
     *       "items": [
     *           {
     *               "idBills": 832,
     *               "billsAddTimestamp": "2018-04-01T00:10:00.000Z",
     *               "billsAmount": 62761.54,
     *               "billsPaidAmount": 53934.54,
     *               "billsCount": 399,
     *               "billsPaidCount": 369
     *           }
     *       ],
     *       "total": 4784,
     *       "page": 1,
     *       "perPage": 1
     *   }
     *
     *  @apiErrorExample {json} Error-Response
     *  HTTP/1.1 400 Bad Request
     *  {
     *      "error": "ERROR_VALIDATION_VALIDATION",
     *      "details": {
     *          "invalidField": "startDate",
     *          "invalidValue": "2019-04-06T21:40:02.000Z",
     *          "message": "Начальная дата должна быть раньше конечной",
     *          "type": "Date"
     *      }
     *  }
     */
    .get(billsProtectedRoute + "items", bills.validator, bills.getItems);

export {router};