app.controller('TimelineController', ['$scope', 'rows', function($scope, rows) {
	var inited = false;
	var $polaroids = $('#polaroids'); 
	var $nav = $('.navegation');
	var $info = $('.info');
	var $infoCont = $('.info_cont');
	var $thanks = $('.thanks');

	$scope.init = function() {
		var tileH = $('.tile').css('padding-bottom');
		var tileHV = tileH.split('px')[0]*3;
		var infoH = $(window).height() - tileHV - 115;
		$info.height(infoH);
		$('.tile_hover').each(function(){
			$(this).height(tileH);
		});
		if (!inited) {
			$nav.hide();
		}
		inited = true;
	}

  rows.success(function(data) {
    $scope.rows = data; 
  });

  $scope.zoom = function($event){
		//$currentTile es un objeto jQuery que referencia al objeto clickeado
  	$currentTile = $($event.currentTarget);

		var $tileHover = $currentTile.find('.tile_hover');
		var $tileInfo = $currentTile.find('.tile_info');
		var year = $tileHover.find('h1').text().split('[')[0];

		tileX = $currentTile.offset().left;
		tileY = $currentTile.offset().top - 115;

		if(!$currentTile.hasClass('zoomed')){
			$polaroids.css('-webkit-transform', 'scale(3) translate(-'+tileX+'px, -'+tileY+'px)');
			$tileHover.css('display', 'none');
			$currentTile.css('cursor', 'default');
			$thanks.hide();
			
			var showInfo = function() {
				$nav.show();
				$infoCont.find('h3').text($tileInfo.find('h3').text());
				$infoCont.find('p').text($tileInfo.find('p').text());
				$infoCont.show();
			};

			setTimeout(showInfo, 700);
			$currentTile.addClass('zoomed');	
		}	
  };

  $scope.next = function(){
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
  };

  $scope.back = function(){
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
  };

  $scope.home = function(){
  	$nav.hide();
		$currentTile.removeClass('zoomed');
		$currentTile.find('.tile_hover').css('display', 'flex');
		$currentTile.css('cursor', 'pointer');
		$infoCont.hide();
		$polaroids.css('-webkit-transform', 'scale(1)');
		$thanks.show();
  };
}]);