//for json file stuff
const fs = require("fs").promises;

const { getInput } = require('@utils/getInput.js');
const { constructEmbed } = require("@utils/constructEmbed.js");
const { createTeamObject } = require("@utils/createTeamObject.js");
const { saveJSON } = require("@json/saveJSON.js");
const { readJSON } = require("@json/readJSON.js");

//for embed stuff
const { Client, IntentsBitField, EmbedBuilder } = require('discord.js');

//for option type
const {
  ApplicationCommandOptionType,
  PermissionFlagsBits,
} = require('discord.js');
const { stringify } = require("querystring");

module.exports = {
  name: 'createteam',
  description: '➕ Create a new team!',
  // devOnly: Boolean,
  testOnly: true,
  options: [
    {
      name: "team-name",
      description: "The team name",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    ...Array.from({ length: 10 }, (_, i) => ({
      name: `player${i + 1}`,
      description: "A team player",
      type: ApplicationCommandOptionType.String,
      required: false,
    })),
  ],
  // deleted: Boolean,

  callback: async (client, interaction) => {

    // delay discord reply to prevent timeout error
    await interaction.deferReply();


    // get input
    const teamName = getInput(interaction, 'team-name');
    const team = createTeamObject(interaction);


    // Read data json file
    let jsonData;
    try {
      jsonData = await readJSON();
    }
    catch (err) {
      await interaction.editReply(err.message);
      return;
    }


    // check team section if team already exists
    if (jsonData.Teams[teamName]) {
      console.log(`❌ Error on team creation for ${teamName}: Already exists`);
      await interaction.editReply(`❌ Creation error for ${teamName}: Already exists'`);
      return;
    }

    // create empty team in team section
    jsonData.Teams[teamName] = {
      "Players": {},
      "Results": {}
    }

    let missingPlayers = [];
    let updatedPlayers = [];
    let playerData;


    // for all provided players
    for (const option of interaction.options.data) {
      // ignore team-name since its always provided
      if (option.name !== 'team-name') {

        const playerName = option.value.toLowerCase();
        const teamName = getInput(interaction, 'team-name');
        let playerFound = false;

        // go through all teams
        for (const team in jsonData.Teams) {

          // if player is in team
          if (jsonData.Teams[team].Players[playerName]) {

            playerFound = true;

            playerData = jsonData.Teams[team].Players[playerName];
            // create player in new team
            jsonData.Teams[teamName].Players[playerName] = playerData;

            // add new team role
            const memberID = jsonData.Teams[team].Players[playerName]['discordID'];
            const member = client.users.fetch(memberID);
            const newRole = member.guild.roles.cache.find(role => role.name == teamName.toUpperCase());
            member.roles.add(newRole);

            // delete player in old team
            delete jsonData.Teams[team].Players[playerName];

            // remove old team role
            const oldRole = member.guild.roles.cache.find(role => role.name == team.toUpperCase());
            member.roles.remove(oldRole);

            // update player data
            playerData = jsonData.Teams[teamName].Players[playerName];

            // update team data in player
            // Überprüfe, ob der Spieler existiert, bevor du versuchst, die Eigenschaft zu setzen
            if (jsonData.Teams[teamName].Players[playerName]) {
              jsonData.Teams[teamName].Players[playerName].team = teamName;
            } else {
              console.log(`❌ Spieler ${playerName} existiert nicht und wird ignoriert.`);
            }

            // add player to array for reply embed
            updatedPlayers.push(playerName);
            break;
          }
        }

        // if player not found in teams search unsorted
        if (!playerFound) {

          // if player in unsorted
          if (jsonData.Unsorted[playerName]) {

            playerData = jsonData.Unsorted[playerName];

            // create player in new team
            jsonData.Teams[teamName].Players[playerName] = playerData;

            // add new team role
            const memberID = jsonData.Unsorted[playerName]['discordID'];
            const member = client.users.fetch(memberID);
            const newRole = member.guild.roles.cache.find(role => role.name == teamName.toUpperCase());
            member.roles.add(newRole);

            // delete player in unsorted
            delete jsonData.Unsorted[playerName];

            // update player data
            playerData = jsonData.Teams[teamName].Players[playerName];

            // update team data in player
            // Überprüfe, ob der Spieler existiert, bevor du versuchst, die Eigenschaft zu setzen
            if (jsonData.Teams[teamName].Players[playerName]) {
              jsonData.Teams[teamName].Players[playerName].team = teamName;
            } else {
              console.log(`❌ Spieler ${playerName} existiert nicht und wird ignoriert.`);
            }

            // add player to array for reply embed
            updatedPlayers.push(playerName);

          }
          // player not found, ignore player input, flag player for warning
          else {
            // add player to array for reply embed
            missingPlayers.push(playerName);
          }
        }
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


    const embed = constructEmbed("create-team", {name:teamName, data:jsonData.Teams[teamName], updatedPlayers: updatedPlayers, ignoredPlayers: missingPLayers});
    await interaction.editReply({ embeds: [embed] });
  },
};