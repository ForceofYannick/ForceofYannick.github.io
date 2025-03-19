//for json file stuff
const fs = require("fs").promises;

//for option type
const {
    ApplicationCommandOptionType,
} = require('discord.js');

//for embed stuff
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'getplayer',
    description: '📜 Display a player!',
    testOnly: true,
    options: [
        {
            name: "name",
            description: "The player name",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],

    callback: async (client, interaction) => {

        // delay discord reply to prevent timeout error
        await interaction.deferReply();

        //get input
        const playerName = interaction.options.get('name').value.toLowerCase();

        // read data json file
        let jsonData;
        let rawData;

        try {
            rawData = await fs.readFile("data.json", "utf8");
            jsonData = JSON.parse(rawData);

        } catch (err) {
            console.error("❌ Fehler beim Lesen:", err);
            await interaction.editReply("❌ Fehler beim lesen der JSON-Datei!");
            return;
        }


        // prepare data for embed
        let discordID, activeTeam, roles, instagram, tiktok, twitter, twitch, youtube = "-";

        let playerFound = false;

        // search player in teams section
        for (const team in jsonData.Teams) {
            const player = jsonData.Teams[team].Players[playerName];

            // if player exists
            if (player) {

                // update player found flag
                playerFound = true;

                // update prepared data
                discordID = player['discord-id'];
                activeTeam = player['team'];
                roles = player['roles'];
                instagram = player['instagram'];
                tiktok = player['tiktok'];
                twitter = player['twitter'];
                twitch = player['twitch'];
                youtube = player['youtube'];
            }
        }
        // if player not found yet
        if (!playerFound) {

            // update player in unsorted section
            for (player in jsonData.Unsorted) {

                // if player exists
                if (jsonData.Unsorted[player]) {

                    // update player found flag
                    playerFound = true;

                    // update prepared data
                    discordID = jsonData.Unsorted[player]['discord-id'];
                    activeTeam = jsonData.Unsorted[player]['team'];
                    roles = jsonData.Unsorted[player]['roles'];
                    instagram = jsonData.Unsorted[player]['instagram'];
                    tiktok = jsonData.Unsorted[player]['tiktok'];
                    twitter = jsonData.Unsorted[player]['twitter'];
                    twitch = jsonData.Unsorted[player]['twitch'];
                    youtube = jsonData.Unsorted[player]['youtube'];
                }
            }
        }

        // if player still not found, error
        if (!playerFound) {
            console.error(`❌ Spieler ${playerName} nicht gefunden`);
            await interaction.editReply(`❌ Spieler ${playerName} nicht gefunden`);
            return;
        }


        // construct embed
        const embed = new EmbedBuilder()
            .setColor(0x2090FF)
            .setTitle(`${playerName}`)
            .addFields(
                { name: 'Discord Name', value: discordID === '-' ? discordID : `<@${discordID}>` },
                { name: 'Team', value: `${activeTeam}` },
                { name: 'Roles', value: `${roles}` },
                { name: 'Instagram', value: instagram === '-' ? instagram : `[Instagram](${instagram})`, inline: true },
                { name: 'TikTok', value: tiktok === '-' ? tiktok : `[TikTok](${tiktok})`, inline: true },
                { name: 'Twitter', value: twitter === '-' ? twitter : `[Twitter](${twitter})`, inline: true },
                { name: 'Twitch', value: twitch === '-' ? twitch : `[Twitch](${twitch})`, inline: true },
                { name: 'YouTube', value: youtube === '-' ? youtube : `[YouTube](${youtube})`, inline: true }
            );

        // reply
        await interaction.editReply({ embeds: [embed] });
    },
};
