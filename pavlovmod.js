const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const PavlovRcon = require('pavlov-rcon');

// Discord bot setup
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// RCON setup for each server (add your server details in `servers.json`)
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

// Once the bot is ready
client.once('ready', () => {
  console.log('Bot is online!');
});

// Handle messages
client.on('messageCreate', async (message) => {
  // Ignore bot messages
  if (message.author.bot) return;

  const args = message.content.slice(1).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  const serverName = args[args.length - 1]; // Last argument is the server name
  const server = servers[serverName];

  // Handle RCON commands
  if (!server && command !== 'players') {
    const serverNotFoundEmbed = new EmbedBuilder()
      .setColor('#FF0000')
      .setTitle('Server Not Found')
      .setDescription(`Server "${serverName}" not found!`)
      .setTimestamp();
    return message.channel.send({ embeds: [serverNotFoundEmbed] });
  }

  const rcon = rconConnections[serverName];

  switch (command) {
    // Anyone can use the !players command
    case 'players':
      try {
        const serverForPlayers = servers[args[0]] || Object.keys(servers)[0];
        const rconForPlayers = rconConnections[serverForPlayers];
        
        await rconForPlayers.connect();
        const playerData = await rconForPlayers.send('RefreshList');
        const players = playerData.split('\n').filter(player => player.trim() !== '');

        const embed = new EmbedBuilder()
          .setTitle(`Current Players in Pavlov (${serverForPlayers})`)
          .setColor(0x0099ff)
          .setDescription(players.length > 0 ? players.join('\n') : 'No players are currently connected.');
        
        await message.channel.send({ embeds: [embed] });
        await rconForPlayers.disconnect();
        
      } catch (error) {
        console.error('Error fetching players:', error);
        message.channel.send('There was an error fetching the player list.');
      }
      break;

    // Moderator/Admin Commands
    case 'ban':
      await rcon.connect();
      await rcon.send(`Ban ${args[0]}`);
      await rcon.disconnect();
      const banEmbed = new EmbedBuilder()
        .setColor('#00FF00')
        .setTitle('Ban Successful')
        .setDescription(`${args[0]} has been banned from ${serverName}.`)
        .setTimestamp();
      message.channel.send({ embeds: [banEmbed] });
      break;

    case 'kick':
      await rcon.connect();
      await rcon.send(`Kick ${args[0]}`);
      await rcon.disconnect();
      const kickEmbed = new EmbedBuilder()
        .setColor('#00FF00')
        .setTitle('Kick Successful')
        .setDescription(`${args[0]} has been kicked from ${serverName}.`)
        .setTimestamp();
      message.channel.send({ embeds: [kickEmbed] });
      break;

    case 'gag':
      await rcon.connect();
      await rcon.send(`Gag ${args[0]}`);
      await rcon.disconnect();
      const gagEmbed = new EmbedBuilder()
        .setColor('#00FF00')
        .setTitle('Gag Successful')
        .setDescription(`${args[0]} has been gagged (muted) on ${serverName}.`)
        .setTimestamp();
      message.channel.send({ embeds: [gagEmbed] });
      break;

    case 'ungag':
      await rcon.connect();
      await rcon.send(`Ungag ${args[0]}`);
      await rcon.disconnect();
      const ungagEmbed = new EmbedBuilder()
        .setColor('#00FF00')
        .setTitle('Ungag Successful')
        .setDescription(`${args[0]} has been ungagged (unmuted) on ${serverName}.`)
        .setTimestamp();
      message.channel.send({ embeds: [ungagEmbed] });
      break;

    case 'flush':
      await rcon.connect();
      await rcon.send('Flush');
      await rcon.disconnect();
      const flushEmbed = new EmbedBuilder()
        .setColor('#00FF00')
        .setTitle('Flush Successful')
        .setDescription(`Server ${serverName} has been flushed.`)
        .setTimestamp();
      message.channel.send({ embeds: [flushEmbed] });
      break;

    case 'kill':
      await rcon.connect();
      await rcon.send(`Kill ${args[0]}`);
      await rcon.disconnect();
      const killEmbed = new EmbedBuilder()
        .setColor('#00FF00')
        .setTitle('Kill Successful')
        .setDescription(`${args[0]} has been killed in ${serverName}.`)
        .setTimestamp();
      message.channel.send({ embeds: [killEmbed] });
      break;

    case 'slap':
      await rcon.connect();
      await rcon.send(`Slap ${args[0]}`);
      await rcon.disconnect();
      const slapEmbed = new EmbedBuilder()
        .setColor('#00FF00')
        .setTitle('Slap Successful')
        .setDescription(`${args[0]} has been slapped in ${serverName}.`)
        .setTimestamp();
      message.channel.send({ embeds: [slapEmbed] });
      break;

    case 'switchteam':
      await rcon.connect();
      await rcon.send(`SwitchTeam ${args[0]}`);
      await rcon.disconnect();
      const switchTeamEmbed = new EmbedBuilder()
        .setColor('#00FF00')
        .setTitle('Switch Team Successful')
        .setDescription(`${args[0]} has been switched to the opposite team on ${serverName}.`)
        .setTimestamp();
      message.channel.send({ embeds: [switchTeamEmbed] });
      break;

    case 'teleport':
      const targetPlayer = args[0]; // Player to teleport
      const destinationPlayer = args[2]; // Player whose location will be used

      try {
        await rcon.connect();

        // Get the position of the destination player
        const positionData = await rcon.send(`GetPosition ${destinationPlayer}`);
        const [x, y, z] = positionData.split(' ').map(coord => parseFloat(coord));

        // Teleport the target player to the destination player’s coordinates
        await rcon.send(`Teleport ${targetPlayer} ${x} ${y} ${z}`);

        await rcon.disconnect();

        const teleportEmbed = new EmbedBuilder()
          .setColor('#00FF00')
          .setTitle('Teleport Successful')
          .setDescription(`${targetPlayer} has been teleported to ${destinationPlayer}'s location on ${serverName}.`)
          .setTimestamp();
        message.channel.send({ embeds: [teleportEmbed] });

      } catch (error) {
        console.error('Error teleporting player:', error);
        const errorEmbed = new EmbedBuilder()
          .setColor('#FF0000')
          .setTitle('Teleport Failed')
          .setDescription('There was an error teleporting the player.')
          .setTimestamp();
        message.channel.send({ embeds: [errorEmbed] });
      }
      break;

    case 'unban':
      await rcon.connect();
      await rcon.send(`Unban ${args[0]}`);
      await rcon.disconnect();
      const unbanEmbed = new EmbedBuilder()
        .setColor('#00FF00')
        .setTitle('Unban Successful')
        .setDescription(`${args[0]} has been unbanned from ${serverName}.`)
        .setTimestamp();
      message.channel.send({ embeds: [unbanEmbed] });
      break;

    case 'tttalwaysenableskinmenu':
      await rcon.connect();
      await rcon.send('TTTAlwaysEnableSkinMenu');
      await rcon.disconnect();
      const tttSkinMenuEmbed = new EmbedBuilder()
        .setColor('#00FF00')
        .setTitle('TTT Skin Menu Enabled')
        .setDescription(`TTT Skin Menu has been always enabled on ${serverName}.`)
        .setTimestamp();
      message.channel.send({ embeds: [tttSkinMenuEmbed] });
      break;

    case 'tttendround':
      await rcon.connect();
      await rcon.send('TTTEndRound');
      await rcon.disconnect();
      const tttEndRoundEmbed = new EmbedBuilder()
        .setColor('#00FF00')
        .setTitle('TTT Round Ended')
        .setDescription(`The current TTT round has been ended on ${serverName}.`)
        .setTimestamp();
      message.channel.send({ embeds: [tttEndRoundEmbed] });
      break;

    case 'tttflushkarma':
      await rcon.connect();
      await rcon.send('TTTFlushKarma');
      await rcon.disconnect();
      const tttFlushKarmaEmbed = new EmbedBuilder()
        .setColor('#00FF00')
        .setTitle('TTT Karma Flushed')
        .setDescription(`TTT Karma has been flushed on ${serverName}.`)
        .setTimestamp();
      message.channel.send({ embeds: [tttFlushKarmaEmbed] });
      break;

    case 'tttgivecredits':
      const tttUser = args[0];
      const tttCredits = args[1];
      await rcon.connect();
      await rcon.send(`TTTGiveCredits ${tttUser} ${tttCredits}`);
      await rcon.disconnect();
      const tttGiveCreditsEmbed = new EmbedBuilder()
        .setColor('#00FF00')
        .setTitle('TTT Credits Given')
        .setDescription(`${tttUser} has been given ${tttCredits} credits on ${serverName}.`)
        .setTimestamp();
      message.channel.send({ embeds: [tttGiveCreditsEmbed] });
      break;

    case 'tttpausetimer':
      await rcon.connect();
      await rcon.send('TTTPauseTimer');
      await rcon.disconnect();
      const tttPauseTimerEmbed = new EmbedBuilder()
        .setColor('#00FF00')
        .setTitle('TTT Timer Paused')
        .setDescription(`The TTT round timer has been paused on ${serverName}.`)
        .setTimestamp();
      message.channel.send({ embeds: [tttPauseTimerEmbed] });
      break;

    case 'tttsetkarma':
      const tttKarmaUser = args[0];
      const tttKarmaValue = args[1];
      await rcon.connect();
      await rcon.send(`TTTSetKarma ${tttKarmaUser} ${tttKarmaValue}`);
      await rcon.disconnect();
      const tttSetKarmaEmbed = new EmbedBuilder()
        .setColor('#00FF00')
        .setTitle('TTT Karma Set')
        .setDescription(`${tttKarmaUser} now has ${tttKarmaValue} karma on ${serverName}.`)
        .setTimestamp();
      message.channel.send({ embeds: [tttSetKarmaEmbed] });
      break;

    case 'tttsetrole':
      const tttRoleUser = args[0];
      const tttRoleValue = args[1];
      await rcon.connect();
      await rcon.send(`TTTSetRole ${tttRoleUser} ${tttRoleValue}`);
      await rcon.disconnect();
      const tttSetRoleEmbed = new EmbedBuilder()
        .setColor('#00FF00')
        .setTitle('TTT Role Set')
        .setDescription(`${tttRoleUser} now has the role ${tttRoleValue} on ${serverName}.`)
        .setTimestamp();
      message.channel.send({ embeds: [tttSetRoleEmbed] });
      break;

    // Add more commands / modify as you please
  }
});

// Log in the bot with your Discord token
client.login('YOUR_DISCORD_BOT_TOKEN');
