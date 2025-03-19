//for json file stuff
const fs = require("fs").promises;

//for embed stuff
const { EmbedBuilder } = require('discord.js');

//for option type
const {
  ApplicationCommandOptionType,
  PermissionFlagsBits,
} = require('discord.js');

module.exports = {
  name: 'deleteteam',
  description: '➖ Delete a team!',
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
    const teamName = interaction.options.get('team-name').value.toLowerCase();

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


    // team not found
    if (!jsonData.Teams[teamName]) {
      console.error(`❌ Team ${teamName} nicht gefunden`);
      await interaction.editReply(`❌ Team ${teamName} nicht gefunden`);
      return;
    }


    let transferedPlayers = [];

    // transfer all players in team to 'Unsorted' section
    for (player in jsonData.Teams[teamName].Players) {
      console.log(`${player} player in ${teamName}`);
      // get the player data in team section
      let playerData = jsonData.Teams[teamName].Players[player];

      // remove the team name in the player data
      playerData.team = '-';

      // delete player data in team section
      delete jsonData.Teams[teamName].Players[player];

      // paste player date into unsorted section
      jsonData.Unsorted[player] = playerData;

      // add player to transferedPlayers array for reply info
      transferedPlayers.push(player);
    }

    // delete team from teams
    delete jsonData.Teams[teamName];

    // save file and reply
    try {
      await fs.writeFile("data.json", JSON.stringify(jsonData, null, 2));
      console.log("✅ Datei erfolgreich gespeichert!");
      // Create embed message
      const embed = new EmbedBuilder()
        .setColor(0xFF2020)
        .setTitle(`🔄🏆 ${teamName} gelöscht`)
        .addFields(
          { name: 'Aktualisierte Spieler', value: `${transferedPlayers.join(", ")}` },
        );

      // send delayed discord reply
      await interaction.editReply({ embeds: [embed] });
      return;
    } catch (err) {
      console.error("❌ Fehler beim Speichern:", err);
      await interaction.editReply("❌ Fehler beim Speichern der JSON-Datei!");
      return;
    }
  },
};