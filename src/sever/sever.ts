import Koa from 'koa';
import {logger} from "./logging";
import routers from "./routers";
import {config} from "../config";

const app = new Koa();

export async function initSever(){
    app.use(logger)
    app.use(routers);
    app.listen(config.port);
}
