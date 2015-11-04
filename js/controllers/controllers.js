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

  rows.success(function(data) {
    $scope.rows = data;
    
    $(document).on("img_progress", function(ev, data){
    	$('.total').text(data.total);
    	$('.partial').text(data.count); 
    })

    $(document).on("img_done", function(ev, data){    	
    	$('#back_loader').fadeOut('slow'); 
    	setTimeout(function(){
    		$(window).trigger("resize");
    	},100)
    })

		// Preload
  	var imgs = {};
  	var total = 0;
  	var count = 0;

  	for (var r1 in data) {
  		for (var r2 in data[r1]) {
  			for (var r3 in data[r1][r2]) {      				
    			if (r3.substr(0,3) == "img") {
    				total += 1;
    				imgs["i"+r1+"."+r2+"."+r3] = data[r1][r2][r3];
    			}
  			}
  		}
  	}      	
  	
  	for (var i in imgs) {
  		var img = new Image();      		      		
  		img.index = i;

  		img.onload = function() {
				count += 1;
				var data = {
					ok: true,
					src: imgs[this.index],
					count: count,
					total: total
				};
  			$(document).trigger("img_progress", data);
  			if (total == count) $(document).trigger("img_done");
  		}

  		img.onerror = function() {
  			count += 1;
				var data = {
					ok: false,
					src: imgs[this.index],
					count: count,
					total: total
				};
				$(document).trigger("img_progress", data);
				if (total == count) $(document).trigger("img_done");
  		}

  		img.src = imgs[i];
  	}
		// Preload
  });

	$scope.init = function() {
	
		if (!inited) {
			$nav.hide();
		}
		inited = true;
		// Padding-bottom fix for firefox
		$('.tile').each(function(){
			var $tile = $(this);
			var width = parseFloat($tile.css("width"));
			console.log(width);
			$tile.css({
				"padding-bottom": width * 0.0875 * 3 + "px"
			})
		})
		// 
		var tileH = $('.tile').css('padding-bottom');
		if (tileH) {
			var tileHV = tileH.split('px')[0]*3;
			var infoH = $(window).height() - tileHV - 125;
			$info.height(infoH);
			$('.tile_hover').each(function(){
				$(this).find('div').height(tileH);
				$(this).find('div').css('margin-top', '-'+tileH);
			});
		}
	}

	$(window).on("resize", function() {
		cont=0;
		$('.tile').each(function(){
			if($(this).hasClass('zoomed')){
				cont=1;
			}
		});
		if(cont!=0){
			$scope.home();
			$scope.init();
		} else {
			$scope.init();
		}
	})

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
			$polaroids.css('-moz-transform', 'scale(3) translate(-'+tileX+'px, -'+tileY+'px)');
			$polaroids.css('-o-transform', 'scale(3) translate(-'+tileX+'px, -'+tileY+'px)');
			$polaroids.css('transform', 'scale(3) translate(-'+tileX+'px, -'+tileY+'px)');
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
		$polaroids.css('-moz-transform', 'scale(1)');
		$polaroids.css('-o-transform', 'scale(1)');
		$polaroids.css('transform', 'scale(1)');
		
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
		$polaroids.css('-moz-transform', 'scale(1)');
		$polaroids.css('-o-transform', 'scale(1)');
		$polaroids.css('transform', 'scale(1)');
		
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
		$polaroids.css('-moz-transform', 'scale(1)');
		$polaroids.css('-o-transform', 'scale(1)');
		$polaroids.css('transform', 'scale(1)');
		$thanks.show();
  };
}]);