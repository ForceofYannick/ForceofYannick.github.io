function lightAppearance(){
    $('body').css('background-color','#dddddd');
    $('body').css('color','#1b191a');
    $('h1').css('color','#1b191a');
    $('h2:not(.cookieHeader)').css('color', '#1b191a');
    $('h3').css('color','#1b191a');
    $('footer a:not(.cookieA)').css('color', '#1b191a');
    $('table').css('color','#1b191a');                                  //index
    $('.player-box').css('background-color','#332f31');                 //teams

    $('#nameImg').attr('src', '/media/Icons/person_black.png');         //impressum
    $('#mailImg').attr('src', '/media/Icons/mail_black.png');           //impressum
    $('#phoneImg').attr('src', '/media/Icons/phone_black.png');         //impressum
    $('#addressImg').attr('src', '/media/Icons/location_black.png');    //impressum
    $('#discordImg').attr('src', '/media/Icons/discord_black.png');     //impressum

    $('.results-container').css('background-color','#cccccc');          //team page results
    $('.results-container').css('color','#1b191a');                     //team page results
    $('.results-item').css('background-color','#aaaaaa');               //team page results
    $('.results-item').css('color','#1b191a');                          //team page results
    $('.results-header').css('color','#1b191a');                        //team page results
    $('.results-header').css('border','1px solid black');                        //team page results

    $('#toggle-image-light').remove();
    $('#toggle-element').append('<img id="toggle-image-light" class="nav-icon togglemode" onclick="darkAppearance()" title="Zu dunklem Modus wechseln" src="/media/Icons/dark-mode.png">');
    console.log("light theme applied");
    if(window.savePreference === 'true'){
        console.log("light theme saved");
        localStorage.setItem('theme', 'light');
    }
}

function darkAppearance(){
    $('body').css('background-color','#272526');
    $('body').css('color','#dddddd');
    $('h1').css('color','#dddddd');
    $('h2:not(.cookieHeader)').css('color', '#dddddd');
    $('h3').css('color','#dddddd');
    $('footer a:not(.cookieA)').css('color', '#dddddd');
    $('table').css('color','#dddddd');                                  //index
    $('.player-box').css('background-color','#1b191a');                 //teams

    $('#nameImg').attr('src', '/media/Icons/person_white.png');         //impressum
    $('#mailImg').attr('src', '/media/Icons/mail_white.png');           //impressum
    $('#phoneImg').attr('src', '/media/Icons/phone_white.png');         //impressum
    $('#addressImg').attr('src', '/media/Icons/location_white.png');    //impressum
    $('#discordImg').attr('src', '/media/Icons/discord_white.png');     //impressum

    $('.results-container').css('background-color','#1f1d1e');          //team page results
    $('.results-container').css('color','white');                     //team page results
    $('.results-item').css('background-color','#161515');               //team page results
    $('.results-item').css('color','white');                          //team page results
    $('.results-header').css('color','white');                        //team page results
    $('.results-header').css('border','1px solid white');                        //team page results
    
    $('#toggle-image-light').remove();
    $('#toggle-element').append('<img id="toggle-image-light" class="nav-icon togglemode" onclick="lightAppearance()" title="Zu hellem Modus wechseln" src="/media/Icons/white-mode.png">');
    console.log("dark theme applied");
    if(window.savePreference === 'true'){
        console.log("dark theme saved");
        localStorage.setItem('theme', 'dark');
    }
}

function loadAppearance(){
    const theme = localStorage.getItem('theme');
    
    if (theme === 'light') {
        // Only if cookies accepted
        console.log("load light theme");
        lightAppearance();
    } else {
        // Default theme
        console.log("load default theme (dark)");
        darkAppearance();
    }
}