$(document).ready(function(){
    // Load appearance
    window.loadAppearance();
});

function copyFunction(id){

    var element = document.getElementById(id);
    var text = element.innerHTML;

    navigator.clipboard.writeText(text);
    $(`#${id}`).text("Kopiert!");
    
    setTimeout(() => {
        $(`#name`).text("Tamino Weschler");
        $(`#mail`).text("ibtc.league.contact@gmail.com");
        $(`#phone`).text("+49 (0) 1511 1130 420");
        $(`#address`).text("Bertha von Suttner Allee 36 | 77933 Lahr-Schwarzwald");
        $(`#registerNr`).text("Registernummer im Vereinsregister");
        $(`#taxNr`).text("Umsatzsteueridentifikationsnummer $27a Abs. 1 Satz 1,2 oder 3");
        $(`#ecoNr`).text("Wirtschafts-Identifikationsnummer nach $139c Abs. 1");
    }, 1000);
}