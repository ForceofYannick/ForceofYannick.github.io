//for json file stuff
const fs = require("fs").promises;

const { getInput } = require('@utils/getInput.js');
const { constructPlayerEmbed } = require("@utils/constructPlayerEmbed.js");

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
    {
      name: "player1",
      description: "A team player",
      type: ApplicationCommandOptionType.String,
      required: false,
    },
    {
      name: "player2",
      description: "A team player",
      type: ApplicationCommandOptionType.String,
      required: false,
    },
    {
      name: "player3",
      description: "A team player",
      type: ApplicationCommandOptionType.String,
      required: false,
    },
    {
      name: "player4",
      description: "A team player",
      type: ApplicationCommandOptionType.String,
      required: false,
    },
    {
      name: "player5",
      description: "A team player",
      type: ApplicationCommandOptionType.String,
      required: false,
    },
    {
      name: "player6",
      description: "A team player",
      type: ApplicationCommandOptionType.String,
      required: false,
    },
    {
      name: "player7",
      description: "A team player",
      type: ApplicationCommandOptionType.String,
      required: false,
    },
    {
      name: "player8",
      description: "A team player",
      type: ApplicationCommandOptionType.String,
      required: false,
    },
    {
      name: "player9",
      description: "A team player",
      type: ApplicationCommandOptionType.String,
      required: false,
    },
    {
      name: "player10",
      description: "A team player",
      type: ApplicationCommandOptionType.String,
      required: false,
    },
  ],
  // deleted: Boolean,

  callback: async (client, interaction) => {

    // delay discord reply to prevent timeout error
    await interaction.deferReply();


    // get input
    const teamName = getInput(interaction, 'team-name');


    // Read data json file
    let jsonData;
    let rawData;

    try {
      rawData = await fs.readFile("data.json", "utf8");
      jsonData = JSON.parse(rawData);

    } catch (err) {
      console.error("❌ Fehler beim Lesen:", err);
      await interaction.editReply("❌ Fehler beim lesen der JSON-Datei!");
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

            // delete player in old team
            delete jsonData.Teams[team].Players[playerName];

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
    fs.writeFile("data.json", JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        console.error("❌ Fehler beim Speichern:", err);
      } else {
        console.log("✅ Datei erfolgreich gespeichert!");
      }
    });


    const embed = new EmbedBuilder()
      .setColor(0x20FF20)
      .setTitle(`${teamName} wurde erstellt`);

    if (missingPlayers.length > 0) {
      embed.setDescription(`⚠️ Folgende Spieler wurden nicht gefunden und bei der Teamerstellung ignoriert: ${missingPlayers.join(" ,")}`);
    }

    embed.addFields(
      { name: 'team-players', value: `${updatedPlayers.join(" ,")}` },
      { name: 'team-results', value: `[]` }
    );


    await interaction.editReply({ embeds: [embed] });
  },
};