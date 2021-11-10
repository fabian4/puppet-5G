import {config} from "../config";

export let base: string = `http://${config.serverRoot}/bot/${config.apiVersion}/${config.chatbotId}`

export const api = {
    accessToken: '/accessToken',
    sendMessage: '/messages'
}
