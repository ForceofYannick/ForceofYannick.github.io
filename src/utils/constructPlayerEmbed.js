const { EmbedBuilder } = require('discord.js');

function constructPlayerEmbed(type, player) {
    console.log('~ constructPlayerEmbed');
    let color = 0x000000;
    let embed = new EmbedBuilder();

    // embed color based on type
    switch (type) {
        case 'create':
            color = 0x00FF00; // green for creation
            embed.setTitle(`${player['player-name']} wurde erstellt`);
            break;
        case 'edit':
            color = 0xFFA500; // orange for editing
            embed.setTitle(`🔄${player['player-name']} wurde aktualisiert`);
            break;
        case 'get':
            color = 0x2090FF; // blue for displaying
            embed.setTitle(player['player-name']);
            break;
        case 'delete':
            color = 0xFF2020; // red for deletion
            if (!player.team || player.team === '-') {
                embed.setTitle(`${player['player-name']} wurde gelöscht`);
            } else {
                embed.setTitle(`${player['player-name']} wurde aus ${player.team} gelöscht`);
            }
            return embed.setColor(color);
        default:
            throw new Error('Ungültiger Embed-Typ');
    }
    embed.setColor(color);

    embed.addFields(
        {
            name: 'Discord Name',
            value: player['discord-id'] === '-' ? '-' : `<@${player['discord-id']}>`
        },
        {
            name: 'Team',
            value: player.team
        },
        {
            name: 'Hauptrolle',
            value: player['main-role']
        },
        {
            name: 'Organisatorische Rollen',
            value: formatOrgaRoles(player['orga-role-1'], player['orga-role-2'])
        },
        {
            name: 'Instagram',
            value: formatSocialLink(player.instagram, 'Instagram'),
            inline: true
        },
        {
            name: 'TikTok',
            value: formatSocialLink(player.tiktok, 'TikTok'),
            inline: true
        },
        {
            name: 'Twitter',
            value: formatSocialLink(player.twitter, 'Twitter'),
            inline: true
        },
        {
            name: 'Twitch',
            value: formatSocialLink(player.twitch, 'Twitch'),
            inline: true
        },
        {
            name: 'YouTube',
            value: formatSocialLink(player.youtube, 'YouTube'),
            inline: true
        }
    );
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

module.exports = { constructPlayerEmbed };
