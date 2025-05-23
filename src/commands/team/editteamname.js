const fs = require("fs").promises;

const { getInput } = require("@utils/getInput.js");
const { constructEmbed } = require("@utils/constructEmbed.js");
const { saveJSON } = require("@json/saveJSON.js");

//for embed stuff
const { Client, IntentsBitField, EmbedBuilder } = require("discord.js");

const {
  ApplicationCommandOptionType,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  name: "editteamname",
  description: "🔄 Rename a team!",
  testOnly: true,
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
    // delay discord reply to prevent timeout error
    await interaction.deferReply();

    // get inputs
    const currentTeamName = getInput(interaction, "current-team-name");
    const newTeamName = getInput(interaction, "new-team-name");

    /*
        1. Read JSON
        2. Make new team, copy all data and delete old team
        3. Save JSON
        4. Print embed
        */

    // 1.
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

    // 2.
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

        // add new team role
            const memberID = player['discordID'];
            const member = client.users.fetch(memberID);
            const newRole = member.guild.roles.cache.find(role => role.name == newTeamName.toUpperCase());
            member.roles.add(newRole);

            // delete old team role
            const oldRole = member.guild.roles.cache.find(role => role.name == currentTeamName.toUpperCase());
            member.roles.add(oldRole);
      }
    }
    // team not found error
    else {
      console.error(`❌ ${currentTeamName} nicht gefunden`);
      await interaction.editReply(`❌ ${currentTeamName} nicht gefunden`);
      return;
    }

    // 3.
    await saveJSON(jsonData);

    //4.
    const embed = constructEmbed("edit-team", {
      old: currentTeamName,
      new: newTeamName,
    });
    await interaction.editReply({ embeds: [embed] });
  },
};
