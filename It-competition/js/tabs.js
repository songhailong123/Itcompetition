	//选项卡切换界面功能，以及引用swipper插件
	$(document).ready( function() {
	  var tabsSwiper = new Swiper('#tabs-container',{
	    speed:300,
	    onSlideChangeStart: function(){
	      $(".h_sleft .active").removeClass('active')
	      $(".h_sleft a").eq(tabsSwiper.activeIndex).addClass('active')  
	    }
	  })
	  $(".h_sleft a").on('touchstart mousedown',function(e){
	    e.preventDefault()
	    $(".h_sleft .active").removeClass('active')
	    $(this).addClass('active')
	    tabsSwiper.slideTo( $(this).index() )
	  })
	  $(".h_sleft a").click(function(e){
	    e.preventDefault()
	  })
	});