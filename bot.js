const express = require('express');
const { Telegraf, Markup } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();

// Telegram Bot Code
bot.start((ctx) => {
  const user = ctx.from;
  const nameWithLink = `<a href="tg://user?id=${user.id}">${user.first_name}</a>`;

  ctx.reply(
    `<b>Hey 👋 ${nameWithLink}</b> <b>Welcome To My About Bot 😎</b>\n\n<b>• In This Bot Have Some Info About Me</b>`,
    {
      parse_mode: "HTML",
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
    `<b>📢 My Channels:</b>\n\n<b>🎯 SkyHub4u</b> <a href="https://t.me/Sky_hub4u">Click</a>\n<b>🎯 Tmrbotz</b> <a href="https://t.me/Tmr_Botz">Click</a>`,
    {
      parse_mode: "HTML",
      disable_web_page_preview: true,
      reply_markup: {
        inline_keyboard: [[{ text: "🔙 Back to Home", callback_data: "back" }]],
      },
    }
  );
});

bot.action("mybots", (ctx) => {
  ctx.editMessageText(
    `<b>🤖 My Bots:</b>\n\n<b>🤖 Mʀ sᴇɴᴅᴇʀ™</b> <a href="https://t.me/Mr_Movie_Sender_Bot">Click</a>\n<b>🤖 Pᴜsʜᴘᴀ ʙᴏᴛ™</b> <a href="https://t.me/Pushpa_Moviee_bot">Click</a>\n<b>🤖 Aʟᴘʜᴀ ᴍᴏᴠɪᴇ ʙᴏᴛ™</b> <a href="https://t.me/Alphaa_Movie_Bot">Click</a>\n<b>🤖 Tmr Spotify Bot</b> <a href="https://t.me/Tmr_Spotify_Bot">Click</a>\n<b>🤖 SkyHub Game 🎮</b> <a href="https://t.me/SkyhubGame_Bot">Click</a>`,
    {
      parse_mode: "HTML",
      disable_web_page_preview: true,
      reply_markup: {
        inline_keyboard: [[{ text: "🔙 Back to Home", callback_data: "back" }]],
      },
    }
  );
});

bot.action("myid", (ctx) => {
  ctx.editMessageText(
    `<b>👤 My Info:</b>\n<b>━━━━━━━━━━➣</b>\n<b>┣⬡ ɴᴀᴍᴇ :</b> Vishal\n<b>┣⬡ ᴀɢᴇ :</b> 18+\n<b>┣⬡ ɢᴇɴᴅᴇʀ :</b> ᴍᴀʟᴇ\n<b>┣⬡ ᴩʟᴀᴄᴇ :</b> Iɴᴅɪᴀ 🇮🇳\n<b>┣⬡ ʟᴀɴɢᴜᴀɢᴇ :</b> Hindi\n<b>┣⬡ ꜱᴛᴜᴅy ɪɴ :</b> ㅤㅤ`,
    {
      parse_mode: "HTML",
      disable_web_page_preview: true,
      reply_markup: {
        inline_keyboard: [[{ text: "🔙 Back to Home", callback_data: "back" }]],
      },
    }
  );
});

bot.action("contact", (ctx) => {
  ctx.editMessageText(
    `<b>💸 For Paid Promotion:</b>\n\n<b>Dm Me For 💸 Paid Promotion</b>\n<b>📱 Telegram:</b> @Tmr_Developer`,
    {
      parse_mode: "HTML",
      disable_web_page_preview: true,
      reply_markup: {
        inline_keyboard: [[{ text: "🔙 Back to Home", callback_data: "back" }]],
      },
    }
  );
});

bot.action("back", (ctx) => {
  const user = ctx.from;
  const nameWithLink = `<a href="tg://user?id=${user.id}">${user.first_name}</a>`;

  ctx.editMessageText(
    `<b>Hey 👋 ${nameWithLink}</b> <b>Welcome To My About Bot 😎</b>\n\n<b>• In This Bot Have Some Info About Me</b>`,
    {
      parse_mode: "HTML",
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

// Webhook support for Render (don't hardcode port!)
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => res.send("Bot is Running!"));
app.listen(PORT, () => {
  console.log(`✅ Bot is running on port ${PORT}`);
});
