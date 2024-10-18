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

            case 'gag':
                rcon.sendCommand(server, `Gag ${args[0]}`);
                const gagEmbed = new Discord.MessageEmbed()
                    .setColor('#00FF00')
                    .setTitle('Gag Successful')
                    .setDescription(`${args[0]} has been gagged (muted) on ${serverName}.`)
                    .setTimestamp();
                message.channel.send({ embeds: [gagEmbed] });
                break;

            case 'ungag':
                rcon.sendCommand(server, `Ungag ${args[0]}`);
                const ungagEmbed = new Discord.MessageEmbed()
                    .setColor('#00FF00')
                    .setTitle('Ungag Successful')
                    .setDescription(`${args[0]} has been ungagged (unmuted) on ${serverName}.`)
                    .setTimestamp();
                message.channel.send({ embeds: [ungagEmbed] });
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

            case 'switchteam':
                rcon.sendCommand(server, `SwitchTeam ${args[0]}`);
                const switchTeamEmbed = new Discord.MessageEmbed()
                    .setColor('#00FF00')
                    .setTitle('Switch Team Successful')
                    .setDescription(`${args[0]} has been switched to the opposite team on ${serverName}.`)
                    .setTimestamp();
                message.channel.send({ embeds: [switchTeamEmbed] });
                break;

            case 'teleport':
                rcon.sendCommand(server, `Teleport ${args[0]} ${args[1]} ${args[2]} ${args[3]}`);
                const teleportEmbed = new Discord.MessageEmbed()
                    .setColor('#00FF00')
                    .setTitle('Teleport Successful')
                    .setDescription(`${args[0]} has been teleported to coordinates (${args[1]}, ${args[2]}, ${args[3]}) on ${serverName}.`)
                    .setTimestamp();
                message.channel.send({ embeds: [teleportEmbed] });
                break;

            case 'tttalwaysenableskinmenu':
                rcon.sendCommand(server, `TTTAlwaysEnableSkinMenu`);
                const tttSkinMenuEmbed = new Discord.MessageEmbed()
                    .setColor('#00FF00')
                    .setTitle('TTT Skin Menu Enabled')
                    .setDescription(`TTT Skin Menu has been always enabled on ${serverName}.`)
                    .setTimestamp();
                message.channel.send({ embeds: [tttSkinMenuEmbed] });
                break;

            case 'tttendround':
                rcon.sendCommand(server, `TTTEndRound`);
                const tttEndRoundEmbed = new Discord.MessageEmbed()
                    .setColor('#00FF00')
                    .setTitle('TTT Round Ended')
                    .setDescription(`The current TTT round has been ended on ${serverName}.`)
                    .setTimestamp();
                message.channel.send({ embeds: [tttEndRoundEmbed] });
                break;

            case 'tttflushkarma':
                rcon.sendCommand(server, `TTTFlushKarma`);
                const tttFlushKarmaEmbed = new Discord.MessageEmbed()
                    .setColor('#00FF00')
                    .setTitle('TTT Karma Flushed')
                    .setDescription(`Karma has been flushed on ${serverName}.`)
                    .setTimestamp();
                message.channel.send({ embeds: [tttFlushKarmaEmbed] });
                break;

            case 'tttgivecredits':
                rcon.sendCommand(server, `TTTGiveCredits ${args[0]} ${args[1]}`);
                const tttGiveCreditsEmbed = new Discord.MessageEmbed()
                    .setColor('#00FF00')
                    .setTitle('TTT Credits Given')
                    .setDescription(`${args[0]} has been given ${args[1]} credits on ${serverName}.`)
                    .setTimestamp();
                message.channel.send({ embeds: [tttGiveCreditsEmbed] });
                break;

            case 'tttpausetimer':
                rcon.sendCommand(server, `TTTPauseTimer`);
                const tttPauseTimerEmbed = new Discord.MessageEmbed()
                    .setColor('#00FF00')
                    .setTitle('TTT Timer Paused')
                    .setDescription(`TTT round timer has been paused on ${serverName}.`)
                    .setTimestamp();
                message.channel.send({ embeds: [tttPauseTimerEmbed] });
                break;

            case 'tttsetkarma':
                rcon.sendCommand(server, `TTTSetKarma ${args[0]} ${args[1]}`);
                const tttSetKarmaEmbed = new Discord.MessageEmbed()
                    .setColor('#00FF00')
                    .setTitle('TTT Karma Set')
                    .setDescription(`${args[0]}'s karma has been set to ${args[1]} on ${serverName}.`)
                    .setTimestamp();
                message.channel.send({ embeds: [tttSetKarmaEmbed] });
                break;

            case 'tttsetrole':
                rcon.sendCommand(server, `TTTSetRole ${args[0]} ${args[1]}`);
                const tttSetRoleEmbed = new Discord.MessageEmbed()
                    .setColor('#00FF00')
                    .setTitle('TTT Role Set')
                    .setDescription(`${args[0]}'s role has been set to ${args[1]} on ${serverName}.`)
                    .setTimestamp();
                message.channel.send({ embeds: [tttSetRoleEmbed] });
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
