// for json file stuff
const fs = require("fs").promises;

const createPlayerInJSON = require('@json/createPlayerInJSON.js');
const { constructEmbed } = require("@utils/constructEmbed.js");
const { saveJSON } = require("@json/saveJSON.js");
const { readJSON } = require("@json/readJSON.js");
const { createPlayerObject } = require('@utils/createPlayerObject.js');



const { Client } = require('discord.js');

// for option type
const {
  ApplicationCommandOptionType,
  PermissionFlagsBits,
} = require('discord.js');


module.exports = {
  name: 'createplayer',
  description: '➕ Create a new player!',
  // devOnly: Boolean,
  testOnly: true,
  options: [
    {
      name: "player-name",
      description: "The player name",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "discord-id",
      description: "The players discord id (to ping them)",
      type: ApplicationCommandOptionType.String, // Muss String sein, weil Discord IDs zu groß sind für Number Type
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
      description: "The players instragram url",
      type: ApplicationCommandOptionType.String,
      required: false,
    },
    {
      name: "tiktok",
      description: "The players tiktok url",
      type: ApplicationCommandOptionType.String,
      required: false,
    },
    {
      name: "twitter",
      description: "The players twitter url",
      type: ApplicationCommandOptionType.String,
      required: false,
    },
    {
      name: "twitch",
      description: "The players twitch url",
      type: ApplicationCommandOptionType.String,
      required: false,
    },
    {
      name: "youtube",
      description: "The players youtube url",
      type: ApplicationCommandOptionType.String,
      required: false,
    },
    {
      name: "team",
      description: "The players team",
      type: ApplicationCommandOptionType.String,
      required: false,
    },
  ],
  // deleted: Boolean,

  callback: async (client, interaction) => {
    console.log('~ createplayer');

    // delay discord reply to prevent timeout error
    await interaction.deferReply();

    /*
    1.Read json
    2. Make player object from inputs
    3. Save player to json
    4. Save json
    5. Print embed
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
    let player = createPlayerObject(interaction);

    // 3.
    try {
      await createPlayerInJSON(jsonData, player);
    }
    catch (err) {
      await interaction.editReply(err.message);
      return;
    }

    // 4.
    try {
      saveJSON(jsonData);
    }
    catch (err) {
      await interaction.editReply(err.message);
      return;
    }

    // 5.
    const embed = constructEmbed('create-player', player);

    // send delayed discord reply
    await interaction.editReply({ embeds: [embed] });
  },
};