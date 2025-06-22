const express = require("express");
const TelegramBot = require("node-telegram-bot-api");

// 🔐 CONFIGURATION
const TOKEN = "7256232380:AAE1E5x5QgHoBohWQGnhr5Ig2nvI34TelXs";
const URL = "https://imdb-0hh5.onrender.com"; // Replace with your deployed domain
const PORT = process.env.PORT || 3000;

// ✅ EXPRESS SETUP
const app = express();
app.use(express.json());

// ✅ Escape unsafe HTML characters from user name
function escapeHTML(text) {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

// ✅ BOT SETUP (Webhook mode)
const bot = new TelegramBot(TOKEN, { webHook: { port: PORT } });
bot.setWebHook(`${URL}/bot${TOKEN}`);

// ✅ Express endpoint for Telegram Webhook
app.post(`/bot${TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// ✅ /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const name = escapeHTML(msg.from.first_name || "User");

  const text = `<b>Hey 👋 ${name}!</b>\n\n<b>Welcome To My About Bot 😎</b>\n\n• In This Bot, You Can Know More About Me.`;

  bot.sendMessage(chatId, text, {
    parse_mode: "HTML",
    disable_web_page_preview: true,
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

// ✅ Callback query handler
bot.on("callback_query", (query) => {
  const data = query.data;
  const chatId = query.message.chat.id;
  const messageId = query.message.message_id;
  const name = escapeHTML(query.from.first_name || "User");

  let text = "";
  switch (data) {
    case "help1":
      text = `<b>📢 Channels:</b>\n\n• Sky hub4u | Backup <a href="https://t.me/Sky_hub4u">Click</a>\n• Sky Movie Update <a href="https://t.me/SkyMovieUpdate">Click</a>\n• Sky Movie Req4u <a href="https://t.me/Sky_Movie_req4u">Click</a>\n• Tᴍʀ ʙᴏᴛᴢ<a href="https://t.me/TMR_Botz">Click</a>`;
      break;
    case "help2":
      text = `<b>🤖 My Bots:</b>\n\n• Aʟᴘʜᴀ ᴍᴏᴠɪᴇ ʙᴏᴛ™ <a href="https://t.me/Alphaa_Movie_Bot">Click</a>\n• Mʀ sᴇɴᴅᴇʀ™ <a href="https://t.me/Mr_Movie_Sender_Bot">Click</a>\n• Pᴜsʜᴘᴀ ʙᴏᴛ™ <a href="https://t.me/Pushpa_Moviee_bot">Click</a>\n• SkyHub Game 🎮 <a href="https://t.me/SkyhubGame_Bot">Click</a>\n• Tmr Spotify Bot <a href="https://t.me/Tmr_Spotify_Bot">Click</a>`;
      break;
    case "about1":
      text = `<b>👤 My Info:</b>\n\n<b>━━━━━━━━━━➣</b>\n<b>┣⬡ Name:</b> Vishal\n<b>┣⬡ Age:</b> 18+\n<b>┣⬡ Gender:</b> Male\n<b>┣⬡ ᴩʟᴀᴄᴇ : Iɴᴅɪᴀ 🇮🇳</b>\n<b>┣⬡ Language:</b> Hindi\n<b>┣⬡ Study In:</b> ㅤㅤ`;
      break;
    case "about2":
      text = `<b>💸 Paid Promotion:</b>\n\n<b>DM me for paid promotion.</b>\n<b>🆔 @Tmr_Developer</b>`;
      break;
    case "home":
      text = `<b>Hey 👋 ${name}!</b>\n\n<b>Welcome To My About Bot 😎</b>\n\n• In This Bot, You Can Know More About Me.`;
      return bot.editMessageText(text, {
        chat_id: chatId,
        message_id: messageId,
        parse_mode: "HTML",
        disable_web_page_preview: true,
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
  }

  // ✏️ Edit with back button
  bot.editMessageText(text, {
    chat_id: chatId,
    message_id: messageId,
    parse_mode: "HTML",
    disable_web_page_preview: true,
    reply_markup: {
      inline_keyboard: [
        [{ text: "🔙 Back", callback_data: "home" }]
      ]
    }
  });
});
