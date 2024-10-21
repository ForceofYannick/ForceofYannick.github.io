function copyFunction(id){

    var element = document.getElementById(id);
    var text = element.innerHTML;

    navigator.clipboard.writeText(text);
    $(`#${id}`).text("Kopiert!");
    
    setTimeout(() => {
        $(`#${id}`).text(text);
    }, 1000);
}