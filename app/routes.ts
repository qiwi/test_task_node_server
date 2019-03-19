import * as config from 'config';
import * as Router from 'koa-router';
import {AuthController} from "./controllers/auth";
import {Users as UsersController} from './controllers/users';
import {Bills as BillsController} from './controllers/bills';
import {Context} from "koa";
import {get} from "http";

const router = new Router();
const users = new UsersController();
const auth = new AuthController();
const bills = new BillsController();

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
    .get(billsProtectedRoute + 'data', bills.getBills);

export {router};