const Discord = require('discord.js');
const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS'] });
const modCommands = require('./pavlovmod');
const adminCommands = require('./pavlovadmin');
const servers = require('./servers.json');
const roles = require('./roles.json');
const statusConfig = require('./status.json');
const fs = require('fs');
const prefix = '!';

client.once('ready', () => {
    console.log('Bot is online!');

    // Set initial status
    client.user.setPresence({
        status: statusConfig.status,
        activities: [{
            name: statusConfig.activityMessage,
            type: statusConfig.activityType
        }]
    });
});

client.on('messageCreate', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // Check roles by ID
    const hasAdminRole = message.member.roles.cache.some(role => roles.adminBot.includes(role.id));
    const hasModRole = message.member.roles.cache.some(role => roles.modBot.includes(role.id));

    // Admin commands
    if (hasAdminRole) {
        adminCommands.handleCommand(command, args, message, servers);
    }
    // Mod commands
    else if (hasModRole) {
        modCommands.handleCommand(command, args, message, servers);
    }
    // Permission denied
    else {
        const noPermissionEmbed = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Permission Denied')
            .setDescription("You don't have permission to use this bot.")
            .setTimestamp();

        message.channel.send({ embeds: [noPermissionEmbed] });
    }

    // Handle status command by admins
    if (command === 'status' && hasAdminRole) {
        if (args.length < 2) {
            const usageEmbed = new Discord.MessageEmbed()
                .setColor('#FFFF00')
                .setTitle('Status Command Usage')
                .setDescription('Usage: !status [online|idle|dnd|invisible] [PLAYING|WATCHING|LISTENING|STREAMING] [message]')
                .setTimestamp();

            return message.channel.send({ embeds: [usageEmbed] });
        }

        const newStatus = args.shift().toLowerCase();
        const newActivityType = args.shift().toUpperCase();
        const newActivityMessage = args.join(' ');

        client.user.setPresence({
            status: newStatus,
            activities: [{
                name: newActivityMessage,
                type: newActivityType
            }]
        });

        statusConfig.status = newStatus;
        statusConfig.activityType = newActivityType;
        statusConfig.activityMessage = newActivityMessage;

        fs.writeFile('./status.json', JSON.stringify(statusConfig, null, 2), err => {
            if (err) {
                const errorEmbed = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('Error')
                    .setDescription('Failed to update status file.')
                    .setTimestamp();

                return message.channel.send({ embeds: [errorEmbed] });
            }

            const successEmbed = new Discord.MessageEmbed()
                .setColor('#00FF00')
                .setTitle('Status Updated')
                .setDescription(`Bot status updated to ${newStatus.toUpperCase()} and activity set to ${newActivityType} ${newActivityMessage}.`)
                .setTimestamp();

            message.channel.send({ embeds: [successEmbed] });
        });
    }
});

client.login('YOUR_DISCORD_BOT_TOKEN');
