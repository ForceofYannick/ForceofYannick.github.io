const { getInput } = require('./getInput');

function createPlayerObject(interaction) {
    console.log('~ createPlayerObject');
    return {
        "player-name": getInput(interaction, "player-name"),
        "discord-id": getInput(interaction, "discord-id"),
        "main-role": getInput(interaction, "main-role"),
        "orga-role-1": getInput(interaction, "orga-role-1"),
        "orga-role-2": getInput(interaction, "orga-role-2"),
        "instagram": getInput(interaction, "instagram"),
        "tiktok": getInput(interaction, "tiktok"),
        "twitter": getInput(interaction, "twitter"),
        "twitch": getInput(interaction, "twitch"),
        "youtube": getInput(interaction, "youtube"),
        "team": getInput(interaction, "team")
    };
}

module.exports = { createPlayerObject }; 