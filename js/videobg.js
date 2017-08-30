var bgs = [];
var fgs = [];

jQuery(document).ready(function($) {

	if(jQuery.browser.mobile){
		$('body').addClass('video-disabled');
	} else {
		$('body').addClass('video-enabled');
	}

	var BGoptions = {
		autoplay  : true,
		loop      : true,
		scale: true,
		zIndex: -1,
		position: 'absolute',
		width: '100%',
		height: '100%'
	};
	
	
	$('.video-enabled .background-player').each(function(index) {

		var $video = $(this);
		var $container = $(this).closest('.videowrap');
		var videoURL = $(this).attr('data-video');
		var ogvURL = $(this).attr('data-ogv');
		var webmURL = $(this).attr('data-webm');
		var vids = {
			mp4       : videoURL,
			ogv       : ogvURL,
			webm      : webmURL
		}
		$.extend(BGoptions,vids);
		
		bgs[index] = $video.videoBG(BGoptions);
		bgs[index].muted=true; 
		bgs[index].pause();
		bgs[index].play();
		resizeToCover();
	});
	
	var FGoptions = {
		autoplay  : false,
		loop      : false,
		scale:true,
		zIndex: 99,
		position:'absolute',
		width: '100%',
		height: '100%',
		// controls: true
	};
	
	
	$('.video-enabled .foreground-player').each(function(index) {
		var $video = $(this);
		var $container = $(this).closest('.video-module').addClass('set-height');
		var videoURL = $(this).attr('data-video');
		var ogvURL = $(this).attr('data-ogv');
		var webmURL = $(this).attr('data-webm');
		var $trigger = $container.find('.trigger');
		var $closebtn = $container.find('.close');
		
		var vids = {
			mp4       : videoURL,
			ogv       : ogvURL,
			webm      : webmURL
		}
		$.extend(FGoptions,vids);
		
		fgs[index] = $video.videoBG(FGoptions);
		
		var $playBtn = $container.find('.plause');
		$playBtn.on('click', function(e) {
			if (fgs[index].paused == true) {
				$playBtn.removeClass('paused').addClass('playing');
				fgs[index].play();
			} else {
				$playBtn.addClass('paused').removeClass('playing');
				fgs[index].pause();
			}
		});


		var $progressBar = $container.find('.progress');
		$progressBar.click(function(e) {
			fgs[index].pause();
			
			var posX = $progressBar.offset();
			var left = e.pageX - posX.left;
			
			var percent = left / $progressBar.width();

			if (typeof fgs[index].currentTime != undefined) {
				fgs[index].currentTime = fgs[index].duration * percent;
			} else {
				fgs[index].seek(fgs[index].duration * percent);
			}
			setTimeout(function () {
				fgs[index].play();
			}, 2000);
		});

		$trigger.click(function(e) {
			e.preventDefault();
			var length = 0;
			// $('.close:visible').click();

			$container.removeClass('set-height');
			$container.addClass('full-height foreground');
			$.each(fgs, function(){this.pause();});
			$.each(bgs, function(){this.muted=true;});
			bgs[index].pause();
			fgs[index].play();
			fgs[index].muted = false;
			fgs[index].currentTime = 0;

			startCount(fgs[index], $progressBar, $playBtn, $closebtn);

			
			if ($container.offset()) {
				$('html, body').stop().animate({
					'scrollTop': $container.offset().top-0
				}, 900, 'swing').promise().done(function(){
					if($('body').hasClass('auto-close-menu') && $('.menu-open').length > 0){
						$('#menuToggle, #menuToggleLeft').click();
					}
				});
			}
			
			
			// $container.find('.video').each(function(){ console.log(this.duration);this.muted=false; this.currentTime =0;this.play()})
			// fgs[index].setFullscreen();
		    resizeToCover();
		});
		
		$closebtn.on('click',function(e) {
			e.preventDefault();
			closeVideo($container);
		});
	});
	
	$('video').each(function(){this.muted=true; this.pause()});

    $('#debug').append("<p>DOM loaded</p>");
    jQuery(window).resize(function () { resizeToCover(); });
	setTimeout(function () {
	    jQuery(window).trigger('resize');
	}, 1000);
	
});

function closeVideo ($container) {
	// background.play();
	$container.find('.background-player video').each(function(index) {
		this.play()
	});;
	
	$container.addClass('set-height');
	$container.removeClass('full-height foreground');
	$container.find('video').each(function(){this.muted=true});
	
	resizeToCover();
}

function startCount(video, timer, play, closebutton) {
    window.t = window.setInterval(function() {
		
		
		if (video.buffered.end(0) != video.duration) {
			timer.find('.loaded').css('width', 100 * (video.buffered.end(0) / video.duration) + '%')
		}
		
		if (video.paused != true) {
            play.addClass('playing');
		} else {
            play.removeClass('playing');
		}
		// end testing
        if (video.ended != true) {
			timer.find('.played').css('width', 100 * (video.currentTime / video.duration) + '%')
            // timer.firstChild.nodeValue = Math.round(video.currentTime + 1);
        } else {
			timer.find('.played').css('width', '0%')
			closeVideo($(video).closest('.video-module'));
            play.addClass('paused');
            window.clearInterval(window.t);
			$('.close').trigger('click');
        }
    },1000);		
}



vid_w_orig = parseInt(jQuery('.cover .background-player video').attr('width'));
vid_h_orig = parseInt(jQuery('.cover .background-player video').attr('height'));


function resizeToCover() {
	var min_w = 200;
    // set the video viewport to the window size
    jQuery('.cover .background-player .videoBG').width(jQuery(window).width());
    jQuery('.cover .background-player .videoBG').height(jQuery(window).height());

    // use largest scale factor of horizontal/vertical
    var scale_h = jQuery(window).width() / vid_w_orig;
    var scale_v = jQuery(window).height() / vid_h_orig;
    var scale = scale_h > scale_v ? scale_h : scale_v;

    // don't allow scaled width < minimum video width
    if (scale * vid_w_orig < min_w) {scale = min_w / vid_w_orig;};

    // now scale the video
    jQuery('.cover .background-player video').width(scale * vid_w_orig);
    jQuery('.cover .background-player video').height(scale * vid_h_orig);
    // and center it by scrolling the video viewport
    jQuery('.cover .background-player .videoBG').scrollLeft((jQuery('video').width() - jQuery(window).width()) / 2);
    jQuery('.cover .background-player .videoBG').scrollTop((jQuery('video').height() - jQuery(window).height()) / 2);

    // debug output
    jQuery('#debug').html("<p>win_w: " + jQuery(window).width() + "</p>");
    jQuery('#debug').append("<p>win_h: " + jQuery(window).height() + "</p>");
    jQuery('#debug').append("<p>viewport_w: " + jQuery('#video-viewport').width() + "</p>");
    jQuery('#debug').append("<p>viewport_h: " + jQuery('#video-viewport').height() + "</p>");
    jQuery('#debug').append("<p>video_w: " + jQuery('video').width() + "</p>");
    jQuery('#debug').append("<p>video_h: " + jQuery('video').height() + "</p>");
    jQuery('#debug').append("<p>vid_w_orig: " + vid_w_orig + "</p>");
    jQuery('#debug').append("<p>vid_h_orig: " + vid_h_orig + "</p>");
    jQuery('#debug').append("<p>scale: " + scale + "</p>");
};