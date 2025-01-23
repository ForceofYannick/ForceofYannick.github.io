// team json
// iteriere durch json => wenn seite aufgerufen
// erstelle palyerbox für alle spieler in json
// playerbox füttern mit player infos



// Fehler bei    var playerInfos =parsedData[`Spieler${i}`];


$(document).ready(function() {

  var teamName = "ibtc";
  var playerName = $('.player-name');

  
  



/*
  const playerNameDiv = container.find('.player-name');
  const playerRolesDiv = container.find('.player-roles');
  const playerRiotA = container.find('.player-riot');
  const playerSocialsDiv = container.find('.player-socials');
*/



    var FilePath = `/teamJSON/${teamName}.json`;
  
    fetch(FilePath)
    .then(response => {
        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(parsedData => {

      const ElementArray = Object.keys(parsedData);
      
      for(let i =0; i< ElementArray.length;i++){
        var playerInfos =parsedData[`Spieler${i}`];

        playerName.text(playerInfos.Name);

      }


/*
  //wenn container NICHT 'clicked' class hat
if(!container.hasClass('clicked')) {
  container.addClass('clicked');

  //durchsuche JSON und gib aus, aber nur wenn vorhanden, sonst ''
  const name = parsedData["Name"];
  (name != null)? playerNameDiv.text(`${parsedData["Name"]}`) : playerNameDiv.text(``);


  const roles = parsedData["Roles"];
  (roles != null)? playerRolesDiv.text(`${parsedData["Roles"]}`) : playerRolesDiv.text(``);

  const riot = parsedData["Riot"];
  (riot != null)? playerRiotA.text(`${parsedData["Riot"].RiotName}`).prop('href', `${parsedData["Riot"].RiotLink}`).attr('target', '_blank') : playerRiotA.text(``);



  
    durchsuche JSON nach "Socials", speichere socials anzahl,
    speichere von jedem social den namen für das title attribute,
    erstelle <a></a> element, füge link als href ein, füge title ein,
    suche nach icon für das social mit {social_name}_icon, 
    füge <img /> in <a> ein, src attr = icon pfad
  

  //socials segment
  const socials = parsedData["Socials"];

  for (const [platform, url] of Object.entries(socials)) {
  playerSocialsDiv.append(`
    <a class="player-box-social-a" href='${url}' target='_blank'>
      <img class="player-box-social-img ${platform}" src='/media/icons/${platform}.png' title='${platform}'>
    </a>
  `);
  }
}

//wenn Container 'clicked' class hat
else{



}
*/
    

    })
    .catch(error =>{
        console.error('!!!INSHALLA DA IS EIN FEHLER BEI JSON DATEI BRUDER!!!',error);
    });
  

/*
$('.player-box').on('click', function() {
  const name = $(this).data('name'); // Datenattribut 'name' auslesen
  member($(this), name);
});
*/
});