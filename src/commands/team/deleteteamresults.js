const fs = require("fs").promises;

const { getInput } = require('@utils/getInput');
const { constructEmbed } = require("@utils/constructEmbed.js");

//for embed stuff
const { Client, IntentsBitField, EmbedBuilder } = require('discord.js');

const {
    ApplicationCommandOptionType,
    PermissionFlagsBits,
} = require('discord.js');

module.exports = {
    name: 'deleteteamresults',
    description: '🔄 Delete a team results!',
    testOnly: true,
    options: [
        {
            name: "team-name",
            description: "The team name",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: "split-name",
            description: "The split name",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],

    callback: async (client, interaction) => {

        // get inputs
        const team = getInput(interaction, 'team-name');
        const split = getInput(interaction, 'split-name');

        /*
        1.Read json
        2. Remove result
        3. Save json
        4. Print embed
        */


        // 1.
        let jsonData;
        try {
            jsonData = await readJSON();
        }
        catch (err) {
            await interaction.editReply(err.message);
            return;
        }

        // 2.
        deleteResultFromJSON(jsonData, team, split);

        // 4.
        try {
            saveJSON(jsonData);
        }
        catch (err) {
            await interaction.editReply(err.message);
            return;
        }

        // 5.
        const embed = constructEmbed('delete-results', team, result);

        // send delayed discord reply
        await interaction.editReply({ embeds: [embed] });
    },
};
