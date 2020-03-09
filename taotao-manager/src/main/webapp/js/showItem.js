$(function(){
	var table;
	layui.use(['jquery','layer','table'], function() {//table的作用范围
		var $ = layui.jquery;
		var layer = layui.layer;
		table = layui.table;
		/**
			layui的核心思想是
			当用户访问这个showItem.jsp页面的时候  发现有一个table标签
			这个table标签 又发现了一个 script方法 
			这个script方法 里面有layui的render方法 实际上 做一个事情
			当页面一旦被加载了以后 他会根据url去请求一个服务器地址 
			从服务器地址上面 获取一段json格式数据 但是json格式的数据 他的格式 必须是这样的
			{code:0,msg:"",count:10000,data:[{},{}]}
			code:传入0就行了
			msg:传入空字符串就行了
			count:总记录条数就行了
			data:每一页显示商品信息json格式  这就是 那十条记录信息
		 */
		table.render({
			elem : '#showItemPage',//绑定哪个table表 可以以id选择器绑定 可以以class选择器 还可以以 name选择器
			url : '/item/showItemPage',//请求服务器的url路径 默认会自动传递两个参数：?page=1&limit=30（该参数可通过 request 自定义） page 代表当前页码、limit 代表每页数据量
			toolbar : '#toolbarDemo' ,//开启头部工具栏，并为其绑定左侧模板
			id : 'reloadTable',
			defaultToolbar : [ 'filter', { //自定义头部工具栏右侧图标。如无需自定义，去除该参数即可
				layEvent : 'LAYTABLE_TIPS',
				icon : 'layui-icon-tips'
			} ],
			title : '商品表',
			cols : [ 
			        [ 
			         {
			        	 type : 'checkbox',//复选框
			        	 fixed : 'left'//固定在左侧
			         }, {
			        	 field : 'id',
			        	 title : 'ID',
			        	 width : 80,
			        	 fixed : 'left'
			         }, {
			        	 field : 'title',
			        	 title : '商品名称',
			        	 width : 260
			         }, {
			        	 field : 'sellPoint',
			        	 title : '商品卖点',
			        	 width : 120
			         }, {
			        	 field : 'price',
			        	 title : '商品价格',
			        	 //edit: 'text'编辑单元格
			        	 width : 100
			         }, {
			        	 field : 'num',
			        	 title : '商品数量',
			        	 width : 100
			         }, {
			        	 field : 'cid',
			        	 title : '商品类目',
			        	 width : 100
			         }, {
			        	 field : 'status',
			        	 title : '商品状态',
			        	 width : 100,
			        	 templet: '<div>{{# if(d.status ==0){ }} 下架  {{#  }  else if(d.status==1){ }} 上架 {{#  }  else if(d.status==2){ }} 删除 {{#  } }}</div>',//templet自定义列模板，可借助它实现逻辑处理，以及将原始数据转化成其它格式，如时间戳转化为日期字符等。
			        	 sort : true//排序
			         },{
			        	 field : 'created',
			        	 title : '创建时间',
			        	 templet:'<div>{{ layui.util.toDateString(d.created, "yyyy-MM-dd HH:mm:ss") }}</div>',//参数 d，包含接口返回的所有字段和数据。
			        	 width : 200
			         },{
			        	 field : 'updated',
			        	 title : '更新时间',
			        	 templet:'<div>{{ layui.util.toDateString(d.updated, "yyyy-MM-dd HH:mm:ss") }}</div>',
			        	 width : 200
			         },
			         {
			        	 fixed: 'right', 
			        	 title:'操作', 
			        	 toolbar: '#barDemo', 
			        	 width:150
			         }
			         ]
			        ],
			        page : true
		});

		//头工具栏事件
		table.on('toolbar(itemToolBar)', function(obj){
			var checkStatus = table.checkStatus(obj.config.id);
			switch(obj.event){
			case 'itemDelete':
				var data = checkStatus.data;//layui自动获取数据
				//layer.alert(JSON.stringify(data));获取json格式的数据
				$.ajax({
					type: "POST",
					url: "/item/itemDelete",
					contentType: "application/json;charset=utf-8",//表示页面发送的数据是json格式的
					data:JSON.stringify(data),//发过去的数据 JSON.stringify转换成json格式
					dataType: "json",//返回值类型//要封装一个工具类 因为修改删除添加商品都要ajax请求 返回json数据格式 提示修改成功或失败 
					success:function (message) {
						if(message.status==200){
							layer.alert('删除商品成功');
							table.reload('reloadTable',{  });//重新渲染表格
						}else{
							layer.alert(message.msg);
						}
					}
				});
				break;
			case 'addItem':
				window.location.href='/jsp/addItem.jsp';
				break;
			case 'upshelf':
				var data = checkStatus.data;
				$.ajax({
					type: "POST",
					url: "/item/upshelf",
					contentType: "application/json;charset=utf-8",
					data:JSON.stringify(data),
					dataType: "json",
					success:function (message) {
						if(message.status==200){
							layer.alert(message.msg);
							table.reload('reloadTable',{  });
						}else{
							layer.alert(message.msg);
						}
					}
				});
				break;
			case 'offshelf':
				var data = checkStatus.data;
				$.ajax({
					type: "POST",
					url: "/item/offshelf",
					contentType: "application/json;charset=utf-8",
					data:JSON.stringify(data),
					dataType: "json",
					success:function (message) {
						if(message.status==200){
							layer.alert(message.msg);
							table.reload('reloadTable',{  });
						}else{
							layer.alert(message.msg);
						}
					}
				});
				break;
			};
		});
		/*  $("#search").click(function(){
			 //layer.alert('加了个图标', {icon: 1}); 
			 var searchContent = $("#searchContent").val();
			 //layer.alert(searchContent);
			 location.href = "/item/search/"+searchContent;
		 }) */

		$("#search").click(function(){
			var titleVal = $("#searchTitle").val();
			var minPriceVal = $("#minPrice").val();
			var maxPriceVal = $("#maxPrice").val();
			var cidContentVal = $("#cidContent").val();
			table.reload('reloadTable', {
				url: '/item/search'
					,method:"post"
						,where: {
							title : titleVal,
							minPrice : minPriceVal,
							maxPrice : maxPriceVal,
							cId : cidContentVal
						}
			,page: {
				curr: 1
			}
			});
			$("#searchTitle").val("");
			$("#minPrice").val("");
			$("#maxPrice").val("");
			$("#cidContent").val("");
			$("#selectCid").val("");
		})
		$("#selectCid").click(function(){
			//异步加载的意思就是 我请求一个服务器的地址 服务器返回一个json数据 然后我自己这个ztree去加载这个json格式的数据 然后就实现了 树形结构
			//alert("点击我出现一个 弹窗 通过这个弹窗来选择商品分类");
			layer.open({
				type: 2,
				title: '商品分类选择',
				shadeClose: true,
				shade: 0.8,
				area: ['380px', '90%'],
				content: '/jsp/showZtree.jsp', 
				btn: ['确定','取消'], //按钮
				//主窗口向Iframe层传值
				success:function (layero,index) {
				     var iframe = window['layui-layer-iframe' + index]; //获取子页面的iframe
				     iframe.child('showItem.jsp');//向子页面的全局函数child传参
				}
			}); 
		})
	});
})