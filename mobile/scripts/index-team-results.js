// team IDs corresponding to team specific part of json file name
var IDs = ["ibtc", "ibty", "ibtp", "ff", "ice"];

// results container for table
var resultsElement = $('.split-results');

function load_results(){

// handle every team
for (let i = 0; i < IDs.length; i++) {
    //json filepath
    var resultsFilePath = `/team-results/${IDs[i]}_results.json`;
    
    //elements in results container
    var splitHeaderElement = $('.split-header');
    let divElement = $(`#${IDs[i]}_div`);
    let rangElement = $(`#${IDs[i]}_rang`);


    fetch(resultsFilePath)
    .then(response => {
    if(!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
    })
    .then(parsedData => {

    //save json content as array
    const ElementArray = Object.keys(parsedData);

    //save content from json to corresponding html element
    divElement.text(parsedData[ElementArray[0]].Gruppenphase.Gruppe);
    rangElement.text(parsedData[ElementArray[0]].Gruppenphase.Ergebnis);

    })
    .catch(error =>{
        console.error(`index-team-results: ${IDs[i]} JSON Fehler!`,error);
    });
    console.log(`loaded ${IDs[i]} results`);
}
}