const mineflayer = require('mineflayer');
const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bot is running!\n');
});
server.listen(process.env.PORT || 3000);

const botArgs = {
    host: 'kaiquest15.aternos.me', 
    port: 40729,                     
    username: 'KaiQuestAFK',     
    version: false                  
};

function createBot() {
    const bot = mineflayer.createBot(botArgs);
    bot.on('spawn', () => console.log(`${bot.username} joined!`));
    bot.on('end', () => setTimeout(createBot, 15000));
}
createBot();
