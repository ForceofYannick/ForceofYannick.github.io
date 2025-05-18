const fs = require("fs").promises;

const { getInput } = require('@utils/getInput');

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

        // delay discord reply to prevent timeout error
        await interaction.deferReply();

        return;


        
        // get inputs
        const teamName = getInput(interaction, 'team-name');
        const splitName = getInput(interaction, 'split-name');

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


        // if new split name doesnt exists, return
        if(!jsonData.Teams[teamName][splitName]){
            console.error(`❌ Split ${splitName} existiert nicht`);
            await interaction.editReply(`❌ Split ${splitName} existiert nicht`);
            return;
        }

        // create updated player array for reply msg
        let updatedPlayers = [];

        // if team exists in team section
        if (jsonData.Teams[currentTeamName]) {

            // get team data
            let teamData = jsonData.Teams[currentTeamName];

            // create new team section with new name and old team data
            jsonData.Teams[newTeamName] = teamData;

            // delete old team section
            delete jsonData.Teams[currentTeamName];



            // update all players in team
            for (const player in jsonData.Teams[newTeamName].Players) {
                jsonData.Teams[newTeamName].Players[player].team = newTeamName;
                updatedPlayers.push(player);
            }
        }
        // team not found error
        else {
            console.error(`❌ ${currentTeamName} nicht gefunden`);
            await interaction.editReply(`❌ ${currentTeamName} nicht gefunden`);
            return;
        }


        try {
            // Write the new data to the file
            await fs.writeFile("data.json", JSON.stringify(jsonData, null, 2));

            console.log("✅ Datei erfolgreich gespeichert!");

            // Create embed message
            const embed = new EmbedBuilder()
                .setColor(0xFFFF20)
                .setTitle(`🔄🏆 ${currentTeamName} -> ${newTeamName}`)
                .addFields(
                { name: 'Aktualisierte Spieler', value: `${updatedPlayers.join(", ")}` },
            );

            // send delayed discord reply
            await interaction.editReply({ embeds: [embed] });


        } catch (err) {
            console.error("❌ Fehler beim Speichern:", err);

            await interaction.editReply("❌ Fehler beim Speichern");
        }

    },
};
