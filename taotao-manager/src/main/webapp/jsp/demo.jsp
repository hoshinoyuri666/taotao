<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<script src="${pageContext.request.contextPath }/js/jquery-2.1.0.min.js"></script>
</head>
<body>

	<input type="button" id="button1" value="创建规格组"/><br/>
<div id="all">
	<div class="divgroup">
		<input type="text" name="group"/><input name="addgroupkey" type="button" value="添加规格项"/><br/>
		|-----<input type="text" name="groupkey"/><br/>
	</div>
</div>

	<input type="button" id="button2" value="点击我上传"/>
	<script type="text/javascript">
		$("#button1").click(function(){
			$("#all").append("<div class='divgroup'><input type='text' name='group'/><input type='button' name='addgroupkey' value='添加规格项'/><br/></div>");
			$(".divgroup").each(function(i,n){
				$(n).find("input[name=addgroupkey]").click(function(){
					$(n).append("|-----<input type='text'/><br/>");
				})
			})
		});
	</script>
</body>
</html>