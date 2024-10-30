$(document).ready(function() {

function member(container, name) {
  const playerTextDiv = container.find('.player-box-name');
  const playerInfoDiv = container.find('.player-box-info');
  const playerRolesDiv = container.find('.player-box-roles');
  const playerRiotDiv = container.find('.player-box-riot');
  const playerSocialsDiv = container.find('.player-box-socials');

  if(playerTextDiv.length){


    var FilePath = `/player-files/${name}.json`;
  
    fetch(FilePath)
    .then(response => {
        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(parsedData => {

      //wenn container NICHT 'clicked' class hat
      if(!container.hasClass('clicked')){
        container.addClass('clicked');

      //durchsuche JSON und gib aus, aber nur wenn vorhanden, sonst ''
    const name = parsedData["Name"];
    (name != null)? playerTextDiv.text(`${parsedData["Name"]}`) : playerTextDiv.text(``);

    const info = parsedData["PlayerText"];
    (info != null)? playerInfoDiv.text(`${parsedData["PlayerText"]}`) : playerInfoDiv.text(``);

    const roles = parsedData["Roles"];
    (roles != null)? playerRolesDiv.text(`${parsedData["Roles"]}`) : playerRolesDiv.text(``);

    const riot = parsedData["Riot"];
    (riot != null)? playerRiotDiv.text(`${parsedData["Riot"]}`) : playerRiotDiv.text(``);
    
  

    /*
      durchsuche JSON nach "Socials", speichere socials anzahl,
      speichere von jedem social den namen für das title attribute,
      erstelle <a></a> element, füge link als href ein, füge title ein,
      suche nach icon für das social mit {social_name}_icon, 
      füge <img /> in <a> ein, src attr = icon pfad
    */

      //socials segment
      const socials = parsedData["Socials"];
      
      for (const [platform, url] of Object.entries(socials)) {
          playerSocialsDiv.append(`
              <a class="player-box-social-a" href='${url}' target='_blank'>
                  <img class="player-box-social-img ${platform}" src='/media/icons/${platform}.png' title='${platform}'>
              </a>
          `);
      }
      playerTextDiv.css("color","red");
    }

    //wenn Container 'clicked' class hat
    else{
    container.removeClass('clicked')
    playerTextDiv.text(`${parsedData["Name"]}`);
    playerInfoDiv.text(``);
    playerRolesDiv.text(``);
    playerRiotDiv.text(``);
    playerSocialsDiv.empty();
    playerTextDiv.css("color","white");
    }

    

    })
    .catch(error =>{
        console.error('!!!INSHALLA DA IS EIN FEHLER BEI JSON DATEI BRUDER!!!',error);
    });
  }  
}

$('.player-box').on('click', function() {
  const name = $(this).data('name'); // Datenattribut 'name' auslesen
  member($(this), name);
});

});