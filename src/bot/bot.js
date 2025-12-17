import TelegramBot from "node-telegram-bot-api";
import { config } from "dotenv";
import onStart from "./handlers/onStart.js";
import onProfil from "./handlers/onProfil.js"
import { onRegister } from "./handlers/onRegister.js";
import { User } from "../models/User.js";
config();

const TOKEN = process.env.BOT_TOKEN;

 const bot = new TelegramBot(TOKEN, { polling: true });
const channel_id = `@js_academy`
const ADMIN_ID = 8057065769


bot.on("message", async function (msg) {
  const chatId = msg.chat.id;
  const firstName = msg.chat.first_name
  const text = msg.text;
  const msg_id = msg.message_id
  // status

  // -kicked - chiqarib yuborilgan
  // -left - tark etgan
  // -creator - yaratuvchi
  // -admin - admin
  // -member - a'zo
 



  //Ro`yhatdan o`tish

  if (text == "✍️ Ro‘yxatdan o‘tish") {
    return onRegister(msg,bot)
  }

  let user = await User.findOne({chatId:chatId})
  const chatMember = await bot.getChatMember(channel_id, chatId)

  if (user.action == "awaiting_name"){
    user = await User.findOneAndUpdate(
      {chatId: chatId},
      {action: "awaiting_phone" , name: text}
    )

    bot.sendMessage(chatId, `Iltimos,telefon raqamingizni kiriting:`)
  }
 if (user.action == "awaiting_phone"){
    user = await User.findOneAndUpdate(
      {chatId: chatId},
      {action: "finish_register" , name: text}
    )

  bot.sendMessage(chatId, "🎉")
   bot.sendMessage(chatId, "Tabriklaymiz,siz muvafaqiyatli ro`yhattan o`ttingiz", {
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "Sizning Malumotlaringiz",
          callback_data: "foidalanuvchi_malumotlari"
        }
      ]
    ]
  }
});
bot.sendMessage(ADMIN_ID, `Yangi xabar 🔔 \n\n🔘 ismi: ${user.name}\n🔘 tel: ${text}`)
return;
  }

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
`, {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "📍 Location", callback_data: "location" }
          ],

        ]
      }
    }
    )



  } else if (text == "💬 Fikr bildirish") {
    bot.sendMessage(chatId, "Siz kursimizdan mamnunmisiz?", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "👍 Yoqdi", callback_data: "yoqdi" },
            { text: "👎 Yoqmad", callback_data: "yoqmadi" }
          ]
        ]
      }
    });

  } else if (text == "❓ Yordam") {
    bot.sendMessage(chatId,
      `🆘 Yordam

📚 Kurslar haqida ma’lumot
📝 Ro‘yxatdan o‘tish
📞 Admin bilan aloqa

Quyidagi tugmalardan foydalaning 👇`,
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: "📚 Kurslar", callback_data: "help_courses" }],
            [{ text: "📞 Admin", url: "https://t.me/komilovaa_77" }],
            [{ text: "🧭 Botdan qanday foydalanish", callback_data: "bot_foidalanish" }]
          ]
        }
      });

  } else if (text == "📝 Ro‘yxatdan o‘tish") {
    bot.sendMessage(chatId, `📝 Ro‘yxatdan o‘tish bo‘yicha yo‘riqnoma:

1️⃣ To‘liq ismingizni yuboring
2️⃣ Telefon raqamingizni yuboring
3️⃣ Sizga kurs jadvali va to‘lov bo‘yicha ma’lumot yuboriladi

📚 Ro‘yxatdan o‘tish uchun kerakli kursni tanlang:`, {
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
  const msg_id = query.message.message_id;

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
    bot.deleteMessage(chatId, msg_id)


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
    bot.deleteMessage(chatId, msg_id)

    bot.sendMessage(chatId, `🇷🇺 Rus tili kursi
🕒 Davomiyligi: 3 oy
🎯 0 dan boshlovchilar uchun
📘 So‘z boyligi, grammatikasi, og‘zaki nutq
📌 Haftada 3 ta dars
💰 Narx: 230 000 so’m / oy`, {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "✍️ Ro‘yxatdan o‘tish", callback_data: "register_rus" }
          ],
          [
            { text: "⬅️ Orqaga", callback_data: "back_to_courses" }
          ]
        ]
      }
    })
  }
  else if (data == "kurs_matematika") {
    bot.deleteMessage(chatId, msg_id)

    bot.sendMessage(chatId, `📗 Matematika kursi
🕒 Davomiyligi: 4 oy
🎯 Yo‘nalish: Maktab + Olimpiada
📘 Algebra, Geometriya, Testlar
📌 Haftada 3–4 dars
💰 Narx: 300 000 so’m / oy`, {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "✍️ Ro‘yxatdan o‘tish", callback_data: "register_math" }
          ],
          [
            { text: "⬅️ Orqaga", callback_data: "back_to_courses" }
          ]
        ]
      }
    })
  } else if (data == "kurs_dasturlash") {
    bot.deleteMessage(chatId, msg_id)

    bot.sendMessage(chatId, `💻 Dasturlash (Frontend)
