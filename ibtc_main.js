
//when a player box is clicked, the id from the clicked box corresponds to the filename of the player
function openProfile(id) {
    console.log("openProfile triggered with id:", id);

//get the detailed player box and display it as block
    document.getElementById('profile-detail').style.display = 'block';

//filepath to the playerfile
    var playerFilePath = "/player-files/" + id + ".txt";

    $.ajax({
        url: playerFilePath,
        dataType: "text",
        
        //when file (data) is found
        success: function (data) {
            console.log("Player file loaded successfully");

            //split the file into sections via the parseFileContent function
            var sections = parseFileContent(data);

            //a counter for the social sections in the player file
            var socialsCount = 0;
            
            //for every section found, increase counter
            socialsCount += (sections.youtube != null) ? 1 : 0;
            socialsCount += (sections.instagram != null) ? 1 : 0;
            socialsCount += (sections.twitter != null) ? 1 : 0;
            socialsCount += (sections.twitch != null) ? 1 : 0;
            socialsCount += (sections.tiktok != null) ? 1 : 0;
            
            //set column count for the social grid based on the social counter
            $("#grid-item-detail-socials-grid-container").css('grid-template-columns', 'repeat(' + socialsCount + ' auto)');

            //get the elements with the specific IDs and edit their text to the text in the corresponding file section
            $("#player-name").text(sections.name);
            $("#player-riotname").text(sections.riotname);
            $("#player-riotname").attr("href", sections.riotlink || "").attr("target", "_blank");
            $("#player-text").text(sections.text);
            $("#player-roles").text(sections.roles);

            //reset the image src attributes from the social buttons
            $("#youtube-img").removeAttr("src", "/images/Icons/youtube.png", "alt", "");
            $("#instagram-img").removeAttr("src", "/images/Icons/instagram.png", "alt", "");
            $("#twitter-img").removeAttr("src", "/images/Icons/twitter.png", "alt", "");
            $("#twitch-img").removeAttr("src", "/images/Icons/twitch.png", "alt", "");
            $("#tiktok-img").removeAttr("src", "/images/Icons/tiktok.png", "alt", "");


            //if social section exists in player file, put back the src attribute with matching path and change the redirect link 
            if (sections.hasOwnProperty("youtube")) {
                $("#player-socials").css("gap", "16px");
                $("#player-socials-youtube").attr("href", sections.youtube);
                $("#youtube-img").attr("src", "/images/Icons/youtube.png", "alt", "");
            }
            else{
                $("#player-socials").css("gap", "0px");
            }
            if (sections.hasOwnProperty("instagram")) {
                $("#player-socials-instagram").attr("href", sections.instagram);
                $("#instagram-img").attr("src", "/images/Icons/instagram.png", "alt", "");
            }
            if (sections.hasOwnProperty("twitter")) {
                $("#player-socials-twitter").attr("href", sections.twitter);
                $("#twitter-img").attr("src", "/images/Icons/twitter.png", "alt", "");
            }
            if (sections.hasOwnProperty("twitch")) {
                $("#player-socials-twitch").attr("href", sections.twitch);
                $("#twitch-img").attr("src", "/images/Icons/twitch.png", "alt", "");
            }
            if (sections.hasOwnProperty("tiktok")) {
                $("#player-socials-tiktok").attr("href", sections.tiktok);
                $("#tiktok-img").attr("src", "/images/Icons/tiktok.png", "alt", "");
            }
        },
        
        //if player file is not found
        error: function (data) {
            console.error("Error loading player file");
           
            //display the error message in the player name element and hide the social buttons
            $("#player-name").text("Player file not found");
            $("#player-riotname").text("");
            $("#player-text").text("");
            $("#player-roles").text("");
            $("#player-socials").css("visibility", "hidden");
        }
    });

    //textfile parser for file (data)
    function parseFileContent(data) {
       
        //split the file whenever ther is "\n" (at the end of every line) and save it in the "lines" array
        var lines = data.split("\n");
       
        //empty array for the sections
        var sections = {};
        var currentLabel = null;
        var currentContent = [];

        //for each element in the "lines" array
        lines.forEach(line => {
            
            //remove useless whitespace
            line = line.trim();
            
            //if the line contains the label, the var equals "true"
            var lableMatch = line.match(/^==(.+)==$/);

            //if current line contains the lable
            if (lableMatch) {
                
                //and the current content is not null
                if (currentContent) {

                    //set the section at the current lable to the currentcontent and append the "\n"
                    sections[currentLabel] = currentContent.join("\n").trim();

                    //reset the current content
                    currentContent = [];
                }
                //get next lable
                currentLabel = lableMatch[1];
            } else if (line === "==Ende==") {
                if (currentLabel) {
                    sections[currentLabel] = currentContent.join("\n").trim();
                    currentContent = [];
                    currentLabel = null;
                }
            } else {
                if (currentLabel) {
                    currentContent.push(line);
                }
            }
        });
        return sections;
    }
}

