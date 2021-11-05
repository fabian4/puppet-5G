import {post} from "./request";
import {api} from "./Api";
import {bot} from "../../local";

export function send(msg: string){
    post(api.sendMessage, {
        "messageId": "1",
        "messageList": [
            {
                "contentType": "text/plain",
                "contentEncoding": "utf8",
                "contentText": msg
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
        "conversationId": "XSFDSFDFSAFDSAS^%",
        "contributionId": "SFF$#REGFY7&^%THT"
    }).then(res => {
        console.log(res.data)
    })
}
