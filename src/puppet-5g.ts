import * as PUPPET  from 'wechaty-puppet';
import {initSever} from "./sever/sever";
import {config} from "./config";
import {updateToken} from "./help/request";
import {messageParse} from "./help/prase";
import type {message} from "./help/struct";

export type Puppet5gOptions = PUPPET.PuppetOptions & {
    sipId: string,
    appId: string,
    appKey: string,
}

class Puppet5g extends PUPPET.Puppet {

    static override readonly VERSION = "1.0.0"

    sipId: string
    appId: string
    appKey: string
    cacheMessagePayload : Map<string, PUPPET.payload.Message>
    cacheContactPayload : Map<string, PUPPET.payload.Contact>

    constructor(options: Puppet5gOptions) {
        super();
        this.sipId = options.sipId
        this.appId = options.appId
        this.appKey = options.appKey
        config.chatbotId = `sip:${this.sipId}@botplatform.rcs.chinaunicom.cn`
        this.cacheMessagePayload = new Map()
        this.cacheContactPayload = new Map()
        PUPPET.log.verbose('Puppet5g', 'constructor("%s")', JSON.stringify(options))
    }

    onStart(): Promise<void> {

        initSever(this).then(() => {
            PUPPET.log.info('Puppet-Sever', `Server running on port ${config.port}`);
        })

        console.log(config.chatbotId)

        updateToken(this)

        this.login(config.chatbotId)

        return Promise.resolve(undefined);
    }

    onStop(): Promise<void> {
        return Promise.resolve(undefined);
    }

    /**
     *
     * Message
     *
     */
    override async messageRawPayloadParser (payload: PUPPET.payload.Message) {
        return payload
    }

    override async messageRawPayload (id: string): Promise<PUPPET.payload.Message> {
        PUPPET.log.verbose('Puppet5g', 'messageRawPayload(%s)', id)
        return this.cacheMessagePayload.get(id)!
    }

    onMessage(message: message){
        const msg: PUPPET.payload.Message = messageParse(message)
        this.cacheMessagePayload.set(message.messageId, msg)
        this.emit("message", {messageId: message.messageId})
    }

    /**
     *
     * Contact
     *
     */
    override async contactRawPayloadParser (payload: PUPPET.payload.Contact) { return payload }
    override async contactRawPayload (id: string): Promise<PUPPET.payload.Contact> {
        PUPPET.log.verbose('PuppetMock', 'contactRawPayload(%s)', id)
        return this.cacheContactPayload.get(id)!
    }
}

export default Puppet5g
