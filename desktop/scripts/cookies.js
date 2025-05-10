document.addEventListener('DOMContentLoaded', () => {
    window.showCookieWindow = localStorage.getItem('showCookieWindow');
    window.savePreference = localStorage.getItem('savePreference');

    // Wenn Fenster gezeigt werden soll, mach sichtbar
    if (showCookieWindow === 'true') {
        console.log("'show cookie window' accepted");
        document.querySelector('.cookieBackground').style.display = 'block';
    } else if (showCookieWindow === 'false') {
        console.log("'show cookie window' denied");
        document.querySelector('.cookieBackground').style.display = 'none';
    } else {
        console.log("'show cookie window' not set");
        document.querySelector('.cookieBackground').style.display = 'block';
    }

    // Lade erscheinungsbild, standardmäßig auf dunkel
    loadAppearance();
});



function saveCookies(savePreference, showCookieWindow) {

    console.log('save preferences:', savePreference);
    console.log('show cookie window:', showCookieWindow);

    localStorage.setItem('savePreference', savePreference);
    localStorage.setItem('showCookieWindow', showCookieWindow);
    document.querySelector('.cookieBackground').style.display = 'none';
}