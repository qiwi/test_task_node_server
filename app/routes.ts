import * as config from 'config';
import * as Router from 'koa-router';
import { AggrBillsController } from "./controllers/aggr_bills";
import { AuthController } from "./controllers/auth";
import { Users as UsersController } from './controllers/users';

const router = new Router();
const users = new UsersController();
const auth = new AuthController();
const aggrBills = new AggrBillsController();

const usersProtectedRoute = config.get('appConfig.apiPrefix') + 'users/';
const aggrBillsProtectedRoute = config.get('appConfig.apiPrefix') + 'aggrBills';
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
     * @api {get} /api/aggrBills
     * @apiName getAggrBills
     * @apiGroup AggrBills
     *
     * @apiDescription Возвращает записи из таблицы aggr_bills в определенном временном интервале, если какая-то
     * из границ интервала не передана или не может быть преобразована в формат даты, то вместо неё используется
     * граничное значение.(Для начала - 01.01.1970T00:00:00, для конца - текущая дата и время)
     *
     * @apiHeader (Authorization) authorization Authorization value.
     * @apiHeaderExample Headers-Example:
     *   { "Authorization": "Bearer :jwtToken" }
     *
     * @apiParam {string} (optional) Начало временного интервала для фильтровки по дате.
     * @apiParam {string} (optional) Конец временного интервала для фильтровки по дате.
     * Строки параметров должны конвертироваться в формат Date.
     *
     * @apiSuccess {Object} result записи из таблицы.
     */
    .get(aggrBillsProtectedRoute, aggrBills.getAggrBills);

export { router };