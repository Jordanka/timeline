var app = angular.module('TimelineApp', []);

(function($){
	var $polaroids = $('#polaroids'); 
	var $nav = $('.navegation');
	var $info = $('.info');

	$('#thanks').css('margin-top', $polaroids.height() + 60);
	$nav.hide();


	$('.tile').on('click', function(){
		$currentTile = $(this);
		var $tileInfo = $(this).find('.tile_info');

		tileX = $currentTile.offset().left;
		tileY = $currentTile.offset().top - 120;
		var tileH = $(this).css('padding-bottom');		

		if(!$(this).hasClass('zoomed')){
			$polaroids.css('-webkit-transform', 'scale(3) translate(-'+tileX+'px, -'+tileY+'px)');
			
			var showInfo = function() {
				$info.removeClass('hide');
				$nav.show();
			};
			setTimeout(showInfo, 500);

			$(this).addClass('zoomed');

			$(this).find('.tile_hover').css('display', 'none');
			$tileInfo.show();
			$tileInfo.css('left', tileX+'px');
			$tileInfo.css('top', tileH);
		}
	});

	$('.next').on('click', function(){
		$nav.hide();
		$info.addClass('hide');
		$currentTile.removeClass('zoomed');

		$currentTile.find('.tile_info').hide();
		
		$polaroids.css('-webkit-transform', 'scale(1)');
		
		var nextTile = function(){
			if($currentTile.is($currentTile.closest('.row').find('.tile').last())){
				$currentTile = $currentTile.closest('.row').next().find('.tile').first();
			} else {
				$currentTile = $currentTile.next();
			}		
			
			$currentTile.click();	
		};
		setTimeout(nextTile, 500);		
	});

	$('.back').on('click', function(){
		$nav.hide();
		$info.addClass('hide');
		$polaroids.css('-webkit-transform', 'scale(1)');
		
		var prevTile = function(){
			$currentTile.removeClass('zoomed');
			
			if($currentTile.is($currentTile.closest('.row').find('.tile').first())){
				$currentTile = $currentTile.closest('.row').prev().find('.tile').last();
			} else {
				$currentTile = $currentTile.prev();
			}		
			
			$currentTile.click();
		};
		setTimeout(prevTile, 500);		
	});
})(jQuery);