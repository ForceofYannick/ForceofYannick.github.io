function comparePlayersAndMakeNew(oldPlayer, inputPlayer) {
    console.log('~ comparePlayersAndMakeNew');
    let newPlayer = {};

    for (const property in inputPlayer) {
        // Sonderfall: team = "delete"
        if (property === "team" && inputPlayer[property].toLowerCase() === "delete") {
            newPlayer[property] = "-";
        }
        // normaler Fall: Eingabe ist gültig (nicht "-")
        else if (inputPlayer[property] !== "-" && inputPlayer[property] !== null && inputPlayer[property] !== undefined) {
            newPlayer[property] = inputPlayer[property];
        }
        // falls "-" → alten Wert übernehmen
        else {
            newPlayer[property] = oldPlayer[property];
        }
    }

    return newPlayer;
}

module.exports = { comparePlayersAndMakeNew }; 