const rcon = require('pavlov-rcon');

module.exports = {
    handleCommand(command, args, message, servers) {
        const serverName = args[args.length - 1];
        const server = servers[serverName];

        if (!server) {
            return message.reply('Server not found!');
        }

        switch (command) {
            case 'giveitem':
                rcon.sendCommand(server, `GiveItem ${args[0]} ${args[1]}`);
                message.reply(`${args[0]} has been given ${args[1]} on ${serverName}.`);
                break;
            case 'givevehicle':
                rcon.sendCommand(server, `GiveVehicle ${args[0]} ${args[1]}`);
                message.reply(`${args[0]} has been given vehicle ${args[1]} on ${serverName}.`);
                break;
            case 'ignite':
                rcon.sendCommand(server, `Ignite ${args[0]}`);
                message.reply(`${args[0]} has been ignited on ${serverName}.`);
                break;
            case 'godmode':
                rcon.sendCommand(server, `GodMode ${args[0]}`);
                message.reply(`${args[0]} is now in god mode on ${serverName}.`);
                break;
            case 'detonate':
                rcon.sendCommand(server, `Detonate ${args[0]}`);
                message.reply(`${args[0]} has been detonated on ${serverName}.`);
                break;
            case 'rotate':
                rcon.sendCommand(server, `RotateMap`);
                message.reply(`Map rotated on ${serverName}.`);
                break;
            case 'switchmap':
                rcon.sendCommand(server, `SwitchMap ${args[0]}`);
                message.reply(`Map switched to ${args[0]} on ${serverName}.`);
                break;
            default:
                message.reply('Unknown admin command.');
                break;
        }
    }
};
