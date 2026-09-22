(function($) {

	"use strict";

	/* ----------------------------------------------------------- */
	/*  FUNCTION TO STOP LOCAL AND YOUTUBE VIDEOS IN SLIDESHOW
    /* ----------------------------------------------------------- */

	function stop_videos() {
		var video = document.getElementById("video");
		if (video && video.paused !== true && video.ended !== true) {
			video.pause();
		}
		var youtubeVideo = $('.youtube-video')[0];
		if (youtubeVideo && youtubeVideo.contentWindow) {
			youtubeVideo.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
		}
	}

	$(document).ready(function() {

		/* ----------------------------------------------------------- */
		/*  SHOW THE PROFILE IMAGE ON THE DESKTOP HOME PAGE
        /* ----------------------------------------------------------- */

		if ($('body.home').length && window.matchMedia('(min-width: 992px)').matches) {
			var desktopImage = $('<img>', {
				'class': 'desktop-home-image',
				src: 'Nava.jpg',
				alt: 'Navaneetha Manickam'
			});
			$('.home-content').before(desktopImage);
		}

		/* ----------------------------------------------------------- */
		/*  STOP VIDEOS
        /* ----------------------------------------------------------- */

		$('.slideshow nav span').on('click', function () {
			stop_videos();
		});

		/* ----------------------------------------------------------- */
		/*  FIX REVEALATOR ISSUE AFTER PAGE LOADED
        /* ----------------------------------------------------------- */

		$('.revealator-delay1').addClass('no-transform');

		/* ----------------------------------------------------------- */
		/*  PORTFOLIO GALLERY
        /* ----------------------------------------------------------- */

		if ($('.grid').length) {
			new CBPGridGallery(document.getElementById('grid-gallery'));
		}

		if ($('body.portfolio').length) {
			$('.grid-gallery').prepend('<p class="portfolio-click-guide" role="status"><i class="fa fa-hand-pointer-o" aria-hidden="true"></i> Click any image to open its achievement details.</p>');
			$('.grid figure').attr('title', 'Click to open achievement details');
		}

		/* ----------------------------------------------------------- */
		/*  BUTTONS ANIMATION
        /* ----------------------------------------------------------- */

		function checkSize() {
			if ($(document).width() > 992) {
				$('.btn').each(function() {
					if (!$(this).find('span[data-hover]').length) {
						var btn_text = $(this).text();
						$(this).empty().append('<span data-hover="' + btn_text + '">' + btn_text + '</span>');
					}
				});
			}
		}
		checkSize();
		window.addEventListener('resize', checkSize);

		/* ----------------------------------------------------------- */
		/*  HIDE HEADER WHEN PORTFOLIO SLIDESHOW OPENED
        /* ----------------------------------------------------------- */

		$('.grid figure').on('click', function() {
			$('#navbar-collapse-toggle').addClass('hide-header');
		});

		/* ----------------------------------------------------------- */
		/*  SHOW HEADER WHEN PORTFOLIO SLIDESHOW CLOSED
        /* ----------------------------------------------------------- */

		$('.nav-close').on('click', function() {
			$('#navbar-collapse-toggle').removeClass('hide-header');
		});
		$('.nav-prev').on('click', function() {
			if ($('.slideshow ul li:first-child').hasClass('current')) {
				$('#navbar-collapse-toggle').removeClass('hide-header');
			}
		});
		$('.nav-next').on('click', function() {
			if ($('.slideshow ul li:last-child').hasClass('current')) {
				$('#navbar-collapse-toggle').removeClass('hide-header');
			}
		});

		/* ----------------------------------------------------------- */
		/*  PORTFOLIO DIRECTION AWARE HOVER EFFECT
        /* ----------------------------------------------------------- */

		$('.grid li figure').each(function() {
			$(this).hoverdir();
		});

		/* ----------------------------------------------------------- */
		/*  AJAX CONTACT FORM
        /* ----------------------------------------------------------- */

		$('.contactform').on('submit', function() {
			$('.output_message').text('Sending...');

			var form = $(this);
			$.ajax({
				url: form.attr('action'),
				method: form.attr('method'),
				data: form.serialize(),
				success: function(result) {
					if (result == 'success') {
						$('.form-inputs').css('display', 'none');
						$('.box p').css('display', 'none');
						$('.contactform').find('.output_message').addClass('success');
						$('.output_message').text('Message Sent!');
					} else {
						$('.tabs-container').css('height', '440px');
						$('.contactform').find('.output_message').addClass('error');
						$('.output_message').text('Error Sending!');
					}
				}
			});

			return false;
		});

	});

	$(document).keyup(function(e) {

		/* ----------------------------------------------------------- */
		/*  KEYBOARD NAVIGATION IN PORTFOLIO SLIDESHOW
        /* ----------------------------------------------------------- */

		if (e.keyCode === 27) {
			stop_videos();
			$('.close-content').click();
			$('#navbar-collapse-toggle').removeClass('hide-header');
		}
		if ((e.keyCode === 37) || (e.keyCode === 39)) {
			stop_videos();
		}
	});

})(jQuery);
