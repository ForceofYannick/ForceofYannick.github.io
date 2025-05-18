const fs = require("fs").promises;

const { Client, ApplicationCommandOptionType } = require('discord.js');

const { getInput } = require('@utils/getInput.js');
const { constructPlayerEmbed } = require("@utils/constructPlayerEmbed.js");
const { createPlayerObject } = require("@utils/createPlayerObject.js");
const { getPlayerFromJSON } = require("@json/getPlayerFromJSON.js");
const { comparePlayersAndMakeNew } = require("@utils/comparePlayersAndMakeNew.js");
const { deletePlayerFromJSON } = require("@json/deletePlayerFromJSON.js");
const { createPlayerInJSON } = require("@json/createPlayerInJSON.js");
const { saveJSON } = require("@json/saveJSON.js");
const { readJSON } = require("@json/readJSON.js");

 
function checkAnyInputExists(interaction) {
    for (const option of interaction.options.data) {

        // ignore playerName since its always provided
        if (option.name !== 'player-name') {
            return true;
        }
    }
    // no option exists
    return false;
}

module.exports = {
    name: 'editplayer',
    description: '🔄 Edit a player!',
    testOnly: true,
    options: [
        {
            name: "player-name",
            description: "The player name",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: "new-player-name",
            description: "The new player name",
            type: ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: "discord-id",
            description: "The player's discord id (to ping them)",
            type: ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: "main-role",
            description: "The player role in LoL",
            type: ApplicationCommandOptionType.String,
            choices: [
                { name: "top", value: "top" },
                { name: "mid", value: "mid" },
                { name: "sup", value: "sup" },
                { name: "jgl", value: "jgl" },
                { name: "adc", value: "adc" },
            ],
            required: false,
        },
        {
            name: "orga-role-1",
            description: "The player role in IBTC eSports",
            type: ApplicationCommandOptionType.String,
            choices: [
                { name: "team-leader", value: "team-leader" },
                { name: "captain", value: "captain" },
                { name: "coach", value: "coach" },
            ],
            required: false,
        },
        {
            name: "orga-role-2",
            description: "The player role in IBTC eSports",
            type: ApplicationCommandOptionType.String,
            choices: [
                { name: "team-leader", value: "team-leader" },
                { name: "captain", value: "captain" },
                { name: "coach", value: "coach" },
            ],
            required: false,
        },
        {
            name: "instagram",
            description: "The player's Instagram url",
            type: ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: "tiktok",
            description: "The player's TikTok url",
            type: ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: "twitter",
            description: "The player's Twitter url",
            type: ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: "twitch",
            description: "The player's Twitch url",
            type: ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: "youtube",
            description: "The player's YouTube url",
            type: ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: "team",
            description: "The player's team",
            type: ApplicationCommandOptionType.String,
            required: false,
        },
    ],

    callback: async (client, interaction) => {
        console.log('~ editplayer');
        
        // delay discord reply to prevent timeout error
        await interaction.deferReply();


        // if no options are provided
        if (!checkAnyInputExists(interaction)) {
            console.error(`❌ Keine Option angegeben!`);
            await interaction.editReply(`❌ Keine Option angegeben!`);
            return;
        }
        

        // 0.
        let jsonData;
        try {
          jsonData = await readJSON();
        }
        catch (err) {
          await interaction.editReply(err.message);
          return;
        }


        // Concept:

        // if new name
        // if new team
        // if new team = no team
        // ... 1
        // else
        // ... 2
        // else
        // ... 3
        // else if new team
        // if new team = no team
        // ... 4
        // else
        // ... 5
        // else
        // ... 6
        // 7. save
        // 8. print

        // New Concept:
        /*
       0. read json
       1. make new player object from inputs -> createPlayerObject function
       2. get old player object from json      -> getPlayerFromJSON function
       3. compare both objects and make new modify player object with updated data -> make updatedPlayerObject function
       4. delete old player in json -> deletePlayerFromJSON function
       5. add modify player to json -> createPlayerInJSON function
       6. save json    
       7. print embed -> constructPlayerEmbed function
 
        */

       

        // 1. make inputPlayer object
        let inputPlayer = createPlayerObject(interaction);
        const playerName = getInput(interaction,'player-name');
        // modify object with new name if provided
        if(getInput(interaction, 'new-player-name') !== '-'){
            inputPlayer['player-name'] = getInput(interaction, 'new-player-name');
        }

        // 2. get oldPlayer data from JSON

        let oldPlayer = await getPlayerFromJSON(playerName);
        if(oldPlayer == null){
            console.error(`❌ Spieler ${playerName} nicht gefunden`);
            await interaction.editReply(`❌ Spieler ${playerName} nicht gefunden`);
            return;
        }

        // 3. make newPlayer by comparing oldPlayer with inputPlayer
        let newPlayer = comparePlayersAndMakeNew(oldPlayer, inputPlayer);

        // 4. delete oldPlayer from JSON
        deletePlayerFromJSON(jsonData,oldPlayer);
        
        // 5. save newPlayer to JSON
        createPlayerInJSON(jsonData,newPlayer);

        // 6. save JSON
        await saveJSON(jsonData);

        // 7. create embed
        const embed = constructPlayerEmbed('edit',newPlayer);
        await interaction.editReply({ embeds: [embed] });
    },
};