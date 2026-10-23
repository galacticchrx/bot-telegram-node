const { Telegraf } = require('telegraf');
const axios = require('axios'); // Import axios untuk request API

// Ganti dengan Token BotFather kamu
const token = '8685526626:AAGEPpExM64YbkGkRT5LvkglZkI3BpMEIxs';
const bot = new Telegraf(token);

// Perintah /start
bot.start((ctx) => {
    ctx.reply('Halo! Ketik /quote untuk mendapatkan kutipan motivasi acak dari internet.');
});

// Fitur Integrasi API: Mengambil kutipan motivasi
// Fitur Integrasi API menggunakan DummyJSON Quotes
bot.command('quote', async (ctx) => {
    try {
        await ctx.sendChatAction('typing');

        // Menggunakan endpoint API alternatif yang stabil
        const response = await axios.get('https://dummyjson.com/quotes/random');
        
        const quoteContent = response.data.quote;
        const quoteAuthor = response.data.author;

        ctx.reply(`💡 "${quoteContent}"\n\n— *${quoteAuthor}*`, { parse_mode: 'Markdown' });

    } catch (error) {
        console.error('Gagal mengambil data API:', error.message);
        ctx.reply('Maaf, server kutipan sedang mengalami gangguan. Silakan coba beberapa saat lagi.');
    }
});

// Bot dasar (echo)
bot.on('text', (ctx) => {
    ctx.reply(`Kamu bilang: "${ctx.message.text}". Ketik /quote untuk fitur API.`);
});

// Jalankan bot
bot.launch();
console.log('🤖 Bot dengan integrasi API sedang berjalan...');

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));