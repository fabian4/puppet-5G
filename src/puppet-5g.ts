import {Puppet, PuppetOptions} from "wechaty-puppet";
import {VERSION} from "./config";

export type Puppet5gOptions = PuppetOptions & {
    sms: string,
}

class Puppet5g extends Puppet {

    static override readonly VERSION = VERSION;

    sms: string | '+861234';

    onStart(): Promise<void> {
        return Promise.resolve(undefined);
    }

    onStop(): Promise<void> {
        return Promise.resolve(undefined);
    }

    constructor(public override options: Puppet5gOptions) {
        super(options);
        if (options.sms) {
            this.sms = options.sms
        }
    }
}
