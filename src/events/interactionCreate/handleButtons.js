//const buildEmbed = require('../../utils/buildEmbed');

const { EmbedBuilder } = require("@discordjs/builders");


module.exports = async (client, interaction) => {
    if (!interaction.isButton()) return;

    const { customId } = interaction;

    if (customId.startsWith('getplayer_')) {

        await interaction.deferReply();

        // Name aus ID extrahieren
        const playerName = customId.replace('getplayer_', '');
        
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
        
        //const embed = new EmbedBuilder();



                // construct embed
                const embed = new EmbedBuilder()
                .setColor(0x2090FF)
                .setTitle(`${playerName}`)
                .addFields(
                    { name: 'Discord Name', value: discordID === '-' ? discordID : `<@${discordID}>` },
                    { name: 'Team', value: activeTeam },
                    { name: 'Roles', value: roles.length > 0 ? roles.join(" / ") : "-" },
                    { name: 'Instagram', value: instagram === '-' ? instagram : `[Instagram](${instagram})`, inline: true },
                    { name: 'TikTok', value: tiktok === '-' ? tiktok : `[TikTok](${tiktok})`, inline: true },
                    { name: 'Twitter', value: twitter === '-' ? twitter : `[Twitter](${twitter})`, inline: true },
                    { name: 'Twitch', value: twitch === '-' ? twitch : `[Twitch](${twitch})`, inline: true },
                    { name: 'YouTube', value: youtube === '-' ? youtube : `[YouTube](${youtube})`, inline: true }
                );
    
            // reply
            await interaction.editReply({ embeds: [embed] });


        //interaction.reply(`Testnachricht für ${playerName}`);







        /*
        // Finde Slash-Befehl
        const command = client.commands.get('getplayer');

        // Wenn Befehl nicht gefunden
        if (!command) {
            return interaction.followUp({
                content: '❌ Der Befehl wurde nicht gefunden!',
                ephemeral: true // Nur der Nutzer sieht die Nachricht
            });
        }

        // Sicherstellen, dass die Interaktion nicht bereits beantwortet oder verzögert wurde
        if (!interaction.replied && !interaction.deferred) {
            await interaction.deferReply();
        }

        try {
            // Fake-Interaction mit allen notwendigen Methoden
            const fakeInteraction = {
                ...interaction, // Kopiere alle vorhandenen Daten
                options: {
                    get: (name) => (name === 'name' ? { value: playerName } : undefined),
                },
            };

            // Callback für den Befehl ausführen
            await command.callback(client, fakeInteraction);

            // Jetzt eine neue Nachricht senden
            await interaction.followUp({ content: `Spieler-Infos für ${playerName} erfolgreich abgerufen!` });

        } catch (error) {
            console.error(`❌ Fehler beim Ausführen des Befehls: ${error}`);
            if (!interaction.deferred) {
                await interaction.deferReply(); // Sicherstellen, dass deferReply durchgeführt wurde
            }
            await interaction.followUp({ content: "❌ Fehler beim Ausführen des Befehls.", ephemeral: true });
        }
        */
    }

    // Hier können weitere Buttons behandelt werden
    else if (customId === 'example_button') {
        await interaction.followUp({ content: 'Dieser Button macht etwas anderes!' });
    }
};
