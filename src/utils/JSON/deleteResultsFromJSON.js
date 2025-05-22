function deletePlayerFromJSON(jsonData, team, result) {
    console.log('~ deleteResultsFromJSON');
    if(!jsonData.Teams[team].Results[result]) {
        console.log("result not found");
        return;
    }
    else {
        delete jsonData.Teams[team].Results[result];
        console.log("Removed "+result+" from "+team);
    }
}
module.exports = { deletePlayerFromJSON };