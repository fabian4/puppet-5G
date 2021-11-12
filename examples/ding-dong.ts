import Puppet5g from "../src/puppet-5g";
import {log} from "wechaty-puppet";
import {local} from "../local";
import {Message, WechatyBuilder} from "wechaty";

/**
 *
 * 1. Declare your Bot!
 *
 */
const puppet = new Puppet5g({
    sipId: local.sipId,
    appId: local.appId,
    appKey: local.appKey
})
const bot = WechatyBuilder.build({
    name: 'myBot',
    puppet: puppet
})
log.level('info')

/**
 *
 * 2. Register event handlers for Bot
 *
 */
bot
    .on('message', onMessage)


/**
 *
 * 3. Start the bot!
 *
 */
bot.start()
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
// function onScan (payload: EventScanPayload) {
//     if (payload.qrcode) {
//         const qrcodeImageUrl = [
//             'https://wechaty.js.org/qrcode/',
//             encodeURIComponent(payload.qrcode),
//         ].join('')
//         console.info(`[${payload.status}] ${qrcodeImageUrl}\nScan QR Code above to log in: `)
//
//     } else {
//         console.info(`[${payload.status}]`)
//     }
// }
//
// function onLogin (payload: EventLoginPayload) {
//     console.info(`${payload.contactId} login`)
//     puppet.messageSendText(payload.contactId, 'Wechaty login').catch(console.error)
// }
//
// function onLogout (payload: EventLogoutPayload) {
//     console.info(`${payload.contactId} logouted`)
// }
//
// function onError (payload: EventErrorPayload) {
//     console.error('Bot error:', payload.data)
// }

/**
 *
 * 5. The most important handler is for:
 *    dealing with Messages.
 *
 */
async function onMessage (msg: Message) {
    console.log(`receive message: ${msg.text()}`)
    if(msg.text() === 'ding'){
        await msg.talker().say("dong")
    }
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
