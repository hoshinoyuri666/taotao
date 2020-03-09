var table;
var categoryIdVal;
$(function(){
	var setting = {
			async : {
				enable : true,//true 表示 开启 异步加载模式。如果设置为 true，请务必设置 setting.async 内的其它参数。即url和autoParam。
				url : "/content/showContentZtree",//Ajax 获取数据的 URL 地址。[setting.async.enable = true 时生效]
				autoParam : [ "id" ]//异步加载时需要自动提交父节点属性的参数。[setting.async.enable = true 时生效]
			},
			callback: {
				onClick: zTreeOnClick//用于捕获节点被点击的事件回调函数 即节点被点击后执行zTreeOnClick方法
			}
	};
	$(document).ready(function(){
		$.fn.zTree.init($("#showContentTree"), setting);
	});
	
	layui.use(['jquery','layer','table'], function() {//table的作用范围
		var $ = layui.jquery;
		var layer = layui.layer;
		table = layui.table;
		table.render({
			elem : '#showContentTable',//绑定哪个table表 可以以id选择器绑定 可以以class选择器 还可以以 name选择器
			url : '/content/showContentTable',//请求服务器的url路径 默认会自动传递两个参数：?page=1&limit=30（该参数可通过 request 自定义） page 代表当前页码、limit 代表每页数据量
			toolbar : '#toolbarHead' ,//开启头部工具栏，并为其绑定左侧模板
			id : 'reloadTable',
			defaultToolbar : [ 'filter', { //自定义头部工具栏右侧图标。如无需自定义，去除该参数即可
				layEvent : 'LAYTABLE_TIPS',
				icon : 'layui-icon-tips'
			} ],
			title : '内容表',
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
			        	 title : '内容标题',
			        	 width : 260
			         }, {
			        	 field : 'subTitle',
			        	 title : '内容子标题',
			        	 width : 120
			         }, {
			        	 field : 'titleDesc',
			        	 title : '内容描述',
			        	 //edit: 'text'编辑单元格
			        	 width : 100
			         }, {
			        	 field : 'url',
			        	 title : '内容链接',
			        	 width : 100
			         }, {
			        	 field : 'pic',
			        	 title : '图片',
			        	 width : 100
			         }, {
			        	 field : 'pic2',
			        	 title : '图片2',
			        	 width : 100,
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
			         ]
			        ],
			        page : true
		});

	//头工具栏事件
	table.on('toolbar(contentToolBar)', function(obj){
		var checkStatus = table.checkStatus(obj.config.id);
		switch(obj.event){
			case 'deleteContent':
				var data = checkStatus.data;//layui自动获取数据
				//layer.alert(JSON.stringify(data));获取json格式的数据
				$.ajax({
					type: "POST",
					url: "/content/deleteContentByCategoryId",
					contentType: "application/json;charset=utf-8",//表示页面发送的数据是json格式的
					data:JSON.stringify(data),//发过去的数据 JSON.stringify转换成json格式
					dataType: "json",//返回值类型//要封装一个工具类 因为修改删除添加商品都要ajax请求 返回json数据格式 提示修改成功或失败 
					success:function (message) {
						layer.alert('删除商品成功');
						table.reload('reloadTable',{  });//重新渲染表格
					}
				});
				break;
			case 'addContent':
				layer.open({
					type : 2,
					title : '添加内容',
					shadeClose : true,
					shade : 0.8,
					area : [ '70%', '90%' ],
					content : '/jsp/showAddContent.jsp',
					success : function(layero, index) {
						var iframe = window['layui-layer-iframe' + index];
						iframe.child(categoryIdVal,table,layer);
					}
				});
				break;
		};
	});
});
	
})
function zTreeOnClick(event, treeId, treeNode) {
	if(treeNode.isParent==false){
		categoryIdVal = treeNode.id;
		table.reload('reloadTable', {
			url: '/content/showContentTable'
				,method:"post"
					,where: {
						categoryId : categoryIdVal
					}
		,page: {
			curr: 1
		}
		});
	}
};