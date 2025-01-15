// team IDs corresponding to team specific part of json file name
var IDs = ["ibtc", "ibty", "ibtp", "ff", "ice"];

//Filepath for results JSON
var resultsElement = $('.results-container');

function load_results(){

for (var i = 0; i < IDs.length; i++) {
    var resultsFilePath = `/team-results/${IDs[i]}_results.json`;

    fetch(resultsFilePath)
.then(response => {
    if(!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
})
.then(parsedData => {

//save content as array
const ElementArray = Object.keys(parsedData);

//go through array
for(var i=0;i<ElementArray.length;i++){
    
    //construct the id for the current element, used for collapsing function
    var tableID = `collapse${i}`;

    //build the element and append to the results container
    resultsElement.append(`
        <div class='collapsible results-header' onclick="toggleCollapse('${tableID}')">
                        ${ElementArray[i]}  <i id='caret-container${tableID}' class='fa fa-caret-down'></i>
                       </div>
        <table id='${tableID}' style='display: block; box-shadow: 0px 0px 10px 2px #0ea20073;'>
                <tr class="results-item" style="color: white">       
                    <td class="results-item-content">Stage</td>
                    <td class="results-item-content">Gruppe</td>
                    <td class="results-item-content">Ergebnis</td>
                </tr>
                <tr class="results-item" style="color: white">       
                    <td class="results-item-content">Kalibrierungsphase</td>
                    <td class="results-item-content">${parsedData[ElementArray[i]].Kalibrierungsphase.Gruppe}</td>
                    <td class="results-item-content">${parsedData[ElementArray[i]].Kalibrierungsphase.Ergebnis}</td>
                </tr>
                <tr class="results-item" style="color: white">       
                    <td class="results-item-content">Gruppenphase</td>
                    <td class="results-item-content">${parsedData[ElementArray[i]].Gruppenphase.Gruppe}</td>
                    <td class="results-item-content">${parsedData[ElementArray[i]].Gruppenphase.Ergebnis}</td>
                </tr>
                <tr class="results-item" style="color: white">       
                    <td class="results-item-content">Playoffs</td>
                    <td class="results-item-content">${parsedData[ElementArray[i]].Playoffs.Gruppe}</td>
                    <td class="results-item-content">${parsedData[ElementArray[i]].Playoffs.Ergebnis}</td>
                </tr>
        </table>
        `);
        
}
})
.catch(error =>{
    console.error(`index-team-results: ${IDs[i]} JSON Fehler!`,error);
});
console.log(`Loaded ${IDs[i]}`);
}
}