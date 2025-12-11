import { bot } from "../bot.js";
import { User } from "../../models/User.js";

async function onProfil(msg) {
  const chatId = msg.chat.id;

  const user = await User.findOne({ chatId });

  if (!user) {
    return bot.sendMessage(chatId, "Siz ro‘yxatdan o'tmagansiz. /start bosing.");
  }

  bot.sendMessage(
    chatId,
    `
SHAHSIY MA'LUMOTLAR:

• Chat ID: ${user.chatId}
• Ism: ${user.firstname}
• Username: ${user.username}
• Active: ${user.active ? "Faol" : "No faol"}
• Balance: ${user.balance}
`
  );
}

export default onProfil;
