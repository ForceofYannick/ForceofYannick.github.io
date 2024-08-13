function toggleCollapse(collapseElement){
    if($(`#${collapseElement}`).css("display") === "none"){
        console.log("Element gefunden");
        $(`#${collapseElement}`).css("display", "block");
    }
    else{
        console.log("Element gefunden");
        $(`#${collapseElement}`).css("display", "none");
    }
}


//filepath to the gameplan file
var gameplanFilePath = "ibtc_results.txt";

console.log("Triggering gameplan AJAX call");

$.ajax({
    url: gameplanFilePath,
    dataType: "text",
    
    //when gameplan file is found
    success: function (file) {
        console.log("Gameplan file loaded successfully");

        var sectionMarker = '=&=';


        //split the gameplan file whenever ther is "\n" (at the end of erver line)
        var linearray = file.split('\n');

        //for every line in the linearray
        for (var line = 0; line < linearray.length; line++) {
            
            //if the current line doesn't contain the sectionMarker
            if (!linearray[line].includes(sectionMarker)) {
                
                //append the text to the "table" element
                $("table").append(`<tr><th class="gameplan-header" colspan="3">${linearray[line]}</th></tr>`);
            
            //if the current line does contain the sectionMarker
            } else {
                
                //split the line into sections whenever ther is a sectionMarker
                var sectionarray = linearray[line].split(sectionMarker);


                //depending on the current apperance mode create rowHTML with white color or without the style tag...
                //...
                if(document.getElementById('toggle-image-light') != null){
                    var rowHTML = '<tr class="gameplan-item" style="color: green">';    
                }
                else{
                    var rowHTML = '<tr class="gameplan-item" style="color: red">';
                }
                //the beginning html element for a new row in the table
                // var rowHTML = '<tr class="gameplan-item" style="color: white">';



                //for every section in the sectionarray of the current line
                for (var section = 0; section < sectionarray.length; section++) {

                    //if the current section includes ":" (for the game score)
                    if (sectionarray[section].includes(":")) {

                        //split the current section whenever ther is a ":"
                        var scorearray = sectionarray[section].split(':');
                        
                        //compare the first and second element of the scorearray and depending on their relation adjust the glow colour of the score box
                        if (Number(scorearray[0]) > Number(scorearray[1])) {
                            console.log("win");
                            //...
                            rowHTML += `<td class="gameplan-item-content" style="box-shadow: inset 0px 0px 10px 2px #0ea20073;">${sectionarray[section]}</td>`;
                        }
                        else if (Number(scorearray[0]) < Number(scorearray[1])) {
                            console.log("lose");
                            //...
                            rowHTML += `<td class="gameplan-item-content" style="box-shadow:inset 0px 0px 10px 2px #c0000080;">${sectionarray[section]}</td>`;
                        }
                        else if (Number(scorearray[0]) == Number(scorearray[1])) {
                            console.log("draw");
                            //...
                            rowHTML += `<td class="gameplan-item-content" style="box-shadow:inset 0px 0px 10px 2px #a27c0073;">${sectionarray[section]}</td>`;
                        }
                    }
                    //if the current section doesn't include a ":"
                    else {
                       
                        //append the section as new td element in the current table row
                        //...
                        rowHTML += `<td class="gameplan-item-content">${sectionarray[section]}</td>`;
                    }
                }

                //end the current table row with the corresponding html element
                rowHTML += "</tr>";

                //and append the newly created row to the table
                $("table").append(rowHTML);
            }
        }
    },
    //if the gameplan file is not found
    error: function (file) {
        console.error("Error loading gameplan file");
        
        //append a div element containing an error message to the table 
        $("table").append('<div style="color:white"><p>INSHALLA WO DATEI BRUDER???</p></div>');
    }
});