// for durch switch ersetzen?


$(document).ready(function() {

  // Header element of each team page convert to lowercase for json reading
    var teamNameHeader = $('.landing-header').text().toLowerCase();

    //results container to dump in results
    var resultsContainer = $('.teamPlayerContainers');

    var filePath = `/teamJSON/${teamNameHeader}.json`;
  
    fetch(filePath)
    .then(response => {
        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(parsedData => {

      const elementArray = Object.keys(parsedData);
      
      for(let element in elementArray){

        resultsContainer.append(`
            
          <div id="player${element}"class="playerBox">
     <div class="jerseyName">Name</div>
      <div class="sliderContainer">
      <div class="sliderName">Player Name</div>
      <hr class="sliderLine">
      <div class="sliderRole">Player Role</div>
      <ol class="sliderList">
          <li>
              <a href="" class="instagramElement"><img src="/media/Icons/Instagram.png"></a>
          </li>
          <li>
              <a href="" class="tiktokElement"><img src="/media/Icons/Tiktok.png"></a>
          </li>
          <li>
              <a href="" class="twitchElement"><img src="/media/Icons/Twitch.png"></a>
          </li>
          <li>
              <a href="" class="twitterElement"><img src="/media/Icons/Twitter.png"></a>
          </li>
          <li>
              <a href="" class="youtubeElement"><img src="/media/Icons/Youtube.png"></a>
          </li>
      </ol>
  </div>
</div>  
          `);



        var elementKey = elementArray[element];
        var elementData = parsedData[elementKey];

        for(let key in elementData){


          if(typeof elementData[key] == 'object'){


            
            for(let subKey in elementData[key]){
              console.log(`Element: ${elementArray[element]}, Key: ${key}, SubKey: ${subKey}, Value: ${elementData[key][subKey]}`)
              

              

              
              
              //resultsContainer.append(`<div> Element: ${elementArray[element]}, Key: ${key}, SubKey: ${subKey}, Value: ${elementData[key][subKey]} </div>`)
            }

          }
          else{
            console.log(`Element: ${elementArray[element]}, Key: ${key}, Value: ${elementData[key]}`)
            //resultsContainer.append(`<div>Element: ${elementArray[element]}, Key: ${key}, Value: ${elementData[key]} </div>`)
            const currentElement = $(`#player${element}`);
            currentElement.find('jerseyName').text(elementData[key][subKey]);
          }
        }
      }








    

    })
    .catch(error =>{
        console.error('Fehler bei JSON laden',error);
    });
});