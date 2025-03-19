const { testServer } = require('../../../config.json');
const areCommandsDifferent = require('../../utils/areCommandsDifferent');
const getApplicationCommands = require('../../utils/getApplicationCommands');
const getLocalCommands = require('../../utils/getLocalCommands');

module.exports = async (client) => {
  try {
    const localCommands = getLocalCommands();
    const applicationCommands = await getApplicationCommands(client, testServer);

    // Lösche ALLE veralteten Befehle, die nicht mehr in den lokalen Dateien existieren
    for (const command of applicationCommands.cache.values()) {
      if (!localCommands.some((localCommand) => localCommand.name === command.name)) {
        await applicationCommands.delete(command.id);
        console.log(`❌🗑️ Deleted old command "${command.name}".`);
      }
    }

    // Registriere oder aktualisiere aktuelle Befehle
    for (const localCommand of localCommands) {
      const { name, description, options } = localCommand;

      const existingCommand = applicationCommands.cache.find((cmd) => cmd.name === name);

      if (existingCommand) {
        if (areCommandsDifferent(existingCommand, localCommand)) {
          await applicationCommands.edit(existingCommand.id, { description, options });
          console.log(`✏️ Edited command "${name}".`);
        }
      } else {
        await applicationCommands.create({ name, description, options });
        console.log(`📌 Registered command "${name}".`);
      }
    }
  } catch (error) {
    console.log(`❌ There was an error: ${error}`);
  }
};
