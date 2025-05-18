$(document).ready(function () {
  console.log("team script start");
  async function loadTeamData() {
    //get url
    //search url for "name" attribute
    //read from json file with same name as "name" attribute
    console.log("async function");

    const params = new URLSearchParams(window.location.search);
    const teamName = params.get("name");

    //if no parameter found
    if (!teamName) {
      console.log("no team parameter found");
      $('.landing-header').text('Teamparameter nicht gefunden');
      return;
    }
    $('.landing-header').text(`${teamName.toUpperCase()}`);
    console.log("team parameter found: " + teamName);

    // JSON laden:

    // Fetch JSON
    await fetch("../data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((jsonData) => {
        // Save JSON content as array


        console.log(jsonData);
        //extract specific team from json or if team not found save null
        let jsonTeam = null;
        if (jsonData.Teams[teamName]) {
          jsonTeam = jsonData.Teams[teamName];
        } else {
          $('.landing-header').text(`Team nicht vorhanden`);
          return;
        }

        // go through players and append a new player box for ever player
        var playersContainer = $(".teamPlayersContainer");

        for (player in jsonTeam.Players) {
          const playerName = player.toUpperCase();
          const playerInfos = jsonTeam.Players[player];

          let backgroundImage = "/media/Jersey/Jersey.png"; // Default
          switch (playerInfos["main-role"]) {
            case "top": backgroundImage = "/media/top.png"; break;
            case "mid": backgroundImage = "/media/mid.png"; break;
            case "sup": backgroundImage = "/media/sup.png"; break;
            case "jgl": backgroundImage = "/media/jgl.png"; break;
            case "adc": backgroundImage = "/media/adc.png"; break;
          }

          playersContainer.append(`
            <div id="player${playerName}" class="playerBox" style="background-image: url('${backgroundImage}');" onclick="togglePlayerDetails(this)">
              <div class="jerseyName">${playerName}</div>
              <div class="sliderContainer slideOut" style="visibility: hidden">
                <div class="sliderName">${playerName}</div>
                <hr class="sliderLine">
                <div class="sliderRole">${playerInfos["main-role"].toUpperCase()} / ${playerInfos["orga-role-1"].toUpperCase()} / ${playerInfos["orga-role-2"].toUpperCase()}</div>
                <ol class="sliderList">
                  <li><a href="${playerInfos.instagram}" target="_blank" class="instagramElement"><img src="/media/Icons/instagram.png"></a></li>
                  <li><a href="${playerInfos.tiktok}" target="_blank" class="tiktokElement"><img src="/media/Icons/tiktok.png"></a></li>
                  <li><a href="${playerInfos.twitch}" target="_blank" class="twitchElement"><img src="/media/Icons/twitch.png"></a></li>
                  <li><a href="${playerInfos.twitter}" target="_blank" class="twitterElement"><img src="/media/Icons/twitter.png"></a></li>
                  <li><a href="${playerInfos.youtube}" target="_blank" class="youtubeElement"><img src="/media/Icons/youtube.png"></a></li>
                </ol>
              </div>
            </div>
          `);
        }

        // get team results container
        var resultsContainer = $('.teamResultsContainer');

        // go through all results in team and append a new table for each result
        for (const result in jsonTeam.Results) {
          const splitName = result;
          const SplitInfos = jsonTeam.Results[splitName];
          const safeSplitName = splitName.replace(/[^a-zA-Z0-9_-]/g, "_"); // ersetzt z.B. spring'24 → spring_24


          resultsContainer.append(`
            <div class='split-container'>
                <div class='collapsible results-header' onclick="toggleCollapse('${safeSplitName}')">
                    ${splitName} <i id='caret-container${safeSplitName}' class='fa fa-caret-down'></i>
                </div>
                <table id='${safeSplitName}' class='results-table' style='display: flex; justify-content: center;'>
                    <tr class="results-item" style="color: white">       
                        <td class="results-item-content">Stage</td>
                        <td class="results-item-content">Gruppe</td>
                        <td class="results-item-content">Ergebnis</td>
                    </tr>
                    <tr class="results-item" style="color: white">       
                        <td class="results-item-content">Kalibrierungsphase</td>
                        <td class="results-item-content">${SplitInfos.kaliphase.group}</td>
                        <td class="results-item-content">${SplitInfos.kaliphase.result}</td>
                    </tr>
                    <tr class="results-item" style="color: white">       
                        <td class="results-item-content">Gruppenphase</td>
                        <td class="results-item-content">${SplitInfos.groupphase.group}</td>
                        <td class="results-item-content">${SplitInfos.groupphase.result}</td>
                    </tr>
                    <tr class="results-item" style="color: white">       
                        <td class="results-item-content">Playoffs</td>
                        <td class="results-item-content">${SplitInfos.playoffs.group}</td>
                        <td class="results-item-content">${SplitInfos.playoffs.result}</td>
                    </tr>
                </table>
            </div>
        `);
        }

      })
      .catch((error) => {
        console.error(`${teamName} JSON fetch error`, error);
      });
  }
  loadTeamData();
});


function togglePlayerDetails(player) {
  const element = $(player).find('.sliderContainer');

  if (element.hasClass('slideIn')) {
    element.removeClass('slideIn').addClass('slideOut');

    element.one('animationend', () => {
      element.css('visibility', 'hidden');
    });

  } else {
    element.css('visibility', 'visible');


    void element[0].offsetWidth;

    element.removeClass('slideOut').addClass('slideIn');
  }
}

function toggleCollapse(split) {

  if ($(`#${split}`).css('display') == 'none') {
    $(`#${split}`).css('display', 'flex');
    $(`#${split}`).parent().find('.collapsible').find('i').removeClass('fa-caret-right').addClass('fa-caret-down');
  }
  else {
    $(`#${split}`).css('display', 'none');
    $(`#${split}`).parent().find('.collapsible').find('i').removeClass('fa-caret-down').addClass('fa-caret-right');
  }


}

