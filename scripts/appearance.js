function lightApperance(){
    $('body').css('background-color','#dddddd');
    $('h1').css('color','#1b191a');
    $('h2').css('color','#1b191a');
    $('h3').css('color','#1b191a');
    $('footer a').css('color','#1b191a');
    $('table').css('color','#1b191a');

    $('#toggle-image-light').remove();
    $('#toggle-element').append('<img id="toggle-image-light" class="nav-icon togglemode" onclick="darkApperance()" title="Zu dunklem Modus wechseln" src="/media/Icons/dark-mode.png">');
    localStorage.setItem('theme', 'light');
}

function darkApperance(){
    $('body').css('background-color','#272526');
    $('h1').css('color','#dddddd');
    $('h2').css('color','#dddddd');
    $('h3').css('color','#dddddd');
    $('footer a').css('color','#dddddd');
    $('table').css('color','#dddddd');

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
