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
$(document).ready(function(){
    $(window).scroll(function(){
        var scroll = $(window).scrollTop();
        if (scroll > 300) {
          $(".navbar").css({background: "-webkit-gradient(linear, left top, left bottom, from(#00000080), to(#ffffff00))"});
          $(".navbar").css({"backdrop-filter":"blur(35px)"});
        }
  
        else{
            $(".navbar").css({background: "-webkit-gradient(linear, left top, left bottom, from(#00000080), to(#ffffff00))"});  	
        }
    })
  });