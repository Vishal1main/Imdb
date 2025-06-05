const express = require('express');
const { Telegraf, Markup } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();

// MarkdownV2 escape function
function escapeMd(text) {
  return text.replace(/[_*[\]()~`>#+-=|{}.!]/g, '\\$&');
}

// Telegram Bot Code
bot.start((ctx) => {
  const user = ctx.from;
  const safeName = escapeMd(user.first_name);

  ctx.reply(
    `*Hey 👋 ${safeName} Welcome To My About Bot 😎*\n\n• In This Bot Have Some Info About Me`,
    {
      parse_mode: "MarkdownV2",
      disable_web_page_preview: true,
      reply_markup: {
        inline_keyboard: [
          [
            { text: "📢 Channels", callback_data: "channels" },
            { text: "🤖 My Bots", callback_data: "mybots" }
          ],
          [
            { text: "👤 My Info", callback_data: "myid" },
            { text: "💸 Paid Promo", callback_data: "contact" }
          ]
        ]
      }
    }
  );
});

bot.action("channels", (ctx) => {
  ctx.editMessageText(
    `*📢 My Channels\\:*\n\n🎯 SkyHub4u \\[Click\\]\\(https://t\\.me/Sky_hub4u\\)\n🎯 Tmrbotz \\[Click\\]\\(https://t\\.me/Tmr_Botz\\)`,
    {
      parse_mode: "MarkdownV2",
      disable_web_page_preview: true,
      reply_markup: {
        inline_keyboard: [[{ text: "🔙 Back to Home", callback_data: "back" }]],
      },
    }
  );
});

bot.action("mybots", (ctx) => {
  ctx.editMessageText(
    `*🤖 My Bots\\:*\n\n🤖 Mʀ sᴇɴᴅᴇʀ™ \\[Click\\]\\(https://t\\.me/Mr_Movie_Sender_Bot\\)\n🤖 Pᴜsʜᴘᴀ ʙᴏᴛ™ \\[Click\\]\\(https://t\\.me/Pushpa_Moviee_bot\\)\n🤖 Aʟᴘʜᴀ ᴍᴏᴠɪᴇ ʙᴏᴛ™ \\[Click\\]\\(https://t\\.me/Alphaa_Movie_Bot\\)\n🤖 Tmr Spotify Bot \\[Click\\]\\(https://t\\.me/Tmr_Spotify_Bot\\)\n🤖 SkyHub Game 🎮 \\[Click\\]\\(https://t\\.me/SkyhubGame_Bot\\)`,
    {
      parse_mode: "MarkdownV2",
      disable_web_page_preview: true,
      reply_markup: {
        inline_keyboard: [[{ text: "🔙 Back to Home", callback_data: "back" }]],
      },
    }
  );
});

bot.action("myid", (ctx) => {
  ctx.editMessageText(
    `*👤 My Info\\:*\n━━━━━━━━━━➣\n┣⬡ ɴᴀᴍᴇ \\: Vishal\n┣⬡ ᴀɢᴇ \\: 18\\+\n┣⬡ ɢᴇɴᴅᴇʀ \\: ᴍᴀʟᴇ\n┣⬡ ᴩʟᴀᴄᴇ \\: Iɴᴅɪᴀ 🇮🇳\n┣⬡ ʟᴀɴɢᴜᴀɢᴇ \\: Hindi\n┣⬡ ꜱᴛᴜᴅy ɪɴ \\: ㅤㅤ`,
    {
      parse_mode: "MarkdownV2",
      disable_web_page_preview: true,
      reply_markup: {
        inline_keyboard: [[{ text: "🔙 Back to Home", callback_data: "back" }]],
      },
    }
  );
});

bot.action("contact", (ctx) => {
  ctx.editMessageText(
    `*💸 For Paid Promotion\\:*\n\nDm Me For 💸 Paid Promotion\n📱 Telegram\\: @Tmr_Developer`,
    {
      parse_mode: "MarkdownV2",
      disable_web_page_preview: true,
      reply_markup: {
        inline_keyboard: [[{ text: "🔙 Back to Home", callback_data: "back" }]],
      },
    }
  );
});

bot.action("back", (ctx) => {
  const user = ctx.from;
  const safeName = escapeMd(user.first_name);

  ctx.editMessageText(
    `*Hey 👋 ${safeName} Welcome To My About Bot 😎*\n\n• In This Bot Have Some Info About Me`,
    {
      parse_mode: "MarkdownV2",
      disable_web_page_preview: true,
      reply_markup: {
        inline_keyboard: [
          [
            { text: "📢 Channels", callback_data: "channels" },
            { text: "🤖 My Bots", callback_data: "mybots" }
          ],
          [
            { text: "👤 My Info", callback_data: "myid" },
            { text: "💸 Paid Promo", callback_data: "contact" }
          ]
        ]
      }
    }
  );
});

// Launch bot
bot.launch();

// Webhook support
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => res.send("Bot is Running!"));
app.listen(PORT, () => {
  console.log(`✅ Bot is running on port ${PORT}`);
});
