function openProfile(id) {
    console.log("openProfile triggered with id:", id);

    document.getElementById('profile-detail').style.display = 'block';

    var playerFilePath = "/player-files/" + id + ".txt";

    $.ajax({
        url: playerFilePath,
        dataType: "text",
        success: function (data) {
            console.log("Player file loaded successfully");

            var sections = parseFileContent(data);
            var socialsCount = 0;
            socialsCount += (sections.youtube != null) ? 1 : 0;
            socialsCount += (sections.instagram != null) ? 1 : 0;
            socialsCount += (sections.twitter != null) ? 1 : 0;
            socialsCount += (sections.twitch != null) ? 1 : 0;
            socialsCount += (sections.tiktok != null) ? 1 : 0;
            //set social grid colum count
            $("#grid-item-detail-socials-grid-container").css('grid-template-columns', 'repeat(' + socialsCount + ' auto)');

            //put the data where it belongs
            $("#player-name").text(sections.name);
            $("#player-riotname").text(sections.riotname);
            $("#player-riotname").attr("href", sections.riotlink || "").attr("target", "_blank");
            $("#player-text").text(sections.text);
            $("#player-roles").text(sections.roles);

            //reset the image src attributes
            $("#youtube-img").removeAttr("src", "/images/Icons/youtube.png", "alt", "");
            $("#instagram-img").removeAttr("src", "/images/Icons/instagram.png", "alt", "");
            $("#twitter-img").removeAttr("src", "/images/Icons/twitter.png", "alt", "");
            $("#twitch-img").removeAttr("src", "/images/Icons/twitch.png", "alt", "");
            $("#tiktok-img").removeAttr("src", "/images/Icons/tiktok.png", "alt", "");


            //if social label exists in file, put back the src attribute with matching path and change the redirect link 
            if (sections.hasOwnProperty("youtube")) {
                $("#player-socials-youtube").attr("href", sections.youtube);
                $("#youtube-img").attr("src", "/images/Icons/youtube.png", "alt", "");
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
        error: function (data) {
            console.error("Error loading player file");
            $("#player-name").text("Player file not found");
            $("#player-riotname").text("");
            $("#player-text").text("");
            $("#player-roles").text("");
            $("#player-socials").css("visibility", "hidden");
        }
    });

    //textfile parser
    function parseFileContent(data) {
        var lines = data.split("\n");
        var sections = {};
        var currentLabel = null;
        var currentContent = [];

        lines.forEach(line => {
            line = line.trim();
            var lableMatch = line.match(/^==(.+)==$/);

            if (lableMatch) {
                if (currentContent) {
                    sections[currentLabel] = currentContent.join("\n").trim();
                    currentContent = [];
                }
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

function closeProfile(profileId) {
    document.getElementById('profile-detail').style.display = 'none';
}

var gameplanFilePath = "gameplan.txt";

console.log("Triggering gameplan AJAX call");

$.ajax({
    url: gameplanFilePath,
    dataType: "text",
    success: function (file) {
        console.log("Gameplan file loaded successfully");

        var sectionMarker = '=&=';
        var linearray = file.split('\n');

        for (var line = 0; line < linearray.length; line++) {
            if (!linearray[line].includes(sectionMarker)) {
                $("table").append(`<tr><th class="gameplan-header" colspan="3">${linearray[line]}</th></tr>`);
            } else {
                var sectionarray = linearray[line].split(sectionMarker);
                var rowHTML = '<tr class="gameplan-item">';
                for (var section = 0; section < sectionarray.length; section++) {

                    //console.log("sectionarray " + sectionarray[section]);
                    //#0ea20073 green
                    //#a2000073 red
                    //#a27c0073 yellow

                    if (sectionarray[section].includes(":")) {
                        var scorearray = sectionarray[section].split(':');
                        //console.log("scorearray[0] "+scorearray[0]+" scorearray[1] "+scorearray[1]);
                        
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
                    else {
                       // console.log("not a score");
                        rowHTML += `<td class="gameplan-item-content">${sectionarray[section]}</td>`;
                    }
                }
                rowHTML += "</tr>";
                $("table").append(rowHTML);
            }
        }
    },
    error: function (file) {
        console.error("Error loading gameplan file");
        $("table").append('<div style="color:white"><p>INSHALLA WO DATEI BRUDER???</p></div>');
    }
});
