document.addEventListener('DOMContentLoaded', () => {
window.showCookieWindow = localStorage.getItem('showCookieWindow');
window.savePreference = localStorage.getItem('savePreference');

// Wenn Fenster gezeigt werden soll, mach sichtbar
if(showCookieWindow === 'true'){
    console.log("accepted");
    document.querySelector('.cookieContainer').style.display = 'block';
}else if(showCookieWindow === 'false'){
    console.log("denied");
    document.querySelector('.cookieContainer').style.display = 'none';
}else{
    console.log("not set");
    document.querySelector('.cookieContainer').style.display = 'block';
}

// Wenn Erscheinungspräferenz gespeichert, lade appearance script mit local starage, sonst ohne
if(savePreference === 'true'){
    loadCookieAppearance();
}
else{
    loadDefaultAppearance();
}





});



function saveCookies(savePreference, showCookieWindow){

    console.log('Erscheinungspräferenz speichern:', savePreference);
    console.log('Dieses Fenster erneut anzeigen:', showCookieWindow);

    localStorage.setItem('savePreference', savePreference);
    localStorage.setItem('showCookieWindow',showCookieWindow);
    document.querySelector('.cookieContainer').style.display = 'none';
}