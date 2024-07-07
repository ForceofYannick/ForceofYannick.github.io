//filepath to the vereinssatzung file
var filePath = 'vereinssatzung.txt';

$.ajax({
    url: filePath,
    dataType: "text",

    //when file is found
    success: function (data) {
        console.log("club statutes file loaded successfully");

        var sections = parseFileContent(data);
       
        $("#vereinssatzungsFeld").text(data);
       
    },

    //when file is not found
    error: function (data) {
        console.error("Error loading club statutes file");
       
    }
});

 //textfile parser
 function parseFileContent(data) {
    var lines = data.split("\n");
    var sections = {};
    var currentLabel = null;
    var currentContent = [];
    return sections;
}
