import TelegramBot from "node-telegram-bot-api";
import { config } from "dotenv";
import onStart from "./handlers/onStart.js";
import onProfil from "./handlers/onProfil.js";

config();

const TOKEN = process.env.BOT_TOKEN;

const bot = new TelegramBot(TOKEN, { polling: true });

bot.on("message", function (msg) {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === "/start") {
    return onStart(msg);
  } else if (text === "/profile") {
    return onProfil(msg);
  }

  return bot.sendMessage(chatId, `Kutilmagan xatolik... /start bosing!`);
});

console.log("Bot ishga tushdi...");

export { bot };
