function lightApperance() {
    $('body').css('background-color', '#dddddd');
    $('body').css('color', '#1b191a');

    $('h1, h2, h3, footer a, table, .player-box, .results-container, .results-item, .results-header')
        .not('.cookieBackground, .cookieBackground *')
        .each(function () {
            const $el = $(this);
            if ($el.is('h1, h2, h3')) {
                $el.css('color', '#1b191a');
            } else if ($el.is('footer a, table, .results-container, .results-item, .results-header')) {
                $el.css('color', '#1b191a');
            }
            if ($el.is('.player-box')) {
                $el.css('background-color', '#332f31');
            }
            if ($el.is('.results-container')) {
                $el.css('background-color', '#cccccc');
            }
            if ($el.is('.results-item')) {
                $el.css('background-color', '#aaaaaa');
            }
            if ($el.is('.results-header')) {
                $el.css('border', '1px solid black');
            }
        });

    $('#nameImg').attr('src', '/media/Icons/person_black.png');
    $('#mailImg').attr('src', '/media/Icons/mail_black.png');
    $('#phoneImg').attr('src', '/media/Icons/phone_black.png');
    $('#addressImg').attr('src', '/media/Icons/location_black.png');
    $('#discordImg').attr('src', '/media/Icons/discord_black.png');

    $('#toggle-image-light').remove();
    $('#toggle-element').append('<img id="toggle-image-light" class="nav-icon togglemode" onclick="darkApperance()" title="Zu dunklem Modus wechseln" src="/media/Icons/dark-mode.png">');
    localStorage.setItem('theme', 'light');
}

function darkApperance() {
    $('body').css('background-color', '#272526');
    $('body').css('color', '#dddddd');

    $('h1, h2, h3, footer a, table, .player-box, .results-container, .results-item, .results-header')
        .not('.cookieBackground, .cookieBackground *')
        .each(function () {
            const $el = $(this);
            if ($el.is('h1, h2, h3')) {
                $el.css('color', '#dddddd');
            } else if ($el.is('footer a, table, .results-container, .results-item, .results-header')) {
                $el.css('color', 'white');
            }
            if ($el.is('.player-box')) {
                $el.css('background-color', '#1b191a');
            }
            if ($el.is('.results-container')) {
                $el.css('background-color', '#1f1d1e');
            }
            if ($el.is('.results-item')) {
                $el.css('background-color', '#161515');
            }
            if ($el.is('.results-header')) {
                $el.css('border', '1px solid white');
            }
        });

    $('#nameImg').attr('src', '/media/Icons/person_white.png');
    $('#mailImg').attr('src', '/media/Icons/mail_white.png');
    $('#phoneImg').attr('src', '/media/Icons/phone_white.png');
    $('#addressImg').attr('src', '/media/Icons/location_white.png');
    $('#discordImg').attr('src', '/media/Icons/discord_white.png');

    $('#toggle-image-light').remove();
    $('#toggle-element').append('<img id="toggle-image-light" class="nav-icon togglemode" onclick="lightApperance()" title="Zu hellem Modus wechseln" src="/media/Icons/white-mode.png">');
    localStorage.setItem('theme', 'dark');
}

$(document).ready(function () {
    const theme = localStorage.getItem('theme');
    if (theme === 'light') {
        lightApperance();
    } else {
        darkApperance();
    }
});