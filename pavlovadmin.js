const rcon = require('pavlov-rcon');
const Discord = require('discord.js');

module.exports = {
    handleCommand(command, args, message, servers) {
        const serverName = args[args.length - 1];
        const server = servers[serverName];

        if (!server) {
            const serverNotFoundEmbed = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setTitle('Server Not Found')
                .setDescription(`Server "${serverName}" not found!`)
                .setTimestamp();

            return message.channel.send({ embeds: [serverNotFoundEmbed] });
        }

        switch (command) {
            case 'giveitem':
                rcon.sendCommand(server, `GiveItem ${args[0]} ${args[1]}`);
                const giveItemEmbed = new Discord.MessageEmbed()
                    .setColor('#00FF00')
                    .setTitle('Item Given')
                    .setDescription(`${args[0]} has been given ${args[1]} on ${serverName}.`)
                    .setTimestamp();
                message.channel.send({ embeds: [giveItemEmbed] });
                break;
            case 'givevehicle':
                rcon.sendCommand(server, `GiveVehicle ${args[0]} ${args[1]}`);
                const giveVehicleEmbed = new Discord.MessageEmbed()
                    .setColor('#00FF00')
                    .setTitle('Vehicle Given')
                    .setDescription(`${args[0]} has been given vehicle ${args[1]} on ${serverName}.`)
                    .setTimestamp();
                message.channel.send({ embeds: [giveVehicleEmbed] });
                break;
            case 'ignite':
                rcon.sendCommand(server, `Ignite ${args[0]}`);
                const igniteEmbed = new Discord.MessageEmbed()
                    .setColor('#00FF00')
                    .setTitle('Ignite Successful')
                    .setDescription(`${args[0]} has been ignited in ${serverName}.`)
                    .setTimestamp();
                message.channel.send({ embeds: [igniteEmbed] });
                break;
            case 'godmode':
                rcon.sendCommand(server, `GodMode ${args[0]}`);
                const godmodeEmbed = new Discord.MessageEmbed()
                    .setColor('#00FF00')
                    .setTitle('GodMode Enabled')
                    .setDescription(`${args[0]} now has GodMode in ${serverName}.`)
                    .setTimestamp();
                message.channel.send({ embeds: [godmodeEmbed] });
                break;
            case 'detonate':
                rcon.sendCommand(server, `Detonate ${args[0]}`);
                const detonateEmbed = new Discord.MessageEmbed()
                    .setColor('#00FF00')
                    .setTitle('Detonation Successful')
                    .setDescription(`${args[0]} has been detonated in ${serverName}.`)
                    .setTimestamp();
                message.channel.send({ embeds: [detonateEmbed] });
                break;
            case 'rotate':
                rcon.sendCommand(server, `RotateMap`);
                const rotateEmbed = new Discord.MessageEmbed()
                    .setColor('#00FF00')
                    .setTitle('Map Rotated')
                    .setDescription(`Map has been rotated on ${serverName}.`)
                    .setTimestamp();
                message.channel.send({ embeds: [rotateEmbed] });
                break;
            case 'switchmap':
                rcon.sendCommand(server, `SwitchMap ${args[0]}`);
                const switchMapEmbed = new Discord.MessageEmbed()
                    .setColor('#00FF00')
                    .setTitle('Map Switched')
                    .setDescription(`Map switched to ${args[0]} on ${serverName}.`)
                    .setTimestamp();
                message.channel.send({ embeds: [switchMapEmbed] });
                break;
            default:
                const unknownEmbed = new Discord.MessageEmbed()
                    .setColor('#FF0000')
                    .setTitle('Unknown Command')
                    .setDescription(`The command "${command}" is not recognized.`)
                    .setTimestamp();
                message.channel.send({ embeds: [unknownEmbed] });
        }
    }
};
