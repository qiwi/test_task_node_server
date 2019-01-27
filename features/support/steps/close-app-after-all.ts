import {AfterAll} from "cucumber";

AfterAll(function(): void {
    setTimeout(process.exit, 200);
});
