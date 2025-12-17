import { User } from "../../models/User.js";

export async function onRegister(msg,bot) {
    const chatId= msg.chat.chatId
    const text = msg.text

    let user = await User.findOne({chatId:chatId})

    if(!user) return

    user = await User.findOneAndUpdate(
        {chatId: chatId},
        {action : "Awaiting_name"}
    )

    bot.sendMessage(chatId , `Iltimos, ismingizni kiriting:`)
}


