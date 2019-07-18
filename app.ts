import * as config from "config";
import { IAppConfig, InnotsApp, PgPool, PgService } from "innots";

import { router } from "./app/routes";

console.log('Starting application with', config);

const pgService = new PgService(new PgPool(config.get('db')));

const app = new InnotsApp(config.get<IAppConfig>('appConfig'), router);

app.bootstrap()
    .then(() => {
        console.log('server is listening on port', config.get('appConfig.port'));
    })
    .catch((err) => {
        console.error(err);
    });

export { app, pgService, config };