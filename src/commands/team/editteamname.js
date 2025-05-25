const fs = require("fs").promises;
const { getInput } = require("@utils/getInput.js");
const { constructEmbed } = require("@utils/constructEmbed.js");
const { saveJSON } = require("@json/saveJSON.js");
const { readJSON } = require("@json/readJSON.js");
const { Client, IntentsBitField, EmbedBuilder } = require("discord.js");
const { ApplicationCommandOptionType, PermissionFlagsBits } = require("discord.js");

module.exports = {
  name: "editteamname",
  description: "🔄 Rename a team!",
  options: [
    {
      name: "current-team-name",
      description: "The current team name",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "new-team-name",
      description: "The new team name",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  callback: async (client, interaction) => {
    console.log("=> editteamname");
    await interaction.deferReply();

    // Get inputs
    const currentTeamName = getInput(interaction, "current-team-name");
    const newTeamName = getInput(interaction, "new-team-name");

    /*
        1. Read JSON
        2. Make new team, copy all data and delete old team
        3. Save JSON
        4. Print embed
        */

    // 1. Read JSON
    let jsonData;
    try {
      jsonData = await readJSON();
    } catch (err) {
      await interaction.editReply(err.message);
      return;
    }

    // 1.5 existence check
    // if new team name already exists, return
    if (jsonData.Teams[newTeamName]) {
      console.error(`❌ Teamname ${newTeamName} existiert bereits`);
      await interaction.editReply(
        `❌ Teamname ${newTeamName} existiert bereits`
      );
      return;
    }

    // 2. Make new team, copy all data and delete old team
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

      const guild = interaction.guild;
      if (!guild) {
        await interaction.editReply("Fehler: Guild nicht gefunden.");
        return;
      }

      // update all players in new team
      for (const playerName in jsonData.Teams[newTeamName].Players) {
        const playerData = jsonData.Teams[newTeamName].Players[playerName];

        // Update team name
        playerData.team = newTeamName;
        updatedPlayers.push(playerName);

        const memberID = playerData['discord-id'];

        try {
          const member = await guild.members.fetch(memberID);

          // Add new role
          const newRole = guild.roles.cache.find(role => role.name === newTeamName.toUpperCase());
          if (newRole) {
            await member.roles.add(newRole);
          } else {
            console.log(`⚠️ Neue Rolle ${newTeamName.toUpperCase()} nicht gefunden.`);
          }

          // Remove old role
          const oldRole = guild.roles.cache.find(role => role.name === currentTeamName.toUpperCase());
          if (oldRole) {
            await member.roles.remove(oldRole);
          } else {
            console.log(`⚠️ Alte Rolle ${currentTeamName.toUpperCase()} nicht gefunden.`);
          }

        } catch (err) {
          console.log(`❌ Fehler beim Aktualisieren der Rollen für ${playerName}: ${err.message}`);
        }
      }

    }
    // team not found error
    else {
      console.error(`❌ ${currentTeamName} nicht gefunden`);
      await interaction.editReply(`❌ ${currentTeamName} nicht gefunden`);
      return;
    }

    // 3. Save JSON
    await saveJSON(jsonData);

    //4. Print embed
    const embed = constructEmbed("edit-team", {
      old: currentTeamName,
      new: newTeamName,
    });
    await interaction.editReply({ embeds: [embed] });
  },
};
