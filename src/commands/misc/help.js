//for embed stuff
const { Client, IntentsBitField, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    description: '📜 Provides a tutorial on how to use the bot',
    // devOnly: Boolean,
    testOnly: true,

    //deleted: false,

    callback: (client, interaction) => {

        // first embed
        const embed1 = new EmbedBuilder()
            .setColor(0xFFFF80)
            .setTitle('📜 Befehlsübersicht')
            .setDescription(
                'Unten aufgeführt ist die Liste aller Befehle und ihren anzugebenden Parametern.\n\n' +
                '**Benötigte Parameter sind gekennzeichnet durch** `[ ... ]`\n' +
                '**Optionale Parameter sind gekennzeichnet durch** `{ ... }`'
            )

            .addFields(
                { name: '\u200B', value: '\u200B' }, // visual spacing
                { name: '⚠️ WARNUNG ⚠️', value: 'Bisher gibt es keine zusätzlichen Bestätigungsfragen. Passt auf, bei den Sachen die ihr angebt.', inline: false },
                { name: '\u200B', value: '\u200B' }, // visual spacing
                { name: '⚙️ Fehlermeldungen und Feedback ⚙️', value: 'Falls Fehler vorkommen oder Bedarf für Feedback vorhanden ist, gerne an <@332847436471074827> senden oder <@279986518309732352> darüber informieren.', inline: false },
            )

            .addFields(
                { name: '\u200B', value: '\u200B' }, // visual spacing
                { name: '⚔️ Spieler Befehle ⚔️', value: '\u200B', inline: false },
                {
                    name: '</createplayer:1347116333120225333>',
                    value: '```/createplayer [Player name] {Discord ID} {Team}\n' +
                        '{LoL Role} {Orga Role 1} {Orga Role 2}\n' +
                        '{Instagram URL} {Tiktok URL} {Twitter URL} {Twitch URL} {Youtube URL}```\n' +
                        'Erstellt einen Spieler mit dem angegebenen Namen und anderen optionalen Informationen im angegebenen Team, sofern das Team existiert. Wenn kein Team angegeben wird oder das angegebene Team nicht existiert, wird der Spieler in der Kategorie "Unsorted" gespeichert.',
                    inline: false
                },
                { name: '\u200B', value: '\u200B' }, // visual spacing
                {
                    name: '</editplayer:1350854498087604290>',
                    value: '```/editplayer [Player name] {New player name} {Discord ID} {Team}\n' +
                        '{LoL Role} {Orga Role 1} {Orga Role 2}\n' +
                        '{Instagram URL} {Tiktok URL} {Twitter URL} {Twitch URL} {Youtube URL}```\n' +
                        'Editiert beliebige angegebene Spielerinformationen.\n' +
                        'Beachte für die Optionen `New player name` und `Team`:\n' +
                        '- Wird nur ein neuer Name angegeben, wird der Name des Spielers aktualisiert.\n' +
                        '- Wird nur ein neues Team angegeben, wird der Spieler in das neue Team verschoben.\n' +
                        '- Wird "no team" als Team angegeben, wird der Spieler aus dem aktuellen Team entfernt und in die Kategorie "Unsorted" verschoben.\n' +
                        '- Werden sowohl ein neuer Name als auch ein neues Team angegeben, wird der Spieler mit dem neuen Namen in das neue Team verschoben. Wenn "no team" als Team angegeben wird, wird der Spieler mit dem neuen Namen in die "Unsorted"-Kategorie verschoben.',
                    inline: false
                },
                { name: '\u200B', value: '\u200B' }, // visual spacing
                { name: '</deleteplayer:1350450447571222530> [Player name]', value: 'Löscht einen Spieler.', inline: false },
                { name: '</getplayer:1350491394828927017> [Player name]', value: 'Zeigt eine ausführliche Spielerübersicht an.', inline: false },
                { name: '</getunsortedplayers:1350836412106145794>', value: 'Zeigt alle Spieler an, die sich in keinem Team befinden.', inline: false },
            )

           .addFields(
    { name: '\u200B', value: '\u200B' }, // visual spacing
    { name: '🏆 Team Befehle 🏆', value: '\u200B', inline: false },
    {
        name: '</createteam:1373761227863621632>',
        value: '```/createteam [Team name] {player 1} {player 2} ... {player 10}```\n' +
            'Erstellt ein Team mit dem angegebenen Namen und optional bis zu 10 Spielern. Wenn ein übergebener Spieler nicht gefunden wird, wird er ignoriert und das Team wird mit den gefundenen Spielern erstellt, die dann auch in das neue Team verschoben werden.\n(Durch individuelle Spielereditierung können auch mehr als 10 Spieler in einem Team sein)',
        inline: false
    },
    { name: '</editteamname:1373762597635100804> [Current team name] [New team name]', value: 'Ändert den Teamnamen und aktualisiert alle darin enthaltenen Spieler, da diese ihren Teamnamen erneut speichern.', inline: false },
    { name: '</deleteteam:1373762596720738388> [Team name]', value: 'Löscht ein Team und verschiebt alle darin enthaltenen Spieler in die Kategorie "Unsorted".', inline: false },
    { name: '</getteam:1375130865234870293> [Team name]', value: 'Zeigt eine ausführliche Teamübersicht an.', inline: false },
    { name: '</createteamresults:1373762595747659910> [Team name] [Split name]', value: 'Erstellt einen Split.', inline: false },
    { name: '</deleteteamresults:1373766066777362483> [Team name] [Split name]', value: 'Löscht einen Split.', inline: false },
);



        // second embed
        const embed2 = new EmbedBuilder()
            .setColor(0xFFFF80)

            .addFields(
                { name: '\u200B', value: '\u200B' }, // visual spacing
                { name: '🛠️ Sonstige Befehle 🛠️', value: '\u200B', inline: false },
                { name: '</help:1351878644712214559>', value: 'Zeigt diese Übersicht.', inline: false },
            )

            .addFields(
                { name: '\u200B', value: '\u200B' }, // visual spacing
                { name: '📘 Slash-Befehl Nutzung 📘', value: '\u200B', inline: false },
                {
                    name: '1. Befehl eingeben', value:
                        'Gib den `/` Befehl in das Eingabefeld ein, um ein Fenster zu öffnen, in dem du die verfügbaren Befehle siehst.\n\n',
                    inline: false
                },
                {
                    name: '2. Befehlsübersicht', value:
                        'Am linken Rand wird das Profilbild des Bots angezeigt. Wenn du darauf klickst, siehst du alle verfügbaren Befehle.\n' +
                        'Wenn du mit der Maus über einen Befehl fährst, werden die Pflichtfelder `(schwarz hinterlegt)` sowie, falls vorhanden, optionale Felder mit einem "+..." angezeigt.\n' +
                        'Wenn du mit der Maus über das "+..." fährst, erscheinen alle optionalen Werte.\n\n',
                    inline: false
                },
                {
                    name: '3. Befehl auswählen', value:
                        'Du kannst entweder auf einen Befehl klicken oder ihn direkt eingeben.\n\n',
                    inline: false
                },
                {
                    name: '4. Neue Optionen hinzufügen', value:
                        'Um eine neue Option hinzuzufügen, klicke auf das "+..." oder drücke die `Tab`-Taste.\n' +
                        'Es öffnet sich ein Fenster, in dem du alle Optionen sehen kannst, die du entweder per Klick oder durch Eingabe des Optionsnamens (gefolgt von ":") hinzufügen kannst.\n\n',
                    inline: false
                },
                {
                    name: '5. Fehlerhafte Eingaben', value:
                        'Wenn etwas rot umrandet wird, bedeutet das, dass entweder nichts oder etwas Falsches eingegeben wurde. Bei Rollen kann nur der vordefinierte Wert eingegeben werden, der angezeigt wird.',
                    inline: false
                }
            );



        interaction.reply({ embeds: [embed1, embed2] });
    },
};