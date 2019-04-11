$(document).ready(function() {
	//超出部分自动隐藏并显示查看全文 
	$("#list_text a").each(function() {
		var maxLength = 110;
		var clientWidth = document.documentElement.clientWidth;
		var length = $(this).text().length;
		var textAll = $(this).text();
		var text = textAll.substr(0, maxLength);
		if(length > maxLength && clientWidth >= 1240) {
			$(this).text(text);
			$(this).append("......" + "<a href='alltext.html'class='seeAll' target='_blank'>查看全部</a>");
		} else if(length < maxLength) {
			$(this).text(text);
		} else if(length > maxLength && clientWidth <= 1240) {
			$(this).children().remove();
			$(this).text(textAll.substr(0, 90));
			$(this).append("......" + "<a href='alltext.html'class='seeAll' target='_blank'>查看全部</a>");
		}
	});
	//改变导航栏样式
	function h_active(attr, className) {
		$(attr).mouseenter(function() {
			$(this).addClass(className).siblings().removeClass(className);
		});
	}
	h_active(".nav_ul>li", "li_hover");
	h_active("#h_sleft>a", "active");
	//点击收藏与取消
	$(".collect").on('click', function(e) {
		var score = $("#p_collect").text();
		var a = parseInt(score) + 1;
		var b=parseInt(score) -1;
		if($(this).attr("src") == "img/收藏.png") {
			$(this).attr("src", "img/已收藏.png");
			$("#p_collect").text(a);
		} else {
			$(this).attr("src", "img/收藏.png");
			$("#p_collect").text(b);
		}
	});
	//接受订单
	$(".h_get").click(function(e) {
		e.preventDefault();
		var r = confirm("是否确认收此订单");
		var text=$(this).text();
		console.log(text);
		if(r == true&&text!="已接单") {
			alert("接单成功");
			$(this).text("已接单");
			var score = $("#p-num").text();
			var a = parseInt(score) + 1;
			$("#p-num").text(a);
			$(this).css("backgroundColor","#FF3030");
		}
		if(r == true&&text=="已接单"){
			alert("不可重复接单，若想取消，可从我的订单中选择取消订单项");	
		}
	});
	//签到
	$(".get_score").on("click", function(e) {
		e.preventDefault();
		var text = $(this).text();
		var score = $("#score").text();
		if(text == "签到领积分") {
			var a = parseInt(score) + 1;
			alert("签到成功，获得1积分");
			$("#score").text(a);
			$(this).text("已签到");
		} else {
			alert("您今天已经签到了");
		}
	});
});