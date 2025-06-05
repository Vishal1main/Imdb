const express = require('express');
const { Telegraf, Markup } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();

// Telegram Bot Code
bot.start((ctx) => {
  const user = ctx.from;
  const nameWithLink = `<a href="tg://user?id=${user.id}">${user.first_name}</a>`;

  ctx.reply(
    `👋 Welcome ${nameWithLink} to <b>About Me Bot!</b>\n\nChoose an option below:`,
    {
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [
            { text: "📢 Channels", callback_data: "channels" },
            { text: "🤖 My Bots", callback_data: "mybots" }
          ],
          [
            { text: "👤 My Telegram ID", callback_data: "myid" },
            { text: "📞 Contact", callback_data: "contact" }
          ]
        ]
      }
    }
  );
});

bot.action("channels", (ctx) => {
  ctx.editMessageText(
    `<b>📢 My Channels:</b>\n\n🔹 @example1\n🔹 @example2`,
    {
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [[{ text: "🔙 Back to Home", callback_data: "back" }]],
      },
    }
  );
});

bot.action("mybots", (ctx) => {
  ctx.editMessageText(
    `<b>🤖 My Bots:</b>\n\n🤖 @mybot1\n🤖 @mybot2`,
    {
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [[{ text: "🔙 Back to Home", callback_data: "back" }]],
      },
    }
  );
});

bot.action("myid", (ctx) => {
  ctx.editMessageText(
    `<b>👤 My Telegram ID:</b>\n\n<code>${ctx.from.id}</code>`,
    {
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [[{ text: "🔙 Back to Home", callback_data: "back" }]],
      },
    }
  );
});

bot.action("contact", (ctx) => {
  ctx.editMessageText(
    `<b>📞 Contact Info:</b>\n\n📬 Email: example@mail.com\n📱 Telegram: @yourusername`,
    {
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [[{ text: "🔙 Back to Home", callback_data: "back" }]],
      },
    }
  );
});

bot.action("back", (ctx) => {
  ctx.reply(
    `👋 Welcome ${nameWithLink} to <b>About Me Bot!</b>\n\nChoose an option below:`,
    {
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [
            { text: "📢 Channels", callback_data: "channels" },
            { text: "🤖 My Bots", callback_data: "mybots" }
          ],
          [
            { text: "👤 My Telegram ID", callback_data: "myid" },
            { text: "📞 Contact", callback_data: "contact" }
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
