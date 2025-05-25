function getInput(interaction, inputName) {
    // Input exists
    if (interaction.options.get(inputName)) {
        // Input is String
        if (interaction.options.get(inputName).type == 3) {
            console.log(`~ getInput ${inputName} : ${interaction.options.get(inputName).value.toLowerCase()}`);
            return interaction.options.get(inputName).value.toLowerCase();
        }

        // Input is number
        if (interaction.options.get(inputName).type == 10 ||
            interaction.options.get(inputName).type == 4) {
            console.log(`~ getInput ${inputName} : ${interaction.options.get(inputName).value}`);
            return interaction.options.get(inputName).value;
        }
    }
    // Input doesn't exist or has wrong type
    console.log(`~ getInput ${inputName} : -`);
        return '-';
}
module.exports = {getInput};