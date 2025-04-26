const logoXOffsets = [-40, -300, -560, -820, -1080];
const logoSize = 1400;
const logoYOffset = -320;


$(document).ready(() => {

    // Get results div
    const resultsDiv = $('#splitResults');

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
    fetch('../data.json')
        .then(response => response.json())
        .then(jsonData => {

            const teamNames = Object.keys(jsonData.Teams);


            for (let i = 0; i < teamNames.length; i++) {
                const team = teamNames[i];
                const jsonTeam = jsonData.Teams[team];

                const splits = Object.keys(jsonTeam.Results);
                const latestSplit = splits[splits.length - 1];
                const resultData = jsonTeam.Results[latestSplit];
                const group = resultData.groupphase.group;
                const result = resultData.groupphase.result;

                $('#resultsHeader').text(latestSplit);
                $('#name').append(`<th>${team.toUpperCase()}</th>`);
                $('#group').append(`<th>Gruppe ${group}</th>`);
                $('#result').append(`<th>${result}</th>`);

                // Decide if first/last element or not
                let borderRadius = '0px 0px 0px 0px';
                if (i === 0) {
                    borderRadius = '20px 0px 0px 20px';
                } else if (i === teamNames.length - 1) {
                    borderRadius = '0px 20px 20px 0px';
                }

                // Add team div
                const offsetX = logoXOffsets[i] || 0;

                const teamsDiv = $('#teamSelection');
                const logoPath = `../media/Logos/${team.toUpperCase()}_Logo_full_clear_white_fade.png`;
                teamsDiv.append(`
                    <a id="${team}Item" 
                    class="gridItem"
                    href="../desktop/team.html?name=${team}"
                    data-team="${team}" 
                    data-index="${i}" 
                    onmouseover="gridItem(this)"
                    style="border-radius: ${borderRadius}; background-image: url('${logoPath}'); background-size: ${logoSize}px; background-position: ${offsetX}px ${logoYOffset}px;">
                    </a>
    `);
            }
        })
        .catch(error => console.error('JSON loading error: ', error));
});


function gridItem(element) {
    const hoveredTeam = $(element).data('team');
    const logoPath = `../media/Logos/${hoveredTeam.toUpperCase()}_Logo_full_clear_white_fade.png`;

    const allGridItems = $('.gridItem');

    for (const item of allGridItems) {
        const index = $(item).data('index');
        const offsetX = logoXOffsets[index] || 0;
        const offsetY = logoYOffset;

        $(item).css({
            'background-image': `url(${logoPath})`,
            'background-size': `${logoSize}px`,
            'background-position': `${offsetX}px ${offsetY}px`
        });
    }
}




function gridReset() {

}