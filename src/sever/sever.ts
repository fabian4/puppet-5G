// import Koa from 'koa';
// import {logger} from "./logging";
// import routers from "./routers";
// import {config} from "../config";
import fetch from "node-fetch";
import {config_local} from "../../local";

// const app = new Koa();
//
// export async function initSever(){
//     app.use(logger)
//     app.use(routers);
//     app.listen(config.port);
// }

import('node-fetch').then(() => {
    fetch(`http://maap.5g-msg.com:30001/bot/v1/sip:${config_local.sipId}@botplatform.rcs.chinaunicom.cn/accessToken`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            appId: config_local.appId,
            appKey: config_local.appKey
        })
    }).then(r => console.log(r.json()));
})

