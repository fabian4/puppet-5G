import Puppet5g from "../src/puppet-5g";
import type {
    EventErrorPayload,
    EventLoginPayload,
    EventLogoutPayload,
    EventMessagePayload,
    EventScanPayload
} from "wechaty-puppet/dist/esm/src/schemas/event";
import {log} from "wechaty-puppet";

/**
 *
 * 1. Declare your Bot!
 *
 */
const puppet = new Puppet5g({
    sipId: "20210401",
    appId: "28871d8c83954bc78424ffcbff80285c",
    appKey: " 3b9cc5506af2466aa82eee4c04f86471"
})
log.level('verbose')

/**
 *
 * 2. Register event handlers for Bot
 *
 */
puppet
    .on('logout', onLogout)
    .on('login',  onLogin)
    .on('scan',   onScan)
    .on('error',  onError)
    .on('message', onMessage)


/**
 *
 * 3. Start the bot!
 *
 */
puppet.start()
    .catch(async (e: any) => {
        console.error('Bot start() fail:', e)
        await puppet.stop()
        process.exit(-1)
    })

/**
 *
 * 4. Define Event Handler Functions for:
 *  `scan`, `login`, `logout`, `error`, and `message`
 *
 */
function onScan (payload: EventScanPayload) {
    if (payload.qrcode) {
        const qrcodeImageUrl = [
            'https://wechaty.js.org/qrcode/',
            encodeURIComponent(payload.qrcode),
        ].join('')
        console.info(`[${payload.status}] ${qrcodeImageUrl}\nScan QR Code above to log in: `)

    } else {
        console.info(`[${payload.status}]`)
    }
}

function onLogin (payload: EventLoginPayload) {
    console.info(`${payload.contactId} login`)
    puppet.messageSendText(payload.contactId, 'Wechaty login').catch(console.error)
}

function onLogout (payload: EventLogoutPayload) {
    console.info(`${payload.contactId} logouted`)
}

function onError (payload: EventErrorPayload) {
    console.error('Bot error:', payload.data)
}

/**
 *
 * 5. The most important handler is for:
 *    dealing with Messages.
 *
 */
async function onMessage (payload: EventMessagePayload) {
    const msgPayload = await puppet.messagePayload(payload.messageId)
    if (/ding/i.test(msgPayload.text || '')) {
        console.info('ding success')
        await puppet.messageSendText(
            msgPayload.fromId!,
            'dong',
        )
    } else {
        console.info('ding not found')
        await puppet.messageSendText(
            msgPayload.fromId!,
            'ding please',
        )
    }
    console.info(JSON.stringify(msgPayload))
}

/**
 *
 * 7. Output the Welcome Message
 *
 */
const welcome = `
Puppet Version: ${puppet.version()}

Please wait... I'm trying to login in...

`
console.info(welcome)
