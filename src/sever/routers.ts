import Router from "koa-router";
import type Puppet5g from "../puppet-5g";

const router = new Router();

router.get('/', async (ctx: any) => {
    ctx.body = 'Hello World!';
});

router.get('/sms/notifyPath', async (ctx: any) => {
    console.log(ctx.header)
})

router.post('/sms/messageNotification/sip:20210401@botplatform.rcs.chinaunicom.cn/messages', async (ctx: any) => {
    const puppet: Puppet5g = ctx.puppet
    puppet.onMessage(ctx.request.body.messageList[0]['contentText'])
})

export default router.routes()
