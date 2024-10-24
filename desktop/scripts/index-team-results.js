$(document).ready(function() {
    
    //Filepath for results JSON
    var resultTable = $('table');

    var ibtcPath = `/team-results/ibtc_results.json`;
    var ibtyPath = `/team-results/ibty_results.json`;
    var ibtgPath = `/team-results/ibtg_results.json`;
    var ibtaPath = `/team-results/ibta_results.json`;
    var icePath = `/team-results/ice_results.json`;
    
    //Fetch JSON
fetch(ibtcPath)
    .then(response => {
        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(parsedData => {
    //save content as array
    const ElementArray = Object.keys(parsedData);
        //find td element with id ibtc_div and replace inner html
        $('#ibtc_div').text(parsedData[ElementArray[0]].Playoffs.Gruppe);

        //find td element with id ibtc_rang and replace inner html
        $('#ibtc_rang').text(parsedData[ElementArray[0]].Playoffs.Ergebnis);
    })
    .catch(error =>{
        console.error('!!!INSHALLA DA IS EIN FEHLER BEI JSON DATEI BRUDER!!!',error);
    });
    //==============================================================================================
    fetch(ibtyPath)
    .then(response => {
        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(parsedData => {
    //save content as array
    const ElementArray = Object.keys(parsedData);
        //find td element with id ibtc_div and replace inner html
        $('#ibty_div').text(parsedData[ElementArray[0]].Playoffs.Gruppe);

        //find td element with id ibtc_rang and replace inner html
        $('#ibty_rang').text(parsedData[ElementArray[0]].Playoffs.Ergebnis);
    })
    .catch(error =>{
        console.error('!!!INSHALLA DA IS EIN FEHLER BEI JSON DATEI BRUDER!!!',error);
    });
    //==============================================================================================
    fetch(ibtgPath)
    .then(response => {
        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(parsedData => {
    //save content as array
    const ElementArray = Object.keys(parsedData);
        //find td element with id ibtc_div and replace inner html
        $('#ibtg_div').text(parsedData[ElementArray[0]].Playoffs.Gruppe);

        //find td element with id ibtc_rang and replace inner html
        $('#ibtg_rang').text(parsedData[ElementArray[0]].Playoffs.Ergebnis);
    })
    .catch(error =>{
        console.error('!!!INSHALLA DA IS EIN FEHLER BEI JSON DATEI BRUDER!!!',error);
    });
    //==============================================================================================
    fetch(ibtaPath)
    .then(response => {
        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(parsedData => {
    //save content as array
    const ElementArray = Object.keys(parsedData);
        //find td element with id ibtc_div and replace inner html
        $('#ibta_div').text(parsedData[ElementArray[0]].Playoffs.Gruppe);

        //find td element with id ibtc_rang and replace inner html
        $('#ibta_rang').text(parsedData[ElementArray[0]].Playoffs.Ergebnis);
    })
    .catch(error =>{
        console.error('!!!INSHALLA DA IS EIN FEHLER BEI JSON DATEI BRUDER!!!',error);
    });
    //==============================================================================================
    fetch(icePath)
    .then(response => {
        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(parsedData => {
    //save content as array
    const ElementArray = Object.keys(parsedData);
        //find td element with id ibtc_div and replace inner html
        $('#ice_div').text(parsedData[ElementArray[0]].Playoffs.Gruppe);

        //find td element with id ibtc_rang and replace inner html
        $('#ice_rang').text(parsedData[ElementArray[0]].Playoffs.Ergebnis);
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