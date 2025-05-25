const fs = require("fs").promises;
const { getInput } = require('@utils/getInput');
const { constructEmbed } = require("@utils/constructEmbed.js");
const { readJSON } = require("@json/readJSON.js");
const { ApplicationCommandOptionType } = require('discord.js');
const { Client, IntentsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'getteam',
    description: '📜 Display a team!',
    options: [
        {
            name: "team-name",
            description: "The team name",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],

    callback: async (client, interaction) => {
        console.log("=> getteam");
        await interaction.deferReply();

        // Get input
        const teamName = getInput(interaction, 'team-name');

        /*
        1. Read JSON
        2. Print embed
        */

        // 1. Read JSON
        let jsonData;
        try {
            jsonData = await readJSON();
        }
        catch (err) {
            await interaction.editReply(err.message);
            return;
        }

        // 1.5 existence check
        // if team not found, return
        if (!jsonData.Teams[teamName]) {
            console.error(`❌ Team ${teamName} nicht gefunden`);
            await interaction.editReply(`❌ Team ${teamName} nicht gefunden`);
            return;
        }

        // 2. Print embed

        // save path to team section
        const teamPath = jsonData.Teams[teamName];

        // save team data in lists
        const playerList = Object.keys(teamPath.Players);
        const resultList = Object.keys(teamPath.Results);


        const embed = constructEmbed('get-team', { name: teamName, players: playerList, results: resultList });
        await interaction.editReply({ embeds: [embed] });
    },
};
