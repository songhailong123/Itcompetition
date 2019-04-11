$(document).ready(function(){
		function h_active(attr, className) {
		$(attr).mouseenter(function() {
			$(this).addClass(className).siblings().removeClass(className);
			$(""+attr+":eq(3)").removeClass(className);
		});
	}
	h_active(".nav_ul>li", "li_hover");
});
