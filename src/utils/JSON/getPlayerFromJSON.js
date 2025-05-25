const fs = require("fs").promises;
async function getPlayerFromJSON(playerName) {
    console.log(`~ getPlayerFromJSON ${playerName}`);

        const rawData = await fs.readFile("data.json", "utf8");
        const jsonData = JSON.parse(rawData);

        // Suche in Teams
        for (const currentTeam in jsonData.Teams) {
            if (jsonData.Teams[currentTeam].Players[playerName]) {
                return { 'player-name': playerName, ...jsonData.Teams[currentTeam].Players[playerName] };
            }
        }

        // Suche in Unsorted
        if (jsonData.Unsorted[playerName]) {
            return { 'player-name': playerName, ...jsonData.Unsorted[playerName] };
        }
    
        console.log(`Spieler ${playerName} nicht in JSON gefunden`);
    return null; // Spieler nicht gefunden
}

module.exports = {getPlayerFromJSON};