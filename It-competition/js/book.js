$(function() {
	var pageNum = 0;
	var pageAll = $('.bookPage').length;
	for(var i = 0; i <= $('.runPage').length; i++) {
		$('.runPage').eq(i).css('z-index', pageAll - i);
		$('.runPage').eq(i).children('div').css('z-index', pageAll - i);
		$('.runPage').eq(i).children('img').css('z-index', pageAll - 1 - i);
	};

	$('.nextBtn').bind('click', function() {
		if(pageNum <= pageAll) {
			runNext(pageNum);
			pageNum++;
		};
		console.log(pageNum);
	});

	function runNext(index) {
		$('.runPage').eq(index).addClass('runClass');
		zIndexNext(index, $('.runPage').eq(index));
	}

	function zIndexNext(index, element) {
		if(index >= 1) {
			element.css('z-index', 3 + 2 * index);
		};
		setTimeout(function() {
			if(index == 0) {
				element.css('z-index', 3 + 2 * index);
			};
			element.children('div').css('z-index', 2 + 2 * index);
			element.children('img').css('z-index', 3 + 2 * index);
		}, 1000);
	}

	$('.lastBtn').bind('click', function() {
		if(pageNum >= 0) {
			pageNum--;
			runLast(pageNum);
		};
		console.log(pageNum);
	});

	function runLast(index) {
		$('.runPage').eq(index).removeClass('runClass');
		zIndexLast(index, $('.runPage').eq(index));
	}

	function zIndexLast(index, element) {
		if(index == 0) {
			element.css('z-index', 7 - 2 * index);
		};
		setTimeout(function() {
			element.css('z-index', pageAll - index);
			element.children('div').css('z-index', pageAll - index);
			element.children('img').css('z-index', pageAll - 1 - index);
		}, 1000);
	}
	console.log(pageAll);
	var timer=null;
	function a_next() {
		if(pageNum < pageAll - 1) {
			timer = setInterval(function() {
				runNext(pageNum);
				pageNum++;
				console.log(pageNum);
				if(pageNum==pageAll){
					$('.runPage').each(function(index,element){
						$('.runPage').eq(index).removeClass('runClass');
						zIndexLast(index, $('.runPage').eq(index));
					});
					pageNum=0;
				}
			}, 3000);
		}
	}
	$('.bookBox').mouseenter(function(){
		clearInterval(timer);
	}).mouseleave(function(){
		a_next();
	})
	a_next();
});