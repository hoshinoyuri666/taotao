var pageName;
$(function(){
	var setting = {
			async : {
				enable : true,//true 表示 开启 异步加载模式。如果设置为 true，请务必设置 setting.async 内的其它参数。即url和autoParam。
				url : "/itemCat/showZtree",//Ajax 获取数据的 URL 地址。[setting.async.enable = true 时生效]
				autoParam : [ "id" ]//异步加载时需要自动提交父节点属性的参数。[setting.async.enable = true 时生效]
			},
			callback: {
				onClick: zTreeOnClick//用于捕获节点被点击的事件回调函数 即节点被点击后执行zTreeOnClick方法
			}

	};
	$(document).ready(function(){
		$.fn.zTree.init($("#treeDemo"), setting);
	});
})
//子窗口接受主页面参数
function child(obj){
	if(obj=='showItem.jsp'){
		pageName = 1;
	}else if(obj=='addItem.jsp'){
		pageName = 2;
	}else if(obj=='addParam.jsp'){
		pageName = 3;
	}
}
function zTreeOnClick(event, treeId, treeNode) {
	//页面如何debug
	//debugger;
	//console.log(treeNode);//treeNode被点击的节点 JSON 数据对象
	if(pageName==1){
		//parent.$("#主窗口元素ID").val("需要传递的参数");子弹出层通过这个代码给父弹出层传递值
		parent.$("#selectCid").val(treeNode.name);
		parent.$("#cidContent").val(treeNode.id);
	}else if(pageName==2){
		parent.$("#addItemSpan").text(treeNode.name);
		parent.$("#addItemId").val(treeNode.id);
		
	}else if(pageName==3){
		parent.$("#addParamSpan").text(treeNode.name);
		parent.$("#cIdParam").val(treeNode.id);
		
	}
};
