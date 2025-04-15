function deletePlayerFromJSON(jsonData, player) {
    console.log('~ deletePlayerFromJSON');
    if (player.team == '-') {
        console.log("unsorted");
        delete jsonData.Unsorted[player['player-name']];
    }
    else {
        console.log("team");
        console.log(player);
        delete jsonData.Teams[player.team].Players[player['player-name']];
    }
}

module.exports = { deletePlayerFromJSON };