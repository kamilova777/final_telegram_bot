import TelegramBot from "node-telegram-bot-api";
import { config } from "dotenv";

config()

const TOKEN = process.env.BOT_TOKEN
const bot = new TelegramBot(TOKEN , {polling: true})

bot.on("message" , (msg) => {
    const text = msg.text
    const firstName = msg.chat.first_name
    const chatId = msg.chat.id
    //Start 
    if(text == "/start") {
        console.log("Start...");
        console.log(msg);
        
    }
})