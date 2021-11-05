import {post} from "./request";
import {api} from "./Api";
import {bot} from "../../local";

export function send(){
    post(api.sendMessage, {
        "messageId": "1",
        "messageList": [
            {
                "contentType": "text/plain",
                "contentEncoding": "utf8",
                "contentText": "hello world"
            }
        ],
        "destinationAddress": ["tel:+8613911833788"],
        "senderAddress": bot.sipId + "@" + bot.chatbotId,
        "serviceCapabilit": [
            {
                "capabilityId": "ChatbotSA",
                "version": "+g.gsma.rcs.botversion=\"#=1\""
            }
        ],
        "smsSupported": false,
        "smsContent": "hello world!",
        "storeSupported": false,
        "conversationId": "XSFDSFDFSAFDSAS^%",
        "contributionId": "SFF$#REGFY7&^%THT"
    }).then(res => {
        console.log(res.data)
    })
}
