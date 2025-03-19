//for embed stuff
const { Client, IntentsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    description: '📜 Provides a tutorial on how to use the bot',
    // devOnly: Boolean,
    testOnly: true,

    //deleted: false,
  
    callback: (client, interaction) => {

        
        const embed = new EmbedBuilder()
        .setColor(0xFFFF80)
        .setTitle('📜 Befehlsübersicht')
        //.setURL('https://discord.js.org/')
        //.setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
        .setDescription('Unten aufgeführ ist die Liste aller Befehle und ihren anzugebenden Parametern.\n\n**Benötigte Parameter sind gekenzeichnet durch** `[ ... ]`\n**Optionale Parameter sind gekenzeichnet durch** `{ ... }`')
        //.setThumbnail('https://i.imgur.com/AfFp7pu.png')
    
        .addFields(
            { name: '\u200B', value: '\u200B' }, // visual spacing
            { name: '⚠️ WARNUNG ⚠️', value: 'Bisher gibt es keine zusätzlichen Bestätigungsfragen. Passt auf, bei den Sachen die ihr angebt.', inline: false },
        )
        
        .addFields(
            { name: '\u200B', value: '\u200B' }, // visual spacing
            { name: '⚔️ Spieler Befehle ⚔️', value: '', inline: false },
            { name: '`/createplayer [Player name] {Discord ID} {Team} {Roles} {Instagram URL} {Tiktok URL} {Twitter URL} {Twitch URL} {Youtube URL}`', value: 'Erstellt einen neuen Spieler', inline: false },
            { name: '`/editplayer [Player name] {Discord ID} {Team} {Roles} {Instagram URL} {Tiktok URL} {Twitter URL} {Twitch URL} {Youtube URL}`', value: 'Editiert beliebige Spieler Informationen', inline: false },
            { name: '`/deleteplayer [Player name]`', value: 'Löscht einen Spieler', inline: false },
            { name: '`/getplayer [Player name]`', value: 'Zeigt eine ausführliche Spielerübersicht an', inline: false },
        )
    
        .addFields(
            { name: '\u200B', value: '\u200B' }, // visual spacing
    
            { name: '🏆 Team Befehle 🏆', value: ' ', inline: false },
            { name: '`/createteam [Team name] {player 1} {player 2} {player 3} {player 4} {player 5} {player 6} {player 7} {player 8} {player 9} {player 10}`', value: 'Erstellt ein Team mit bis zu 10 Spieler (durch Spielereditierung können auch mehr Spieler in einem Team sein)', inline: false },
            { name: '`/editteamname [Current team name] [New team name]`', value: 'Ändert einen Teamnamen', inline: false },
            { name: '`/deleteteam [Team name]`', value: 'Löscht ein Team', inline: false },
            { name: '`/getteam [Team name]`', value: 'Zeigt eine ausfühliche Teamübersicht an', inline: false },
            //{ name: '\u200B', value: '\u200B' }, // visual spacing
            //{ name: '`/addteamresults [Team name] [Split] {Calibration phase} {Group phase} {Playoffs}`', value: 'Adds split results for a team.', inline: false },
            //{ name: '`/editteamresults [Team name] [Split] {Calibration phase} {Group phase} {Playoffs}`', value: 'Edits split details.', inline: false },
            //{ name: '`/removeteamresults [Team name] [Split] {Calibration phase} {Group phase} {Playoffs}`', value: 'Removes split results. \n- **Specific part**: Provide split and part to remove\n- **Entire split**: Leave optional options empty', inline: false }
        )
    
        .addFields(
            { name: '\u200B', value: '\u200B' }, // visual spacing
    
            { name: '🛠️ Sonstige Befehle 🛠️', value: '', inline: false },
            { name: '`/help`', value: 'Zeigt diese Übersicht', inline: false },
            { name: '`/getunsortedplayers`', value: 'Zeigt alle Spieler an, die sich in keinem Team befinden', inline: false },
            { name: '`/getallteams`', value: 'Zeigt alle Teams an', inline: false }
        )
    
        //.setImage('https://i.imgur.com/AfFp7pu.png')
        //.setTimestamp()
        //.setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });
         interaction.reply({ embeds: [embed]});
    },
  };