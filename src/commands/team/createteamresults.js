//for json file stuff
const fs = require("fs").promises;

const { getInput } = require('@utils/getInput');
const { constructEmbed } = require("@utils/constructEmbed.js");

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
            name: "split-name",
            description: "The split name",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: "kaliphase-group",
            description: "The group for the calibration phase",
            type: ApplicationCommandOptionType.Number,
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
            type: ApplicationCommandOptionType.Number,
            required: false,
        },
        {
            name: "groupphase-result",
            description: "The result for the group phase",
            type: ApplicationCommandOptionType.String,
            required: false,
        },        {
            name: "playoff-group",
            description: "The group for the playoff phase",
            type: ApplicationCommandOptionType.Number,
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

        // delay discord reply to prevent timeout error
        await interaction.deferReply();

        // get inputs
        const teamName = getInput(interaction, 'team-name');
        const splitName = getInput(interaction, 'split-name');

        const caliphasegroup = getInput(interaction, 'kaliphase-group');
        const groupphasegroup = getInput(interaction, 'groupphase-group');
        const playoffgroup = getInput(interaction, 'playoff-group');

        const caliphaseresult = getInput(interaction, 'kaliphase-result');
        const groupphaseresult = getInput(interaction, 'groupphase-result');
        const playoffresult = getInput(interaction, 'playoff-result');
        

        

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


        // Catch confilcting inputs in file

        // if team not existing
        if (!jsonData.Teams[teamName]) {
            console.error(`❌ Team ${teamName} nicht gefunden`);
            await interaction.editReply(`❌ Team ${teamName} nicht gefunden`);
            return;
        }

        const teamPath = jsonData.Teams[teamName];
        
        // if split name already existing
        if(teamPath.Results[splitName]){
            console.error(`❌ Split ${splitName} existiert bereits in ${teamName}`);
            await interaction.editReply(`❌ Split ${splitName} existiert bereits in ${teamName}`);
            return;
        }


        // else create new split with provided inputs
        teamPath.Results[splitName] = {
            "kaliphase":{
                "group": caliphasegroup,
                "result": caliphaseresult
            },
            "groupphase":{
                "group": groupphasegroup,
                "result": groupphaseresult
            },
            "playoffs":{
                "group": playoffgroup,
                "result": playoffresult
            }
        }

 // Write the new data to the file
 fs.writeFile("data.json", JSON.stringify(jsonData, null, 2), (err) => {
    if (err) {
        console.error("❌ Fehler beim Speichern:", err);
    } else {
        console.log("✅ Datei erfolgreich gespeichert!");
    }
});

        // construct embed
        const embed = new EmbedBuilder()
        .setColor(0x2090FF)
        .setTitle(`${teamName}`)
        .addFields(
            { name: splitName, value: '\u200B', inline: false },
            { name: 'Kaliphase', value: `Gruppe ${caliphasegroup} (${caliphaseresult})` },
            { name: 'Gruppenphase', value: `Gruppe ${groupphasegroup} (${groupphaseresult})` },
            { name: 'Playoffs', value: `Gruppe ${playoffgroup} (${playoffresult})` },
        );

        // send relpy
        //await interaction.editReply("test");
        await interaction.editReply({ embeds: [embed] });
    },
};
