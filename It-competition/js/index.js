//没有用jq，原生写的，$符号是自己封装的一个简单选择器，便于后面函数调用时候传参数
window.onload = function() {
	//不是jq 不是jq，不是jq，自己封装的一个简单的选择器函数
	function $(name) {
		var method = name.substr(0, 1) == '.' ? "getElementsByClassName" : "getElementById";
		return document[method](name.substr(1));
	}
	//添加摇动函数
	function shake(element, target, attr) {
		var oImg;
		var province = []; //用来筛选省份的
		var country = []; //用来筛选国家
		for(var i = 0; i < element.length; i++) {
			element[i].index = i; //获取当前选择元素的索引
			element[i].onclick = function() {
				var x = this.index; //将索引值赋值给x
				for(var j = 0; j < target.length; j++) {
					oImg = target[j].getElementsByTagName("img")[0];
					if(oImg.getAttribute("data").substr(0, 1) == "p") {
						province.push(oImg.parentNode);
					} else {
						country.push(oImg.parentNode);
					}
				}
				for(var i = 0; i < element.length; i++) {
					element[i].children[0].className = "";
				}
				this.children[0].className = "tab_p";
				switch(x) {
					case 1: //将国家隐藏，省份的显示
						province.forEach(function(item) {
							item.className = "show";
							animate(item, {
								"opacity": 1
							}, function(){
								if(item.style.opacity == "1") {
									item.className = "show";
								}
							}, 70);
						});
						country.forEach(function(item) {
							item.className = "li_shake a";
							//调用运动函数，传入回调函数，在执行完透明度变化后将其隐藏
							animate(item, {
								"opacity": 0.8
							}, function(){
								animate(item, {
									"opacity": 0
								});
								if(item.style.opacity = "0") {
									item.className = "hidden";
								}
							}, 70);
						});
						break;
					case 2: //将省份的元素隐藏，国家的显示
						province.forEach(function(item) {
							item.className = "li_shake";
							//调用运动函数，传入回调函数，在执行完透明度变化后将其隐藏
							animate(item, {
								"opacity": 0.8,
							}, function() {
								if(item.style.opacity < 0.9) {
									item.className = "hidden";
								}
							}, 60);
						});
						country.forEach(function(item) {
							item.className = "show";
							animate(item, {
								"opacity": 1
							}, function() {
								if(item.style.opacity == "1") {
									item.className = "show";
								} else {
									item.className = "show";
								}
							}, 60);
						});
						break;
					default:
						//合并为新数组，将其中所有元素的透明度变成1,并显示为块级元素
						var newArray = province.concat(country);
						newArray.forEach(function(item) {
							animate(item, {
								"opacity": 0
							}, function() {
								animate(item, {
									"opacity": 1
								});
								if(item.style.opacity == "1") {
									item.className = "show";
								} else {
									item.className = "show";
								}
							}, 20);
						})
						break;
				}

			}
		}
	}
	//获取样式兼容性代码
	function getStyle(element, attr) {
		return window.getComputedStyle ?
			window.getComputedStyle(element, null)[attr] : element.currentStyle[attr] || 0;
	}
	function animate(element, json, fn, time) {
		clearInterval(element.timer);
		element.timer = setInterval(function() {
			var flag = true; //判断是否全不执行完的标志
			//遍历传入的属性参数
			for(var attr in json) {
				//如果传入的是透明度
				if(attr == "opacity") {
					var current = getStyle(element, attr) * 100; //将当前透明度放大100倍
					var target = json[attr] * 100; //将目标透明度放大100倍
					//设置步数
					var step = (target - current) / 10;
					step = step > 0 ? Math.ceil(step) : Math.floor(step); //step大于0向上取整反之向下,实现变速效果
					current += step; //移动后的值
					element.style[attr] = current / 100;
				} else if(attr == "zIndex") { //如果传入的属性是z-Index
					element.style[attr] = json[attr];
				} else { //其他普通属性
					var current = parseInt(getStyle(element, attr));
					var target = json[attr];
					var step = (target - current) / 10;
					step = step > 0 ? Math.ceil(step) : Math.floor(step);
					current += step; //移动后的值
					element.style[attr] = current + "px";
				}
				if(current != target) {
					flag = false;
				}
				if(flag) {
					//完成目标后清理定时器
					clearInterval(element.timer);
					if(fn) {
						//是否传入回调函数
						fn();
					}
				}
			}
		}, time);
	}
	shake($("#tab_list").children, $("#list_ul").children, "data");
}