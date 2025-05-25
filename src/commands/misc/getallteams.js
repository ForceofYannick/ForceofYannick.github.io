const fs = require("fs").promises;
const { ApplicationCommandOptionType } = require('discord.js');
const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'getallteams',
    description: '📜 Displays all teams!',
    
    callback: async (client, interaction) => {
        console.log("=> getallteams");
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

        // Save all teams in list
        const teamList = Object.keys(jsonData.Teams).join(', ') || '-';
        
        // Construct embed
        const embed = new EmbedBuilder()
        .setColor(0xFFFF80)
        .setTitle(`Alle existierenden Teams`)
        .addFields(
            { name: 'Teams', value: teamList },
        );

        // Print embed
        await interaction.editReply({ embeds: [embed] });
    },
};
