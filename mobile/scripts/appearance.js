function lightApperance(){
    $('body').css('background-color','#dddddd');
    $('body').css('color','#1b191a');
    $('h1').css('color','#1b191a');
    $('h2').css('color','#1b191a');
    $('h3').css('color','#1b191a');
    $('footer a').css('color','#1b191a');
    $('table').css('color','#1b191a');                                  //index
    $('.player-box').css('background-color','#332f31');                 //teams

    $('#nameImg').attr('src', '/media/Icons/person_black.png');         //impressum
    $('#mailImg').attr('src', '/media/Icons/mail_black.png');           //impressum
    $('#phoneImg').attr('src', '/media/Icons/phone_black.png');         //impressum
    $('#addressImg').attr('src', '/media/Icons/location_black.png');    //impressum
    $('#discordImg').attr('src', '/media/Icons/discord_black.png');     //impressum

    $('#toggle-image-light').remove();
    $('#toggle-element').append('<img id="toggle-image-light" class="nav-icon togglemode" onclick="darkApperance()" title="Zu dunklem Modus wechseln" src="/media/Icons/dark-mode.png">');
    localStorage.setItem('theme', 'light');
}

function darkApperance(){
    $('body').css('background-color','#272526');
    $('body').css('color','#dddddd');
    $('h1').css('color','#dddddd');
    $('h2').css('color','#dddddd');
    $('h3').css('color','#dddddd');
    $('footer a').css('color','#dddddd');
    $('table').css('color','#dddddd');                                  //index
    $('.player-box').css('background-color','#1b191a');                 //teams

    $('#nameImg').attr('src', '/media/Icons/person_white.png');         //impressum
    $('#mailImg').attr('src', '/media/Icons/mail_white.png');           //impressum
    $('#phoneImg').attr('src', '/media/Icons/phone_white.png');         //impressum
    $('#addressImg').attr('src', '/media/Icons/location_white.png');    //impressum
    $('#discordImg').attr('src', '/media/Icons/discord_white.png');     //impressum

    $('#toggle-image-light').remove();
    $('#toggle-element').append('<img id="toggle-image-light" class="nav-icon togglemode" onclick="lightApperance()" title="Zu hellem Modus wechseln" src="/media/Icons/white-mode.png">');
    localStorage.setItem('theme', 'dark');
}

$(document).ready(function() {
    const theme = localStorage.getItem('theme');
    if (theme === 'light') {
        lightApperance();
    } else {
        darkApperance();
    }
});
