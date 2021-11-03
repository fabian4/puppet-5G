import fetch from 'node-fetch';
import {config_local} from "../../local";

export async function updateToken() {
    const response = await fetch(`http://maap.5g-msg.com:30001/bot/v1/sip:${config_local.sipId}@botplatform.rcs.chinaunicom.cn/accessToken`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            appId: config_local.appId,
            appKey: config_local.appKey
        })
    });
    console.log(await response.json())
}
