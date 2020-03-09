<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>商品分类查询</title>
<link rel="stylesheet" href="${pageContext.request.contextPath}/css/zTreeStyle/zTreeStyle.css" type="text/css">
<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery.ztree.core.js"></script>
</head>
<body>
	<br/>
	<div class="zTreeDemoBackground left">
		<ul id="treeCat" class="ztree"></ul>
	</div>
	<script type="text/javascript">
	$(function(){
		var setting = {
				async : {
					enable : true,//true 表示 开启 异步加载模式。如果设置为 true，请务必设置 setting.async 内的其它参数。即url和autoParam。
					url : "/itemCat/showZtree",//Ajax 获取数据的 URL 地址。[setting.async.enable = true 时生效]
					autoParam : [ "id" ]//异步加载时需要自动提交父节点属性的参数。[setting.async.enable = true 时生效]
				},
		};
		$(document).ready(function(){
			$.fn.zTree.init($("#treeCat"), setting);
		});
	})
	</script>
</body>
</html>