function createPlayerInJSON(jsonData, player) {
    console.log('~ createPlayerInJSON');

    // player existence check in teams
    for (const team in jsonData.Teams) {
        if (jsonData.Teams[team].Players[player['player-name']]) {
            console.log('❌ Team Spieler existiert bereits in JSON!');
            throw new Error('❌ Spieler existiert bereits!');
        }
    }
    // player existence check in unsorted
    if (jsonData.Unsorted[player['player-name']]) {
        console.log('❌ Unsorted Spieler existiert bereits in JSON!');
        throw new Error('❌ Spieler existiert bereits!');
    }


    try{
    // Unsorted Player
    if (player.team == '-') {
        
        jsonData.Unsorted[player['player-name']] = {
            "discord-id": player['discord-id'],
            "main-role": player['main-role'],
            "orga-role-1": player['orga-role-1'],
            "orga-role-2": player['orga-role-2'],
            "instagram": player.instagram,
            "tiktok": player.tiktok,
            "twitter": player.twitter,
            "twitch": player.twitch,
            "youtube": player.youtube,
            "team": player.team,
        }
    }
    // Team Player
    else {
        
        jsonData.Teams[player.team].Players[player['player-name']] = {
            "discord-id": player['discord-id'],
            "main-role": player['main-role'],
            "orga-role-1": player['orga-role-1'],
            "orga-role-2": player['orga-role-1'],
            "instagram": player.instagram,
            "tiktok": player.tiktok,
            "twitter": player.twitter,
            "twitch": player.twitch,
            "youtube": player.youtube,
            "team": player.team,
        }
    }
    }
    catch(err){
        console.error("❌ Fehler beim Hinzufügen des Spielers zur JSON:", err);
        throw new Error("❌ Fehler beim Hinzufügen des Spielers");
    }
}
module.exports = { createPlayerInJSON };