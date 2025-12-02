import TelegramBot from "node-telegram-bot-api";
import { config } from "dotenv";

config()

const TOKEN = process.env.BOT_TOKEN
const bot = new TelegramBot(TOKEN , {polling: true})
