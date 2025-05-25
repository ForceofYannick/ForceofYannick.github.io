function deletePlayerFromJSON(jsonData, player) {
    console.log('~ deletePlayerFromJSON');
    if (player.team == '-') {
        console.log("Unsorted Spieler wird gelöscht!");
        delete jsonData.Unsorted[player['player-name']];
    }
    else {
        console.log("Team Spieler wird gelöscht!");
        console.log(player);
        delete jsonData.Teams[player.team].Players[player['player-name']];
    }
}

module.exports = { deletePlayerFromJSON };