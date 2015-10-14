app.controller('TimelineController', ['$scope', 'years', function($scope, years) {
  
  years.success(function(data) {
    $scope.years = data; 
  });

  $scope.zoom = function(year){
    $scope.zoomed = year;

		$scope.isSelected = function(year) {
      return $scope.zoomed === year;
    }

		/*
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
				$chrono.css('display', 'table');
				$infoCont.find('h3').text($tileInfo.find('h3').text());
				$infoCont.find('p').text($tileInfo.find('p').text());
				$infoCont.show();
			};

			setTimeout(showInfo, 700);

			$(this).addClass('zoomed');	
		}*/
  };
}]);