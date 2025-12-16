import { bot } from "../bot.js";
import { User } from "../../models/User.js";

async function onStart(msg) {
  const chatId = msg.chat.id;
  const firstName = msg.chat.first_name;
  console.log(msg);
  
  let user = await User.findOne({ chatId });

  if (!user) {
    user = new User({
      chatId,
      firstName,
      username: msg.chat.username
    });

    user.save();
  }


    bot.sendMessage(

        chatId,

        `👋 Assalomu alaykum, ${firstName}!
🎓 100x Academy o‘quv markazining rasmiy botiga xush kelibsiz!

Bu bot orqali siz:
• Kurslarimiz haqida batafsil ma’lumot olasiz
• Kurslarga onlayn ro‘yxatdan o‘tishingiz mumkin
• Jadval va to‘lovlar haqida ma’lumot olasiz
    +
👇 Quyidagi menyudan kerakli bo‘limni tanlang`, {
        reply_markup: {
            keyboard: [
                ["📚 Kurslar", "📝 Ro‘yxatdan o‘tish"],
                ["ℹ️ Markaz haqida", "💬 Fikr bildirish"],
                ["❓ Yordam"],
            ],
            resize_keyboard: true,
        },
    });


}
export default onStart;
