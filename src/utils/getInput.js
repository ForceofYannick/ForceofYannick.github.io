function getInput(interaction, inputName) {
    console.log(`~ getInput ${inputName}`);
    // Input exists
    if (interaction.options.get(inputName)) {
        // Input is String
        if (interaction.options.get(inputName).type == 3) {
            console.log(`${interaction.options.get(inputName).value.toLowerCase()}`);
            return interaction.options.get(inputName).value.toLowerCase();
        }

        // Input is number
        if (interaction.options.get(inputName).type == 10) {
            console.log(`${interaction.options.get(inputName).value}`);
            return interaction.options.get(inputName).value;
        }
    }
    // Input doesn't exist or has wrong type
    console.log(`-`);
        return '-';
}
module.exports = {getInput};