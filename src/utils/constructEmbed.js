const { EmbedBuilder } = require('discord.js');

function constructEmbed(actionType, target) {
    console.log('~ constructEmbed');
    let color = 0x000000;
    let embed = new EmbedBuilder();
    let playerList = null;
    let resultList = null;

    // embed color based on actionType
    switch (actionType) {
        case 'create-player':
            color = 0x00FF00; // green for creation
            embed.setTitle(`${target['player-name']} wurde erstellt`);
            embed.setColor(color);

            embed.addFields(
                {
                    name: 'Discord Name',
                    value: target['discord-id'] === '-' ? '-' : `<@${target['discord-id']}>`
                },
                {
                    name: 'Team',
                    value: target.team
                },
                {
                    name: 'Hauptrolle',
                    value: target['main-role']
                },
                {
                    name: 'Organisatorische Rollen',
                    value: formatOrgaRoles(target['orga-role-1'], target['orga-role-2'])
                },
                {
                    name: 'Instagram',
                    value: formatSocialLink(target.instagram, 'Instagram'),
                    inline: true
                },
                {
                    name: 'TikTok',
                    value: formatSocialLink(target.tiktok, 'TikTok'),
                    inline: true
                },
                {
                    name: 'Twitter',
                    value: formatSocialLink(target.twitter, 'Twitter'),
                    inline: true
                },
                {
                    name: 'Twitch',
                    value: formatSocialLink(target.twitch, 'Twitch'),
                    inline: true
                },
                {
                    name: 'YouTube',
                    value: formatSocialLink(target.youtube, 'YouTube'),
                    inline: true
                }
            );
            return embed;

        case 'edit-player':
            color = 0xFFA500; // orange for editing
            embed.setTitle(`🔄${target['player-name']} wurde aktualisiert`);
            embed.setColor(color);

            embed.addFields(
                {
                    name: 'Discord Name',
                    value: target['discord-id'] === '-' ? '-' : `<@${target['discord-id']}>`
                },
                {
                    name: 'Team',
                    value: target.team
                },
                {
                    name: 'Hauptrolle',
                    value: target['main-role']
                },
                {
                    name: 'Organisatorische Rollen',
                    value: formatOrgaRoles(target['orga-role-1'], target['orga-role-2'])
                },
                {
                    name: 'Instagram',
                    value: formatSocialLink(target.instagram, 'Instagram'),
                    inline: true
                },
                {
                    name: 'TikTok',
                    value: formatSocialLink(target.tiktok, 'TikTok'),
                    inline: true
                },
                {
                    name: 'Twitter',
                    value: formatSocialLink(target.twitter, 'Twitter'),
                    inline: true
                },
                {
                    name: 'Twitch',
                    value: formatSocialLink(target.twitch, 'Twitch'),
                    inline: true
                },
                {
                    name: 'YouTube',
                    value: formatSocialLink(target.youtube, 'YouTube'),
                    inline: true
                }
            );
            return embed;

        case 'get-player':
            color = 0x2090FF; // blue for displaying
            embed.setTitle(target['player-name']);
            embed.setColor(color);

            embed.addFields(
                {
                    name: 'Discord Name',
                    value: target['discord-id'] === '-' ? '-' : `<@${target['discord-id']}>`
                },
                {
                    name: 'Team',
                    value: target.team
                },
                {
                    name: 'Hauptrolle',
                    value: target['main-role']
                },
                {
                    name: 'Organisatorische Rollen',
                    value: formatOrgaRoles(target['orga-role-1'], target['orga-role-2'])
                },
                {
                    name: 'Instagram',
                    value: formatSocialLink(target.instagram, 'Instagram'),
                    inline: true
                },
                {
                    name: 'TikTok',
                    value: formatSocialLink(target.tiktok, 'TikTok'),
                    inline: true
                },
                {
                    name: 'Twitter',
                    value: formatSocialLink(target.twitter, 'Twitter'),
                    inline: true
                },
                {
                    name: 'Twitch',
                    value: formatSocialLink(target.twitch, 'Twitch'),
                    inline: true
                },
                {
                    name: 'YouTube',
                    value: formatSocialLink(target.youtube, 'YouTube'),
                    inline: true
                }
            );
            return embed;

        case 'delete-player':
            color = 0xFF2020; // red for deletion
            if (!target.team || target.team === '-') {
                embed.setTitle(`${target['player-name']} wurde gelöscht`);
            } else {
                embed.setTitle(`${target['player-name']} wurde aus ${target.team} gelöscht`);
            }
            embed.setColor(color);
            return embed;

        case 'create-team':
            color = 0x00FF00; // green for creation
            embed.setTitle(`${target.name} wurde erstellt`);
            embed.setColor(color);


            playerList = Object.keys(target.data.Players).join(', ') || '-';
            resultList = Object.keys(target.data.Results).join('\n') || '-';
            embed.addFields(
                { name: 'Spieler', value: playerList },
                //{ name: '\u200B', value: '\u200B' }, // visual spacing
                { name: 'Ergebnisse', value: resultList },
                { name: '\u200B', value: '\u200B' }, // visual spacing
                { name: 'Aktualisierte Spieler', value: target.updatedPlayers.join('\n') || '-' },
                { name: 'Nicht gefundene Spieler', value: target.ignoredPlayers.join('\n') || '-' },
            );
            return embed;

        case 'edit-team':
            color = 0xFFA500; // orange for editing
            embed.setTitle(`🔄${target.old} wurde zu ${target.new} umbenannt`);
            embed.setColor(color);
            return embed;

        case 'get-team':
            color = 0x2090FF; // blue for displaying
            embed.setTitle(target.name);
            embed.setColor(color);

            embed.addFields(
                { name: 'Spieler', value: target.players.join(', ') || '-' },
                { name: 'Ergebnisse', value: target.results.join(', ') || '-' }
            );
            return embed;

        case 'delete-team':
            color = 0xFF2020; // red for deletion

            embed.setTitle(`${target.name} wurde gelöscht`);
            embed.addFields({ name: 'Folgende Spieler wurden nach Unsorted verschoben', value: target.affectedPlayers.join(', ') || '-' });
            embed.setColor(color);
            return embed;

        case 'create-result':
            color = 0x00FF00; // green for creation
            embed.setTitle(`${target.split} wurde erstellt`);
            embed.setColor(color);

            embed.addFields(
                {
                    name: 'Kaliphase',
                    value: `Gruppe ${target.data.kaliphase.group} | Ergebnis ${target.data.kaliphase.result}`
                },
                {
                    name: 'Gruppenphase',
                    value: `Gruppe ${target.data.groupphase.group} | Ergebnis ${target.data.groupphase.result}`
                },
                {
                    name: 'Playoffs',
                    value: `Gruppe ${target.data.playoffs.group} | Ergebnis ${target.data.playoffs.result}`
                },

            );
            return embed;
        case 'edit-result':
            color = 0x2090FF; // blue for displaying
            embed.setTitle("not set");
            embed.setColor(color);
            return embed;

        case 'get-result':
            color = 0x2090FF; // blue for displaying
            embed.setTitle("not set");
            embed.setColor(color);
            return embed;

        case 'delete-result':
            color = 0xFF2020; // red for deletion

            embed.setTitle(`${target.split} aus ${target.team} gelöscht`);
            embed.setColor(color);
            return embed;

        case 'get-all-players':
            color = 0x2090FF; // red for deletion

            embed.setTitle(`Alle existierenden Spieler`);
            embed.addFields(
                {name: "", value: target.join(', ') || '-'}
            )
            embed.setColor(color);
            return embed;
    }
}

function formatOrgaRoles(role1, role2) {
    const roles = [role1, role2].filter(role => role !== '-'); // Entferne leere Rollen
    return roles.length > 0 ? roles.join(" / ") : "-";
}

function formatSocialLink(url, platform) {
    return url === '-' ? '-' : `[${platform}](${url})`;
}

module.exports = { constructEmbed };
