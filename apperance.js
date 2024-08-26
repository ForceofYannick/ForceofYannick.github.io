function lightApperance(){
    $('body').css('background-color','white');
    $('.nav-item').css('color','black');
    $('.dropbtn').css('color','black');
    $('.dropdown-content a').css('color','black');
    $('.dropdown-content').css('background-color','grey');
    $('.activ').css('color', 'white')
    $('.logo').remove();
    $('.navbar-center').append('<img src="/images/Logos/IBTC_Logo_full_clear_black.png" style="height:60px" alt="Logo" class="logo">');

    $('.image-container').css('background-color','grey');
    $('.image-container:hover').css('background-color','#cd295d');
    $('.profile-detail-playername').css('background-color','grey');
    $('.profile-detail-roles').css('background-color','grey');
    $('.profile-detail').css('color','black');
    $('.profile-detail-riotname').css('color','black');

    $('.gameplan-container').css('background-color','grey');
    $('.gameplan-item').css('background-color','darkgrey');
    $('.gameplan-container').css('color','black');

    $('.content').css('color','black');

    $('#toggle-image-dark').remove();
    $('#toggle-element').append('<img id="toggle-image-light" class="togglemode" onclick="darkApperance()" title="Zu dunklem Modus wechseln" src="/images/Icons/dark-mode-svgrepo-com.png">');

    localStorage.setItem('theme', 'light');
}

function darkApperance(){
    $('body').css('background-color','#272526');
    $('.nav-item').css('color','white');
    $('.dropbtn').css('color','white');
    $('.dropdown-content a').css('color','white');
    $('.dropdown-content').css('background-color','#1f1d1e');
    $('.activ').css('color', 'white')
    $('.logo').remove();
    $('.navbar-center').append('<img src="/images/Logos/IBTC_Logo_full_clear_white.png" alt="Logo" class="logo">');

    $('.image-container').css('background-color','#1f1d1e');
    $('.image-container:hover').css('background-color','#cd295d');
    $('.profile-detail-playername').css('background-color','#1f1d1e');
    $('.profile-detail-roles').css('background-color','#1f1d1e');
    $('.profile-detail-riotname').css('color','white');
    $('.profile-detail').css('color','white');

    $('.gameplan-container').css('background-color','#1f1d1e');
    $('.gameplan-item').css('background-color','#161515');
    $('.gameplan-container').css('color','white');

    $('.content').css('color','white');

    $('#toggle-image-light').remove();
    $('#toggle-element').append('<img id="toggle-image-dark" class="togglemode" onclick="lightApperance()" title="Zu hellem Modus wechseln" src="/images/Icons/dark-mode-svgrepo-com.png">');

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
