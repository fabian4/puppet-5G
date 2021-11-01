import {log, Puppet, PuppetOptions} from "wechaty-puppet";

export type Puppet5gOptions = PuppetOptions & {
    sipId: string,
    appId: string,
    appKey: string,
}

class Puppet5g extends Puppet {

    private sipId: string
    private appId: string
    private appKey: string

    // constructor(options: Puppet5gOptions) {
    //     super();
    //     this.sipId = options.sipId
    //     this.appId = options.appId
    //     this.appKey = options.appKey
    //     log.verbose('PuppetWalnut', 'constructor("%s")', JSON.stringify(options))
    // }

    override async start (): Promise<void> {
    }

    async stop (): Promise<void> {
    }

    async login (contactId: string): Promise<void> {
    }

    async logout (): Promise<void> {
    }

}
