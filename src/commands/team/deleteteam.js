//for json file stuff
const fs = require("fs").promises;

const { getInput } = require("@utils/getInput");
const { constructEmbed } = require("@utils/constructEmbed.js");
const { saveJSON } = require("@json/saveJSON.js");
const { readJSON } = require("@json/readJSON.js");

//for embed stuff
const { EmbedBuilder } = require("discord.js");

//for option type
const {
  ApplicationCommandOptionType,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  name: "deleteteam",
  description: "➖ Delete a team!",
  // devOnly: Boolean,
  testOnly: true,
  options: [
    {
      name: "team-name",
      description: "The team name",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  // deleted: Boolean,

  callback: async (client, interaction) => {
    // delay discord reply to prevent timeout error
    await interaction.deferReply();

    // get input
    const teamName = getInput(interaction, "team-name");

    /*
    1. Read JSON
    2. Copy Team players to unsorted
    3. Delete team
    4. Save JSON
    5. Print embed
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
    // team not found
    if (!jsonData.Teams[teamName]) {
      console.error(`❌ Team ${teamName} nicht gefunden`);
      await interaction.editReply(`❌ Team ${teamName} nicht gefunden`);
      return;
    }

    // 2.
    // used for embed
    let transferedPlayers = [];

    // transfer all players in team to 'Unsorted' section
    for (player in jsonData.Teams[teamName].Players) {
      console.log(`${player} player in ${teamName}`);
      // get the player data in team section
      let playerData = jsonData.Teams[teamName].Players[player];

      // remove the team name in the player data
      playerData.team = "-";

      // remove the team role
      const memberID = playerData["discordID"];
      const member = client.users.fetch(memberID);
      const role = member.guild.roles.cache.find(
        (role) => role.name == teamName.toUpperCase()
      );
      member.roles.rmove(role);

      // delete player data in team section
      delete jsonData.Teams[teamName].Players[player];

      // paste player date into unsorted section
      jsonData.Unsorted[player] = playerData;

      // add player to transferedPlayers array for reply info
      transferedPlayers.push(player);
    }

    // 3.
    delete jsonData.Teams[teamName];

    // 4.
    try {
      saveJSON(jsonData);
    } catch (err) {
      await interaction.editReply(err.message);
      return;
    }

    // 5.
    const embed = constructEmbed("delete-team", {
      name: teamName,
      affectedPlayers: transferedPlayers,
    });
    await interaction.editReply({ embeds: [embed] });
  },
};
