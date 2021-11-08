import type Puppet5g from "../puppet-5g";

export let base: string

export const api = {
    accessToken: '/accessToken',
    sendMessage: '/messages'
}

export function initApi(puppet: Puppet5g) {
    base = `http://${puppet.serverRoot}/bot/${puppet.apiVersion}/${puppet.chatbotId}`
}
