const fs = require("fs").promises;
const { getInput } = require("@utils/getInput");
const { constructEmbed } = require("@utils/constructEmbed.js");
const { saveJSON } = require("@json/saveJSON.js");
const { readJSON } = require("@json/readJSON.js");
const { EmbedBuilder } = require("discord.js");
const { ApplicationCommandOptionType, PermissionFlagsBits } = require("discord.js");

module.exports = {
  name: "deleteteam",
  description: "➖ Delete a team!",
  options: [
    {
      name: "team-name",
      description: "The team name",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  callback: async (client, interaction) => {
    console.log("=> deleteteam");
    await interaction.deferReply();

    // Get input
    const teamName = getInput(interaction, "team-name");

    /*
    1. Read JSON
    2. Copy Team players to unsorted
    3. Delete team
    4. Save JSON
    5. Print embed
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
    // team not found
    if (!jsonData.Teams[teamName]) {
      console.error(`❌ Team ${teamName} nicht gefunden`);
      await interaction.editReply(`❌ Team ${teamName} nicht gefunden`);
      return;
    }

    // 2. Copy Team players to unsorted
    // used for embed
    let transferedPlayers = [];

    // transfer all players in team to 'Unsorted' section
    const guild = interaction.guild;
    if (!guild) {
      await interaction.editReply("Fehler: Guild nicht gefunden.");
      return;
    }

    for (const player in jsonData.Teams[teamName].Players) {
      console.log(`${player} player in ${teamName}`);

      // Get playerdata
      const playerData = jsonData.Teams[teamName].Players[player];

      // Remove team name
      playerData.team = "-";

      // Get discord ID
      const memberID = playerData["discord-id"];

      try {
        const member = await guild.members.fetch(memberID);
        const role = guild.roles.cache.find(role => role.name === teamName.toUpperCase());

        if (role) {
          await member.roles.remove(role);
        } else {
          console.log(`⚠️ Rolle "${teamName.toUpperCase()}" nicht gefunden.`);
        }
      } catch (err) {
        console.log(`❌ Fehler beim Entfernen der Rolle von ${player}: ${err.message}`);
      }

      // Remove player from team
      delete jsonData.Teams[teamName].Players[player];

      // Add player to Unsorted
      jsonData.Unsorted[player] = playerData;

      // Add player to reply list
      transferedPlayers.push(player);
    }


    // 3. Delete team
    delete jsonData.Teams[teamName];

    // 4. Save JSON
    try {
      saveJSON(jsonData);
    } catch (err) {
      await interaction.editReply(err.message);
      return;
    }

    // 5. Print embed
    const embed = constructEmbed("delete-team", { name: teamName, affectedPlayers: transferedPlayers });
    await interaction.editReply({ embeds: [embed] });
  },
};
