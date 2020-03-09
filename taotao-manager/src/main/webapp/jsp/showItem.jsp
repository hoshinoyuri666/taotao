<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>商品展示页面</title>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/showItem.js"></script>
</head>
<body>
<div style="padding: 15px;background-color: #FFFFFF">
	<br/>
	<div>
		<div class="layui-input-inline">
			<input class="layui-input" placeholder="请输入商品名称" type="text" id="searchTitle" />
		</div>
		
	          请选择商品价格范围
	    <div class="layui-input-inline" style="width: 100px;">
	      <input type="text" id="minPrice" placeholder="￥:0" autocomplete="off" class="layui-input">
	    </div>
	    -
	    <div class="layui-input-inline" style="width: 100px;">
	      <input type="text" id="maxPrice" placeholder="￥:10000000" autocomplete="off" class="layui-input">
	    </div>
	  	
	    <div class="layui-input-inline">
		  <input id="selectCid" type="text" name="cId" placeholder="请选择商品分类" class="layui-input">
		  <input type="hidden" id="cidContent"/>
		</div>
		
		<button type="button" class="layui-btn" id="search">
			<i class="layui-icon">&#xe615;</i> 搜索
		</button>
	</div>
	<br/>
	
	<table class="layui-hide" id="showItemPage" lay-filter="itemToolBar"></table>
	
	<!-- display: none先默认隐藏 -->
	<div id="toolbarDemo" style="display: none;"  class="layui-btn-container">
		<!-- 要批量删除或者上架下架步骤：
		1.先获取选中的数据 2.自己写ajax请求 发送到服务器 3.服务器controller接收参数
		4.controller调用service 5.service调用dao 6.controller回传一个json告诉用户成功还是失败 -->
		<button class="layui-btn layui-btn-sm" lay-event="itemDelete">删除所选</button>
		<button class="layui-btn layui-btn-sm" lay-event="addItem">新增商品</button>
		<button class="layui-btn layui-btn-sm" lay-event="updateItem">修改商品</button>
		<button class="layui-btn layui-btn-sm" lay-event="upshelf">商品上架</button>
		<button class="layui-btn layui-btn-sm" lay-event="offshelf">商品下架</button>
	</div>
	<div style="display: none;" id="barDemo">
		<a class="layui-btn layui-btn-xs" lay-event="edit">编辑</a> 
		<a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
	</div>

</div>
</body>
</html>