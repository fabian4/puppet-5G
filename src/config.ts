const config = {
    port: 3000,
    chatbotId: '',
    serverRoot: 'maap.5g-msg.com:30001',
    apiVersion: 'v1'
};

export let base: string = `http://${config.serverRoot}/bot/${config.apiVersion}/`

export { config };
