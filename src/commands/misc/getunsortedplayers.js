const fs = require("fs").promises;
const { ApplicationCommandOptionType } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'getunsortedplayers',
    description: '📜 Displays all unsorted players!',

    callback: async (client, interaction) => {
        console.log("=> getunsortedplayers");
        await interaction.deferReply();

        // Read JSON
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

        // Save unsorted players in list
        const playerList = Object.keys(jsonData.Unsorted).join(', ') || '-';
        
        // Construct embed
        const embed = new EmbedBuilder()
        .setColor(0xFFFF80)
        .setTitle(`Spieler ohne Team`)
        .addFields(
            { name: 'Spieler', value: playerList },
        );

        // Print embed
        await interaction.editReply({ embeds: [embed] });
    },
};
