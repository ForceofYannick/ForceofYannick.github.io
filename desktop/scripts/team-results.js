    //toggle result visibility
    function toggleCollapse(collapseElement){
        if($(`#${collapseElement}`).css("display") === "none"){
            console.log("Element gefunden. none -> flex");
            $(`#${collapseElement}`).css("display", "flex");
            $(`#caret-container${collapseElement}`).css("rotate", "0deg");
        }
        else{
            console.log("Element gefunden. flex -> none");
            $(`#${collapseElement}`).css("display", "none");
            $(`#caret-container${collapseElement}`).css("rotate", "-90deg");

        }
    }

$(document).ready(function() {
    
    //Filepath for results JSON
    var resultsElement = $('.results-container');
    var resultsId = resultsElement.attr('id');

    var resultsFilePath = `/team-results/${resultsId}_results.json`;
    
    //Fetch JSON
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
            <table id='${tableID}' style='display: flex; justify-content: center; box-shadow: 0px 0px 10px 2px #0ea20073;'>
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
        console.error('!!!INSHALLA DA IS EIN FEHLER BEI JSON DATEI BRUDER!!!',error);
    });

});







        /*
        console.log(ElementArray[i]); 
        console.log("Kalibrierungsphase");
        console.log("Gruppe: "+parsedData[ElementArray[i]].Kalibrierungsphase.Gruppe);
        console.log("Ergebnis: "+parsedData[ElementArray[i]].Kalibrierungsphase.Ergebnis);
        console.log("Gruppenphase");
        console.log("Gruppe: "+parsedData[ElementArray[i]].Gruppenphase.Gruppe);
        console.log("Ergebnis: "+parsedData[ElementArray[i]].Gruppenphase.Ergebnis);
        console.log("Playoffs");
        console.log("Gruppe: "+parsedData[ElementArray[i]].Playoffs.Gruppe);
        console.log("Ergebnis: "+parsedData[ElementArray[i]].Playoffs.Ergebnis);
        */