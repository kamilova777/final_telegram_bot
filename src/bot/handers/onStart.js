import { bot } from "../bot.js";
import User from "../models/User.js";

async function onStart(msg) {
  const chatId = msg.chat.id;
  const firstname = msg.chat.first_name;

  const existingUser = await User.findOne({ chatId: chatId });

  if (existingUser == null) {
    const newUser = new User({
      chatId: chatId,
      firstname: firstname,
      username: msg.chat.username,
    });

    newUser.save();
  }

  console.log(existingUser);

  bot.sendMessage(chatId, `Assalomu aleykum, ${firstname}`);
}

export default onStart;