🕒 Davomiyligi: 5 oy
📘 HTML, CSS, JavaScript, React
🎯 Portfolio bilan bitirish
📌 Haftada 3 ta dars
💰 Narx: 450 000 so’m / oy`, {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "✍️ Ro‘yxatdan o‘tish", callback_data: "register_IT" }
          ],
          [
            { text: "⬅️ Orqaga", callback_data: "back_to_courses" }
          ]
        ]
      }
    })
  } else if (data == "back_to_courses") {
    bot.deleteMessage(chatId, msg_id)

    bot.sendMessage(chatId, `Kurslar ro'yxati`, {
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
  } else if (data == "location") {
    bot.deleteMessage(chatId, msg_id)

    bot.sendLocation(chatId, 41.3856, 60.3641);

  } else if (data == "yoqdi") {
    bot.deleteMessage(chatId, msg_id)
    bot.sendMessage(chatId, "Rahmat! Fikringiz biz uchun juda muhim 😊");
  } else if (data == "yoqmadi") {
    bot.deleteMessage(chatId, msg_id)
    bot.sendMessage(chatId, "Rahmat! Biz yaxshilanishga xarakat qilamiz 😊");
  } else if (data == "help_courses") {
    bot.deleteMessage(chatId, msg_id)
    bot.sendMessage(chatId, `🎓 Kurslar ro'yxati

Quyidagi kurslardan birini tanlang va batafsil ma’lumot oling:`, {
      reply_markup: {
        inline_keyboard: [
          [{ text: "🇺🇸 Ingliz tili", callback_data: "kurs_ingliz" }],
          [{ text: "🇷🇺 Rus tili", callback_data: "kurs_rus" }],
          [{ text: "📗 Matematika", callback_data: "kurs_matematika" }],
          [{ text: "💻 Dasturlash", callback_data: "kurs_dasturlash" }],
          [{ text: "⬅️ Orqaga", callback_data: "back_to_help_main" }]
        ]
      }
    });
  } else if (data == "bot_foidalanish") {
    bot.deleteMessage(chatId, msg_id)
    bot.sendMessage(chatId, `📖 Botdan foydalanish qollanmasi:

1️⃣ /start – Botni ishga tushuradi
2️⃣ 📚 Kurslar – Kurslar ro‘yxatini ko‘rish
3️⃣ 💬 Fikr bildirish – Fikringizni yuborish
4️⃣ ℹ️ Markaz haqida – Markaz haqida ma’lumot
5️⃣ 📝 Ro‘yxatdan o‘tish – Kurslarga yozilish
6️⃣ ❓ Yordam – Bu menyu

Inline tugmalardan foydalanib, kerakli bo‘limlarga tez o‘tishingiz mumkin.`);
  } else if (data == "register_english") {
    bot.deleteMessage(chatId, msg_id)
    bot.sendMessage(chatId, `🇬🇧 Ingliz tili kursiga ro‘yxatdan o‘tish uchun quyidagilarni bajaring:

1️⃣ To‘liq ismingizni yuboring
2️⃣ Telefon raqamingizni yuboring
3️⃣ Sizga qo‘shimcha ma’lumot va to‘lov bo‘yicha yo‘riqnomalar yuboriladi

📞 Savollar bo‘lsa, admin bilan bog‘laning: @komilovaa_77`, {
      reply_markup: {
        keyboard: [
          [
            {
              text: "📱 Telefon raqamni yuborish",
              request_contact:true
            }
          ]
        ],
        resize_keyboard: true,
      }
    }
    );
  }
  else if (data == "register_rus") {
    bot.deleteMessage(chatId, msg_id)
    bot.sendMessage(chatId, `🇷🇺 Rus tili kursiga ro‘yxatdan o‘tish uchun:


 Telefon raqamingizni yuboring
 Biz 

📞 Savollar bo‘lsa, admin bilan bog‘laning: @komilovaa_77`,
      {
        reply_markup: {
          keyboard: [
            [
              {
                text: "📱 Telefon raqamni yuborish",
                request_contact:true
              }
            ]
          ],
          resize_keyboard: true,
        }
      }
    );
  }
  else if (data == "register_IT") {
    bot.deleteMessage(chatId, msg_id)
    bot.sendMessage(chatId, `💻 Dasturlash (IT) kursiga ro‘yxatdan o‘tish:


 Telefon raqamingizni yuboring
Sizga kurs jadvali va to‘lov bo‘yicha ma’lumot yuboriladi

📞 Savollar bo‘lsa, admin bilan bog‘laning: @komilovaa_77`,
      {
        reply_markup: {
          keyboard: [
            [
              {
                text: "📱 Telefon raqamni yuborish",
                request_contact:true
              }
            ]
          ],
          resize_keyboard: true,
        }
      }
    );
  }
  else if (data == "register_math") {
    bot.deleteMessage(chatId, msg_id)
    bot.sendMessage(chatId, `📗 Matematika kursiga ro‘yxatdan o‘tish uchun:

1️⃣ To‘liq ismingizni yuboring
2️⃣ Telefon raqamingizni yuboring
3️⃣ Sizga kurs jadvali va to‘lov bo‘yicha yo‘riqnomalar yuboriladi

📞 Savollar bo‘lsa, admin bilan bog‘laning: @komilovaa_77`, {
      reply_markup: {
        keyboard: [
          [
            {
              text: "📱 Telefon raqamni yuborish",
              request_contact:true
            }
          ]
        ],
        resize_keyboard: true,
      }
    }

    );
  }else if (data == "foidalanuvchi_malumotlari") {
    bot.sendMessage(chatId, `Name: ${user.name}\nPhone:${text}`)
  }


})
console.log("Bot ishga tushdi...");

export { bot };


