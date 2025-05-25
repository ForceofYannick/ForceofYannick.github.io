const { devs, testServer, allowedRoles } = require('../../../config.json');
const getLocalCommands = require('../../utils/getLocalCommands');

module.exports = async (client, interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const localCommands = getLocalCommands();

  try {
    const commandObject = localCommands.find(
      (cmd) => cmd.name === interaction.commandName
    );

    if (!commandObject) return;

    if (commandObject.devOnly) {
      if (!devs.includes(interaction.member.id)) {
        interaction.reply({
          content: '❗ Only developers are allowed to run this command.',
          ephemeral: true,
        });
        return;
      }
    }

    if (commandObject.testOnly) {
      if (!(interaction.guild.id === testServer)) {
        interaction.reply({
          content: '❌ This command cannot be ran here.',
          ephemeral: true,
        });
        return;
      }
    }

    // GLOBALER Rollen-Check: Nur User mit einer Rolle aus allowedRoles dürfen Commands nutzen
    if (allowedRoles?.length) {
      const memberRoles = interaction.member.roles.cache;
      const hasAllowedRole = memberRoles.some(role => allowedRoles.includes(role.id));
      if (!hasAllowedRole) {
        interaction.reply({
          content: '❌ Du hast nicht die nötige Rolle, um Befehle auszuführen.',
          ephemeral: true,
        });
        return;
      }
    }

    if (commandObject.permissionsRequired?.length) {
      for (const permission of commandObject.permissionsRequired) {
        if (!interaction.member.permissions.has(permission)) {
          interaction.reply({
            content: '⚠️ Not enough permissions.',
            ephemeral: true,
          });
          return;
        }
      }
    }

    if (commandObject.botPermissions?.length) {
      for (const permission of commandObject.botPermissions) {
        const bot = interaction.guild.members.me;

        if (!bot.permissions.has(permission)) {
          interaction.reply({
            content: "⚠️ I don't have enough permissions.",
            ephemeral: true,
          });
          return;
        }
      }
    }

    await commandObject.callback(client, interaction);
  } catch (error) {
    console.log(`❌ /${interaction.commandName} : There was an error running this command: ${error}`);
  }
};
