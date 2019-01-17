import * as config from "config";
import * as Router from "koa-router";
import { AuthController } from "./controllers/auth";
import { Bills as BillsController } from "./controllers/bills";
import { Users as UsersController } from "./controllers/users";

const router = new Router();
const bills = new BillsController();
const users = new UsersController();
const auth = new AuthController();

const billsProtectedRoute = config.get("appConfig.apiPrefix") + "bills/";
const usersProtectedRoute = config.get("appConfig.apiPrefix") + "users/";
const authPublicRoute = config.get("appConfig.publicApiPrefix") + "auth/";

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
 * @apiSuccess {String} result :jwtToken
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "result": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIifQ.dtxWM6MIcgoeMgH87tGvsNDY6cHWL6MGW4LeYvnm1JA"
 *     }
 */
  .post(authPublicRoute + "login", auth.login)
  /**
   * @api {get} /api/users/items
   * @apiName getUsers
   * @apiGroup User
   *
   * @apiDescription Возвращает список пользователей
   *
   * @apiHeader (Authorization) authorization Authorization value.
   * @apiHeaderExample Headers-Example:
   *   { "Authorization": "Bearer :jwtToken" }
   *
   * @apiSuccess {Array} result Массив созданных пользователей.
   */
  .get(usersProtectedRoute + "items", users.getItems)
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
  .get(usersProtectedRoute + "item", users.getItem)
  /**
   * @api {get} /api/bills/items
   * @apiName getBills
   * @apiGroup Bills
   *
   * @apiDescription Возвращает список платежных данных
   *
   * @apiHeader (Authorization) authorization Authorization value.
   * @apiHeaderExample Headers-Example:
   *   { "Authorization": "Bearer :jwtToken" }
   *
   * @apiParam {String} from Нижняя граница даты транзакций пополнения счетов.
   * @apiParam {String} to Верхняя граница даты транзакций пополнения счетов.
   * @apiParam {String} limit Максимальное кол-во выдываемых агрегационных транзакций.
   * @apiParam {String} offset Смещение (начало отсчета) выдываемых агрегационных транзакций.
   *
   * @apiSuccess {Array} result Массив платёжных данных о пополнениях счетов.
   */
  .get(billsProtectedRoute + "items", bills.getItems);

export { router };
