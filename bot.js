const express = require('express');
const { Telegraf, Markup } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();

// Telegram Bot Code
bot.start((ctx) => {
  const user = ctx.from;
  const nameWithLink = `<a href="tg://user?id=${user.id}">${user.first_name}</a>`;

  ctx.reply(
    `<b>Hey 👋 ${nameWithLink} Welcome To My About Bot 😎\n\n• In This Bot Have Some Info About Me</b>`,
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
    `<b>📢 My Channels:\n\n🎯 SkyHub4u <a href="https://t.me/Sky_hub4u">Click</a>\n🎯 Tmrbotz <a href="https://t.me/Tmr_Botz">Click</a></b>`,
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
    `<b>🤖 My Bots:\n\n🤖 Mʀ sᴇɴᴅᴇʀ™ <a href="https://t.me/Mr_Movie_Sender_Bot">Click</a>\n🤖 Pᴜsʜᴘᴀ ʙᴏᴛ™ <a href="https://t.me/Pushpa_Moviee_bot">Click</a>\n🤖 Aʟᴘʜᴀ ᴍᴏᴠɪᴇ ʙᴏᴛ™ <a href="https://t.me/Alphaa_Movie_Bot">Click</a>\n🤖 Tmr Spotify Bot <a href="https://t.me/Tmr_Spotify_Bot">Click</a>\n🤖 SkyHub Game 🎮 <a href="https://t.me/SkyhubGame_Bot">Click</a></b>`,
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
    `<b>👤 My Info:\n━━━━━━━━━━➣\n┣⬡ ɴᴀᴍᴇ : Vishal\n┣⬡ ᴀɢᴇ : 18+\n┣⬡ ɢᴇɴᴅᴇʀ : ᴍᴀʟᴇ\n┣⬡ ᴩʟᴀᴄᴇ : Iɴᴅɪᴀ 🇮🇳\n┣⬡ ʟᴀɴɢᴜᴀɢᴇ : Hindi\n┣⬡ ꜱᴛᴜᴅy ɪɴ :<spoiler>ㅤㅤ</spoiler></b>`,
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
    `<b>💸 For Paid Promotion:\n\nDm Me For 💸 Paid Promotion\n📱 Telegram: @Tmr_Developer`,
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
    `<b>Hey 👋 ${nameWithLink} Welcome To My About Bot 😎\n\n• In This Bot Have Some Info About Me</b>`,
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
