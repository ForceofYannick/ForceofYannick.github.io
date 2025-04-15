function comparePlayersAndMakeNew(oldPlayer, inputPlayer) {
    console.log('~ comparePlayersAndMakeNew');
    // empty player object
    let newPlayer = {};
    console.log(oldPlayer);
    console.log(inputPlayer);

    // check ever property of inputPlayer
    for (const property in inputPlayer) {

        // if property is not empty ('-')
        if (inputPlayer[property] != '-') {
            // save to newPlayer
            newPlayer[property] = inputPlayer[property];
        }
        // else save oldPlayer to newPlayer
        else {
            newPlayer[property] = oldPlayer[property];
        }
    }

    console.log(newPlayer);
    return newPlayer;
}
module.exports = { comparePlayersAndMakeNew };