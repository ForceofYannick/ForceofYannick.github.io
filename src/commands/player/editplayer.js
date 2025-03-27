const fs = require("fs").promises;

//for embed stuff
const { Client, IntentsBitField, EmbedBuilder } = require('discord.js');

const {
    ApplicationCommandOptionType,
} = require('discord.js');

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
            choices:[
              {name: "top", value: "top"},
              {name: "mid", value: "mid"},
              {name: "sup", value: "sup"},
              {name: "jgl", value: "jgl"},
              {name: "adc", value: "adc"},
            ],
            required: false,
          },
          {
          name: "orga-role-1",
          description: "The player role in IBTC eSports",
          type: ApplicationCommandOptionType.String,
          choices:[
            {name: "team-leader", value: "team-leader"},
            {name: "captain", value: "captain"},
            {name: "coach", value: "coach"},
          ],
          required: false,
          },
          {
            name: "orga-role-2",
            description: "The player role in IBTC eSports",
            type: ApplicationCommandOptionType.String,
            choices:[
              {name: "team-leader", value: "team-leader"},
              {name: "captain", value: "captain"},
              {name: "coach", value: "coach"},
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
                // delay discord reply to prevent timeout error
                await interaction.deferReply();

        async function missingPlayerError(playerName){
            console.error(`❌ Spieler ${playerName} nicht gefunden!`);
            await interaction.editReply(`❌ Spieler ${playerName} nicht gefunden!`);
        }

        async function missingTeamError(teamName){
            console.error(`❌ Team ${teamName} nicht gefunden!`);
            await interaction.editReply(`❌ Team ${teamName} nicht gefunden!`);
        }

        async function missionOptionsError(){
            console.error(`❌ Keine Option angegeben!`);
            await interaction.editReply(`❌ Keine Option angegeben!`);
        }

        function checkAnyInputExists(){
            for(const option of interaction.options.data){
                // ignore player-name since its always provided
               if(option.name !== 'player-name'){
                return true;
               }
            }
            // no option exists
            return false;
        }

        /**
         * Delete a team from a specific team
         * @param {*} playerName 
         * @param {*} teamName 
         */
        function deleteTeamPlayer(playerName, teamName) {
            // Team existiert nicht
            if (!jsonData.Teams[teamName]) {
                throw new Error(`❌ Team ${teamName} nicht gefunden!`);
            }
        
            // Spieler existiert nicht im Team
            if (!jsonData.Teams[teamName].Players[playerName]) {
                throw new Error(`❌ Spieler ${playerName} nicht im Team ${teamName} gefunden!`);
            }
        
            delete jsonData.Teams[teamName].Players[playerName];
            console.log(`✅ ${playerName} wurde aus dem Team ${teamName} entfernt.`);
        }

         /**
          * Remove an unsorted player
          * @param {*} playerName 
          */
         function deleteUnsortedPlayer(playerName) {
            // Spieler existiert nicht in `Unsorted`
            if (!jsonData.Unsorted[playerName]) {
                throw new Error(`❌ Spieler ${playerName} nicht in 'Unsorted' gefunden!`);
            }
        
            delete jsonData.Unsorted[playerName];
            console.log(`✅ ${playerName} wurde aus 'Unsorted' entfernt.`);
        }

         /**
          * 
          * @returns The player name in lower case
          */
         function getPlayerName(){
            console.log(`Get player name: ${interaction.options.get('player-name').value.toLowerCase()}`);
            return interaction.options.get('player-name').value.toLowerCase();
         }

         /**
          * Returns the team data stored in the player
          * @param {*} playerName 
          * @returns 
          */
         function getPlayerTeam(playerName){
            console.log(`Get ${playerName} team: ${findPlayer(playerName).team}`);
            return findPlayer(playerName).team;
         }
         
         /**
          * Returns the value of an optional input
          * @param {*} optionName 
          * @returns 
          */
         function getInputValue(optionName){
            if(interaction.options.get(optionName)){
                console.log(`Get input value for ${optionName}: ${interaction.options.get(optionName).value.toLowerCase()}`);
            return interaction.options.get(optionName).value.toLowerCase();
        }
        console.log(`Get input value for ${optionName}: not found -> null`);
            return null;
         }

         /**
          * Check if an input exists
          * @param {*} optionName 
          * @returns true / null
          */
         function input(optionName){
            
                // if option exists
               if(interaction.options.get(optionName)){
                console.log(`Input ${optionName}: true`);
                return true;
               }
            
            // option doesn't exist
            console.log(`Input ${optionName}: false`);
            return false;
         }
         
         /**
          * Returns the player object for the provided player name
          * @param {*} playerName 
          * @returns 
          */
         function findPlayer(playerName){
            // search in Teams section
            for(const team in jsonData.Teams){
                
                // if player in team
                if(jsonData.Teams[team].Players[playerName.toLowerCase()]){

                    // return player object
                    return jsonData.Teams[team].Players[playerName.toLowerCase()];
                }
            }

            // if player in unsorted section
            if(jsonData.Unsorted[playerName.toLowerCase()]){

                // return player object
                return jsonData.Unsorted[playerName.toLowerCase()];
            }

            missingPlayerError(playerName);
            return null;
         }

         /**
          *  Create a new player in Unsorted with provided name and data. The team value automatically changes to '-'
          * @param {*} playerName 
          * @param {*} playerData 
          */
         function createUnsortedPlayer(playerName, playerData){
            jsonData.Unsorted[playerName] = playerData; 
            jsonData.Unsorted[playerName].team = '-'; 
            console.log(`Created ${playerName} in unsorted`);
         }

         /**
          * Create a new player in a specific team with provided data. The team value automatically changes to the provided team name
          * @param {*} playerName 
          * @param {*} playerData 
          * @param {*} team 
          */
         function createTeamPlayer(playerName, playerData, team) {
            // Team existiert nicht
            if (!jsonData.Teams[team]) {
                throw new Error(`❌ Team ${team} nicht gefunden!`);
            }

            // player already in that team
            if (jsonData.Teams[team].Players[playerName]) {
                throw new Error(`❌ Spieler ${playerName} bereits in ${team}!`);
            }
        
            jsonData.Teams[team].Players[playerName] = playerData;
            jsonData.Teams[team].Players[playerName].team = team;
            console.log(`Created ${playerName} in ${team}`);
        }

         /**
          * Get the updated player data after modifying or moving the player section
          * @param {*} playerName 
          */
         function updatePlayerData(playerName){
            playerData = findPlayer(playerName);
            console.log(`Updated ${playerName} data`);
         }
         
         /**
          * Update the data of the player with the provided inputs
          * @param {*} playerName 
          * @param {*} playerData 
          */
         function updatePlayerDetails(playerName, playerData){
            console.log(`Update ${playerName} detail beginns`);
            for (const playerDetail in playerData) {
                if (input(playerDetail)) {

                    // Unsorted Player
                    if(getPlayerTeam(playerName) == '-'){
                        jsonData.Unsorted[playerName][playerDetail] = getInputValue(playerDetail);
                        console.log(`Updated unsorted player detail`);
                    }
                    // Team Player
                    else{
                        jsonData.Teams[getPlayerTeam(playerName)].Players[playerName][playerDetail] =  getInputValue(playerDetail);
                        console.log(`Updated team player detail`);
                    }   
                }
            }
            console.log(`Completed ${playerName} detail update`);
         }

        
        // ====================================

        // if no options are provided
        if(!checkAnyInputExists()){
            missionOptionsError();
            return;
        }

        

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

        let playerName = getPlayerName();
        let playerTeam = getPlayerTeam(playerName);
        let playerData = findPlayer(playerName);

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

        if(input('new-player-name')){
            const newPlayerName = getInputValue('new-player-name');
            
            console.log(`New player name provided: ${newPlayerName}`);

            if(input('team')){
                const newPlayerTeam = getInputValue('team');
                console.log(`And new player team provided: ${newPlayerTeam}`);

                if(newPlayerTeam == 'no team'){
                    console.log(`1 Save player with new name in unsorted and remove from team`);
                    // ... 1                    
                    createUnsortedPlayer(newPlayerName,playerData);
                    
                    try {
                        deleteTeamPlayer(playerName, playerTeam);
                    } catch (error) {
                        console.error(error.message);
                        await interaction.editReply(error.message);
                        return;
                    }

                    updatePlayerData(newPlayerName);

                    playerName = newPlayerName;
                    playerTeam = newPlayerTeam;

                }
                else{
                    console.log(`2 Move player with new name to new team`);
                    // ... 2
                    try {
                        createTeamPlayer(newPlayerName, playerData, newPlayerTeam);
                    } catch (error) {
                        console.error(error.message);
                        await interaction.editReply(error.message);
                        return;
                    }

                    // unsorted player
                    if(playerTeam == '-'){
                        try {
                            deleteUnsortedPlayer(playerName);
                        } catch (error) {
                            console.error(error.message);
                            await interaction.editReply(error.message);
                            return;
                        }
                    }
                    // team player
                    else{
                        try {
                            deleteTeamPlayer(playerName, playerTeam);
                        } catch (error) {
                            console.error(error.message);
                            await interaction.editReply(error.message);
                            return;
                        }
                    }
                    
                    updatePlayerData(newPlayerName);

                    playerName = newPlayerName;
                    playerTeam = newPlayerTeam;
                }
            }
            else{
                console.log(`3 Change player name`);
                // ... 3

                // Unsorted players
                if(getPlayerTeam(playerName) == '-'){
                    
                    createUnsortedPlayer(newPlayerName, playerData);

                    try {
                        deleteUnsortedPlayer(playerName);
                    } catch (error) {
                        console.error(error.message);
                        await interaction.editReply(error.message);
                        return;
                    }
    
                    updatePlayerData(newPlayerName);

                    playerName = newPlayerName;
                }
                // Team players
                else{
                    try {
                        createTeamPlayer(newPlayerName, playerData, getPlayerTeam());
                    } catch (error) {
                        console.error(error.message);
                        await interaction.editReply(error.message);
                        return;
                    }

                    try {
                        deleteTeamPlayer(playerName, playerTeam);
                    } catch (error) {
                        console.error(error.message);
                        await interaction.editReply(error.message);
                        return;
                    }

                    updatePlayerData(newPlayerName);

                    playerName = newPlayerName;
                }
            }
        }
        else if(input('team')){
            const newPlayerTeam = getInputValue('team');

            if(newPlayerTeam == 'no team'){
                console.log(`4 Remove player from team and save in unsorted with same name`);
                // ... 4
                createUnsortedPlayer(playerName,playerData);

                try {
                    deleteTeamPlayer(playerName, playerTeam);
                } catch (error) {
                    console.error(error.message);
                    await interaction.editReply(error.message);
                    return;
                }

                updatePlayerData(playerName);

                playerTeam = newPlayerTeam;
            }
            else{
                console.log(`5 Move player to new team with same name`);
                // ... 5

                // Unsorted Player
                if(getPlayerTeam(playerName) == '-'){
                    console.log(`Unsorted player`);

                    try {
                        createTeamPlayer(playerName, playerData, newPlayerTeam);
                    } catch (error) {
                        console.error(error.message);
                        await interaction.editReply(error.message);
                        return;
                    }

                    try {
                        deleteUnsortedPlayer(playerName);
                    } catch (error) {
                        console.error(error.message);
                        await interaction.editReply(error.message);
                        return;
                    }

                    updatePlayerData(playerName);

                    playerTeam = newPlayerTeam;
                }
                // Team Player
                else{
                    console.log(`Team player`);
                    try {
                        createTeamPlayer(playerName, playerData, newPlayerTeam);
                    } catch (error) {
                        console.error(error.message);
                        await interaction.editReply(error.message);
                        return;
                    }

                    try {
                        deleteTeamPlayer(playerName, playerTeam);
                    } catch (error) {
                        console.error(error.message);
                        await interaction.editReply(error.message);
                        return;
                    }

                    updatePlayerData(playerName);
                    
                    playerTeam = newPlayerTeam;
                }
            }
        }
        else{
            console.log(`6 Go through all sections in a player and if input is provided update it`);
            // ... 6
            updatePlayerDetails(playerName, playerData);

            updatePlayerData(playerName);
        }

        // get player data
         playerData = findPlayer(playerName);
        let discordID, team, mainRole, orgaRole1, orgaRole2, instagram, tiktok, twitter, twitch, youtube;

        if (!playerData) {
            console.error(`❌ Spieler ${playerName} nicht gefunden!`);
            await interaction.editReply(`❌ Spieler ${playerName} nicht gefunden!`);
            return;
        } else {
            discordID = playerData['discord-id'];
            team = playerData['team'];
            mainRole = playerData['main-role'];
            orgaRole1 = playerData['orga-role-1'];
            orgaRole2 = playerData['orga-role-2'];
            instagram = playerData['instagram'];
            tiktok = playerData['tiktok'];
            twitter = playerData['twitter'];
            twitch = playerData['twitch'];
            youtube = playerData['youtube'];
        }

        try {
            // Write the new data to the file
            await fs.writeFile("data.json", JSON.stringify(jsonData, null, 2));

            console.log("✅ Datei erfolgreich gespeichert!");

           // filter roles to prevent bullet point creation in embed
            const roles =[mainRole, orgaRole1, orgaRole2].filter(role => role !== "-");

            // Create embed message
            const embed = new EmbedBuilder()
                .setColor(0xFFFF00)
                .setTitle(`🔄 ${playerName}`)
                .addFields(
                    { name: 'Discord Name', value: discordID === '-' ? discordID : `<@${discordID}>` },
                    { name: 'Team', value: team },
                    { name: 'Roles', value: roles.length > 0 ? roles.join(" / ") : "-" },
                    { name: 'Instagram', value: instagram === '-' ? instagram : `[Instagram](${instagram})`, inline: true },
                    { name: 'TikTok', value: tiktok === '-' ? tiktok : `[TikTok](${tiktok})`, inline: true },
                    { name: 'Twitter', value: twitter === '-' ? twitter : `[Twitter](${twitter})`, inline: true },
                    { name: 'Twitch', value: twitch === '-' ? twitch : `[Twitch](${twitch})`, inline: true },
                    { name: 'YouTube', value: youtube === '-' ? youtube : `[YouTube](${youtube})`, inline: true }
                );

            // send delayed discord reply
            //interaction.channel.send("test");
            await interaction.editReply({ embeds: [embed] });
            
        } catch (err) {
            console.error("❌ Fehler beim Speichern:", err);

            await interaction.editReply("❌ Fehler beim Speichern");
        }
    },
};
