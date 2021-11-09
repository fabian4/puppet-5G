import {config} from "../config";

export const base: string = `http://${config.serverRoot}/bot/${config.apiVersion}/${config.chatbotId}`

export const api = {
    accessToken: base + '/accessToken',
    sendMessage: base + '/messages'
}
