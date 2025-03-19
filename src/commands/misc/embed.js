//for embed stuff
const { Client, IntentsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'embed',
    description: 'Sends a complete embed!',
    // devOnly: Boolean,
    testOnly: true,
    // options: Object[],
    // deleted: Boolean,
  
    callback: (client, interaction) => {
         const embed = new EmbedBuilder()
         .setColor(0xFFFF80)
         .setTitle('Some title')
         .setURL('https://discord.js.org/')
         .setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
         .setDescription('Some description here')
         .setThumbnail('https://i.imgur.com/AfFp7pu.png')
         .addFields(
             { name: 'Regular field title', value: 'Some value here' },
             { name: '\u200B', value: '\u200B' },
             { name: 'Inline field title', value: 'Some value here', inline: true },
             { name: 'Inline field title', value: 'Some value here', inline: true },
         )
         .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
         .setImage('https://i.imgur.com/AfFp7pu.png')
         .setTimestamp()
         .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });
     
         interaction.reply({ embeds: [embed]});
    },
  };