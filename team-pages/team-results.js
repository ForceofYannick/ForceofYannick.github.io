    //toggle result visibility
    function toggleCollapse(collapseElement){
        if($(`#${collapseElement}`).css("display") === "none"){
            console.log("Element gefunden. none -> block");
            $(`#${collapseElement}`).css("display", "block");
        }
        else{
            console.log("Element gefunden. block -> none");
            $(`#${collapseElement}`).css("display", "none");
        }
    }

$(document).ready(function() {
    
    //Filepath for results JSON
    var resultsElement = $('.results-container');
    var resultsId = resultsElement.attr('id');

    // var resultsFilePath = `/team-results/${resultsId}_results.json`;
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
    
    //Zugriff auf erstes Element und dessen Objekte
    const ElementArray = Object.keys(parsedData);
    
    //
    for(var i=0;i<ElementArray.length;i++){
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
    }
    
    
    console.log(Object.keys(parsedData).length);    
    })
    .catch(error =>{
        console.error('Fehler beim Laden der JSON',error);
    });

});



