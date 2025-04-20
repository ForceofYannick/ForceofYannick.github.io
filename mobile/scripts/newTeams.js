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
      document.body.innerHTML = `<h1>URL Fehler: Teamparameter nicht gefunden</h1>`;
      return;
    }
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
          document.body.innerHTML = `<h1>JSON Fehler: Team nicht vorhanden</h1>`;
          return;
        }

        // go through players and append a new player box for ever player
        var playersContainer = $(".teamPlayersContainer");

        for (player in jsonTeam.Players) {
          console.log(player);
          const playerName = Object.keys(player)[0]; //player name from jsons construct
          playersContainer.append(`
        <div id="player${playerName}"class="playerBox">
        <div class="jerseyName">${playerName.toUpperCase()}</div>
        <div class="sliderContainer">
        <div class="sliderName">${playerName}</div>
        <hr class="sliderLine">
        <div class="sliderRole">${player["main-role"]} / ${player["orga-role-1"]} / ${player["orga-role-2"]}</div>
        <ol class="sliderList">
            <li>
                <a href="${player.instagram}" class="instagramElement"><img src="/media/Icons/Instagram.png"></a>
            </li>
            <li>
                <a href="${player.tiktok}" class="tiktokElement"><img src="/media/Icons/Tiktok.png"></a>
            </li>
            <li>
                <a href="${player.twitch}" class="twitchElement"><img src="/media/Icons/Twitch.png"></a>
            </li>
            <li>
                <a href=""${player.twitter} class="twitterElement"><img src="/media/Icons/Twitter.png"></a>
            </li>
            <li>
                <a href="${player.youtube}" class="youtubeElement"><img src="/media/Icons/Youtube.png"></a>
            </li>
        </ol>
    </div>
  </div>  
            `);
        }

        // get team results container
        var resultsContainer = $('.teamResultsContainer');
        const jsonTeamResults = jsonTeam.Results;

        // go through all results in team and append a new table for each result
        for(result in jsonTeamResults){

            const splitName = Object.key(result)[0]; // split name
        resultsContainer.append(`
            <div class='split-container'>
            <div class='collapsible results-header' onclick="toggleCollapse('${splitName}')">
                            ${splitName}  <i id='caret-container${splitName}' class='fa fa-caret-down'></i>
                           </div>
            <table id='${splitName}' class='results-table' style='display: flex; justify-content: center;'>
                    <tr class="results-item" style="color: white">       
                        <td class="results-item-content">Stage</td>
                        <td class="results-item-content">Gruppe</td>
                        <td class="results-item-content">Ergebnis</td>
                    </tr>
                    <tr class="results-item" style="color: white">       
                        <td class="results-item-content">Kalibrierungsphase</td>
                        <td class="results-item-content">${result.kaliphase.group}</td>
                        <td class="results-item-content">${result.kaliphase.result}</td>
                    </tr>
                    <tr class="results-item" style="color: white">       
                        <td class="results-item-content">Gruppenphase</td>
                        <td class="results-item-content">${result.grouphase.group}</td>
                        <td class="results-item-content">${result.grouphase.result}</td>
                    </tr>
                    <tr class="results-item" style="color: white">       
                        <td class="results-item-content">Playoffs</td>
                        <td class="results-item-content">${result.playoffs.group}</td>
                        <td class="results-item-content">${result.playeroffs.result}</td>
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
