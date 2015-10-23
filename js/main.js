(function($){
	var $polaroids = $('#polaroids'); 
	var $nav = $('.navegation');
	var $info = $('.info');
	var $infoCont = $('.info_cont');
	var $thanks = $('.thanks');
	
	var tileH = $('.tile').css('padding-bottom');
	var tileHV = tileH.split('px')[0]*3;
	var infoH = $(window).height() - tileHV - 115;

	$('.tile').on('click', function(){
		$currentTile = $(this);
		var $tileHover = $(this).find('.tile_hover');
		var $tileInfo = $(this).find('.tile_info');
		var year = $tileHover.find('h1').text().split('[')[0];

		$('.chrono li').each(function(){
			if($(this).text() == year){
				$(this).addClass('selected');
			}
		});

		tileX = $currentTile.offset().left;
		tileY = $currentTile.offset().top - 115;	

		if(!$(this).hasClass('zoomed')){
			$polaroids.css('-webkit-transform', 'scale(3) translate(-'+tileX+'px, -'+tileY+'px)');
			$tileHover.css('display', 'none');
			$(this).css('cursor', 'default');
			$thanks.hide();
			
			var showInfo = function() {
				$nav.show();
				$infoCont.find('h3').text($tileInfo.find('h3').text());
				$infoCont.find('p').text($tileInfo.find('p').text());
				$infoCont.show();
			};

			setTimeout(showInfo, 700);

			$(this).addClass('zoomed');	
		}
	});

	$('.next').on('click', function(){
		$nav.hide();
		$currentTile.removeClass('zoomed');
		$infoCont.hide();	
		$polaroids.css('-webkit-transform', 'scale(1)');
		
		var nextTile = function(){
			if($currentTile.is($currentTile.closest('.row').find('.tile').last())){
				$currentTile = $currentTile.closest('.row').next().find('.tile').first();
			} else {
				$currentTile = $currentTile.next();
			}		
			
			$currentTile.click();	
		};
		setTimeout(nextTile, 700);		
	});

	$('.back').on('click', function(){
		$nav.hide();
		$currentTile.removeClass('zoomed');
		$infoCont.show();
		$polaroids.css('-webkit-transform', 'scale(1)');
		
		var prevTile = function(){
			if($currentTile.is($currentTile.closest('.row').find('.tile').first())){
				$currentTile = $currentTile.closest('.row').prev().find('.tile').last();
			} else {
				$currentTile = $currentTile.prev();
			}		
			
			$currentTile.click();
		};
		setTimeout(prevTile, 500);		
	});

	$('.home').on('click', function(){
		$nav.hide();
		$currentTile.removeClass('zoomed');
		$currentTile.find('.tile_hover').css('display', 'flex');
		$currentTile.css('cursor', 'pointer');
		$infoCont.show();
		$polaroids.css('-webkit-transform', 'scale(1)');
	});

	$nav.hide();
	$('.info').height(infoH);
	$('.tile_hover').each(function(){
		$(this).height(tileH);
	});
})(jQuery);