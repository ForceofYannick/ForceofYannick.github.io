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

    //Filepath for results file
    var resultsElement = $('.results-container');
    var resultsId = resultsElement.attr('id');

    var resultsFilePath = `/team-results/${resultsId}_results.json`;
    
    //read file
    console.log("Triggering results AJAX call");
$.ajax({
    url: resultsFilePath,
    dataType: "text",
    
    //when results file is found
    success: function (file) {
        console.log("Results file found!");

        var sectionMarker = '=&=';
        var headlines = 0;


        //split the results file whenever ther is "\n" (at the end of erver line)
        var linearray = file.split('\n');

        //for every line in the linearray
        for (var line = 0; line < linearray.length; line++) {
            
            //if the current line doesn't contain the sectionMarker => Headline or empty line
            if (!linearray[line].includes(sectionMarker)) {

                //if the line is not completly empty -> Headline
                if(linearray[line] !== "\n" && linearray[line].trim() !== ""){

                //update the headlines var
                headlines++;
                console.log("headlines "+headlines);
                var tableID = `collapse${headlines}`;
                
                //create an collapsible element with the beginning of the content table and append it to the container element

                    if(headlines==1){
                        resultsElement.append(`
                            <div class='collapsible results-header' onclick="toggleCollapse('${tableID}')">
                            ${linearray[line]}  <i class='fa fa-caret-down'></i>
                           </div>
                           <table id='${tableID}' style='display: block; box-shadow: 0px 0px 10px 2px #0ea20073;'>
                           </table>
                             `); 
                    }
                    else{
                        resultsElement.append(`
                            <div class='collapsible results-header' onclick="toggleCollapse('${tableID}')">
                            ${linearray[line]}  <i class='fa fa-caret-down'></i>
                           </div>
                           <table id='${tableID}' style='display: none; box-shadow: 0px 0px 10px 2px #0ea20073;'>
                           </table>
                             `);
                    }

    
                }

                //if the line is completly empty
                else{

                    console.log(line+" empty line ("+(line+1)+")");
                }
            
            //if the current line contains the sectionMarker
            } else {

                //split the line into sections whenever ther is a sectionMarker
                var sectionarray = linearray[line].split(sectionMarker);

                //the beginning html element for a new row in the table
                var rowHTML = '<tr class="results-item" style="color: white">';



                //for every section in the sectionarray of the current line
                for (var section = 0; section < sectionarray.length; section++) {

                   
                        //append the section as new td element in the current table row
                        //...
                        rowHTML += `<td class="results-item-content">${sectionarray[section]}</td>`;
                    //}
                }

                //end the current table row with the corresponding html element
                rowHTML += "</tr>";

                //and append the newly created row to the table
                $(`#${tableID}`).append(rowHTML);
            }
        }
    },
    //if the gameplan file wasn't found
    error: function (file) {
        console.error("Error loading results file");
        
        //append a div element containing an error message to the table 
        $(".results-container").append('<div style="color:white"><p>INSHALLA WO DATEI BRUDER???</p></div>');
    }
});
});



