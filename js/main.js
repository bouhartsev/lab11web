error=false;

load_interval = setInterval(
	async function(){
		console.log(window.performance.now())
		if (window.performance.now()/1000>10){
			$('.load').find('p').show();
		}
	}, 1000)
$();

$(document).ready(function(){
	$("body").css('zoom', ($( window ).width()/1920))
	$( window ).resize(function() {$("body").css('zoom',($( window ).width()/1920))});
});

$(window).on('load', function () {
	clearInterval(load_interval);
	if(error==false){
		$('.load').fadeOut(1000)
		//$('.load').toggle();
		$('.load').detach();
	}

});

$(window).on('error', function () {
	error=true;
	$('.load').find('p').show();
	$('.load').find('p').text('Ошибка загрузки');
//	$('.load').fadeOut(1000)
//	$('.load').toggle();
//	$('.load').detach();
});
