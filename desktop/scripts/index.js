const logoXOffsets = ['-2.1vw', '-15.6vw', '-29.2vw', '-42.7vw', '-56.3vw'];
const logoSize = '72.9vw';
const logoYOffset = '39.6%';

let teamNames = [];

$(document).ready(() => {
  // Get results div
  const resultsDiv = $("#splitResults");

  // Add table structure to div
  resultsDiv.append(`
        <h1 class="header" id="resultsHeader">TestSplit '01</h1>
        <table class=splitResults>
        <tr id="name"></tr>
        <tr id="group"></tr>
        <tr id="result"></tr>
        </table>
        `);

  // Get json
  fetch("../data.json")
    .then((response) => response.json())
    .then((jsonData) => {
      teamNames = Object.keys(jsonData.Teams);

      for (let i = 0; i < teamNames.length; i++) {
        const team = teamNames[i];
        const jsonTeam = jsonData.Teams[team];

        const splits = Object.keys(jsonTeam.Results);
        const latestSplit = splits[splits.length - 1];
        const resultData = jsonTeam.Results[latestSplit];
        const group = resultData.groupphase.group;
        const result = resultData.groupphase.result;

        $("#resultsHeader").text(latestSplit);
        $("#name").append(`<th>${team.toUpperCase()}</th>`);
        $("#group").append(`<th>Gruppe ${group}</th>`);
        $("#result").append(`<th>${result}</th>`);

        // Decide if first/last element or not
        let borderRadius = "0px 0px 0px 0px";
        if (i === 0) {
          borderRadius = "20px 0px 0px 20px";
        } else if (i === teamNames.length - 1) {
          borderRadius = "0px 20px 20px 0px";
        }

        // Add team div
        const offsetX = logoXOffsets[i] || 0;

        const teamsDiv = $("#teamSelection");
        const logoPath = `../media/Logos/${team.toUpperCase()}_Logo_full_clear_white_fade.png`;
        teamsDiv.append(`
                    <a id="${team}Item" 
                    class="gridItem"
                    href="../desktop/team.html?name=${team}"
                    data-team="${team}" 
                    data-index="${i}" 
                    onmouseover="gridItem(this)"
                    onmouseleave="gridReset()"
                    style="max-height: 35vh; border-radius: ${borderRadius}; background-image: url('${logoPath}'); background-size: ${logoSize}; background-position: ${offsetX} ${logoYOffset}; display: flex; justify-content: center; align-items: flex-end; color: white; text-decoration: none; text-align: center; padding-bottom: 10%;"
>
                    ${team.toUpperCase()}</a>
    `);
      }
    })
    .catch((error) => console.error("JSON loading error: ", error));
});

function gridItem(element) {
  // console.log("Mouse hover");
  const hoveredTeam = $(element).data("team");
  const logoPath = `../media/Logos/${hoveredTeam.toUpperCase()}_Logo_full_clear_white_fade.png`;

  const allGridItems = $(".gridItem");

  for (const item of allGridItems) {
    const index = $(item).data("index");
    const offsetX = logoXOffsets[index] || 0;
    const offsetY = logoYOffset;

    $(item).css({
      "background-image": `url(${logoPath})`,
      "background-size": `${logoSize}px`,
      "background-position": `${offsetX}px ${offsetY}px`,
    });
  }
}

function gridReset() {
  // console.log("Mouse leave");
  for (const team of teamNames) {
    const logoPath = `../media/Logos/${team.toUpperCase()}_Logo_full_clear_white_fade.png`;
    $(`#${team}Item`).css({
      "background-image": `url(${logoPath})`,
    });
  }
}
