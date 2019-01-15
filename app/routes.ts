import * as config from 'config';
import * as Router from 'koa-router';
import { AuthController } from "./controllers/auth";
import { AggrsController } from "./controllers/aggrs";
import { Users as UsersController } from './controllers/users';

const router = new Router();
const users = new UsersController();
const aggrs = new AggrsController();
const auth = new AuthController();

const usersProtectedRoute = config.get('appConfig.apiPrefix') + 'users/';
const aggrsProtectedRoute = config.get('appConfig.apiPrefix') + 'aggrs/';
const authPublicRoute = config.get('appConfig.publicApiPrefix') + 'auth/';

router

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
 *       "result": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIifQ.dtxWM6MIcgoeMgH87tGvsNDY6cHWL6MGW4LeYvnm1JA"
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
         * @api {get} /api/aggrs/items
         * @apiName getAggrs
         * @apiGroup User
         *
         * @apiDescription Возвращает список агрегатов
         *
         * * @apiHeader (Authorization) authorization Authorization value.
         * @apiHeaderExample Headers-Example:
         *   { "Authorization": "Bearer :jwtToken" }
         *
         * @apiSuccess {Array} result Массив агрегатов по счетам.
         */
    .get(aggrsProtectedRoute + 'items', aggrs.getItems);

export { router };