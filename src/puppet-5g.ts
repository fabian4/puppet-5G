import {log, Puppet, PuppetOptions} from "wechaty-puppet";
import {initSever} from "./sever/sever";
import {config} from "./config";
import {updateToken} from "./help/request";
import {initApi} from "./help/Api";

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
    chatbotId: string
    serverRoot: string
    apiVersion: string

    constructor(options: Puppet5gOptions) {
        super();
        this.sipId = options.sipId
        this.appId = options.appId
        this.appKey = options.appKey
        this.chatbotId = `sip:${this.sipId}@botplatform.rcs.chinaunicom.cn`
        this.serverRoot = 'maap.5g-msg.com:30001'
        this.apiVersion = 'v1'
        log.verbose('Puppet5g', 'constructor("%s")', JSON.stringify(options))
    }

    onStart(): Promise<void> {

        initSever(this).then(() => {
            log.info('Puppet-Sever', `Server running on port ${config.port}`);
        })

        initApi(this)

        updateToken(this)

        return Promise.resolve(undefined);
    }

    onStop(): Promise<void> {
        return Promise.resolve(undefined);
    }

    onMessage(message: string){
        this.emit("message", message)
    }
}

export default Puppet5g
