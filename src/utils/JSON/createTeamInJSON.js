async function createTeamInJSON(jsonData, team) {
  const name = team.name;

  if (jsonData.Teams?.[name]) {
    throw new Error(`❌ Team '${name}' already exists!`);
  }

  // Falls es kein "Teams" Objekt gibt, anlegen
  if (!jsonData.Teams) jsonData.Teams = {};

  jsonData.Teams[name] = {
    Players: {},
    Results: {}
  };
}

module.exports = createTeamInJSON;
