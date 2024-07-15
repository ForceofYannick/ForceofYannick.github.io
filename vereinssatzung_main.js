//filepath to the vereinssatzung file
var filePath = 'vereinssatzung.txt';

$.ajax({
    url: filePath,
    dataType: "text",
    
    //when file found
    success: function (file) {
        console.log("File loaded successfully");

        var sectionMarker = '=&=';

        //split the file whenever ther is a '\n'
        var linearray = file.split('\n');

        //for every line in the linearray
        for (var line = 0; line < linearray.length; line++) {
            
            //if line includes the section marker
            if(linearray[line].includes(sectionMarker)){
                
                //append a paragraph with linebreak
                $("#vereinssatzungsFeld").append(`<p><br></p>`);
            }
            else if(linearray[line].includes('§')){
                console.log(line);
            $("#vereinssatzungsFeld").append(`<h1 id="§${line}"><em> ${linearray[line]}</em></h1>`);
            }
            else{
                //else append the linearray content from the current line
            $("#vereinssatzungsFeld").append(`<p> ${linearray[line]}</p>`);
            }
            
        }
    },
    //If file not found
    error: function (file) {
        console.error("Error loading file");
        $("#vereinssatzungsFeld").text("Vereinssatzung not found")
    }
});