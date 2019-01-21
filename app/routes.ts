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
     * @api {post} /api/public/healthcheck
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
     * @api {get} /api/users/item
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
    .get(usersProtectedRoute + 'itembyemail', users.getItemByEmail)
    /**
     * @api {get} /api/bills/items
     * @apiName getBills
     * @apiGroup Bill
     *
     * @apiDescription Возвращает список законопроект
     *
     * * @apiHeader (Authorization) authorization Authorization value.
     * @apiHeaderExample Headers-Example:
     *   { "Authorization": "Bearer :jwtToken" }
     *
     * @apiSuccess {Array} result Массив созданных законопроект.
     */
    .get(billsProtectedRoute + 'items', bills.getItems)
    /**
     * @api {get} /api/bills/item
     * @apiName getBill
     * @apiGroup Bill
     *
     * @apiDescription Возвращает законопроект по id
     *
     * @apiHeader (Authorization) authorization Authorization value.
     * @apiHeaderExample Headers-Example:
     *   { "Authorization": "Bearer :jwtToken" }
     *
     * @apiParam {Number} id Идентификатор законопроект.
     *
     * @apiSuccess {Object} result законопроект.
     */
    .get(billsProtectedRoute + 'item', bills.getItem)
    /**
     * @api {get} /api/bills/itemsbydates
     * @apiName getBillByDate
     * @apiGroup Bill
     *
     * @apiDescription Возвращает законопроект по dates
     *
     * @apiHeader (Authorization) authorization Authorization value.
     * @apiHeaderExample Headers-Example:
     *   { "Authorization": "Bearer :jwtToken" }
     *
     * @apiParam {String} from Формат: "2018-04-01 03:50:00".
     * @apiParam {String} to Формат: "2018-04-01 03:50:00".
     *
     * @apiSuccess {Array} result законопроект.
     */
    .get(billsProtectedRoute + 'itemsbydates', bills.getItemsByDates);

export { router };
