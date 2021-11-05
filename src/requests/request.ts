import axios from "axios";
import {api} from "./Api";
import {bot} from "../../local";
import {log} from "wechaty-puppet";

let accessToken: string = ''

const headers = {
    'authorization': 'accessToken ' + accessToken,
    'Content-Type': 'application/json'
}

export function updateToken() {
    axios.request({
        url: api.accessToken,
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        data: {
            appId: bot.appId,
            appKey: bot.appKey
        }
    }).then(res => {
        accessToken = res.data.accessToken
        log.info('update-token', `new Token: ${accessToken}`)
    })
    // 定时两小时
    setTimeout(updateToken, 2 * 60 * 60 * 60 * 60)
}

export function get(params: {}, url: string) {
    return axios.request({
        url: url,
        method: 'GET',
        headers: headers,
        data: {
            ...params,
        }
    })
}

export function post(url: string, params: {}) {
    return axios.request({
        url: url,
        method: 'POST',
        headers: headers,
        data: {
            ...params,
        }
    })
}


axios.interceptors.response.use(
    function (response) {
        return response
    }, function (error) {
        console.log(error)
        return Promise.reject(error);
    }
)
