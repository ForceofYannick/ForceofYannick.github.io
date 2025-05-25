const fs = require("fs").promises;
const { getInput } = require('@utils/getInput.js');
const { getPlayerFromJSON } = require('@json/getPlayerFromJSON.js');
const { constructEmbed } = require("@utils/constructEmbed.js");
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'getplayer',
    description: '📜 Display a player!',
    options: [
        {
            name: "player-name",
            description: "The player name",
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],

    callback: async (client, interaction) => {
        console.log('=> getplayer');
        await interaction.deferReply();

        const playerName = getInput(interaction, 'player-name');
        let player;

        // 1. Read JSON
        try {
            player = await getPlayerFromJSON(playerName);
        } catch (error) {
            return await interaction.editReply("❌ Fehler beim Lesen der JSON-Datei!");
        }

        if (!player) {
            return await interaction.editReply(`❌ Spieler ${playerName} nicht gefunden`);
        }

        // 2. Print embed
        const embed = constructEmbed('get-player', player);
        await interaction.editReply({ embeds: [embed] });
    },
};
