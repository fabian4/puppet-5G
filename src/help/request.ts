import axios from "axios";
import {api, base} from "./Api";
import {log} from "wechaty-puppet";
import type Puppet5g from "../puppet-5g";

let headers = {
    'authorization': 'accessToken ',
    'Content-Type': 'application/json'
}

export function updateToken(puppet: Puppet5g) {
    axios.request({
        url: base + api.accessToken,
        method: 'POST',
        headers: headers,
        data: {
            appId: puppet.appId,
            appKey: puppet.appKey
        }
    }).then(res => {
        headers.authorization = headers.authorization + res.data.accessToken
        log.info('update-token', `new Token: ${headers['authorization']}`)
    })
    // 定时两小时
    setTimeout(updateToken, 2 * 60 * 60 * 60 * 60, puppet)
}

export function get(params: {}, url: string) {
    return axios.request({
        url: base + url,
        method: 'GET',
        headers: headers,
        data: {
            ...params,
        }
    })
}

export function post(url: string, params: {}) {
    return axios.request({
        url: base + url,
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
