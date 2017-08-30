// JavaScript Document

function bgParallax(){
	var pos1 = $('.window1').offset().top;
	var pos2 = $('.window2').offset().top;
	var pos3 = $('.window3').offset().top;
	var winHeight = $(window).height();
	var pageTop = $(document).scrollTop();
	var topNav = $(document).scrollTop() + 73;
	if(pos1 <= topNav && topNav <= pos2 && topNav <= pos3){
		$('body').css('background-image','url(./img/parallax_1.jpg)');
	}
	if(pos2 <= topNav && topNav >= pos1 && topNav <= pos3){
		$('body').css('background-image','url(./img/parallax_2.jpg)');
	}
	if(pos3 <= topNav && topNav >= pos2 && topNav >= pos3){
		$('body').css('background-image','url(./img/parallax_3.jpg)');
	}
	if((pos1 - pageTop) <= (winHeight/2)){
		$('.fixed').css('background-image','url(./img/parallax_1.jpg)');
		$('.fixed p.caption').html('IMAGE COURTESEY OF MAJESTIC ELEGANCE PUNTA CANA');
	}
	if((pos2 - pageTop) <= (winHeight/2)){
		$('.fixed').css('background-image','url(./img/parallax_2.jpg)');
		$('.fixed p.caption').html('IMAGE COURTESEY OF ROYAL LAHAINA RESORT');
	}
	if((pos3 - pageTop) <= (winHeight/2)){
		$('.fixed').css('background-image','url(./img/parallax_3.jpg)');
		$('.fixed p.caption').html('IMAGE COURTESEY OF SUNSET JAMAICA GRANDE');
	}
}

$(document).ready(function(){
	//scroll
	if($(window).width() > 783){
			bgParallax();
		$(window).scroll(function(){
			bgParallax();
		});
	}
});

$(window).bind('resize', function(){
	if ($(window).width() > 783){
		bgParallax();
	}
	if ($(window).width() <= 783){
		$('body').css('background-image','none');
	}
});