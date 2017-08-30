// JavaScript Document

$(document).ready(function(){
	bigSlides();
	overlay();
	//nav
	$('.mobile-menu').on('click', function(){
		$(this).toggleClass('active');
		$('.top-nav, .bottom-nav').toggle();
	});
	
	if(jQuery.browser.mobile){
		$('.inactive').attr({
			'href': '',
			'target': '_self'
		});
	}
	
	//homepage slideshow
	$('#home .flexslider').flexslider({
		selector: ".slides > li",
		animation: "fade",
		directionNav: false,
		controlNav: false
	});

	//slideshow
	$('.flexslider').not('#home .flexslider').flexslider({
		selector: ".slides > li",
		animation: "fade"
	});
});

$(window).bind('resize', function(){
	menuShow();
	bigSlides();
	overlay();
});

$(window).on('load', function(){
	bigSlides();
	overlay();
});

function menuShow(){
	if($(window).width() > 783 && $('.top-nav, .bottom-nav').is(':hidden')){
		$('.mobile-menu').trigger('click');
	}
}

function bigSlides(){
	if($('#home').length > 0){
		$screenWd = $(window).width();
		$screenHt = $(window).height();
		$navHt = $('#home .nav-container').height();
		$flex = $('#home .flexslider');
		$slide = $('#home .flexslider ul.slides li img');
		$slideHt = $screenHt - $navHt;
		if($screenWd > 768 && $screenHt > 768){
			$slideWd = $slideHt * 2.1613832853
			$flex.height($slideHt);
			$slide.height($slideHt);
			$slide.width($slideWd);
			if($slideWd > $screenWd){
				$left = ($slideWd - $screenWd)/2;
				$slide.css('left', -$left);
			} else if($slideWd < $screenWd){
				$slide.width($screenWd);
				$slide.height($screenWd/2.1613832853);
				$slide.css('left', '0px');
			}
		} else {
			$flex.css({
				'height': 'inherit'
			});
			$slide.css({
				'position': 'inherit',
				'left': 'inherit',
				'width': 'inherit',
				'height': 'inherit'
			});
		}
	}
}

function overlay(){
	if($('#home').length > 0){
		$screenWd = $(window).width();
		$screenHt = $(window).height();
		$overlay = $('#home .overlay');
		$slideHeight = $('#home .flexslider').height();
		$content = $('#home .main-container');
		$overlay.height($slideHeight);
		if($screenWd >= 1285 && $screenHt > 768){
			$content.css('margin-top','-334px');
		} else if($screenWd > 768 && $screenWd <= 1284 && $screenHt > 768){
			$content.css('margin-top','-275px');
		} else if($screenWd > 768 && $screenHt <= 768){
			$content.css('margin-top','inherit');
		} else {
			$content.css('margin-top','inherit');
		}
		if($screenWd <= 768){
			$overlay.css('line-height',$overlay.height() + 'px');
		}
		if($screenHt <= 768){
			$overlay.css('line-height',$overlay.height() + 'px');
			$('#home .overlay h1').addClass('short');
		} else {
			$('#home .overlay h1').removeClass('short');
		}
	}
}

