const fs = require("fs").promises;
const { getInput } = require('@utils/getInput.js');
const { constructEmbed } = require("@utils/constructEmbed.js");
const { saveJSON } = require("@json/saveJSON.js");
const { readJSON } = require("@json/readJSON.js");
const { deleteResultFromJSON } = require("@json/deleteResultFromJSON.js");
const { Client, IntentsBitField, EmbedBuilder } = require('discord.js');
const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');

module.exports = {
    name: 'deleteteamresults',
    description: '🔄 Delete a team results!',
    options: [
        {
            name: "team-name",
            description: "The team name",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: "split-season",
            description: "The split season",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
            {
            name: "split-year",
            description: "The split year",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        ],

    callback: async (client, interaction) => {
        console.log("=> deleteteamresults");
        await interaction.deferReply();

        // Get inputs
        const teamName = getInput(interaction, 'team-name');
        const splitName = getInput(interaction, 'split-season') + "'" + getInput(interaction, 'split-year');

        /*
        1. Read JSON
        2. Remove result
        3. Save JSON
        4. Print embed
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

        // 2. Remove result
        deleteResultFromJSON(jsonData, teamName, splitName);

        // 3. Save JSON
        try {
            saveJSON(jsonData);
        }
        catch (err) {
            await interaction.editReply(err.message);
            return;
        }

        // 4. Print embed
        const embed = constructEmbed('delete-result', { team: teamName, split: splitName });
        await interaction.editReply({ embeds: [embed] });
    },
};
