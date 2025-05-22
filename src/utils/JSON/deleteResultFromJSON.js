function deleteResultFromJSON(jsonData, team, result) {
    console.log('~ deleteResultFromJSON');
    if(!jsonData.Teams[team].Results[result]) {
        console.log("result not found");
        return;
    }
    else {
        delete jsonData.Teams[team].Results[result];
        console.log("Removed "+result+" from "+team);
    }
}
module.exports = { deleteResultFromJSON };