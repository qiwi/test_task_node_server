import * as config from 'config';
import * as Router from 'koa-router';
import {AuthController} from "./controllers/auth";
import {Users as UsersController} from './controllers/users';
import {Context} from "koa";
import {BillsController} from "./controllers/bills";

const router = new Router();
const users = new UsersController();
const bills = new BillsController();
const auth = new AuthController();

const apiPrefix = config.get('appConfig.apiPrefix');
const publicApiPrefix = config.get('appConfig.publicApiPrefix');

const usersProtectedRoute = apiPrefix + 'users/';
const billsProtectedRoute = apiPrefix + 'bills';
const authPublicRoute = publicApiPrefix + 'auth/';
const healthcheckRoute = publicApiPrefix + 'healthcheck';

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
     * @api {get} /api/bills/aggregated
     * @apiName getAggregatedBills
     * @apiGroup Bills
     *
     * @apiDescription Возвращает аггрегированные счета
     *
     * @apiHeader (Authorization) authorization Authorization value
     * @apiHeaderExample Headers-Example:
     *  {"Authorization": "Bearer :jwtToken"}
     *
     * @apiParam {string} [fromDate] ISO 8601
     * @apiParamExample {string} fromDate
     *  2019-01-26T23:20:23.347Z
     * @apiParam {string} [toDate] ISO 8601, **required** when `page` is greater than `1`
     * @apiParamExample {string} toDate
     *  2019-01-26T23:30:23.347Z
     * @apiParam {Number{1..}} [page=1] When `page` is greater than `1`, then it **must** be used with `toDate` filter
     * @apiParam {Number{1..50}} [perPage=10] items per page
     *
     * @apiSuccessExample Success-Response:
     *  HTTP/1.1 200 OK
     *  {
     *      "items": [
     *          {
     *              "idBills": 4277,
     *              "billsCount": 106,
     *              "billsAmount": 11974.18,
     *              "billsPaidCount": 100,
     *              "billsPaidAmount": 9984.18,
     *              "billsAddTimestamp": "2018-04-01T04:15:00.000Z"
     *          }
     *      ],
     *      "total": 500,
     *      "page": 1,
     *      "perPage": 1
     *  }
     *
     * @apiErrorExample {json} Error-Response:
     *  HTTP/1.1 400 Bad Request
     *  {
     *    "error": "ERROR_VALIDATION_FAILED",
     *    "details": {
     *      "invalidField": "page",
     *      "invalidValue": 2,
     *      "message": "\"page\" greater than 1 is not allowed without \"toDate\" parameter"
     *    }
     *  }
     */
    .get(billsProtectedRoute + '/aggregated', bills.aggregatedValidation, bills.aggregated)
;

export {router};