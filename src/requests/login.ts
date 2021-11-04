import {config_local} from "../../local";

import axios from 'axios'
import {api} from "./Api";

export async function updateToken() {
    await axios.request({
        url: api.accessToken,
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        data: {
            appId: config_local.appId,
            appKey: config_local.appKey
        }
    }).then(res => {
        console.log(res.data)
    })
}
