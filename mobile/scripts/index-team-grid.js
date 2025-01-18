var logoSize = 600;

var logoYOffset = 25;

var logoXOffsetA = 9;
var logoXOffsetB = 30;
var logoXOffsetC = 50;
var logoXOffsetD = 70;
var logoXOffsetE = 91; 

var logoApath = "/media/Logos/IBTC_Logo_full_clear_white_fade.png";
var logoBpath = "/media/Logos/IBTY_Logo_full_clear_white_fade.png";
var logoCpath = "/media/Logos/IBTP_Logo_full_clear_white_fade.png";
var logoDpath = "/media/Logos/ICE_Logo_full_clear_white_fade.png";
var logoEpath = "/media/Logos/FF_Logo_full_clear_white_fade.png";

function grid_hover(team){
    var logoPath ="";
switch (team){
    case "A":
        logoPath =logoApath;
        break;
    case "B":
        logoPath =logoBpath;
        break;
    case "C":
        logoPath =logoCpath;
        break;
    case "D":
        logoPath =logoDpath;
        break;
    case "E":
        logoPath =logoEpath;
        break;
}

console.log(`grid_item${team} hover`);
$('.grid-itemA').css('background-image',`url("${logoPath}")`);
$('.grid-itemA').css('background-size', `${logoSize}%`);
$('.grid-itemA').css('background-repeat', 'no-repeat');
$('.grid-itemA').css('background-position', `${logoXOffsetA}% ${logoYOffset}%`);

$('.grid-itemB').css('background-image',`url("${logoPath}")`);
$('.grid-itemB').css('background-size', `${logoSize}%`);
$('.grid-itemB').css('background-repeat', 'no-repeat');
$('.grid-itemB').css('background-position', `${logoXOffsetB}% ${logoYOffset}%`);

$('.grid-itemC').css('background-image',`url("${logoPath}")`);
$('.grid-itemC').css('background-size', `${logoSize}%`);
$('.grid-itemC').css('background-repeat', 'no-repeat');
$('.grid-itemC').css('background-position', `${logoXOffsetC}% ${logoYOffset}%`);

$('.grid-itemD').css('background-image',`url("${logoPath}")`);
$('.grid-itemD').css('background-size', `${logoSize}%`);
$('.grid-itemD').css('background-repeat', 'no-repeat');
$('.grid-itemD').css('background-position', `${logoXOffsetD}% ${logoYOffset}%`);

$('.grid-itemE').css('background-image',`url("${logoPath}")`);
$('.grid-itemE').css('background-size', `${logoSize}%`);
$('.grid-itemE').css('background-repeat', 'no-repeat');
$('.grid-itemE').css('background-position', `${logoXOffsetE}% ${logoYOffset}%`);

}


function grid_reset(){
    console.log("grid reset");
    $('.grid-itemA').css('background-image',`url("${logoApath}")`);
    $('.grid-itemA').css('background-size', `${logoSize}%`);
    $('.grid-itemA').css('background-repeat', 'no-repeat');
    $('.grid-itemA').css('background-position', `${logoXOffsetA}% ${logoYOffset}%`);

    $('.grid-itemB').css('background-image',`url("${logoBpath}")`);
    $('.grid-itemB').css('background-size', `${logoSize}%`);
    $('.grid-itemB').css('background-repeat', 'no-repeat');
    $('.grid-itemB').css('background-position', `${logoXOffsetB}% ${logoYOffset}%`);

    $('.grid-itemC').css('background-image',`url("${logoCpath}")`);
    $('.grid-itemC').css('background-size', `${logoSize}%`);
    $('.grid-itemC').css('background-repeat', 'no-repeat');
    $('.grid-itemC').css('background-position', `${logoXOffsetC}% ${logoYOffset}%`);

    $('.grid-itemD').css('background-image',`url("${logoDpath}")`);
    $('.grid-itemD').css('background-size', `${logoSize}%`);
    $('.grid-itemD').css('background-repeat', 'no-repeat');
    $('.grid-itemD').css('background-position', `${logoXOffsetD}% ${logoYOffset}%`);

    $('.grid-itemE').css('background-image',`url("${logoEpath}")`);
    $('.grid-itemE').css('background-size', `${logoSize}%`);
    $('.grid-itemE').css('background-repeat', 'no-repeat');
    $('.grid-itemE').css('background-position', `${logoXOffsetE}% ${logoYOffset}%`);
}

window.grid_reset = grid_reset;