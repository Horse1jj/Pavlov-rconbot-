const { EmbedBuilder } = require('discord.js');
const PavlovRcon = require('pavlov-rcon');
const aliases = require('./aliases');  
const config = require('./config');
const { randomElement, checkModPermission, execServerCommand } = require('./utils');  

// RCON setup for each server
const servers = require('./servers.json');
const rconConnections = {};

for (let serverName in servers) {
  const server = servers[serverName];
  rconConnections[serverName] = new PavlovRcon({
    ip: server.ip,
    port: server.port,
    password: server.password
  });
}

// Mod commands
module.exports = {
  name: 'Pavlovmod',
  description: 'Pavlov Mod Commands',

  async execute(message, args) {
    const command = args.shift().toLowerCase();
    const serverName = args[0] || config.default_server;
    const rcon = rconConnections[serverName];

    // Check for mod permission for all commands
    const hasPermission = await checkModPermission(message, serverName);
    if (!hasPermission) {
      const noPermEmbed = new EmbedBuilder()
        .setTitle('Permission Denied')
        .setDescription('You do not have permission to use this command.')
        .setColor('#FF0000');
      return message.channel.send({ embeds: [noPermEmbed] });
    }

    try {
      // Connect to the RCON server
      await rcon.connect();

      switch (command) {
        case 'flush':
          await flushCommand(message, serverName, rcon);
          break;

        case 'ban':
          await execCommand(message, serverName, rcon, `Ban ${args[1]}`);
          break;

        case 'kick':
          await execCommand(message, serverName, rcon, `Kick ${args[1]}`);
          break;

        case 'kill':
          await execCommand(message, serverName, rcon, `Kill ${args[1]}`);
          break;

        case 'slap':
          await execCommand(message, serverName, rcon, `Slap ${args[1]}`);
          break;

        case 'unban':
          await execCommand(message, serverName, rcon, `Unban ${args[1]}`);
          break;

        case 'switchteam':
          await execCommand(message, serverName, rcon, `SwitchTeam ${args[1]}`);
          break;

        case 'teleport':
          if (args.length === 2) {
            await execCommand(message, serverName, rcon, `Teleport ${args[0]} ${args[1]}`);
          } else {
            message.channel.send('Invalid syntax. Use: !teleport (player name) to (player name)');
          }
          break;

        case 'tttalwaysenableskinmenu':
          await execCommand(message, serverName, rcon, `TTTAlwaysEnableSkinMenu`);
          break;

        case 'tttendround':
          await execCommand(message, serverName, rcon, `TTTEndRound`);
          break;

        case 'tttflushkarma':
          await execCommand(message, serverName, rcon, `TTTFlushKarma`);
          break;

        case 'tttgivecredits':
          await execCommand(message, serverName, rcon, `TTTGiveCredits ${args[1]} ${args[2]}`);
          break;

        case 'tttpausetimer':
          await execCommand(message, serverName, rcon, `TTTPauseTimer`);
          break;

        case 'tttsetkarma':
          await execCommand(message, serverName, rcon, `TTTSetKarma ${args[1]} ${args[2]}`);
          break;

        case 'tttsetrole':
          await execCommand(message, serverName, rcon, `TTTSetRole ${args[1]} ${args[2]}`);
          break;

        case 'gag':
          await execCommand(message, serverName, rcon, `Gag ${args[1]}`);
          break;

        case 'ungag':
          await execCommand(message, serverName, rcon, `Ungag ${args[1]}`);
          break;

        default:
          message.channel.send('Unknown command.');
          break;
      }

      // Disconnect after each command execution
      await rcon.disconnect();

    } catch (error) {
      console.error(`Error executing ${command}:`, error);
      const errorEmbed = new EmbedBuilder()
        .setTitle(`Error Executing ${command}`)
        .setDescription('There was an error executing the command.')
        .setColor('#FF0000');
      await message.channel.send({ embeds: [errorEmbed] });
    }
  }
};

// Helper function for general commands
async function execCommand(message, serverName, rcon, command) {
  const data = await rcon.send(command);
  const embed = new EmbedBuilder()
    .setTitle(`Executed \`${command}\``)
    .setDescription(`${data}`)
    .setColor('#00FF00');
  await message.channel.send({ embeds: [embed] });
}

// Flush command with special logic
async function flushCommand(message, serverName, rcon) {
  const data = await execServerCommand(serverName, 'RefreshList');
  const playerList = data.PlayerList;

  const nonAliasPlayerIds = [];
  playerList.forEach(player => {
    const isAlias = aliases.findPlayerAlias(player.UniqueId);
    if (!isAlias) {
      nonAliasPlayerIds.push(player.UniqueId);
    }
  });

  if (nonAliasPlayerIds.length === 0) {
    const embed = new EmbedBuilder()
      .setTitle(`No players to flush on \`${serverName}\``)
      .setColor('#00FF00');
    await message.channel.send({ embeds: [embed] });
    return;
  }

  const toKickId = randomElement(nonAliasPlayerIds);
  const kickData = await execServerCommand(serverName, `Kick ${toKickId}`);
  const kickSuccess = kickData.Kick;

  let embed;
  if (!kickSuccess) {
    embed = new EmbedBuilder()
      .setTitle(`Error while flushing on \`${serverName}\``)
      .setColor('#FF0000');
  } else {
    embed = new EmbedBuilder()
      .setTitle(`Successfully flushed player on \`${serverName}\``)
      .setColor('#00FF00');
  }

  await message.channel.send({ embeds: [embed] });
}

function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}
