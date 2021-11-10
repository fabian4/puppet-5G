import * as PUPPET  from 'wechaty-puppet';
import {initSever} from "./sever/sever";
import {config} from "./config";
import {updateToken} from "./help/request";

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
        this.cacheMessagePayload = new Map()
        this.cacheContactPayload = new Map()
        PUPPET.log.verbose('Puppet5g', 'constructor("%s")', JSON.stringify(options))
    }

    onStart(): Promise<void> {

        initSever(this).then(() => {
            PUPPET.log.info('Puppet-Sever', `Server running on port ${config.port}`);
        })

        updateToken(this)

        this.login(this.sipId)

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

    onMessage(message: string){
        this.cacheMessagePayload.set(message, {
            id: message,
            timestamp: 2352345135,
            type: PUPPET.type.Message.Text,
            fromId: '23512344',
            toId: '352352345'
        })
        this.emit("message", {
            messageId: message
        })
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
