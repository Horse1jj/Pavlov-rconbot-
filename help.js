module.exports = {
    getHelpMessage() {
        return `
**Mod Commands:**
- !ban [username] [server]: Ban a player.
- !kick [username] [server]: Kick a player.
- !flush [server]: Flush the server.
- !kill [username] [server]: Kill a player.
- !slap [username] [server]: Slap a player.
- !unban [username] [server]: Unban a player.

**Admin Commands:**
- !giveitem [username] [item] [server]: Give an item to a player.
- !givevehicle [username] [vehicle] [server]: Give a vehicle to a player.
- !ignite [username] [server]: Ignite a player.
- !godmode [username] [server]: Enable god mode for a player.
- !detonate [username] [server]: Detonate a player.
- !rotate [server]: Rotate the map.
- !switchmap [mapName] [server]: Switch to another map.
        `;
    }
};
