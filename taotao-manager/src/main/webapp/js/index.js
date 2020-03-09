$(function(){
		//页面中有许多元素需要自动去完成一些处理，譬如导航菜单的小滑块、Tab的切换等操作，他们往往不需要去单独调用一个方法来开启一项功能，而页面上恰恰有太多这样的小交互，所以我们统一归类为element组件。
		//元素功能的开启只需要加载element模块即会自动完成，所以不用跟其它模块一样为某一个功能而调用一个方法。她只需要找到她支持的元素，如你的页面存在一个 Tab元素块，那么element模块会自动赋予她该有的功能。
		//加载element模块
		layui.use('element', function(){
		  var element = layui.element;
		  
		});
		$("#showItem").click(function(){
			//jquery的load()方法从服务器加载数据，并把返回的数据放置到指定的元素中。
			$("#content").load("/jsp/showItem.jsp");
		})
		$("#addItemCat").click(function(){
			$("#content").load("/jsp/addItemCat.jsp");
		})
		$("#addItem").click(function(){
			$("#content").load("/jsp/addItem.jsp");
		})
		$("#addParam").click(function(){
			$("#content").load("/jsp/addParam.jsp");
		})
		$("#showCat").click(function(){
			$("#content").load("/jsp/showCat.jsp");
		})
		$("#showContent").click(function(){
			$("#content").load("/jsp/showContent.jsp");
		})
})