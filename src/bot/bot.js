import TelegramBot from "node-telegram-bot-api";
import { config } from "dotenv";
import onStart from "./handlers/onStart.js";
import onProfil from "./handlers/onProfil.js"

config();

const TOKEN = process.env.BOT_TOKEN;

const bot = new TelegramBot(TOKEN, { polling: true });
const channel_id = `@js_academy`

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
                text: "JS Academy Kanali",
                url: "https://t.me/js_academy",
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
  else if (text === "/start") {

    return onStart(msg);
  } else if (text === "/profile") {
    return onProfil(msg);
  } else if (text == "📚 Kurslar") {
    bot.sendMessage(chatId,
      `🎓 Bizning o‘quv markazimizda quyidagi kurslar mavjud:

1️⃣ Ingliz tili
2️⃣ Rus tili
3️⃣ Matematika
4️⃣ Dasturlash (Python, Web)
5️⃣ Grafik dizayn

👇 Quyidagi kurslardan birini tanlang va batafsil ma’lumot oling:`, {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🇺🇸 Ingliz tili", callback_data: "kurs_ingliz" },
          ],
          [
            { text: "🇷🇺 Rus tili", callback_data: "kurs_rus" }

          ],
          [
            { text: "📗 Matematika", callback_data: "kurs_matematika" }
          ],
          [
            { text: " 💻 Dasturlash", callback_data: "kurs_dasturlash" }

          ]
        ]
      }

    });
  } else if (text == "ℹ️ Markaz haqida") {
    bot.sendMessage(chatId, `🏫 Bizning o‘quv markazimiz yoshlar va kattalar uchun sifatli ta’lim berishga ixtisoslashgan.

📘 Zamonaviy o‘quv dasturlari
👨‍🏫 Tajribali va malakali ustozlar
🎓 Amaliy va nazariy mashg‘ulotlar
📊 Natijaga yo‘naltirilgan ta’lim tizimi

📚 Yo‘nalishlar:
🇬🇧 Ingliz tili
🇷🇺 Rus tili
📗 Matematika
💻 Dasturlash
`,{
  reply_markup: {
    inline_keyboard: [
      [
        { text: "📍 Location", callback_data: "location" }
      ],
     
    ]
  }
}
)



  }else if (text == "💬 Fikr bildirish") {
    bot.sendMessage(chatId, "Siz kursimizdan mamnunmisiz?", {
  reply_markup: {
    inline_keyboard: [
      [
        { text: "👍 Yoqdi", callback_data: "like" },
        { text: "👎 Yoqmad", callback_data: "dislike" }
      ]
    ]
  }
});

  }
  else {
    bot.sendMessage(chatId, `Kutilmagan xatolik... /start bosing!`);
  }
});
bot.on("callback_query", async (query) => {
  const msg = query.message
  const chatId = msg.chat.id
  const firstName = msg.chat.first_name
  const data = query.data
  const queryId = query.id

  console.log(queryId);

  if (data == "confirm_subscription") {
    const chatMember = await bot.getChatMember(channel_id, chatId)
    console.log(chatMember.status);

    if (chatMember.status == "left" || chatMember.status == "kicked") {
      bot.answerCallbackQuery(queryId, {
        text: `Siz hali obuna bo'lmadingiz, Oldin obuna boling!`,
        show_alert: true,
      })
    }

    else {
      onStart(msg)
    }

  }
  else if (data == "kurs_ingliz") {
    bot.sendMessage(chatId, `🇬🇧 Ingliz tili kursi

🕒 Davomiyligi: 3 oy
🎯 Darajalar: Beginner – Intermediate
📘 O‘quv dasturi: Speaking, Listening, Grammar
📌 Har haftasi 3 ta dars
💰 Narx: 250 000 so’m / oy`, {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "✍️ Ro‘yxatdan o‘tish", callback_data: "register_english" }
          ],
          [
            { text: "⬅️ Orqaga", callback_data: "back_to_courses" }
          ]
        ]
      }
    })
  }
  else if (data == "kurs_rus") {
    bot.sendMessage(chatId, `🇷🇺 Rus tili kursi
🕒 Davomiyligi: 3 oy
🎯 0 dan boshlovchilar uchun
📘 So‘z boyligi, grammatikasi, og‘zaki nutq
📌 Haftada 3 ta dars
💰 Narx: 230 000 so’m / oy`, {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "✍️ Ro‘yxatdan o‘tish", callback_data: "register_english" }
          ],
          [
            { text: "⬅️ Orqaga", callback_data: "back_to_courses" }
          ]
        ]
      }
    })
  }
  else if (data == "kurs_matematika") {
    bot.sendMessage(chatId, `📗 Matematika kursi
🕒 Davomiyligi: 4 oy
🎯 Yo‘nalish: Maktab + Olimpiada
📘 Algebra, Geometriya, Testlar
📌 Haftada 3–4 dars
💰 Narx: 300 000 so’m / oy`, {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "✍️ Ro‘yxatdan o‘tish", callback_data: "register_english" }
          ],
          [
            { text: "⬅️ Orqaga", callback_data: "back_to_courses" }
          ]
        ]
      }
    })
  }
  else if (data == "kurs_dasturlash") {
    bot.sendMessage(chatId, `💻 Dasturlash (Frontend)
🕒 Davomiyligi: 5 oy
📘 HTML, CSS, JavaScript, React
🎯 Portfolio bilan bitirish
📌 Haftada 3 ta dars
💰 Narx: 450 000 so’m / oy`, {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "✍️ Ro‘yxatdan o‘tish", callback_data: "register" }
          ],
          [
            { text: "⬅️ Orqaga", callback_data: "back_to_courses" }
          ]
        ]
      }
    })
  }else if (data == "back_to_courses") {
    bot.sendMessage(chatId,`Kurslar ro'yxati`, {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🇺🇸 Ingliz tili", callback_data: "kurs_ingliz" },
          ],
          [
            { text: "🇷🇺 Rus tili", callback_data: "kurs_rus" }

          ],
          [
            { text: "📗 Matematika", callback_data: "kurs_matematika" }
          ],
          [
            { text: " 💻 Dasturlash", callback_data: "kurs-dasturlash" }

          ]
        ]
      }

    });
  }else if (data == "location") {
    bot.sendLocation(chatId, 41.3856, 60.3641);
  }else if (data == "like") {
    bot.sendMessage(chatId, "Siz kursimizdan mamnunmisiz? 👍 Yoqdi");
  }else if (data == "dislike") {
    bot.sendMessage(chatId, "Siz kursimizdan mamnunmisiz? 👎 Yoqmad");
  }
})
console.log("Bot ishga tushdi...");

export { bot };
