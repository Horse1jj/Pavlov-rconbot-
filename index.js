const Discord = require('discord.js');
const client = new Discord.Client();
const modCommands = require('./Pavlovmod');
const adminCommands = require('./Pavlovadmin');
const servers = require('./servers.json');
const roles = require('./roles.json');
const prefix = '!';

client.once('ready', () => {
    console.log('Bot is online!');
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // Check role
    const userRoles = message.member.roles.cache.map(role => role.name);

    if (roles.adminBot.some(r => userRoles.includes(r))) {
        adminCommands.handleCommand(command, args, message, servers);
    } else if (roles.modBot.some(r => userRoles.includes(r))) {
        modCommands.handleCommand(command, args, message, servers);
    } else {
        message.reply("You don't have permission to use this bot.");
    }
});

client.login('YOUR_DISCORD_BOT_TOKEN');
