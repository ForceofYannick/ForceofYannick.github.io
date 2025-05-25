const fs = require("fs").promises;
async function getTeamFromJSON(teamName) {
    console.log(`~ getTeamFromJSON ${teamName}`);

        const rawData = await fs.readFile("data.json", "utf8");
        const jsonData = JSON.parse(rawData);

        // Wenn vorhanden, gib aus, 
        if(jsonData.Teams[teamName]){
            return jsonData.Teams[teamName];
        }
        // sonst  null
        console.log(`Team ${teamName} nicht in JSON gefunden`);
    return null; // Team nicht gefunden
}

module.exports = {getTeamFromJSON};