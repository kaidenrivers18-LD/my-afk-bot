const mineflayer = require('mineflayer');
const http = require('http');

// 1. WEB SERVER TO BYPASS RENDER FREE TIER LIMITS
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('KaiQuestAFK bot is running!\n');
});
server.listen(process.env.PORT || 3000, () => {
    console.log('Web server running.');
});

// 2. YOUR EXACT MINECRAFT SERVER CONFIGURATION
const botArgs = {
    host: 'kaiquest15.aternos.me', 
    port: 40729,                     
    username: 'KaiQuestAFK',     
    version: '1.26.3' // Hardcoded for your exact 26.3 PaperMC server
};

function createBot() {
    console.log('Connecting bot to Minecraft server...');
    const bot = mineflayer.createBot(botArgs);

    bot.on('spawn', () => {
        console.log(`${bot.username} successfully joined the PaperMC server!`);
        
        // Anti-AFK jump loop to prevent idling kicks
        setInterval(() => {
            if (bot.entity) {
                bot.setControlState('jump', true);
                setTimeout(() => bot.setControlState('jump', false), 500);
            }
        }, 120000);
    });

    bot.on('error', (err) => {
        console.log(`Connection error: ${err.message}`);
    });

    bot.on('end', () => {
        console.log('Bot disconnected. Reconnecting in 15 seconds...');
        setTimeout(createBot, 15000);
    });
}

createBot();
