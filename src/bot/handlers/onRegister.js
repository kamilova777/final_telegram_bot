import { User } from "../../models/User.js";
import { ADMIN_ID } from "../bot.js";

export async function onRegister(msg, bot) {
  const chatId = msg.chat.id
  const text = msg.text
  let user = await User.findOne({ chatId });
  if (!user) return

  bot.sendMessage(chatId, `📝 Qaysi kursdan ro‘yxatdan o'tmoqchisiz?`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: "🇬🇧 Ingliz tili", callback_data: "register_english" }],
        [{ text: "🇷🇺 Rus tili", callback_data: "register_rus" }],
        [{ text: "💻 Dasturlash (IT)", callback_data: "register_IT" }],
        [{ text: "📗 Matematika", callback_data: "register_math" }]
      ]
    }
  });
}






export async function register_english(msg, query, bot) {

  const text = msg.text
  const chatId = msg.chat.id
  let user = await User.findOne({ chatId });
  if (!user) return;
  const msg_id = query.message.message_id;
  bot.deleteMessage(chatId, msg_id)

  user = await User.findOneAndUpdate({ chatId }, { action: "awaiting_name" })

  bot.sendMessage(chatId, "Ismingizni kiriting")

 
}

