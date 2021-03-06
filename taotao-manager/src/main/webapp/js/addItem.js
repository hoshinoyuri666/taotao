$(function(){
	//富文本编辑框对象
//根据文本域的id来创建富文本编辑器 进行初始化 window.editor = KindEditor.create("#editor_id");
var editor = window.editor = KindEditor.create("#editor_id");

//规格参数值数组变量
var paramValues  = new Array();
//规格参数项数组变量
var paramKeyIds  = new Array();

layui.use(['form', 'layedit', 'laydate','upload'], function(){
  var form = layui.form
  ,layer = layui.layer
  ,layedit = layui.layedit
  ,laydate = layui.laydate
  ,upload = layui.upload;
  
  //监听提交
  form.on('submit(demo1)', function(data){
	//通过富文本编辑器对象.html()方法可以获取到富文本编辑器里面的值
	editorVal = editor.html();
	data.field.itemDesc = editorVal;
	/* layer.alert(JSON.stringify(data.field), {
	      title: '最终的提交信息'
	})  */
	$("input[name='paramValue']").each(function(){
		paramValues.push($(this).val());
    })
    data.field.paramValue = paramValues;
	data.field.paramKeyId = paramKeyIds;
	//console.log(data.field);
	$.ajax({
        type: "POST",
        url: "/item/addItem",
        data:data.field,
        dataType: "json",
        success:function (message) {
     	   layer.alert(message.msg);
        },
        error:function (message) {
     	   layer.alert(message.msg);
        }
    }); 
    return false;
  }); 
 
//多图片上传 这里一定是 layui的ajax请求 发送图片 controller回传json格式的数据给我们 提示上传成功或者失败
  upload.render({
    elem: '#test2'
    ,url: '/item/fileUpload' //改成您自己的上传接口
    ,multiple: true
    ,before: function(obj){
      //预读本地文件示例，不支持ie8
      obj.preview(function(index, file, result){
        $('#demo2').append('<img style="height: 100px;width: 100px" src="'+ result +'" alt="'+ file.name +'" class="layui-upload-img">')
      });
    }
    ,done: function(res){
    	//点上传图片先到controller里去把图片存到图片服务器中 把这个路径返回到页面这边
    	//res就是图片路径 把这个路径 绑定到 input输入框中的image这个隐藏域里面去
		//form表单里面有个隐藏域 名字叫做  name="image" value="controller发送过来的图片路径"
		//点击提交的时候才真正的把图片路径存到数据库中去
      	//上传完毕
      	//console.log(res);
    	//jquery 如何向input value里追加值 $(".box input").val($(".box input").val()+$(this).text())
    	//alert(res.data.src)
    	$("#imageUpload").val(
    			$("#imageUpload").val()+ res.data.src+ ","
    	);
    }
  });
});




	$("#addItemSelectItemCat").click(function() {
		/**
			success:function是当用户点击了按钮以后 成功打开了模态框以后 会执行的function函数
			我们在这个函数里面 执行了一个代码 就是 传递一个参数 到showZtree.jsp页面中去
			是一个唯一标识符 用于区分是谁点击的 这个按钮
			yes:function是当用户点击了模态框上面的确定按钮以后 才会执行的方法
			但是这里有个坑， 主要在业务逻辑上面
			在官网查询得到的资料里面 我可以知道 layer.close(index);
		 	是关闭这个模态框的，我关闭不了 关不了的原因是因为
			success:function里面的index == yes:function里面的layero
		 */
		layer.open({
			type : 2,
			title : '商品分类选择',
			shadeClose : true,
			shade : 0.8,
			area : [ '380px', '90%' ],
			content : '/jsp/showZtree.jsp',
			btn : [ '确定', '取消' ],
			yes : function(layero, index) {
				//jquery控制元素的隐藏和显示 $("#id").show()表示显示
				$("#addItemSpan").show();
				layer.close(layero);
				var cId = $("#addItemId").val();
				$.ajax({
					type: "POST",
					url: "/itemGroup/showItemGroup",
					data:"cId="+cId,//发过去的数据 
					dataType: "json",//返回值类型
					success:function (message) {
						if(message.status==200){
							var groupVal = message.data;
							$.each(groupVal, function(i, n){
								 $("#param").append("<h2 style='background-color: #EAEAEA;text-align: center;'>"+n.groupName+"</h2>");
								 $.each(n.paramKeys, function(j, n2){
									 $("#param").append("<span>"+n2.paramName+"</span><input type='text'name='paramValue'/><br/>");
									 paramKeyIds.push(n2.id);
								 });
							});
						}else{
							layer.alert(message.msg);
						}
					}
				});
			},
			success : function(layero, index) {
				var iframe = window['layui-layer-iframe' + index];
				iframe.child('addItem.jsp');
			}
		});
	})
	
})