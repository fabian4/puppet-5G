import Koa from 'koa';
import {logger} from "./logging";
import routers from "./routers";
import {config} from "../config";
import koaBody from "koa-body"
import type Puppet5g from "../puppet-5g";

const app = new Koa();

export async function initSever(puppet: Puppet5g){
    app.use(logger);
    app.use(koaBody())
    app.use(routers);
    app.context['puppet'] = puppet;
    app.listen(config.port);
}
