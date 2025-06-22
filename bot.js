const express = require("express");
const TelegramBot = require("node-telegram-bot-api");

// 🔐 CONFIGURATION
const TOKEN = "7256232380:AAE1E5x5QgHoBohWQGnhr5Ig2nvI34TelXs";
const URL = "https://imdb-0hh5.onrender.com"; // 🌐 Replace with your actual deployed URL
const PORT = process.env.PORT || 3000;

// 🧠 EXPRESS SETUP
const app = express();
app.use(express.json());

// 📡 CREATE BOT IN WEBHOOK MODE
const bot = new TelegramBot(TOKEN);
bot.setWebHook(`${URL}/bot${TOKEN}`);

// 🛠 Express endpoint for Telegram
app.post(`/bot${TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// 🟢 Start command handler
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const name = msg.from.first_name;

  bot.sendMessage(chatId, `<b>Hey 👋, ${name}!\n\nWelcome To My About Bot 😎\n\n• In This Bot Have Some Info About Me</b>`, {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "📢 Channels", callback_data: "help1" },
          { text: "🤖 My Bots", callback_data: "help2" }
        ],
        [
          { text: "👤 My Info", callback_data: "about1" },
          { text: "💸 Paid Promo", callback_data: "about2" }
        ]
      ]
    }
  });
});

// 🔁 Callback handler
bot.on("callback_query", (query) => {
  const chatId = query.message.chat.id;
  const messageId = query.message.message_id;
  const data = query.data;

  let text = "";
  switch (data) {
    case "help1":
      text = "🛠 Help Section 1:\n\nHere you will get help for feature 1.";
      break;
    case "help2":
      text = "🛠 Help Section 2:\n\nHere you will get help for feature 2.";
      break;
    case "about1":
      text = "👤 My Info:\n\n━━━━━━━━━━➣\n┣⬡ ɴᴀᴍᴇ : Vishal\n┣⬡ ᴀɢᴇ : 18+\n┣⬡ ɢᴇɴᴅᴇʀ : ᴍᴀʟᴇ\n┣⬡ ʟᴀɴɢᴜᴀɢᴇ : Hindi\n┣⬡ ꜱᴛᴜᴅy ɪɴ : ㅤㅤ";
      break;
    case "about2":
      text = "💸 For Paid Promotion:\n\nDm Me For 💸 Paid Promotion\n🆔 I'd: @Tmr_Developer";
      break;
    case "home":
      return bot.editMessageText(`<b>Hey 👋, ${name}!\n\nWelcome To My About Bot 😎\n\n• In This Bot Have Some Info About Me</b>`, {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: {
          inline_keyboard: [
            [
              { text: "❓ Help 1", callback_data: "help1" },
              { text: "❓ Help 2", callback_data: "help2" }
            ],
            [
              { text: "ℹ️ About 1", callback_data: "about1" },
              { text: "ℹ️ About 2", callback_data: "about2" }
            ]
          ]
        }
      });
  }

  bot.editMessageText(`${text}`, {
    chat_id: chatId,
    message_id: messageId,
    reply_markup: {
      inline_keyboard: [
        [{ text: "🔙 Back", callback_data: "home" }]
      ]
    }
  });
});
