// for json file stuff
const fs = require("fs").promises;

// for embed stuff
const { Client, IntentsBitField, EmbedBuilder } = require('discord.js');

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
      type: ApplicationCommandOptionType.String,
      required: false,
    },
    {
      name: "main-role",
      description: "The player role in LoL",
      type: ApplicationCommandOptionType.String,
      choices:[
        {name: "top", value: "top"},
        {name: "mid", value: "mid"},
        {name: "sup", value: "sup"},
        {name: "jgl", value: "jgl"},
        {name: "adc", value: "adc"},
      ],
      required: false,
    },
    {
    name: "orga-role-1",
    description: "The player role in IBTC eSports",
    type: ApplicationCommandOptionType.String,
    choices:[
      {name: "team-leader", value: "team-leader"},
      {name: "captain", value: "captain"},
      {name: "coach", value: "coach"},
    ],
    required: false,
    },
    {
      name: "orga-role-2",
      description: "The player role in IBTC eSports",
      type: ApplicationCommandOptionType.String,
      choices:[
        {name: "team-leader", value: "team-leader"},
        {name: "captain", value: "captain"},
        {name: "coach", value: "coach"},
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

    // delay discord reply to prevent timeout error
    await interaction.deferReply();

          // get all inputs
          const playerName = interaction.options.get('player-name').value.toLowerCase();
          const discordID = (interaction.options.get('discord-id')) ? interaction.options.get('discord-id').value : "-";
          const mainRole = (interaction.options.get('main-role')) ? interaction.options.get('main-role').value : "-";
          const orgaRole1 = (interaction.options.get('orga-role-1')) ? interaction.options.get('orga-role-1').value : "-";
          const orgaRole2 = (interaction.options.get('orga-role-2')) ? interaction.options.get('orga-role-2').value : "-";
          const instagram = (interaction.options.get('instagram')) ? interaction.options.get('instagram').value : "-";
          const tiktok = (interaction.options.get('tiktok')) ? interaction.options.get('tiktok').value : "-";
          const twitter = (interaction.options.get('twitter')) ? interaction.options.get('twitter').value : "-";
          const twitch = (interaction.options.get('twitch')) ? interaction.options.get('twitch').value : "-";
          const youtube = (interaction.options.get('youtube')) ? interaction.options.get('youtube').value : "-";
          let team = (interaction.options.get('team')) ? interaction.options.get('team').value.toLowerCase() : "-";


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


     // check all teams in 'Teams' section if player exists
     for(const currentTeam in jsonData.Teams){

      // if player exists in team
      if(jsonData.Teams[currentTeam]?.Players?.[`${playerName}`]){
        console.log(`❌ Error on player creation for ${playerName}: Already exists`);
        await interaction.editReply(`❌ Creation error for ${playerName}: Already exists in team '${currentTeam}'`);
        return;
      }
     }

     // if player exists in 'Unsorted' section
     if(jsonData.Unsorted[`${playerName}`]){
      console.log(`❌ Error on player creation for ${playerName}: Already exists`);
      await interaction.editReply(`❌ Creation error for ${playerName}: Already exists`);
      return;
     }

     // if team is given
     if(interaction.options.get('team')){
      
      // if team exists
      if(jsonData.Teams[`${team}`]){

        // create player in corresponding team with given inputs
        jsonData.Teams[`${team}`].Players[`${playerName}`] = {
          "discord-id": discordID,
          "main-role": mainRole,
          "orga-role-1": orgaRole1,
          "orga-role-2": orgaRole2,
          "instagram": instagram,
          "tiktok": tiktok,
          "twitter": twitter,
          "twitch": twitch,
          "youtube": youtube,
          "team": team,
        }
      }

      // team doesn't exist
      else{
        console.log(`⚠️ Warning on player creation for ${playerName}: Team not found, player saved without team data in 'Unsorted'`);
        await interaction.editReply(`⚠️ Creation warning for ${playerName}: Team (${team}) not found, player saved without team data in 'Unsorted'`);
        team = "-";
   
           // create player in 'Unsorted' section
           jsonData.Unsorted[`${playerName}`] = {
             "discord-id": discordID,
             "main-role": mainRole,
             "orga-role-1": orgaRole1,
             "orga-role-2": orgaRole2,
             "instagram": instagram,
             "tiktok": tiktok,
             "twitter": twitter,
             "twitch": twitch,
             "youtube": youtube,
             "team": team,
           }
      }

     }
     // no team is given, create player in 'Unsorted' section
     else{
  
          // create player in 'Unsorted' section
          jsonData.Unsorted[`${playerName}`] = {
            "discord-id": discordID,
            "main-role": mainRole,
            "orga-role-1": orgaRole1,
            "orga-role-2": orgaRole2,
            "instagram": instagram,
            "tiktok": tiktok,
            "twitter": twitter,
            "twitch": twitch,
            "youtube": youtube,
            "team": team,
          }
     }

        // Write the new data to the file
        fs.writeFile("data.json", JSON.stringify(jsonData, null, 2), (err) => {
          if (err) {
              console.error("❌ Fehler beim Speichern:", err);
          } else {
              console.log("✅ Datei erfolgreich gespeichert!");
          }
      });

      // filter roles to prevent bullet point creation in embed
      const roles =[mainRole, orgaRole1, orgaRole2].filter(role => role !== "-");

      // construct embed for discord reply
    const embed = new EmbedBuilder()
      .setColor(0x00FF00)
      .setTitle(`${playerName} wurde erstellt`)
      .addFields(
        { name: 'Discord Name', value: discordID == '-' ? discordID : `<@${discordID}>` },
        { name: 'Team', value: team },
        { name: 'Roles', value: roles.length > 0 ? roles.join(" / ") : "-" },
        { name: 'Instagram', value: instagram == '-' ? instagram : `[Instagram](${instagram})`, inline: true },
        { name: 'TikTok', value: tiktok == '-' ? tiktok : `[TikTok](${tiktok})`, inline: true },
        { name: 'Twitter', value: twitter == '-' ? twitter : `[Twitter](${twitter})`, inline: true },
        { name: 'Twitch', value: twitch == '-' ? twitch : `[Twitch](${twitch})`, inline: true },
        { name: 'YouTube', value: youtube == '-' ? youtube : `[YouTube](${youtube})`, inline: true },

      );

    // send delayed discord reply
    await interaction.editReply({ embeds: [embed] });
  },
};