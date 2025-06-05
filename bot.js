const express = require('express');
const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();

// Enhanced MarkdownV2 escape function
function escapeMarkdown(text) {
  if (!text) return '';
  return text.toString()
    .replace(/\_/g, '\\_')
    .replace(/\*/g, '\\*')
    .replace(/\[/g, '\\[')
    .replace(/\]/g, '\\]')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/\~/g, '\\~')
    .replace(/\`/g, '\\`')
    .replace(/\>/g, '\\>')
    .replace(/\#/g, '\\#')
    .replace(/\+/g, '\\+')
    .replace(/\-/g, '\\-')
    .replace(/\=/g, '\\=')
    .replace(/\|/g, '\\|')
    .replace(/\{/g, '\\{')
    .replace(/\}/g, '\\}')
    .replace(/\./g, '\\.')
    .replace(/\!/g, '\\!');
}

// Telegram Bot Code
bot.start((ctx) => {
  const user = ctx.from;
  const safeName = escapeMarkdown(user.first_name);

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
    `*📢 My Channels:*\n\n🎯 SkyHub4u [Click](https://t.me/Sky_hub4u)\n🎯 Tmrbotz [Click](https://t.me/Tmr_Botz)`,
    {
      parse_mode: "MarkdownV2",
      disable_web_page_preview: true,
      reply_markup: {
        inline_keyboard: [[{ text: "🔙 Back to Home", callback_data: "back" }]]
      }
    }
  ).catch(e => console.error('EditMessageText error:', e));
});

bot.action("mybots", (ctx) => {
  ctx.editMessageText(
    `*🤖 My Bots:*\n\n🤖 Mr Sender™ [Click](https://t.me/Mr_Movie_Sender_Bot)\n🤖 Pushpa Bot™ [Click](https://t.me/Pushpa_Moviee_bot)\n🤖 Alpha Movie Bot™ [Click](https://t.me/Alphaa_Movie_Bot)\n🤖 Tmr Spotify Bot [Click](https://t.me/Tmr_Spotify_Bot)\n🤖 SkyHub Game 🎮 [Click](https://t.me/SkyhubGame_Bot)`,
    {
      parse_mode: "MarkdownV2",
      disable_web_page_preview: true,
      reply_markup: {
        inline_keyboard: [[{ text: "🔙 Back to Home", callback_data: "back" }]]
      }
    }
  ).catch(e => console.error('EditMessageText error:', e));
});

bot.action("myid", (ctx) => {
  ctx.editMessageText(
    `*👤 My Info:*\n━━━━━━━━━━\n┣ Name: Vishal\n┣ Age: 18+\n┣ Gender: Male\n┣ Place: India 🇮🇳\n┣ Language: Hindi\n┣ Study: `,
    {
      parse_mode: "MarkdownV2",
      disable_web_page_preview: true,
      reply_markup: {
        inline_keyboard: [[{ text: "🔙 Back to Home", callback_data: "back" }]]
      }
    }
  ).catch(e => console.error('EditMessageText error:', e));
});

bot.action("contact", (ctx) => {
  ctx.editMessageText(
    `*💸 For Paid Promotion:*\n\nDM me for paid promotions\n📱 Telegram: @Tmr_Developer`,
    {
      parse_mode: "MarkdownV2",
      disable_web_page_preview: true,
      reply_markup: {
        inline_keyboard: [[{ text: "🔙 Back to Home", callback_data: "back" }]]
      }
    }
  ).catch(e => console.error('EditMessageText error:', e));
});

bot.action("back", (ctx) => {
  const user = ctx.from;
  const safeName = escapeMarkdown(user.first_name);

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
  ).catch(e => console.error('EditMessageText error:', e));
});

// Error handling
bot.catch((err, ctx) => {
  console.error(`Error for ${ctx.updateType}:`, err);
});

// Launch bot
bot.launch();

// Web server
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => res.send("Bot is Running!"));
app.listen(PORT, () => {
  console.log(`✅ Bot is running on port ${PORT}`);
});
