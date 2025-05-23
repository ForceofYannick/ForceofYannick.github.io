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

    console.log("=> createteam");

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

    // for all provided players
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

    // Suche in Teams
    for (const team in jsonData.Teams) {
      if (jsonData.Teams[team].Players[playerName]) {
        playerFound = true;

        const playerData = jsonData.Teams[team].Players[playerName];
        const memberID = playerData['discord-id'];

        // Spieler verschieben
        jsonData.Teams[teamName].Players[playerName] = playerData;
        delete jsonData.Teams[team].Players[playerName];

        // Rollenzuweisung
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

        // Teamdaten aktualisieren
        jsonData.Teams[teamName].Players[playerName].team = teamName;

        updatedPlayers.push(playerName);
        break;
      }
    }

    // Falls nicht in Teams, dann in Unsorted suchen
    if (!playerFound && jsonData.Unsorted[playerName]) {
      const playerData = jsonData.Unsorted[playerName];
      const memberID = playerData['discord-id'];

      // Spieler verschieben
      jsonData.Teams[teamName].Players[playerName] = playerData;
      delete jsonData.Unsorted[playerName];

      // Rollenzuweisung
      try {
        const member = await guild.members.fetch(memberID);
        const newRole = guild.roles.cache.find(role => role.name.toLowerCase() === teamName.toLowerCase());
        if (newRole) await member.roles.add(newRole);
      } catch (err) {
        console.log(`❌ Fehler beim Zuweisen der Rolle aus Unsorted für ${playerName}: ${err.message}`);
      }

      // Teamdaten aktualisieren
      jsonData.Teams[teamName].Players[playerName].team = teamName;

      updatedPlayers.push(playerName);

      playerFound = true;
    }

    // Spieler nicht gefunden
    if (!playerFound && !jsonData.Unsorted[playerName]) {
      missingPlayers.push(playerName);
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


    const embed = constructEmbed("create-team", {name:teamName, data:jsonData.Teams[teamName], updatedPlayers: updatedPlayers, ignoredPlayers: missingPlayers});
    await interaction.editReply({ embeds: [embed] });
  },
};