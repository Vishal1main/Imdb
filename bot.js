require("dotenv").config();
const express = require("express");
const TelegramBot = require("node-telegram-bot-api");

const TOKEN = process.env.BOT_TOKEN;
const URL = process.env.WEBHOOK_URL;
const PORT = process.env.PORT;

const bot = new TelegramBot(TOKEN, { webHook: { port: PORT } });
bot.setWebHook(`${URL}/bot${TOKEN}`);

const app = express();
app.use(express.json());

app.post(`/bot${TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Keyboards
const mainKeyboard = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: "🔘 Channels", callback_data: "channels" },
        { text: "🤖 My Bots", callback_data: "my_bots" }
      ],
      [{ text: "🆔 My Telegram ID", callback_data: "my_id" }]
    ]
  },
  parse_mode: "HTML"
};

const backKeyboard = {
  reply_markup: {
    inline_keyboard: [[{ text: "🔙 Back to Home", callback_data: "back_home" }]]
  },
  parse_mode: "HTML"
};

// /start handler
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const name = msg.from.first_name;
  const text = `👋 Hello <b>${name}</b>!\n\nWelcome to the <b>About Me</b> bot.\nChoose an option below:`;
  bot.sendMessage(chatId, text, mainKeyboard);
});

// Handle buttons
bot.on("callback_query", async (query) => {
  const data = query.data;
  const chatId = query.message.chat.id;
  const messageId = query.message.message_id;
  const user = query.from;

  let text = "";
  let keyboard = backKeyboard;

  switch (data) {
    case "channels":
      text = `📢 <b>My Channels:</b>\n\n1. <a href="https://t.me/YourPromoChannel">Promo Channel</a>\n2. <a href="https://t.me/YourUpdateChannel">Update Channel</a>\n3. <a href="https://t.me/YourGroupLink">Telegram Group</a>`;
      break;

    case "my_bots":
      text = `🤖 <b>My Bots:</b>\n\n- <a href="https://t.me/ExampleBot1">@ExampleBot1</a>\n- <a href="https://t.me/ExampleBot2">@ExampleBot2</a>`;
      break;

    case "my_id":
      text = `🆔 <b>Your Telegram ID:</b> <code>${user.id}</code>\n\n📛 <b>Username:</b> @${user.username || "N/A"}\n👤 <b>Name:</b> ${user.first_name}`;
      break;

    case "back_home":
      text = `👋 Hello <b>${user.first_name}</b>!\n\nWelcome back to the <b>About Me</b> bot.\nChoose an option below:`;
      keyboard = mainKeyboard;
      break;

    default:
      text = "❌ Invalid option.";
  }

  try {
    await bot.editMessageText(text, {
      chat_id: chatId,
      message_id: messageId,
      ...keyboard
    });
  } catch (err) {
    console.error("Edit error:", err.message);
  }

  bot.answerCallbackQuery(query.id);
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Bot is running on port ${PORT}`);
}).on("error", (err) => {
  console.error("❌ Server error:", err.message);
});
