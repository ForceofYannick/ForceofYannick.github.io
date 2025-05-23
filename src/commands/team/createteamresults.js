//for json file stuff
const fs = require("fs").promises;

const { getInput } = require('@utils/getInput.js');
const { constructEmbed } = require("@utils/constructEmbed.js");
const { saveJSON } = require("@json/saveJSON.js");
const { readJSON } = require("@json/readJSON.js");

//for option type
const {
    ApplicationCommandOptionType,
} = require('discord.js');

//for embed stuff
const { Client, IntentsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'createteamresults',
    description: '➕ Create results for a team',
    testOnly: true,
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
            choices: [
                { name: "spring", value: "spring" },
                { name: "summer", value: "summer" },
                { name: "winter", value: "winter" },
            ],
            required: true,
        },
        {
            name: "split-year",
            description: "The split year",
            type: ApplicationCommandOptionType.Integer,
            required: true,
        },
        {
            name: "kaliphase-group",
            description: "The group for the calibration phase",
            type: ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: "kaliphase-result",
            description: "The result for the calibration phase",
            type: ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: "groupphase-group",
            description: "The group for the group phase",
            type: ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: "groupphase-result",
            description: "The result for the group phase",
            type: ApplicationCommandOptionType.String,
            required: false,
        }, {
            name: "playoff-group",
            description: "The group for the playoff phase",
            type: ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: "playoff-result",
            description: "The result for the playoff phase",
            type: ApplicationCommandOptionType.String,
            required: false,
        },


    ],

    callback: async (client, interaction) => {

        console.log("=> createteamresults");

        // delay discord reply to prevent timeout error
        await interaction.deferReply();

        // get inputs
        const teamName = getInput(interaction, 'team-name');
        const splitName = getInput(interaction, 'split-season')+"'"+getInput(interaction,'split-year');

        
        const caliphasegroup = getInput(interaction, 'kaliphase-group');
        const groupphasegroup = getInput(interaction, 'groupphase-group');
        const playoffgroup = getInput(interaction, 'playoff-group');

        // getInput durch was anderes ersetzen um groß/kleinschreibung im embed zu behalten
        const caliphaseresult = interaction.options.get('caliphase-result')?.value || '-';
        const groupphaseresult = interaction.options.get('groupphase-result')?.value || '-';
        const playoffresult = interaction.options.get('playoff-result')?.value || '-';


        // Read data json file
        let jsonData;
        try {
            jsonData = await readJSON();
        }
        catch (err) {
            await interaction.editReply(err.message);
            return;
        }

        // if team not existing
        if (!jsonData.Teams[teamName]) {
            console.error(`❌ Team ${teamName} nicht gefunden`);
            await interaction.editReply(`❌ Team ${teamName} nicht gefunden`);
            return;
        }

        const teamPath = jsonData.Teams[teamName];

        // if split name already existing
        if (teamPath.Results[splitName]) {
            console.error(`❌ Split ${splitName} existiert bereits in ${teamName}`);
            await interaction.editReply(`❌ Split ${splitName} existiert bereits in ${teamName}`);
            return;
        }


        // else create new split with provided inputs
        teamPath.Results[splitName] = {
            "kaliphase": {
                "group": caliphasegroup,
                "result": caliphaseresult
            },
            "groupphase": {
                "group": groupphasegroup,
                "result": groupphaseresult
            },
            "playoffs": {
                "group": playoffgroup,
                "result": playoffresult
            }
        }

        // Write the new data to the team file
        try {
            saveJSON(jsonData);
        }
        catch (err) {
            await interaction.editReply(err.message);
            return;
        }


        const embed = constructEmbed("create-result", { team: teamName, split: splitName, data: teamPath.Results[splitName] });
        await interaction.editReply({ embeds: [embed] });
    },
};
