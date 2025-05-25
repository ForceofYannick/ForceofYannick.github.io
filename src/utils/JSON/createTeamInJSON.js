async function createTeamInJSON(jsonData, team) {
  console.log('~ createTeamInJSON');
  const name = team.name;

  if (jsonData.Teams?.[name]) {
    throw new Error(`❌ Team '${name}' existiert bereits!`);
  }

  // Falls es kein "Teams" Objekt gibt, anlegen
  if (!jsonData.Teams) jsonData.Teams = {};

  jsonData.Teams[name] = {
    Players: {},
    Results: {}
  };
}

module.exports = createTeamInJSON;
