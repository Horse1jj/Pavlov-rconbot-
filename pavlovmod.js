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
            case 'ban':
                rcon.sendCommand(server, `Ban ${args[0]}`);
                const banEmbed = new Discord.MessageEmbed()
                    .setColor('#00FF00')
                    .setTitle('Ban Successful')
                    .setDescription(`${args[0]} has been banned from ${serverName}.`)
                    .setTimestamp();
                message.channel.send({ embeds: [banEmbed] });
                break;
            case 'kick':
                rcon.sendCommand(server, `Kick ${args[0]}`);
                const kickEmbed = new Discord.MessageEmbed()
                    .setColor('#00FF00')
                    .setTitle('Kick Successful')
                    .setDescription(`${args[0]} has been kicked from ${serverName}.`)
                    .setTimestamp();
                message.channel.send({ embeds: [kickEmbed] });
                break;
            case 'flush':
                rcon.sendCommand(server, `Flush`);
                const flushEmbed = new Discord.MessageEmbed()
                    .setColor('#00FF00')
                    .setTitle('Flush Successful')
                    .setDescription(`Server ${serverName} has been flushed.`)
                    .setTimestamp();
                message.channel.send({ embeds: [flushEmbed] });
                break;
            case 'kill':
                rcon.sendCommand(server, `Kill ${args[0]}`);
                const killEmbed = new Discord.MessageEmbed()
                    .setColor('#00FF00')
                    .setTitle('Kill Successful')
                    .setDescription(`${args[0]} has been killed in ${serverName}.`)
                    .setTimestamp();
                message.channel.send({ embeds: [killEmbed] });
                break;
            case 'slap':
                rcon.sendCommand(server, `Slap ${args[0]}`);
                const slapEmbed = new Discord.MessageEmbed()
                    .setColor('#00FF00')
                    .setTitle('Slap Successful')
                    .setDescription(`${args[0]} has been slapped in ${serverName}.`)
                    .setTimestamp();
                message.channel.send({ embeds: [slapEmbed] });
                break;
            case 'unban':
                rcon.sendCommand(server, `Unban ${args[0]}`);
                const unbanEmbed = new Discord.MessageEmbed()
                    .setColor('#00FF00')
                    .setTitle('Unban Successful')
                    .setDescription(`${args[0]} has been unbanned from ${serverName}.`)
                    .setTimestamp();
                message.channel.send({ embeds: [unbanEmbed] });
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
