<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>商品添加</title>
<script charset="utf-8" src="${pageContext.request.contextPath}/kindeditor/kindeditor-all-min.js"></script>
<script charset="utf-8" src="${pageContext.request.contextPath}/kindeditor/lang/zh-CN.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/js/addItem.js"></script>
</head>
<body>
<br/>
<br/>
	<form class="layui-form" action="">
		<div class="layui-form-item">
			<label class="layui-form-label">商品分类</label>
			<div class="layui-input-block">
				<button id="addItemSelectItemCat" type="button" class="layui-btn">
					<i class="layui-icon">&#xe608;</i> 选择分类
				</button>
				<span style="display: none;" id="addItemSpan"></span> 
				<input id="addItemId" type="hidden" name="cId" />
			</div>
		</div>
		<div class="layui-form-item">
				<label class="layui-form-label">商品标题</label>
				<div class="layui-input-inline">
					<input style="width: 270px" type="text" name="title"
						class="layui-input">
				</div>
		</div>
		<div class="layui-form-item">
			<label class="layui-form-label">商品卖点</label>
			<div class="layui-input-inline">
				<input style="height: 76px; width: 270px" type="text"
					name="sellPoint" class="layui-input">
			</div>
		</div>
		<div class="layui-form-item">
			<label class="layui-form-label">商品价格</label>
			<div class="layui-input-inline">
				<input type="text" name="price" class="layui-input">
			</div>
		</div>
		<div class="layui-form-item">
			<label class="layui-form-label">商品库存</label>
			<div class="layui-input-inline">
				<input type="text" name="num" class="layui-input">
			</div>
		</div>
		<div class="layui-form-item">
			<label class="layui-form-label">条形码</label>
			<div class="layui-input-inline">
				<input type="text" name="barcode" class="layui-input">
			</div>
		</div>
		<div class="layui-form-item">
			<label class="layui-form-label">商品图片</label>
			<div class="layui-input-block">
				<div class="layui-upload">
					<button type="button" class="layui-btn" id="test2">上传图片</button>
					<blockquote class="layui-elem-quote layui-quote-nm"
						style="margin-top: 10px;">
						预览图：
						<div class="layui-upload-list" id="demo2"></div>
					</blockquote>
					<input type="hidden" name="image" id="imageUpload" />
				</div>
			</div>
		</div>
		<div class="layui-form-item">
			<label class="layui-form-label">商品描述</label>
			<div class="layui-input-inline">
				<!-- 富文本编辑器把里面的内容变成一个个div包裹起来 -->
				<textarea id="editor_id" name="itemDesc"
					style="width: 700px; height: 300px;">
				</textarea>
			</div>
		</div>
		<div class="layui-form-item">
			<div id="paramKey" class="layui-inline">
				<input type="hidden" name="paramKeyId">
			</div>
		</div>
		<div class="layui-form-item">
			<label class="layui-form-label">规格参数</label>
			<div id="param" class="layui-inline">
				
			</div>
		</div>
		<div class="layui-form-item">
			<div class="layui-input-block">
				<button type="submit" class="layui-btn" lay-submit=""
					lay-filter="demo1">立即提交</button>
				<button type="reset" class="layui-btn layui-btn-primary">重置</button>
			</div>
		</div>
	</form>

</body>
</html>