const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

// Replace with your Telegram bot token
const token = process.env.TELEGRAM_BOT_TOKEN || '7454733028:AAEdYqMXSEO5dk0d0hQ4kzVg0nttQfO087U';
const PORT = process.env.PORT || 3000; // Added port configuration

// Create a bot instance
const bot = new TelegramBot(token, {polling: true});

// Bot information with added port details
const botInfo = {
    name: "Shivaaay_Info_b",
    description: "Hey TMR ADMIN™! Welcome To My About Bot 🌟️",
    features: [
        "In This Bot Have Some Info About Me",
        "Personal Information",
        "Contact Details",
        `Server Port: ${PORT}` // Added port information
    ],
    stats: {
        messages: "88 💶 💷 💸",
        name: "Telegram I'd: @YourUsername",
        username: "TG Channel's: @YourChannel",
        myBots: "My Bots:\n@Bot1\n@Bot2\n@Bot3",
        myInfo: `Here's some personal information about me...\n\nAge: XX\nFrom: City, Country\nStatus: Developer\nServer Port: ${PORT}`,
        portInfo: `🚪 **Port Information**\nRunning on port: ${PORT}\n\nThis bot is hosted on port ${PORT}`
    },
    updateTime: () => new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
};

// Create inline keyboard with PORT button (3x2 grid)
const createButtonMenu = () => {
    return {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: "Name", callback_data: "name_btn" },
                    { text: "TG Channel", callback_data: "channel_btn" }
                ],
                [
                    { text: "My Bots", callback_data: "bots_btn" },
                    { text: "My Information", callback_data: "info_btn" }
                ],
                [
                    { text: "Port", callback_data: "port_btn" } // Added Port button
                ]
            ]
        }
    };
};

// [Rest of the code remains the same until callback handler...]

// Handle button callbacks
bot.on('callback_query', (callbackQuery) => {
    const msg = callbackQuery.message;
    const chatId = msg.chat.id;
    const data = callbackQuery.data;

    let response = "";

    switch(data) {
        case 'name_btn':
            response = `🔹 **Name**\n${botInfo.stats.name}`;
            break;
            
        case 'channel_btn':
            response = `📢 **TG Channel**\n${botInfo.stats.username}`;
            break;
            
        case 'bots_btn':
            response = `🤖 **My Bots**\n${botInfo.stats.myBots}`;
            break;
            
        case 'info_btn':
            response = `ℹ️ **My Information**\n${botInfo.stats.myInfo}\n\n⏱ Last updated: ${botInfo.updateTime()}`;
            break;
            
        case 'port_btn': // Added port button handler
            response = botInfo.stats.portInfo;
            break;
    }

    bot.answerCallbackQuery(callbackQuery.id);
    bot.sendMessage(chatId, response, {
        parse_mode: 'Markdown',
        ...createButtonMenu()
    });
});

// [Rest of the original code remains the same...]

// Add Express server for port listening (optional)
if (process.env.NODE_ENV === 'production') {
    const express = require('express');
    const app = express();
    
    app.get('/', (req, res) => {
        res.send('Bot is running...');
    });
    
    app.listen(PORT, () => {
        console.log(`Bot server running on port ${PORT}`);
    });
}

console.log(`Bot is running...\nPort: ${PORT}`);
