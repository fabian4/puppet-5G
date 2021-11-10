import {log, Puppet, PuppetOptions} from "wechaty-puppet";
import {initSever} from "./sever/sever";
import {config} from "./config";
import {updateToken} from "./help/request";
import type {MessagePayload} from "wechaty-puppet/dist/esm/src/schemas/message";
import {Message} from "wechaty";

export type Puppet5gOptions = PuppetOptions & {
    sipId: string,
    appId: string,
    appKey: string,
}

class Puppet5g extends Puppet {

    static override readonly VERSION = "1.0.0"

    sipId: string
    appId: string
    appKey: string
    cacheMessagePayload : Map<string, MessagePayload>

    constructor(options: Puppet5gOptions) {
        super();
        this.sipId = options.sipId
        this.appId = options.appId
        this.appKey = options.appKey
        this.cacheMessagePayload = new Map()
        log.verbose('Puppet5g', 'constructor("%s")', JSON.stringify(options))
    }

    onStart(): Promise<void> {

        initSever(this).then(() => {
            log.info('Puppet-Sever', `Server running on port ${config.port}`);
        })

        updateToken(this)

        return Promise.resolve(undefined);
    }

    onStop(): Promise<void> {
        return Promise.resolve(undefined);
    }

    override async messageRawPayloadParser (payload: MessagePayload) {
        return payload
    }

    override async messageRawPayload (id: string): Promise<MessagePayload> {
        log.verbose('Puppet5g', 'messageRawPayload(%s)', id)
        return this.cacheMessagePayload.get(id)!
    }

    onMessage(message: Message){
        this.cacheMessagePayload.set(message.id, message)
        this.emit("message", {
            messageId: message.id
        })
    }
}

export default Puppet5g
