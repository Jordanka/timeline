app.controller('TimelineController', ['$scope', 'rows', function($scope, rows) {
	var inited = false;
	var $polaroids = $('#polaroids'); 
	var $nav = $('.navegation');
	var $info = $('.info');
	var $infoCont = $('.info_cont');
	var $thanks = $('.thanks');

	var nextTile = function($current){
		if ($current.is($current.closest('.row').find('.tile').last())){ 
			return ($current.closest('.row').next(".row").length) 
				? $current.closest('.row').next().find('.tile').first()
				: null;
		}
		return $current.next();
	};

	var prevTile = function($current){
		if($current.is($current.closest('.row').find('.tile').first())){
			return ($current.closest('.row').prev(".row").length)
				? $current.closest('.row').prev().find('.tile').last()
				: null;
		}				
		return $current.prev();
	};

	$scope.init = function() {
		var tileH = $('.tile').css('padding-bottom');
		if (tileH) {
			var tileHV = tileH.split('px')[0]*3;
			var infoH = $(window).height() - tileHV - 125;
			$info.height(infoH);
			$('.tile_hover').each(function(){
				$(this).height(tileH);
			});
		}
	
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
		tileY = $currentTile.offset().top - 125;

		if(!$currentTile.hasClass('zoomed')){
			var $nextTile = nextTile($currentTile);
			var $prevTile = prevTile($currentTile);
			if ($nextTile) $(".navegation .next").show(); else $(".navegation .next").hide()
			if ($prevTile) $(".navegation .back").show(); else $(".navegation .back").hide()

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
			$(".tile").removeClass('zoomed');
			$currentTile.addClass('zoomed');	
		}	
  };

  $scope.next = function(){
  	$nav.hide();
		$currentTile.removeClass('zoomed');
		$currentTile.css('cursor', 'pointer');
		$infoCont.hide();	
		$polaroids.css('-webkit-transform', 'scale(1)');
		
		setTimeout(function(){
			$currentTile.find('.tile_hover').css('display', 'flex');
			var $nextTile = nextTile($currentTile);
			if ($nextTile) $nextTile.click();
		}, 700);
  };

  $scope.back = function(){
  	$nav.hide();
		$currentTile.removeClass('zoomed');
		$currentTile.css('cursor', 'pointer');
		$infoCont.hide();
		$polaroids.css('-webkit-transform', 'scale(1)');
		
		setTimeout(function(){
			$currentTile.find('.tile_hover').css('display', 'flex');
			var $prevTile = prevTile($currentTile);
			if ($prevTile) $prevTile.click();
		}, 700);
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