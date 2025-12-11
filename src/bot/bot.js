import TelegramBot from "node-telegram-bot-api";
import { config } from "dotenv";
import onStart from "./handlers/onStart.js";
import onProfil from "./handlers/onProfil.js"

config();

const TOKEN = process.env.BOT_TOKEN;

const bot = new TelegramBot(TOKEN, { polling: true });
const channel_id = `@academy_100x_uz`

bot.on("message", async function (msg) {
  const chatId = msg.chat.id;
  const firstName = msg.chat.first_name
  const text = msg.text;

  // status

  // -kicked - chiqarib yuborilgan
  // -left - tark etgan
  // -creator - yaratuvchi
  // -admin - admin
  // -member - a'zo

  const chatMember = await bot.getChatMember(channel_id, chatId)

  console.log(chatMember.status);
  if (chatMember.status == "left" || chatMember.status == "kicked") {
    return bot.sendMessage(
      chatId,
      `Hurmatli foydalanuvchi,\nBotni ishlatishingiz uchun quyidagi kanalga obuna bo'lishingiz shart... 👇`,
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "100x Academy Kanali",
                url: "https://t.me/academy_100x_uz",
              },
            ],
            [
              {
                text: "Obunani tekshirish ✅",
                callback_data: "confirm_subscription",
              },
            ],
          ],
        },
      }
    )
  }
  if (text === "/start") {

    return onStart(msg);
  } else if (text === "/profile") {
    return onProfil(msg);
  }

  return bot.sendMessage(chatId, `Kutilmagan xatolik... /start bosing!`);
});
bot.on("callback_query", async (query) => {
  const msg = query.message
  const chatId = msg.chat.id
  const firstName = msg.chat.first_name
  const queryData = query.data
  const queryId = query.id

  console.log(queryId);

  if (queryData == "confirm_subscription") {
    const chatMember = await bot.getChatMember(channel_id, chatId)
    console.log(chatMember.status);

    if (chatMember.status == "left" || chatMember.status == "kicked") {
      bot.answerCallbackQuery(queryId, {
        text: `Siz hali obuna bo'lmadingiz, Oldin obuna boling!`,
        show_alert: true,
      })
    } else {
      onStart(msg)
    }

  }


})
console.log("Bot ishga tushdi...");

export { bot };
