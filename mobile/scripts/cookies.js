document.addEventListener('DOMContentLoaded', () => {
window.showCookieWindow = localStorage.getItem('showCookieWindow');
window.savePreference = localStorage.getItem('savePreference');

// Wenn Fenster gezeigt werden soll, mach sichtbar
if(showCookieWindow === 'true'){
    console.log("accepted");
    document.querySelector('.cookieBackground').style.display = 'block';
}else if(showCookieWindow === 'false'){
    console.log("denied");
    document.querySelector('.cookieBackground').style.display = 'none';
}else{
    console.log("not set");
    document.querySelector('.cookieBackground').style.display = 'block';
}

// Wenn Erscheinungspräferenz gespeichert, lade appearance script mit local starage, sonst ohne
if(savePreference === 'true'){
    loadAppearance();
}
else{
    loadAppearance();
}





});



function saveCookies(savePreference, showCookieWindow){

    console.log('Erscheinungspräferenz speichern:', savePreference);
    console.log('Dieses Fenster erneut anzeigen:', showCookieWindow);

    localStorage.setItem('savePreference', savePreference);
    localStorage.setItem('showCookieWindow',showCookieWindow);
    document.querySelector('.cookieContainer').style.display = 'none';
}