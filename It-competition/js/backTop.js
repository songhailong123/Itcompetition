//注释部分为原生方法实现,最开始用的原生，但jq有ready方法，就用了jq=-=;
$(document).ready(function() {
	function backtop(item) {
		var oclientHeight = document.documentElement.clientHeight;
		var timer = null;
//		var flag = true;
		window.onscroll = function() {
			var otop = document.documentElement.scrollTop || document.body.scrollTop;
			if(otop >= oclientHeight * 0.2) {
				$(item).css("display","block");
			} else {
				$(item).css("display","none");
			}
//			if(!flag) {
//				clearInterval(timer);
//			}
//			flag = false;
		}
		$(item).click(function() {
			$('html,body').animate({scrollTop:0},300);
//			timer = setInterval(function() {
//				var num = document.documentElement.scrollTop || document.body.scrollTop;
//				var speed = Math.floor(-num / 6);
//				var s = num + speed;
//				if(s < 10) {
//					s = 0;
//				}
//				document.documentElement.scrollTop = document.body.scrollTop = s;
//				flag = true;
//				if(s == 0) {
//					clearInterval(timer);
//				}
//			}, 30);
	});
	}
	backtop("#btn");
});