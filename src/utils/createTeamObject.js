const { getInput } = require('./getInput');

function createTeamObject(interaction) {
  console.log('~ createTeamObject');
  const teamName = getInput(interaction, "team-name");
  return {
    [teamName]: {
      Players: {},
      Results: {}
    }
  };
}

module.exports = { createTeamObject };
