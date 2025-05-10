
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
            $("#youtube-img").removeAttr("src", "/media/Icons/youtube.png", "alt", "");
            $("#instagram-img").removeAttr("src", "/media/Icons/instagram.png", "alt", "");
            $("#twitter-img").removeAttr("src", "/media/Icons/twitter.png", "alt", "");
            $("#twitch-img").removeAttr("src", "/media/Icons/twitch.png", "alt", "");
            $("#tiktok-img").removeAttr("src", "/media/Icons/tiktok.png", "alt", "");


            //if social section exists in player file, put back the src attribute with matching path and change the redirect link 
            if (sections.hasOwnProperty("youtube")) {
                $("#player-socials").css("gap", "16px");
                $("#player-socials-youtube").attr("href", sections.youtube);
                $("#youtube-img").attr("src", "/media/Icons/youtube.png", "alt", "");
            }
            else {
                $("#player-socials").css("gap", "0px");
            }
            if (sections.hasOwnProperty("instagram")) {
                $("#player-socials-instagram").attr("href", sections.instagram);
                $("#instagram-img").attr("src", "/media/Icons/instagram.png", "alt", "");
            }
            if (sections.hasOwnProperty("twitter")) {
                $("#player-socials-twitter").attr("href", sections.twitter);
                $("#twitter-img").attr("src", "/media/Icons/twitter.png", "alt", "");
            }
            if (sections.hasOwnProperty("twitch")) {
                $("#player-socials-twitch").attr("href", sections.twitch);
                $("#twitch-img").attr("src", "/media/Icons/twitch.png", "alt", "");
            }
            if (sections.hasOwnProperty("tiktok")) {
                $("#player-socials-tiktok").attr("href", sections.tiktok);
                $("#tiktok-img").attr("src", "/media/Icons/tiktok.png", "alt", "");
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
    $("#youtube-img").removeAttr("src", "/media/Icons/youtube.png", "alt", "");
    $("#instagram-img").removeAttr("src", "/media/Icons/instagram.png", "alt", "");
    $("#twitter-img").removeAttr("src", "/media/Icons/twitter.png", "alt", "");
    $("#twitch-img").removeAttr("src", "/media/Icons/twitch.png", "alt", "");
    $("#tiktok-img").removeAttr("src", "/media/Icons/tiktok.png", "alt", "");
}