//when the little x in the detailed box is clicked
function closeProfile(profileId) {
    document.getElementById('profile-detail').style.display = 'none';
    
    //reset the image src attributes from the social buttons
    $("#youtube-img").removeAttr("src", "/images/Icons/youtube.png", "alt", "");
    $("#instagram-img").removeAttr("src", "/images/Icons/instagram.png", "alt", "");
    $("#twitter-img").removeAttr("src", "/images/Icons/twitter.png", "alt", "");
    $("#twitch-img").removeAttr("src", "/images/Icons/twitch.png", "alt", "");
    $("#tiktok-img").removeAttr("src", "/images/Icons/tiktok.png", "alt", "");
}

//filepath to the gameplan file
var gameplanFilePath = "gameplan.txt";

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

                //the beginning html element for a new row in the table
                var rowHTML = '<tr class="gameplan-item">';

                //for every section in the sectionarray of the current line
                for (var section = 0; section < sectionarray.length; section++) {

                    //if the current section includes ":" (for the game score)
                    if (sectionarray[section].includes(":")) {

                        //split the current section whenever ther is a ":"
                        var scorearray = sectionarray[section].split(':');
                        
                        //compare the first and second element of the scorearray and depending on their relation adjust the glow colour of the score box
                        if (Number(scorearray[0]) > Number(scorearray[1])) {
                            console.log("win");
                            rowHTML += `<td class="gameplan-item-content" style="box-shadow: inset 0px 0px 10px 2px #0ea20073;">${sectionarray[section]}</td>`;
                        }
                        else if (Number(scorearray[0]) < Number(scorearray[1])) {
                            console.log("lose");
                            rowHTML += `<td class="gameplan-item-content" style="box-shadow:inset 0px 0px 10px 2px #c0000080;">${sectionarray[section]}</td>`;
                        }
                        else if (Number(scorearray[0]) == Number(scorearray[1])) {
                            console.log("draw");
                            rowHTML += `<td class="gameplan-item-content" style="box-shadow:inset 0px 0px 10px 2px #a27c0073;">${sectionarray[section]}</td>`;
                        }
                    }
                    //if the current section doesn't include a ":"
                    else {
                       
                        //append the section as new td element in the current table row
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


function lightApperance(){
    $('body').css('background-color','white');
    $('.nav-item').css('color','black');                            //Navbar textcolour 
    $('.dropbtn').css('color','black');                             //Navbar dropdown button textcolour 
    $('.dropdown-content a').css('color','black');                  //Navbar dropdown content textcolour 
    $('.dropdown-content').css('background-color','grey');          //Navbar dropdown content backgroundcolour 

    $('.image-container').css('background-color','grey');           //Imagecontainer backgroundcolour
    $('.image-container:hover').css('background-color','#cd295d');  //Imagecontainer backgroundcolour on hover
    $('.profile-detail-playername').css('background-color','grey'); //Detailed playerprofile name backgroundcolour
    $('.profile-detail-roles').css('background-color','grey');      //Detailed playerprofile  roles backgroundcolour
    $('.profile-detail').css('color','black');                      //Detailed playerprofile textcolour
    $('.profile-detail-riotname').css('color','black');             //Detailed playerprofile  riotname textcolour

    $('.gameplan-container').css('background-color','grey');        //Gameplan backgroundcolour
    $('.gameplan-item').css('background-color','darkgrey');         //Gameplan cellcolour
    $('.gameplan-container').css('color','black');                  //Gameplan textcolour

    $('.content').css('color','black');                             //Textcolour on Site

    $('#toggle-image').remove();                                    //remove old image element
    $('#toggle-element').append('<img id="toggle-image" class="togglemode" onclick="darkApperance()" src="/images/Icons/dark-mode-svgrepo-com.png">'); //replace with new image element

}

function darkApperance(){
    $('body').css('background-color','#272526');
    $('.nav-item').css('color','white');                               //Navbar textcolour 
    $('.dropbtn').css('color','white');                                //Navbar dropdown button textcolour 
    $('.dropdown-content a').css('color','white');                     //Navbar dropdown content textcolour 
    $('.dropdown-content').css('background-color','#1f1d1e');          //Navbar dropdown content backgroundcolour 

    $('.image-container').css('background-color','#1f1d1e');           //Imagecontainer backgroundcolour
    $('.image-container:hover').css('background-color','#cd295d');     //Imagecontainer backgroundcolour on hover
    $('.profile-detail-playername').css('background-color','#1f1d1e'); //Detailed playerprofile name backgroundcolour
    $('.profile-detail-roles').css('background-color','#1f1d1e');      //Detailed playerprofile  roles backgroundcolour
    $('.profile-detail-riotname').css('color','white');                //Detailed playerprofile  riotname textcolour
    $('.profile-detail').css('color','white');                         //Detailed playerprofile textcolour

    $('.gameplan-container').css('background-color','#1f1d1e');        //Gameplan backgroundcolour
    $('.gameplan-item').css('background-color','#161515');             //Gameplan cellcolour
    $('.gameplan-container').css('color','white');                     //Gameplan textcolour

    $('.content').css('color','white');                                //Textcolour on Site

    $('#toggle-image').remove();                                       //remove old image element
    $('#toggle-element').append('<img id="toggle-image" class="togglemode" onclick="lightApperance()" src="/images/Icons/dark-mode-svgrepo-com.png">'); //replace with new image element
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