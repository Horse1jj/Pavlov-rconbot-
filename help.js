const Discord = require('discord.js');

module.exports = {
    handleHelpCommand(message, roles) {
        // Create a help embed with categorized sections for both Mod and Admin commands
        const helpEmbed = new Discord.MessageEmbed()
            .setColor('#00FF00')
            .setTitle('Pavlov RCON Bot Commands')
            .setDescription('Here are the available commands for this bot, categorized by your role:')
            .setTimestamp();

        // Check if the user has the "ModBot" role
        if (roles.modBot.some(role => message.member.roles.cache.has(role))) {
            helpEmbed.addField('**Moderator Commands**', `
            \`!ban <player> <server>\` - Ban a player from a server.
            \`!kick <player> <server>\` - Kick a player from a server.
            \`!flush <server>\` - Flush the server.
            \`!kill <player> <server>\` - Kill a player on the server.
            \`!slap <player> <server>\` - Slap a player on the server.
            \`!unban <player> <server>\` - Unban a player.
            \`!switchteam <player> <server>\` - Switch a player to the opposite team.
            \`!teleport <player> <x> <y> <z> <server>\` - Teleport a player to coordinates.
            \`!tttalwaysenableskinmenu <server>\` - Enable the TTT Skin Menu permanently.
            \`!tttendround <server>\` - End the current TTT round.
            \`!tttflushkarma <server>\` - Flush Karma for TTT mode.
            \`!tttgivecredits <player> <amount> <server>\` - Give credits to a TTT player.
            \`!tttpausetimer <server>\` - Pause the TTT round timer.
            \`!tttsetkarma <player> <amount> <server>\` - Set a player’s Karma in TTT.
            \`!tttsetrole <player> <role> <server>\` - Set a player's role in TTT.
            `);
        }

        // Check if the user has the "AdminBot" role
        if (roles.adminBot.some(role => message.member.roles.cache.has(role))) {
            helpEmbed.addField('**Admin Commands**', `
            \`!giveitem <player> <item> <server>\` - Give an item to a player.
            \`!givevehicle <player> <vehicle> <server>\` - Give a vehicle to a player.
            \`!ignite <player> <server>\` - Set a player on fire.
            \`!godmode <player> <server>\` - Enable GodMode for a player.
            \`!detonate <player> <server>\` - Detonate a player.
            \`!rotate <server>\` - Rotate the map on the server.
            \`!switchmap <mapname> <server>\` - Switch to a different map.
            `);
        }

        // Check if no roles are matched
        if (!roles.modBot.some(role => message.member.roles.cache.has(role)) && 
            !roles.adminBot.some(role => message.member.roles.cache.has(role))) {
            helpEmbed.setDescription('You do not have permission to access any commands.');
        }

        // Send the help embed
        message.channel.send({ embeds: [helpEmbed] });
    }
};
