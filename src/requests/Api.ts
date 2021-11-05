import {bot} from "../../local";

const base = `https://${bot.serverRoot}/bot/${bot.apiVersion}/${bot.sipId}@${bot.chatbotId}`

export const api = {
    accessToken: base + 'accessToken'
}
