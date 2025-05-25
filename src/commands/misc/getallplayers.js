const fs = require("fs").promises;
const { constructEmbed } = require("@utils/constructEmbed.js");
const { readJSON } = require("@json/readJSON.js");
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'getallplayers',
    description: '📜 Display all existing players!',
    
    callback: async (client, interaction) => {
        console.log('=> getallplayers');
        await interaction.deferReply();

        // Read JSON
        let jsonData;
        try {
            jsonData = await readJSON();
        } catch (err) {
            await interaction.editReply(err.message);
            return;
        }

        let playerList = [];

        // Get all team players
        for (const [teamName, team] of Object.entries(jsonData.Teams)) {


            for (const playerName of Object.keys(team.Players)) {
                playerList.push(playerName);
            }
        }

        // Get all unsorted players
        if (jsonData.Unsorted) {
            playerList.push(...Object.keys(jsonData.Unsorted));
        }

        // Print embed
        const embed = constructEmbed('get-all-players', playerList);
        await interaction.editReply({ embeds: [embed] });
    },
};
