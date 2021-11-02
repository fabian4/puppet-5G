import {log, Puppet, PuppetOptions} from "wechaty-puppet";
import {initSever} from "./sever/sever";
import {config} from "./config";

export type Puppet5gOptions = PuppetOptions & {
    sipId: string,
    appId: string,
    appKey: string,
}

class Puppet5g extends Puppet {

    static override readonly VERSION = "1.0.0"

    // private sipId: string
    // private appId: string
    // private appKey: string

    constructor(options: Puppet5gOptions) {
        super();
        // this.sipId = options.sipId
        // this.appId = options.appId
        // this.appKey = options.appKey
        log.verbose('Puppet5g', 'constructor("%s")', JSON.stringify(options))

    }

    onStart(): Promise<void> {
        initSever().then(() => {
            log.verbose('Puppet-Sever', `Server running on port ${config.port}`);
        }).catch(e => {
            log.error('Puppet-Sever', 'sever init error: ' + e.toString())
        })
        return Promise.resolve(undefined);
    }

    onStop(): Promise<void> {

        return Promise.resolve(undefined);
    }

}

export default Puppet5g
