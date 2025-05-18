const fs = require("fs").promises;
const { getInput } = require('@utils/getInput.js');
const { getPlayerFromJSON } = require('@json/getPlayerFromJSON.js');
const { constructPlayerEmbed } = require("@utils/constructPlayerEmbed.js");

const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'getplayer',
    description: '📜 Display a player!',
    testOnly: true,
    options: [
        {
            name: "player-name",
            description: "The player name",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],

    callback: async (client, interaction) => {
        console.log('~ getplayer');

        await interaction.deferReply();

        const playerName = getInput(interaction, 'player-name');
        let player;

        try {
            player = await getPlayerFromJSON(playerName);
        } catch (error) {
            return await interaction.editReply("❌ Fehler beim Lesen der JSON-Datei!");
        }

        if (!player) {
            return await interaction.editReply(`❌ Spieler ${playerName} nicht gefunden`);
        }

        const embed = constructPlayerEmbed('get', player);
        await interaction.editReply({ embeds: [embed] });
    },
};
