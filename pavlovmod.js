const rcon = require('pavlov-rcon'); // Import a Pavlov RCON library

module.exports = {
    handleCommand(command, args, message, servers) {
        const serverName = args[args.length - 1];
        const server = servers[serverName];

        if (!server) {
            return message.reply('Server not found!');
        }

        switch (command) {
            case 'ban':
                rcon.sendCommand(server, `Ban ${args[0]}`);
                message.reply(`${args[0]} has been banned from ${serverName}.`);
                break;
            case 'kick':
                rcon.sendCommand(server, `Kick ${args[0]}`);
                message.reply(`${args[0]} has been kicked from ${serverName}.`);
                break;
            case 'flush':
                rcon.sendCommand(server, 'Flush');
                message.reply(`Server ${serverName} has been flushed.`);
                break;
            case 'kill':
                rcon.sendCommand(server, `Kill ${args[0]}`);
                message.reply(`${args[0]} has been killed on ${serverName}.`);
                break;
            case 'slap':
                rcon.sendCommand(server, `Slap ${args[0]}`);
                message.reply(`${args[0]} has been slapped on ${serverName}.`);
                break;
            case 'unban':
                rcon.sendCommand(server, `Unban ${args[0]}`);
                message.reply(`${args[0]} has been unbanned from ${serverName}.`);
                break;
            default:
                message.reply('Unknown mod command.');
                break;
        }
    }
};
