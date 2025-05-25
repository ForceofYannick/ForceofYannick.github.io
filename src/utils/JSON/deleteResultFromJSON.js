function deleteResultFromJSON(jsonData, team, result) {
    console.log('~ deleteResultFromJSON');
    if(!jsonData.Teams[team].Results[result]) {
        console.log(`Result nicht in ${team} gefunden`);
        return;
    }
    else {
        delete jsonData.Teams[team].Results[result];
        console.log(result+" aus "+team+" gelöscht!");
    }
}
module.exports = { deleteResultFromJSON };