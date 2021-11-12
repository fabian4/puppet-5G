import {post} from "./request";
import {api} from "./Api";
import stringRandom from "string-random";
import {config} from "../config";

export function send(to: string, msg: string){
    post(api.sendMessage, {
        "messageId": stringRandom(20),
        "messageList": [
            {
                "contentType": "text/plain",
                "contentEncoding": "utf8",
                "contentText": msg
            }
        ],
        "destinationAddress": [`tel:+86${to}`],
        "senderAddress": config.chatbotId,
        "serviceCapabilit": [
            {
                "capabilityId": "ChatbotSA",
                "version": "+g.gsma.rcs.botversion=\"#=1\""
            }
        ],
        "conversationId": "XSFDSFDFSAFDSAS^%",
        "contributionId": "SFF$#REGFY7&^%THT"
    })
}
