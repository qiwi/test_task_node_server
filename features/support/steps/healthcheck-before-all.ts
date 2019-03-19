import {BeforeAll} from "cucumber";
import {config} from "../../../app";
import fetch from "node-fetch";

BeforeAll(async function(): Promise<void> {
    await fetch(`http://localhost:${config.get('appConfig.port')}/api/public/healthcheck`);
});
