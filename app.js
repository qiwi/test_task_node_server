"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("config");
exports.config = config;
const innots_1 = require("innots");
const routes_1 = require("./app/routes");
const pgService = new innots_1.PgService(new innots_1.PgPool(config.get('db')));
exports.pgService = pgService;
const app = new innots_1.InnotsApp(config.get('appConfig'), routes_1.router);
exports.app = app;
app.bootstrap()
    .then(() => {
    console.log('server is listening on port', config.get('appConfig.port'));
})
    .catch((err) => {
    console.error(err);
});
//# sourceMappingURL=app.js.map