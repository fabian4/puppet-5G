import Koa from 'koa';
import {logger} from "./logging";
import routers from "./routers";
import {config} from "../config";

const app = new Koa();

app.use(logger)
app.use(routers);

app.listen(config.port);

console.log('Server running on port 3000');
