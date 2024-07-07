var filePath = 'vereinssatzung.txt';
$.ajax({
    url: filePath,
    dataType: "text",
    success: function (data) {
        console.log("club statutes file loaded successfully");

        var sections = parseFileContent(data);
       
        $("#vereinssatzungsFeld").text(data);
       
    },
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
