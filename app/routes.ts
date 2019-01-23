import * as config from 'config';
import * as Router from 'koa-router';
import { AuthController } from './controllers/auth';
import { Users as UsersController } from './controllers/users';
import { Bills as BillsController } from './controllers/bills';
import { Context } from 'koa';

const router = new Router();
const users = new UsersController();
const bills = new BillsController();
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
     * @api {get} /api/users/item-by-email
     * @apiName getUserByEmail
     * @apiGroup User
     *
     * @apiDescription Возвращает пользователя по email
     *
     * @apiHeader (Authorization) authorization Authorization value.
     * @apiHeaderExample Headers-Example:
     *   { "Authorization": "Bearer :jwtToken" }
     *
     * @apiParam {String} email Идентификатор пользователя.
     *
     * @apiSuccess {Object} result пользователь.
     */
    .get(usersProtectedRoute + 'item-by-email', users.getItemByEmail)
    /**
     * @api {get} /api/bills/items
     * @apiName getBills
     * @apiGroup Bill
     *
     * @apiDescription Возвращает список bill
     *
     * * @apiHeader (Authorization) authorization Authorization value.
     * @apiHeaderExample Headers-Example:
     *   { "Authorization": "Bearer :jwtToken" }
     *
     * @apiSuccess {Array} result Массив созданных bill.
     */
    .get(billsProtectedRoute + 'items', bills.getItems)
    /**
     * @api {get} /api/bills/item
     * @apiName getBill
     * @apiGroup Bill
     *
     * @apiDescription Возвращает bill по id
     *
     * @apiHeader (Authorization) authorization Authorization value.
     * @apiHeaderExample Headers-Example:
     *   { "Authorization": "Bearer :jwtToken" }
     *
     * @apiParam {Number} id Идентификатор bill.
     *
     * @apiSuccess {Object} result bill.
     */
    .get(billsProtectedRoute + 'item', bills.getItem)
    /**
     * @api {get} /api/bills/items-by-dates
     * @apiName getBillByDate
     * @apiGroup Bill
     *
     * @apiDescription Возвращает bill по dates
     *
     * @apiHeader (Authorization) authorization Authorization value.
     * @apiHeaderExample Headers-Example:
     *   { "Authorization": "Bearer :jwtToken" }
     *
     * @apiParam {String} fromDate Формат ISO 8601 UTC.
     * @apiParam {String} toDate Формат ISO 8601 UTC.
     *
     * @apiSuccess {Array} result bills.
     */
    .get(billsProtectedRoute + 'items-by-dates', bills.getItemsByDates);

export { router };
