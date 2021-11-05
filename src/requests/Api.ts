import {bot} from "../../local";

const base = `http://${bot.serverRoot}/bot/${bot.apiVersion}/${bot.sipId}@${bot.chatbotId}`

export const api = {
    accessToken: base + '/accessToken',
    sendMessage: base + '/messages'
}
