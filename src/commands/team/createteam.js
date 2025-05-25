const fs = require("fs").promises;
const { getInput } = require('@utils/getInput.js');
const { constructEmbed } = require("@utils/constructEmbed.js");
const { createTeamObject } = require("@utils/createTeamObject.js");
const { saveJSON } = require("@json/saveJSON.js");
const { readJSON } = require("@json/readJSON.js");
const { Client, IntentsBitField, EmbedBuilder } = require('discord.js');
const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');
const { stringify } = require("querystring");

module.exports = {
  name: 'createteam',
  description: '➕ Create a new team!',
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

  callback: async (client, interaction) => {
    console.log("=> createteam");
    await interaction.deferReply();


    // Get input
    const teamName = getInput(interaction, 'team-name');
    const team = createTeamObject(interaction);


    // 1. Read JSON
    let jsonData;
    try {
      jsonData = await readJSON();
    }
    catch (err) {
      await interaction.editReply(err.message);
      return;
    }


    // Check team section if team already exists
    if (jsonData.Teams[teamName]) {
      console.log(`❌ Error on team creation for ${teamName}: Already exists`);
      await interaction.editReply(`❌ Creation error for ${teamName}: Already exists'`);
      return;
    }

    // Create empty team in team section
    jsonData.Teams[teamName] = {
      "Players": {},
      "Results": {}
    }

    let missingPlayers = [];
    let updatedPlayers = [];

    // For all provided players
    for (const option of interaction.options.data) {
      if (option.name !== 'team-name') {
        const playerName = option.value.toLowerCase();
        const teamName = getInput(interaction, 'team-name');
        let playerFound = false;

        const guild = interaction.guild;
        if (!guild) {
          await interaction.editReply("Fehler: Guild nicht gefunden.");
          return;
        }

        // Search in Teams
        for (const team in jsonData.Teams) {
          if (jsonData.Teams[team].Players[playerName]) {
            playerFound = true;

            const playerData = jsonData.Teams[team].Players[playerName];
            const memberID = playerData['discord-id'];

            // Move player
            jsonData.Teams[teamName].Players[playerName] = playerData;
            delete jsonData.Teams[team].Players[playerName];

            // Assign role
            try {
              const member = await guild.members.fetch(memberID);
              console.log(`🔍 Suche Rolle für Team "${teamName}": ${newRole ? "Gefunden" : "Nicht gefunden"}`);
              const newRole = guild.roles.cache.find(role => role.name.toLowerCase() === teamName.toLowerCase());
              const oldRole = guild.roles.cache.find(role => role.name.toLowerCase() === team.toLowerCase());

              if (oldRole) await member.roles.remove(oldRole);
              if (newRole) await member.roles.add(newRole);
            } catch (err) {
              console.log(`❌ Fehler beim Zuweisen der Rollen für ${playerName}: ${err.message}`);
            }

            // Update teamdata
            jsonData.Teams[teamName].Players[playerName].team = teamName;

            updatedPlayers.push(playerName);
            break;
          }
        }

        // If not in Teams go to Unsorted
        if (!playerFound && jsonData.Unsorted[playerName]) {
          const playerData = jsonData.Unsorted[playerName];
          const memberID = playerData['discord-id'];

          // Move player
          jsonData.Teams[teamName].Players[playerName] = playerData;
          delete jsonData.Unsorted[playerName];

          // Assign role
          try {
            const member = await guild.members.fetch(memberID);
            const newRole = guild.roles.cache.find(role => role.name.toLowerCase() === teamName.toLowerCase());
            if (newRole) await member.roles.add(newRole);
          } catch (err) {
            console.log(`❌ Fehler beim Zuweisen der Rolle aus Unsorted für ${playerName}: ${err.message}`);
          }

          // Update teamdata
          jsonData.Teams[teamName].Players[playerName].team = teamName;

          updatedPlayers.push(playerName);

          playerFound = true;
        }

        // Player not found in Unsorted or Teams
        if (!playerFound && !jsonData.Unsorted[playerName]) {
          missingPlayers.push(playerName);
        }
      }
    }

    // Save JSON
    try {
      saveJSON(jsonData);
    }
    catch (err) {
      await interaction.editReply(err.message);
      return;
    }

    // Print embed
    const embed = constructEmbed("create-team", { name: teamName, data: jsonData.Teams[teamName], updatedPlayers: updatedPlayers, ignoredPlayers: missingPlayers });
    await interaction.editReply({ embeds: [embed] });
  },
};