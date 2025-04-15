function inputExists(interaction, inputName){
    console.log('~ inputExists');
    return (interaction.options.get(inputName)) ? true : false;
}
module.exports = {inputExists};