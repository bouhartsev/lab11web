error=false;

$(document).ready(function(){
	$('.load').find('p').on('DOMSubtreeModified', function(){
		$('.load').find('p').css('left', `${75 - $('.circle_box>p').width()/2}px`);
	});

	load_interval = setInterval(
		async function(){
			if(window.performance.now()/1000>10) {
				$('.load').find('p').text('Всё зависло :(');
				clearInterval(load_interval);
			}
			else if (window.performance.now()/1000>5){
				$('.load').find('p').show();
				$('.load').find('p').text('Долгая загрузка...');
			}
	}, 1000);
});

$(window).on('load', function () {
	clearInterval(load_interval);
	if(error==false){
		$('.load').fadeOut(1000)

		$("body").css('zoom', ($( window ).width()/1920))
		$( window ).resize(function() {$("body").css('zoom',($( window ).width()/1920))});

		$('#video_promo').click(function() {
			if (!this.paused) {
				this.pause();
				$('.play_icon').show();
				$('.text_video').show();
				$('#video_promo').addClass('video_paused');
				$("<div/>", {
					id: 'video_poster',
					style: `
						display: block;
						position: absolute;
						width: ${$('#video_promo').attr('width')}px;
						height: ${$('#video_promo').attr('height')}px;
						background: url("${$('#video_promo').attr('poster')}");
						z-index: 0;
						top: 0;
						left: 0;
					`
				}).prependTo('.video');
			}
		});

		$('.play_icon').click(function(){
			$('.play_icon').hide();
			$('.text_video').hide();
			$('#video_promo').removeClass();
			$('#video_poster').detach();
			$('#video_promo').get(0).play();
		});

		$('div.controller#forward').click(function(){
//			child_arr = $('.slider').children().slice(0, -1);
//			if (child_arr.length>3) {
//				selection_id = child_arr.find('.product_select').prop('id');
//				selection_id.replace('product', '');
				console.log($('.slider').children().find('.product_select'));
//			}
		});

		$('.load').detach();
	}
});

$(window).on('error', function () {
	error=true;
	$('.load').find('p').show();
	$('.load').find('p').text('Ошибка загрузки');
	$('.load').find('p').css('left', `${75 - $('.circle_box>p').width()/2}px`);
});

//on, show, hide, text, css, detach, prependTo, width, find, ready - 10
//addClass, removeClass, fadeOut, get, children, prop
