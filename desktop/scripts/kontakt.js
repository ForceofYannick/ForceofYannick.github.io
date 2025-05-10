function copyFunction(id) {

    var element = document.getElementById(id);
    var text = element.innerHTML;

    navigator.clipboard.writeText(text);
    $(`#${id}`).text("Kopiert!");

    setTimeout(() => {
        $(`#mail`).text("ibtc.league.contact@gmail.com");
        $(`#discord`).text("ibt_cuukey");
        $(`#webmail`).text("forceofyannick@gmail.com");
        $(`#webdiscord`).text("force_of_yannick");
    }, 1000);
}