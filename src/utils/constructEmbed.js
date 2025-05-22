const { EmbedBuilder } = require('discord.js');

function constructEmbed(actionType, target, result) {
    console.log('~ constructEmbed');
    let color = 0x000000;
    let embed = new EmbedBuilder();
    const playerList = null;
    const resultList = null;

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
            break;

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
            break;

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
            break;

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
            embed.setTitle(`${target['team-name']} wurde erstellt`);
            embed.setColor(color);
            

            playerList = Object.keys(target['team-name'].Players).join(', ') || '-';
            resultList = Object.keys(target['team-name'].Results).join('\n') || '-';
            embed.addFields(
                { name: 'Spieler', value: playerList },
                //{ name: '\u200B', value: '\u200B' }, // visual spacing
                { name: 'Ergebnisse', value: resultList }
            );
            break;

        case 'edit-team':
            color = 0xFFA500; // orange for editing
            embed.setTitle(`🔄${target['team-name']} wurde aktualisiert`);
            embed.setColor(color);
            return embed;

        case 'get-team':
            color = 0x2090FF; // blue for displaying
            embed.setTitle(target['team-name']);
            embed.setColor(color);

            playerList = Object.keys(target['team-name'].Players).join(', ') || '-';
            resultList = Object.keys(target['team-name'].Results).join('\n') || '-';
            embed.addFields(
                { name: 'Spieler', value: playerList },
                //{ name: '\u200B', value: '\u200B' }, // visual spacing
                { name: 'Ergebnisse', value: resultList }
            );
            break;

        case 'delete-team':
            color = 0xFF2020; // red for deletion
            if (!target.team || target.team === '-') {
                embed.setTitle(`${target['team-name']} wurde gelöscht`);
            } else {
                embed.setTitle(`${target['team-name']} wurde aus ${target.team} gelöscht`);
            }
            embed.setColor(color);
            return embed;

        case 'create-result':
            color = 0x00FF00; // green for creation
            embed.setTitle(`${target['result-name']} wurde erstellt`);
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
            break;
        case 'edit-result':
            color = 0xFFA500; // orange for editing
            embed.setTitle(`🔄${target['result-name']} wurde aktualisiert`);
            embed.setColor(color);
            break;

        case 'get-result':
            color = 0x2090FF; // blue for displaying
            embed.setTitle(target['result-name']);
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
            break;

        case 'delete-result':
            color = 0xFF2020; // red for deletion
            if (!target.team || target.team === '-') {
                embed.setTitle(`${target['result-name']} wurde gelöscht`);
            } else {
                embed.setTitle(`${target['result-name']} wurde aus ${target.team} gelöscht`);
            }
            embed.setColor(color);
            return embed;

        default:
            throw new Error('Ungültiger Embed-Typ');
    }

    console.log(embed);

    return embed;
}

function formatOrgaRoles(role1, role2) {
    const roles = [role1, role2].filter(role => role !== '-'); // Entferne leere Rollen
    return roles.length > 0 ? roles.join(" / ") : "-";
}

function formatSocialLink(url, platform) {
    return url === '-' ? '-' : `[${platform}](${url})`;
}

module.exports = { constructEmbed };
