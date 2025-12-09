import { bot } from "../bot";
import User from "../models/User.js";

async function onProfil(msg) {
    const chatId = msg.chat.id
    const user =await User.findOne({chatId :chatId})

    console.log(user);
    
    bot.sendMessage(chatId ,`
        SHAHSIY MA'LUMOTLARINGIZ: \n
        
        -CHAT -ID: ${user.chatId}
        -ISM:${user.firstName}
        -USERNAME:${user.username}
        -ACTIVE: ${user.active ? "Faol" : "No faol"}
        -BALANCE:${user.balance}
                `
)}