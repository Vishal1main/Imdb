const express = require('express');
const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);
const app = express();

// Enhanced Markdown escaping
function escapeMarkdown(text) {
  return text.replace(/[_*[\]()~`>#+-=|{}.!:@]/g, '\\$&');
}

// Start command
bot.start((ctx) => {
  const safeName = escapeMarkdown(ctx.from.first_name);
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
  ).catch(e => console.error('Start command error:', e));
});

// All other handlers with proper escaping...

// Contact action (where the error occurs)
bot.action("contact", (ctx) => {
  ctx.editMessageText(
    `*💸 For Paid Promotion\\:*\n\nDM me for paid promotions\n📱 Telegram\\: @Tmr_Developer`,
    {
      parse_mode: "MarkdownV2",
      disable_web_page_preview: true,
      reply_markup: {
        inline_keyboard: [[{ text: "🔙 Back to Home", callback_data: "back" }]]
      }
    }
  ).catch(e => console.error('Contact action error:', e));
});

// Error handling
bot.catch((err, ctx) => {
  console.error(`Error for ${ctx.updateType}:`, err);
});

// Launch bot with proper handling
bot.launch()
  .then(() => console.log('Bot started successfully'))
  .catch(err => {
    console.error('Bot launch error:', err);
    process.exit(1);
  });

// Handle process termination
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

// Web server
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => res.send("Bot is Running!"));
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
