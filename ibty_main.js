$(document).ready(function(){
    $(window).scroll(function(){
        var scroll = $(window).scrollTop();
        if (scroll > 300) {
          $(".navbar").css({background: "-webkit-gradient(linear, left top, left bottom, from(#00000080), to(#ffffff00))"});
          $(".navbar").css({"backdrop-filter":"blur(35px)"});
        }
  
        else{
            $(".navbar").css({background: "-webkit-gradient(linear, left top, left bottom, from(#00000080), to(#ffffff00))"});  	
        }
    })
  });