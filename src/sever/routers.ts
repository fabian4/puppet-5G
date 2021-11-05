import Router from "koa-router";

const router = new Router();

router.get('/', async (ctx: any) => {
    ctx.body = 'Hello World!';
});

router.get('/sms/notifyPath', async (ctx: any) => {
    console.log(ctx.header)
})

router.post('/sms/messageNotification/sip:20210401@botplatform.rcs.chinaunicom.cn/messages', async (ctx: any) => {
    console.log(ctx.header)
    console.log(ctx.request.body)
})

export default router.routes()
