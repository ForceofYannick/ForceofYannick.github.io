//for json file stuff
const fs = require("fs").promises;

//for option type
const {
    ApplicationCommandOptionType,
} = require('discord.js');

//for embed stuff
const { Client, IntentsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'getteam',
    description: '📜 Display a team!',
    testOnly: true,
    options: [
        {
            name: "team-name",
            description: "The team name",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],

    callback: async (client, interaction) => {

        // delay discord reply to prevent timeout error
        await interaction.deferReply();

        // get input
        const teamName = interaction.options.get('team-name').value.toLowerCase();

        // Read data json file
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

        // if team not found, return
        if (!jsonData.Teams[teamName]) {
            console.error(`❌ Team ${teamName} nicht gefunden`);
            await interaction.editReply(`❌ Team ${teamName} nicht gefunden`);
            return;
        }

        // save path to team section
        const teamPath = jsonData.Teams[teamName];

        // save team data in lists
        const playerList = Object.keys(teamPath.Players).join(', ') || '-';
        const resultList = Object.keys(teamPath.Results).join('\n') || '-';



        // construct embed
        const embed = new EmbedBuilder()
        .setColor(0x2090FF)
        .setTitle(`${teamName}`)
        .addFields(
            { name: 'Spieler', value: playerList },
            //{ name: '\u200B', value: '\u200B' }, // visual spacing
            { name: 'Ergebnisse', value: resultList }
        );

        // send relpy
        await interaction.editReply({ embeds: [embed] });
    },
};
