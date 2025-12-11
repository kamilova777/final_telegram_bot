import mongoose from "mongoose";
import "./src/bot/bot.js";

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB connected");
  })
  .catch(() => {
    console.log("DB connection error");
  })
console.log("Dastur ishga tushmoqda...");
