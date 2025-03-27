//for json file stuff
const fs = require("fs").promises;

//for option type
const {
    ApplicationCommandOptionType,
} = require('discord.js');

//for embed stuff
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'getallteams',
    description: '📜 Displays all teams!',
    testOnly: true,

    callback: async (client, interaction) => {

        // delay discord reply to prevent timeout error
        await interaction.deferReply();

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

        // save all teams in lists
        const TeamList = Object.keys(jsonData.Teams).join(', ') || '-';
        



        // construct embed
        const embed = new EmbedBuilder()
        .setColor(0xFFFF80)
        .setTitle(`Alle existierenden Teams`)
        .addFields(
            { name: 'Teams', value: TeamList },
        );

        // send relpy
        await interaction.editReply({ embeds: [embed] });
    },
};
