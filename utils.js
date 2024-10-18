// Example checkModPermission function
async function checkModPermission(message, serverName) {
    const modRoleId = config.modRoles[serverName]; // Assuming you store role IDs in config
    return message.member.roles.cache.has(modRoleId);
}

// Example execServerCommand function
async function execServerCommand(serverName, command) {
    const rcon = rconConnections[serverName];
    const result = await rcon.send(command);
    return JSON.parse(result);  // Parse the response if it's in JSON format
}
