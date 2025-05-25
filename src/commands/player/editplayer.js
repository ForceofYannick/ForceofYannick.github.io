const fs = require("fs").promises;
const { Client, ApplicationCommandOptionType } = require("discord.js");
const { getInput } = require("@utils/getInput.js");
const { constructEmbed } = require("@utils/constructEmbed.js");
const { createPlayerObject } = require("@utils/createPlayerObject.js");
const { getPlayerFromJSON } = require("@json/getPlayerFromJSON.js");
const { comparePlayersAndMakeNew } = require("@utils/comparePlayersAndMakeNew.js");
const { deletePlayerFromJSON } = require("@json/deletePlayerFromJSON.js");
const { createPlayerInJSON } = require("@json/createPlayerInJSON.js");
const { saveJSON } = require("@json/saveJSON.js");
const { readJSON } = require("@json/readJSON.js");

function checkAnyInputExists(interaction) {
  for (const option of interaction.options.data) {
    // ignore playerName since its always provided
    if (option.name !== "player-name") {
      return true;
    }
  }
  // no option exists
  return false;
}

module.exports = {
  name: "editplayer",
  description: "🔄 Edit a player!",
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
    console.log("=> editplayer");
    await interaction.deferReply();

    // No options provided
    if (!checkAnyInputExists(interaction)) {
      console.error(`❌ Keine Option angegeben!`);
      await interaction.editReply(`❌ Keine Option angegeben!`);
      return;
    }

    /*
        1. Read JSON
        2. Make input player object
        3. Get old player object from JSON
        4. Compare objects and make updated object
        5. Delete old player in JSON
        6. Add updated player to JSON
        7. Save JSON    
        8. Print embed
        */

    // 1. Read JSON
    let jsonData;
    try {
      jsonData = await readJSON();
    } catch (err) {
      await interaction.editReply(err.message);
      return;
    }


    // 2. Make input player object
    let inputPlayer = createPlayerObject(interaction);
    const playerName = getInput(interaction, "player-name");
    // modify object with new name if provided
    if (getInput(interaction, "new-player-name") !== "-") {
      inputPlayer["player-name"] = getInput(interaction, "new-player-name");
    }


    // 3. Get old player object from JSON

    let oldPlayer = await getPlayerFromJSON(playerName);
    if (oldPlayer == null) {
      console.error(`❌ Spieler ${playerName} nicht gefunden`);
      await interaction.editReply(`❌ Spieler ${playerName} nicht gefunden`);
      return;
    }


    // 4. Compare objects and make updated object
    let newPlayer = comparePlayersAndMakeNew(oldPlayer, inputPlayer);


    // 4.5 Assign new team role if needed
    if (oldPlayer.team != getInput(interaction, "team")) {
      let newTeam = null;
      if (getInput(interaction, "team").toLowerCase() == "delete") {
        newTeam = "-";
      }
      else {
        newTeam = newPlayer.team;
      }

      const IDinput = newPlayer['discord-id'] || oldPlayer['discord-id'];
      console.log("DC ID: "+IDinput);

      // Check: keine Discord-ID vorhanden
      if (!IDinput || IDinput === "-") {
        await interaction.editReply("❌ Dieser Spieler hat keine Discord-ID angegeben. Der Rollentausch kann nicht durchgeführt werden.");
        return;
      }

      let memberID = null;

      const match = IDinput.match(/^<@!?(\d+)>$/);
      if (match) {
        memberID = match[1];
      }

      if (/^\d{17,20}$/.test(IDinput)) {
        memberID = IDinput;
      }

      console.log("memberID: "+memberID);

      const guild = interaction.guild;
      if (!guild) {
        await interaction.editReply("Fehler: Guild nicht gefunden.");
        return;
      }

      let member;
      try {
        member = await guild.members.fetch(memberID);
      } catch (err) {
        await interaction.editReply("Fehler: Mitglied nicht gefunden.");
        return;
      }

      const oldRole = guild.roles.cache.find(
        (role) => role.name === oldPlayer.team.toUpperCase()
      );
      let newRole = null;

      if (newTeam !== "-") {
        newRole = guild.roles.cache.find(
          (role) => role.name === newTeam.toUpperCase()
        );
      }

      try {
        if (oldRole) await member.roles.remove(oldRole);

        if (newTeam !== "-" && newRole) {
          await member.roles.add(newRole);
        }

        console.log(`Rollenwechsel: ${oldRole?.name || 'keine'} → ${newRole?.name || 'keine'} für ${member.user.tag}`);
      } catch (err) {
        await interaction.editReply("Fehler beim Rollentausch: " + err.message);
        return;
      }
    }



    // 5. Delete old player in JSON
    deletePlayerFromJSON(jsonData, oldPlayer);


    // 6. Add updated player to JSON
    createPlayerInJSON(jsonData, newPlayer);


    // 7. Save JSON    
    await saveJSON(jsonData);


    // 8. Print embed
    const embed = constructEmbed("edit-player", newPlayer);
    await interaction.editReply({ embeds: [embed] });

  },
};
