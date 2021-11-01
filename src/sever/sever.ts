import Koa from 'koa';
import {logger} from "./logging";
import routers from "./routers";

const app = new Koa();

app.use(logger)
app.use(routers);

app.listen(3000);

console.log('Server running on port 3000');
