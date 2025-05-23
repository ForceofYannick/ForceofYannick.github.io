//for json file stuff
const fs = require("fs").promises;

//for option type
const {
    ApplicationCommandOptionType,
} = require('discord.js');

//for embed stuff
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'getunsortedplayers',
    description: '📜 Displays all unsorted players!',
    testOnly: true,

    callback: async (client, interaction) => {

        console.log("=> getunsortedplayers");

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

        // save unsorted players in lists
        const playerList = Object.keys(jsonData.Unsorted).join(', ') || '-';
        



        // construct embed
        const embed = new EmbedBuilder()
        .setColor(0xFFFF80)
        .setTitle(`Spieler ohne Team`)
        .addFields(
            { name: 'Spieler', value: playerList },
        );

        // send relpy
        await interaction.editReply({ embeds: [embed] });
    },
};
