//for json file stuff
const fs = require("fs").promises;

//for option type
const {
  ApplicationCommandOptionType,
  PermissionFlagsBits,
} = require('discord.js');

//for embed stuff
const { Client, IntentsBitField, EmbedBuilder } = require('discord.js');

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

    // delay discord reply to prevent timeout error
    await interaction.deferReply();


    // get input
    const playerName = interaction.options.get('player-name').value.toLowerCase();
    console.log(playerName);

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


    // check all teams in 'Teams' section for player
    for (const team in jsonData.Teams) {
      console.log(`Team ${team}`);

      // player is in a team
      if (jsonData.Teams[team].Players[playerName]) {
        console.log("player in team");

        // remove player from team
        delete jsonData.Teams[team].Players[playerName];

        try {
          await fs.writeFile("data.json", JSON.stringify(jsonData, null, 2));
          console.log("✅ Datei erfolgreich gespeichert!");

          // construct embed
          const embed = new EmbedBuilder()
            .setColor(0xFF2020)
            .setTitle(`${playerName} wurde aus ${team} gelöscht`);

          // reply 
          await interaction.editReply({ embeds: [embed] });
          return;
        } catch (err) {
          console.error("❌ Fehler beim Speichern:", err);
          await interaction.editReply("❌ Fehler beim Speichern");
          return;
        }

      }
      console.log("Player not in team");
    }

    // player is not in teams section, check 'Unsorted' section
    for (const player in jsonData.Unsorted) {

      // player is in 'Unsorted'
      if (jsonData.Unsorted[playerName]) {

        // remove player from 'Unsorted' section
        delete jsonData.Unsorted[playerName];

        // save file, reply and stop
        try {
          await fs.writeFile("data.json", JSON.stringify(jsonData, null, 2));
          console.log("✅ Datei erfolgreich gespeichert!");
          // construct embed
          const embed = new EmbedBuilder()
            .setColor(0xFF2020)
            .setTitle(`${playerName} wurde gelöscht`);

          // reply
          await interaction.editReply({ embeds: [embed] });
          return;
        } catch (err) {
          console.error("❌ Fehler beim Speichern:", err);
          await interaction.editReply("❌ Fehler beim Speichern");
          return;
        }
      }
    }

    // player not in data json file, error
    console.error(`❌ Spieler ${playerName} nicht gefunden`);
    await interaction.editReply(`❌ Spieler ${playerName} nicht gefunden`);
  },
};