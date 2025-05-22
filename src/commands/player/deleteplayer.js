const fs = require("fs").promises;

const { getPlayerFromJSON } = require('@json/getPlayerFromJSON.js');
const { deletePlayerFromJSON } = require("@json/deletePlayerFromJSON.js");
const { constructEmbed } = require("@utils/constructEmbed.js");
const { saveJSON } = require("@json/saveJSON.js");
const { readJSON } = require("@json/readJSON.js");
const { getInput } = require("@utils/getInput");

const { Client, ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');



module.exports = {
  name: 'deleteplayer',
  description: '➖ Delete a player!',
  // devOnly: Boolean,
  testOnly: true,
  options: [
    {
      name: "player-name",
      description: "The player name",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  // deleted: Boolean,

  callback: async (client, interaction) => {
    console.log('~ deleteplayer');

    // delay discord reply to prevent timeout error
    await interaction.deferReply();

    /*
    1. Read JSON
    2. Delete player
    3. Save JSON
    4. Print embed
    */

    // 1.
    let jsonData;
    try {
      jsonData = await readJSON();
    }
    catch (err) {
      await interaction.editReply(err.message);
      return;
    }

    // 2.
    let player = await getPlayerFromJSON(getInput(interaction,'player-name'));
    if(player !== null){

    try {
      deletePlayerFromJSON(jsonData, player);
    }
    catch (err) {
      await interaction.editReply(err.message);
      return;
    }

    // 3.
    try {
      saveJSON(jsonData);
    }
    catch (err) {
      await interaction.editReply(err.message);
      return;
    }
  }
  else{
    console.log(player);
    await interaction.editReply(`❌ Spieler ${getInput(interaction,'player-name')} existiert nicht!`);
    return;
  }

    // 4.
    const embed = constructEmbed('delete-player', player);

    // send delayed discord reply
    await interaction.editReply({ embeds: [embed] });
  },
};