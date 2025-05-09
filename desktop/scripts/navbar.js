$(document).ready(() => {
    // Get json
    fetch('../data.json')
        .then(response => response.json())
        .then(jsonData => {

            const navbar = $('.navbar');
            navbar.append(`
                <div class="navbar-left"></div>
                <div class="navbar-center"></div>
                <div class="navbar-right"></div>
                `);


            const leftNavbar = $('.navbar-left');
            const centerNavbar = $('.navbar-center');
            const rightNavbar = $('.navbar-right');

            const teamNames = Object.keys(jsonData.Teams);


            for (let i = 0; i < teamNames.length; i++) {
                const team = teamNames[i];
                if(i == teamNames.length -1){
                    leftNavbar.append(`
                        <a href="/desktop/team.html?name=${team}" class="nav-item">${team.toUpperCase()}</a>
                       `);
                }
                else{
            leftNavbar.append(`
                 <a href="/desktop/team.html?name=${team}" class="nav-item">${team.toUpperCase()}</a>
                 <div class="menuSeparator"> | </div>
                `);
            }
            }

            centerNavbar.append(`
                     <a href="/desktop/index.html"><img title="Home" src="/media/Logos/IBTC_Logo_full_clear_white.png" style="height:60px" alt="Logo" class="logo"/></a>
                `);

            rightNavbar.append(`
                <div class="dropdown">
                    <button class="dropbtn"> IBTC SOCIALS</button>
                    <div class="dropdown-content">
                        <a href="https://www.instagram.com/ibtc_esports/" target="_blank"><img src="/media/Icons/instagram.png" style="width: 20px; height: 20px; vertical-align:middle; padding-bottom: 5px;" /> Instagram</a>
                        <a href="https://www.twitch.tv/ibtc_esports" target="_blank"><img src="/media/Icons/twitch.png" style="width: 20px; height: 20px; vertical-align:middle; padding-bottom: 5px;" /> Twitch</a>
                        <a href="https://www.youtube.com/@IBTC_ESPORTS" target="_blank"><img src="/media/Icons/youtube.png" style="width: 20px; height: 20px; vertical-align:middle; padding-bottom: 5px;" /> Youtube</a>
                        <a href="https://x.com/ibtc_esports" target="_blank"><img src="/media/Icons/twitter.png" style="width: 20px; height: 20px; vertical-align:middle; padding-bottom: 5px;" /> Twitter</a>
                        <a href="https://www.tiktok.com/@ibtc_esports"><img src="/media/Icons/tiktok.png" style="width: 20px; height: 20px; vertical-align:middle; padding-bottom: 5px;" /> Tiktok</a>
                        <a href="https://discord.com/invite/uqP3UhSTww"><img src="/media/Icons/discord_white.png" style="width: 20px; height: 20px; vertical-align:middle; padding-bottom: 5px;" /> Discord</a>
                        <a href="https://linktr.ee/ibtc_esports"><img src="/media/Icons/linktree.png" style="width: 20px; height: 20px; vertical-align:middle; padding-bottom: 5px;" /> Linktree</a>
                        
                        
                    </div>
                </div>
                <div class="menuSeparator"> | </div>
                <a href="/desktop/info.html" class="nav-item">INFO</a>
                <div class="menuSeparator"> | </div>
                <a href="/desktop/kontakt.html" class="nav-item">KONTAKT</a>
                <div class="menuSeparator"> | </div>
                <a href="/desktop/impressum.html" class="nav-item">IMPRESSUM</a>
                <div class="menuSeparator"> | </div>
                <div id="toggle-element"><img id="toggle-image-light" class="togglemode" onclick="lightApperance()" title="Zu hellem Modus wechseln" src="/media/Icons/white-mode.png" /></div>
                `);
        })
        .catch(error => console.error('JSON loading error: ', error));
});