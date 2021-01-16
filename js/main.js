error=false;

$(window).on('error', function () {
	error=true;
	$('.load').find('p').show();
	$('.load').find('p').text('Ошибка загрузки');
	$('.load').find('p').css('left', `${75 - $('.circle_box>p').width()/2}px`);
});

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

	$("body").css('zoom', ($( window ).width()/1920))
	$( window ).resize(function() {$("body").css('zoom',($( window ).width()/1920))});

	var availableTags = [
	  "Испанский",
	  "Итальянский",
	  "Английский",
	  "Китайский",
	  "Русский"
	];

	$("input[name='name']").autocomplete({source: availableTags});
});

$(window).on('load', function () {
	child_arr = $('.slider').children().slice(0, -1);
	child_arr.each(function(i){
		if (i==1) $(this).find('.slider_image').find('img').css('padding-top', ($(this).find('.slider_image').height() - $(this).find('.slider_image').find('img').height()));
		if(i>2) $(this).hide();
	})
	product_num=''+child_arr.length;
	if (child_arr.length<10) product_num='0'+child_arr.length;
	$('.product_number').html('<span>02</span>/'+product_num);




	clearInterval(load_interval);
	if(error==false){
		$('.load').fadeOut(1000)



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

		$('div.controller').click(function(event){
			direction = event.currentTarget.getAttribute('id')
			child_arr = $('.slider').children().slice(0, -1);
			if (child_arr.length>3) {
				selection_product = $('.slider').find('.product_select');
				selection_id = Number(selection_product.prop('id').replace('product', ''));
				if((selection_id!=2 && direction=='back')||(selection_id!=child_arr.length-1 && direction=='forward')){
					if(selection_id!=2 && direction=='back') {
						selection_product.next().hide();

						selection_product.removeClass('product_select');
						selection_product.addClass('not_select');
						selection_product.find('.link').removeClass('button');
						selection_product.find('.link').addClass('product_link');

						selection_product.prev().removeClass('not_select');
						selection_product.prev().addClass('product_select');
						selection_product.prev().find('.link').removeClass('product_link');
						selection_product.prev().find('.link').addClass('button');

						selection_product.prev().prev().show();

						selection_product.prev().find('.slider_image').find('img').css('padding-top', (selection_product.prev().find('.slider_image').height() - selection_product.prev().find('.slider_image').find('img').height()));
						selection_product.prev().prev().find('.slider_image').find('img').css('padding-top', 0);

						selection_id--;
					}
					else {
						selection_product.prev().hide();

						selection_product.removeClass('product_select');
						selection_product.addClass('not_select');
						selection_product.find('.link').removeClass('button');
						selection_product.find('.link').addClass('product_link');

						selection_product.next().removeClass('not_select');
						selection_product.next().addClass('product_select');
						selection_product.next().find('.link').removeClass('product_link');
						selection_product.next().find('.link').addClass('button');

						selection_product.next().next().show();

						selection_product.next().find('.slider_image').find('img').css('padding-top', (selection_product.next().find('.slider_image').height() - selection_product.next().find('.slider_image').find('img').height()));
						selection_product.next().next().find('.slider_image').find('img').css('padding-top', 0);

						selection_id++;
					}
					product_num = ''+selection_id;
					if(selection_id<10) product_num = '0'+selection_id;
					$('.product_number').find('span').text(product_num);

					selection_product.find('.slider_image').find('img').css('padding-top', 0);
				}
			}
		});

		$('.load').detach();
	}
});

//on, show, hide, text, css, detach, prependTo, width, find, ready - 10
//addClass, removeClass, fadeOut, get, children, prop, prev, next, etc.
//
