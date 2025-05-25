const { Client, IntentsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'test',
    description: 'test',

    callback: (client, interaction) => {
        console.log("=> test");

        const embed = new EmbedBuilder()
            .setColor(0xFFFF80)
            .setTitle('Inshallah, das hat funktioniert Brudi!');
        interaction.reply({ embeds: [embed] });
    },
};