import Router from "koa-router";

const router = new Router();

router.get('/', async (ctx) => {
    ctx.body = 'Hello World!';
});

router.get('/sms/notifyPath', async (ctx) => {
    console.log(ctx.header)
})

export default router.routes()
